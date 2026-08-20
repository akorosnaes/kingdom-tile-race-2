# RuneScape Race Board v14

The approved v13 layout has been changed from a 3-row fork to a 2-row fork.

Tile count:
41 main tiles
+ 6 fork tiles (2 choices x 3 tiles)
+ 18 post-merge tiles
= 65 total tiles

Main:
1 -> 2 -> ... -> 41

Fork:
Choice A: 42 -> 43 -> 44
Choice B: 45 -> 46 -> 47

42 and 45 are alternatives. There is no 42 -> 45 connection.

The choices merge after 44 / 47 and continue:
48 -> 49 -> ... -> 65

Numbers remain visible for geometry checking.


v15 visual update:
Tile 41 is now a larger checkpoint tile. It remains centered at exactly
the same board coordinate, so none of the route geometry has changed.
It has a gold border/accent and displays:
41
CHECKPOINT


v17 theme layer:
Switched the board theme to a bright, playful Candy Land-inspired style:
- cheerful pastel background
- colorful candy-like tiles
- white game-board border
- rounded shapes
- brighter white route
- pink checkpoint
- playful decorative accents

Geometry remains exactly the v15 approved geometry.


v18 tile layer:
Normal tiles now cycle through six Candy Land-inspired colors:
RED -> PURPLE -> YELLOW -> BLUE -> ORANGE -> GREEN -> repeat.

The cycle is based on tile number, so tile 1 is red, tile 2 purple,
tile 3 yellow, etc.

Tile 41 remains the special checkpoint and is not part of the normal
color cycle.

Geometry remains locked to the approved v15 layout.


v19 bug fix:
The colored-tile version had a JavaScript error because the tileColors
array was referenced before it was declared. This prevented the entire
tile-rendering loop from running, which is why the paths remained but the
tiles disappeared.

v19 declares tileColors before rendering the tiles. Geometry is unchanged.


v20 path layer:
- Restyled every existing path as a candy-cane road.
- White rounded base with repeating red stripe accents.
- Fork and merge paths use the same treatment.
- No path coordinates, tile positions, route order, or geometry were changed.


v21 tile sizing:
- Normal tiles are now 124px x 124px squares instead of 108px x 76px rectangles.
- Numbers are slightly larger.
- Tile center coordinates are unchanged.
- Route lines and all board geometry are unchanged.
- Tile 41 remains the existing larger checkpoint tile.


v22 checkpoint sizing:
- Tile 41 checkpoint increased to 158px x 158px.
- It remains centered at the exact same coordinate.
- Checkpoint label and number remain intact.
- Normal tiles remain 124px x 124px.
- Geometry and route connections are unchanged.


v23 Layer 3 — Tile contents:
- Added a 30x30 image area to every normal tile.
- Added TILE_CONFIG at the top of app.js with an explicit image path
  for every tile: images/tile1.png through images/tile65.png.
- Added an editable "info" field for every tile.
- Added smooth hover animation.
- Added animated hover tooltip showing the tile's full information.
- Missing images are hidden automatically so the board does not show
  broken-image icons while images are being added.
- Tile 41 remains the special checkpoint.
- Geometry and route connections remain unchanged.


v24 tooltip fix:
- Tiles 1-7 are on the top row.
- Their hover information cards now open DOWNWARD instead of upward,
  preventing them from being clipped by the board edge.
- Tooltip animation remains smooth and uses the same visual style.
- No geometry was changed.


v25 Layer 4 — Path polish:
- Kept every existing path coordinate and connection unchanged.
- Added a soft shadow underneath the paths for depth.
- Refined the white candy road surface.
- Refined the repeating pink/red candy-cane stripes.
- Made fork and merge paths use exactly the same treatment.
- Added subtle highlight/depth treatment for a physical board-game feel.


v26 Layer 4 — Cute candy paths:
- Reworked the path rendering substantially rather than making tiny tweaks.
- Added a visible raised shadow beneath every path.
- Increased the white candy road thickness.
- Added much broader pink/red candy-cane bands.
- Added a glossy white highlight.
- Fork and merge use the exact same treatment as the main route.
- All existing route points and connections remain unchanged.


v27 Layer 4 touch-up:
- Reworked the candy path to be cleaner and less "candy-cane".
- Reduced the pink accent from broad bands to a restrained repeating accent.
- Kept a simple, rounded white road as the dominant path.
- Fork and merge now visually read as one clean continuous road rather than
  a brush-stroke effect.
- Added subtle depth and gloss without making the route visually busy.
- No route coordinates, tile positions, or geometry changed.


v30 fork/merge line fix:
- Rebuilt the fork rendering from the stable v27 version.
- Preserved the dotted pink candy accent.
- Removed the overlapping duplicate segment from tile 47 to the merge point
  and tile 48.
- The 47 -> 48 section is now drawn exactly once.
- The upper 44 branch reaches the merge separately and drops into the common
  route only once.
