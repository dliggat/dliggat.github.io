---
layout: post
title: "A Full AWS Rails Stack Provision and Deployment with the Rubber Gem"
date: 2014-12-13 16:00:21 -0800
comments: true
categories: ["aws", "ruby", "rails", "dev_ops"]
description: How to deploy a full Nginx, Passenger, PostgreSQL Ruby-on-Rails stack on Amazon Web Services using the Rubber gem.
published: true
---

It'd been some time since I'd set up a full [Rails][rails] stack and deployment process on [Amazon Web Services][aws]. I thought it would be worth trying out [rubber][rubber] from scratch to provision a full **{Nginx, Passenger, PostgreSQL}** stack on a single AWS host, with as much automation as possible, but without prematurely resorting to the cognitive-overhead of [Chef/OpsWorks][chef]. This is my attempt to document the process, as I ran into a few roadblocks along the way.
<!--more-->

The [RailsCast][railscast] on `rubber` is a great place to start, as it gives a good overview/refresher on some of the primitive pieces such as setting up EC2 key-pairs and so on. This post is written under the assumption it has been watched and understood, but I'll be targeting the `complete_passenger_nginx_postgresql` template rather than `complete_passenger_postgresql`, which the episode uses. The various other `rubber` templates are all available [in its repo][temp].

## Creating And Deploying 'bloggy'

I started out with a super basic Rails app, unimaginatively named `bloggy`. The `git` repository is available [here][bloggy]; each commit in the [history][commits] corresponds to a step along the way. It has a root route which renders a page with the current time and hostname, and a single [REST][rest]-ful resource: `/posts`.

### (1) Set Up the Basic App

* [Create][create] the app: `bundle exec rails new bloggy -d postgresql`
* [Scaffold][scaffold] a model: `bundle exec rails g scaffold post title:string body:text`
* [Create][db] database and migrate: `bundle exec rake db:create db:migrate`
* [Add][root] a root route and a basic root page
* [Add][dotenv] `dotenv` for environment variable management in production
* [Add][gems] the following gems:
  * `capistrano`: for deployment automation
  * `rubber`: for EC2 provisioning
  * `passenger`: for the Rails app server
  * `therubyracer`: for asset precompilation in production

### (2) Configure Rubber

* [Vulcanize][vulc] the desired stack: `vulcanize complete_passenger_nginx_postgresql`
* [Set][ruby] appropriate versions of `ruby` (for me: `2.1.2`), `ruby-build` and `passenger`[^1].
* [Set][basic] basic properties of the app; `app_name` and so on.
* [Pick][region] an EC2 image size and type compliant with your region. I'm using Ubuntu 14.04 LTS in `us-west-2` (Oregon)[^2].
* [Enable][secure] secure AWS credential storage for `rubber` using `~/.ec2/rubber-secret.yml`. You **do not** want to have these credentials in a `git` repository, irrespective of whether your repository is private or public (like [mine][bloggy]). My EC2 keys and credential file all live in `~/.ec2`:

{% img center /images/2014/ec2.png 700 'EC2' %}

### (3) Instantiate the EC2 Instance

At this point, we're ready to fire up the EC2 instance:

* `bundle exec rubber cap:create`
* Name the single instance `production` and assign it every role within the app: `web,app,db:primary=true`[^3].
* Enter your local admin password when prompted – so `rubber` can modify your `/etc/hosts` file.
* Log into the AWS console => EC2, and ensure the image has been started. Grab the public DNS name of the instance[^4].

If all has gone well, and the keys were setup correctly ahead of time, it should be possible to `ssh` to the newly launched instance:

{% codeblock SSH to the instance lang:sh %}
ssh -v -i ~/.ec2/gsg-keypair ubuntu@ec2-54-69-180-182.us-west-2.compute.amazonaws.com
{% endcodeblock %}

### (4) Provision the Environment

With the instance running, we can now instruct `rubber` to install the relevant packages that are necessary to build the environment. Locally, run `bundle exec cap rubber:bootstrap`. This can take a while: it installs Linux updates, configures Nginx, builds and installs `ruby`, etc. This is the core of the annoying, manual, error-prone work that we seek to eliminate with `rubber`.

