import winston from 'winston';

export class Logger {
	public logger: winston.Logger;

	constructor() {
		this.logger = winston.createLogger({
			level: 'info',
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.printf(({ timestamp, level, message }) => {
					return `${timestamp} [${level}]: ${message}`;
				}),
			),
			transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), new winston.transports.File({ filename: 'logs/combined.log' })],
		});
	}

	public info(message: string): void {
		this.logger.info(message);
	}

	public warn(message: string): void {
		this.logger.warn(message);
	}

	public error(message: string): void {
		this.logger.error(message);
	}

	// Add more methods if needed
}
