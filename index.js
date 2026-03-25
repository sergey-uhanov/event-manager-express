import 'dotenv/config';
import express from 'express';

import {errorHandler} from "./src/middlewares/error-handler.middleware.js";
import {notFoundHandler} from "./src/middlewares/not-found-handler.middleware.js";
import {httpLogger} from "./src/middlewares/requestLogger.middleware.js";
import routes from "./src/routes/index.js";



const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use(httpLogger);

app.use('/api', routes);


app.use(notFoundHandler);
app.use(errorHandler);


function startApp() {
    const server = app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

    server.on('error', (err) => {
        console.error('Server failed to start:', err);
        process.exit(1);
    });

    process.on('uncaughtException', (err) => {
        console.error({ err }, 'Uncaught Exception');
        process.exit(1);
    });

    process.on('unhandledRejection', (err) => {
        console.error({ err }, 'Unhandled Rejection');
        process.exit(1);
    });
}

startApp()