- Tile rendering and Layer 3 code are unchanged from v27.
- No tile positions or approved board geometry were changed.


v35 — fork actually fixed:
- Started from the stable v30 tile/tooltip implementation.
- Removed the duplicate upper-branch merge stroke that was causing
  the visible double line.
- Main route 1->41 is now one continuous SVG polyline.
- Upper route is one continuous polyline: 41/fork -> 42 -> 43 -> 44 -> merge.
- Lower route is one continuous polyline: fork -> 45 -> 46 -> 47 -> merge -> 48 -> 65.
- The duplicate 44->merge stroke is completely gone.
- Route shadows/highlights are disabled for these two continuous fork routes,
  leaving a clean white road with the dotted pink accent.
- Tile rendering, tile images, hover tooltips, colors, checkpoint, and all
  approved tile coordinates are preserved.


v36 fork junction cleanup:
- Preserved the exact v35 route geometry and tile coordinates.
- Removed route shadow/highlight layers from the fork/merge routes.
- Added a tiny visual join at the exact existing fork and merge points so
  the two branches meet as one clean Y-shaped road instead of showing
  stacked line caps.
- Dotted pink candy accents remain.


v37 fork layering:
- The geometry is unchanged.
- The route is intentionally rendered as four visible sections:
  pre-fork, lower branch, upper branch, and post-merge.
- At the fork, the lower/new branch is rendered first and the upper/old
  branch is rendered second, so the old line sits cleanly on top.
- At the merge, the upper/old branch is rendered first and the
  post-merge/new route is rendered last, so the new line sits cleanly
  on top.
- Removed the extra junction circles from the route rendering.
- Disabled route shadows/highlights so only the actual road layers
  participate in the overlap.
- Dotted pink candy accent remains.
- No tile positions or approved geometry changed.


v38 junction architecture:
- Rebuilt the fork/merge as exactly TWO continuous road polylines.
- Route A is continuous through the fork and ends at the merge.
- Route B is continuous through the merge and begins at the fork.
- The branch endpoint caps are butt caps, preventing rounded ends from
  overlapping the continuous road.
- Dotted pink accents are retained.
- Shadows/highlights are disabled on the two route strokes so the junction
  cannot acquire a second visual layer.
- No tile positions or approved route coordinates changed.


v39 candy path restoration:
- Restored the cute Candy Land dotted pink path treatment.
- Restored subtle path depth and a glossy highlight.
- Kept the V38 clean continuous two-route junction architecture.
- Road endpoints at the fork/merge remain flat to prevent cap overlap.
- Candy dots remain rounded for the intended candy aesthetic.
- No geometry, coordinates, tile positions, or route connections changed.


v41:
- Rebuilt the tile presentation overrides at the absolute end of styles.css.
- Normal tiles are now 84x84px at 100% board scale.
- Numbers are explicitly positioned top-left with !important.
- Images are explicitly centered with !important.
- Checkpoint 41 is 96x96px, with CHECKPOINT at the top, number top-left,
  and item image centered.
- No board geometry or tile center coordinates were modified.


v42 — Sparkle atmosphere:
- Added a subtle animated sparkle field behind the board.
- Added a soft cursor-following glow behind the board.
- Sparkles are decorative and do not interfere with tile interaction.
- Cursor effect uses smooth interpolation rather than snapping.
- Respects prefers-reduced-motion.
- No board geometry, tile coordinates, path geometry, or tile styling changed.


v43: Moved sparkles and cursor glow inside the board so the effects are visible behind the paths and tiles; added a more visible sparkle field and smooth board-relative cursor glow. Geometry unchanged.


v44 — Candy Land atmosphere redesign:
- Replaced simple sparkle dots with animated four-point candy stars.
- Added varied sparkle rotation, scale, glow, and twinkle.
- Redesigned cursor aura with layered pastel rings.
- Added a subtle rotating dotted halo and center sparkle to the cursor glow.
- Added a custom Candy Land-style pink/white cursor with a tiny candy accent.
- All effects remain decorative and do not alter board geometry, tile positions,
  route geometry, or tile functionality.


v45 — Cursor aura refinement:
- Kept the custom Candy Land cursor unchanged.
- Removed the rigid dotted halo and center sparkle that made the cursor
  feel like it had a circle attached to it.
- Replaced the aura with a larger, softer pastel glow/cloud.
- Increased blur and softened the edges substantially.
- Slowed cursor-follow interpolation so the glow gently floats behind
  the pointer instead of feeling stiff.
- No board geometry or tile behavior changed.


V51 — TRUE CURVED ROW CONNECTIONS

Based directly on V45.

The road is rebuilt using actual SVG cubic curves at each row transition.
The tile positions remain unchanged.

The visible intended structure is:
1-7 -> rounded turn -> 8-14
14 -> rounded turn -> 15-21
21 -> rounded turn -> 22-28
28 -> rounded turn -> 29-35
35 -> rounded turn -> 36-41

