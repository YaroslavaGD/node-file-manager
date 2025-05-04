import os from 'node:os';
import { osCommand } from "./commands/os.js";
import { navigationCommand } from './commands/navigation.js';


export async function handleCommand(input){
    const [command, ...args] = input.split(' ');

    switch (command) {
        case 'os':
            await osCommand(args);
            break;
        case 'up':
        case 'cd':
            await navigationCommand(command, args);
            break;
        case '.exit':
            return 'exit';
        default: 
            console.log('Invalid input');
    }
    
    console.log(`${os.EOL} You are currently in ${process.cwd()}`);
}