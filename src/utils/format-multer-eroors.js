import multer from 'multer';

export function formatMulterError(err) {


    switch (err.code) {
        case 'LIMIT_FILE_SIZE':
            return {
                message: 'File too large',
                code: err.code,
                status: 400,
                details: {
                    maxSize: '10MB'
                }
            };

        case 'LIMIT_UNEXPECTED_FILE':
            return {
                message: `Unexpected file field: ${err.field}`,
                code: err.code,
                status: 400,
                details: {
                    field: err.field
                }
            };

        case 'LIMIT_FILE_COUNT':
            return {
                message: 'Too many files uploaded',
                code: err.code,
                status: 400
            };

        default:
            return {
                message: 'File upload error',
                code: 'FILE_UPLOAD_ERROR',
                status: 400
            };
    }
}