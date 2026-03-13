---
title: Project Alpha
tagline: A sample project.
thumbnails:
  - /images/work/Janu-Hotel.png
  - /images/work/Venue-Slider-1.png
  - /images/work/chloeSite.jpeg
  - /images/work/headshotCropped.jpg
---

::hero-image{src="/images/work/Janu-Hotel.png" alt="Project Alpha hero" title="Project Alpha" subtitle="UX Design & Development"}
::

::title-block{title="Overview" subtitle="The challenge"}
::

::text-block{variant="lead"}
This is a placeholder project page for Project Alpha. Replace this with an intro paragraph describing the project at a high level.
::

::title-block{title="Process"}
::

::text-block
Describe the project process here. This text block supports **markdown** formatting including [links](#), *italics*, and more.
::

::image-gallery{columns="1"}
---
images:
  - src: /images/work/Janu-Hotel.png
    alt: Wide banner shot
    caption: Full-width cinematic view
---
::

::image-gallery{columns="2"}
---
images:
  - src: /images/work/Venue-Slider-1.png
    alt: Screenshot one
    caption: First screenshot
  - src: /images/work/chloeSite.jpeg
    alt: Screenshot two
    caption: Second screenshot
---
::

::image-gallery{columns="4"}
---
images:
  - src: /images/work/Janu-Hotel.png
    alt: Detail one
  - src: /images/work/Venue-Slider-1.png
    alt: Detail two
  - src: /images/work/chloeSite.jpeg
    alt: Detail three
  - src: /images/work/headshotCropped.jpg
    alt: Detail four
---
::

::title-block{title="Code"}
::

::text-block
Here's how the animation loop works under the hood:
::

::code-block{title="useSlideshow.ts" lang="ts"}
function startSlideshow(images: HTMLElement[], opts: SlideshowOptions) {
  const { hold = 1.4, fade = 0.6, pan = 3 } = opts
  let active = 0
  let stopped = false

  function next() {
    if (stopped) return
    const from = images[active]
    active = (active + 1) % images.length
    const to = images[active]

    gsap.to(from, {
      opacity: 0,
      duration: fade,
      ease: 'power1.inOut',
    })

    gsap.fromTo(to,
      { opacity: 0 },
      { opacity: 1, duration: fade, ease: 'power1.inOut' },
    )

    gsap.fromTo(to,
      { xPercent: 0 },
      { xPercent: pan, duration: hold + fade, ease: 'none', force3D: true },
    )

    gsap.delayedCall(hold, next)
  }

  gsap.delayedCall(hold, next)
  return () => { stopped = true }
}
::

::title-block{title="Components"}
::

::text-block
Interactive elements from the project:
::

::component-showcase
A button component with hover states. This area renders live components from the project — pass in any markup or interactive elements to preview them in context.
::

::title-block{title="Results" align="center"}
::

::text-block{variant="lead" align="center" max-width="600px"}
Summarize the project outcomes here.
::