The 41-to-fork approach is shortened and brought closer to the checkpoint.
The two fork branches then merge before 48.

This is a geometry change, not a decorative post-processing effect.


V52 — CHECKPOINT / FORK FIX

Based directly on V51.

Fixes:
1. Tile 41 is now the true endpoint of the main 1-41 road.
2. The fork approach leaves directly from 41 instead of travelling
   backward across tiles 40-37.
3. The candy-cane rail along 36-41 is therefore a single clean route
   with no overlapping return stroke.
4. Fork tiles 42-47 and the merge remain unchanged.

V53 — SHORTER CHECKPOINT-TO-FORK APPROACH

Based directly on V52. The fork junction has been pulled significantly
closer to checkpoint 41. The branch curves were adjusted to meet the
new junction cleanly. The 36-41 row remains untouched.


V54 — SHORTER FORK CONNECTORS

Based directly on V53.

Targeted geometry changes only:
- Pulled the fork junction closer to tile 41.
- Shortened the approach from 41 to the fork.
- Pulled the merge closer to tile 48.
- Tightened the curves from tiles 44/47 into the merge.
- Kept the numbered tile positions and the rest of the board unchanged.


V55 — SHORTER FORK LINES

The fork junction is pulled closer to tile 41, shortening the line after 41. The curves from the fork into 42/45 are tightened. The merge is pulled closer to 44/47, shortening the lines after the fork before 48.


V56 — COMPACT CHECKPOINT / FORK

This version addresses the actual source of the long distance: the
42-47 tile positions themselves were too far from checkpoint 41.

Changes:
- 42-44 and 45-47 are moved much closer to 41.
- The fork junction is placed immediately before those tiles.
- 41 -> fork is a short curved connection.
- 44/47 -> merge is also compact.
- 48 is moved closer to the merge so there is no new long empty runway.

The main 1-41 route remains unchanged.


V57 — COMPACT FINISH SECTION

Based directly on V56.

The entire 49-65 section is shifted left as a single unit. Its internal
shape and spacing are preserved, but the large empty gap between 48
and 49 is removed.

Tile 48 is nudged slightly left and the merge point is aligned with it.
The checkpoint/fork section and main 1-41 route are unchanged.


V58 — FINISH SECTION SHIFT RIGHT

Based directly on V57.

The entire 49-65 section was shifted 300px to the right as a single
unit to eliminate the overlap created by V57. Internal spacing and
shape remain unchanged. The merge point was shifted with it.


V59 — TILE 48 ALIGNED WITH 49

Based directly on V58.

Tile 48 was moved from [1180,1340] to [1460,1380], placing it directly
beside tile 49 at [1640,1380]. This removes the awkward diagonal/
zig-zag transition between the fork merge and the 49-65 finish run.

The 49-65 section itself was not moved.


V60 — FORK TILE POSITION ADJUSTMENT

Based directly on V59.

Tiles 42-47 were shifted together:
- 70px left
- 70px down

Their spacing relative to one another is unchanged.

The fork junction was shifted by the same amount so the branch
connections remain aligned. No other tiles or the main 1-41 route
were changed.


V61 — FORK CONNECTION ALIGNMENT

Based directly on V60.

1. The connector leaving tile 41 starts slightly lower.
2. The lower fork curve enters tile 45 at the left-middle of the tile.
3. The upper fork curve leaves tile 44 from the middle of the tile.

No tile positions, numbering, colors, or main-board geometry were changed.


V62 — TILE 45 LEFT-MIDDLE CONNECTION

Based directly on V61.

The lower fork connector now terminates at the actual left edge of tile
45 (62px left of its center) and exactly at its vertical midpoint.
The final curve control is horizontally aligned with that endpoint so
the road enters tile 45 cleanly through its left-middle rather than its
top-left corner.

No tile positions or other fork geometry were changed.


V63 — TILE 44/47 RIGHT-MIDDLE EXITS

Based directly on V62.

Tiles 44 and 47 now both exit through the exact middle of their right
edges. The curve begins after clearing the tile, preventing the road
from appearing to leave from the upper or lower corner.

Tile positions and all other geometry remain unchanged.


V64 — TILE 41 BOTTOM-MIDDLE EXIT

Based directly on V63.

Tile 41 now exits from its bottom-middle. The road goes straight down
for a short distance first, then curves right into the fork.

No tile positions or other fork connections were changed.


V65 — EARLIER 44/47 CURVES

Based directly on V64.

The outgoing curves from tiles 44 and 47 now begin sooner. Their first
control points remain at the exact middle-right exits, while the second
control points are pulled inward so the branches start turning toward
48 earlier.

Tile positions and the rest of the board remain unchanged.


V66 — UNIFORM FORK EXIT GEOMETRY

Based directly on V65.

The exit from 44 and 47 now uses the same structural logic as the
entrance into 42 and 45:
- leave the tile from the middle-right,
- travel straight for a short distance,
- then begin the curve toward the merge.

This makes the two ends of the fork visually uniform.


