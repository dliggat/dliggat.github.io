---
layout: post
title: "Static Hosting on Amazon S3"
date: 2013-11-03 13:13
comments: true
categories: blogging octopress aws
---
I've had an outstanding **todo** for quite some time to migrate my basic and essentially-static [business website](http://www.factorialsystems.ca) off of [Squarespace](http://www.squarespace.com). I ended up replacing it with a combination of [Octopress](http://octopress.org) and Amazon Simple Storage Service ([S3][s3]), which, it turns out, are a fantastic duo.<!--more-->

[s3]: http://aws.amazon.com/s3

### Prelude
A brief prelude: Squarespace is fantastic, and should be the first port of call for anyone, especially a business, who needs a website. I can't even enumerate the number of ostensibly well-run restaurants and businesses who either don't have a website, or if they do, it's some horrid Flash-payload thing that won't run on the primary device customers tend to be using at the point of need: their phones! Squarespace isn't free, but is totally worth the small monthly cost for pretty much anyone.

I started my business site there due to a combination of being overwhelmingly-busy at the time, as well as generally curious about the service... but it eventually became time for me to move on[^1].

### Octopress
I've become quite enamoured with Octopress - the blogging engine that I use for this site (and host on GitHub). I like to think of it as the anti-Wordpress - it produces good, old-fashioned directory trees of HTML pages from [markdown](http://en.wikipedia.org/wiki/Markdown)-formatted source files and [SASS](http://sass-lang.com/) style sheets. No application server or database, and the attendant care and feeding, required - just a plain old web server serving files[^2]. This is a perfect choice, it turns out, for a basic company site. It has all the necessary infrastructure for blogging, should that become necessary, and has built-in responsive design and other niceties.

### Hosting
S3 is Amazon Web Services' online file storage service (distributed, redundant, RESTful, etc). It is purportedly used as the persistence backend for [Dropbox](http://dropbox.com), among others. My needs are considerably more modest - I just want it to store and serve my site content. It turns out it has an option for exactly this purpose:

{% img center /images/2013/s3.png 600 'S3 Static Website Hosting' %}

Thus, a static website with Octopress and S3 requires that you simply:

1. create content within an Octopress repository
2. execute Octopress' `bundle exec rake generate` to produce static HTML
3. deploy the output to an S3 bucket (`bundle exec rake deploy`)

### Deploying
Out of the box, Octopress does not know how to deploy to S3. That's easily remedied via an extension to the `Rakefile` that I found via this [blog post](http://www.jerome-bernard.com/blog/2011/08/20/quick-tip-for-easily-deploying-octopress-blog-on-amazon-s3/). With that `s3` rake task added, and S3 bucket variables defined, it's simply a matter of running `bundle exec rake deploy`. to deploy new content. The underlying `s3cmd` is, obviously, smart enough to only send content deltas to the S3 bucket.

### Cost
At the time of writing, Amazon charges 9.5¢ per Gigabyte-month for the first 1TB of storage (cheaper thereafter), plus 0.5¢ per 1000 RESTful (GET, PUT, etc) operations, plus some minimal data transfer charge. One reasonable way to describe this might be: **extremely inexpensive**!

### So Far, So Good
Thus far, I'm really happy with this setup. My personal blog, this site, is currently hosted on [GitHub Pages](http://pages.github.com)[^3], but I'll probably move this over to S3 also. Obviously, the static site constraint remains - I can't, for instance, have a page with a form, or an XHR endpoint, etc. But if those should become necessary - it's very easy to upgrade to an EC2 instance with Rails, and remain within the Amazon ecosystem. I guess that's how they get you...

[^1]: Squarespace is definitely overkill for a static site if you have the time, knowledge and inclination to host it elsewhere. But many website-needing entities do not possess the intersection of those properties - hence the genius of Squarespace as a product itself.
[^2]: This resultant simplicity has an inherent appeal - not dissimilar to that, for me, of iOS vs OS X. The former trades possibility for simplicity - a desirable exchange in many (but obviously not all) scenarios.
[^3]: GitHub Pages hosts static sites for free - not wishing to trespass on GitHub's awesomeness, I reasoned that I should probably pay for the business site's hosting. All 68¢ of it, or whatever the final bill ends up being.
