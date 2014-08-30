---
layout: post
title: "Why Publicly Forecast?"
date: 2014-06-30 21:10:31 -0400
comments: true
categories: ["finance", "forex", "forecasting", "operations research"]
---
As part of my [Operations Research][or] training, I took a course in statistical forecasting. The course, despite being replete with interesting concepts and methods, had a fairly simple takeaway: more often than not, *forecasting is impossible*. This is particularly true in scenarios with a [martingale][mg]-property such as stock prices.<!--more-->

So it is with that in mind that I cannot help but be cynical when I see a prominent organization, usually a bank or investment house of some sort, publicly forecast financial figures such as currency exchange rates or stock prices.

Consider this statement, as reported by the CBC in January of 2014:

#### [Canadian dollar headed to 85 cents US, TD says][january]
> In the near-term, the loonie is forecast to fall as low as 85 cents U.S. by mid-year.

Why do this? It is hard to ascribe intellectual honesty to such prognostication. For one thing, I'm largely convinced by the [weak] [efficient-market hypothesis][emh], and thus don't believe it is actually *possible* to forecast the price of a currency six months out[^1]. Furthermore, assuming one *could* perform this forecasting with better-than-chance accuracy - why share that secret with the world? That knowledge, guarded jealously and carefully executed upon, would lead to untold riches. It is therefore difficult to arrive at charitable reasons why an organization would make such a pronouncement[^2].

As it turns out, this particular 'mid-year' forecast was dead wrong:

#### [Canadian dollar nears 2014 high against U.S. greenback][july]
> The Canadian dollar tested six-month highs Friday, but analysts say they don’t expect the loonie’s recent strength to be the new normal. The Canadian dollar rose almost three-tenths of a cent to close at 93.80 cents US Friday

Interestingly, coverage of such forecasts never seem to hold the prognosticators to account. Although the banks involved in these two statements were different, I have never seen the CBC or other news organization publicly examine the historical record for such forecasts.

My take: forecasting is generally impossible. Stochastic, martingale forecasting **is** impossible. Don't believe anyone who claims otherwise.

[mg]: http://en.wikipedia.org/wiki/Martingale_(probability_theory)
[or]: http://en.wikipedia.org/wiki/Operations_research
[january]: http://www.cbc.ca/news/business/canadian-dollar-headed-to-85-cents-us-td-says-1.2516849
[july]: http://www.cbc.ca/news/business/canadian-dollar-nears-2014-high-against-u-s-greenback-1.2689863
[emh]: http://en.wikipedia.org/wiki/Efficient-market_hypothesis

[^1]: Speaking very imprecisely: if the information existed in the present to do this forecasting, it would quickly be arbitraged away such that the advantage would disappear.
[^2]: TD happens to be the forecasting organization in this case, but this activity is by no means exclusive to them. It is very, very common to read all manner of financial forecasts by banks, analysis firms, etc.
