import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {s3} from "../db/minio.client.js";

export async function getFileUrl(key, buketName) {
    const command = new GetObjectCommand({
        Bucket: buketName,
        Key: key,
    });

    return await getSignedUrl(s3, command, {
        expiresIn: 60 * 5,
    });
}