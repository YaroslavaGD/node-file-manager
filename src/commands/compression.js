import path from 'node:path';
import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { validateArgs } from '../utils/helpers.js';

export async function compressFileCommand(args) {    
    try {
        validateArgs(args, 2);
        const [sourcePath, destPath] = args;
    
        const fullSourcePath = path.resolve(process.cwd(), sourcePath);
        let fullDestPath = path.resolve(process.cwd(), destPath);

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
    try {
        validateArgs(args, 2);
        const [sourcePath, destPath] = args;
    
        const fullSourcePath = path.resolve(process.cwd(), sourcePath);
        const fullDestPath = path.resolve(process.cwd(), destPath);

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