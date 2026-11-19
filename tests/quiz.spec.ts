import {test,expect} from '@playwright/test';
import fs from 'node:fs';
import questions from '../src/lib/questions.json' with { type: 'json' };
test('complete mobile test, restore, edit, export, share, and reset',async({page,context})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 await expect(page.locator('h1')).toHaveText(/7 Deadly Sins Test/);
 const first=await page.locator('input[name=answer]').first().boundingBox();expect(first!.y).toBeLessThan(844);
 await expect(page.locator('#next')).toBeDisabled();
 const lastOption=await page.locator('.answer').last().boundingBox();expect(lastOption!.y+lastOption!.height).toBeLessThan(844);
 await page.locator('.answer').nth(4).click();await page.locator('#next').click();
 await page.reload();await expect(page.locator('#question-counter')).toContainText('Question 2');
 await page.locator('#back').click();await expect(page.locator('input[value="4"]')).toBeChecked();
 await page.locator('.answer').nth(2).click();await page.locator('#next').click();
 for(let i=1;i<35;i++){await expect(page.locator('#question-heading')).toHaveText(questions[i].text);await page.locator('.answer').nth(2).click();await page.locator('#next').click();}
 await expect(page.locator('#result-strongest')).toContainText('7 sins share your highest score');
 await expect(page.locator('.score-row strong')).toHaveText(Array(7).fill('50%'));
 await expect(page.locator('.reference-share')).toBeVisible();await expect(page.locator('.reference-chart image')).toHaveCount(7);await page.locator('[data-theme=pride]').click();await expect(page.locator('#explain-pride')).toHaveAttribute('open','');
 const resultUrl=page.url();expect(resultUrl).toContain('#r=1.50.50.50.50.50.50.50');
 await page.locator('#download').focus();await page.screenshot({path:'.impeccable/review/mobile-result.png',fullPage:true});
 const download=page.waitForEvent('download');await page.locator('#download').click();const file=await download;await file.saveAs('work/test-results/result.png');
 const bytes=fs.readFileSync('work/test-results/result.png');expect(bytes.subarray(1,4).toString()).toBe('PNG');expect(bytes.readUInt32BE(16)).toBe(1080);expect(bytes.readUInt32BE(20)).toBe(1350);expect(bytes.length).toBeGreaterThan(40000);
 const isolated=await context.browser()!.newContext();const sharedPage=await isolated.newPage();await sharedPage.goto(resultUrl);await expect(sharedPage.locator('#result-strongest')).toContainText('7 sins share your highest score');await expect(sharedPage.locator('#results')).toContainText('shared result');await isolated.close();
 await page.reload();await expect(page.locator('#results')).toBeVisible();await page.locator('#edit').click();await expect(page.locator('#question-counter')).toContainText('Question 1');await page.locator('.answer').nth(4).click();
 await page.locator('#next').click();for(let i=1;i<35;i++)await page.locator('#next').click();await expect(page.locator('#result-strongest')).toContainText('sloth');
 await page.locator('#restart').click();await page.locator('#cancel-reset').click();await expect(page.locator('#results')).toBeVisible();await page.locator('#restart').click();await page.locator('#confirm-reset').click();await expect(page.locator('#question-counter')).toContainText('Question 1');await expect(page.locator('#next')).toBeDisabled();expect(errors).toEqual([]);
});
test('responsive rendering, source content, invalid link recovery, and keyboard controls',async({page})=>{
 for(const width of [1440,390]){await page.setViewportSize({width,height:width===1440?1000:844});await page.goto('/');await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`.impeccable/review/${width===1440?'desktop':'mobile'}.png`,fullPage:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();}
 await page.goto('/#r=1.0.0.0.0.0.0.bad');await expect(page.locator('#quiz')).toBeVisible();await page.locator('input[value="2"]').focus();await page.keyboard.press('Space');await page.locator('#next').focus();await page.keyboard.press('Enter');await expect(page.locator('#question-counter')).toContainText('Question 2');
 await page.goto('/methodology/');await expect(page.locator('tbody tr')).toHaveCount(35);await page.screenshot({path:'.impeccable/review/mobile-method.png',fullPage:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 const response=await page.request.get('/');const html=await response.text();expect(html).toContain('7 Deadly Sins Test');expect(html).toContain('A few good questions');expect(html).toContain('application/ld+json');
 for(const route of ['/privacy/','/terms/','/robots.txt','/sitemap.xml','/favicon.svg'])expect((await page.request.get(route)).status()).toBe(200);
});
