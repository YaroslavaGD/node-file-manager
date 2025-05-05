import path from 'node:path';
import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';

export async function compressFileCommand(args) {
    const [sourcePath, destPath] = args;

    if (!sourcePath || !destPath) {
        console.error('Source and destination paths are required');
        return;
    }

    const fullSourcePath = path.resolve(process.cwd(), sourcePath);
    let fullDestPath = path.resolve(process.cwd(), destPath);

    try {
        const destStats = await fs.promises.stat(fullDestPath).catch(() => null);
        if (destStats?.isDirectory()) {
            const sourceFileName = path.basename(fullSourcePath);
            fullDestPath = path.join(fullDestPath, sourceFileName + '.br');
        } else {
            fullDestPath = path.join(fullDestPath, '.br');
        }

        await pipeline(
            fs.createReadStream(fullSourcePath),
            createBrotliCompress(),
            fs.createWriteStream(fullDestPath)
        );

        console.log(`File compressed to: ${fullDestPath}`);
    } catch (error) {
        console.error('Operation failed:', error);
    }
}

export async function decompressFileCommand(args) {
    const [sourcePath, destPath] = args;

    if (!sourcePath || !destPath) {
        console.error('Source and destination paths are required');
        return;
    }

    const fullSourcePath = path.resolve(process.cwd(), sourcePath);
    const fullDestPath = path.resolve(process.cwd(), destPath);

    try {
        await pipeline(
            fs.createReadStream(fullSourcePath),
            createBrotliDecompress(),
            fs.createWriteStream(fullDestPath)
        );

        
        console.log(`File decompressed to: ${fullDestPath}`);
    } catch (error) {
        console.error('Operation failed:', error.message);
    }
}