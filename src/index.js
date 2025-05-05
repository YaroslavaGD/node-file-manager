import * as readline from 'node:readline/promises';
import process from 'node:process';
import { handleCommand } from './fileManager.js';

const start = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> ',
    });
    const username = process.argv.find(arg => arg.startsWith('--username'))?.split('=')[1] || 'User';
    console.log(`Welcome to the File Manager, ${username}!`);
    console.log(`You are currently in ${process.cwd()}`);
    rl.prompt();

    rl.on('line', async (line) => {
        const input = line.trim();
        const result = await handleCommand(input);

        if (result === 'exit') {
            rl.close();
            return;
        }
        
        rl.prompt();
    })

    rl.on('close', () => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
    });
}

start();