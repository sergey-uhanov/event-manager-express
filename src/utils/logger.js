import pino from 'pino';


const isProd = process.env.NODE_ENV === 'production';

export const logger = pino({
    level: process.env.LOG_LEVEL || 'info',

    ...(isProd
        ? {}
        : {
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    singleLine: true,
                },
            },
        }),

    formatters: {
        level(label) {
            return {level: label};
        },
    },

    timestamp: pino.stdTimeFunctions.isoTime,
});