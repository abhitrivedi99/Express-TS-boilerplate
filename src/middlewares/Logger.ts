import { Request, Response, NextFunction } from 'express';
import { Logger } from '../helpers/Logger';

const logger = new Logger();

export default function MyMiddleware(req: Request, res: Response, next: NextFunction) {
	logger.info(`Request: ${req.method} ${req.url}`);
	next();
}
