// ─────────────────────────────────────────────────────────
// index.js
// Single entry point for the coding-activity feature module.
//
// Import in your dashboard like this:
//   import CodingActivity from './features/coding-activity'
// ─────────────────────────────────────────────────────────

export { default } from './CodingActivity';

// Named exports if consumers need individual pieces
export { default as GitHubActivity }  from './components/GitHubActivity';
export { default as LeetCodeActivity } from './components/LeetCodeActivity';
export { default as ContributionHeatmap } from './components/ContributionHeatmap';
export { default as DifficultyRings } from './components/DifficultyRings';