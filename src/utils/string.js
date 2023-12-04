export function cleanWhitespaces(str) {
    return str.replace(/([\ ]{2,})/g, ' ');
}