export function validateArgs(args, expectedCount) {
    if (args.length < expectedCount) {
        throw new Error(`Expected ${expectedCount} argument(s), got ${args.length}`);
    }
}