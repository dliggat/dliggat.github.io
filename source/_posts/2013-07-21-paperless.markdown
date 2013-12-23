---
layout: post
title: "Paperless, Finally"
date: 2013-07-21 13:33
comments: true
categories: workflows paperless evernote
---
I'm sick to death of accumulating useless paper detritus. I've fantasized for quite a while about finally finding a 'paperless' workflow that will work well for me now and, _crucially_, many years (decades) into the future. After reading posts on [similar](http://shawnblanc.net/2012/09/the-paperless-puzzel/) [initiatives](http://speirs.org/blog/2012/6/25/book-scanning.html), I think I've got it. I figured I'd document it here, mostly as an exercise in [rubber-duck debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging) of sorts.<!--more-->

### Requirements
* __Recallable__: I should be able to look up a particular document or item purely by knowing a keyword or two, or the rough timeframe in which it was generated. Vast hierarchical organization schemes are only defensible if you're a librarian in the pre-computing age. We can do much better in 2013. The Gmail ethos of "search, don't sort" works really well for me.
* __Enduring__: This needs to last for the long haul. There's an expectation I've set for myself that the core elements of this workflow will persist well beyond a decade, and ideally for the entirety of my [useful] life.
* __Robust__: Really this applies to all my personal data at this point - but under __no__ circumstances can a paperless archive be allowed to suffer any data loss.
* __Secure__: Whatever system one has for organizing personal documents, even if that's a physical shoebox full of physical documents, there's a chance that a breach of one's personal data can occur. Acknowledging this, I want my system to make sensible security decisions where possible, and overall, to _minimize regret_. Trade-offs, as ever, exist - the shoebox may not be vulnerable to Belarusian hackers, but it _is_ vulnerable to house fires.

### Implementation

#### Platform
[Evernote](http://www.evernote.com) [Premium] forms the centrepiece of my paperless workflow. I'm totally sympathetic to the assertion that it's better to keep long-lived data in highly-portable formats (e.g. PDF files, markdown-formatted UTF-8 text, etc). Using Evernote is somewhat in contravention of this goal, as it stores notes within its own opaque archive format. However, this archive is fully-exportable and navigable, and in the event of Evernote dropping off the face of the earth, there will be no shortage of tools for migrating its notes and notebooks to a new platform. And Evernote has proven itself over the years - achieving profitability, and garnering ever more paying consumers, businesses, and educational institutions every year - even going so far as to declare itself a [hundred-year company](http://techcrunch.com/2011/11/06/evernote-ceo-phil-libins-top-three-tips-for-building-a-hundred-year-old-company).

Taken together, objections to Evernote for paperless seem mostly theoretical, rather than actual, to me. Moreover, the benefits in having a syncing, sortable, and _highly searchable_ archive seem worth tolerating that conjectural downside.

#### Scanning
{% img right /images/send_to_evernote.png 275 'Send to Evernote' %}

I recently ordered a [Doxie One scanner](http://www.getdoxie.com/product/one/), for $147 CAD or thereabouts. It's simple, and gets the job done. Its OS X app manages to be not terrible for scanning/printing software, which is notable, though admittedly only due to the poverty of the competitive landscape. It quickly processes pages, and saves scans to an included SD card. The app purportedly does [OCR](http://en.wikipedia.org/wiki/Optical_character_recognition) (I'll be relying on Evernote for this though), and allows individual PDFs to be 'stapled' into multi-page documents, and then sent on to Evernote.


#### Evernote Notes Titles
Once in Evernote, I assign the note containing the scanned PDF to an appropriate notebook (a yearly one for business expenses, and Archive for everything else). I wrote a small bash function to generate note titles in a consistent format:

    $ISO8601_FORMATTED_DATE => $LOWERCASE_DESCRIPTION (Paperless)

For example:

    2013-07-11 => apple ipod receipt (Paperless)

I reasoned that the date (hat tip to [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) for its equivalent chronological and lexicographical sorting) is important enough for later retrieval to warrant hard coding in the title metadata[^1]. You can find the bash snippet for this in [this gist](https://gist.github.com/dliggat/5990988).

#### Security

I view 'security' as the dual-property that my data is available to me, and unavailable to unauthorized parties. To this end, I:

* Use strong authentication in Evernote: Set a long, unique, random passphrase, and enable 2FA (2-factor authentication)
* Turn on full-disk encryption on my computers and mobile devices
* Set the mobile app passcode for the Evernote iOS apps
* Export my entire archive biweekly, and backup to an external drive and an off-site location[^2]
* Encrypt particularly sensitive stored PDFs with a strong key (stored, obviously, outside of Evernote).

With these practices in place, I feel sufficiently confident that access to my account is highly-restricted, and even in the worst case scenario of a full data-breach at Evernote, my most sensitive documents (tax receipts, bank statements, etc) are enciphered.

{% img fancybox center /images/evernote_pdf_protected.png 'Protected PDF' %}

### Fin
I'll inevitably evolve this over time, but I'm feeling pretty good about the setup so far, and its adherence to my goals of **Recallable**, **Enduring**, **Robust**, & **Secure**. So far, I've been happily adding stuff to my archive, and not yet experienced any inertia or fedup-ness. That's probably a good sign.

There will be a few documents I'll begrudgingly retain in paper form - governments, perennially stuck in the clipboard and fax-machine era, tend to take a dim view of anything digital, but mostly, I'll be enthusiastically converting documents into Evernote notes, and destroying the originals forever.

Another victory for bits over atoms. Any comments, suggestions, or questions, please [get in touch](/about).

[^1]: The date is for sorting and narrowing, the description terms are for searching, and the (Paperless) suffix identifies a note as originating from this workflow
[^2]: I know this probably seems excessive, but having a catastrophic data loss in the past [many years ago] will do that to a person
