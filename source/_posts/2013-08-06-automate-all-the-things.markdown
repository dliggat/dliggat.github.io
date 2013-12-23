---
layout: post
title: "Automate all the things"
date: 2013-08-06 13:04
comments: true
published: true
categories: workflows automation github boxen
---
I've spent much of my career in software with automation an implicit and often explicit goal: in testing, in environment creation and deployments, in backups, etc. A conspicuous absence from this list has been the actual development machines I spend many hours each day using, which for me are my Mac desktop and laptop, and occasionally a VM or two. Traditionally, these have ended up at their working state through hours upon hours of gentle tinkering. It's a case of the cobbler's children having no shoes[^1], I suppose.
<!--more-->

To correct this error, I've spent a portion of the past few weeks getting up to speed with GitHub Inc's excellent Puppet-based [Boxen](https://boxen.github.com) tool for provisioning their own internal OS X 10.8 Mountain Lion machines. Although the learning curve is not exactly shallow, and the documentation sparse at times - the payoff has been tremendous. You can use it to script absolutely every aspect of your development machine(s), resulting in the same degree of repeatability and auditability that we normally reserve for production servers.

### My Boxen
From a clean install[^2], I've now got a fully-specified, version-controlled, [boxen instance](https://github.com/dliggat/boxen) that, at a stroke can:

* Set up, and store my GitHub credentials[^3] for convenient push/pull to authorized repositories
* Install system-wide versions of git, node.js, and rubies (1.8.7, 1.9.3, 2.0.0)[^4]
* Install standard apps like Dropbox, Chrome, iTerm and even VMWare Fusion
* Set my fussy OS X system preferences for the Dock, Dashboard, Trackpad, etc
* Clone my [dotfile repository](https://github.com/dliggat/dotfiles) and define various symlinks from `~` into that repo; e.g. `~/.bashrc -> /Users/daveliggat/git/dotfiles/bashrc`, plus define any other symlinks or environment variables that I might want to have
* Install system-wide gems (e.g. `pry`) and homebrew packages (e.g. `sqlite`, `markdown`)
* Define and spin-up resources needed on a per project basis, which for a rails app likely includes local MySQL or PostgreSQL instances, a cloned git repository, and a redis server
* Set up my text editor of choice, [Sublime Text 2](http://www.sublimetext.com/2), and install the plethora of plugins and preferences that I use

{% codeblock Boxen/Puppet allows encapsulation of automation areas into 'classes' lang:rb %}
class people::dliggat {
  notify { 'class people::dliggat declared': }
  include people::dliggat::apps
  include people::dliggat::dotfiles
  include people::dliggat::git
  include people::dliggat::homebrew
  include people::dliggat::symlinks
  include people::dliggat::loginitems
  include people::dliggat::osx
  include people::dliggat::sublime_text_2
}
{% endcodeblock %}

Assuming you're inclined to care about things like this, it's hard to overstate the satisfaction of kicking off this script and coming back to a fully-provisioned machine a couple of hours later. Best of all, Boxen is cumulative and [idempotent](http://en.wikipedia.org/wiki/Idempotence), so changes can be made to my Boxen install (and then always specified and available in future) and re-run without worrying about it blowing up because it encounters its own previous completions.

If anything, everything I've written here *understates* how capable Boxen is. I'm presently using it for a couple of machines in a home office - GitHub uses it for their *entire* corporate fleet of MacBook Pros. Eventually the plan is that this becomes a centerpiece of the 'onboarding' experience at [Plyfe](http://plyfe.com), so new people can be productive instantly without messing around with `rvm` or `redis-server` or whatever else.

### tl;dr - Automation Rules!

[Bruno Oliveira](https://plus.google.com/+BrunoOliveira) captured the essence of why automation is so great in a widely circulated [chart](https://plus.google.com/+BrunoOliveira/posts/MGxauXypb1Y) a year or so ago:

{% img fancybox center /images/geeks.png 550 'Geeks' %}

### Appendix, or Why I like OS X

Occasionally I'm asked why I like OS X so much. There's a certain subset of the tech population that still thinks, apparently with genuine conviction, that Apple only makes toys. It's a bizarre and/or myopic belief in a world where Google Inc is known to be one of the largest institutional buyers of MacBook Pros (and I know from first-hand experience they certainly aren't buying them to mess about with GarageBand), but it persists.

Anyway, the very existence of projects like Boxen is just about the best answer I can give in response. There's so much cool stuff going on in software these days, and a huge portion of it is done with OS X. I might be moving in the wrong circles, but I simply don't see this level of innovation going on in the Windows world. And given how inherently less scriptable Windows is than anything Unix-based, it's hard to imagine an equal Windows-based peer of Boxen emerging anytime soon.

I like to think of OS X as having the best of both worlds of Windows and Linux: user-facing conveniences, plus a modern UI, plus a high degree of scriptability, plus access to forty-years worth of Unix utilities, **minus** the interminable and recurrent headaches with video card drivers, etc that you (or at least I) get with Linux. If I'm restricted to buying Apple gear to get that combination for now, so be it.


[^1]: As also remarked by Gary Larizza in what turned out to be a [highly useful Boxen primer](http://garylarizza.com/blog/2013/02/15/puppet-plus-github-equals-laptop-love/).
[^2]: Via the Mac App Store to install the Xcode developer tools which provide the system ruby and git binaries necessary for Boxen to bootstrap itself.
[^3]: Using the method of https repository access and the OS X system keychain, not ssh keys.
[^4]: A happy side benefit to letting boxen manage ruby versions is the obviation of somewhat horrible kludges like `.rvmrc` files in ruby project directories

