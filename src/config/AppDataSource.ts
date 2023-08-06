import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../entities';
import './Types';

dotenv.config();

export class AppDataSource extends DataSource {
	constructor() {
		super({
			type: process.env.DB_TYPE,
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [User],
			logging: false,
			synchronize: true,
		});
	}
}
