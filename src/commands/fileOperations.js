import path from 'node:path';
import fs from 'node:fs/promises';

export async function readFileCommand(args) {
    try {
        const filePath = args[0];
        if (!filePath) {
            console.log('Path is required');
        } else {
            const fullPath = path.resolve(process.cwd(), filePath);
            const content = await fs.readFile(fullPath, { encoding: 'utf-8' });
            console.log(content);
        }
    } catch (error) {
        console.log('Operation failed');
    }
}