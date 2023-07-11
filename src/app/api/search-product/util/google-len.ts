const puppeteer = require('puppeteer');

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const handler = (imgUrl: string) => {
  return new Promise(async (resolve, reject) => {
    let browser;
    try {
      browser = await puppeteer.launch();
      const page = await browser.newPage();
  
      await Promise.all([page.goto('https://www.google.com/?hl=en'), page.waitForNavigation()]);
  
      await Promise.all([page.click('*[data-upload-path*="upload"]')]);
      
      // Wait for the web component (custom element) to be present in the DOM
      await page.waitForSelector('c-wiz input', {
        visible: true,
        timeout: 1000
      });
    
      // there 2 elements with class 'c-wiz' and we need the second one
      const cWiz = await page.$$('c-wiz');
      const cWiz2 = cWiz[1];
    
      // find the input element inside the second c-wiz element
      const input = await cWiz2.$('input');
      await input?.type(imgUrl);
    
      // click on the search button inside the second c-wiz element
      console.time('search');
      const searchButton = await cWiz2.$('*[role="button"]');
      await Promise.all([searchButton?.click(), page.waitForNavigation()]);
      console.timeEnd('search');
  
  
      // wait for the root element to be present in the DOM
      await sleep(100);
  
      // from here we can parse the page and extract the data we need
      // find root element with jsaction include value 'dragenter'
      const root = await page.$('c-wiz');
      const data = await root.evaluate((x: any) => x.innerHTML)
      resolve(data)

    } catch (error) {
      console.log(error)
      reject(error)
    } finally {
      await browser.close();
    }
  })
}

export default handler