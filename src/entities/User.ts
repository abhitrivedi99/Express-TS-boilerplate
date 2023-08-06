// src/entities/User.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id!: number; // Using the non-null assertion operator

	@Column()
	name: string = ''; // Initialize the property

	@Column()
	email: string = ''; // Initialize the property

	@Column()
	username?: string = 'defaultUsername'; // Set the default value here

	@Column()
	birthdate?: Date = new Date('2000-01-01');
}
