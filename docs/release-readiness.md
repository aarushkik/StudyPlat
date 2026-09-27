# StudyPlat release readiness

Updated 26 September 2026. The application has been hardened and its UI refined. It is **not yet ready for App Store submission**: external account setup, live database verification, Apple authorization revocation, and native acceptance testing remain.

## Completed

- Added persistent Light / Dark / System appearance controls in Profile without remounting navigation or resetting progress. Extended semantic colors through onboarding, lessons, results, maps, creature collections, and account controls.
- Added a floating glass navigation bar with a spring-driven selection indicator, quieter borders and shadows, a focused next-lesson hero, native haptics, and clearer quiz feedback. On supported iOS versions, navigation uses native Liquid Glass; older iOS/web use blur and Android uses solid surfaces. Reduce Transparency and Reduce Motion are respected. Lesson reading surfaces remain opaque.
- Local-save retry now retains the newest in-memory progress instead of reloading stale disk data. Companion elimination cannot submit a removed answer, daily display rollover does not overwrite yesterday's stored count, and offline/save notices are visible beside progress.
- Preserved the original turquoise/cream cartoon theme, original Stu sprites, chunky controls, and the owner's supplied icon. Added a custom static camp illustration and a clearer next-quest card. Removed ambient vertical bobbing; interaction motion respects Reduce Motion and app activity.
- Preserved Google and Microsoft login through the existing Supabase project. Both providers were confirmed enabled by a read-only API request. Email login, signup confirmation, recovery, OAuth cancellation, callback validation, and duplicate callback handling are implemented.
- Added durable guest study, explicit account prompts, dismissal cooldown, local erase, compatible-course guest migration, offline outbox, idempotent sync, and safe failure states. Other users cannot access a profile under the tested RLS rules.
- Corrected duplicate/empty session rewards, daily counts, streak dates across DST, placement-versus-earned unlocks, stop passing criteria, focused practice selection, unavailable boss rematches, misleading mode labels, and unearned activity claims.
- Added scrollable feedback/results, larger touch targets, wrapping labels, reduced motion, setup restoration, and clear storage/sync errors.
- Corrected a few overly broad Biology, Chemistry, and Java explanations. Automated validation checks all 960 bank items and all 1,440 map stops for structural consistency and playable selections. This does not certify academic accuracy.
- Added CI checks, EAS profiles, a manual Pages publication workflow, updated policies, and a release preflight command that never prints keys.

- Added twelve generated illustrated companion portraits and sixty individually illustrated bosses across ten families, a browsable boss field guide, encounter seals tied to the real passing target, boss result art, and activity-specific locked map emblems. See [creature art](creature-art.md). Saved progress IDs are unchanged.

## Verification

- 9 September art update: all 22 bundled JPEG assets load; all ten boss families render with individual portrait frames. The illustrated pack is approximately 6.2 MB and replaces the earlier vector creatures. Names, unlocks and saved IDs are unchanged.

- `npm run check`: TypeScript passed; 30 tests passed, including real PostgreSQL execution through PGlite, save-queue recovery/concurrency, theme contrast, companion elimination, and dependency compatibility.
- SQL migration runs twice successfully. Tests exercise cumulative two-device rewards, replayed mutation IDs, row isolation, anonymous denial, and account/profile/receipt deletion cascades.
- `npx expo install --check`: dependencies match Expo SDK 54. `npx expo-doctor`: all 18 checks pass.
- Browser acceptance: guest setup and placement skip, five-question lesson (multiple choice and typed answers), 20 XP/one gem/one daily session, stop unlock, dismissible account reminder, and successful persistence after reload. Feedback checked at 390 × 844; scrollable completion checked at 320 × 568; Progress checked at 768 × 1024. Guest signup still exposes Google and Microsoft and returns to the saved quest when dismissed.
- Production iOS Hermes and web exports, including the illustrated character pack and appearance system, succeeded at `/private/tmp/studyplat-release-polish-export-final`. These are bundles, not signed IPA archives.
- Compatible dependency fixes removed the earlier React Navigation parsing advisories. Reviewed PostCSS, image-size, and Xcode/uuid overrides brought `npm audit` to zero reported vulnerabilities. SDK 54's Metro needs the checked, idempotent `scripts/patch-metro-image-size.cjs` postinstall adapter to pass bundled asset bytes to image-size 2. It rejects unknown upstream code; regression tests cover both installed Metro asset pipelines and Xcode UUID generation. Do not skip postinstall. Remove the adapter when upgrading to Metro with native image-size 2 support, and rerun exports/audit.
- 26 September browser acceptance: completed a five-question lesson with choice and typed answers; verified 20 XP, one gem, one daily session, next-stop unlock, and persistence after reload. Dark appearance also persisted. Checked completion and Profile at 320 × 568, quiz at 390 × 844, and Practice/Progress at 768 × 1024. Light/dark switching preserves progress and reports the selected appearance accessibly. This is web layout validation, not native-device certification.
- Boss acceptance: completed the first seven-question boss; the seal target stayed at five, completion awarded 70 XP, the next stop opened, and the guide marked Pebbleclaw defeated. A fresh rematch verified the guardian completion artwork and cleared stamp at 320 × 568. All ten family selectors rendered successfully; guide checked at 320 × 568.
- Xcode is not installed on this host (Command Line Tools only). Simulator/device behavior, native memory/performance, VoiceOver, keyboards, signing, and OAuth round trips have not been certified.

