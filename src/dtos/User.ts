import { IsString, IsEmail, IsOptional, ValidateIf, IsDate } from 'class-validator';

export class MultiPurposeDTO {
	@IsString()
	@IsEmail()
	@ValidateIf((o) => o.scenario === 'email')
	email?: string;

	@IsString()
	@IsOptional()
	@ValidateIf((o) => o.scenario === 'username')
	username?: string;

	// Add other properties and validations as needed
}

export class UserDTO {
	@IsOptional()
	id: number = 1;

	@IsString()
	name: string = ''; // Initialize the property

	@IsEmail()
	email: string = '';

	@IsString()
	@IsOptional()
	username?: string = 'defaultUsername'; // Set the default value here

	@IsDate()
	@IsOptional()
	birthdate?: Date = new Date('2000-01-01');
}
