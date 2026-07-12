---
title: ElevenLabs
tagline: Headless Shopify, turned up to Eleven
taglineMobile: Up to Eleven
sortOrder: 2
thumbnails:
  - /images/work/elevenlabs/hero.png
  - /images/work/elevenlabs/thumb1.png
  - /images/work/elevenlabs/thumb2.png
---

::hero-image{src="/images/work/elevenlabs/Grid.png" alt="ElevenLabs" title="ElevenLabs Merch Store" subtitle="Next.js + Shopify" href="https://store.elevenlabs.io/"}
::

::title-block{subtitle="SF came with some seriously sharp design, and I brought it to life on a fully custom, headless Shopify front end."}
I teamed up with [Studio Freight](https://studiofreight.com) to create a [killer e-commerce site](https://store.elevenlabs.io/) for [ElevenLabs](https://elevenlabs.io/).
::

::side-note
The build speaks for itself, so [go click around the store](https://store.elevenlabs.io/) first. But if you want the backstory, here it is.
::

::title-block{subtitle=""}
What's the stack?
::

::text-block
Built with Next.js and Shopify. The front end is completely custom, wired into Shopify's Storefront and Admin APIs through a GraphQL client I built myself. The cart's custom too: it assembles everything through the Storefront API, then hands off to Shopify's hosted checkout for payment.
<br><br>
Motion by [GSAP](https://gsap.com/). Scroll by [Lenis](https://github.com/darkroomengineering/lenis), with the scroll-driven animation custom built on top.
::

::title-block{subtitle=""}
What made this one different?
::

::text-block
This was my first time integrating Shopify into an e-commerce build, which was a blast to figure out. And the product carousel got genuinely hairy, with a pile of edge cases and overlap with other features. But I got it built WAY faster than I could've a year ago, thanks to my AI-powered workflow.
::

::image-gallery
---
columns: 2
images:
  - src: /images/work/elevenlabs/break.png
    alt: ElevenLabs storefront
  - src: /images/work/elevenlabs/hero.png
    alt: ElevenLabs merch
---
::

::title-block{subtitle=""}
Favorite part?
::

::text-block
[Studio Freight](https://studiofreight.com) gave me room to play with the carousel, and I had a lot of fun dialing in the interactions. They're genuinely great to work with: open to ideas from the dev, and up for little extra features here and there.
::

::title-block{subtitle=""}
Hardest part?
::

::text-block
The region selector. The design called for something that didn't match how Shopify handles regions under the hood. After a lot of back and forth, I built and documented a front-end layer that bridged the gap. It gave the design the structure it wanted, while still mapping cleanly to what Shopify expected underneath.
::

::title-block{subtitle=""}
What would you change?
::

::text-block
The site is no-nonsense. Products, Info, Cart. But it would be cool to expand on the idea with a few more content pages. 
::
