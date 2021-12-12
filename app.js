import Bot from'./bot.js';

const bot = new Bot();


const app = async () => {

    await bot.init();
    
    await bot.input("nebula storm");
    
    await bot.getImage();
    
    for (let index = 0; index < 5; index++) {
        await bot.inputReRender();

        await bot.getImage();
    }
};

app();

