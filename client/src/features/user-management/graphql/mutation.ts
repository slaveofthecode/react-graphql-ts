import { gql } from '@apollo/client';

export const ADD_USER = gql`
	mutation ($name: String!, $age: Int!, $weight: Float, $isMarried: Boolean) {
		addUser(name: $name, age: $age, weight: $weight, isMarried: $isMarried) {
			id
			name
			age
			weight
			isMarried
		}
	}
`;
