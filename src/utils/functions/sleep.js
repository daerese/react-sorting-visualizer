export default function sleepMain(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));
}