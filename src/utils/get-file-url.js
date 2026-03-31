export function getFileUrl(key, buketName) {
    return `${process.env.HOST}:${process.env.IMG_PORT}/${buketName}/${key}`;
}