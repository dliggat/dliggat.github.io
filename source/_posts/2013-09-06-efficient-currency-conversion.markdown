---
layout: post
title: "Efficient Currency Conversion"
date: 2013-09-06 09:52
comments: true
description: Efficent USDCAD currency conversion using Norbert's Gambit
categories: finance forex
---
I'm willing to bet that Canadians, on average, do more foreign exchange (forex) transactions than citizens of many other countries. This is an obvious consequence of the significant shopping and investing opportunities south of the [49th parallel][49]. Moreover, plenty of Canadian software contractors such as myself find themselves billing in American dollars (<span class="money usd">USD</span>) occasionally.
<!--more-->
Unfortunately, currency conversion to and from Canadian dollars (<span class="money cad">CAD</span>) is no exception to that frequently-bemoaned axiom of Canadian life: it's expensive, and domestic vendors extract a cosy profit margin (i.e. banks in this case). This phenomenon is perennially annoying[^1] in general, but especially so when we're talking about *bits in a database*, which is all money really is at this point.

However, it turns out there's a neat trick you can pull off to convert <span class="money cad">CAD</span> ⇔ <span class="money usd">USD</span> [almost] optimally called **Norbert's Gambit**. There are plenty of [other][couch] [blog][cad_capitalist] [posts][michael_james] out there explaining this - I thought I'd throw my hat into the ring also by documenting my experience. *This hopefully goes without saying, but this is a personal record of events by a layman of finance, not the provision of financial advice. Your mileage may vary - do your own research.*

[tl; dr][tldr] version:
> In conversion rate terms, this is a gain of $138.25 CAD over what the bank offered on the $5,000.00 USD conversion.

### Background
{% img right /images/forex.jpg 325 'Forex' %}
For the sake of completeness, it is worth mentioning the concept of the **mid-market rate** in forex. Although we tend to think of a unit of currency having a fixed, reversible value in a different currency (e.g. <span class="money usd price">$1.00 USD</span> = <span class="money cad price">$1.05 CAD</span>), generally no one will sell you the opposite currency at that rate. Currency conversion boards seen in train stations and airports illustrate this concept; they show *two rates* - vendors will transact in the opposite currency at a higher or lower rate, depending on whether you wish to buy or sell, respectively. The difference, of course, is their profit[^2].

The mid-market rate is theoretically equidistant between the two rates, and it's the rate we would ideally achieve when we participate in a forex transaction. Mid-market rates for currency pairs are reported on [Google Finance](http://finance.google.com), [XE](http://xe.com), etc.

### Objective
My objective on the morning of **2013-09-05** was to convert <span class="money usd price">$5,000.00 USD</span> to <span class="money cad">CAD</span> as efficiently as possible. The value of that sum of money, in <span class="money cad">CAD</span>, implied by the mid-market rate at the time was <span class="money cad price">$5,252.15 CAD</span>. In optimization terms, this is a clear *upper bound* on the quantity I'm trying to maximize.

##### Option A: Bank Transfer
As far as I'm aware, most Canadian banks allow for a immediate conversion of <span class="money cad">CAD</span> ⇔ <span class="money usd">USD</span> online from a <span class="money cad">CAD</span>-denominated account to a <span class="money usd">USD</span>-denominated account or vice-versa. In a matter of seconds, one can perform this transaction. The price for this convenience, however, is the suboptimal forex rate that they apply[^3]. My bank offered me <span class="money cad price">$5,112.50 CAD</span> in exchange for <span class="money usd price">$5,000.00 USD</span> on **2013-09-05**. Easy, and hassle-free - but we can do better.

