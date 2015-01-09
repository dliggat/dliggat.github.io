---
layout: post
title: "HTTPS: Emulate the Newspaper"
date: 2015-01-07 20:47:11 -0800
comments: true
categories: ["infosec", "https"]
---
There's a pretty substantial effort around the Internet to get [SSL/TLS][tls] (i.e. [HTTPS][https] as far as the web is concerned) deployed as widely as possible in favour of unencrypted-[HTTP][http]. I won't enumerate the reasons here, though I will direct the reader to [Tim Bray][tb]'s excellent [Private by Default][pbd] post on the topic.<!--more-->

This issue was further covered for a couple of weeks by the folks on the [ATP podcast][atp]; in particular they [discussed][atp97] the issue of whether HTTPS is worth bothering with on mostly-or-entirely static endpoints such as blogs or news sites. They mentioned a number of excellent points, including the use of HTTPS as a mechanism to defeat, or at least hinder, the repellent practice of a [man-in-the-middle][mitm] injecting [ad tracking codes][iad] into the unencrypted-HTTP payloads, or otherwise monkeying with the payload in any way en-route to its client.

Between these and other worthwhile discussions of the issue, I don't have a great deal to add, especially since [infosec][infosec] is a discipline for which I have nothing but personal interest to purvey as a credential. However, an analogy did recently occur to me, and though it's clearly <a href="#flawed">flawed</a>, as are all analogies, it just might be a helpful way to think about the issue.

Imagine a mailbox, attached to a house. The occupant is an enthusiastic reader; and subscribes to a substantial bundle of newspapers. Daily, the occupant retrieves the newspapers, brings them into the house, and behind closed doors engages in an leisurely perusal of their contents.

Any observer of this ritual – from the delivering postal-worker to the binoculared-neighbour on the lookout for prurient gossip – is only able to gain *limited* insight into the interests of the occupant. Certainly, the newspapers themselves leak information about the occupant – conclusions are immediately drawn upon witnessing the various publication titles, and the personal interests and perhaps even personality characteristics that their [union][union] implies.

But that's as far as it goes. *Crucially* – no observer is privy to the set of *actual articles* that pique the occupant's interest, and the time spent reading each one. It is between the occupant and the bundle itself how high-brow, or how low-brow those interests are, how much time is spent on world affairs versus comics and sports, whether any lingering on the seedier classifieds goes on, and so on.

It's undoubtedly clear where this is going: hosts on the web are newspapers, and URLs are articles. Host visitation may well be visible to the observer; URL visitation should not be. It is entirely reasonable to demand that the web should seek to emulate, at a minimum, a comparable privacy affordance to that which naturally exists in the newspaper scenario. Asterisks and fine-print abound, but HTTPS brings this newspaper-esque privacy to the web.

Given the extent to which life – personal, civic, political and otherwise – has moved, and continues to move online, private-by-default is a crucial and long-overdue evolutionary step for the Internet. Whether any given site is largely 'static' or not – it's a distinction that's ultimately irrelevant.

<h3><a name="flawed" class="target">Addendum I</a></h3>
*Of course the analogy breaks comprehensively upon casual analysis: newspapers don't have certificate authorities and the attendant hassles; it's hard to fail at privately reading newspapers but easy to fail at deploying and consuming TLS; things like [Heartbleed][hb] happen, etc. It's also the case that without particular care taken, the [unique payload][up] sizes for the set of site URLs will be able to imply URL visitation anyhow. And perhaps most obviously: the newspaper itself doesn't receive requests for which individual articles you'd like you read.*

### Addendum II
*I'm very vulnerable to charges of hypocrisy, or at least neglect – this very site has no HTTPS endpoint. That'll be rectified this year - probably as a test case for when the [Let's Encrypt]
[le] Certificate Authority launches.*

[pbd]: https://www.tbray.org/ongoing/When/201x/2012/12/02/HTTPS
[le]: https://letsencrypt.org/
[iad]: https://www.eff.org/deeplinks/2014/11/verizon-x-uidh
[tb]: https://www.tbray.org/ongoing/misc/Tim
[https]: http://en.wikipedia.org/wiki/HTTP_Secure
[http]: http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
[atp]: http://atp.fm
[atp97]: http://atp.fm/episodes/97
[infosec]: http://en.wikipedia.org/wiki/Information_security
[tls]: http://en.wikipedia.org/wiki/Transport_Layer_Security
[union]: http://en.wikipedia.org/wiki/Union_%28set_theory%29
[hb]: http://heartbleed.com/
[mitm]: http://en.wikipedia.org/wiki/Man-in-the-middle_attack
[up]: http://security.stackexchange.com/questions/73309/do-payload-sizes-reveal-urls-when-https-is-deployed-on-news-blogs-etc
