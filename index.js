require('dotenv').config();
const puppeteer = require('puppeteer');

require('console-stamp')(console, 'HH:MM:ss');


(async () => {
    const selectorFound = false;

    const browser = await puppeteer.launch({ headless: true, devtools: true, defaultViewport: null, args: ['--start-maximized'] });
    const page = await browser.newPage();


    await page.goto('https://www.vut.cz/studis/student.phtml?sn=prohlaseni_studenta');

    const cookies = [{
        'name': 'cookiehub',
        'value': 'eyJhbnN3ZXJlZCI6dHJ1ZSwicHJlY29uc2VudCI6ZmFsc2UsInJldmlzaW9uIjoxLCJkbnQiOmZhbHNlLCJhbGxvd1NhbGUiOnRydWUsImltcGxpY3QiOmZhbHNlLCJyZWdpb24iOiIiLCJ0b2tlbiI6IjdkSEk1Y0RnYkNEU1dBenNWRGxLR2MwUDdLYkxqRlp0UWx3bEpnSHhGc3VYVGtuNTdKRlZMdWV2MGd6a0FrdHMiLCJ0aW1lc3RhbXAiOiIyMDIyLTAyLTAzVDE3OjE4OjU0LjgxM1oiLCJjYXRlZ29yaWVzIjpbeyJjaWQiOjEsImlkIjoibmVjZXNzYXJ5IiwidmFsdWUiOnRydWUsInByZWNvbnNlbnQiOnRydWUsImZpcmVkIjp0cnVlfSx7ImNpZCI6MiwiaWQiOiJwcmVmZXJlbmNlcyIsInZhbHVlIjp0cnVlLCJwcmVjb25zZW50IjpmYWxzZSwiZmlyZWQiOmZhbHNlfSx7ImNpZCI6MywiaWQiOiJhbmFseXRpY3MiLCJ2YWx1ZSI6dHJ1ZSwicHJlY29uc2VudCI6ZmFsc2UsImZpcmVkIjpmYWxzZX0seyJjaWQiOjQsImlkIjoibWFya2V0aW5nIiwidmFsdWUiOnRydWUsInByZWNvbnNlbnQiOmZhbHNlLCJmaXJlZCI6ZmFsc2V9LHsiY2lkIjo1LCJpZCI6InVuY2F0ZWdvcml6ZWQiLCJ2YWx1ZSI6dHJ1ZSwicHJlY29uc2VudCI6ZmFsc2UsImZpcmVkIjpmYWxzZX1dfQ=='
    }];
      
    await page.setCookie(...cookies);


    // Login to studis
    await page.type('#login7', process.env.LOGIN);
    await page.type('#passwd7', process.env.PASSWORD);
    await Promise.all([page.click('button[type="submit"][name="login"]'), page.waitForNavigation()]);

    const buttonSelectors = {
        selectors: [
            'button#btnPodepsat-2',
            'button[name="btnPodepsat-2"]'
        ],
        XPaths: [
            '//*[text()="Yes, I sign"]',
            '//*[text()="Podepisuji"]'
        ]
    };

    const messageSelectors = {
        XPaths: [
            '//*[contains(text(),"was signed a declaration of the non-existence of symptoms of viral infectious disease.")]',
            '//*[contains(text(),"podepsáno prohlášení o neexistenci příznaků virového onemocnění")]'
        ]
    };

    if (!selectorFound) {
        for (let selector of buttonSelectors.selectors) {
            if (await page.$(selector)) {
                Promise.all([page.click(selector), page.waitForNavigation()])
                .then(() => {
                    console.log("Button has been clicked, waiting for results");
                });

                selectorFound = true;
                break;
            }
        };
    }

    if (!selectorFound) {
        for (let XPath of buttonSelectors.XPaths) {
            let [XPathElement] = await page.$x(XPath);
            if (XPathElement) {
                Promise.all([XPathElement.click(), page.waitForNavigation()])
                .then(() => {
                    console.log("Button has been clicked, waiting for results");
                });

                selectorFound = true;
                break;
            }
        };
    }

    if (!selectorFound) {
        console.log("Button has not been found, waiting for results");
    }

    for (let XPath of messageSelectors.XPaths) {
        let [XPathElement] = await page.$x(XPath);
        if (XPathElement) {
            console.log("Declaration of health is SIGNED");
            break;
        }
    };

    await browser.close();
})();