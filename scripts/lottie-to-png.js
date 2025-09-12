#!/usr/bin/env node
/*
Convert Lottie JSON to PNG using Puppeteer and lottie-web
Usage: node scripts/lottie-to-png.js input.json output.png [frame]
*/

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

function printUsageAndExit(message) {
  if (message) {
    console.error(message);
  }
  console.error('Usage: node scripts/lottie-to-png.js <input.json> <output.png> [frame]');
  process.exit(1);
}

const [, , inputPath, outputPath, frameArg] = process.argv;
if (!inputPath || !outputPath) {
  printUsageAndExit();
}

const absoluteInputPath = path.resolve(process.cwd(), inputPath);
const absoluteOutputPath = path.resolve(process.cwd(), outputPath);

if (!fs.existsSync(absoluteInputPath)) {
  printUsageAndExit(`Input file not found: ${absoluteInputPath}`);
}

const frame = Number.isFinite(Number(frameArg)) ? Number(frameArg) : 0;

async function convertLottieToPNG() {
  let browser;
  try {
    const animationData = JSON.parse(fs.readFileSync(absoluteInputPath, 'utf8'));
    const width = animationData.w || 2160;
    const height = animationData.h || 2160;
    
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.setViewport({ width, height });
    
    // Create HTML content with Lottie animation
    const html = `
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>
</head>
<body style="margin:0; padding:0; background:transparent;">
  <div id="lottie-container" style="width:${width}px; height:${height}px;"></div>
  <script>
    const animation = lottie.loadAnimation({
      container: document.getElementById('lottie-container'),
      renderer: 'canvas',
      loop: false,
      autoplay: false,
      animationData: ${JSON.stringify(animationData)}
    });
    
    animation.addEventListener('DOMLoaded', () => {
      animation.goToAndStop(${frame}, true);
    });
  </script>
</body>
</html>`;
    
    await page.setContent(html);
    
    // Wait for animation to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Take screenshot
    const element = await page.$('#lottie-container');
    await element.screenshot({ path: absoluteOutputPath });
    
    console.log(`Wrote PNG: ${outputPath}`);
  } catch (error) {
    console.error('Conversion failed:', error);
    process.exit(2);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

convertLottieToPNG();
