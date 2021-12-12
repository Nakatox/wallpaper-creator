import Bot from'./bot.js';

const bot = new Bot();


const app = async () => {

    await bot.init();

    await bot.input("nebula storm");

    await bot.getImage();

    // await bot.testGetimage();

};

app();

