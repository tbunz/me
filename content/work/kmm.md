---
title: KMM
tagline: Add a tagline
sortOrder: 6
draft: true
thumbnails:
  - /images/work/kmm/thumb.png
---

::hero-image{src="/images/work/kmm/hero.png" alt="KMM" title="KMM" subtitle="Add a subtitle" href=""}
::

::title-block{subtitle="Add a supporting subtitle here."}
Add the opening line for KMM
::

::text-block
TODO needs cleaning up<br>
[Kalshi's liquidity incentive program](https://help.kalshi.com/en/articles/13823851-liquidity-incentive-program) pays traders to rest orders on the book, even if these orders are never filled. They establish a reward pool for a market that has a total cash value and a time period. Over this time period, Kalshi periodically looks at the book and scores each trader, tracking how large orders are and how far they are from the best price. At the end of the time period, the scores are ranked against other traders that also scored during the period, and relative shares of the reward pool are paid out. These are known as "liquidity rewards".
<br><br>
Kalshi also runs "volume rewards" that are a separate reward pool. This program scores your proportion of the volume of actually-executed trades. The more your orders on the book are actually filled, the more you earn from volume pools. In this project I mostly focused on liquidity rewards, since Kalshi offers them more widely and frequently that volume rewards. However, I did take note of active volume rewards on a market as a qualitative signal when selecting markets to trade on, as they generally made a market more profitable for my strategy. 
::

::side-note
DIAGRAM HERE instead of NOTE explains rewards and orders and book.
Read the full breakdown in [Kalshi's docs](https://help.kalshi.com/en/articles/13823851-liquidity-incentive-program).
::

::text-block
TODO needs cleaning up. <br>
I had been wanting to work on an automated market making strategy for a few months, and this program caught my attention. First, prediction markets are an emerging financial frontier, and I assumed the barrier to entry would be much simpler than other well established financial markets. Second, the existence of the liquidity incentive program gave the project a higher chance of some success (or a higher chance of smaller losses). I have no formal background in financial markets or quantitative analysis, but I have general financial literacy and work as a fullstack dev. LLMs had been supercharging my dev work for months, but I wanted to see if I could use them to develop a project in an area that I knew nothing about.<br><br>
Market making in particular is interesting to me because the strategy attempts to profit whether the price goes up *or* down. In its simplest form†, market maker strategy does not "take a side" or try to predict if the price will change, but rather places orders on both sides of the book. By simultaneously buying and selling, market makers attempt to capture the "spread" between the best sell price and best buy price.
::

::side-note
DIAGRAM HERE explain bid ask
::

::text-block
Imagine a stock that is worth $50 per share. Traders selling the stock are "asking" $51 for it, while buyers are "bidding" $49. A market maker would place a sell order for $51, and simultaneously place a buy order for $49. Some other trader decides to sell their stock, and hits the maker's buy order. The market maker is now holding a share of the stock and is -$49 cash. However, another trader comes forward and wants to buy the stock from them at the $51 sell order price. This is executed, and the maker is left with no stock but +$2. This is the spread capture: the basic goal of market making strategy.††
::

::side-note
† Complex market making strategies do in fact analyze a fair price, and use it to "skew" or inform their order placement (e.g. loading up more orders to buy than sell if the price is more likely to move up). Sophisticated institutional market makers can be expected to employ a myriad of advanced strategies beyond the simplistic "quote buy and sell, capture the spread", but that is the basic mechanism.  
::

::side-note
†† If a stock is trading around $50, why would the other traders sell the stock for $49 or buy it for $51? Generally, one could say that "mis-price" *is* what it's worth to that trader. They may be less-informed about its true price, more-informed about its true price, or are paying a small premium for immediacy. 
::


::title-block{subtitle="Viability analysis quickly shaped a novel direction."}
Initial Research
::

::text-block
Some initial assumptions guided my first steps: 
- Liqiudity pools were unlikely to be dominated by institutional-level advanced traders, since Kalshi [specifically prohibits](https://help.kalshi.com/en/articles/13823851-liquidity-incentive-program) "market makers with existing agreements" from the rewards program. This would allow me to be competitive with small amounts of capital.
- Markets with active reward pools should be my only focus. I wasn't sure how lucrative actual spread capture would be with my simple initial strategy, so the rewards would help with profitability. 

<br>TODO: explain why viability analy was so brief: not experienced enough to simulate what would happen reliably. better to just do! losses were capped small, and the only way I'd learn what I didn't know is if I jumped in. 
::