#!/usr/bin/env node
/**
 * Prints every URL that has to be on Supabase's allow-list, computed from
 * app.json and this machine's LAN address.
 *
 * A redirect URL that does not match character-for-character is the single
 * most common reason OAuth fails, and the symptom is unhelpful: the browser
 * sheet opens, you log in, and you come back signed out. Guessing at these by
 * hand is where the mistakes happen.
 */
import { readFileSync } from 'node:fs';
import { networkInterfaces } from 'node:os';

const app = JSON.parse(readFileSync(new URL('../app.json', import.meta.url))).expo;
const scheme = app.scheme;

const lan =
  Object.values(networkInterfaces())
    .flat()
    .find((n) => n && n.family === 'IPv4' && !n.internal)?.address ?? '<your-lan-ip>';

const ref = (process.env.EXPO_PUBLIC_SUPABASE_URL ?? '')
  .replace(/^https?:\/\//, '')
  .replace(/\.supabase\.co\/?$/, '');

console.log(`
Supabase → Authentication → URL Configuration → Redirect URLs
─────────────────────────────────────────────────────────────
Add all of these:

  ${scheme}://auth/callback                 ← production / dev build
  exp://${lan}:8081/--/auth/callback        ← Expo Go on this machine
  exp://**                                  ← covers Expo Go on any IP

Google Cloud Console and Azure both need this ONE redirect URI:

  https://${ref || '<your-project-ref>'}.supabase.co/auth/v1/callback

App scheme (app.json):        ${scheme}
iOS bundle identifier:        ${app.ios?.bundleIdentifier ?? '(unset)'}
`);
