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

::hero-image{src="/images/work/kmm/v2_flux_abstract_1920x1080.png" alt="Market Making on Kalshi" title="Market Making on Kalshi" subtitle="An AI-operated trading experiment" href="" titleColor="light"}
::

::title-block{subtitle="Developed through live experimentation and iteration."}
I built an AI-powered trading system that earns real money on prediction markets.
::

::side-note
**TLDR**: Claude wrote this trading system and Claude runs it. I planned the architecture, direct operations from a Telegram thread, and approve every market; the bot quotes prediction markets on Kalshi to earn the platform's liquidity incentives. Seeded with $650, it has returned +$1,081.93 over 16 weeks (+166%, fees included). A solo project in a domain I had no background in, live within two days of the first line of code.
::

::title-block{subtitle="Kalshi pays traders to provide liquidity."}
The Opportunity
::

::text-block
[Kalshi](https://kalshi.com/), a popular prediction market platform, runs a [liquidity incentive program](https://help.kalshi.com/en/articles/13823851-liquidity-incentive-program) that pays traders to rest orders on the book, even if those orders are never filled. For a given market, Kalshi establishes a reward pool with a cash value and a time period. It scores each trader over that period, tracking how large their orders are and how close they sit to the best price. When the period ends, traders are ranked by score and paid relative shares of the pool. These payouts, known as "liquidity rewards", are a subsidy for resting orders at or near the best price. Traders who place such orders are, generally speaking, "market makers". 
::

::image-gallery
---
columns: 1
images:
  - src: /images/work/kmm/annotated-orderbook.png
    alt: Annotated Order Book
---
::

::side-note
Kalshi also runs "volume rewards" that are a separate reward pool. This program scores your proportion of actually-executed trades during a time period. The more your orders on the book are actually filled, the more you earn from volume pools. In this project I focus mostly on liquidity rewards, since Kalshi offers them more widely and frequently. 
::

::title-block{subtitle="How does it work?"}
Market Making
::

::text-block
In its simplest form†, a market-making strategy does not "take a side" or try to predict if the price will change, but rather places orders on both sides of the book. By simultaneously buying and selling, market makers attempt to capture the "spread" between the best sell price and best buy price. Ultimately, a maker provides liquidity to a market, which ["stabilizes the market, reducing price variation"](https://en.wikipedia.org/wiki/Market_maker).
<br><br>
Imagine a stock that is worth $50 per share. Traders selling the stock are "asking" $51 for it, while buyers are "bidding" $49. A market maker would place a sell order for $51, and simultaneously place a buy order for $49. Some trader decides to sell their stock, and hits the maker's buy order. The market maker is now holding a share of the stock and is -$49 cash. However, another trader comes forward and wants to buy the stock at the $51 sell order price††. This is executed, and the maker is left with no stock but +$2. This is spread capture: the basic goal of market making.  
::

::image-gallery
---
columns: 1
images:
  - src: /images/work/kmm/spread_capture_three_steps.png
    alt: Spread Capture in Three Steps
---
::

::side-note
† Complex market-making strategies do in fact estimate a fair price, and use it to "skew" or inform their order placement (e.g. loading up more orders to buy than sell if the price is more likely to move up). Sophisticated institutional market makers can be expected to employ a myriad of advanced strategies beyond "quote buy and sell, capture the spread", but that is the basic mechanism.  
::

::side-note
†† If a stock is trading around $50, why would the other traders sell the stock for $49 or buy it for $51? Generally, one could say the "wrong" price *is* the right price to that trader. They may be less informed about its true price, more informed about it, or simply paying a small premium for immediacy. 
::


::title-block{subtitle="Full-stack dev... not a quant?"}
Motivation
::

::text-block
I had been wanting to work on an automated market-making strategy for a few months, and Kalshi's incentive program caught my attention. First, prediction markets are an emerging financial frontier, and I assumed the barrier to entry would be lower than in well-established financial markets. Second, the existence of the liquidity incentive program gave the project a higher chance of some success (or a higher chance of smaller losses). I have no formal background in financial markets or quantitative analysis, but I have general financial literacy and know my way around some code. LLMs had been supercharging my dev work for months, but I wanted to see if I could use them to develop a project in an area that I knew nothing about.
::

::title-block{subtitle="Two days of paper trading changed the goal."}
Initial Research
::

::text-block
I ran two days of simulated paper trading. I used a Python script to scan for markets with the largest $/day pools, track price movement, snapshot the order book, and loosely simulate how a simple strategy (e.g. quote best bid/ask symmetrically no matter what) would perform. At the end of this data collection, I had a script score my orders and track my PnL from trading activity.
<br><br>
The results were encouraging. Even with extremely pessimistic adjustments (to account for [adverse selection](https://en.wikipedia.org/wiki/Adverse_selection) and simulation error), I concluded this project would be well worth my time to develop. Key takeaways: 
- Liquidity rewards were a massive target (Kalshi offering ~$30,000/day across all markets at that time). 
- A simple strategy with minuscule capital will not make a meaningful profit from spread capture alone (my simulation showed losses across every market anyway).

This honed my profitability thesis. Liquidity rewards were *not* just a safety net and added bonus on top of spread capture: **they were the main goal**. I think about it like this: spread capture is a *hard* problem. Multi-billion-dollar firms work to figure out how to do it. In the short term, it is unlikely I would develop an advanced market-making strategy that is able to meaningfully profit with self-funded capital amounts. 
<br><br>
The problem was no longer market making to capture spread. My goal was to **capture liquidity rewards while minimizing losses from trades**.
::

::title-block{subtitle="Four layers, built AI-first."}
The System
::

::text-block
Under the hood, it's a Python project with four layers, designed around an "operator" who runs analysis, approves markets, and initiates trading. The operator is Claude. The system allows any agent, LLM or human, to act as operator, but it was built AI-first, and Claude runs it day to day. The architecture:
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
<br>This suite of tools scans markets and evaluates which are viable for my strategy. It deliberately stops short of a final "score" and instead reports comprehensively on numerous variables, highlighting quantitative signals. The operator considers this analysis, and other qualitative factors, to decide the safety and profitability of a market. 
<br><br>
Claude acting as operator is clearly indispensable in this process. It allows efficiency at scale, but specifically enables *qualitative* reasoning at scale. This is extremely important for assessing a market's viability. An example: in my experience, some lesser-known niche events have extreme mispricings due to very low volume. There is nobody trading the event, so the "true" market price has not been discovered. Quantitatively, these markets can present as safe and profitable. However, a quick web search would reveal that this market is trading far from reality, and the price is likely to swing. 
<br><br>
Confirming an event's general probability is difficult to do with Python alone, and essentially impossible across thousands of nuanced, unrelated events. However, it is not difficult for an LLM to do research and reason generally as a sanity check. 
::

::side-note
I came to this pattern through my own trial and error, and later found [Kalshi Research](https://kalshi.com/research/mission) describing a similar one: they improved a trading strategy with "an LLM-based semantic stage" to assess "whether the proposed direction admits a plausible economic transmission mechanism based on event descriptions". [https://arxiv.org/abs/2602.07048](https://arxiv.org/abs/2602.07048)
::

::text-block
**Strategy**
<br>The strategy layer is where I set the tuning knobs for each market. Using the results from research, I set variables such as capital limits, safety parameters, and more. This separates financial decisions from bot execution.
::

::text-block
**Orchestration**
<br>This layer turns a group of independent market bots into a supervised portfolio. It enforces portfolio-level safety, survives restarts, auto-manages the market lifecycle, and exposes controls to the operator during live trading. 
::

::text-block
**Execution**
<br>One asyncio task per market. Each execution instance owns one market end to end: its resting orders, its position, its per-market safety, and its cycle loop. The loop checks safety, fetches new order book information, makes decisions based on strategy, and logs metrics.
::

::title-block{subtitle="Claude runs the desk."}
The Operator
::

::text-block
A typical session starts from my phone. Over Telegram, I ask Claude for a status report: which markets we're in, how much capital is deployed where, and how each position is doing. Depending on the answer, I have it adjust a market's parameters, or kick off the analysis pipeline. The pipeline runs quantitative research on candidate markets, then Claude layers on qualitative research: web searches on the actual event behind each market, sanity-checking that the price reflects reality. It reports back with a summary and a suggested strategy per market. I approve or reject every market before capital is deployed.
::

::image-gallery
---
columns: 1
images:
  - src: /images/work/kmm/market_approval_funnel.png
    alt: Market Approval Funnel
---
::

::text-block
This is the remote control flow diagrammed above. Claude operates with full permissions. It can open and close positions manually, start and stop individual market bots, and kill the whole system if needed. It messages me when it needs clarification, when something is beyond its control, or simply to summarize what it has done. By capability, Claude can do nearly everything I can; by convention, new capital always waits for my approval. In practice, I run a live trading operation from a chat thread on my phone.
::

::text-block
That autonomy is bounded by code, not trust. The system enforces hard limits regardless of what the operator asks for: a capital cap per market, a capital cap across the portfolio, a portfolio-level max loss, and automatic halts when API errors accumulate. Claude decides freely inside that box, but the box is not negotiable.
::

::text-block
**Built with AI, not just run by it**
<br>The first live trade happened roughly two days after the first line of code was written. I planned the system with Claude and directed the architecture; Claude Code wrote all of it. I did not write the code by hand. More on how I work in [How I Use AI](/work/how-i-use-ai).
::

::title-block{subtitle="+166% on seed in 16 weeks."}
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
Over 16 weeks of live trading I have maintained a steady (albeit modest) profit. The system was seeded with $650 of my own capital, and profits have been recycled back in as trading capital ever since. That makes the PnL so far a +166% return on seed. The gains are unimpressive in absolute terms, but the costs of the project are low: 
- Minor risk in actual dollars: $650 of seed, with downside bounded by hard loss caps
- Usage of my Claude subscription (which I would have anyway, even without this project)
- $10/month for a cloud server
::

::side-note
† Generally, Kalshi [only charges fees](https://kalshi.com/fee-schedule) to takers (orders that immediately match and execute on the order book) and *not* makers (orders that rest on the book). Since I was mostly placing resting orders, most of my trading was fee-less. However, my bot did incur some fees as a taker when it crossed the spread to buy/sell for strategic and safety reasons. 
::

::text-block
**Takeaways**
- The thesis held: liquidity rewards were the main source of profit. My gains were liquidity incentives *minus* losses from adverse selection. With a naive spread capture strategy, most round-trip trades lost money; the rewards more than covered them.
- This strategy is neither reliable nor sustainable. The liquidity incentives program exists at Kalshi's discretion and serves their business goals. If they decided to reduce the program, change the requirements, or end it entirely, this bot would not be profitable. Some weeks were less profitable entirely because Kalshi had fewer reward pools active. 
- However, assuming the program continues in a similar form, there are many achievable improvements to increase PnL within the current strategy.
- **AI continues to be useful, productive, and essential to my development work.** This project would not have been possible for me to develop effectively in a short period of time without it.
::

::text-block
**Next Steps**
<br>
I have numerous improvements planned for the bot in its current paradigm:
- enhanced position management
- deep research and modeling of markets for better quoting
- implementation of [academically rigorous algorithms](https://people.orie.cornell.edu/sfs33/LimitOrderBook.pdf)
- an extended API layer to access other prediction market platforms such as [Polymarket](https://polymarket.com/) (they have a similar incentives program)
<br>
However, given that the profit model is reliant on subsidy programs, I would like to move towards an actual spread capture strategy for the long term. I am beginning to explore advanced strategies that will lead in this direction. I will take much of what I've developed here and apply it to this new iteration. As long as they exist, liquidity rewards will guide my market selection, even as I move towards a strategy that does not totally rely on them.
<br><br>
I have no delusions about breaking into mainstream financial markets as an independent market maker. However, I will continue developing strategies in the emergent realm of prediction markets, pursuing experience and small returns along the way.
::