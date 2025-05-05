import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs/promises';

export function changeDirUp() {
    const parentDir = path.dirname(process.cwd());
    process.chdir(parentDir);
    console.log(`Moved up to ${process.cwd()}`);
}

export async function changeDir(targetPath) {
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

export function validateArgs(args, expectedCount) {
    if (args.length < expectedCount) {
        throw new Error(`Expected ${expectedCount} argument(s), got ${args.length}`);
    }
}