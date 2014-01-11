---
layout: post
title: "Criticize Real-World NOOPs"
date: 2014-01-08 23:37:42 -0500
comments: true
categories: media
---
In the world of computation, a *NOOP* (*No-Op*eration) is an instruction that has zero effect on the state of the machine. The term originally hails from the esoteric world of CPU-architecture and instruction-sets[^1], but the term is also used semi-colloquially as programmer shorthand for **'this achieves nothing'**.<!--more-->

A very simple example in code might be in setting a variable to the difference of itself and zero (`x = x - 0`), but they tend, as a rule, to not be so obvious. On first glance, they *look* like useful work.

Programmers regard NOOPs with suspicion. Good code reviewers will identify them, question their existence, and  demand exceptional justification for their continued presence. They are unwelcome in quality software not for their outcome - they do nothing after all - but because they *sow confusion*. On first glance, they appear to have a purpose; they subconsciously assuage concerns that might otherwise have been raised in their absence. Many a pernicious bug can be traced back to a NOOP that misled its programmers. A NOOP is a facade: an illusion of real work being performed.

Lately I've been thinking that the term might be applicable in the real-world also. Consider this story:

#### [France hands down data privacy fine to Google](http://rt.com/news/france-google-fine-privacy-339/)
> French data protection watchdog CNIL fined Google 150,000 euros ($204,000) for ignoring its three-month deadline to align its
> practice of tracking and storing user information with the country’s law.

I'm not commenting on[^2], or even particularly interested in this French legal ruling. That's for France and Google Inc to work out.

But it seems to me that regardless of the fine's merit - imposing a €150,000 fine on a company which earns that amount in revenue every *two minutes*[^3], very closely fits the definition of a NOOP. It is the act of doing nothing masquerading as the act of doing something of significance. To an extremely close approximation, it is the judicial equivalent of subtracting zero from an integer.

In its article, RT makes no effort to contextualize this, and it's not just a failing of theirs - it's frankly rare in news media. This is precisely the opposite of the programmer mentality: NOOPs are always to be identified as such, and their presence criticized. The world would greatly benefit from a culture that does a better job in **pointing out pointlessness**.

[^1]: An idle CPU can't actually do nothing, so they would traditionally just repeatedly execute the NOOP instruction in the absence of actual work to do. I suspect that's an oversimplification circa-2014 with the vast amounts of research that have gone into processor energy-efficiency.
[^2]:Disclosure: I'm an ex-Google employee (departed on highly-amicable terms to pursue a Masters) and a long-time admirer of the firm, pre and post employment.
[^3]: Google has [yearly revenues](http://investor.google.com/financial/tables.html) on the order of `$50,000,000,000`. There are `365 * 24 * 60 = 525,600` minutes per year. `$50B / 525.6k ~= $95k ~= €68k`. Two minutes revenue `~= €150k`.

