import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const manifestSource = await readFile(new URL("../dojo.yaml", import.meta.url), "utf8");
const manifestValue = (key) => manifestSource.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+)`, "m"))?.[1].trim();
const lessonPath = manifestValue("lessons");
const lesson = JSON.parse(await readFile(new URL(`../${lessonPath}`, import.meta.url), "utf8"));

test("declares an interactive course with a readable lesson", () => {
  assert.equal(manifestValue("mode"), "interactive");
  assert.equal(manifestValue("name"), "@dojofoo/starter-interactive");
  assert.equal(typeof lessonPath, "string");
  assert.ok(Array.isArray(lesson.steps));
  assert.ok(lesson.steps.length > 0);
});

test("uses unique supported step IDs and complete question contracts", async () => {
  const ids = new Set();
  for (const step of lesson.steps) {
    assert.ok(step.id);
    assert.equal(ids.has(step.id), false, `duplicate step id: ${step.id}`);
    ids.add(step.id);
    assert.ok(["present", "question"].includes(step.type), `unsupported step type: ${step.type}`);
    assert.equal(typeof step.title, "string");
    if (step.type === "present") {
      assert.match(step.content, /\.mdx$/);
      await access(new URL(`../${step.content}`, import.meta.url));
    }
    if (step.type === "question") {
      assert.match(step.prompt, /\.mdx$/);
      assert.ok(Array.isArray(step.answers) && step.answers.length > 0);
      assert.match(step.explanation, /\.mdx$/);
      await access(new URL(`../${step.prompt}`, import.meta.url));
      await access(new URL(`../${step.explanation}`, import.meta.url));
    }
  }
});