V67 — UNIFORM FORK MERGE POSITION

Based directly on V66.

The common merge point was pulled back from x=1380 to x=1180 so the
curves from 44/47 begin merging at a position that mirrors the spacing
used by the fork entrance around 42/45.

The tile positions themselves remain unchanged.


V68 — CURVED ROW TRANSITIONS

Based directly on V67.

The row transitions now use the same visual construction as the fork:
short straight tangent followed by a rounded curve.

Target transition areas:
7 -> 8
14 -> 15
21 -> 22
28 -> 29
35 -> 36
53 -> 54
59 -> 60

Fork/checkpoint geometry is not intentionally changed.


V69 — FINISH ROW-TURN GEOMETRY

Based directly on V68.

The finish section now uses the actual same U-turn construction as the
main board:
- 53 -> 54 curves around the RIGHT side.
- 59 -> 60 curves around the LEFT side.

The ineffective V68 post-processing code was removed. The actual
finishD route is now built with explicit cubic curves, so the geometry
is deterministic and matches the main-row logic.

No tile positions were changed.


V70 — CANDY LABELS

Based directly on V69.

Added editable board labels:
- START beside tile 1.
- PATH A above tiles 42-44.
- PATH B below tiles 45-47.
- FINISH beside tile 65.

Labels use a pink/red candy-style gradient, thick white outline, soft
shadow, and candy-striped decorative accents. Label text is editable
in index.html in the BOARD LABELS section. Board/track/tile geometry
is unchanged.


V71 — CENTERED BOARD

Based directly on V70.

The board is now centered horizontally in the site instead of being
anchored to the browser's left edge. The internal board coordinate
system, tile positions, rails, fork, and labels are unchanged.


V72 — TRUE BOARD CENTERING

Based directly on V71.

V71 targeted wrapper classes that do not exist in this build. The actual
board is <main class="board">, so V72 centers that element itself.

The complete 3600x1800 composition — SVG road, tiles, fork, checkpoint,
and labels — now shares one centered coordinate system. No board
geometry or tile coordinates were changed.


V73 — EXPLICIT VIEWPORT CENTERING

The actual <main class="board"> is now inside a full-width
.board-center-shell flex container. This makes the entire board a
single centered object in the viewport instead of relying on auto
margins against the board's own minimum-width behavior.

No tile, road, fork, or internal board coordinates were changed.


V74 — FORCE VISUAL BOARD CENTERING

The previous centering methods affected the layout container but not
the actual visual position of the fixed-width board.

V74 explicitly places the board's left edge at 50% of the viewport and
translates it back by 50% of its own width. This centers the entire
visual composition regardless of document scroll width or the board's
1800px minimum width.

Internal board geometry is unchanged.


V75 — JAVASCRIPT BOARD CENTERING

The previous CSS-only centering attempts were ineffective in the
browser layout. V75 measures the actual rendered width of <main.board>
after layout and explicitly sets its left position to:

(viewport width - rendered board width) / 2

The board's internal geometry is untouched.


V76 — CLEAN BOARD LAYOUT / ROOT CAUSE FIX

The centering issue was finally traced to the original board CSS:

  width: min(3600px, calc(100vw - 40px));
  min-width: 1800px;
  margin: 0 auto;

When the viewport is narrower than 1800px, the board is wider than its
containing block. margin:auto cannot center an oversized element inside
that block; it produces horizontal overflow and leaves the board at
the scroll origin.

V76 removes the contradictory 1800px minimum and lets the complete
2:1 board scale to the viewport. All internal SVG geometry remains in
the existing 3600x1800 viewBox, so the tiles/road/fork geometry itself
is unchanged.

All previous V71-V75 centering patches were removed rather than
stacked on top of one another.


V77 — REAL 1920x1080 BOARD CANVAS

Full code analysis found the actual cause of the centering problem.

The SVG was 3600x1800, but the actual route/tile coordinates occupied
only about x=180..2360. In other words, roughly the right third of the
SVG was empty. Centering the 3600px SVG therefore centered a huge empty
area, leaving tile 1 visually near the left side.

V77 fixes the root cause instead of adding another positioning patch:

- The actual SVG viewBox is now 1920x1080.
- Existing 3600x1800 path geometry is preserved internally.
- A single SVG <g> maps that logical geometry into the new 1920x1080
  canvas and centers the USED board content.
- HTML tile positions use the same mapping, so tiles and SVG roads
  remain perfectly aligned.
- The board itself is a true 16:9 composition and is centered normally.
- Previous V71-V76 positioning hacks are superseded by this clean
  coordinate-system solution.

No individual road/tile geometry was redesigned.


V78 — REFINED TEXT POSITIONS

Based directly on V77.

START:
- Removed the arrow completely.
- Positioned directly beside tile 1.
- Same 84px visual height as the tile.
- Vertically centered with tile 1.

FINISH:
- Removed the arrow completely.
- Positioned directly beside tile 65.
- Same 84px visual height as the tile.
- Vertically centered with tile 65.

