import 'reflect-metadata';
import express from 'express';
import { useExpressServer } from 'routing-controllers';
import expressWinston from 'express-winston';
import swaggerUi from 'swagger-ui-express';
import winston from 'winston';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';

import { AppDataSource } from './config/AppDataSource';
import { Logger } from './helpers/Logger';
import { AuthController } from './controllers/Auth';
import MyMiddleware from './middlewares/Logger';

export class App {
	private app: express.Application;
	private logger: Logger;
	private appDataStore: AppDataSource;

	constructor() {
		this.app = express();
		this.logger = new Logger();
		this.appDataStore = new AppDataSource();
	}

	public async initialize() {
		await this.appDataStore.initialize();

		this.setupMiddleware();
		this.setupControllers();
		this.setupSwagger();
		this.startServer();
	}

	private setupMiddleware() {
		this.app.use(
			expressWinston.logger({
				transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'logs/request.log' })],
				format: winston.format.combine(
					winston.format.timestamp(),
					winston.format.printf(({ timestamp, level, message }) => {
						return `${timestamp} [${level}]: ${message}`;
					}),
				),
				meta: false,
				expressFormat: true,
				colorize: true,
				winstonInstance: this.logger.logger, // Pass the Winston instance from Logger class
			}),
		);
	}

	private setupControllers() {
		useExpressServer(this.app, {
			controllers: [AuthController],
			middlewares: [MyMiddleware],
		});
	}

	private setupSwagger() {
		const storage = getMetadataArgsStorage();
		const spec = routingControllersToSpec(storage);
		this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
	}

	private startServer() {
		const PORT = process.env.PORT || 3000;
		this.app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	}
}
