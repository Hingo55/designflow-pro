#!/usr/bin/env node
/*
 Multi-color PNG to SVG conversion using ImageTracer.js
 Usage:
   node scripts/trace-logo.js input.png output.svg [numcolors]
*/

const fs = require('fs');
const path = require('path');
const ImageTracer = require('imagetracerjs');
const { PNG } = require('pngjs');

function printUsageAndExit(message) {
  if (message) {
    console.error(message);
  }
  console.error('Usage: node scripts/trace-logo.js <input.png> <output.svg> [numcolors]');
  process.exit(1);
}

const [, , inputPath, outputPath, numColorsArg] = process.argv;
if (!inputPath || !outputPath) {
  printUsageAndExit();
}

const absoluteInputPath = path.resolve(process.cwd(), inputPath);
const absoluteOutputPath = path.resolve(process.cwd(), outputPath);

if (!fs.existsSync(absoluteInputPath)) {
  printUsageAndExit(`Input file not found: ${absoluteInputPath}`);
}

const numcolors = Number.isFinite(Number(numColorsArg)) ? Math.max(2, Math.min(64, Number(numColorsArg))) : 16;

const options = {
  // Increase to capture more palette detail; clamp to avoid huge paths
  numberofcolors: numcolors,
  // Reduce path noise; tweak as needed
  ltres: 1,
  qtres: 1,
  pathomit: 1,
  // Slight blur helps remove speckles without losing sharp edges
  blurradius: 0,
  blurdelta: 20,
  // Optimize straight lines and curves
  linefilter: true,
  roundcoords: 1,
  scale: 1,
  strokewidth: 0,
  strokecolor: 'none',
  // Layering improves color separation for complex logos
  layering: 1,
};

try {
  const inputBuffer = fs.readFileSync(absoluteInputPath);
  const png = PNG.sync.read(inputBuffer);
  const imageData = { width: png.width, height: png.height, data: png.data };
  const svgString = ImageTracer.imagedataToSVG(imageData, options);
  fs.writeFileSync(absoluteOutputPath, svgString, 'utf8');
  console.log(`Wrote SVG: ${outputPath}`);
} catch (error) {
  console.error('Vectorization failed:', error);
  process.exit(2);
}


