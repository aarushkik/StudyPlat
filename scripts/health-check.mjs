// Read-only service check. Never prints credentials or user records.
const url = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';
let publicKey = key.startsWith('sb_publishable_');
try { publicKey ||= JSON.parse(Buffer.from(key.split('.')[1], 'base64url')).role === 'anon'; } catch {}
if (!/^https:\/\/[a-z0-9.-]+\/?$/.test(url) || !publicKey) {
  console.error('FAIL: Valid Supabase URL and public anon/publishable key required.');
  process.exit(1);
}
let failed = false;
for (const [label, path] of [
  ['Auth', '/auth/v1/settings'],
  ['Database', '/rest/v1/profiles?select=id&limit=0'],
]) {
  try {
    const response = await fetch(`${url.replace(/\/$/, '')}${path}`, {
      headers: { apikey: key, ...(key.startsWith('eyJ') ? { Authorization: `Bearer ${key}` } : {}) },
      signal: AbortSignal.timeout(15000),
      redirect: 'error',
    });
    console.log(`${response.ok ? 'PASS' : 'FAIL'}: ${label} HTTP ${response.status}`);
    if (!response.ok) { failed = true; continue; }
    if (label === 'Auth') {
      const settings = await response.json();
      for (const provider of ['google', 'azure']) {
        const enabled = settings.external?.[provider] === true;
        console.log(`${enabled ? 'PASS' : 'FAIL'}: ${provider} login enabled`);
        failed ||= !enabled;
      }
    }
  } catch (error) {
    failed = true;
    console.error(`FAIL: ${label} connection (${error.cause?.code ?? error.name}).`);
  }
}
process.exitCode = failed ? 1 : 0;
