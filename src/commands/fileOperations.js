import path from 'node:path';
import fs, { unlink } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';

export async function readFileCommand(args) {
    try {
        const filePath = args[0];
        if (!filePath) {
            throw new Error('Path is required');
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
            throw new Error('File name is required');
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
            throw new Error('Directory name is required');
        }
        const fullPath = path.resolve(process.cwd(), dirName);
        await fs.mkdir(fullPath, { recursive: false });

        console.log(`Directory ${dirName} created.`);
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
            throw new Error('Old path or name is required');
        }
        const sourcePath = path.resolve(process.cwd(), oldPath);
        const dir = path.dirname(sourcePath);
        const destPath = path.join(dir, newFileName);

        await fs.rename(sourcePath, destPath);
        
        console.log(`Renamed to ${newFileName}`);
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
            throw new Error('File path or destination path is required');
        } 

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
        console.error('Operation failed');
        console.error(error);
    }
}

export async function moveFileCommand(args) {
        const sourcePath = args[0];
        const destPath = args[1];
        if (!sourcePath || !destPath) {
            throw new Error('File path and destination path are required');
        }
    
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
}