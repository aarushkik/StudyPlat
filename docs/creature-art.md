# StudyPlat illustrated creatures

Updated 9 September 2026. The boss and companion artwork is now generated raster illustration, replacing the earlier SVG character drawings. The owner's original Stu artwork and app icon are preserved.

## Art direction and provenance

The built-in `image_gen` tool produced the artwork, using the owner's icon as the initial style reference and the finished Mira illustration to keep the set consistent. The direction is painted cartoon adventure art: expressive eyes, navy ink contours, warm shading, tactile texture, and turquoise, ivory and gold accents. Each character has its own pose and equipment.

The shipped art uses warm ivory portrait backgrounds. It does not claim to have transparent alpha. An initial Mira draft with a simulated checkerboard was rejected and corrected through image generation. Boss sheets were revised through image generation to leave clear margins between characters.

All final prompts, layout correction prompts, source output paths, and project asset paths are recorded in [character-art-prompts.json](character-art-prompts.json). Original generated PNG outputs remain at the recorded source paths. Production JPEGs are in `src/assets/characters/`.

## Companions

Twelve separate 768-pixel portraits are bundled under `src/assets/characters/companions/`: Mira the book-carrying moon moth, Ember the fox, Pilot the aviator kingfisher, Quill the hedgehog, Cobalt the arctic fox, Marrow the fossil ram, Tessel the clockwork pangolin, Nix the axolotl, Fen the turtle, Slate the raccoon, Vesper the bat, and Orrin the mountain goat.

`CompanionSprite.tsx` displays these images in the roster, HUD, Profile and quiz ability control. The roster portraits are larger to show the new detail. Existing companion IDs, unlocks, equipped choice and abilities are unchanged.

## Guardians

Ten illustrated atlases under `src/assets/characters/bosses/` each contain six individually designed guardians. These provide sixty illustrations across ten families: tideclaws, archive golems, furnace salamanders, dune scarabs, clockwork owls, coral krakens, fossil rams, lotus frogs, storm moths and summit dragons. Ranks vary in anatomy, expression, pose, materials and costume; they are no longer a base vector drawing with interchangeable equipment.

`BossSprite.tsx` uses native Image rendering and a clipped portrait window. `characterFrames.json` records a separate frame around each illustration. Frames were calculated by reading image bounds and stay entirely within their own atlas cells. Pixel art was not drawn or altered by that calculation. JPEG encoding is the only production format conversion.

The same guardian appears in its map node, gate card, next-fight preview, details, quiz encounter, rematch, result and field-guide entry. All stored stop IDs and boss names remain stable. Courses intentionally share the inhabitants of the same landscape.

## Packaging and behavior

All 22 image assets are statically imported by `characterArt.ts`, work offline, and total approximately 6.2 MB. Boss atlases retain 1536 × 1024 resolution; companion images are sized for mobile use. There is no runtime image-generation service, extra package, or animation loop.

Creatures remain stationary. Existing press feedback and brief answer-seal highlights respect motion preferences. Scoring, authentication and local/cloud save behavior are unchanged by this art replacement.

## Verification

`npm run check` passes all 22 tests. Art checks verify all 22 files are real, distinct JPEG assets with static bundle references; every boss frame remains inside its own cell; and the complete pack stays below 8 MB. Existing tests still cover stable boss IDs across every course, progress, storage and database behavior.

The browser roster and all ten boss family selectors were checked with the new images, including successful image loading and phone-size portrait framing. Native device performance and App Store submission requirements remain in [release readiness](release-readiness.md).
