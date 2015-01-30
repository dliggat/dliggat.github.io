---
layout: post
title: "Personal CVs With Curriculum-Vitml"
date: 2015-01-30 12:16:04 -0800
comments: true
categories: ["ruby", "web"]
description: A tool for personal resumes using nice web technologies.
---
Word-processing documents are, charitably, a *less-than-ideal* way to represent textual content. As a recipient, they necessitate the presence of current and often expensive application software (i.e. Microsoft Office) - at least if you want to view the document with its original visual fidelity intact.<!--more--> As a creator, they are even worse: one ends up pouring effort into a [binary-blob][blob][^1] artifact that is, practically-speaking, untraceable and unversionable. Even if all of these objections were addressed, a substantial existential quandary remains: Word processing workflows were built for a paper centric world. We no longer live in such a world.

And yet, the obvious candidate to replace these has existed for some time: the web!

For all of my philosophical objections to `.docx` and its various derivatives and predecessors and workflows, there's only a single such document in my life that I begrudgingly find myself re-opening to replenish its life and relevance: my resume. I set out to build a better solution.

### Requirements

A better replacement for a word-processor-based resume requires the following:

* Built with web technologies (HTML, CSS)
* Easy to deploy and update at a URL endpoint
* Version controlled content with `git`
* Responsive layout for acceptable mobile-sized viewing
* Reasonable print-to-PDF output for when that's inevitably requested

### Curriculum-Vitml

I've written a tool to address this need called [curriculum-vitml][vitml][^2]. It's a Ruby-[Middleman][mm] static site generator which relies on [Foundation][fnd] for responsiveness, [Sass/SCSS][scss] for styling and [Slim][slim] partials and templates for the various resume elements. Its final output is a static HTML document with a single accompanying stylesheet, but the middleman server and SCSS/Slim components provide an easy update cycle. And of course the whole thing is inherently versionable[^3].

### Entry

A single [CV entry][entry] looks like this:

{% codeblock _01_role.html.slim: A Slim partial representing a CV-entry lang:rb %}
.cv-entry
  .coordinates
    .duration
      h4 Apr-2012 – present
    h3 Chief Awesome Officer
    h4
      span.company Initech
      span.location Vancouver, BC
  .synopsis
    p
      |
        Here I did awesome things.
  .additional
    h4 Highlights
    ul
      li Crafted artisanal code with a focus on awesomeness
      li Ensured I is not in TEAM
      li Leveraged core competencies with a focus on profitability
    h4 Technologies
    p Ruby, JavaScript
{% endcodeblock %}

Each job or 'role' is represented by one of these Slim partials in the repository. I thought about using JSON or YAML for the data storage, but Slim is so readable and easy to update that I decided it wasn't even worth the translation. Additionally – keeping things in web markup allows for custom sections of data – an education section with a grade `<table>` for instance.

### Output

The final web output looks quite notionally like a traditional resume at desktop size:

{% img center /images/2015/resume-desktop.png 500 'Resume Desktop' %}

It's responsive on mobile:

{% img center /images/2015/resume-mobile.png 500 'Resume Mobile' %}

And its print media queries allow for reasonable [PDF output][pdf] (this was generated from Chrome using OS X's 'print to PDF').

Of course, this is all very specific to resume-needs in general, and my resume-needs in particular. But it's the only 'document' in my life with a reasonable chance of still being requested in 'file' format instead of 'URL' format. This bridges that gap. Feel free to use it as a starting point for your own.

[vitml]: https://github.com/dliggat/curriculum-vitml
[mm]: https://middlemanapp.com/
[scss]: http://sass-lang.com/
[slim]: http://slim-lang.com/
[blob]: http://en.wikipedia.org/wiki/Binary_large_object
[fnd]: http://foundation.zurb.com
[entry]: https://github.com/dliggat/curriculum-vitml/blob/master/source/content/roles/_01_role.html.slim
[pdf]: https://github.com/dliggat/curriculum-vitml/blob/master/sample/curriculum-vitml.pdf?raw=true
[^1]: That may no longer *technically* be true with the onset of `.docx` versus `.doc` but it's true for all practical purposes. No one's putting their Word docs in `git` repositories, and if they are, they aren't happy about it.
[^2]: A lazy portmanteau of *curriulum-vitae* and *HTML*.
[^3]: My own personal resume is now a private fork of this repo.

