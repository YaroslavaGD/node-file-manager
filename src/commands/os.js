import os from 'node:os';
import { validateArgs } from '../utils/helpers.js';

export async function osCommand(args) {
    validateArgs(args, 1);
    const option = args[0];

    switch(option) {
        case '--EOL':
            console.log(JSON.stringify(os.EOL));
            break;
        case '--cpus':
            const cpus = os.cpus();
            cpus.forEach((cpu, i) => {
                console.log(`CPU ${i + 1}: ${cpu.model}, speed: ${cpu.speed / 1000}GHz`);
            });
            break;
        case '--homedir':
            console.log(os.homedir());
            break;
        case '--username':
            console.log(os.userInfo().username);
            break;
        case '--architecture':
            console.log(os.arch());
            break;
        default:
            console.error('Invalid OS command');
    }
}