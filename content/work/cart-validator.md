---
title: AI Cart Validator
tagline: Plain English
sortOrder: 5
thumbnails:
  - /images/work/cart-validator/thumb.png
  - /images/work/cart-validator/thumb2.png
  - /images/work/cart-validator/thumb.png
  - /images/work/cart-validator/thumb2.png
  - /images/work/cart-validator/thumb.png
  - /images/work/cart-validator/thumb2.png
---

::hero-image{src="/images/work/cart-validator/thumb.png" alt="Cart Validator" title="AI Cart Validator" href="https://llm-cart-validator.vercel.app/"}
::

::title-block{subtitle="It was one of the most complicated and fragile systems in the e-commerce codebase, and I kept thinking there had to be a better way."}
At a previous job, I worked on a custom promotional deals engine
::

::text-block
Promotional deals look simple from the outside, but the parameters multiply fast: quantities, brands, categories, logic conditions, subset pricing, exclusions, stacking rules. Every new campaign meant engineering work. Every edge case meant more code.
::

::title-block{subtitle="This isn't a hard problem for a human."}
The insight...
::

::text-block
Show a person a cart and a deal in plain English, and they can tell you in seconds whether it applies and how much to discount. The difficulty isn't the logic, it's translating fuzzy language into formal rules. Which is exactly what LLMs are good at.<br><br>
So I built a prototype. Send Claude a cart and a deal description, and it returns whether the cart qualifies and the discount amount. It works, even with vague phrasing.
::

::side-note
Try the live demo. Throw a weird, vaguely-worded deal at it and see if it still holds up.
::

::text-block
This is a template for how to think about AI optimization more broadly: a lot of the rigid systems we've built over the years were rigid because natural language wasn't a viable runtime. That constraint has lifted, and it's worth looking around for other places the same shift applies.<br><br>

[Live](https://llm-cart-validator.vercel.app/){target="_blank"} | [Repo](https://github.com/tbunz/llm-cart-validator){target="_blank"}
::