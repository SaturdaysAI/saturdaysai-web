import test from 'node:test';
import assert from 'node:assert/strict';
import { protectTerms } from '../scripts/lib/translation-terms.mjs';

test('translation preserves programme names and technical product names', () => {
  const original = 'AI Saturdays uses Hugging Face, Next.js and React. AI fellows share projects at Saturdays.AI.';
  const protectedText = protectTerms(original);
  assert.doesNotMatch(protectedText.text, /Hugging Face|Next\.js|AI Saturdays/);
  assert.equal(protectedText.restore(protectedText.text), original);
});
test('terms do not replace parts of other words', () => {
  const original = 'Reactive programming and Pythonic code with React and Python';
  const protectedText = protectTerms(original);
  assert.match(protectedText.text, /Reactive programming and Pythonic code/);
  assert.equal(protectedText.restore(protectedText.text), original);
});
test('a translation that loses a protected name is rejected', () => {
  assert.throws(() => protectTerms('Hugging Face').restore('abrazar la cara'), /lost protected term/);
});
