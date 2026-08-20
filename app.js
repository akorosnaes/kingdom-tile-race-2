
/* ============================================================
   V111 — GOOGLE SHEET CONFIGURATION
   ============================================================ */

/*
 * Publish your Google Sheet to the web as CSV, then paste the CSV
 * URL here.
 *
 * Example:
 * https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=0
 *
 * Sheet format:
 *
 * Teams       | Tile #
 * Red Team    | 1
 * Green Team  | 1
 *
 * The code also accepts "Red" / "Green" as team names.
 */
/*
 * Google Sheets gviz configuration.
 *
 * Spreadsheet:
 * 1iu7SmBaoaXk8K1mpEhK4ctuhEb8Pljd4Q0KDWveuDlU
 *
 * GID 0 means the first worksheet/tab. If your Teams/Tile # data is
 * on another tab, change GOOGLE_SHEET_GID to that tab's gid.
 */
const GOOGLE_SHEET_ID = "1iu7SmBaoaXk8K1mpEhK4ctuhEb8Pljd4Q0KDWveuDlU";
const GOOGLE_SHEET_GID = "0";

// How often to check the sheet for changes.
const GOOGLE_SHEET_REFRESH_MS = 5000;

/* ============================================================
   TEAM DISPLAY NAMES — EDIT THESE ONLY
   ============================================================

   These names affect ONLY the two team panels on the right.
   Keep the Google Sheet names as "Red Team" and "Green Team".
   Colors remain red and green regardless of the display names.
   ============================================================ */

const TEAM_DISPLAY_NAMES = {
  red: "Red Team",
  green: "Green Team"
};

// V77 — LOGICAL BOARD COORDINATES
// Keep existing 3600x1800 geometry internally so no path geometry changes.
// The SVG presentation layer maps that geometry into a 1920x1080 canvas.
const W = 3600;
const H = 1800;

const SVG_W = 1920;
const SVG_H = 1080;
const SX = 0.533333333333;
const SY = 0.600000000000;
const TX = 256.000000000000;
const TY = 54.000000000000;

const mapX = x => x * SX + TX;
const mapY = y => y * SY + TY;
const positions = {"1":[180,120],"2":[390,120],"3":[600,120],"4":[810,120],"5":[1020,120],"6":[1230,120],"7":[1440,120],"14":[180,300],"13":[390,300],"12":[600,300],"11":[810,300],"10":[1020,300],"9":[1230,300],"8":[1440,300],"15":[180,480],"16":[390,480],"17":[600,480],"18":[810,480],"19":[1020,480],"20":[1230,480],"21":[1440,480],"28":[180,660],"27":[390,660],"26":[600,660],"25":[810,660],"24":[1020,660],"23":[1230,660],"22":[1440,660],"29":[180,840],"30":[390,840],"31":[600,840],"32":[810,840],"33":[1020,840],"34":[1230,840],"35":[1440,840],"41":[180,1020],"40":[390,1020],"39":[600,1020],"38":[810,1020],"37":[1020,1020],"36":[1230,1020],"42":[550,1300],"43":[730,1300],"44":[910,1300],"45":[550,1480],"46":[730,1480],"47":[910,1480],"48":[1460,1450],"49":[1670,1450],"50":[1880,1450],"51":[2090,1450],"52":[2300,1450],"53":[2510,1450],"54":[2510,1270],"55":[2300,1270],"56":[2090,1270],"57":[1880,1270],"58":[1670,1270],"59":[1460,1270],"60":[1460,1090],"61":[1670,1090],"62":[1880,1090],"63":[2090,1090],"64":[2300,1090],"65":[2510,1090]};


/* ============================================================
   V111 — GOOGLE SHEET GAME PIECES
   ============================================================ */

const redStatus = document.getElementById("red-team-status");
const greenStatus = document.getElementById("green-team-status");

const teamState = {
  "Red Team": 1,
  "Green Team": 1
};

