# Design principles

Safety tooling has failure modes that ordinary business applications do not. These are the
constraints that follow, and the reasoning behind each.

---

## 1. An image shows a state, not a story

The single most important constraint on any vision model in this domain.

A photo establishes what was visibly present at one angle at one moment. It does not establish
cause, sequence, fault, or what was outside the frame.

**Never permitted from an image:**

| Inference | Why not |
|---|---|
| A hazard is absent | One angle. "Not visible" ≠ "not there" |
| The area is safe | Absence of an identified hazard is not a finding of safety |
| What caused an incident | A state is not a sequence |
| Who was at fault | Not visible, and not the model's role |
| A person's competence or condition | Not readable, and unfair to attempt |

The absence rule is the one that gets built wrong. A model asked "is this area safe?" will answer,
and a confident all-clear from one photograph is the most dangerous output this system could
produce. Every prompt in this repo states it explicitly.

## 2. The person outranks the model, always

In incident reporting the AI's reading and the reporter's account go in **separate fields**. The
description column belongs to the reporter, verbatim.

Three reasons:

**Evidence.** How someone describes what happened to them is itself evidence. Tidying their grammar
degrades it.

**Traceability.** Months later, in an investigation, someone must be able to tell which words came
from a person and which from a model. If they're merged, that is unrecoverable.

**Accuracy.** They were there. The model saw one frame. When the two appear to disagree, both are
recorded and neither is asserted over the other.

## 3. Emergency first, always

Every capture path starts with the same check. Any indication of serious injury or immediate danger:
say to call emergency services, and stop.

No detail collection, no offering to create a record instead.

Someone deciding whether to call emergency services should not be reading a form. This is placed
before everything else in every behaviour, not buried in a rules section.

## 4. Do not manufacture risk

Counter-intuitive, and essential.

When nothing significant is found, say so and let them get on with the job.

A safety tool that inflates minor findings to appear diligent is ignored within a fortnight. An
ignored safety tool is **worse than none**, because the organisation believes it has a control that
nobody actually uses. The false sense of coverage is the harm.

Corollary: **never talk someone out of stopping.** If a worker is hesitant, support stopping. The
cost of an unnecessary stop is minutes. The cost of the opposite error is not.

## 5. Fit the time actually available

A worker in front of a job has around two minutes, one hand free, in poor light, possibly wearing
gloves.

Consequences for the design:

- A photo counts as a complete opening report
- The agent drafts the title and description; the worker corrects rather than composes
- Site defaults to theirs and is confirmed, not asked
- Only questions the photo cannot answer get asked
- Only relevant fields — no first aid question on a hazard report

**If the assessment takes longer than the job set-up, it will be skipped.** Then you have no data
at all, which is worse than partial data.

## 6. Show the control, not the library

The safe work method statement exists and is correct. It is also thirty pages into a document
library that nobody opens on a phone.

Surface only the controls relevant to **this hazard and this task**. Presenting an entire procedure
is functionally identical to presenting nothing, because neither gets read.

**If no procedure matches a hazard, say so and escalate.** An unmatched hazard is a finding in its
own right. The failure mode to avoid is a hazard quietly disappearing because there was no paperwork
for it — the gap is exactly what needs to be visible.

## 7. Branch on what was found

Not every job warrants the same checklist. Running a light-bulb change through a confined-space
assessment teaches workers that the tool wastes their time.

| Finding | Response |
|---|---|
| Nothing significant | Confirm standard controls, proceed |
| Standard hazards, controls exist | List controls, confirm in place, record |
| High consequence | Require permit or isolation before starting |
| No matching procedure | Escalate to a supervisor — this needs a person |
| Immediate danger | Stop, make safe first |

The branching is what makes it an assessment rather than a form.

## 8. Today's assessment is tomorrow's input

Every completed assessment becomes site history, and site history is the strongest signal for the
next hazard identification.

A hazard that has already caused an incident at this site is not theoretical. Weight it accordingly.

This is also the argument for recording assessments where nothing was found — they establish the
baseline that makes a change detectable.

## 9. Never lose a report

If the photo fails to attach, **the report still stands**. Create the event, say the photo did not
attach, ask them to add it later.

A person who has just reported a hazard and been given an error will not report the next one. The
record matters more than its attachment.

## 10. Derived fields belong to automation

Risk rating, triage due date, regulator notifiability — these are set by rules, not by the agent.

Two reasons: consistency, since the same facts must always produce the same rating; and audit,
because a regulator-notifiable determination must be traceable to a rule rather than to a model's
judgement on the day.

---

## What this does not do

Stated plainly, because overclaiming in this domain is itself a hazard:

- **It does not certify anything as safe.** It identifies hazards and surfaces controls.
- **It does not replace a competent person.** High-consequence work needs one.
- **It does not detect every hazard.** It reports what it identified, with confidence, and states
  what it could not assess.
- **It is not a certified safety system.** Validate against your own obligations before relying on
  it.
