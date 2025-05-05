import path from 'node:path';
import fs from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';

export async function readFileCommand(args) {
    try {
        const filePath = args[0];
        if (!filePath) {
            console.error('Path is required');
        } else {
            const fullPath = path.resolve(process.cwd(), filePath);
            const content = await fs.readFile(fullPath, { encoding: 'utf-8' });

            console.log(content);
        }
    } catch (error) {
        console.error('Operation failed');
    }
}

export async function createFileCommand(args) {
    try {
        const fileName = args[0];

        if (!fileName) {
            console.error('File name is required');
        } else {
            const fullPath = path.resolve(process.cwd(), fileName);
            await fs.writeFile(fullPath, '', { flag: 'wx' });

            console.log(`File ${fileName} created.`);
        }
    } catch (error) {
        console.error('Operation failed');
    }
}

export async function createDirectoryCommand(args) {
    try {
        const dirName = args[0];

        if (!dirName) {
            console.error('Directory name is required');
        } else {
            const fullPath = path.resolve(process.cwd(), dirName);
            await fs.mkdir(fullPath, { recursive: false });
    
            console.log(`Directory ${dirName} created.`);
        }
    } catch (error) {
        console.error('Operation failed');
        console.error(error);
    }

}

export async function renameFileCommand(args) {
    try {
        const oldPath = args[0];
        const newFileName = args[1];
        if (!oldPath || !newFileName) {
            console.error('Old path or name is required');
        } else {
            const sourcePath = path.resolve(process.cwd(), oldPath);
            const dir = path.dirname(sourcePath);
            const destPath = path.join(dir, newFileName);

            await fs.rename(sourcePath, destPath);
            
            console.log(`Renamed to ${newFileName}`);
        }
    } catch (error) {
        console.error('Operation failed');
        console.error(error);
    }
}

export async function copyFileCommand(args) {
    try {
        const sourcePath = args[0];
        const destPath = args[1];
        if (!sourcePath || !destPath) {
            console.error('File path or destination path is required');
        } else {
            const from = path.resolve(process.cwd(), sourcePath);
            const to = path.resolve(process.cwd(), destPath);

            await pipeline(
                createReadStream(from),
                createWriteStream(to)
            );

            console.log(`Copied ${sourcePath} to ${destPath}`);
        }
    } catch (error) {
        console.error('Operation failed');
        console.error(error);
    }
}