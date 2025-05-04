import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs/promises';

export async function navigationCommand(command, args) {
    switch (command) {
        case 'cd':
            const targetPath = args[0];
            if (!targetPath) {
                console.log('Path is required');
                break;
            }
            await changeDir(targetPath);
            break;
        case 'up':
            await changeDirUp();
            break;
        default:
            console.log('Invalid navigation command');
    }
}

async function changeDirUp() {
    const parentDir = path.dirname(process.cwd());
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
    } catch (err) {
        console.error('Operation failed');
        console.error(err);
    }
}

