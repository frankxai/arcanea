import { command, makePlan, pendingChangesets, pnpm, workspaces, writePlan } from './publish-scope.mjs';

const cwd = process.cwd();
const consumed = await pendingChangesets(cwd);
if (!consumed.length) {
  console.log('No pending changesets; existing release metadata preserved.');
} else {
  const base = command(cwd, 'git', ['rev-parse', 'HEAD']).trim();
  const before = await workspaces(cwd);
  // Keep the existing version/regenerate/frozen sequence. Record scope only after it succeeds.
  for (const args of [
    ['exec', 'changeset', 'version'],
    ['install', '--lockfile-only', '--no-frozen-lockfile', '--ignore-scripts'],
    ['install', '--lockfile-only', '--frozen-lockfile', '--ignore-scripts'],
  ]) process.stdout.write(pnpm(cwd, args, 180_000));
  const plan = await makePlan(cwd, base, before, await workspaces(cwd), consumed);
  await writePlan(cwd, plan);
  console.log(`Recorded ${plan.releases.length} versioned public packages in .changeset/release-plan.json.`);
}
