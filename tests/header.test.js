
const Page = require('./helpers/page');

let page;
beforeEach(async ()=>{
  page = await Page.build();
  await page.goto("http://localhost:3000");
})

afterEach(async ()=>{
  await page.close();
})

test("Testing the header text", async () => {
  await page.waitFor('a.brand-logo');
 const text = await page.getContentsOf('a.brand-logo'); 
 expect(text).toEqual('Blogster');
});

test("Clicking login starts Oauth Flow", async () => {
  await page.waitFor('.right a');
 await page.click('.right a');
 const url = page.url();
 expect(url).toMatch(/accounts\.google\.com/);
});

test('Shows logged out button', async () => {
  await page.login();
  const text = await page.getContentsOf('a[href="/auth/logout"');
  expect(text).toEqual('Logout');
  
});
