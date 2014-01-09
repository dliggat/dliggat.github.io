---
layout: post
title: "A New Design"
date: 2013-12-24 18:14:09 -0800
comments: true
categories: design blogging octopress
---
I've been using [Octopress][octopress] as a blogging platform for over six months now, and can't recommend it enough for tech capable (or curious) writers. However, I've never been fully happy with my minor adaptations to the default style. I finally got around to implementing an improved design.<!--more-->

### Original
My site started off looking like this:
{% img center /images/2013/old-octopress-style.png 700 'Old' %}

It was by all means serviceable, but I was starting to tire of the excess *chrome* - the prominent header, the large nav-bar, and the unnecessary *Recent Posts* sidebar. Morever, despite numerous tweaks to the layout, colouring, and typography - it still instantly *looked* like an Octopress site[^1].

### Design Objectives
I'm not a UI designer, either by trade or by realistic-aspiration[^2]. Still, I had a pretty good idea in mind what I wanted my home on the web to look like.

* __Content Focus__: This site exists for one purpose - a place to store material that I write. Anything that's not written content distracts from that objective. Among other things, that means the large, colourful header needs to go.
* __De-Octopress the UI__: Octopress is the infrastructure for this site, and will be for the far-foreseeable future. That doesn't mean I need to rely on its default UI styling, and in fact, I'd greatly prefer it didn't *look* like an Octopress site. I still want to rely on the basic Octopress layout though, as well as its [responsive design][responsive].
* __Better Typography__: I've long been a little too zealous in observing the 'rule' that [sans-serif][sans] headers should be paired with [serif][serif] body text. Accordingly, I initially used the serif Google Font [Lora][lora] for the body, but was never quite happy with the choice. Many blogs I read eschew serifs entirely, and the effect is well-suited to the content[^3].
* __Better Footnote Styling__: Chris Suave's excellent [Bigfoot][bigfoot] footnote implementation is far superior to numeric in-page anchors. I wanted to replace the latter with the former (or similar).

### Result
With a bit of spare time over Christmas 2013, I hacked away at my blog's [git repo][repo] to shape the design. I'm pretty happy with how it's turned out:

#### Desktop Layout:
{% img center /images/2013/new-octopress-style.png 700 'New' %}

#### Mobile Layout:
{% img center /images/2013/new-octopress-style-mobile.png 350 'New' %}

I'm still a bit ambivalent about having comments at all, but otherwise, I'm happy with how it looks. It'll be interesting to review these design decisions down the line.

[^1]: This style is instantly recognizable around various corners of the web - all deriving from the design on [octopress.org](http://octopress.org) itself. The gradient and text-shadow on the nav-bar is a dead giveaway.
[^2]: I have *just* enough design knowledge to overcome the [Dunning-Kruger effect](http://en.wikipedia.org/wiki/Dunning%E2%80%93Kruger_effect).
[^3]: i.e., we're not writing the New York Times here.

[lora]: https://www.google.com/fonts/specimen/Lora
[serif]: http://en.wikipedia.org/wiki/Serif
[sans]: http://en.wikipedia.org/wiki/Sans-serif
[responsive]: http://coding.smashingmagazine.com/2011/01/12/guidelines-for-responsive-web-design/
[octopress]: http://octopress.org
[bigfoot]: http://cmsauve.com/labs/bigfoot/
[repo]: https://github.com/dliggat/dliggat.github.io
