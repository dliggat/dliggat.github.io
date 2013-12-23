---
layout: post
title: "A Golden Age of Software"
date: 2013-09-03 17:57
comments: true
categories: software
---
As someone to whom pessimism and cynicism come naturally, I'm often more inclined to complain about things than sit and reflect on positivity. However, I think it's worth taking a moment to acknowledge one thing: we live in a golden age of software right now, at least relative to any point in the past.
<!--more-->
This is not to suggest there aren't problems. For example - I'm incredulous to the point of [speechlessness](http://en.wikipedia.org/wiki/Facepalm) whenever I use a television set with any current digital TV product at just how universally terrible it all is. I'm not at all interested in live TV or any sports or the various trappings, and thus am not in the target market - but I can scarcely believe people willingly buy these altars of frustration. Just consider, for a moment, the breathtaking lack of product and user-focus that this on-screen prompt represents:

> This programming is also available in High-Definition. Would you prefer to switch to that instead?

All the way from product development, through system design and implementation, to QA, and finally deployment, with presumably a good few boardroom demos along the way - apparently no one thought about the absurdity of *even bothering to ask* if HD is preferable to the viewer over SD[^1]. I could rant all day about examples like this. Clearly humanity's grand experiment with software has not yet reached its zenith.

However, when I reflect on my career in software - now close to entering its tenth year - the progress of that period from `2003` to `now`, just in terms of my own personal 'software environment', is truly staggering to behold:

* **Operating System**: I used to get work done in Windows XP, which, on good days, would manage to not kernel panic. Linux was around, but - only if you didn't care about digital cameras or WiFi, and enjoyed endless tinkering with device drivers. For all of Unix's enduring importance from the seventies onwards - Windows & Microsoft were the absolute ironclad conduit between most people and computation. Compare that to today - it's worlds apart.
* **Productivity**: It used to be that if it had words it went into a `.doc`, and if it had numbers it went into a `.xls`. End of story. Now, I have very little real need for an office suite - all the various little uses cases have been unbundled into more suitable specialized tools. Notes go into Evernote. [Soulver](http://www.acqualia.com/soulver/) and [Alfred](http://www.alfredapp.com/) for impromptu calculations. Google Docs (and soon, iWork for iCloud) for persisted spreadsheets. [Freshbooks](http://www.freshbooks.com/) for accounting. [GoodReader](http://www.goodiware.com/goodreader.html) for annotating PDFs. Etc. Excel remains a peerless tool at the high end - but it overserves most people's, or at least my, needs in the vast majority of cases.
* **Email**: I have vivid memories of the days when an email account was tightly coupled to a single physical computer, almost by axiom. No web access, no multi-gigabyte, searchable, hosted backing store, and certainly no IMAP, push notifications, or synchronized read state between multiple devices. Mail host storage was a jealously guarded commodity - and shunted off their systems to your *sole* machine with haste.
* **Version Control**: God help you if you attempted a merge and got it wrong with early (and hell, probably current, if they still make it) versions of Source Safe. And branches? Forget it. There's no terror quite like the terror of a computer-science co-op student who is pretty sure he just fouled up the company VSS repository (me; circa 2004). Today, git, especially used within [GitHub](http://github.com), verges on perfection for covering the problem space of 'version control'. I'm not sure I can name a piece of software more powerful, or useful, or robust, or complete at doing the job it was designed to do.
* **Programming Languages**: Dynamic, strongly-typed, ultra-expressive languages like `ruby` and `python` have a rich history, but they've only really come into widespread use in the latter portion of the 2000s. I learned to program in `C++`, and looking back, I'm surprised that didn't put me off the whole enterprise[^2]. `Java` is worse - the hideous jargon endemic to its ecosystem and infuriating toolchains for starters, let alone the needlessly-verbose language itself.
* **Writing Code**: Visual Studio or Eclipse[^3] versus [Sublime Text 2](http://www.sublimetext.com/2) - enough said. IDEs still have a role to be sure, especially for developing native software, but I dislike using them, and I'm glad I mostly don't have to.

In writing this, I've basically deduced what are actually two pretty obvious observations:

1. Current software which already had a predecessor equivalent in the past has gotten *profoundly* better.
2. Devices/objects which weren't software driven in the past and now are (e.g. TVs, cars) need to, and presumably will, improve drastically.

It'll be fun to revisit this post in another ten years and opine, hopefully, about how good television[^4] software is and that it has since joined the ranks of productivity, email, version control, etc. I sure hope so.

In the meantime, get rid of the damn HD prompt, *please*.

[^1]: Honestly, this was on a shipping digital TV unit that I used.
[^2]: To be fair, I did hate the first half of UBC's `C++`-based CPSC 152 until things started to click about two-thirds in. And I do think new programmers should be exposed to the world of pointers and manual memory management - but I would argue that `C` is a better environment than `C++` for that.
[^3]: Apparently people still use this. Oh, the humanity.
[^4]: Assuming 'television' is even a relevant concept in 10 years. I would not be at all surprised if 100% of the software and network functionality moves to phones and tablets, and TVs become nothing more than dumb wireless output devices for their content. Initiatives like AirPlay, locked thought it is to the Apple ecosystem, are a pretty big step in this direction.
