import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs/promises';
import { validateArgs } from '../utils/helpers.js';

export async function navigationCommand(command, args) {
    switch (command) {
        case 'cd':
            validateArgs(args, 1);
            const targetPath = args[0];
            await changeDir(targetPath);
            break;
        case 'up':
            await changeDirUp();
            break;
        default:
            console.error('Invalid navigation command');
    }
}

async function changeDirUp() {
    const currentDir = process.cwd();
    const parentDir = path.dirname(process.cwd());

    if (currentDir === parentDir) {
        console.log(`Already at root directory: ${currentDir}`);
        return;
    }

    process.chdir(parentDir);
    console.log(`Moved up to ${process.cwd()}`);
}

async function changeDir(targetPath) {
    try {
        const fullPath = path.isAbsolute(targetPath) ? targetPath : path.resolve(process.cwd(), targetPath);
        const stats = await fs.stat(fullPath);
        if (!stats.isDirectory()) {
            throw new Error('Not a directory');
        }

        process.chdir(fullPath);
        console.log(`Changed directory to ${process.cwd()}`);
    } catch (error) {
        console.error('Operation failed: ', error.message);
    }
}

