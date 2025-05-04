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

export async function createFileCommand(args) {
    try {
        const fileName = args[0];

        if (!fileName) {
            console.log('File name is required');
        } else {
            const fullPath = path.resolve(process.cwd(), fileName);
            await fs.writeFile(fullPath, '', { flag: 'wx' });

            console.log(`File ${fileName} created.`);
        }
    } catch (error) {
        console.log('Operation failed');
    }
}

export async function createDirectoryCommand(args) {
    try {
        const dirName = args[0];

        if (!dirName) {
            console.log('Directory name is required');
        } else {
            const fullPath = path.resolve(process.cwd(), dirName);
            await fs.mkdir(fullPath, { recursive: false });
    
            console.log(`Directory ${dirName} created.`);
        }
    } catch (error) {
        console.log('Operation failed');
        console.log(error);
    }

}