function clearTeamTileHighlights() {
  document.querySelectorAll(
    ".tile.team-red-glow, .tile.team-green-glow, .tile.team-dual-glow"
  ).forEach(tile => {
    tile.classList.remove(
      "team-red-glow",
      "team-green-glow",
      "team-dual-glow"
    );
  });
}

function applyTeamTileHighlights() {
  clearTeamTileHighlights();

  const redTile = document.querySelector(`.tile[data-tile="${teamState["Red Team"]}"]`);
  const greenTile = document.querySelector(`.tile[data-tile="${teamState["Green Team"]}"]`);

  // Single-team ownership changes the tile's actual border color.
  if (redTile) redTile.classList.add("team-red-glow");
  if (greenTile) greenTile.classList.add("team-green-glow");

  /*
   * If both teams occupy the same tile, give that tile a dedicated
   * dual-team state so it can show two distinct colored rims.
   */
  if (redTile && greenTile && redTile === greenTile) {
    redTile.classList.remove("team-red-glow", "team-green-glow");
    redTile.classList.add("team-dual-glow");
  }
}

function updateTeamDisplay() {
  if (redStatus) {
    redStatus.textContent =
      `${TEAM_DISPLAY_NAMES.red} - Tile ${teamState["Red Team"]}`;
  }

  if (greenStatus) {
    greenStatus.textContent =
      `${TEAM_DISPLAY_NAMES.green} - Tile ${teamState["Green Team"]}`;
  }

  applyTeamTileHighlights();
}

function normalizeTeamName(value) {
  const name = String(value ?? "").trim().toLowerCase();

  if (name === "red" || name === "red team") return "Red Team";
  if (name === "green" || name === "green team") return "Green Team";

  return null;
}

/*
 * Google Visualization JSONP loader.
 *
 * We intentionally do NOT use fetch() here. A browser can reject a
 * cross-origin fetch even when the Google Sheet itself is public.
 * JSONP loads the gviz response as a script, which avoids that CORS
 * problem for this read-only public data source.
 */
let googleSheetRequestCounter = 0;
let googleSheetTimeout = null;

function updateFromGoogleSheet() {
  const callbackName =
    `__tileRaceSheetCallback_${Date.now()}_${++googleSheetRequestCounter}`;

  const script = document.createElement("script");
  const separator = "?";

  let finished = false;

  const cleanup = () => {
    if (script.parentNode) script.parentNode.removeChild(script);
    try {
      delete window[callbackName];
    } catch (_) {
      window[callbackName] = undefined;
    }
  };

  const fail = (message) => {
    if (finished) return;
    finished = true;
    cleanup();
    console.warn("[Tile Race] Google Sheet update failed:", message);
  };

  window[callbackName] = (response) => {
    if (finished) return;
    finished = true;

    try {
      if (!response || response.status !== "ok") {
        const reason =
          response?.errors?.map(error => error.message).join("; ") ||
          "Google returned an invalid response.";
        throw new Error(reason);
      }

      const table = response.table;

      if (!table || !Array.isArray(table.rows)) {
        throw new Error("Google returned no table rows.");
      }

      /*
       * We request A:B, so column 0 is Teams and column 1 is Tile #.
       * This deliberately ignores the displayed header text and uses
       * the actual sheet columns, making the integration robust to
       * minor header formatting changes.
       */
      const latest = {};

      for (const row of table.rows) {
        const cells = row?.c || [];
        const rawTeam = cells[0]?.v;
        const rawTile = cells[1]?.v;

        const team = normalizeTeamName(rawTeam);
        const tile = Number.parseInt(String(rawTile ?? "").trim(), 10);

        if (!team || !Number.isInteger(tile)) continue;
        if (!positions[tile]) continue;

        latest[team] = Math.max(1, Math.min(65, tile));
      }

      if (latest["Red Team"] !== undefined) {
        teamState["Red Team"] = latest["Red Team"];
      }

      if (latest["Green Team"] !== undefined) {
        teamState["Green Team"] = latest["Green Team"];
      }

      updateTeamDisplay();

      console.log(
        `[Tile Race] Sheet updated successfully: Red Team = ${teamState["Red Team"]}, ` +
        `Green Team = ${teamState["Green Team"]}`
      );
    } catch (error) {
      console.warn("[Tile Race] Could not process Google Sheet response:", error);
    } finally {
      cleanup();
    }
  };

  /*
   * Query only A:B. Google Visualization's query language uses the
   * spreadsheet column IDs (A/B), not the visible header names.
   */
  const query = encodeURIComponent("select A,B where A is not null");

  script.src =
    `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq` +
    `?tqx=responseHandler:${encodeURIComponent(callbackName)}` +
    `&gid=${encodeURIComponent(GOOGLE_SHEET_GID)}` +
    `&range=A:B` +
    `&tq=${query}` +
    `&_=${Date.now()}`;

  script.async = true;

  script.onerror = () => {
    fail("The gviz script could not be loaded. Check spreadsheet sharing and GID.");
  };

  document.head.appendChild(script);

  /*
   * Don't let a dead request hang indefinitely. The next 5-second poll
   * will try again.
   */
  window.setTimeout(() => {
    fail("Request timed out.");
  }, 4500);
}

