---
title: How I Use AI
tagline: Faster, with caveats
titleColor: light
sortOrder: 2
thumbnails:
  - /images/work/ai/thumb1.png
  - /images/work/ai/ClaudeIcon-Square.png
  - /images/work/ai/terminal_abstract.png
  - /images/work/ai/Claude Spark - Clay.png
---

::hero-image{src="/images/work/ai/thumb1.png" alt="How I Use AI" title="How I Use AI" titleColor="light"}
::

::text-block
I use AI heavily for production code, but not uniformly. How heavily depends on the stakes of the task. Here are the ways I work with Claude day to day, plus one setup I built to let it run on its own.
::

::side-note
As of writing this in April 2026, the only model I use for writing code is Claude Opus 4.7 via Claude Code (to the surprise of nobody).
::

::title-block{subtitle="A one-sided partnership: Claude writes, I think and review."}
Pair Programming with AI
::

::text-block
This is my general strategy for production-level web projects. I use VS Code and run Claude Code within it via the official extension. I break down the work into three task types:<br><br>
**Translating static UI components from Figma into code base**
- Use Figma MCP connection so Claude can extract values for design primitives (color palette, type definitions, etc.) and set them up in the style system.
- Ask Claude to create static UI components one by one, directly from the Figma file. 
- I find that it does not always get the details pixel perfect. I have to review very carefully during this task. For example, it may use a different color or padding from what is present in Figma.
- Despite the higher-than-usual mistake rate, it's still a boost to use AI here.

This flow is much slower than the others. It's important to get all of these details correct, down to the last pixel. If components aren't spaced right, or type is off, nothing in the design is going to line up later and it's going to be confusing. 

<br>**Medium Complexity Tasks**
- I give Claude the task with full edit permissions. It starts working.
- I go do other things while it works (plan the next task, reply to Slack, review code).
- Claude finishes and reports back.
- I quickly review, note any areas to double check or any issues. Claude revises if needed.
- All approved, next task.

I use this for tasks where a bug would reveal itself quickly as we continue development. For example: button hover animations, form components, simple JS that alters the DOM, etc.

<br>**High Complexity Tasks and Critical Code**
- I explain the task thoroughly to Claude, starting in plan mode.
- Claude formulates a plan, which I carefully review. We go back and forth on revisions until I'm satisfied with it.
- I tell Claude to break the plan into logical phases, and to STOP after each phase and check in with me before proceeding. 
- Claude executes each phase, pausing for me to review each chunk. We fix any issues at each step, and continue through all phases.
- When I am fully satisfied with the code, I start a new Claude instance with clean context to code review the new feature.
- I have the review instance check for bugs, but also write test code that breaks the new feature and exposes any issues.
- I pass the review back to the original Claude instance to finish and approve.

I used this flow on a recent app where the client required Airtable as the backend. Airtable's JS client handles basic operations fine, but I needed a layer on top to bundle higher-level logic. The phase-by-phase review let me push Claude toward structures that could be extended later, not just ones that worked now. The client changed data requirements several times over the project, and that foresight paid off. Each change slotted in cleanly instead of forcing a rewrite.
::

::side-note
In my experience, Opus 4.7 has a difficult time writing quality tests on its own. It often creates trivial tests, and inverts the meaning of PASS/FAIL (e.g. assert PASS when the bug is present).<br><br>
The most reliable solution is to carefully pair program alongside and mostly write the test code yourself. Test driven development is already a proven paradigm and this would give a solid check point for your development Claude to hit.<br><br>
But if we still want to automate test writing: It's extremely important to have a test writing [skill file](https://code.claude.com/docs/en/skills) with explicit step-by-step instructions for Claude. I like to include some of those things I mentioned above, such as "The purpose of testing is to FAIL when the code behaves poorly and has a bug". Even better is to have a test reviewer skill for a Claude reviewer instance to audit all tests as they go into the suite. 
::

::title-block{subtitle="Deploying AI on the cloud with full permissions, giving it guidance through Telegram messages."}
Using AI as an Autonomous Worker
::

::text-block
When the OpenClaw mania erupted, I too became interested in using AI more autonomously. However, I didn't want to use it for two reasons: I already pay for a Claude subscription, and I had security concerns.
So while on a trip to California I took an afternoon and set up my own autonomous agent.<br><br>
**Setup**<br>
I run a cheap cloud server ($10/month) with a Claude Code instance that's always live and has full permissions on the machine. The server runs a script that's connected to a Telegram channel, so I can message Claude any time I want from my phone. It runs constantly and checks back in once it's done with a task, ready for another.
::

::side-note
A few weeks after I created this, Anthropic released their native version of autonomous Claude Code with messaging capability. I still use my setup because, why not? And I can add any features I need easier.
::

::text-block
**Usage**<br>
I have mostly used this setup for one secret personal side-project (write up coming soon). The main insight is that this setup is dramatically faster at writing code (however with more issues and security concerns — see below). The project is related to financial markets, of which I am not an expert. So, it's not so important to me that I understand every last detail of the theory and code. I just check in on progress from Claude reporting back, test suites, code reviews by other instances, and actual performance metrics in production.<br><br>
For this project in particular, it is very useful for Claude to watch over things. It's a service that runs 24/7 executing trades. Claude manages the whole thing — it'll even kill the process if something goes wrong.<br><br>
**Limitations**<br>
Despite the speed-up, I would not recommend this setup for most projects. The security risks and likelihood of critical bugs in code make it too unreliable for important systems. However, it could work well for: 
- prototypes
- side projects
- projects with minimal damage in the worst case scenario
- projects *without* API keys, credentials, secrets

My secret personal project is highly complex but ultimately small in scope. With a few safeguards and kill switches, I feel comfortable giving Claude full autonomy in this case. In the worst case where Claude leaks everything, destroys the code, and loses all the money that the code manages, I'll be okay. 
::

::title-block{subtitle="but you have to understand its limitations."}
AI is faster...
::

::text-block
The through-line across all of this is matching the tool to the stakes. For a hover animation, let Claude rip. For critical data flow, slow down, review each phase, have a second instance check the first. For a side project you don't mind losing, give it the keys. 
::