---
layout: post
title: "A Minor Rant on Package Tracking"
date: 2013-11-30 23:11
comments: true
categories: rant software
---
I do a fair bit of online shopping[^1], and have done so for pretty much my entire credit-card-wielding life. It's a familiar ritual: every time, shortly after I've clicked `Purchase`, an email arrives containing a linked phrase with roughly the following copy: *Click here to track your shipment*. <!--more-->And every time I receive that email, I dutifully click that link, only to be met with the following 404-esque response:

{% img center /images/2013/tracking.png 600 'tracking' %}

It does not seem to matter whether the year is 2005 or 2013, and whether the logistics handler in question is Canada Post, USPS, UPS, etc - this is invariably the experience. This is a minor but absolutely-nagging annoyance if you know anything about software. It does not need to be this way.

Subsequent to the buyer's order, the seller and the logistics handler must perform an asynchronous (with respect to the buyer) transaction in which, among other things, data is exchanged regarding the delivery to be executed. At some point in this process, the seller is provided with a tracking number for that delivery, which they happily relay to the buyer in the aforesaid email. Therefore, when the buyer excitedly clicks on the tracking link, they are performing a lookup of **a record that is certain to exist somewhere on the logistics handler's systems**, and yet are *told* it doesn't exist.

I imagine that at this point, given the opportunity, the CTO of one of these logistics handler outfits might loudly interject *"Well, of course - but the consumer web frontend and the logistics backend are entirely separate systems that we need to batch transfer over, and because of our legacy... and because of our storage requirements... and because of our load balancing... and because of Sarbanes-Oxley... and...."*

And I'm sure these would all be perfectly justified reasons, within the infrastructure team of that firm. The point is though, I don't care **why** the tracker was *unable to find any results*. And neither does any other user. This is a bad experience, and they can, and should do better. A few suggestions, in increasing order of implementation complexity:

1. Make a better *unable to find any results* page. Acknowledge that this is a new tracking number, and will be in the systems shortly. Provide a timeframe. Differentiate between new numbers, and erroneous ones (use a [checksumming](http://en.wikipedia.org/wiki/Checksum) scheme in the numbers themselves if necessary).
2. Coordinate with the seller. Don't fire out emails containing tracking links until both the seller and the logistics handler agree that the delivery will be performed, a tracking number exists, and the tracking number is queryable. I don't want an email with a link that I can't use until some unspecified period has passed.
3. Build better infrastructure. It is well within the ability of humanity's current software engineering to run systems without such absurd temporal lags within a single organization's infrastructure. This is not an especially complex technical problem. If your logistics and web-query systems are entirely separate, and they take 6 hours to propagate records - get that 6 down to 5. Then to 4. Then to 3. Etc.

Clearly, this is not an important concern in the grand scheme of the universe. Invariably, the links start working eventually, and the packages arrive. But the triviality is no reason to not demand a modicum of progress.


[^1]: I did even more when I lived in the USA. The selection and swiftness of delivery of online purchasing there is nothing short of remarkable, especially under Amazon Prime.