updateTeamDisplay();

updateFromGoogleSheet();
setInterval(updateFromGoogleSheet, GOOGLE_SHEET_REFRESH_MS);


const svg = document.getElementById("track");
const layer = document.getElementById("tiles");
// All SVG road geometry is drawn in the existing logical coordinate
// system, then mapped as one unit into the 1920x1080 SVG.
const drawing = document.createElementNS("http://www.w3.org/2000/svg", "g");
drawing.setAttribute("class", "board-drawing");
drawing.setAttribute("transform", "translate(256.000000 54.000000) scale(0.533333333333 0.600000000000)");
svg.appendChild(drawing);

function draw(points, cls = "") {
  const pointString = points.map(([x,y]) => `${x},${y}`).join(" ");

  // Soft candy-road shadow.
  const shadow = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  shadow.setAttribute("points", pointString);
  shadow.setAttribute("class", "path-shadow " + cls);
  drawing.appendChild(shadow);

  // White candy base.
  const base = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  base.setAttribute("points", pointString);
  base.setAttribute("class", "connection " + cls);
  drawing.appendChild(base);

  // Broad pink/red candy-cane bands.
  const stripe = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  stripe.setAttribute("points", pointString);
  stripe.setAttribute("class", "candy-stripe " + cls);
  drawing.appendChild(stripe);

  // Glossy highlight.
  const highlight = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  highlight.setAttribute("points", pointString);
  highlight.setAttribute("class", "path-highlight " + cls);
  drawing.appendChild(highlight);
}

const p = id => positions[id];

// ============================================================
// V51 — TRUE CURVED ROW CONNECTIONS
//
// V45 tile positions are preserved.
//
// The important change is how the ROAD connects those tiles:
//
// 1 2 3 4 5 6 7
//               ╲
//                8 9 10 ... 14
//               ╱
// 15 16 ... 21
//
// Each row transition is a real rounded U-turn. The curve starts
// at the SIDE of the last tile and arrives at the SIDE of the
// first tile on the next row.
//
// This is NOT a post-processing effect and NOT a bent rail.
// The actual road path is built with cubic curves.
// ============================================================

function svgPath(d, cls) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  path.setAttribute("class", cls);
  drawing.appendChild(path);
}

function routeStroke(d, cls = "") {
  // Shadow
  svgPath(d, "path-shadow " + cls);

  // White rail
  svgPath(d, "connection " + cls);

  // Pink dotted candy accent
  svgPath(d, "candy-stripe " + cls);

  // Gloss
  svgPath(d, "path-highlight " + cls);
}

