# Setup and deployment

Two parts: **wire up Supabase** so sign-in works, then **ship to the App
Store**. Do them in that order — you cannot test a build you cannot sign into.

---

# Part 1 — Supabase

## 1. Create the project

1. <https://supabase.com/dashboard> → **New project**.
2. Pick a region physically near your users; it sets your latency floor.
3. Save the database password somewhere real. You cannot recover it later.

## 2. Run the schema

**SQL Editor → New query**, paste all of [`supabase/schema.sql`](../supabase/schema.sql), **Run**.

That creates the `profiles` table, the row-level-security policies, and a
trigger that makes a row whenever someone signs up. It is safe to run twice.

> **Do not skip the RLS part.** The app ships with your anon key inside it —
> anyone who downloads the app has it. RLS is the only thing stopping one
> student reading another's row. Verify it took: **Table Editor → profiles →**
> the shield icon should read **RLS enabled**.

## 3. Get your keys

**Project Settings → API**. Copy:

- **Project URL** → `EXPO_PUBLIC_SUPABASE_URL`
- **anon / public** key → `EXPO_PUBLIC_SUPABASE_ANON_KEY`

Create `.env` in the project root:

```bash
cp .env.example .env
```

and paste both in. `.env` is git-ignored.

> **Never put the `service_role` key in the app.** It bypasses RLS completely.
> Anyone who unpacked the IPA would have full read/write on every student.

## 4. Set the redirect URLs

**Authentication → URL Configuration → Redirect URLs.** Add all three:

```
studyplat://auth/callback
exp://127.0.0.1:8081/--/auth/callback
https://<your-project-ref>.supabase.co/auth/v1/callback
```

The first is the production app (it matches `scheme` in `app.json`). The second
is Expo Go during development. The third is Supabase's own callback, which the
providers below need.

**A mismatch here is the single most common reason sign-in fails**, and the
symptom is unhelpful: the browser sheet opens, you log in, and it either hangs
or returns you to a signed-out app.

## 5. Enable Google

1. <https://console.cloud.google.com> → new project.
2. **APIs & Services → OAuth consent screen** → External → fill in app name,
   support email, developer email. Add scopes `email` and `profile`.
3. **Credentials → Create credentials → OAuth client ID → Web application.**
4. Under **Authorised redirect URIs** add exactly:
   `https://<your-project-ref>.supabase.co/auth/v1/callback`
5. Copy the **Client ID** and **Client secret**.
6. Back in Supabase: **Authentication → Providers → Google** → enable → paste
   both → Save.

> While the consent screen is in **Testing**, only accounts you list under
> *Test users* can sign in. Publish it before you submit to Apple, or the
> reviewer will be locked out and reject the build.

## 6. Enable Microsoft (Azure)

1. <https://portal.azure.com> → **Microsoft Entra ID → App registrations → New
   registration**.
2. Under **Supported account types** choose
   **Accounts in any organizational directory and personal Microsoft accounts**
   — otherwise personal @outlook.com accounts cannot sign in.
3. **Redirect URI**: platform **Web**, value
   `https://<your-project-ref>.supabase.co/auth/v1/callback`
4. Copy the **Application (client) ID**.
5. **Certificates & secrets → New client secret** → copy the **Value**
   immediately; it is only shown once.
6. In Supabase: **Authentication → Providers → Azure** → enable → paste the
   client ID and secret. Leave **Azure Tenant URL** blank for multi-tenant.

## 7. Test it

```bash
npx expo start --clear
```

Open on a device or simulator. Both buttons should open a browser sheet, and
after logging in the sheet should close itself and land you on the intro.

Check it worked: **Supabase → Table Editor → profiles** should now have a row
whose `id` matches **Authentication → Users**.

### If it fails

| What you see | Cause |
|---|---|
| "That sign-in method is not switched on" | The provider is disabled in Supabase. |
| "The redirect URL is not on the allow-list" | Step 4 — the URL must match character for character. |
| Sheet opens, logs in, returns signed out | Redirect URL mismatch, or `scheme` in `app.json` does not match. |
| "This build has no Supabase keys yet" | `.env` missing, or you did not restart with `--clear`. |
| Works in Expo Go, fails in a real build | You added the `exp://` URL but not `studyplat://`. |

