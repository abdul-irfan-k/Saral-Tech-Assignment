import express from 'express';
import bodyParser from 'body-parser';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { ErrorHandler } from '@lib/middleware/error-handler';
import authRouter from '@router/user-auth';

const app = express();

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

const corsOptions = {
  origin: frontendUrl,
  credentials: true,
  // optionSuccessStatus: 200,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser());

app.use('/api/auth/', authRouter);
app.use(ErrorHandler);
export { app };