PATH A:
- Smaller text.
- Label width matches the visual three-tile span of 42-43-44.

PATH B:
- Smaller text.
- Label width matches the visual three-tile span of 45-46-47.

No board, tile, road, fork, or SVG geometry was changed.


V79 — LABEL POSITIONS CORRECTED FROM USER SCREENSHOT

The V78 label positions were wrong because PATH A/B used percentages
greater than 100% of the 1920x1080 board, placing them outside the board.

V79 uses the actual mapped tile coordinates from app.js:

START:
- immediately left of tile 1
- exactly 84px tall, matching the tile

FINISH:
- immediately left of tile 65, matching the supplied screenshot
- exactly 84px tall, matching the tile

PATH A:
- centered over tiles 42-43-44
- 276px wide, matching the three 84px tiles plus their two 12px gaps

PATH B:
- centered under tiles 45-46-47
- same 276px width

No road, SVG, tile, fork, or coordinate geometry was changed.


V80 — LABELS LOCKED TO BOARD

The label layer is now explicitly board-relative.

START and FINISH:
- Vertical orientation, matching the requested reference.
- Anchored immediately beside their respective tiles.
- Their positions and dimensions are percentages of the 1920x1080
  board, not fixed viewport pixels.

PATH A/B:
- Smaller.
- Board-relative.
- Their widths are tied to the three-tile branch span.

A ResizeObserver reapplies the board-relative boxes whenever the board
changes size, so changing browser resolution cannot cause the labels to
drift away from the board.

No road/tile/fork geometry was changed.


V81 — LABEL POSITION ADJUSTMENTS

Based directly on the V80 screenshot feedback.

- START moved substantially closer to tile 1 and remains vertical.
- FINISH moved from the tile-64 area to immediately to the RIGHT of
  tile 65 and remains vertical.
- PATH A moved down slightly.
- PATH B unchanged.
- CSS and ResizeObserver use the same values so resizing cannot undo
  these corrections.


V82 — LABEL MICRO-ADJUSTMENTS

- START: exact same vertical height and vertical alignment as tile 1;
  moved slightly farther left to create a small, intentional gap.
- FINISH: kept to the right of tile 65, but moved slightly closer.
- PATH A: moved slightly upward so it has more breathing room from tile 43.
- ResizeObserver values updated to match the CSS values.


V84 — FINISH CLOSER

START is unchanged from V83 because its position was confirmed correct.

FINISH was moved slightly closer to tile 65 while remaining to its
right and vertically aligned. The ResizeObserver value was updated
with the same measurement.


V85 — LEGIBLE LABEL TYPOGRAPHY

Based directly on V84.

All board labels now use a darker candy-pink fill, a much thinner
warm-white outline, stronger subtle shadow, and a cleaner rounded
sans-serif font stack. This reduces the washed-out/white appearance
while keeping the candy aesthetic.

All label positions remain exactly as V84.


V86 — VERTICAL START/FINISH + LARGER PATH LABELS

Based directly on V85.

- START is vertical again.
- FINISH is vertical again.
- Their positions are unchanged.
- PATH A and PATH B are slightly larger for readability.
- The V85 darker candy-pink typography remains.


V88 — RESTORED TILE CONTENT STYLES

V87 introduced the fixed-size override but accidentally omitted the
existing tile-content CSS rules. That caused:
- tooltip text to render permanently over every tile
- tile images/numbers to lose their intended positioning
- checkpoint text to render incorrectly

V88 is rebuilt from the known-good V86 stylesheet and adds only the
fixed 84x84 regular tile / 158x158 checkpoint dimensions.

The road, fork, labels, and board geometry are unchanged.


V89 — CHECKPOINT SIZE RESTORED

Based on V88, which restored the correct tile/tooltip styling.

Tile 41 is now the same 84x84 physical footprint as the regular tiles.
Its checkpoint-specific visual styling/content is preserved; only the
oversized 158x158 dimensions from V87 are removed.

No board geometry, labels, road, or fork was changed.


V90 — CHECKPOINT PREVIOUS SIZE

Tile 41 is restored to an intentionally larger checkpoint footprint,
while regular tiles remain locked at 84x84px.

The oversized 158x158px V87 checkpoint is removed. V90 uses a
108x108px checkpoint so it is visibly larger than the normal tiles
without covering the surrounding road.

No board geometry, labels, or tooltip styling was changed.


V91 — MORE VISIBLE CANDY-CANE ROAD SPACING

The user asked specifically to increase the visible road length between
the tiles on the main 1–41 section and the finish 48–65 section.

Changes:
- Horizontal center-to-center spacing increased from 180px to 210px
  for tiles 1–41.
- Horizontal center-to-center spacing increased from 180px to 210px
  for tiles 48–65.
- Tile 41 and the entire 41–48 fork geometry were left unchanged.
- Row Y positions were left unchanged, so the vertical layout does not
  drift.
