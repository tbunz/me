---
title: How I Use AI
tagline: I work (at least) 10x faster
titleColor: light
thumbnails:
  - /images/work/ai/thumb1.png
  - /images/work/ai/ClaudeIcon-Square.png
  - /images/work/ai/terminal_abstract.png
  - /images/work/ai/Claude Spark - Clay.png
---

::hero-image{src="/images/work/ai/thumb1.png" alt="How I Use AI" title="How I Use AI" titleColor="light"}
::

::text-block
AI is now widely accepted to be a revolutionary tool for computer programming. Other than the most sensitive pieces of code (nuclear weapons, human safety, critical systems, etc) it seems that the increase in speed is almost always worth the mistakes along the way. But those mistakes are very real, and cause real bugs. I would like to share how I use AI to write code in different scenarios and my experience using it.
::

::side-note
As of writing this in April 2026, the only model I use for writing code is Claude Opus 4.6 via Claude Code (to the surprise of nobody).
::

::title-block{subtitle="Heavily one-sided pair where the AI does most of the writing, while I think, scrutinize, and review."}
Pair Programming with AI
::

::text-block
This is my general strategy for production-level web projects. I use VS Code and run Claude Code within it via the official extension. I treat Claude as a pair programming partner who does most of the actual writing and detailed planning, while I do high level direction and reviewing (especially in critical areas). I break down the work into a few specific task flows types:<br><br>
**Translating static UI components from Figma into code base**
- Utilize Figma MCP connection so Claude can extract values for design primitives (color pallette, type defintions, etc.) and set them up in the style system.
- Ask Claude to create static UI components one by one, directly from the Figma file. 
- I find that it *does not* always get the details pixel perfect. I have to review very carefully during this task. For example, it may use a different color or padding from what is present in Figma.
- Despite the higher-than-usual mistake rate here, it's still a boost to use AI here.

This task flow is generally much slower than all others because it's really important to get all of these details correct, down to the last pixel. If components aren't spaced right, or type is off, nothing in the design is going to line up later and it's going to be confusing. 

<br>**Medium Complexity Tasks**
- I give Claude the task with full edit permissions. It starts working.
- I go do other things while it works (plan the next task, reply to Slack, review code).
- Claude finishes and reports back.
- I quickly review, note any areas to double check or any issues. Claude revises if needed.
- All approved, next task.

This would be used for tasks that are generally less critical, or where a bug will likely reveal itself as we develop more, if Claude did make a mistake. Some general examples would be: a button hover animation, a form component with state and functions, creating dynamic "top" style for page component depending on the height of the nav.

<br>**High Complexity Tasks and Critical Code**
- I explain the task in extreme detail to Claude, starting in plan mode.
- Claude formulates a plan, which I carefully review. We go back and forth on revisions until it is perfect.
- I tell Claude to break the plan into logical phases, and to STOP after each phase and check in with me before proceeding. 
- Claude executes each phase, pausing for me to review each chunk. We fix any issues at each step, and continue on all phases.
- When I am fully satisified with the code, I start up a separate instance with clean context to code review the new feature.
- I have the review instance check for bugs, but also write test code that breaks the new feature and expose any issues.
- I pass the review back to the original Claude instance to finish and approve.

I use this flow for complex animations and critical data flow code. For example, I worked on a recent web app where the client required Airtable to be used as the backend. Airtable provides a fine JS client to do core operations on tables, but I had to build out a suite of functionality that bundled higher level logic for reusability. Using this high complexity work flow set clean standards for data operations that were continually extended (client changed parameters a number of times). Crafting this critical code to be maintainable from the beginning was non-negotiable.
::

::side-note
**A note on testing**: In my experience, Opus 4.6 has a difficult time writing quality tests on its own. 
::