function rowLine(ids) {
  let d = `M ${p(ids[0])[0]} ${p(ids[0])[1]}`;
  for (let i = 1; i < ids.length; i++) {
    d += ` L ${p(ids[i])[0]} ${p(ids[i])[1]}`;
  }
  return d;
}

function appendRow(d, ids, nextIds, side) {
  d += rowLine(ids).replace(/^M[^ ]+ [^ ]+/, "");

  if (nextIds) {
    const a = p(ids[ids.length - 1]);
    const b = p(nextIds[0]);

    // The control points push the U-turn OUTSIDE the rows.
    // This creates the rounded Candy Land-style connection.
    const curve = 112;

    if (side === "right") {
      d += ` C ${a[0] + curve} ${a[1]}, ${b[0] + curve} ${b[1]}, ${b[0]} ${b[1]}`;
    } else {
      d += ` C ${a[0] - curve} ${a[1]}, ${b[0] - curve} ${b[1]}, ${b[0]} ${b[1]}`;
    }
  }

  return d;
}

// Main 1-41 route.
// Each row is seven tiles wide, exactly as V45.
const mainRows = [
  [1,2,3,4,5,6,7],
  [8,9,10,11,12,13,14],
  [15,16,17,18,19,20,21],
  [22,23,24,25,26,27,28],
  [29,30,31,32,33,34,35],
  [36,37,38,39,40,41]
];

let mainD = `M ${p(1)[0]} ${p(1)[1]}`;

for (let r = 0; r < mainRows.length; r++) {
  const row = mainRows[r];

  for (let i = 1; i < row.length; i++) {
    mainD += ` L ${p(row[i])[0]} ${p(row[i])[1]}`;
  }

  if (r < mainRows.length - 1) {
    const a = p(row[row.length - 1]);
    const b = p(mainRows[r + 1][0]);
    const side = (r % 2 === 0) ? "right" : "left";
    const curve = 90;

    if (side === "right") {
      mainD += ` C ${a[0] + curve} ${a[1]}, ${b[0] + curve} ${b[1]}, ${b[0]} ${b[1]}`;
    } else {
      mainD += ` C ${a[0] - curve} ${a[1]}, ${b[0] - curve} ${b[1]}, ${b[0]} ${b[1]}`;
    }
  }
}

// 41 -> fork.
// The old V45 approach travelled far down before reaching the fork.
// Bring the fork approach closer by using a shorter horizontal run
// before the downward turn.
//
// The branch itself stays in the same lower area.
const forkJunction = [430, 1390];
const mergePoint = [1180, 1380];

/*
 * IMPORTANT V52 FIX:
 * 41 is the actual end of the main road.
 *
 * The previous V51 line went BACK across the 36-40 row before
 * heading to the fork. That made it look as though the fork began
 * around tile 37 and created the ugly candy-cane overlap.
 *
 * From 41 we now leave the row directly, travel downward into the
 * open space, and then approach the fork junction.
 */
/*
 * V54 — SHORT 41 -> FORK APPROACH
 * The fork junction is intentionally pulled much closer to 41.
 * There is still a gentle curve, but no long empty runway.
 */
// V56: 41 feeds the fork almost immediately.
/* V64 — TILE 41 BOTTOM-MIDDLE EXIT
 * Leave tile 41 from its exact bottom-middle, go straight down,
 * then begin the rightward curve only after clearing the tile.
 */
mainD += ` L ${p(41)[0]} ${p(41)[1] + 125}`;
mainD += ` C ${p(41)[0]} ${p(41)[1] + 165}, 330 1275, ${forkJunction[0]} ${forkJunction[1]}`;

routeStroke(mainD, "route-a");

