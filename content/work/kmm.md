---
title: Market Maker
tagline: Free Lunch?
sortOrder: 3
draft: true
titleColor: light
thumbnails:
  - /images/work/kmm/v2_flux_abstract_1920x1080.png
  - /images/work/kmm/kalshi-logo-dark-green-on-primary-green-1.jpg
  - /images/work/kmm/kalshi-logo-white-on-near-black.jpg
  - /images/work/kmm/kalshi-logo-dark-green-on-primary-green-1.jpg
  - /images/work/kmm/kalshi-logo-white-on-near-black.jpg
  - /images/work/kmm/kalshi-logo-dark-green-on-primary-green-1.jpg
  - /images/work/kmm/kalshi-logo-white-on-near-black.jpg
---

::hero-image{src="/images/work/kmm/v2_flux_abstract_1920x1080.png" alt="Kalshi Incentive Farming" title="Market Making on Kalshi" subtitle="An Exploration" href="" titleColor="light"}
::

::title-block{subtitle="Developed through live experimentation and iteration."}
I built a strategy that earns on prediction markets.
::

::side-note
**TLDR**: TODO
::

::text-block
[Kalshi](https://kalshi.com/), a popular prediction market platform, runs a [liquidity incentive program](https://help.kalshi.com/en/articles/13823851-liquidity-incentive-program) that pays traders to rest orders on the book (even if these orders are never filled). They establish a reward pool for a market that has a total cash value and a time period. Over this time period, Kalshi looks at the book and scores each trader, tracking how large orders are and how far they are from the best price. At the end of the time period, the scores are ranked against other traders, and relative shares of the reward pool are paid out. These are known as "liquidity rewards". They are a subsidy that incentivizes traders to place resting orders at (or near) the best price. Generally speaking, traders who place these orders can be classified as "market makers". 
::

::image-gallery
---
columns: 1
images:
  - src: /images/work/kmm/annotated-orderbook.png
    alt: Annotated Orderbook
---
::

::side-note
Kalshi also runs "volume rewards" that are a separate reward pool. This program scores your proportion of actually-executed trades during a time period. The more your orders on the book are actually filled, the more you earn from volume pools. In this project I focus mostly on liquidity rewards, since Kalshi offers them more widely and frequently. 
::

::title-block{subtitle="How does it work?"}
Market Making
::

::text-block
In its simplest form†, market maker strategy does not "take a side" or try to predict if the price will change, but rather places orders on both sides of the book. By simultaneously buying and selling, market makers attempt to capture the "spread" between the best sell price and best buy price. Ultimately, a maker provides liquidity to a market, which ["stabilizes the market, reducing price variation"](https://en.wikipedia.org/wiki/Market_maker).
<br><br>
Imagine a stock that is worth $50 per share. Traders selling the stock are "asking" $51 for it, while buyers are "bidding" $49. A market maker would place a sell order for $51, and simultaneously place a buy order for $49. Some other trader decides to sell their stock, and hits the maker's buy order. The market maker is now holding a share of the stock and is -$49 cash. However, another trader comes forward and wants to buy the stock at the $51 sell order price††. This is executed, and the maker is left with no stock but +$2. This is the spread capture: the basic goal of market making strategy.  
::

::image-gallery
---
columns: 1
images:
  - src: /images/work/kmm/spread_capture_three_steps.png
    alt: Annotated Orderbook
---
::

::side-note
† Complex market making strategies do in fact analyze a fair price, and use it to "skew" or inform their order placement (e.g. loading up more orders to buy than sell if the price is more likely to move up). Sophisticated institutional market makers can be expected to employ a myriad of advanced strategies beyond the simplistic "quote buy and sell, capture the spread", but that is the basic mechanism.  
::

::side-note
†† If a stock is trading around $50, why would the other traders sell the stock for $49 or buy it for $51? Generally, one could say that "mis-price" *is* what it's worth to that trader. They may be less-informed about its true price, more-informed about its true price, or are paying a small premium for immediacy. 
::


::title-block{subtitle="Full-stack dev... not a quant?"}
Motivation
::

::text-block
I had been wanting to work on an automated market making strategy for a few months, and this program caught my attention. First, prediction markets are an emerging financial frontier, and I assumed the barrier to entry would be lower than well established financial markets. Second, the existence of the liquidity incentive program gave the project a higher chance of some success (or a higher chance of smaller losses). I have no formal background in financial markets or quantitative analysis, but I have general financial literacy and know my way around some code. LLMs had been supercharging my dev work for months, but I wanted to see if I could use them to develop a project in an area that I knew nothing about.<br><br>
::

::title-block{subtitle="Viability analysis quickly shaped a novel direction."}
Initial Research
::

::text-block
I ran 2 days of simulated paper trading. I used a Python script to scan for markets with the largest $/day pools, track price movement, snapshot the orderbook, and loosely simulate how a simple strategy (e.g. quote best bid/ask symmetrically no matter what) would perform. At the end of this data collection, I had a script score my orders and track my PnL from trading activity.
<br><br>
The results were encouraging. Even with extremely pessimistic adjustments (to account for [adverse selection](https://en.wikipedia.org/wiki/Adverse_selection) and simulation error), I concluded this project would be well worth my time to develop. Key takeaways: 
- Liquidity rewards were a massive target (Kalshi offering ~$30,000/day across all markets at that time). 
- A simple strategy with miniscule capital will not make a meaningful profit from spread capture alone (my simulation showed strictly losses across markets anyways).

This honed my profitability thesis. Liquidity rewards were *not* just a safety net and added bonus on top of spread capture: **they were the main goal**. I think about it like this: spread capture is a *hard* problem. Multi-billion dollar firms work to figure out how to do it. In the short-term, it is unlikely I develop an advanced market making strategy that is able to meaningfully profit with self-funded capital amounts. 
<br><br>
The problem no longer became about market making to capture spread. My goal was to **capture liquidity rewards while minimizing losses from trades**.
::

::title-block{subtitle="How it's built and operates"}
My Bot
::

::text-block
The system is a Python project with 4 layers. An "operator" interacts with the system, to run analysis and initiate trading for a market. As detailed below, the operator is Claude (but the system allows any agent, LLM or human, to act). The architecture:
::

::image-gallery
---
columns: 2
images:
  - src: /images/work/kmm/trading_program_architecture_v2.png
    alt: Trading Program Architecture
  - src: /images/work/kmm/telegram_remote_control_flow_v3.png
    alt: Remote Control Flow
---
::

::text-block
**Research / Analysis**
<br>This suite of tools scans markets and evaluates which are viable for my strategy. It deliberately stops short of a final "score" and instead comprehensively reports across numerous variables, highlighting quantitative signals. The operator considers this analysis, and other qualitative factors, to decide the safety and profitability of a market. 
<br><br>
Claude acting as operator is clearly indispensable in this process. It allows efficiency at scale, but specifically allows *qualitative* reasoning at scale. This is extremely important for assessing a markets viability. An example: in my experience, some lesser-known niche events have extreme mis-pricings due to extremely low volume. There is nobody trading the event, so the "true" market price has not been discovered. Quantitatively, these markets can present as safe and profitable. However, a quick web search would reveal that this market is trading far off base with reality, and price is likely to move drastically at some point. 
<br><br>
Confirming an event's general probability is difficult to do with Python alone, and essentially impossible across thousands of nuanced, unrelated events. However it is not difficult for an LLM to do research and reason generally as a sanity check. 
::

::side-note
[Kalshi Research](https://kalshi.com/research/mission) published a finding where they improved a trading strategy with "an LLM-based semantic stage" to assess "whether the proposed direction admits a plausible economic transmission mechanism based on event descriptions". [https://arxiv.org/abs/2602.07048](https://arxiv.org/abs/2602.07048)
::

::text-block
**Strategy**
<br>The strategy layer is where we set the tuning knobs for each market. Using the results from research we set variables such as capital limits, safety parameters, and more. This allows separation of financial decisions from execution of the actual bot.
::

::text-block
**Orchestration**
<br>This layer turns a group of independent market bots into a supervised portfolio. It enforces portfolio level safety, surviving restarts, auto-managing market lifecycle, and exposes controls to the operator during live trading. 
::

::text-block
**Execution**
<br>One asyncio task per market. Each execution instance owns one market end-to-end: its resting orders, its position, its per-market safety, and its cycle loop. The loop checks safety, fetches new orderbook information, makes decisions based on strategy, and logs metrics.
::

::title-block{subtitle="Metrics, takeaways, next steps"}
Results
::

::image-gallery
---
columns: 2
images:
  - src: /images/work/kmm/trading_results_summary.png
    alt: Trading Results Summary
  - src: /images/work/kmm/results-summary-16x9.png
    alt: Results PnL
---
::

::text-block
**PnL so far: +$1,081.93** (fees included†)
<br>
Over the course of 16 weeks I have been able to turn a profit. I have been able to maintain a steady (albeit modest) income with my strategy, utlizing a relatively small personal amount of funds. The gains are unimpressive in absolute terms, but the costs of the project are low: 
- Minor risk in terms of actual dollars
- Usage of my Claude subscription (that I would have anyways even without this project)
- $10/month for a cloud server
::

::side-note
† Generally, Kalshi [only charges fees](https://kalshi.com/fee-schedule) to takers (orders that immediately match and execute on the orderbook) and *not* makers (orders that rest on the book). Since I was placing mostly placing resting orders, most of my trading was fee-less. However, my bot did incur some fees as a taker when it crosses the spread to buy/sell for strategic and safety reasons. 
::

::text-block
**Takeaways**
- The liquidity rewards proved to be the main reward. My profit was the result of liquidity incentives *minus* losses from adverse selection. Simply put, with a naive spread capture strategy, most of my round-trip buy/sell trades were at a loss. The problem became: maximize rewards, minimize losses on trades.
- This strategy is not reliable nor sustainable. The liquidity incentives program is at the discretion of Kalshi and their business goals. If they decided to reduce the program, change the requirements, or end it entirely, this strategy would not be profitable. Some weeks were less profitable for my bot entirely because Kalshi had fewer reward pools active. 
- However, assuming the program continues in a similar form, there are a lot of achievable improvements to increase PnL within the current strategy.
- **AI continues to be useful, productive, and essential to my development work.** This project would not have been possible for me to develop effectively in a short period of time without it.
::

::text-block
**Next Steps**
<br>
I have numerous improvements planned for the bot in its current paradigm:
- enhanced position management
- deep research on markets with recurring pools for better order skewing
- implementing some [academically rigorous algorithms](https://people.orie.cornell.edu/sfs33/LimitOrderBook.pdf)
- extend the API layer to connect to Polymarket to expand field of markets (Polymarket has a similar incentives program)
<br>
However, given that the profit model is reliant on subsidy programs, I would like to move towards an actual spread capture strategy for the long term. I am beginning to explore advanced strategies that will lead in this direction. I will take much of what I've developed here and apply it to this new iteration. While they exist, liquidity rewards will still guide my market selection, even as I move towards a strategy that does not totally rely on them.
<br><br>
I have no delusions about breaking into mainstream financial markets as an independent market maker. However, I will continue developing strategies in the emergent realm of prediction markets, gaining knowledge and small returns along the way.
::