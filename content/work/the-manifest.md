---
title: The Manifest
tagline: Digital magazine platform built for editorial freedom
sortOrder: 1
thumbnails:
  - /images/work/manifest/hero.png
  - /images/work/manifest/checker.png
  - /images/work/manifest/landing.png
  - /images/work/manifest/checker2.png
  - /images/work/manifest/stage1.png
---

::hero-image{src="/images/work/manifest/hero.png" alt="The Manifest" title="The Manifest" subtitle="Nuxt + Storyblok" href="https://themanifest.fyi/"}
::

::title-block{subtitle="They wanted a place to record hard-earned wisdom, and dive deeper into the minds of their team and industry collaborators."}
[Studio Freight](https://studiofreight.com) pulled me in to dev a "ledger of creative deconstruction"
::

::text-block
The first thing I noticed was that the design was deliberately quiet. Mostly black and white, perfect alignment, square edges. It was clear that this platform was meant to serve the content, not compete with it. The assets and content of each article were to drive the vibe of the piece, while the site framed everything in place.
::

::image-gallery
---
columns: 4
images:
  - src: /images/work/manifest/image.png
    alt: The Manifest
    caption: Charter
    link: https://themanifest.fyi/
    linkText: The Manifest
  - src: /images/work/manifest/image1.png
    alt: The Manifest
    caption: Landing
    link: https://themanifest.fyi/
    linkText: The Manifest
  - src: /images/work/manifest/article1.png
    alt: The Manifest
    caption: Article
    link: https://themanifest.fyi/
    linkText: The Manifest
  - src: /images/work/manifest/article2.png
    alt: The Manifest
    caption: Article
    link: https://themanifest.fyi/
    linkText: The Manifest
---
::

::text-block
The articles needed to be modular. [Studio Freight](https://studiofreight.com) wanted the ability to quickly build out new content with mix-and-match pieces: text blocks, Q&As, image galleries, pull quotes — all the building blocks of a digital magazine. The experience for the content manager had to be quick and intuitive — ready to fill with content from the jump.
::

::image-gallery
---
columns: 2
aspect: tall
images:
  - src: /images/work/manifest/articleport1.png
    alt: The Manifest article portrait
    link: https://themanifest.fyi/
    linkText: The Manifest
  - src: /images/work/manifest/articleport2.png
    alt: The Manifest article portrait
    link: https://themanifest.fyi/
    linkText: The Manifest
---
::

::title-block{subtitle="and started matching the logical components from the design 1 to 1 in the Storyblok CMS."}
So I got to work...
::

::text-block
The blocks were simple to map and add variations to. I spent a lot of time building up the CMS alongside the code components. I love the *details* when it comes to crafting the CMS. A cool site means nothing if the content system is too cumbersome for the content manager to use.<br><br>
Twelve content blocks, each with variation options. The image gallery was the most complicated block in the code. It needed 7 different image grouping variations, but always had to maintain the same total layout space. From the content manager's perspective, it was dead simple. Add an image gallery block. Select the layout you wanted from a list (One up, two up, two up offset, three up, etc.). Add photos.
::

::image-gallery
---
columns: 1
aspect: tall
images:
  - src: /images/work/manifest/sb.png
    alt: Storyblok CMS
    caption: Storyblok CMS
---
::

::text-block
In the code base, I kept the gallery as a single component. It parsed the correct layout and adjusted the images within accordingly, while keeping all the general properties of the gallery centralized. This made it easy to extend if they decided mid-development that they needed a new image layout (quintuple up offset alternating spinning...). I would just add the option to the CMS, then extend the image gallery component to accommodate the option.
::

::title-block{subtitle="an interactive landing page."}
The finishing touch...
::

::text-block
The site's restraint made the landing page a chance to do something more expressive. We used GSAP for the text animations, but getting the physics to feel right was going to take a lot of fiddling — and that kind of fiddling lives more naturally in the designers' hands than mine. So I set them up with a live deployment where they could tweak all the parameters themselves: timing, easing, stagger, spring values, whatever they wanted. They dialed it in, I locked the values into the code, and we launched.<br><br>
Check it out! [The Manifest](https://themanifest.fyi/){target="_blank"}
::
