import {ZodError} from 'zod';
import {AppError} from "./app-error.js";
import {formatZodErrors} from "./formatZodErrors.js";
import multer from "multer";
import {formatMulterError} from "./format-multer-eroors.js";


export function normalizeError(err, req) {
    if (err instanceof multer.MulterError) {

        const {code, message, details} = formatMulterError(err)
        return new AppError(message, 400, code, details);
    }

    if (err instanceof ZodError) {
        const details = formatZodErrors(err.issues)
        return new AppError('Validation failed', 400, 'VALIDATION_ERROR', details);
    }

    if (err instanceof AppError) return err;

    console.log(err)
    return new AppError('Internal server error', 500, 'INTERNAL_ERROR', err.stack, false);
}

