// Metro 0.83 passes filenames to image-size 1.x. The patched 2.x parser accepts
// bytes only. Keep SDK 54's Metro API, but read the trusted bundled asset before
// parsing it. Fail closed when upstream changes, rather than silently patching
// unfamiliar code. Remove when upgrading to Metro with native image-size 2 support.
const fs = require('node:fs');
const path = require('node:path');
const cli = path.dirname(require.resolve('@react-native/community-cli-plugin/package.json'));
const expoMetro = path.dirname(require.resolve('@expo/metro/package.json'));
const targets = new Set([
  require.resolve('metro/package.json'),
  require.resolve('metro/package.json', { paths: [cli] }),
  require.resolve('metro/package.json', { paths: [expoMetro] }),
]);
const before = /const isImageInput = assetInfo\.files\[0\]\.includes\("\.zip\/"\)\s*\? _fs\.default\.readFileSync\(assetInfo\.files\[0\]\)\s*:\s*assetInfo\.files\[0\];/;
const after = 'const isImageInput = isImage ? _fs.default.readFileSync(assetInfo.files[0]) : null;';
for (const manifest of targets) {
  const file = path.join(path.dirname(manifest), 'src/Assets.js');
  const source = fs.readFileSync(file, 'utf8');
  if (source.includes(after)) continue;
  if (!before.test(source)) throw new Error(`Review image-size compatibility before building: ${file}`);
  fs.writeFileSync(file, source.replace(before, after));
  console.log(`Patched Metro ${JSON.parse(fs.readFileSync(manifest, 'utf8')).version} for image-size 2`);
}
