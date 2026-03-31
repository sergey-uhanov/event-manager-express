import {DeleteObjectCommand, PutObjectCommand} from '@aws-sdk/client-s3';
import {randomUUID} from 'crypto';
import {s3} from "../db/minio.client.js";

export async function uploadFileService(file, target) {
    const key = `${randomUUID()}-${file.originalname}`;

    await s3.send(new PutObjectCommand({
        Bucket: target,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    }));

    return key

}

export async function deleteFileService(key, bucket) {
    await s3.send(new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
    }));

    return {success: true};
}