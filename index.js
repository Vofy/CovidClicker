require('dotenv').config();
const puppeteer = require('puppeteer');

require('console-stamp')(console, 'HH:MM:ss');


(async () => {
    const selectorFound = false;

    const browser = await puppeteer.launch({ headless: true, devtools: true, defaultViewport: null, args: ['--start-maximized'] });
    const page = await browser.newPage();

    await page.goto('https://www.vut.cz/studis/student.phtml?sn=prohlaseni_studenta');

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
            '//*[contains(text(),"was signed a declaration of the non-existence of symptoms of viral infectious disease")]',
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
