---
title: Orioles @ Yankees
tagline: Two for One
sortOrder: 3.5
draft: false
thumbnails:
  - /images/work/doubleheader/thumb.png
  - /images/work/doubleheader/thumb2.png
  - /images/work/doubleheader/thumb.png
  - /images/work/doubleheader/thumb2.png
  - /images/work/doubleheader/thumb.png
---

::hero-image{src="/images/work/doubleheader/thumb.png" alt="Orioles @ Yankees settlement split between Kalshi and Polymarket US" title="Orioles @ Yankees" subtitle="An analysis of prediction market resolution" href="https://github.com/tbunz/doubleheader-settlement-kalshi-pmus"}
::

::side-note
**TLDR**: Kalshi and Polymarket US listed the same Orioles vs Yankees game. It became a doubleheader, and each venue settled on a different game. Both are defensible. The [repo](https://github.com/tbunz/doubleheader-settlement-kalshi-pmus){target="_blank"} has the sources and a script to verify it.
::

::title-block{subtitle="One contract, two games, two answers."}
What happened
::

::text-block
Both venues named the game by date, time, and teams. When it was rescheduled into a September 25 doubleheader, that description pointed at two games. Kalshi settled on game 1, which the Orioles won. Polymarket US settled on game 2, which the Yankees won. Each matches a record on MLB.com. I found it because I was running a cross-venue arbitrage experiment that paired these contracts, and it took a loss on both pairs.
::

::image-gallery
---
columns: 1
images:
  - src: /images/work/doubleheader/diagram.png
    alt: Kalshi settled on game 1, Polymarket US settled on game 2
---
::

::title-block{subtitle="Even a baseball game can be hard to resolve as an event contract."}
The point
::

::text-block
A contract is not an event; it is a model of an event. When the schedule moved, one description fit two games, and the venues made different decisions about how to handle it.
::

::text-block
Everything is in the repo: raw responses from both venues and MLB, the press release, the contract terms, the bot's trades, and a `verify.py` that checks the core claims against the saved sources. No API keys needed.<br><br>
[Repo](https://github.com/tbunz/doubleheader-settlement-kalshi-pmus){target="_blank"} | [Cimarron Data](https://cimarrondata.com){target="_blank"}
::
