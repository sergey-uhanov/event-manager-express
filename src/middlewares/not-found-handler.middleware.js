import {AppError} from "../utils/app-error.js";


export function notFoundHandler(req, res, next) {
    next(
        new AppError(
            'Route not found',
            404,
            'NOT_FOUND'
        )
    );
}