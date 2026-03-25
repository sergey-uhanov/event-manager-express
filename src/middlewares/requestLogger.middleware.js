import pinoHttp from 'pino-http';
import {randomUUID} from 'crypto';
import {logger} from "../utils/logger.js";


export const httpLogger = pinoHttp({
    logger,
    customLogLevel: (req, res, err) => {
        if (res.statusCode >= 500) return 'silent';
        if (res.statusCode >= 400) return 'warn';
        return 'info';
    },

    genReqId: (req, res) => {
        const existing = req.headers['x-request-id'];
        if (existing) return existing;

        const id = randomUUID();
        res.setHeader('x-request-id', id);
        return id;
    },

    // что логируем
    serializers: {
        req: (req) => ({
            method: req.method,
            url: req.url,
            id: req.id,
        }),
        res: (res) => ({
            statusCode: res.statusCode,
        }),
        err: pinoHttp.stdSerializers.err,
    },


    customSuccessMessage: (req, res) =>
        `${req.method} ${req.url} ${res.statusCode}`,

    customErrorMessage: (req, res, err) =>
        `${req.method} ${req.url} ERROR: ${err.message}`,
});