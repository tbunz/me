---
title: Airtable as Backend
tagline: Backend for [REDACTED]
sortOrder: 5
thumbnails:
  - /images/work/airtable/thumb.png
  - /images/work/airtable/thumb-lightgrey.png
  - /images/work/airtable/thumb-red.png
  - /images/work/airtable/thumb-green.png
  - /images/work/airtable/thumb-yellow.png
---

::hero-image{src="/images/work/airtable/thumb.png" alt="Airtable as Backend" title="Airtable as Backend" subtitle="Nuxt + Airtable"}
::

::title-block{subtitle="it had to be a database AND a CMS."}
The client wanted the whole site to run on a single [Airtable](https://airtable.com) base...
::

::side-note
**Under NDA**, so no names and no screenshots. Everything below is kept deliberately generic.
::

::text-block
I was brought on for an invite-only event site, mainly to handle the backend. Guests logged in to find everything they needed for the trip: from travel and hotels to the schedule and a city guide, plus RSVP and registration for sessions. None of it was public, so the whole site sat behind a login.
::

::title-block{subtitle=""}
What's the stack?
::

::text-block
Nuxt and TypeScript on the frontend. For everything behind it, a single Airtable base, pulling double duty as the database and the CMS.
::

::title-block{subtitle=""}
Wait, Airtable as a backend?
::

::text-block
The client wanted to run everything from Airtable themselves, a tool the event team already knew, so they could edit content and guest data without a developer in the loop. The job was to make a spreadsheet behave like a real backend. I wrapped it in a typed API layer with auth in front, so the frontend only ever talked to my endpoints, never the spreadsheet directly.<br><br>
The content side was block based, so they could add, remove, and reorder sections of a page on the fly, using the behaviors already existing in Airtable. No code required.
::

::title-block{subtitle=""}
How'd the login work?
::

::text-block
Nothing exotic, just standard API security done properly. Everything sat behind auth and was verified in middleware, so no page and no API route was reachable without a valid session. Guests signed in with a unique per-invite password instead of a username, and rather than pull in a heavy auth library I wrote my own lightweight session handling.
::

::title-block{subtitle=""}
How'd you keep it from getting messy?
::

::text-block
The table map was a set of configs that translated Airtable's fields into clean code objects. The client was constantly adding and renaming fields, so this mattered a lot. Each change was a quick config update instead of a hunt through the codebase. We also had to launch the RSVP halfway through development, while the rest of the site was still being built. So I ran two Airtable bases, one for dev and one for the live event, kept fully separate and switched with config and environment variables. Real guest data never mixed with anything still in progress.
::

::title-block{subtitle=""}
How'd it come together?
::

::text-block
After developing and testing the backend, I wired it into the frontend with global state and a few simple composables to consume it. The integration was clean and paired well with the sleek UI. I helped with some of the complex motion and fetching-related animations, and we shipped a great product.
::
