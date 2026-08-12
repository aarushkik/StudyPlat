# Track prop sprites — generation prompts

> **Status: all twenty delivered and in use.** The PNGs live in
> `src/assets/props/`, registered in `PROP_ART` in
> `src/components/home/TrackProps.tsx`. Keep this file as the spec — anything
> added later has to match the style block below or it will not sit with the
> rest of the set.

Twenty props that stand beside the path at full colour, roughly 80pt tall on
screen. Ten are **universal** and appear in every track; ten are **signature**
props, one per landscape kind, so each place owns an object nobody else has.

Save as transparent PNG into `src/assets/props/` using the exact filenames
below. Square, 1024×1024. They get downscaled to 512 on the way in, same as the
mascot set.

---

## Master style block

Paste this **before** every subject line. It is what keeps twenty separately
generated objects looking like one set.

> Flat 2D cartoon game asset, a single object centred on a fully transparent
> background. Bold uniform outline in deep navy `#12303C` at roughly 6% of the
> image width, with rounded corners and rounded line ends. Flat colour fills
> with exactly two extra tones per colour — one soft shade on the lower right,
> one pale highlight on the upper left — and no gradients across the whole
> object. Friendly, chunky, toy-like proportions: slightly oversized top,
> sturdy base. Light source top-left. Warm storybook palette drawn from cream
> `#FFFDF7`, parchment `#FBF1E2`, turquoise `#05B1C9`, orange `#F5A02B`, muted
> sage green, and warm wood brown. Crisp vector edges, no texture, no noise.
> Square 1024×1024; the object fills about 80% of the frame with even margins
> on all sides. Straight-on view at eye level with a very slight three-quarter
> turn. No background, no ground plane, no cast shadow, no text, no watermark,
> no border, no second object.

## Negative prompt

> photorealistic, 3D render, thin outlines, sketchy or uneven linework, drop
> shadow, background scenery, sky, grass, text, letters, numbers, watermark,
> logo, multiple objects, cropped or cut off at the frame edge, white
> background, grey background, checkerboard background, drop shadow under
> object

---

## Universal props — every track

| Filename | Subject line |
|---|---|
| `prop-signpost.png` | A wooden trail signpost: one thick weathered post with two arrow-shaped boards pointing opposite ways, warm brown wood with visible plank seams, a small turquoise pennant tied at the top. |
| `prop-campfire.png` | A small campfire: three crossed logs in warm brown with pale cut ends, a rounded orange-and-yellow flame above them, and three grey stones ringing the base. |
| `prop-tent.png` | A simple ridge tent: cream canvas with a turquoise trim stripe along the hem, a triangular open flap showing a dark interior, two taut guy ropes and small pegs. |
| `prop-chest.png` | A treasure chest with a closed, slightly domed lid: warm brown wood, three orange metal bands, and a round gold clasp at the front. |
| `prop-milestone.png` | A carved stone waymarker: a rounded upright grey slab leaning slightly, a simple engraved turquoise arrow on its face, and a tuft of sage grass at its foot. |
| `prop-lantern.png` | A hanging lantern on a short curved iron post: a six-sided glass lamp glowing warm orange, dark navy metal frame, weighted round base. |
| `prop-bookstack.png` | A stack of four hardback books sitting slightly askew, spines facing out in turquoise, orange, sage and cream, with a thin brass bookmark ribbon trailing from the top one. |
| `prop-bench.png` | A wooden park bench at a slight three-quarter angle: warm brown horizontal slats, dark navy cast-iron legs and armrests. |
| `prop-banner.png` | A tall banner: a slim wooden pole flying a long turquoise pennant that ripples along its length, with a small orange finial ball at the top. |
| `prop-backpack.png` | An adventurer's backpack resting upright on the ground: sage green canvas, orange straps and buckles, a rolled cream bedroll strapped across the top. |

## Signature props — one per landscape

| Filename | Landscape | Subject line |
|---|---|---|
| `prop-lighthouse.png` | waves | A short stout lighthouse: cream tower with two wide red-orange bands, a turquoise glass lamp room at the top, a small dark gallery rail beneath it. |
| `prop-watertower.png` | towers | A city water tower: a rounded turquoise tank standing on four splayed dark navy legs, with a slim ladder running up one side. |
| `prop-forge.png` | chimneys | A small brick forge: warm terracotta brick body, a rounded arched opening glowing orange from within, and one short chimney with a curl of pale smoke. |
| `prop-desertrock.png` | mesa | A desert cluster: one tall sandy-tan rock spire with flat layered bands, and a small round barrel cactus in sage green at its base. |
| `prop-cogpillar.png` | gears | A clockwork pillar: a pale stone column with three interlocking brass cogs mounted on its face — one large, two small — and a little turquoise pressure gauge. |
| `prop-stilthut.png` | islands | A small island hut raised on four wooden stilts: a rounded straw-thatch roof in warm gold, cream walls, a tiny ladder, one turquoise shutter. |
| `prop-cabin.png` | ridge | A log cabin: stacked warm-brown logs, a steep sage-green roof, one small square window glowing warm orange, and a short stone chimney. |
| `prop-duckboard.png` | reeds | A short wooden boardwalk over water: three weathered planks on posts, two tall cattail reeds standing beside it, and one round lily pad. |
| `prop-radiopylon.png` | pylons | A slim lattice radio pylon: dark navy criss-cross steel frame narrowing toward the top, two horizontal crossarms, and a small orange beacon light at the tip. |
| `prop-cairn.png` | peak | A summit cairn: five smooth grey stones stacked largest to smallest and tilting slightly, a small orange triangular flag on a stick wedged into the top, and a cap of snow. |

---

## Notes on getting a usable result

- **Transparency is the one thing to check.** If the generator returns a white
  or checkerboard background rather than real alpha, that is fine — the mascot
  set was cleaned with a flood-fill from the corners, which preserves interior
  cream, and the same pass works here. Colour-keying does not: it eats the
  cream highlights inside the object.
- **Reject anything with a cast shadow.** Props are placed on coloured ground
  that changes per track, and a baked grey shadow will show as a dirty smear on
  every one of them.
- **Reject anything cropped at the frame edge.** Placement assumes the whole
  object is inside the canvas with margin; a clipped sprite reads as a bug.
- **Outline weight is what carries the set.** If one prop comes back with a
  noticeably thinner outline than the others it will look borrowed from another
  game, even when the colours match. Regenerate rather than keep it.
