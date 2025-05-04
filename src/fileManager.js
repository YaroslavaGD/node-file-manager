import os from 'node:os';
import { osCommand } from "./commands/os.js";


export async function handleCommand(input){
    const [command, ...args] = input.split(' ');

    switch (command) {
        case 'os':
            osCommand(args);
            break;
        case '.exit':
            return 'exit';
        default: 
            console.log('Invalid input');
    }
    
    console.log(`${os.EOL} You are currently in ${process.cwd()}`);
}