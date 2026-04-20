---
title: Airtable as Backend
tagline: Backend for the big event
sortOrder: 4
thumbnails:
  - /images/work/airtable/thumb.png
  - /images/work/airtable/thumb-lightgrey.png
  - /images/work/airtable/thumb-red.png
  - /images/work/airtable/thumb-green.png
  - /images/work/airtable/thumb-yellow.png
---

::hero-image{src="/images/work/airtable/thumb.png" alt="Airtable as Backend" title="Airtable as Backend"}
::

::title-block{subtitle="A one-time event site. APIs, auth, and the whole data layer."}
I built the backend
::

::side-note
Under NDA. No screenshots, just the technical work.
::

::text-block
I took on a project with a fixed launch date: a one-time event site with registration, info, and a hub element. They needed someone to build out all the backend functionality: APIs, auth, and the connection between the frontend and their data. The client was already familiar with Airtable and wanted to use it as the data layer.<br><br>

I started with Airtable itself. I designed the full base from scratch: tables, linked records, field types, the whole schema. On top of that, server-side APIs behind session auth and middleware, so the frontend never touched the data directly and every request was gated. A single field-map translated between Airtable's column names and the domain model, which turned out to matter a lot: the client kept changing their mind about what fields they needed, and adding or removing one became a one-line change instead of a hunt through the codebase. On the frontend side, I wrote all the composables that consumed those APIs and wired them into the static site, so the data flow from Airtable to the rendered page was end-to-end mine.
::

::side-note
Airtable is not a database, and you feel it eventually: no joins, no aggregation, no transactions, rate limits you have to engineer around. For an event in the hundreds with a fixed shelf life, those limits didn't bite. The layer I built was designed so that if the project ever outgrew Airtable, the backend could be swapped without touching the frontend.
::

::text-block
I'm a full-stack engineer, and that means the unglamorous parts too: setting up a client's database by hand, wiring auth middleware into a site that'll be taken down in a month, checking ownership on every mutation for an event that happens once. All of it's the job.
::
