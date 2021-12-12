import puppeteer  from 'puppeteer'
import fs from 'fs';
import request_client  from 'request-promise-native'
import fetch from 'node-fetch';
import { randomInt } from 'crypto';

class Bot {


    constructor() {
        this.url = "https://app.wombo.art/";
        this.browser = null;
    }

    async init() {
        this.browser = await puppeteer.launch({
            headless: true,
        });
        this.browser = await this.browser.newPage();
        await this.browser.goto(this.url);

        await this.browser.setRequestInterception(true)

        this.browser.on('request', (request) => {
            request.continue()
        })
    }

    async input(value){
        await this.browser.type('input[class*="TextInput__Input"]', value);
        await this.browser.waitFor(1000);
        await this.browser.click('.lhvBPE');
        await this.browser.waitFor(1000);
        await this.browser.click('.bZmxDe');
    }

    async inputReRender(){
        await this.browser.waitFor(5000);
        await this.browser.click('button[class*="Button-sc-1fhcnov-2"]');
        await this.browser.waitFor(500);
        await this.browser.click('.lhvBPE');
        await this.browser.waitFor(500);
        await this.browser.click('.bZmxDe');
    }
    

    async getImage(){
        
        await this.browser.waitFor(14000);

        await this.browser._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: '/images'});

        this.browser.on('response', async (response) => {
            if(response.url().includes('prod') && !response.url().includes('blank_tradingcard')){
                console.log("image saved !");
                fetch(response.url()).then(res =>{
                    res.body.pipe(fs.createWriteStream(`./images/${response.url().split('/')[4]}.png`));
                    return ;
                });
            }
        })
    }
}

export default Bot;