// V55 — SHORTER CHECKPOINT/FORK CONNECTORS
// 41 now feeds a much closer fork junction. The 36-41 row is no longer crossed
// by a second path, so its candy-cane rail remains one clean stroke.
//
// ------------------------------------------------------------
// V97 — SEAMLESS FORK
//
// Both branches begin at the exact same forkJunction.
// They immediately diverge into their own curves, rather than one
// branch travelling underneath the other before separating.
// ------------------------------------------------------------

// UPPER FORK: 42 -> 43 -> 44
let upperD = `M ${forkJunction[0]} ${forkJunction[1]}`;

// Leave the shared junction upward/right, then flatten into the
// middle-left edge of tile 42.
upperD += ` C 455 1335, 500 ${p(42)[1]}, ${p(42)[0] - 62} ${p(42)[1]}`;
upperD += ` L ${p(43)[0]} ${p(43)[1]}`;
upperD += ` L ${p(44)[0]} ${p(44)[1]}`;

// Exit 44 through middle-right.
upperD += ` L ${p(44)[0] + 105} ${p(44)[1]}`;
upperD += ` C ${p(44)[0] + 150} ${p(44)[1]}, ${mergePoint[0] - 120} ${mergePoint[1]}, ${mergePoint[0]} ${mergePoint[1]}`;

routeStroke(upperD, "route-a");

// LOWER FORK: 45 -> 46 -> 47 -> merge
let lowerD = `M ${forkJunction[0]} ${forkJunction[1]}`;

// Immediately diverge downward/right from the SAME junction.
// Enter tile 45 at its middle-left edge.
lowerD += ` C 455 1445, 500 ${p(45)[1]}, ${p(45)[0] - 62} ${p(45)[1]}`;
lowerD += ` L ${p(46)[0]} ${p(46)[1]}`;
lowerD += ` L ${p(47)[0]} ${p(47)[1]}`;

// Exit 47 through middle-right.
lowerD += ` L ${p(47)[0] + 105} ${p(47)[1]}`;
lowerD += ` C ${p(47)[0] + 150} ${p(47)[1]}, ${mergePoint[0] - 120} ${mergePoint[1]}, ${mergePoint[0]} ${mergePoint[1]}`;

routeStroke(lowerD, "route-b");

// ------------------------------------------------------------
// 48 -> 65
// Keep the existing V45 tile positions, but make the turns
// rounded rather than square.
// ------------------------------------------------------------

/*
 * V69 — FINISH SECTION ROW TURNS
 *
 * Match the same U-turn construction used by the main board rows:
 *
 *   53  ->  curve around the RIGHT  -> 54
 *   59  ->  curve around the LEFT   -> 60
 *
 * The road leaves the tile horizontally, travels a short distance
 * outward, rounds the corner, and returns horizontally into the next
 * tile. The tile positions themselves are unchanged.
 */
let finishD = `M ${mergePoint[0]} ${mergePoint[1]}`;
finishD += ` L ${p(48)[0]} ${p(48)[1]}`;

// 48 -> 49 -> 50 -> 51 -> 52 -> 53
for (const id of [49,50,51,52,53]) {
  finishD += ` L ${p(id)[0]} ${p(id)[1]}`;
}

// 53 -> 54: same right-side U-turn logic as 7 -> 8.
{
  const a = p(53);
  const b = p(54);
  const curve = 112;
  finishD += ` C ${a[0] + curve} ${a[1]}, ${b[0] + curve} ${b[1]}, ${b[0]} ${b[1]}`;
}

// 54 -> 55 -> 56 -> 57 -> 58 -> 59
for (const id of [55,56,57,58,59]) {
  finishD += ` L ${p(id)[0]} ${p(id)[1]}`;
}

// 59 -> 60: same left-side U-turn logic as 14 -> 15.
{
  const a = p(59);
  const b = p(60);
  const curve = 112;
  finishD += ` C ${a[0] - curve} ${a[1]}, ${b[0] - curve} ${b[1]}, ${b[0]} ${b[1]}`;
}

