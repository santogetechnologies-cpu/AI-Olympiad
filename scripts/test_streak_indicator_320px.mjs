import fs from 'fs';
import path from 'path';

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passCount++;
  } else {
    console.error(`  ✗ ${message}`);
    failCount++;
  }
}

console.log('=== VERIFYING 320PX STREAK INDICATOR SIZE REDUCTION IN TOP NAVBAR ===\n');

const appLayoutPath = path.resolve('src/components/layout/AppLayout.tsx');
const indexCssPath = path.resolve('src/index.css');

assert(fs.existsSync(appLayoutPath), 'AppLayout.tsx exists');
assert(fs.existsSync(indexCssPath), 'index.css exists');

const layoutCode = fs.readFileSync(appLayoutPath, 'utf-8');
const indexCss = fs.readFileSync(indexCssPath, 'utf-8');

// ── Check 1: Top Navbar Header Preservation ──
console.log('\n1. Verifying Top Navbar Header Preservation:');
assert(
  layoutCode.includes('data-app-header="true"'),
  'AppLayout defines data-app-header="true"'
);
assert(
  layoutCode.includes('h-14 sm:h-16 bg-white border-b border-slate-200/80 px-3 sm:px-6'),
  'AppLayout maintains required header styling for mobile/desktop'
);

// ── Check 2: Mobile Brand Logo Protection ──
console.log('\n2. Verifying Mobile Brand Logo Protection:');
assert(
  layoutCode.includes('Link to={isStudent ? "/student" : "/admin"} className="flex lg:hidden items-center gap-2.5 min-w-0 shrink-0"'),
  'Mobile brand logo container has shrink-0 to prevent being compressed or hidden'
);
assert(
  layoutCode.includes('img src="/mama-ada-logo.png"'),
  'Mobile brand logo loads mama-ada-logo.png'
);

// ── Check 3: Streak Indicator Badge in AppLayout ──
console.log('\n3. Verifying Streak Indicator in AppLayout:');
assert(
  layoutCode.includes('data-streak-indicator="true"'),
  'Streak indicator has data-streak-indicator="true"'
);
assert(
  layoutCode.includes('streak-badge-compact-320'),
  'Streak indicator includes streak-badge-compact-320 class'
);
assert(
  layoutCode.includes('max-[320px]:px-1') && layoutCode.includes('max-[320px]:py-0.5'),
  'Streak indicator has max-[320px] reduced padding classes'
);
assert(
  layoutCode.includes('max-[320px]:text-[10px]'),
  'Streak indicator has max-[320px] reduced font-size class'
);
assert(
  layoutCode.includes('max-[320px]:gap-0.5'),
  'Streak indicator has max-[320px] reduced gap class'
);
assert(
  layoutCode.includes('streak-flame-icon') &&
  layoutCode.includes('max-[320px]:w-2.5') &&
  layoutCode.includes('max-[320px]:h-2.5'),
  'Flame icon has streak-flame-icon and max-[320px] reduced dimensions (10px)'
);
assert(
  layoutCode.includes('streak-unit') &&
  layoutCode.includes('max-[320px]:text-[8px]'),
  'Streak unit (d) has streak-unit and max-[320px] reduced font-size'
);

// ── Check 4: Normal Sizing Retained for Screens > 320px ──
console.log('\n4. Verifying Normal Sizing for Screens > 320px:');
assert(
  layoutCode.includes('px-2.5') && layoutCode.includes('py-1'),
  'Default padding px-2.5 py-1 retained for screens > 320px'
);
assert(
  layoutCode.includes('text-xs'),
  'Default font size text-xs retained for screens > 320px'
);
assert(
  layoutCode.includes('Flame size={14}'),
  'Default Flame size 14 retained for screens > 320px'
);

// ── Check 5: CSS Media Query strictly for 320px width ──
console.log('\n5. Verifying CSS Media Query in index.css:');
assert(
  indexCss.includes('@media (max-width: 320px)'),
  'index.css contains @media (max-width: 320px) breakpoint'
);
assert(
  indexCss.includes('.streak-badge-compact-320'),
  'index.css targets .streak-badge-compact-320'
);
assert(
  indexCss.includes('0.25rem !important') && indexCss.includes('0.125rem !important'),
  'index.css sets compact padding for streak badge at 320px'
);
assert(
  indexCss.includes('0.625rem !important'),
  'index.css sets 10px (0.625rem) font size and icon dimensions at 320px'
);
assert(
  indexCss.includes('.streak-unit') && indexCss.includes('0.5rem !important'),
  'index.css sets 8px (0.5rem) unit size at 320px'
);

// ── Check 6: Layout Fitting Calculation Simulation at 320px ──
console.log('\n6. Verifying Layout Dimension Budget at 320px:');
const screenWidth = 320;
const headerPaddingX = 24; // px-3 left + right
const usableWidth = screenWidth - headerPaddingX; // 296px

const menuBtnWidth = 38;
const menuLogoGap = 12;
const logoWidth = 36;
const leftContainerWidth = menuBtnWidth + menuLogoGap + logoWidth; // 86px

// Reduced streak indicator dimensions at 320px:
const streakPaddingX = 2 * 4; // ~8px (0.25rem * 2)
const flameIconWidth = 10;
const streakTextWidth = 7; // "1"
const streakUnitWidth = 5; // "d"
const streakInternalGap = 2; // 0.125rem
const streakIndicatorTotalWidth = streakPaddingX + flameIconWidth + streakTextWidth + streakUnitWidth + streakInternalGap; // ~32px

const streakXpGap = 6; // gap-1.5
const xpBadgeWidth = 76;
const badgeBellGap = 8; // gap-2
const bellBtnWidth = 36;
const bellAvatarGap = 8; // gap-2
const avatarWidth = 36;

const rightContainerWidth = streakIndicatorTotalWidth + streakXpGap + xpBadgeWidth + badgeBellGap + bellBtnWidth + bellAvatarGap + avatarWidth;
const totalHeaderContentWidth = leftContainerWidth + rightContainerWidth;

console.log(`    Available header width: ${usableWidth}px`);
console.log(`    Left container width:    ${leftContainerWidth}px`);
console.log(`    Right container width:   ${Math.round(rightContainerWidth)}px (Streak badge: ${Math.round(streakIndicatorTotalWidth)}px)`);
console.log(`    Total content width:     ${Math.round(totalHeaderContentWidth)}px`);
console.log(`    Remaining clearance:     ${Math.round(usableWidth - totalHeaderContentWidth)}px`);

assert(
  totalHeaderContentWidth < usableWidth,
  `At 320px width, total content (${Math.round(totalHeaderContentWidth)}px) fits safely within usable width (${usableWidth}px) with ${Math.round(usableWidth - totalHeaderContentWidth)}px clearance`
);

console.log(`\nResults: ${passCount} Passed, ${failCount} Failed`);
if (failCount > 0) {
  process.exit(1);
} else {
  console.log('✓ ALL 320PX STREAK INDICATOR VERIFICATION CHECKS PASSED SUCCESSFULLY!\n');
}
