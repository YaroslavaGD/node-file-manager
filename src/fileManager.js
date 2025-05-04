export async function handleCommand(input){
    const [command, ...args] = input.split(' ');

    switch (command) {
        case '.exit':
            return 'exit';
        default: 
            console.log('Invalid input');
    }
}