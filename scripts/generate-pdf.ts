import puppeteer from 'puppeteer';

await main();

async function main() {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto('http://localhost:4321/pdf', { waitUntil: 'networkidle0' });

  await page.pdf({
    path: 'public/pdf/resume.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
  });

  await browser.close();
}
