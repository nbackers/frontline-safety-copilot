# Dataverse schema

Publisher prefix `fsc_`. Tables for events, hazards, procedures and assessments.

---

## Core tables

### `fsc_safetyevent`

Something that happened or was found.

| Column | Purpose |
|---|---|
| `fsc_title` | Short title, drafted by the agent, corrected by the reporter |
| `fsc_description` | **The reporter's words, verbatim.** Never AI-generated |
| `fsc_eventtype` | Injury, Near miss, Hazard, Property damage |
| `fsc_site` | Lookup to `fsc_site` |
| `fsc_location` | Specific area within the site |
| `fsc_occurredon` | When it happened |
| `fsc_reportedby` | Reporter, or empty if anonymous |
| `fsc_areamadesafe` | Whether the area was made safe |
| `fsc_firstaidgiven` | Injury events only |
| `fsc_emergencyservicescalled` | Injury events only |
| `fsc_photoanalysis` | **The model's reading of the photo.** Never the reporter's words |
| `fsc_photoanalysedon` | When the reading was made |
| `fsc_riskrating` | **Set by automation, never by the agent** |
| `fsc_triageduedate` | Set by automation |
| `fsc_regulatornotifiable` | Set by automation |

**The two-column separation is the important part of this schema.** `fsc_description` holds what the
person said. `fsc_photoanalysis` holds what the model saw. They are never merged, so anyone reading
the record can tell which is which - and in an investigation that distinction is everything.

Derived fields are set by rules, not the agent. A regulator-notifiable determination must be
traceable to a rule rather than a model's judgement on the day.

### `fsc_jobsafetyassessment`

A pre-work assessment.

| Column | Purpose |
|---|---|
| `fsc_task` | What the worker was about to do |
| `fsc_site` | Lookup |
| `fsc_location` | Specific area |
| `fsc_assessedby` | Who did it |
| `fsc_assessedon` | When |
| `fsc_outcome` | Proceeded, Escalated, Stopped |
| `fsc_photoanalysis` | Model's reading of the work area |
| `fsc_imagequality` | Clear, Partial, Poor |
| `fsc_unabletoassess` | What the image did not show |

Record assessments where **nothing** was found. They establish the baseline that makes a change
detectable, and they are the evidence the assessment happened.

### `fsc_identifiedhazard`

Hazards found by an assessment or event. Many per parent.

| Column | Purpose |
|---|---|
| `fsc_description` | Specific - "unguarded floor opening near the east stair" |
| `fsc_hazardtype` | Lookup to `fsc_hazardtype` |
| `fsc_confidence` | 0-1, as reported by the model |
| `fsc_severity` | Low, Medium, High |
| `fsc_source` | Described, Photo, Site history |
| `fsc_matchedprocedure` | Lookup, **empty when unmatched** |
| `fsc_escalated` | Whether escalated for having no procedure |

An empty `fsc_matchedprocedure` is a **reportable gap**, not a data quality problem. Report on it.

### `fsc_procedure`

Safe work method statements and control procedures.

| Column | Purpose |
|---|---|
| `fsc_procedureid` | Your reference, e.g. SWMS-014 |
| `fsc_title` | |
| `fsc_summary` | Short description used for matching |
| `fsc_hazardtypes` | Which hazard types it covers |
| `fsc_tasktypes` | Which tasks it applies to |
| `fsc_requirespermit` | |
| `fsc_requiresisolation` | |
| `fsc_requiressecondperson` | |
| `fsc_document` | The full document |
| `fsc_isactive` | |

Matching is on **hazard type and task**. Both matter - working at height in a warehouse and working
at height on a roof are different procedures.

### `fsc_hazardtype`

Your hazard taxonomy. Reference data.

| Column | Purpose |
|---|---|
| `fsc_name` | e.g. Working at height, Confined space, Manual handling |
| `fsc_ishighconsequence` | Drives the permit/isolation branch |
| `fsc_defaultseverity` | |

Use your organisation's existing taxonomy. The prompts accept the list and classify against it - a
taxonomy the organisation already reports on is worth more than a generic one.

### `fsc_site`

| Column | Purpose |
|---|---|
| `fsc_name` | |
| `fsc_sitetype` | |
| `fsc_isactive` | |

---

## Attachments

Photos attach as `annotation` rows against the event or assessment, with `filename` and the correct
`mimetype`.

**If the attachment fails, the record still stands.** Create it, tell the user the photo did not
attach, ask them to add it from the app. Losing a report over an attachment failure means the next
one is not reported at all.

---

## Site history

Previous events at a site, and previous events on a task type, are the strongest signal for hazard
identification - a hazard that has already caused an incident here is not theoretical.

Index for that query pattern:
- `fsc_safetyevent` by `fsc_site` and `fsc_occurredon`
- `fsc_jobsafetyassessment` by `fsc_task`
- `fsc_identifiedhazard` by `fsc_hazardtype`

---

## Reporting worth building

**Unmatched hazards** - hazards with no matching procedure. A direct gap list for the safety team.

**Assessment-to-incident correlation** - incidents at sites and tasks where assessments were and
were not done. The measure of whether any of this works.

**Near-miss rate** - near misses reported per site. A *rising* rate usually means reporting is
getting easier, which is good. Falling to zero rarely means hazards stopped existing.

**Photo-assisted reporting rate** - how many reports include a photo. Tests whether the fast path is
actually being used.

---

## Access
- Reporters see their own reports
- Supervisors see their site
- Safety advisors see everything
- Anonymous reports store no reporter, and **no attempt is made to identify them from context**

If anonymous reporting is offered, it has to be genuine. A reporter who suspects otherwise stops
reporting, and the near misses go with them.