## Required external setup

1. Apply the reviewed `supabase/schema.sql` in the existing project's SQL editor, preferably test/staging first. This app now calls `sync_profile`; deploying the app before the migration leaves account syncing unavailable. Back up the database according to the project's normal process. Run real two-account/two-device acceptance checks afterward.
2. In Supabase URL Configuration, allow `studyplat://auth/callback` and `studyplat://auth/recovery`. Add exact preview URLs only where needed; `npm run auth:urls` prints examples. Google and Azure use the Supabase `/auth/v1/callback` URL in their consoles. Azure requests the email scope. Test personal Microsoft and intended school tenant policies.
3. Configure Apple OAuth in Supabase, including Apple developer credentials, approved IDs, and callback. Then enable `EXPO_PUBLIC_APPLE_SIGN_IN_ENABLED=true` in the EAS production environment and verify sign-in/cancel/return behavior on a physical iPhone. Apple is currently disabled in the project. Before enabling it for release, add and verify server-side Apple token revocation during account deletion; the current deletion RPC removes Supabase records but does not revoke Apple authorization. For this general study app, review Apple's 4.8 login requirement while retaining Google and Microsoft. Do not enable a nonfunctional button just to satisfy a checklist.
4. Link the owner's Expo account/project with `eas init`; the project ID is currently blank. Configure public Supabase variables in EAS preview/production (local `.env` is not the production deployment configuration), Apple signing credentials, App Store Connect app record, and submission identity. No paid build or store submission has been initiated.
5. Privacy, terms, and support URLs now pass the HTTPS reachability check. The owner still needs to verify the published policy text matches the actual deployment, retention practices, and current files before submitting privacy labels.
6. Recheck dependency advisories before release, review all course content for academic accuracy and current AP scope, and avoid representing the short placement quiz as an exam-score prediction.

## Native acceptance before TestFlight release

- Small iPhone and iPad: full onboarding, keyboard entry, long explanations, lesson exit confirmation, results, map navigation, all tabs, companion selection, text scaling, VoiceOver, Reduce Motion, Reduce Transparency, native glass availability, Light/Dark/System appearance and native haptics.
- Fresh install as guest; complete sessions, force quit/reopen, airplane mode, background during save, return online, low-storage failure. Confirm dismissing account prompts never blocks study.
- Google/Microsoft/Apple cancel and success; email confirmation; reset link while app is closed/open; expired link; wrong password; sign out and switch accounts. No credentials or profile details should appear in logs.
- Upgrade a guest into new/same-course/different-course accounts; interrupt import; retry without duplicated XP. Two devices should combine independent offline sessions and refresh on foreground.
- Delete an account, verify Supabase profile/auth/receipts removed, sign in denied, then verify guest erase. Device-local copies on other offline devices cannot be remotely erased; confirm policy wording with actual hosting retention.
- Archive with production EAS profile, inspect privacy manifests in the archive, validate with App Store Connect, install via TestFlight, and capture real screenshots. Record results here before submission.

## Draft store listing

Name: StudyPlat: AP Study Quests

Subtitle: Short lessons. Steady progress.

Description: Build a steady study habit with Stu, your platypus study companion. Choose an AP course, read short field notes, practise topic questions, and follow a quest map with review stops and boss challenges. Track your sessions, streaks, and topic accuracy. Study as a guest with progress saved on your device, or make an account to carry a compatible quest across devices. Eight courses include Biology, Calculus AB, Chemistry, Computer Science A, English Language, Psychology, U.S. History, and World History. Questions are original practice material. StudyPlat is independent and is not affiliated with or endorsed by the College Board; AP is its registered trademark.

Primary category: Education. No subscriptions, ads, or in-app purchases are implemented. Choose the age rating by answering the current questionnaire accurately; the policy describes an intended audience of 13+ and this is not a Kids Category declaration.

App privacy draft for owner review: account name/email, account user ID, and linked study activity/progress are used for app functionality. No advertising, cross-app tracking, or third-party analytics SDK is included. Include hosting/provider collection as appropriate; confirm final data types and retention against the actual Supabase deployment before submitting labels.

Review notes draft: Full study functionality is accessible using Continue as guest. Account creation enables cloud saves. Account deletion is available in Profile. Provide working review credentials and any needed tenant instructions through App Store Connect after testing; no credentials are included here.

## Primary references

- [Apple App Review Guidelines, including 4.8 login and 5.1 privacy](https://developer.apple.com/app-store/review/guidelines/)
- [Apple submission requirements](https://developer.apple.com/app-store/submitting/)
- [Expo build infrastructure: SDK 54 Xcode 26 image](https://docs.expo.dev/build-reference/infrastructure/)
- [Expo privacy manifests](https://docs.expo.dev/guides/apple-privacy/)
- [Supabase Azure sign-in](https://supabase.com/docs/guides/auth/social-login/auth-azure)
