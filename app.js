import Bot from'./bot.js';

const bot = new Bot();


const app = async () => {

    let args = process.argv.splice(2).join(' ').split(',');

    if (args.length > 1) {
        let number = parseInt(args[1]);
        if (number >= 0 && number < 20) {
            
            await bot.init();
            
            await bot.input(args[0]);
            
            await bot.getImage();
            
            for (let index = 0; index < number; index++) {
                await bot.inputReRender();
        
                await bot.getImage();
            }
            return;
        }else{
            console.log("Please enter a number bewteen 1 and 20");
        }

    }else{
        console.log("No arguments passed : node app.js [text], [number]");
    }

};

app();

