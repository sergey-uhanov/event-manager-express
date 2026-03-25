// minio.client.ts
import { S3Client } from '@aws-sdk/client-s3';

export const s3 = new S3Client({
    endpoint: process.env.MINIO_HOST,
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.MINIO_USER,
        secretAccessKey: process.env.MINIO_PASSWORD,
    },
    forcePathStyle: true,
});