// 60 -> 61 -> 62 -> 63 -> 64 -> 65
for (const id of [61,62,63,64,65]) {
  finishD += ` L ${p(id)[0]} ${p(id)[1]}`;
}

routeStroke(finishD, "route-b");

// Keep the exact fork/merge points visually unified.
function drawJunction(x, y) {
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", "18");
  circle.setAttribute("class", "junction-base");
  drawing.appendChild(circle);

  const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  dot.setAttribute("cx", x);
  dot.setAttribute("cy", y);
  dot.setAttribute("r", "5");
  dot.setAttribute("class", "junction-dot");
  drawing.appendChild(dot);
}

drawJunction(forkJunction[0], forkJunction[1]);
drawJunction(mergePoint[0], mergePoint[1]);

// ============================================================
// TILE CONTENT CONFIGURATION — EDIT THIS SECTION
// ============================================================
//
// Image:
//   Put your image files in the /images/ folder.
//   Example: tile 1 uses images/tile1.png
//
// Full tile information:
//   Edit the "info" text for each tile. This text appears in the
//   animated hover tooltip when someone hovers over the tile.
//
// Example:
//   1: {
//     image: "images/tile1.png",
//     info: "Kill 50 Green Dragons"
//   }
//
// ============================================================

const TILE_CONFIG = {
  1: { image: "images/tile1.png", info: "Strange old lockpick" },
  2: { image: "images/tile2.png", info: "Vampyre snelm" },
  3: { image: "images/tile3.png", info: "Broken zombie helmet" },
  4: { image: "images/tile4.png", info: "Crawling hand" },
  5: { image: "images/tile5.png", info: "Brine sabre" },
  6: { image: "images/tile6.png", info: "Earthbound Tecpatl" },
  7: { image: "images/tile7.png", info: "Antler Guard" },
  8: { image: "images/tile8.png", info: "Enhanced crystal teleport seed (No Thieving)" },
  9: { image: "images/tile9.png", info: "Bottled storm " },
  10: { image: "images/tile10.png", info: "Orikalkum gravel from Maggot King" },
  11: { image: "images/tile11.png", info: "Any unique from Grotesque Guardians" },
  12: { image: "images/tile12.png", info: "1x Zenyte shard" },
  13: { image: "images/tile13.png", info: "Tecu salamander " },
  14: { image: "images/tile14.png", info: "5x Steel ring" },
  15: { image: "images/tile15.png", info: "5x Immaculate mole skins" },
  16: { image: "images/tile16.png", info: "5x Scurrius spine" },
  17: { image: "images/tile17.png", info: "3x Pristine spider silks." },
  18: { image: "images/tile18.png", info: "Any unique from Commander Zilyana" },
  19: { image: "images/tile19.png", info: "Any unique from Kalphite Queen" },
  20: { image: "images/tile20.png", info: "3x Tzhaar uniques including dupes" },
  21: { image: "images/tile21.png", info: "Granite longsword or boots" },
  22: { image: "images/tile22.png", info: "Black mask" },
  23: { image: "images/tile23.png", info: "2x Royal Titans staff pieces" },
  24: { image: "images/tile24.png", info: "1x Zulrah unique" },
  25: { image: "images/tile25.png", info: "Warped sceptre" },
  26: { image: "images/tile26.png", info: "2x Abyssal whip from Abyssal Demon" },
  27: { image: "images/tile27.png", info: "Beef pet" },
  28: { image: "images/tile28.png", info: "2x Uniques from Grotesque Guardians" },
  29: { image: "images/tile29.png", info: "Tome of earth or Dragon hunter wand" },
  30: { image: "images/tile30.png", info: "Zamorakian Spear" },
  31: { image: "images/tile31.png", info: "Any Bandos armor piece" },
  32: { image: "images/tile32.png", info: "2x Hallowfell" },
  33: { image: "images/tile33.png", info: "Any 4 Barrows uniques" },
  34: { image: "images/tile34.png", info: "Elite clue from Phosani's Nightmare" },
  35: { image: "images/tile35.png", info: "3x Vorkath head" },
  36: { image: "images/tile36.png", info: "Horn of plenty" },
  37: { image: "images/tile37.png", info: "Any Zalcano unique (Includes pet)" },
  38: { image: "images/tile38.png", info: "2x Forgotten Lockbox" },
  39: { image: "images/tile39.png", info: "5x Frozen cache" },
  40: { image: "images/tile40.png", info: "Dagganoth Kings - 1 of each ring" },
  41: { image: "images/tile41.png", info: "RAIDS CHECKPOINT - 1x purple from each raid (CoX/ToB/ToA)" },
  42: { image: "images/tile42.png", info: "3x Fedora" },
  43: { image: "images/tile43.png", info: "Tyrannical Ring" },
  44: { image: "images/tile44.png", info: "Chaos elemental pet" },
  45: { image: "images/tile45.png", info: "Both ward pieces from Scorpia" },
  46: { image: "images/tile46.png", info: "Skull of Vet'ion" },
  47: { image: "images/tile47.png", info: "Voidwaker gem" },
  48: { image: "images/tile48.png", info: "Aranea boots" },
  49: { image: "images/tile49.png", info: "Sarachnis cudgel" },
  50: { image: "images/tile50.png", info: "Jeweller's chisel" },
  51: { image: "images/tile51.png", info: "Dark bow" },
  52: { image: "images/tile52.png", info: "Mask of ranul" },
  53: { image: "images/tile53.png", info: "2x Zulrah uniques" },
  54: { image: "images/tile54.png", info: "Any Doom Unique" },
  55: { image: "images/tile55.png", info: "Any unique from regular Nightmare (no phosani)" },
  56: { image: "images/tile56.png", info: "3x KBD head" },
  57: { image: "images/tile57.png", info: "Crystal armour seed" },
  58: { image: "images/tile58.png", info: "Any Maggot King unique" },
  59: { image: "images/tile59.png", info: "Chromium ingot from The Whisperer" },
  60: { image: "images/tile60.png", info: "Vestige roll from Leviathan" },
  61: { image: "images/tile61.png", info: "5x Awakener orb from Vardorvis" },
  62: { image: "images/tile62.png", info: "Eye of the duke or any Virtus piece from Duke Sucellus" },
  63: { image: "images/tile63.png", info: "Mad Angel Jar or Pet" },
  64: { image: "images/tile64.png", info: "Soulflame horn or any Oathplate piece" },
  65: { image: "images/tile65.png", info: "Any Nex unique" }
};