- Main and finish U-turn curve reach was increased slightly to match
  the wider rows.
- Tile sizes, labels, colors, checkpoint styling, and fork geometry
  were not changed.


V93 — LOWER SECTION SHIFTED DOWN

Based on V91.

- Tiles 42–65 shifted down by 70 logical pixels.
- This gives tile 60 more separation from the 35/36 area.
- The 41 -> fork approach was lengthened slightly to bridge the
  additional vertical space cleanly.
- Main-road tiles 1–41 remain unchanged.
- Tile spacing remains at the V91 210px setting.
- No tile sizing, labels, colors, or tooltip styling changed.


V94 — TILE 42 MIDDLE-LEFT ENTRY

The road entering tile 42 now terminates at the middle-left edge of
tile 42 instead of approaching the top edge.

Tile 45's existing entry was left unchanged.
No tile positions, spacing, fork positions, or styling were changed.


V95 — TILE 42 LEFT-MIDDLE ENTRY CLEANUP

Tile 42 now uses the exact same entry logic as tile 45:
- final endpoint is 62 logical pixels left of the tile center
- endpoint is exactly on the tile's vertical centerline
- the final curve control point is horizontally aligned with the tile

This prevents the road from visually entering the top of tile 42.
Tile 45 was not changed.


V96 — FORK RE-CENTERED

The fork junction was moved down 70 logical pixels so it sits more
centrally between the 42 and 45 rows instead of pulling too high toward
tile 42.

Tile positions are unchanged. Tile 42's middle-left entry from V95 is
preserved, as is tile 45's entry.


V97 — SEAMLESS FORK REWORK

The fork was reworked as one true junction.

Both branch paths now start at the exact same forkJunction and
immediately diverge:
- Upper branch curves to the middle-left of tile 42.
- Lower branch curves to the middle-left of tile 45.
- Neither branch runs underneath the other before separating.
- Both branches retain their existing 42-44 / 45-47 tile sequences.
- 44 and 47 still exit from their middle-right sides.

No tile positions or board styling were changed.


V98 — PATH A/B + FINISH LABEL CORRECTION

- START retained at its confirmed V83/V86 position.
- PATH A centered over the 42-44 branch and moved slightly upward
  to avoid crowding tile 43.
- PATH B centered under the 45-47 branch.
- FINISH remains vertical and directly to the right of tile 65.
- All label coordinates are board-relative and synchronized with the
  ResizeObserver.
- No road, tile, fork, or spacing geometry changed.


V99 — LABEL SYSTEM CLEANUP

All four labels now share one authoritative font/weight/fill/shadow
system.

- PATH A moved directly above 42-43-44.
- PATH B moved directly below 45-46-47.
- FINISH moved to the right of 65 with a small gap.
- FINISH has the same typography as START.
- Removed the legacy white stroke entirely.
- START remains at its confirmed position.
- ResizeObserver values are synchronized with the CSS.


V100 — PATH A / FINISH POSITION

- PATH A moved down slightly.
- FINISH moved farther right so its label box is clearly outside
  tile 65 rather than overlapping it.
- Both changes are synchronized between CSS and ResizeObserver.
- No other board geometry or label styling changed.


V101 — FINISH POSITION CALCULATED FROM TILE 65

The previous finish position was based on an incorrect assumed tile-65
coordinate. The actual V100 position is x=2510 logical, which maps to
x=1594.67px on the 1920px board. With an 84px tile, the right edge is
approximately 85.24% of the board.

FINISH is now anchored at 85.7%, giving it a small gap immediately to
the right of tile 65.

PATH A moved down from 69.2% to 69.6% — only a few pixels visually.


V102 — FINISH DIRECTLY NEXT TO TILE 65

Adjusted from the actual V101 screenshot rather than estimating from
the logical tile coordinate alone.

- FINISH moved left so it sits immediately beside tile 65.
- FINISH moved down so its vertical center aligns with tile 65.
- No changes to tile positions, road geometry, fork geometry, START,
  PATH A, or PATH B.


V103 — FINISH FLUSH WITH TILE 65

Based on V102.

- FINISH stays horizontally next to tile 65.
- FINISH moved down slightly to align vertically with tile 65.
- The horizontal gap remains unchanged.
- No other labels, tiles, road, fork, or styling changed.


V104 — FINISH SPACING

Based on V103.

- FINISH moved slightly down.
- FINISH moved slightly farther right from tile 65.
- No other positioning or board geometry changed.


V105 — INFO BOXES ALWAYS ON TOP

Info/tooltip boxes now use a dedicated high stacking layer (z-index
9999) and their containing tiles are raised above the board labels.
This ensures tile information boxes appear above START, FINISH, PATH A,
PATH B, the road, and neighboring tiles when opened.

No tile positions, spacing, road geometry, or label positions changed.


V106 — TRUE TOP-LAYER INFO BOXES

Reworked the tooltip architecture rather than trying another z-index
patch.

