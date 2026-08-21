# Contributing

This is sample code, and it touches workplace safety. Contributions are welcome, with one standing
caveat: **nothing here should make the tool more confident than the evidence supports.**

## The constraint that matters most

A model reading a photo may **never**:

- conclude a hazard is absent, or that an area is safe
- infer cause, sequence or fault from a still image
- assess a person's competence, behaviour or condition

"No guard is visible in this image" is acceptable. "There is no guard" is not. A confident all-clear
from one camera angle is the most dangerous output this system could produce.

Any pull request that weakens those constraints will be declined.

## Especially useful

- **Accuracy results** against a real hazard taxonomy or procedure library. None of the vision
  behaviour in this repo has been measured.
- **Additional hazard categories** and the prompt wording that identifies them reliably.
- **Failure cases.** A photo the prompts read wrongly is more useful than one they read correctly.
- **Regulatory perspective.** If the framing conflicts with a jurisdiction's obligations, say so.
- **Corrections.** If something here is wrong, say so plainly.

## Pull requests

1. One concern per PR.
2. Preserve the safety constraints above, and the separation between the model's reading of a photo
   and the reporter's own account.
3. Do not remove the emergency rule from any capture path.
4. Never commit real incident data, photographs, site names or personal information. Use synthetic
   examples.
5. If you add a claim about accuracy, say how it was measured.

## A note on scope

This repo does not certify anything as safe, replace a competent person, or detect every hazard.
Contributions should keep it that way, and keep saying so.

## Code of conduct

Be constructive and assume good faith.
