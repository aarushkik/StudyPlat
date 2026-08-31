# Art manifest — what exists, what is specced, what to make next

One place to see the state of every asset, because the prompts now live across
three files.

| Set | Count | Status | Prompts |
|---|---|---|---|
| Mascot poses | 23 | **Delivered**, in `src/assets/mascot/` | — |
| Track props, wave one | 20 | **Delivered**, in `src/assets/props/` | [sprite-prompts.md](sprite-prompts.md) |
| Track props, wave two | 24 universal + 20 signature | Specced, not generated | [sprite-prompts.md](sprite-prompts.md#wave-two--not-yet-generated) |
| Bosses | 6 | Specced, not generated | [character-sprite-prompts.md](character-sprite-prompts.md#bosses--six-ranks) |
| Companions | 12 | Specced, not generated — props stand in | [character-sprite-prompts.md](character-sprite-prompts.md#companions--twelve) |
| Track backdrops | 10 | Specced, not generated | [background-prompts.md](background-prompts.md) |

## Suggested order

1. **The six bosses.** Biggest gap per sprite: sixty fights currently render as
   a rounded square with a pip in it, and the gate boss card at the foot of
   every track is the largest element on the map with no art in it.
2. **The ten backdrops.** Replaces the procedural shape layer, which is the
   thing that reads as placeholder across every screen of the map.
3. **Props wave two.** Fixes repetition rather than absence — the map already
   looks right, it just repeats itself.
4. **The twelve companions.** Lowest priority: the prop emblems work, and each
   one was picked for the ability it represents.

Every set is safe to deliver partially. The app skips anything absent and never
renders a gap.