Info boxes are now removed from individual tile stacking contexts and
mounted directly on document.body. They are positioned over the hovered
tile using its screen coordinates.

This means the info boxes are genuinely above the entire board:
- START / FINISH
- PATH A / PATH B
- every tile
- SVG road
- decorative layers
- all transformed/stacked parent elements

Tooltip hover behavior is preserved, and the tooltip follows the tile
on resize/scroll.


V107 — LOGO AREA + CUSTOM CURSOR REMOVED

- Removed the custom cursor/glow behavior.
- Added a board-relative logo slot on the right side.
- Logo source is images/banner.png.
- Logo uses object-fit: contain so the full image remains visible.
- The logo slot stays attached to the board at different resolutions.


V108 — LARGER LOGO AREA

Based on V107.

The logo area was expanded to better accommodate the user's 750x500
banner.png canvas and match the desired placement shown in the
reference screenshot.

- Logo area: 28% of board width.
- Logo area: 31% of board height.
- Positioned at 65% from the left and 7.5% from the top.
- banner.png continues to use object-fit: contain, so the complete
  750x500 image remains visible without cropping.
- Custom cursor remains removed.


V109 — FIXED 1920x1080 BOARD + SCROLLING

The board no longer scales down/up with the browser viewport.

- Board is permanently 1920x1080.
- Tile dimensions and road geometry therefore remain identical at every
  browser/window size.
- Large windows center the complete board.
- Smaller windows show normal horizontal/vertical browser scrollbars.
- No board elements are compressed, stretched, or warped to fit.
- Logo, labels, tooltip top-layer behavior, fork, and tile positions are
  unchanged.


V110 — HORIZONTAL SCROLL FIX

V109's fixed 1920x1080 rule was being overridden by an older responsive
CSS block later in styles.css. That legacy rule was shrinking the board
back to viewport width, which caused the tiles to compress/overlap.

V110:
- Removes the conflicting responsive width rule.
- Adds an authoritative final 1920x1080 board rule with !important.
- Keeps the board at native size at every viewport width.
- Adds horizontal scrolling when the viewport is narrower than 1920px.
- Keeps vertical scrolling for the 1080px board height.
- On large screens the board remains centered.
- On small screens the board starts 20px from the left so its entire
  1920px canvas is reachable by horizontal scrolling.


V111 — GOOGLE SHEET + TEAM GAME PIECES

Google Sheet integration is now built in.

CONFIGURATION:
At the very top of app.js:
  const GOOGLE_SHEET_CSV_URL = "";

Paste the published Google Sheet CSV URL there.

EXPECTED SHEET:
  Teams       | Tile #
  Red Team    | 1
  Green Team  | 1

The sheet is checked every 5 seconds.

For each update:
- Red Team's Tile # moves red_piece.png to that tile.
- Green Team's Tile # moves green_piece.png to that tile.
- The status panel below the banner updates to:
    Red Team - Tile X
    Green Team - Tile X

The pieces use the exact same board coordinate system as the tiles,
so they remain aligned at every board size/resolution.

IMAGE FILES REQUIRED:
  images/banner.png
  images/red_piece.png
  images/green_piece.png

The Google Sheet must be published so the browser can fetch its CSV
data. If the sheet is not published or CORS prevents access, the
board simply keeps its last known/default positions and logs the
fetch error in the browser console.


V112 — GOOGLE SHEETS GVIZ CSV

Switched the live team-position feed from the "Publish to web" CSV
endpoint to Google's native Visualization (gviz) CSV response.

The code now uses:

  https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/gviz/tq
      ?tqx=out:csv&gid=SHEET_GID

This means there is no separate published-CSV URL to maintain.

CONFIGURATION:
  GOOGLE_SHEET_ID = "1iu7SmBaoaXk8K1mpEhK4ctuhEb8Pljd4Q0KDWveuDlU";
  GOOGLE_SHEET_GID = "0";

If the Teams/Tile # data is on the first worksheet tab, leave GID as 0.
If it is on another tab, replace 0 with that tab's numeric gid.

The page checks the live gviz response every 5 seconds and appends a
cache-busting timestamp so the browser does not reuse its previous
response.

The spreadsheet still needs to be accessible to the account/browser
running the board. It does NOT require using the "Publish to web" CSV
feature.

Expected data:
  Teams       | Tile #
  Red Team    | 1
  Green Team  | 1


V113 — GVIZ JSONP / CORS-SAFE SHEET READER

The V112 implementation used fetch() against the Google gviz endpoint.
Even with "Anyone with the link" sharing, browser cross-origin rules can
prevent that request from being read by the board.

V113 changes the read path to Google's Visualization JSONP response:
  tqx=responseHandler:CALLBACK

The response is loaded as a temporary script and Google calls the
generated callback with the live DataTable response.

