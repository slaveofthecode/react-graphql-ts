import { gql } from '@apollo/client';

export const GET_USERS = gql`
	query {
		getUsers {
			id
			name
			age
			weight
			isMarried
		}
	}
`;

export const GET_USER_BY_ID = gql`
	query ($id: ID!) {
		getUserById(id: $id) {
			id
			name
			age
			weight
			isMarried
		}
	}
`;
