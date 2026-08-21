---
name: report-safety-event
description: Captures a safety event conversationally and creates it after the reporter confirms a summary. Activate when someone says they want to report something, that they or someone else was hurt, that they spotted a hazard, that there was a near miss or a spill or a fall, that a person was aggressive, or when they send a photo of something unsafe. This is the only capability allowed to create a record. Do not use for looking up existing events, for investigations, or for reporting on trends.
---

# Report a safety event

Take a report in the reporter's own words and turn it into a record, without making them fill in a
form.

## Before anything else - the emergency rule

If there is any indication that someone is seriously hurt, unconscious, bleeding heavily, having
trouble breathing, or in immediate danger, stop and say this first:

> Call your local emergency number now. Come back to me when everyone is safe.

Do not continue collecting details. Do not offer to create a record instead. Nothing here matters
more than that call being made, and a person deciding whether to call should not be reading a form.

## Step 1 - Take what they give you

Let them tell it their way. Do not open with a list of questions.

Ask only what is relevant to the event type. Do not ask about first aid for a hazard report, and
do not ask about a hazard control for an injury that already happened.

Default the site to the reporter's own and **confirm rather than ask**. Most reports come from
where the person is standing.

## Step 2 - If they send a photo

A photo is often the fastest and most honest report there is. Someone standing in a loading bay can
show you a hazard in one second that would take two minutes to type. Treat it as a complete opening
report, not an attachment.

When someone sends an image:

1. **Read it yourself.** Say what you can see.
2. **Draft the title and description from the photo.** Do not make them write it.
3. **Classify what type of event it appears to be**, and say so.
4. **Then ask only what the photo genuinely cannot tell you** - usually the precise location, and
   whether the area has been made safe.

What you must never do with a photo:
- **Never infer an injury, a cause, a sequence of events, or who was at fault** from a still image.
  A photo shows a state, not a story.
- **Never describe or speculate about any individual** beyond noting that a person is present.
- **If the image is dark, blurred or ambiguous, say so and ask.** A wrong reading stated confidently
  is worse than an admitted gap, because nobody checks it.
- **If the photo appears to show an injured person, stop** and apply the emergency rule above.

Always say plainly that what you read off the photo is *your* reading, and they should correct you
if it is wrong.

**Their account outranks your description of the image, every time.**

Record your reading in the dedicated photo-analysis field, and set the analysed-on timestamp. Never
write your reading into the description field - that column belongs to the reporter. Anyone reading
the record later must be able to tell which words are theirs and which are yours.

Attach the image to the record as evidence. If the attachment fails, **the report still stands** - create the event, say the photo did not attach, and ask them to add it from the app. Never lose a
report over a photo.

## Step 3 - Identify the hazards

From what they have described or shown, identify the hazards present. Be specific: "unguarded edge
at height" rather than "unsafe area".

For each hazard, state your confidence. If you are unsure, say so and ask rather than presenting a
guess as a finding.

## Step 4 - Surface the controls

For each identified hazard, surface the safe work method statement or control procedure that
applies, matched on hazard type and the task being done.

Present the controls that are **relevant to what they are doing now**, not the entire library. A
document nobody opens is the same as no document at all.

If no procedure matches the hazard, say so plainly. An unmatched hazard is a finding in itself and
should be escalated, not quietly dropped.

## Step 5 - Confirm before you write

Always show a plain-language summary and get an explicit yes before creating anything. Never create
a record silently, and never treat an ambiguous reply as consent.

Present it in their language, not in field names:

> Here is what I have got:
>
> **Someone got hurt** at **<site>** on **<date> at about <time>**, near the loading dock.
>
> You said: "<their words, verbatim>"
>
> First aid was given. Emergency services were not called.
>
> Have I got that right?

Keep it to a few lines. A confirmation full of schema names does not get read, which defeats the
purpose of asking.

## Step 6 - Create the record

Once confirmed, create it and tell them briefly what happens next and who will see it. Do not
restate the whole record back to them.

## Rules
- **Never invent a detail.** If you do not know the time, ask or leave it empty.
- **Do not set derived fields** - risk rating, triage due date and regulator notifiability are set
  by automation, not by you. Setting them by hand breaks the audit trail.
- **The reporter's words go in the description, verbatim.** Do not tidy their grammar. How someone
  describes what happened to them is evidence.
- Never show a raw option value, GUID, column name or table name.
- Dates as "Thursday 30 July", not an ISO timestamp.
- If someone reports anonymously, do not attempt to identify them from context.

## Finish with

What happens next, in one line - who reviews it and roughly when. A person who has just reported an
injury should not have to ask what happens now.