The board now:
- Reads columns A:B directly.
- Treats A as Teams and B as Tile #.
- Accepts Red Team / Green Team.
- Updates the pieces immediately after the first successful response.
- Polls every 5 seconds.
- Keeps the last successful positions if a request fails.
- Logs a clear success/failure message in the browser console.
- Times out an individual request after 4.5 seconds.

No Publish to Web CSV is required.


V114 — GVIZ CONNECTION CLEANUP

V113 had a malformed replacement that left part of the old V112 fetch()
function in app.js, causing:
  Uncaught SyntaxError: Illegal return statement

V114 removes that stale block completely and leaves one clean gviz
JSONP implementation.

The board now:
- Loads all tile code normally again.
- Uses the user's live Google Sheet.
- Reads A = Teams and B = Tile #.
- Uses the spreadsheet ID and gid 0 already configured.
- Polls every 5 seconds.
- Logs a successful sheet update with both team positions.
- Keeps the last known position on failures.

The sheet layout shown by the user is correct:
  Teams       | Tile #
  Red Team    | 1
  Green Team  | 2


V115 — TEAM NAME PARSER FIX

V114 successfully reached the Google gviz response, but its cleanup
accidentally removed normalizeTeamName(). This caused:

  ReferenceError: normalizeTeamName is not defined

V115 restores the parser. No Google Sheet format changes are required.

The existing sheet:
  Teams       | Tile #
  Red Team    | 1
  Green Team  | 2

will now be parsed into the two team positions and update the pieces
and status labels.


V116 — GAME PIECES 50PX

Reduced both game pieces from 68x68px to 50x50px.

The pieces remain centered on their current tile and retain the existing
movement animation, shadows, and Google Sheet positioning logic.
No tile, road, label, or sheet behavior was changed.


V117 — TEAM TILE GLOW

Replaced game-piece overlays with red/green glowing active tiles.
The tile remains fully visible. The active tile gently breathes via a
2.2-second animation. Game-piece movement/animation has been removed.
Google Sheet team position polling and status text remain unchanged.


V118 — TEAM TILE GLOW POSITION FIX

The Google Sheet position reader was working, but the glow lookup was
using data-id. The actual tile elements use data-tile.

V118 changes the glow lookup to:
  .tile[data-tile="X"]

So when the sheet reports:
  Red Team = 1
  Green Team = 2

the actual tile elements for 1 and 2 receive the corresponding glow
classes.

No sheet, tile, road, label, or glow styling was changed.


V119 — FULL TILE BREATHING

The selected tile now breathes as a complete visual object.

- The entire tile gently scales from 100% to 104.5% and back.
- Brightness increases slightly at the peak.
- The colored glow simultaneously expands and contracts.
- Red and green have independent matching animations.
- The tile remains centered on its existing board position.
- The animation is 2 seconds, smooth ease-in-out, and loops continuously.
- No game-piece images or movement animation are used.


V120 — BREATHING TILE CENTER FIX

V119's animation replaced the tile's existing
  transform: translate(-50%, -50%)
with only
  transform: scale(...)

That removed the centering transform and caused selected tiles to shift
down/right off the road.

V120 preserves translate(-50%, -50%) inside every breathing keyframe,
then applies the scale afterward. The tile now breathes around its exact
original center point.


V121 — DUAL TEAM TILE RIM

Added a same-tile check.

If Red Team and Green Team have the same Tile # in the Google Sheet:
- The tile receives a dedicated dual-team state.
- Two distinct colored rims are displayed: red + green.
- The dual rim breathes with the tile.
- The tile remains centered using translate(-50%, -50%).
- When the teams separate, the normal individual red/green glow states
  return automatically.


V122 — TEAM GLOW STATE CLEANUP

Fixed two issues:

1. Dual-team tiles no longer keep the normal white tile border.
   The white border is now transparent and only the red/green rims are
   visible.

2. Team glow states are fully cleared before applying the latest Google
   Sheet positions, including the team-dual-glow class. Inactive tiles
   explicitly stop their breathing animation and filters.

This means tile 1 will stop glowing/breathing immediately after a team
moves to another tile on the next successful 5-second sheet update.


V123 — DUAL RIM VISIBILITY FIX

The V122 cleanup accidentally added:
  .tile.team-dual-glow { box-shadow: none !important; }

That overrode the dual animation's box-shadow, leaving only the
breathing/brightness effect and no visible red/green rim.

V123 removes that override and gives the dual state an explicit,
high-visibility two-rim treatment:
- red inner rim
- green outer rim
- both with external glow
- both breathe with the tile
- no white border


V124 — TEAM-COLOR BORDERS + OUTER DUAL RIMS

Single-team tiles:
- Red Team changes the tile border itself to red.
- Green Team changes the tile border itself to green.
- The existing tile remains fully visible.
- The existing breathing/glow effect remains.

Dual-team tiles:
- Both team colors are rendered as OUTER rims around the tile.
- Red is the inner outer-rim and green is the outer rim, with both
  separated from the tile and each other.
- The rims breathe together with the tile.
- No white border remains while the tile is team-owned.
