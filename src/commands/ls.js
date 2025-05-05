import process from 'node:process';
import { readdir } from 'node:fs/promises';

export async function lsCommand() {
    try {
        const currentDir = process.cwd();
        const items = await readdir(currentDir, { withFileTypes: true });
        const result = items.map(item => ({
            Name: item.name,
            Type: item.isDirectory() ? 'directory' : 'file',
        }));

        result.sort((a, b) => {
            if (a.Type !== b.Type) {
                return a.Type === 'directory' ? -1 : 1;
            }

            return a.Name.localeCompare(b.Name);
        });

        console.table(result);
    } catch (error) {
        console.error('Operation failed: ', error.message);
    }
}