##### Option B: Third Party Currency Trader
Rather than use the functionality built into online banking, we can outsource the conversion to an outfit like [XE](http://xe.com). It's a bit of a hassle to set up, and the website is straight out of 2002, but that aside, it does exactly what it says on the tin. You book a trade; money gets withdrawn in one currency (e.g. <span class="money cad">CAD</span>) and shows up a few days later, converted, in the other currency (e.g. <span class="money usd">USD</span>). I've used XE on very seldom occasions across a duration of many years and it has always worked out great. On the morning of **2013-09-05**, they quoted a rate of <span class="money cad price">$5,186.72 CAD</span> in exchange for <span class="money usd price">$5,000.00 USD</span>. Not quite the mid-market rate, but this is already an improvement of <span class="money cad price">$74.22 CAD</span> over Option A.

### Option C: Norbert's Gambit
The process for doing even better relies on what I understand to be the following approximate logic:

* Start with money in a given currency, say, <span class="money usd">USD</span>.
* Use that money to purchase units of a security that lists on both the NYSE and TSX. Through the magic of [arbitrage][arbitrage], the security on both markets will tend towards an identical price (even if traded in different currencies).
* Once you own it on the NYSE, ask your broker to swap it for equivalent units on the TSX.
* Sell those TSX-listed units of the security, now denominated in <span class="money cad">CAD</span>.
* Congratulations - all going well, you just converted <span class="money usd ">USD</span> to <span class="money cad">CAD</span> at essentially the mid-market rate. Provided, of course, the security didn't fluctuate much in value between the two trades.

### Outcome

In practice, it seems you don't need to worry too much about the price fluctuation between trades. An [ETF][etf] with symbol [DLR][dlr_etf] was apparently created as a stable vehicle for precisely this manoeuvre. I followed [these instructions][michael_james] closely and it worked out exactly as described. On **2013-09-05**, I phoned the broker[^4], bought DLR.U with <span class="money usd">USD</span>, exchanged it for DLR, and immediately sold to receive <span class="money cad">CAD</span>.

In actual numeric terms, I bought <span class="money usd">502 DLR.U × $9.97 USD/DLR.U</span> = <span class="money usd price">$5,004.94 USD</span> and subsequently sold <span class="money cad">502 DLR × $10.47 CAD/DLR</span> = <span class="money cad price">$5,255.94 CAD</span>. In conversion rate terms, this is a gain of <span class="money cad price">$138.25 CAD</span> over what the bank offered on the <span class="money usd price">$5,000.00 USD</span> conversion, and the achieved rate *is* the mid-market rate to three decimal places.

#### But wait! There's More

We can't just call this a <span class="money cad price">$138.25 CAD</span> job well done though. I had to execute two trades... and trading has transaction costs. Depending on your bank/broker, and various policies, etc, this could be anywhere from $5.00 to $30.00 each direction. So the savings realized in this scenario is actually: <span class="money cad price">$138.25 CAD - 2 × { cost per trade }</span>. Still, it's a pretty good outcome for doing basically nothing but a bit of one-time research. And the savings scale in proportion to the amount converted!

This is part of the reason[^5] why banks are so ludicrously profitable. It's all just bits in a database... but the act of flipping those bits can come at a higher or lower cost depending on how you tell the bank to manipulate them.

#### Summary of Implied Rates

Here's the various rates summarized. Note that the Norbert's Gambit result **does not** include the cost of the trades, which must be accounted for in practice.

<table class="table table-bordered">
  <thead>
    <tr>
      <td>Method</td>
      <td>Starting Value</td>
      <td>Resulting Value</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bank Transfer</td>
      <td><span class="money usd">$5,000.00 USD</span></td>
      <td><span class="money cad">$5,112.50 CAD</span></td>
    </tr>
    <tr>
      <td>Third Party Conversion</td>
      <td><span class="money usd">$5,000.00 USD</span></td>
      <td><span class="money cad">$5,186.72 CAD</span></td>
    </tr>
    <tr>
      <td>Norbert's Gambit</td>
      <td><span class="money usd">$5,000.00 USD</span></td>
      <td><span class="money cad">$5,250.75 CAD</span></td>
    </tr>
    <tr>
      <td>Theoretical Mid-Market Optimum</td>
      <td><span class="money usd">$5,000.00 USD</span></td>
      <td><span class="money cad">$5,252.15 CAD</span></td>
    </tr>
  </tbody>
</table>

One last remark: it's probably wise to be circumspect within any dealings with your bank when setting up accounts for this or actually executing the trade. Norbert's Gambit[^6] is a perfectly legitimate operation, but it's pretty easy to imagine banks getting upset at this reduction in their effortless-profit, and potentially erecting obstacles.

{% comment %}
This is the index of the links through the document. Far more readable than inline.
{% endcomment %}

[49]: http://en.wikipedia.org/wiki/49th_parallel_north#The_Canada_.E2.80.93_United_States_border
[couch]: http://canadiancouchpotato.com/2013/07/09/norberts-gambit-at-cibc/
[cad_capitalist]: http://www.canadiancapitalist.com/a-foolproof-method-to-convert-canadian-dollars-into-us-dollars/
[michael_james]: http://www.michaeljamesonmoney.com/2012/03/trying-norbert-gambit-at-bmo.html
[tldr]: http://en.wikipedia.org/wiki/Wikipedia:Too_long;_didn't_read
[arbitrage]: http://en.wikipedia.org/wiki/Arbitrage
[etf]: http://en.wikipedia.org/wiki/Exchange-traded_fund
[dlr_etf]: http://www.horizonsetfs.com/pub/en/etfs/?etf=DLR&

[^1]: Especially to a Scotsman.
[^2]: Sometimes these airport outfits add an extra 'fee' on top, as if getting to charge a spread that they pick isn't already a 'fee'.
[^3]: Even if the rate is bad, for smaller amounts of money, the convenience is worth it. It's only well into the four-digit zone does this start to become a worthwhile consideration.
[^4]: I had to phone rather than do this over the web because apparently the bank's online systems can't handle DLR.U. I don't imagine there's a sound technical reason for this outside of "banks being banks", but the guy on the phone was super polite and efficient at getting it done, and didn't charge any extra for the phone service over what it normally costs to transact online.
[^5]: Other reasons include real and artificial barriers to entry, and riskless profits thanks to taxpayer guarantees on various loans issued, but all of that is a rant for another day.
[^6]: New bucket list item - invent a thing that comes to be known as **Liggat's Gambit**. How cool would it be to have a *gambit* to your name...
