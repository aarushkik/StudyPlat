# stuAP 🐤

**Master AP classes one quest at a time.**

stuAP is a Duolingo-inspired study app for AP courses — short lessons, streaks,
XP, progress paths, and animated review battles that make exam prep feel like a
game. The mascot is **Stu**, a friendly pink student bird in an "STU" cap.

> **Milestones so far: the first-run experience + the "Find Your Level"
> placement flow.** The full app (real lessons, XP, streaks, boss battles) is
> intentionally still out of scope — this is a polished, animated foundation.

---

## ✨ What's implemented

A complete, animated onboarding + placement flow:

1. **Splash** — warm rose brand screen; Stu pops in, wordmark settles, auto-advances.
2. **Welcome** — big mascot, tagline, two chunky buttons.
3. **Intro** — Stu introduces setup via a speech bubble.
4. **Course selection** — selectable grid of 8 AP courses.
5. **Subject experience** — "How much AP Biology do you know?" (name adapts to the course), five levels with increasing-bar icons.
6. **Daily goal** — 5–30 min/day options; commits with "I'm committed".
7. **Achievement preview** — three "what you'll achieve in 3 months" rows, tailored to the subject family (STEM / history & social science / English).
8. **Start choice** — "Start from scratch" or "Find my level" (recommended).
9. **Find Your Level quiz** — a reusable placement engine: multiple-choice, short-answer, and stimulus questions (paragraph, code, formula, chart/image placeholders) across four difficulties, with supportive per-answer feedback and a running confidence meter.
10. **Placement result** — weighted scoring places the student into **Beginner / Builder / AP Ready / Advanced Review**, with a celebrating Stu and a summary.
11. **Home placeholder** — confirms course, daily goal, experience, and placement result carried through.

"Start from scratch" skips the quiz and places you at Beginner; "Find my level"
runs the quiz and scores it.

---

## 🔥 Streaks & progress (quiz)

The placement quiz tracks a **correct-answer streak (combo)** and celebrates
milestones with an original animation — no Duolingo lightning.

- **Streak state** ([`utils/streaks.ts`](src/utils/streaks.ts)) — the quiz tracks `currentCorrectStreak`, `bestCorrectStreak`, `totalCorrect`, `totalAnswered`. A correct answer increments the streak; a wrong one resets it to 0.
- **Progress header** ([`QuizProgressHeader`](src/components/quiz/QuizProgressHeader.tsx)) — left-weighted: close button → a column with the **streak badge** ("N IN A ROW", accent color, appears at 2+) sitting just above an animated rose progress bar (soft-gray rounded track) → a small reacting Stu.
- **Milestone celebration** ([`StreakMilestoneOverlay`](src/components/quiz/StreakMilestoneOverlay.tsx)) — at 5 / 10 / 15 / 20 (every 5, extensible) a turquoise **"knowledge splash"** blooms from Stu's wand: an SVG splash blob, an expanding ripple, flying droplets, and a bold label, then it fades out. It's non-blocking (`pointerEvents="none"`), self-completing (`onAnimationComplete`), and honors the device's **reduce-motion** setting (falls back to a quick fade). Reusable via `variant` (`water` implemented).

The streak system is built to be reused by full lessons and longer practice
sessions later, where higher milestones (10/15/20+) will naturally trigger.

---

## 🚀 Run it

```bash
npm install
npm start
```

Then press **i** (iOS), **a** (Android), or scan the QR with **Expo Go**
(this project targets **Expo SDK 54**).

```bash
npx tsc --noEmit  # type-check
```

---

## 🗂 Project structure

```
src/
  components/
    Mascot/        Mascot.tsx, Mascot.types.ts   (expression | accessory | size)
    onboarding/    SetupQuestionHeader, LevelOptionCard, DailyGoalCard,
                   AchievementRow, StartChoiceCard, LevelBars, useCardAnimation
    quiz/          PlacementQuizScreen, QuestionCard, AnswerChoice,
                   QuizFeedbackPanel, QuizProgressHeader
    ui/            AppButton, ProgressBar, SpeechBubble, ScreenContainer,
                   TopBackButton, CourseCard
  data/            apCourses.ts, onboardingGoals.ts, placementQuestions.ts
  navigation/      RootNavigator.tsx, types.ts
  screens/         SubjectExperience, DailyGoal, AchievementPreview,
                   StartChoice, PlacementResult, HomePlaceholder,
                   Splash, Welcome, Intro, CourseSelection
  state/           OnboardingContext.tsx   (course, experience, goal, start, placement)
  theme/           colors, spacing, typography, radius, shadows
  types/           course.ts, onboarding.ts, quiz.ts
  utils/           placementScoring.ts
```

Imports use the `@/` alias → `src/`.

---

## 🧩 Placement quiz data model

Types live in [`src/types`](src/types); questions in
[`placementQuestions.ts`](src/data/placementQuestions.ts). A `PlacementQuestion`
carries `id`, `courseId`, `difficulty` (`foundation` → `advanced`), `type`
(`multiple_choice` / `short_answer` / `stimulus`), `prompt`, optional
`stimulus`, `choices` + `correctAnswerId` (or `acceptedAnswers`), `explanation`,
and `skillTag`.

All **eight** subjects (Biology, Calculus AB, World History, U.S. History, CS A,
Chemistry, Psychology, English Language) have an original 8-question quiz with
its own intro, spanning the subject's key skills and every difficulty. **All
questions are original placeholder content — never real exam questions.** Add
questions to a subject's array; the engine picks them up automatically.

Scoring ([`placementScoring.ts`](src/utils/placementScoring.ts)) weights correct
answers by difficulty (1/2/3/4) and maps the 0–1 score onto a starting level.

---

## 🐤 The mascot

[`Mascot`](src/components/Mascot/Mascot.tsx) is a clean vector (react-native-svg)
with props:

- `expression`: `happy` · `thinking` · `excited` · `worried` · `celebrating`
- `accessory`: `none` · `book` · `pencil` · `wand` · `hat`
- `size`: `small` · `medium` · `large` (or a number)

When `animated`, it idles with a breathing loop and occasional blink, **bounces**
on happy expressions (correct answers), and gives a **gentle tilt/shake** on
worried ones (wrong answers) — supportive, never harsh.

---

## 🎨 Design system

Tokens in [`src/theme`](src/theme): a soft rose brand (`#FF5E9C`) on warm cream,
per-course accents, and success/danger feedback colors. The signature
**`AppButton`** has a chunky bottom lip that sinks on press.

---

## 🛣 What to improve / build next

- **Persist** onboarding + placement (AsyncStorage), and skip setup for returning users.
- Deeper placement: adaptive difficulty, per-skill breakdown, more questions per subject.
- Real **home dashboard** → lessons → boss battles (the next milestones).
- Custom brand font, dark theme, and richer motion (Reanimated: confetti on the result screen, page transitions).
- Backend + auth once the data shapes are stable.

---

Built with Expo, React Native, and TypeScript. 💗
