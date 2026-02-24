import * as esbuild from 'esbuild';
import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const isWatch = process.argv.includes('--watch');

const sharedConfig = {
  bundle: true,
  format: 'esm',
  target: 'es2022',
  sourcemap: isWatch ? 'inline' : false,
  minify: !isWatch,
  define: {
    'process.env.NODE_ENV': isWatch ? '"development"' : '"production"',
  },
};

const entryPoints = [
  { in: 'src/background.ts', out: 'dist/background' },
  { in: 'src/content.ts', out: 'dist/content' },
  { in: 'src/popup.ts', out: 'dist/popup' },
  { in: 'src/sidepanel.ts', out: 'dist/sidepanel' },
  { in: 'src/options.ts', out: 'dist/options' },
];

function copyStaticFiles() {
  mkdirSync('dist', { recursive: true });
  mkdirSync('dist/icons', { recursive: true });

  // Copy HTML files
  const htmlFiles = ['popup.html', 'sidepanel.html', 'options.html'];
  for (const file of htmlFiles) {
    if (existsSync(file)) {
      copyFileSync(file, `dist/${file}`);
    }
  }

  // Copy manifest
  if (existsSync('manifest.json')) {
    copyFileSync('manifest.json', 'dist/manifest.json');
  }

  // Copy icons if they exist
  if (existsSync('icons')) {
    const icons = readdirSync('icons');
    for (const icon of icons) {
      const src = join('icons', icon);
      if (statSync(src).isFile()) {
        copyFileSync(src, join('dist/icons', icon));
      }
    }
  }

  // Copy content CSS
  if (existsSync('src/content.css')) {
    copyFileSync('src/content.css', 'dist/content.css');
  }

  console.log('Static files copied.');
}

async function build() {
  copyStaticFiles();

  const ctx = await esbuild.context({
    ...sharedConfig,
    entryPoints: entryPoints.map(e => ({ in: e.in, out: e.out })),
    outbase: '',
    outdir: '.',
    plugins: [
      {
        name: 'copy-on-rebuild',
        setup(build) {
          build.onEnd(result => {
            if (result.errors.length === 0) {
              copyStaticFiles();
              console.log(`[${new Date().toLocaleTimeString()}] Build complete.`);
            } else {
              console.error('Build failed:', result.errors);
            }
          });
        },
      },
    ],
  });

  if (isWatch) {
    await ctx.watch();
    console.log('Watching for changes...');
  } else {
    await ctx.rebuild();
    await ctx.dispose();
    console.log('Production build complete.');
  }
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
