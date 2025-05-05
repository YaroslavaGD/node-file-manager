import path from 'node:path';
import fs, { unlink } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { validateArgs } from '../utils/helpers.js';

export async function readFileCommand(args) {
    try {
        validateArgs(args, 1);
        const filePath = args[0];

        const fullPath = path.resolve(process.cwd(), filePath);
        const readStream = createReadStream(fullPath, {encoding: 'utf-8'});

        readStream.pipe(process.stdout);
        await new Promise((resolve, reject) => {
            readStream.on('end', resolve);
            readStream.on('error', reject);
        });
    } catch (error) {
        console.error('Operation failed: ', error.message);
    }
}

export async function createFileCommand(args) {
    try {
        validateArgs(args, 1);
        const fileName = args[0];

        const fullPath = path.resolve(process.cwd(), fileName);

        await fs.writeFile(fullPath, '', { flag: 'wx' });

        console.log(`File ${fileName} created.`);

    } catch (error) {
        console.error('Operation failed: ', error.message);
    }
}

export async function createDirectoryCommand(args) {
    try {
        validateArgs(args, 1);
        const dirName = args[0];

        const fullPath = path.resolve(process.cwd(), dirName);

        await fs.mkdir(fullPath, { recursive: false });

        console.log(`Directory ${dirName} created.`);
    } catch (error) {
        console.error('Operation failed: ', error.message);
    }

}

export async function renameFileCommand(args) {
    try {
        validateArgs(args, 2);
        const [oldPath, newFileName] = args;

        const sourcePath = path.resolve(process.cwd(), oldPath);
        const dir = path.dirname(sourcePath);
        const destPath = path.join(dir, newFileName);

        await fs.rename(sourcePath, destPath);
        
        console.log(`Renamed to ${newFileName}`);
    } catch (error) {
        console.error('Operation failed: ', error.message);
    }
}

export async function copyFileCommand(args) {
    try {
        validateArgs(args, 2);
        const [sourcePath, destPath] = args;

        const from = path.resolve(process.cwd(), sourcePath);
        let to = path.resolve(process.cwd(), destPath);

        let destStats;
        try {
            destStats = await fs.stat(to);
        } catch {}

        if (destStats?.isDirectory()) {
            const fileName = path.basename(from);
            to = path.join(to,fileName);
        }

        try {
            await fs.access(to);
            throw new Error('Destination file already exists');
        } catch {}

        await pipeline(
            createReadStream(from),
            createWriteStream(to)
        );

        console.log(`Copied ${sourcePath} to ${destPath}`);
    } catch (error) {
        console.error('Operation failed: ', error.message);
    }
}

export async function moveFileCommand(args) {
    try {
        validateArgs(args, 2);
        const [sourcePath, destPath] = args;
    
        const from = path.resolve(process.cwd(), sourcePath);
        let to = path.resolve(process.cwd(), destPath);
    
        const destStats = await fs.stat(to).catch(() => null);
        if (destStats?.isDirectory()) {
            const fileName = path.basename(from);
            to = path.join(to, fileName);
        }
    
        await copyFileCommand([sourcePath, destPath]);
        await unlink(from);

        console.log(`Moved ${sourcePath} to ${destPath}`);
    } catch (error) {
        console.error('Operation failed: ', error.message);
    }
}

export async function deleteFileCommand(args) {
    try {
        validateArgs(args, 1);
        const filePath = args[0];

        const fullPath = path.resolve(process.cwd(), filePath);
        
        await fs.unlink(fullPath);
        console.log(`Deleted '${filePath}'`);
    } catch (error) {
        console.error('Operation failed: ', error.message);
    }
}