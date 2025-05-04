import { changeDir, changeDirUp } from "../utils/helpers.js";

export async function navigationCommand(command, args) {
    switch (command) {
        case 'cd':
            const targetPath = args[0];
            if (!targetPath) {
                console.log('Path is required');
                break;
            }
            await changeDir(targetPath);
            break;
        case 'up':
            changeDirUp();
            break;
        default:
            console.log('Invalid navigation command');
    }
}