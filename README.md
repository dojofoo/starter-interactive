# Starter Interactive

An installable reference course and authoring template for Dojofoo's
`interactive` mode. Its example lesson helps a learner prepare Python with uv,
initialize dojofoo, and understand which tool owns each part of the workspace.

The lesson UI itself does not depend on Python. A tiny Python example is
included as an optional destination after the environment is ready.

## Try the dojo

From an initialized dojofoo workspace:

```sh
npx dojofoo add dojofoo/starter-interactive
npx dojofoo ui --open
```

During local development, install this checkout directly:

```sh
npx dojofoo add ../starter-interactive
npx dojofoo ui --open
```

Opening the course presents one concept or question at a time. Answers receive
authored feedback, and the current step survives a browser refresh or daemon
restart.

## Use it as an authoring template

1. Copy this repository or use it as a GitHub template.
2. Rename the npm package and the manifest's `name`.
3. Replace the course description and `DOJO.md` teaching rules.
4. Replace `lessons/python-uv-dojofoo.json` with one compact lesson.
5. Update the `lessons` path in `dojo.json`.
6. Run `npm test` and `npm pack --dry-run` before publishing.

The minimal contract is:

```json
{
  "mode": "interactive",
  "name": "@your-scope/your-course",
  "version": "0.0.1",
  "description": "What the learner will accomplish.",
  "lessons": "lessons/introduction.json"
}
```

The current POC supports `present` and `question` steps. Presentation steps
contain authored content. Question steps contain a prompt, accepted answers,
and an explanation shown after the learner submits an answer. Keep accepted
answers narrow enough to make deterministic feedback meaningful.

This template complements
[`dojofoo/starter-kata`](https://github.com/dojofoo/starter-kata), which demonstrates the
test-backed `katas` mode.
