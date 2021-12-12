import puppeteer  from 'puppeteer'
import fs from 'fs';
import request_client  from 'request-promise-native'
import fetch from 'node-fetch';
import { randomInt } from 'crypto';

class Bot {


    constructor() {
        this.url = "https://app.wombo.art/";
        this.browser = null;
        // this.files = [];    
        // this.lastFile = 0;
    }

    async init() {
        this.browser = await puppeteer.launch({
            headless: true,
        });
        this.browser = await this.browser.newPage();
        await this.browser.goto(this.url);
    }

    async input(value){
        await this.browser.type('input[class*="TextInput__Input"]', value);
        await this.browser.waitFor(1000);
        await this.browser.click('.lhvBPE');
        await this.browser.waitFor(1000);
        await this.browser.click('.bZmxDe');
    }

    async getImage(){
        
        await this.browser.setRequestInterception(true)

        // await fs.readdir('./images/', function (err, files) {

        //     if (files.length > 0){
        //         let nb = parseInt(files.at(-1).split('.')[0]) + 1;
        //         console.log(nb);
        //     }
        // });

        this.browser.on('request', (request) => {
            // console.log('>>', request.method(), request.url())
            request.continue()
          })

        await this.browser.waitFor(15000);

        await this.browser._client.send('Page.setDownloadBehavior', {
            behavior: 'allow', downloadPath: '/images'});
       
      
        this.browser.on('response', async (response) => {
            if(response.url().includes('prod')){
                console.log("image saved !");
                fetch(response.url()).then(res =>{
                    res.body.pipe(fs.createWriteStream(`./images/${randomInt(9999)}.png`));
                });
                this.browser.close();
            }
        })
    }

    
}

export default Bot;
