---
layout: post
title: "A Call for Modern Banking"
date: 2014-04-22 09:40:07 -0400
comments: true
categories: rant banking tech_societal
---
I can scarcely walk past a bus shelter without being shown a poster by one of the big-five Canadian banks invariably touting their extended branch hours, new location(s), or magnanimous decision to remain open on Sundays. Guess what? No one under 60 cares.<!--more--> Visiting a bank branch is unnecessary for the overwhelming majority of banking interactions, and most people only do so on exceedingly rare occasions and with substantial reluctance due to the trespass upon time and the general hassle that a visit represents[^1].

What I, and undoubtedly many others, *would* like to see, however, is **modern online services**. I'm actually astonished that one of these banks has not thrown a bit more investment in this direction – or if they have – it's not at all externally apparent. Right off the top of my head I can produce a laundry list of substantial online enhancements that I'd like to see a bank implement - I'd switch all my business in a heartbeat to any bank who made even a modest subset of these changes. I bet I'm not alone.

### My Wish List
1. **Two Factor Authentication**. My [email][gmail], my [digital archive][evernote], my [cloud storage][dropbox], and my [Twitter][twitter] account all have two-factor authentication ([2FA][2FA]). Why doesn't my bank account? It's not like 2FA is an unfamiliar concept to either the banks or the populace - [chip & PIN][chippin] for debit and credit cards has been deployed in Canada for many years. It seriously astounds me that as I write this in 2014, this hasn't been rolled out on the web by any bank that I'm aware of.
2. **Sensible Policies on Passwords**. Canadian banks seem to have an odd philosophy on passwords. TD's iOS app does not appear to permit paste into password fields - needlessly complicating the usage of password managers like [1Password](https://agilebits.com/onepassword/mac). BMO mandates an alphanumeric password of **precisely-six alphanumeric** characters[^2]. Why the artificial limitations? These measures are destructive, not augmentative, of online-security.
2. **Modern Web**. The web has improved immeasurably over the past decade. With the scourge of Internet Explorer's worst transgressions behind us, and transformative technologies like responsive-design, web typography, CSS transforms, client-side JavaScript frameworks (i.e. [Ember.js][ember]) constantly entering the tech-zeitgeist - it's a golden age for the web[^3]. You'd never know it though, based on the appearance of online banking. I'd be happy as a start with even a bit of interface-enhancing JavaScript, which is curiously absent from banking web apps - virtually unthinkable in 2014 in most other online contexts. Instead, absurdly high page latencies, an an absence of responsive-design and stodgy *Times-New-Arial* typefaces[^4] are the order of the day.
3. **Mobile apps**. Curiously, most Canadian banks do have mobile apps, on iOS at least, and yet they don't seem to serve any real purpose beyond marketing. Utility wise, there's no point having a mobile app that's nothing but a native container for [in their case, tremendously-slow-to-render] web content. With the exception of the Tangerine[^5] app's ability to photo-deposit cheques – a welcome, if belated arrival – none of these apps actually enable any use-case that couldn't be accomplished in a mobile browser. I'd like to see authentication caching, some use of native UI components perhaps, and a robust, configurable push notification scheme for transaction/payment alerts. And, of course, their possible use as a vehicle for the aforementioned 2FA.
4. **Data**. I want access to my data. No, not as some Quicken [blob](http://en.wikipedia.org/wiki/Binary_large_object) or a poorly-formatted CSV file, but in a sane, structured format, preferably [JSON](http://en.wikipedia.org/wiki/Json)[^6]. It remains an utter hassle to view and use historical banking data - to find a particular subset of recurring transactions for example. Better structured banking data would enable entire classes of tools, workflows, and even businesses to exist.
5. **API/OAuth**. Relatedly, I want a programmatic method to access this data, and support for an authorization technique like OAuth to delegate **revocable** access to a trusted third party. This is a well-solved problem - it is a ubiquitous pattern in tech, and there is enormous demand for it to exist. Since it doesn't exist - horrible kludges like providing aggregation sites (e.g. [Mint](https://www.mint.com/)[^7]) banking credentials are the only way to enable third-party access.

[gmail]: https://support.google.com/accounts/answer/180744?hl=en
[evernote]: http://blog.evernote.com/blog/2013/10/04/two-step-verification-available-to-all-users/
[dropbox]: https://www.dropbox.com/help/363/en
[twitter]: https://blog.twitter.com/2013/getting-started-with-login-verification
[2FA]: http://en.wikipedia.org/wiki/Two-step_verification
[chippin]: http://en.wikipedia.org/wiki/Chip_and_PIN
[ember]: http://emberjs.com/

### Objections
I bear no illusions that a CTO or similar executive from one of these banks will even see this, much less take it seriously. Even if they did see it, I can imagine the guffaws about how unrealistic this nerd's demands are:

* *"We can't justify the cost of a massive online systems redesign!"*
* *"Don't you know how complex our legacy backend is - our password policy was chosen to support that!"*
* *"We have a myriad of customers and browsers to support - not everyone is running Safari on brand-new MacBook Pros you know!"*
* *"The regulations we under would never permit API access! We can't ever permit customer data to go to 'third parties' - the banking regulators and the newspapers would have a field day!"*

I'm absolutely aware that what I'm suggesting requires investment, that banks operate under strict regulation, that data integrity is critical in the financial system (i.e. so technological conservatism is desired). I'm further aware that the user base is indeed large, of a wide spectrum of technical-comfort, and that the user-age-distribution is [negatively-skewed](http://en.wikipedia.org/wiki/Skewness)[^8].

So, sure – there are obstacles. But this stuff is hard to get right, not just the tech but also the product vision that goes along with it. With each passing year, the gap between online-banking and the rest of the modern web grows ever starker. I see no reason why the tech we use everyday in virtually every other aspect of life should rocket ahead in functionality, design, thoughtfulness, integration, etc - while finance/banking remains virtually the same today as in 2004.

If nothing else, I believe excellence in these areas will become a competitive advantage sooner than banks apparently seem to think. In ten years time, does anyone really think that the major customer service innovation to be touted from every bus-bench will still involve the local branch in some way?

[^1]: I realize there's an incentive misalignment here - more branch visits implies more sales opportunities.
[^2]: Forbidding symbolic characters is a [misguided](http://www.troyhunt.com/2012/09/do-you-allow-xss-in-your-passwords-you.html) defense against XSS or SQL-injection - passwords should be cryptographically hashed right away, anyway.
[^3]: And much software generally, [as I've argued](http://liggat.org/2013/09/03/a-comparatively-golden-age-of-software/).
[^4]: I realize that **better typography** performs poorly in a DCF calculation. But then, presumably so do the potted rhododendrons festooning the lobby of every branch.
[^5]: née ING Direct
[^6]: it's easy to parse and is the [lingua franca](http://en.wikipedia.org/wiki/Lingua_franca) of programmatic access to data over the Internet.
[^7]: However good Mint's security is–and I have reason to believe it is **very** good as I've met a few of the early engineers–providing credentials to them will always be a highly inferior way to delegate access. Plus it's explicitly forbidden by the Terms of Service for many banks.
[^8]: Presumably age and wealth correlate fairly well, which likely explains a large amount of the dogged focus on new branches and 'convenient' hours in bank advertising.


