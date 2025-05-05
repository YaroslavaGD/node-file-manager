import os from 'node:os';
import { osCommand } from "./commands/os.js";
import { navigationCommand } from './commands/navigation.js';
import { lsCommand } from './commands/ls.js';
import { copyFileCommand, createDirectoryCommand, createFileCommand, deleteFileCommand, moveFileCommand, readFileCommand, renameFileCommand } from './commands/fileOperations.js';
import { calculateHashCommand } from './commands/hash.js';
import { compressFileCommand, decompressFileCommand } from './commands/compression.js';


export async function handleCommand(input){
    try {
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
            case 'mv':
                await moveFileCommand(args);
                break;
            case 'rm':
                await deleteFileCommand(args);
                break;
            case 'hash':
                await calculateHashCommand(args);
                break;
            case 'compress':
                await compressFileCommand(args);
                break;
            case 'decompress':
                await decompressFileCommand(args);
                break;
            case '.exit':
                return 'exit';
            default: 
                console.error('Invalid input');
        }
    } catch (error) {
        console.error('Operation failed: ', error.message);
    }
    
    console.log(`${os.EOL} You are currently in ${process.cwd()}`);
}