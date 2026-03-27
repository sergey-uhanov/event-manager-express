import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {s3} from "../db/minio.client.js";

export async function getFileUrl(key, buketName) {
    return `${process.env.HOST}:${process.env.IMG_PORT}/${buketName}/${key}`;
}