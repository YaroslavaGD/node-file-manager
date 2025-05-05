import path from 'node:path';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { validateArgs } from '../utils/helpers.js';

export async function calculateHashCommand(args) {
    
    validateArgs(args, 1);
    const filePath = args[0];

    const fullPath = path.resolve(process.cwd(), filePath);

    return new Promise((resolve, reject) => {
        const hash = createHash('sha256');
        const stream = fs.createReadStream(fullPath);

        stream.on('error', (error) => {
            reject(new Error('Operation failed: ' + error.message));
        });

        stream.on('data', (chunk) => {
            hash.update(chunk);
        });

        stream.on('end', () => {
            console.log(`SHA256 hash: ${hash.digest('hex')}`);
            resolve();
        });
    });
}