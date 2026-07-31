# stuAP

**Master AP classes one quest at a time.**

stuAP is a study app for AP courses built around a map you actually travel:
short lessons, streaks, XP, and unit boss battles. The mascot is **Stu**, a pink
platypus scholar in a graduation cap.

> **Milestones so far: the first-run experience, the "Find Your Level" placement
> flow, and the quest map you land on afterwards.** Lessons reuse the placement
> question bank rather than having content of their own — that's the next
> milestone.

---

## What's implemented

### Setup and placement

1. **Splash** — rose brand screen; Stu springs in over pulsing rings while drawn
   study motifs drift behind him.
2. **Welcome** — hero mascot, wordmark, two entry actions.
3. **Intro** — Stu introduces setup from a speech bubble.
4. **Course selection** — eight AP courses, each with its own animated icon.
5. **Subject experience** — "How much AP Biology is already in your head?"
   (the name adapts), five levels with rising bars.
6. **Goal score** — the AP score being chased.
7. **Exam timeline** — when the exam is, so pacing can adapt.
8. **Quest preview** — three milestones tailored to the subject family.
9. **Find Your Level** — multiple-choice, short-answer, and stimulus questions
   across four difficulties, with supportive per-answer feedback.
10. **Placement result** — a weighted score places the student into Beginner /
    Builder / AP Ready / Advanced Review, and says how far into the map that
    opens.

Each setup screen shows a "Step n of 5" chip so the flow always feels finite.

### The quest map

Home is a scrolling illustrated trail through the course.

- **Regions** — each unit is a biome (meadow, forest, highland, summit) with its
  own landscape, and its banner pins to the top while you're inside it.
- **Stops** — lesson, skill drill, source study, bonus cache, and unit boss.
  Ordinary stops are chunky discs; the **boss is a shield** with its own dark
  palette, a pulsing aura, and a ribbon, so it never reads as just another
  lesson.
- **State is derived, never stored** — a stop is complete if it's in the cleared
  set, *current* if it's the first one that isn't, and locked after that. The map
  can't show two "start here" nodes or strand a reachable one behind a gate.
- **Placement carries through** — a higher placement opens the map further along
  the trail, so the route already has history behind it.
- **Starting a lesson** — tapping a stop opens a sheet with what you're about to
  do, what it's worth, and one button. Finishing returns through a completion
  screen that banks XP and clears the stop.

Three more tabs hang off the same progress state: **Train** (drills that don't
cost a stop), **Battles** (every unit boss, and what's blocking the locked ones),
and **You** (streak, XP, gems, stops cleared, and the plan set during setup).

### Streaks

The quiz tracks a correct-answer combo and celebrates every fifth in a row with
an original turquoise "knowledge splash" — an SVG blob, an expanding ripple,
flying droplets, and a bold label. It's non-blocking, self-completing, and honors
the device's reduce-motion setting.

---

## Run it

```bash
npm install
```

```bash
npm start
```

Then press **i** (iOS), **a** (Android), or scan the QR with **Expo Go**
(this project targets **Expo SDK 54**).

```bash
npx tsc --noEmit
```

---

## Project structure

```
src/
  components/
    Mascot/        Mascot (motion) + StuArt (the drawing) + types
    home/          Scenery, TrailSegment, QuestNodeButton, UnitBanner,
                   QuestHud, QuestTabBar, LessonSheet, Train/Battles/Profile
    icons/         Glyph (the icon set), CourseIcon, AppIcons
    onboarding/    SetupQuestionHeader, LevelOptionCard, ChoiceCard,
                   QuestStep, LevelBars, useCardAnimation
    quiz/          QuestionCard, AnswerChoice, QuizFeedbackPanel,
                   QuizProgressHeader, StreakBadge, StreakMilestoneOverlay
    ui/            AppButton, ProgressBar, SpeechBubble, ScreenContainer,
                   SelectRow, CourseCard, TopBackButton, Wordmark
  data/            apCourses, onboardingGoals, placementQuestions, questMap
  navigation/      RootNavigator, types
  screens/         Splash, Welcome, Intro, CourseSelection, SubjectExperience,
                   GoalScore, ExamTimeline, AchievementPreview, Quiz,
                   PlacementResult, LessonComplete, Home
  state/           OnboardingContext (setup), QuestContext (map progress)
  theme/           colors, spacing, typography, radius, shadows, motion
  types/           course, onboarding, quiz, quest
  utils/           placementScoring, streaks
```

Imports use the `@/` alias for `src/`.

---

## Data models

### Placement quiz

Types live in [`src/types/quiz.ts`](src/types/quiz.ts); questions in
[`placementQuestions.ts`](src/data/placementQuestions.ts). A `PlacementQuestion`
carries `id`, `courseId`, `difficulty`, `type`, `prompt`, an optional `stimulus`,
`choices` + `correctAnswerId` (or `acceptedAnswers`), `explanation`, and
`skillTag`.

All eight subjects have an original eight-question quiz spanning their key
skills and every difficulty. **Every question is original placeholder content —
never real exam material.** Scoring
([`placementScoring.ts`](src/utils/placementScoring.ts)) weights correct answers
by difficulty (1/2/3/4) and maps the 0–1 score onto a starting level.

### Quest map

[`questMap.ts`](src/data/questMap.ts) builds three regions per course from four
lesson topics each. The *shape* of a region — where the drill, the source study,
the bonus cache, and the boss fall — is one shared pattern, so only the
subject-specific titles are data.

---

## The mascot

[`Mascot`](src/components/Mascot/Mascot.tsx) owns motion;
[`StuArt`](src/components/Mascot/StuArt.tsx) owns the drawing. Stu is a single
rounded blob so his silhouette holds up from a 44px avatar to a full-screen hero.

- `expression`: `happy` · `thinking` · `excited` · `worried` · `celebrating` ·
  `focused` · `proud` · `sleepy`
- `accessory`: `none` · `book` · `pencil` · `wand` · `lantern`
- `size`: `tiny` · `small` · `medium` · `large` · `xl`, or a raw number

He idles with breathing, swaying, and bobbing on three mismatched periods so he
never looks metronomic, blinks on a randomized cadence, hops on joyful
expressions, and tilts on worried ones. A contact shadow tightens as he leaves
the ground.

---

## Design system

Tokens in [`src/theme`](src/theme): a soft rose brand on warm cream, per-course
accents, a quest-map scenery range, feedback colors, gradients, and a shared
motion vocabulary. The signature `AppButton` rides on a chunky lip it sinks onto
when pressed — the same physics the answer choices and map nodes use.

Icons are an original set ([`Glyph`](src/components/icons/Glyph.tsx)) drawn on a
shared 24×24 grid. The app ships no emoji and no stock icon font.

---

## What to build next

- **Real lesson content**, so map stops teach rather than reusing placement
  questions.
- **Persist** setup and map progress (AsyncStorage), and skip setup for returning
  users.
- Adaptive placement difficulty and a per-skill breakdown.
- Timers and hearts for boss battles, so they actually feel like exams.
- Dark theme, and richer motion via Reanimated.
- Backend and auth once the data shapes settle.

---

Built with Expo, React Native, and TypeScript.
