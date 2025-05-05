import os from 'node:os';
import { osCommand } from "./commands/os.js";
import { navigationCommand } from './commands/navigation.js';
import { lsCommand } from './commands/ls.js';
import { copyFileCommand, createDirectoryCommand, createFileCommand, readFileCommand, renameFileCommand } from './commands/fileOperations.js';


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
        case 'ls':
            await lsCommand();
            break;
        case 'cat':
            await readFileCommand(args);
            break;
        case 'add':
            await createFileCommand(args);
            break;
        case 'mkdir':
            await createDirectoryCommand(args);
            break;
        case 'rn':
            await renameFileCommand(args);
            break;
        case 'cp':
            await copyFileCommand(args);
            break;
        case '.exit':
            return 'exit';
        default: 
            console.log('Invalid input');
    }
    
    console.log(`${os.EOL} You are currently in ${process.cwd()}`);
}