export interface CustomError extends Error {
	// Add any additional properties you want to include
}

enum DB_TYPES {
	POSTGRES = 'postgres',
}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DB_TYPE: DB_TYPES;
			DB_HOST: string;
			DB_PORT: string;
			DB_USERNAME: string;
			DB_PASSWORD: string;
			DB_DATABASE: string;
			LOGGING: string;
			SYNCHRONIZE: string;
		}
	}
}