// ============================================================
// NUMBERED TILES
// ============================================================

const tileColors = ["red", "purple", "yellow", "blue", "orange", "green"];

for (const [id, [x, y]] of Object.entries(positions)) {
  const config = TILE_CONFIG[id];

  const tile = document.createElement("div");

  if (id === "41") {
    tile.className = "tile checkpoint";
    tile.textContent = "";

    const number = document.createElement("span");
    number.className = "checkpoint-number";
    number.textContent = "41";

    const label = document.createElement("span");
    label.className = "checkpoint-label";
    label.textContent = "CHECKPOINT";

    tile.appendChild(number);
    tile.appendChild(label);

    if (config?.image) {
      const image = document.createElement("img");
      image.className = "tile-image checkpoint-image";
      image.src = config.image;
      image.alt = "Checkpoint tile 41";
      image.loading = "lazy";
      image.addEventListener("error", () => {
        image.style.display = "none";
      });
      tile.appendChild(image);
    }
  } else {
    const color = tileColors[(Number(id) - 1) % tileColors.length];
    tile.className = `tile candy-${color}`;
    tile.textContent = "";

    // Small image area for the RuneScape objective/icon.
    if (config?.image) {
      const image = document.createElement("img");
      image.className = "tile-image";
      image.src = config.image;
      image.alt = `Tile ${id}`;
      image.loading = "lazy";

      // If an image hasn't been added yet, hide the broken-image icon.
      image.addEventListener("error", () => {
        image.style.display = "none";
      });

      tile.appendChild(image);
    }

    const number = document.createElement("span");
    number.className = "tile-number";
    number.textContent = id;
    tile.appendChild(number);
  }

  // ==========================================================
  // HOVER TOOLTIP
  // Edit the "info" field in TILE_CONFIG above.
  // ==========================================================
  const tooltip = document.createElement("div");
  tooltip.className = "tile-tooltip tile-tooltip-global";
  tooltip.textContent = config?.info || `Tile ${id}`;

  /*
   * V106 — true top layer.
   *
   * Do NOT keep the tooltip inside the tile. Tiles, the tile layer,
   * labels, SVG and transformed parents can all create stacking
   * contexts, which means even z-index:9999 cannot reliably escape.
   *
   * The tooltip is therefore mounted directly on <body>, exactly like
   * a Photoshop-style top layer. Its screen position is calculated from
   * the hovered tile.
   */
  document.body.appendChild(tooltip);

  const positionTooltip = () => {
    const r = tile.getBoundingClientRect();

    tooltip.style.left = `${r.left + r.width / 2}px`;
    tooltip.style.top = `${r.top - 12}px`;
  };

  tile.addEventListener("pointerenter", () => {
    positionTooltip();
    tooltip.classList.add("is-visible");
  });

  tile.addEventListener("pointerleave", () => {
    tooltip.classList.remove("is-visible");
  });

  window.addEventListener("resize", () => {
    if (tooltip.classList.contains("is-visible")) positionTooltip();
  }, {passive:true});

  window.addEventListener("scroll", () => {
    if (tooltip.classList.contains("is-visible")) positionTooltip();
  }, {passive:true});

  tile.dataset.tile = id;
  tile.style.left = `${mapX(x) / SVG_W * 100}%`;
  tile.style.top = `${mapY(y) / SVG_H * 100}%`;

  layer.appendChild(tile);
}




