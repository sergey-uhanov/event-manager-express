
import {normalizeError} from "../utils/normalize-errors.js";




export function errorHandler(err, req, res, next) {
    const traceId = req.headers['x-request-id'] || req['traceId'];
    const normalized = normalizeError(err, req);



    const body = {
        error: {
            type: normalized.code?.toLowerCase() ?? 'error',
            message: normalized.isOperational ? normalized.message : 'Something went wrong',
            code: normalized.code,
            status: normalized.statusCode,
            timestamp: new Date().toISOString(),
            path: req.originalUrl,
            traceId,
            details: normalized.details
        }
    };
    console.log('error!!!!!!!!!!!!!!!!!!!!!')
    req.log.error(body);
     res.status(normalized.statusCode).send(body);
}