---

# Part 2 — Shipping to the App Store

## 1. Prerequisites

- **Apple Developer Program membership** — $99/year, and enrolment can take a
  day or two. Start this first; it is the longest lead time in the process.
- A Mac is *not* required. EAS builds in the cloud.

## 2. Set up EAS

```bash
npm install -g eas-cli
eas login
eas build:configure
```

That writes `eas.json` and fills in the `extra.eas.projectId` field that is
currently blank in `app.json`.

## 3. Give EAS your secrets

`.env` is not uploaded with your build. Push the two keys to EAS instead:

```bash
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_URL --value "https://your-ref.supabase.co"
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "your-anon-key"
```

## 4. Build

```bash
eas build --platform ios --profile production
```

EAS will offer to generate signing credentials — let it. First build takes
15–30 minutes.

## 5. Submit

```bash
eas submit --platform ios --latest
```

## 6. App Store Connect

At <https://appstoreconnect.apple.com>, create the app record and fill in:

**Required before you can submit**

- **Screenshots** — 6.7" iPhone is mandatory. The map, a question, and the
  progress screen make the strongest three.
- **Description, keywords, support URL, marketing URL.**
- **Age rating** — answer the questionnaire honestly; this app should land at
  4+.
- **Privacy policy URL** — *mandatory*, and you cannot submit without a real,
  reachable page. It must state that you collect email address and name via
  Google/Microsoft sign-in, and that progress data is stored on Supabase.

**Privacy nutrition labels.** Declare truthfully:

| Data | Collected | Linked to user | Used for tracking |
|---|---|---|---|
| Email address | Yes | Yes | No |
| Name | Yes | Yes | No |
| User ID | Yes | Yes | No |
| Product interaction (progress, XP) | Yes | Yes | No |

**Export compliance.** `app.json` already sets
`ITSAppUsesNonExemptEncryption: false`, which is correct — you use HTTPS only,
which is exempt. This saves you a form on every submission.

## 7. What Apple will most likely reject you for

These are the ones that actually bite apps like this one:

1. **Guideline 5.1.1(v) — Account sign-in.** If an app offers third-party
   sign-in, Apple usually requires **Sign in with Apple** alongside it. With
   Google and Microsoft and nothing else, expect a rejection. Supabase supports
   Apple as a provider; budget for adding it before you submit.
2. **Guideline 5.1.1(ii) — Data collection.** You must offer **account
   deletion** from inside the app, not just a support email. A "Delete my
   account" control under Profile that calls a Supabase edge function is the
   usual answer.
3. **Reviewer cannot sign in.** If your Google consent screen is still in
   Testing, or Azure is single-tenant, review fails immediately. Also provide a
   **demo account** in App Review notes — reviewers frequently cannot complete
   OAuth on their test devices.
4. **Broken links.** Support URL and privacy policy URL must both load.

## 8. Recommended order

1. Add **Sign in with Apple** (see rejection risk 1).
2. Add **account deletion** (risk 2).
3. Write the privacy policy and host it.
4. Publish the Google consent screen.
5. Build, submit, and put a demo account in the review notes.

---

## Still outstanding in the app itself

Honest list of what is not finished, so nothing surprises you at review time:

- **Companion and boss sprites** are specced in
  [`character-sprite-prompts.md`](./character-sprite-prompts.md) but not
  generated, so companions show colour tiles rather than characters.
- **Question banks are 40 per course**, four per unit. A tier-six boss asks for
  twelve, so the longest stops pull from the wider course. Fine to ship,
  worth growing.
- **Companion abilities do not do anything yet.** Equipping one is recorded but
  no session reads it. Either wire them up or reword the screen before launch —
  shipping an ability that does nothing is the kind of thing reviewers and
  users both notice.
- **The session screens from the design** (Summary, LevelUp, BossIntro,
  BossFight, Victory, Defeat, WorldDone, Streak) are not built.