/* ================================================================
   V61 — FORK CONNECTION ALIGNMENT
   ================================================================
   Three deliberate geometry corrections:
   1. The road leaves tile 41 from a slightly lower position.
   2. The lower branch enters tile 45 at its LEFT-MIDDLE.
   3. The upper branch leaves tile 44 from its MIDDLE.
   ================================================================ */


/* ================================================================
   V63 — TILE 44/47 RIGHT-MIDDLE EXITS
   ================================================================
   Both fork branches now leave their final tiles through the exact
   middle of the RIGHT edge:

       44  ───────>
       47  ───────>

   The turn begins after the tile has been cleared.
   ================================================================ */

/* ================================================================
   V65 — EARLIER 44/47 CURVES
   ================================================================
   The branches now begin curving shortly after leaving 44 and 47,
   rather than travelling straight for too long before heading toward
   tile 48.
   ================================================================ */


/* ================================================================
   V66 — UNIFORM FORK EXIT GEOMETRY
   ================================================================
   44/47 now mirror the entrance behavior:
      tile -> short straight tangent -> curve -> merge
   This makes both ends of the fork use the same visual logic.
   ================================================================ */


/* ================================================================
   V67 — UNIFORM FORK MERGE POSITION
   ================================================================
   The merge is pulled back from tile 48 so the distance from 44/47
   to the beginning of the merge curve matches the corresponding
   spacing used when the fork begins from 41 into 42/45.
   ================================================================ */


/* ================================================================
   V69 — FINISH ROW-TURN GEOMETRY
   ================================================================
   53 -> 54 uses the same right-side U-turn as 7 -> 8.
   59 -> 60 uses the same left-side U-turn as 14 -> 15.
   ================================================================ */

setTimeout(applyTeamTileHighlights, 0);
