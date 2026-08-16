import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const manifest = JSON.parse(await readFile(new URL("../dojo.json", import.meta.url), "utf8"));
const lesson = JSON.parse(await readFile(new URL(`../${manifest.lessons}`, import.meta.url), "utf8"));

test("declares an interactive course with a readable lesson", () => {
  assert.equal(manifest.mode, "interactive");
  assert.equal(typeof manifest.name, "string");
  assert.equal(typeof manifest.description, "string");
  assert.ok(Array.isArray(lesson.steps));
  assert.ok(lesson.steps.length > 0);
});

test("uses unique supported step IDs and complete question contracts", () => {
  const ids = new Set();
  for (const step of lesson.steps) {
    assert.ok(step.id);
    assert.equal(ids.has(step.id), false, `duplicate step id: ${step.id}`);
    ids.add(step.id);
    assert.ok(["present", "question"].includes(step.type), `unsupported step type: ${step.type}`);
    assert.equal(typeof step.title, "string");
    if (step.type === "present") assert.equal(typeof step.content, "string");
    if (step.type === "question") {
      assert.equal(typeof step.prompt, "string");
      assert.ok(Array.isArray(step.answers) && step.answers.length > 0);
      assert.equal(typeof step.explanation, "string");
    }
  }
});
