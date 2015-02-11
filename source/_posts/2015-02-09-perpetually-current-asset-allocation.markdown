---
layout: post
title: "Perpetually-Current Asset Allocation"
date: 2015-02-09 12:06:37 -0800
comments: true
categories: finance tfsa rrsp investing google
description: Using Google Finance for perpetually-current views on one's portfolio asset allocation.
---
One of the more tiresome aspects of self-directed investing is keeping track of a single logical portfolio that spans multiple accounts on an up-to-date basis. For a Canadian individual, this is quite often as many as three separate accounts – RRSP, TFSA, and non-registered.<!--more--> For a family unit treating its assets as one joint portfolio, this can balloon to well above six separate accounts once the various RESP, LIRA, etc[^1] possibilities are factored in.

The various online brokerages *could* solve this problem for their customers very effectively as they uniquely possess all the relevant data, but of course, as I've [oft-lamented][lament], financial institutions generally don't seem to be clued into the *not-at-all-controversial* idea that their customers would appreciate high-quality and useful software experiences in banking. Therefore, it usually falls to the individual to build and maintain a spreadsheet that captures this information. The problem with this approach is that it's a *point-in-time* measurement: it's accurate right now, but becomes stale as time marches on – at which point you need to update it to reflect current prices.

It turns out that [Google Sheets][sheets] has a very useful *function*[^2] which facilitates a *perpetually-current* rather than *point-in-time* overview of one's asset allocation: `=GOOGLEFINANCE()`. This spreadsheet function makes an API call to [Google Finance][fin] to get the current price for a particular asset. It even works with currency pairs; e.g. `USDCAD`. For example, these invocations in Google Sheets will yield the current price:

    =GOOGLEFINANCE("AAPL", "price")
    =GOOGLEFINANCE("TSE:XIC", "price")
    =GOOGLEFINANCE("currency:USDCAD")

The asset allocation measurement implications are undoubtedly obvious: one can represent a portfolio as a Google Sheets document, and the asset balances, and more importantly, allocation percentages will be perpetually-current. I've built a sample spreadsheet using this technique - it's publicly [available here][portfolio].

{% img center /images/2015/portfolio.png 700 'Portfolio' %}

One need only update the quantities in the **ETF Units** section, and the total in the bottom-right will be the current value, in CAD, of the entire portfolio. A few caveats: this won't track cash dividends, and ETF unit totals will need to be updated on the dividend frequency if [Dividend Re-Investing][drip] (DRIP) is enabled. Still, it has served as a useful tool for me, especially in the context of contributions on an ongoing basis. With a perpetually-current asset allocation, I can very easily determine which asset class is furthest out of alignment, and use new contributions to rebalance.

As ever, none of this is financial advice – simply a retelling of my own [lay] experience.

### Confidentiality Implications

There's a broader discussion to be had about one's comfort level with this sort of information, or any confidential data, living *in the cloud* – whether directly in Google Docs, or via files in a synced directory like Dropbox. Personally, on balance, I'm fine with it, and a great deal of that comfort derives from my fairly stringent security practices: strong unique passwords, a [password manager][1p], two-factor authentication, etc.

[1p]: https://agilebits.com/onepassword
[sheets]: https://docs.google.com/spreadsheets/u/0/
[fin]: https://www.google.com/finance
[portfolio]: https://docs.google.com/spreadsheets/d/1CiCxHDfLRKANMKoE_vwecvc86tJ-sh9FHPNpNVmoVB0/edit?pli=1#gid=0
[lament]: http://liggat.org/2014/04/22/a-call-for-modern-banking/
[drip]: http://en.wikipedia.org/wiki/Dividend_reinvestment_plan

[^1]: As ever, [accounts are containers](http://liggat.org/2014/06/05/accounts-are-containers/).
[^2]: In the `function()` sense of the word.
