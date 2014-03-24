---
layout: post
title: "IPv6: An Unreachable Wall?"
date: 2014-03-23 15:55:48 -0400
comments: true
categories: [IPv6, IPv4, technology, "combinatorics", "address space"]
description: IPv6 is the first system with truly indefinite room to grow.
---
In [episode 16](http://www.fiatlux.fm/pragmatic/16) of [Ben Alexander](https://twitter.com/fiatluxfm) and [John Chidgey's](https://twitter.com/johnchidgey) excellent [Pragmatic](http://www.fiatlux.fm/pragmatic/) podcast, the hosts touched upon the unfortunate tendency of organizations & individuals to underanticipate the scale of future demands upon their designed technology.<!--more-->

Examples of this phenomenon abound:

* The North American [PSTN](http://en.wikipedia.org/wiki/Public_switched_telephone_network) seemed like a vast address space at the time of its inception, and yet I've been through [at least one](http://www.cbc.ca/news/canada/vancouver-gets-10-digit-dialing-1.275934) extension in my life, as fax machines and mobile phones consumed far more telephone numbers than was anticipated.
* "*640k [of computer memory] ought to be enough for anybody*" - as famously attributed to Bill Gates[^1].
* The ubiquitous Intel x86[^2] CPU architecture use 32-bits for addressing locations in system memory; this imposes a hard theoretical 4GiB limit on memory size, which is meager by 2014 standards.
* [IPv4](http://en.wikipedia.org/wiki/IPv4), which uses **32-bits** to assign IP addresses (e.g. of the form `123.255.123.255`) to devices on the public Internet is insufficiently large of an address space to accommodate all future computing devices, and the world will need to transition[^3] to [IPv6](http://en.wikipedia.org/wiki/IPv6) at some point.

At some point, progress causes us to run into the limits imposed by these upper boundaries. John referred to this phenomenon as "hitting the wall", and casted it as an inevitability for any technology.

I agree wholeheartedly, but one with one caveat. I know that history (and John Chidgey) are not on my side here[^4], but I'm going to go on record with the following postulate: once we finally switch to it, **IPv6 will be an unreachable wall; i.e. it will be sufficient indefinitely as an address space for Internet routing**. That is to say - a limit exists, but humanity won't be able to reach it.

### IPv4
My argument for this is strictly numerical. IPv4 uses 32-bits to uniquely identify devices[^5] on the public Internet. TCP/IP was birthed into a world of expensive, rare mainframes - computers and Internet connections were scarce. Four billion unique IPs (i.e. **2<sup>32</sup> = 4,294,967,296**) must have seemed vastly beyond sufficient at the time. Yet as in write this in 2014, it's worth noting that China alone has [700 million](http://ben-evans.com/benedictevans/2014/3/12/700m-smartphones-tablets-in-china) active smartphones and tablets, most of which consume a IPv4 address. We're hitting the wall.

### IPv6
IPv6, by contrast, skips over 64 bits and uses 128-bits for addressing. This yields **2<sup>128</sup>** possible addresses: an unfathomably huge number. **2<sup>128</sup>** written [in full](https://www.wolframalpha.com/input/?i=2%5E128) has thirty-nine decimal digits, or can be abbreviated as *340 billion billion billion billion*, if you prefer.

While I have great faith in the ability of humanity to [squander](http://en.wikipedia.org/wiki/Tragedy_of_the_commons) a seemingly-endless resource, it is worth reflecting on the sheer scale of this number. The surface area of the Earth is **510,072,000 km<sup>2</sup>**, or, less usefully, **5.101 × 10<sup>20</sup> square-millimeters**. **2<sup>128</sup>** is so large that each millimeter of area on the Earth's surface could [support](https://www.wolframalpha.com/input/?i=2%5E128+%2F+5.101e20) **667,000,000,000,000,000** unique IPv6 addresses! Not in aggregate - that number of addresses exists for *each and every square* millimeter on the Earth, ocean and land alike!

Of course in practice the IPv6 address space will likely not be allocated cleanly - various countries and corporations will likely receive an undeservedly large allocation; blocks may sit unused and reserved, etc. But it seems to me that no matter how poorly IPv6 is stewarded - its massive, planetary scale allows for truly indefinite room to grow. With IPv6[^6] the wall seems, to me, to be unreachable with certainty.

*(It will be especially interesting for me to read this in a decade or two.)*

[^1]: There is apparently some [doubt](http://en.wikiquote.org/wiki/Bill_Gates#Misattributed) as to the veracity of the actual attribution to Gates - but the point stands - everyone in tech has heard a form of this sentiment expressed.
[^2]: Well, it used to be ubiquitous (and unassailable!). The rise of [ARM](http://en.wikipedia.org/wiki/ARM_architecture) (like so much in the tech world since 2007, blame the iPhone) has been fascinating to witness.
[^3]: I'm not too sure how the actual transition process is going. Things have seemed awfully quiet on that front since [World IPv6 Day](http://en.wikipedia.org/wiki/World_IPv6_Day_and_World_IPv6_Launch_Day) in 2011...
[^4]: Both of which should give anyone pause...
[^5]: Clever tricks such as [NAT](http://en.wikipedia.org/wiki/Network_address_translation) ensure that machines in a household or business don't consume one public address each. As far as I'm aware, mobile phones on a data network always consume one public address.
[^6]: Unless, of course, we decide that every **N<sub>2</sub>** molecule on Earth needs to be addressable!