Once that completes, the instance is mostly ready to go. After `ssh`-ing to the instance we can verify that the correct version of `ruby` is installed, etc:

    # ruby --version
    ruby 2.1.2p95 (2014-05-08 revision 45877) [x86_64-linux]

### (5) Initial Deployment

With the instance ready, we can now use `capistrano` to deploy. This is where I first ran into issues. After attempting to deploy using `bundle exec cap deploy:cold`, I received the `rubber` error output:

    ** [out :: production.bloggy.com] [ALERT] 347/141816 (2034) :
    ** [out :: production.bloggy.com] Starting proxy passenger_proxy: cannot bind socket
    ** [out :: production.bloggy.com]
    ** [out :: production.bloggy.com]
    ** [out :: production.bloggy.com]
    ** [out :: production.bloggy.com] [
    ** [out :: production.bloggy.com]
    ** [out :: production.bloggy.com] fail
    ** [out :: production.bloggy.com]

It turns out we need to delete the default Nginx configuration, which is conflicting with the port (obviously `80`) we're attempting to use. After `ssh`-ing to the instance:

* Delete the default configuration file: `sudo rm /etc/nginx/sites-enabled/default`
* Restart Nginx: `sudo service nginx restart`

Back again locally, attempt to deploy once more: `bundle exec cap deploy:cold`. It should succeed this time around without the error message we encountered previously.

### (6) Accessing the App

With the instance provisioned, we are close to success. However, at this point I got an error page at http://ec2-54-69-180-182.us-west-2.compute.amazonaws.com in the browser. `curl` gives some insight as to what's going on:

    $ curl -i http://ec2-54-69-180-182.us-west-2.compute.amazonaws.com
    HTTP/1.1 502 Bad Gateway
    Server: nginx/1.6.2
    Date: Sun, 14 Dec 2014 22:29:03 GMT
    Content-Type: text/html
    Content-Length: 1477
    Connection: keep-alive

To proceed, we need to take a look at the Nginx logs. After `ssh`-ing again to our instance, we can `tail -f /var/log/nginx/error.log` and notice that:

    App 2213 stderr: [ 2014-12-14 14:29:03.3709 2275/0x007f5d4ea08798(Worker 1) utils.rb:84 ]: *** Exception RuntimeError in Rack application object (Missing `secret_key_base` for 'production' environment, set this value in `config/secrets.yml`) (process 2275, thread 0x007f5d4ea08798(Worker 1)):
    App 2213 stderr:  from /mnt/bloggy-production/shared/bundle/ruby/2.1.0/gems/railties-4.1.7/lib/rails/application.rb:462:in `validate_secret_key_config!'

We need to create an `.env` file in the Rails app root directory that the `dotenv-deployment` gem will use to set the missing `SECRET_KEY_BASE` cryptographic environment variable that is referenced in the app's `config/secrets.yml`. Locally, create a `.env` file and copy it to the server:

{% codeblock Copying an .env file to the server lang:sh %}
echo "SECRET_KEY_BASE=`bundle exec rake secret`" > .env
scp -v -i ~/.ec2/gsg-keypair .env ubuntu@ec2-54-69-180-182.us-west-2.compute.amazonaws.com:/home/ubuntu
rm .env
{% endcodeblock %}

Back on the server, `sudo mv /home/ubuntu/.env /mnt/bloggy-production/shared/` to copy the file to the appropriate place. The final [repo commit][capis] ensures that `capistrano` will symlink this from the `release` directory into the `shared` directory on deployment.

One final deployment should do the trick to get this into the Rails app on production: `bundle exec cap:deploy`:

Sure enough:

    ubuntu@production:~$ cd /mnt/bloggy-production/current/
    ubuntu@production:/mnt/bloggy-production/current$ ls -la .env
    lrwxrwxrwx 1 root root 34 Dec 14 14:49 .env -> /mnt/bloggy-production/shared/.env

With that in place, we can visit the URL once more:

{% img center /images/2014/app.png 700 'App on EC2' %}

And there we have it! The full stack **{Nginx, Passenger, PostgreSQL}** app is now live on the EC2 instance. This process falls slightly short of the ideal of *one-click instance provisioning*, but it's pretty close[^5]. Going through this additional work seems preferable to me versus [Heroku][heroku] or [Elastic Beanstalk][eb] - both of which have their place[^6] to be sure, but ultimately abstract away rather more of these details than I would prefer.

With the basic app deployed with a production-grade full stack using `rubber` - we can be sure we have a clear, repeatable, configurable path for future vertical and/or horizontal scaling if and when the need should arise.

### (7) Teardown

Finally, the deployed instance can be dismantled via `bundle exec cap rubber:destroy_all` when it's no longer needed, as of course EC2 bills by the hour.

### Addendum: Asset Compilation

Thanks to the `therubyracer` gem added earlier, we can observe that the application's JavaScript has indeed undergone precompilation in deployment.

{% img center /images/2014/assets.png 700 'Precompilation' %}

[rails]: http://rubyonrails.org/
[rubber]: https://github.com/rubber/rubber
[chef]: http://docs.aws.amazon.com/opsworks/latest/userguide/workingcookbook-chef11.html
[create]: https://github.com/dliggat/bloggy/commit/e52a13e96549230cb8f0f1ad7e81381ae2434013
[scaffold]: https://github.com/dliggat/bloggy/commit/dcddbc02350812ce9f94842d09078b93f2257cb7
[db]: https://github.com/dliggat/bloggy/commit/f59b8f311aab8cd24c8213f64b4e1441fdf03243
[railscast]: http://railscasts.com/episodes/347-rubber-and-amazon-ec2
[bloggy]: https://github.com/dliggat/bloggy
[commits]: https://github.com/dliggat/bloggy/commits/master
[root]: https://github.com/dliggat/bloggy/commit/521fac60a7ab97e9c7a1fb2c6f54b514dbaa2a44
[dotenv]: https://github.com/dliggat/bloggy/commit/5999bed32663165875726437cf04f3a0a23ff6ea
[gems]: https://github.com/dliggat/bloggy/compare/5999bed...63b4a27
[vulc]: https://github.com/dliggat/bloggy/commit/de11b73ede158f3b6a439ea68d8ebdc797850e74
[ruby]: https://github.com/dliggat/bloggy/compare/de11b73...d2536ec
[basic]: https://github.com/dliggat/bloggy/commit/d046ae4314ba669f465c18c9be0606de3398e22f
[region]: https://github.com/dliggat/bloggy/commit/d71b25d31986cd56543eeaae2b36b091f08de4f6
[secure]: https://github.com/dliggat/bloggy/commit/b1f0d94aba4da1e6eabdfb01290c3b06ead8384f
[capis]: https://github.com/dliggat/bloggy/commit/23bac39176accbee69ba3465d8aad92e822f2972
[heroku]: https://www.heroku.com/
[aws]: http://aws.amazon.com/
[eb]: http://aws.amazon.com/elasticbeanstalk/
[temp]: https://github.com/rubber/rubber/tree/master/templates
[rest]: http://en.wikipedia.org/wiki/Representational_state_transfer

[^1]: There's a fair bit of documentation staleness around these values, so unless you're reading this around December 2014, the world has likely moved onto something newer, and you may get errors as a result. Look for values that will be mutually compliant *today*, whenver that might be.
[^2]: You can find the various options in the dropdown on the right side of [alestic.com](http://alestic.com).
[^3]: As the app matures, these roles would tend to migrate to separate instances, and possibly leverage other AWS services such as [RDS](http://aws.amazon.com/rds/), but for now one instance is adequate for all the roles.
[^4]: `rubber` monkeys with your `/etc/hosts` file to alias this locally, but I tend to ignore that and just grab it directly from the EC2 console.
[^5]: This could likely be slightly streamlined with some `rubber` pull requests, which I hope to create and contribute in the near future.
[^6]: Heroku remains the undisputed master of the *get this thing deployed ASAP* market in my book


