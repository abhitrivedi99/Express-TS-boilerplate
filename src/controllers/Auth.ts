import { JsonController, Post, Body, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { User } from '../entities/User'; // Import your User entity
import { AppDataSource } from '../config/AppDataSource';
import { Logger } from '../helpers/Logger';
import { UserDTO } from '../dtos/User';

@JsonController('/v1/auth')
export class AuthController {
	private dbConnection: AppDataSource;
	private logger: Logger;

	constructor() {
		this.dbConnection = new AppDataSource();
		this.logger = new Logger();
	}

	@OpenAPI({
		summary: 'Create a new user',
		description: 'Creates a new user and returns the created user data.',
		responses: {
			'200': {
				description: 'User created successfully',
			},
		},
	})
	@ResponseSchema(UserDTO)
	@Post('/signup')
	@UseBefore()
	async signUp(@Body() user: UserDTO) {
		try {
			const userRepository = this.dbConnection.getRepository(User);
			const newUser = userRepository.create(user);
			await userRepository.save(newUser);

			this.logger.info(`User ${newUser.id} signed up successfully.`);

			return { message: 'Signup successful' };
		} catch (error) {
			this.logger.error(`Error during signup: ${(error as Error).message}`);
			throw new Error('Signup failed');
		}
	}
}
