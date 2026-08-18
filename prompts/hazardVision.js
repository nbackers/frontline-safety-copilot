/**
 * Hazard identification from an image.
 *
 * Two prompts, deliberately separate:
 *
 *   Pre-work  - a work area before a job starts. Identifies hazards to control.
 *   Reporting - something that has already happened or been found.
 *
 * They are separated because the failure modes differ. A pre-work prompt that misses a
 * hazard sends someone into it. A reporting prompt that invents a cause corrupts an
 * investigation. The safeguards below reflect that.
 *
 * The rule running through both: an image shows a state, not a story.
 */

/**
 * Constraints applied to every image reading.
 *
 * The "cannot confirm absence" rule is the important one. A model asked whether a work
 * area is safe will happily answer yes, and a confident all-clear from one camera angle
 * is the most dangerous output this system could produce.
 */
const VISION_SAFEGUARDS = `
You are reading a still image. It shows one angle at one moment.

You may identify what is visibly present. You must not conclude that anything is absent.
"No guard is visible in this image" is acceptable. "There is no guard" is not, and the
difference matters.

Never infer a cause, a sequence of events, or fault from an image.

Never assess a person's competence, behaviour or condition. If a person is present, note
only that, and only where relevant to the hazard.

If the image is dark, blurred, partially obscured, or shows only part of the area, say so
and lower your confidence. An admitted gap is useful. A confident wrong reading is not,
because nobody checks it.

Never state or imply that an area is safe. Absence of an identified hazard is not a
finding of safety.

Return only valid JSON. No commentary, no markdown fences.
`.trim();

/**
 * Pre-work hazard identification, for job safety analysis.
 *
 * @param {object} context
 * @param {string} context.task     What the worker is about to do.
 * @param {string} [context.site]
 * @param {string[]} [context.knownHazardTypes]  Hazard taxonomy to classify against.
 * @returns {string}
 */
export function buildPreWorkHazardPrompt({ task, site, knownHazardTypes = [] }) {
  const taxonomy = knownHazardTypes.length
    ? `\nClassify each hazard as one of: ${knownHazardTypes.join(', ')}.`
    : '';

  return `
You are helping a frontline worker identify hazards before they start a job.

The task they are about to do: ${task}
${site ? `Location: ${site}` : ''}

Identify hazards visible in the image that are relevant to this task. A hazard that is
present but irrelevant to what they are doing is noise - say so rather than listing it as
a risk.${taxonomy}

${VISION_SAFEGUARDS}

Return JSON:
{
  "hazards": [
    {
      "description": "<specific - 'unguarded floor opening near the east stair', not 'trip hazard'>",
      "type": "<hazard type>",
      "relevanceToTask": "<why this matters for THIS job>",
      "confidence": <0..1>,
      "severity": "low" | "medium" | "high"
    }
  ],
  "imageQuality": "clear" | "partial" | "poor",
  "unableToAssess": ["<what the image does not show that matters>"],
  "requiresPersonPresent": <true when this needs a person on site, not a photo>
}
`.trim();
}

/**
 * Hazard reading for a report of something already found or occurred.
 *
 * Deliberately narrower. This feeds a record that may be read months later in an
 * investigation, so it must be clear which words came from the image and which from the
 * person.
 *
 * @param {object} context
 * @param {string} [context.reporterAccount]  What the reporter said, if anything.
 * @returns {string}
 */
export function buildReportHazardPrompt({ reporterAccount } = {}) {
  return `
You are reading a photo submitted as part of a safety report.

${reporterAccount ? `The reporter said: "${reporterAccount}"\n` : ''}
Describe what is visible and classify what type of safety event it appears to show.

Your reading supports the reporter's account. It does not replace or correct it. If what
you see appears to differ from what they described, record both without asserting which is
right - you are looking at one frame and they were there.

If the image appears to show an injured person, set requiresImmediateEscalation and stop.

${VISION_SAFEGUARDS}

Return JSON:
{
  "visibleDescription": "<what is in the image>",
  "suggestedEventType": "<injury | near miss | hazard | property damage | unknown>",
  "suggestedTitle": "<short title drafted for the reporter to correct>",
  "hazardsVisible": [ { "description": "...", "confidence": <0..1> } ],
  "personPresent": <boolean>,
  "requiresImmediateEscalation": <boolean>,
  "imageQuality": "clear" | "partial" | "poor",
  "cannotDetermine": ["<what the image does not establish>"]
}
`.trim();
}

/**
 * Match identified hazards to controls.
 *
 * Runs after hazard identification rather than as one call. Keeping them separate means
 * hazard identification can be reviewed on its own, and a bad control match cannot
 * quietly reshape which hazards were reported.
 *
 * @param {object} context
 * @param {Array<{description: string, type: string}>} context.hazards
 * @param {string} context.task
 * @param {Array<{id: string, title: string, hazardTypes: string[], summary: string}>} context.procedures
 * @returns {string}
 */
export function buildControlMatchPrompt({ hazards, task, procedures }) {
  const hazardList = hazards
    .map((h, i) => `${i + 1}. ${h.description} (${h.type})`)
    .join('\n');

  const procedureList = procedures
    .map((p) => `- ${p.id}: ${p.title} [covers: ${p.hazardTypes.join(', ')}] - ${p.summary}`)
    .join('\n');

  return `
Match each hazard to the procedures that control it, for this task: ${task}

Hazards:
${hazardList}

Available procedures:
${procedureList}

Return only the controls relevant to this task. Presenting every control in a procedure is
the same as presenting none - it guarantees none are read.

If a hazard has no matching procedure, say so explicitly. An unmatched hazard is a finding
that must be escalated, not omitted because there was no paperwork for it.

Never invent a procedure id or title. Only use those listed above.

Return only valid JSON:
{
  "matches": [
    {
      "hazard": "<hazard description>",
      "procedureId": "<id>",
      "controlsBeforeStarting": ["<control>"],
      "requiresPermit": <boolean>,
      "requiresIsolation": <boolean>,
      "requiresSecondPerson": <boolean>
    }
  ],
  "unmatchedHazards": ["<hazard description>"],
  "highestConsequence": "<the hazard most likely to cause serious harm>",
  "singleMostImportantControl": "<the one control that prevents it>"
}
`.trim();
}

/** Extraction must be deterministic - the same photo must give the same reading. */
export const MODEL_SETTINGS = {
  temperature: 0,
  responseFormat: 'json_object',
};
