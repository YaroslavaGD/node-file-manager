import path from 'node:path';
import fs from 'node:fs';
import { createHash } from 'node:crypto';

export async function calculateHashCommand(args) {
    const filePath = args[0];

    if (!filePath) {
        throw new Error('Path to file is required');
    }

    const fullPath = path.resolve(process.cwd(), filePath);

    return new Promise((resolve, reject) => {
        const hash = createHash('sha256');
        const stream = fs.createReadStream(fullPath);

        stream.on('error', (err) => {
            reject(new Error('Operation failed: ' + err.message));
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