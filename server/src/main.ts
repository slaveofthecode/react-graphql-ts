import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { users } from '../data/db.ts';

interface User {
	id: string;
	name: string;
	age: number;
	weight: number;
	isMarried: boolean;
}

const typeDefs = `
    type Query { 
        getUsers: [User]
        getUserById(id: ID!): User
    }

    type Mutation { 
        addUser(name: String!, age: Int!, weight: Float, isMarried: Boolean):User
    }

    type User {
        id: ID
        name: String
        age: Int
        weight: Float
        isMarried: Boolean
    }
`;

const resolvers = {
	Query: {
		getUsers: (): User[] => {
			return users;
		},
		getUserById: (parent: any, args: { id: any }): User | undefined => {
			const { id } = args;
			return users.find((user) => user.id === id);
		},
	},
	Mutation: {
		addUser: (
			parent: any,
			args: { name: string; age: number; weight: number; isMarried: boolean },
		): User => {
			const { name, age, weight, isMarried } = args;
			const newUser: User = {
				id: (users.length + 1).toString(),
				name,
				age,
				weight,
				isMarried,
			};
			console.log(`SERVER: new user ${JSON.stringify(newUser)}`);
			users.push(newUser);

			return newUser;
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log(`Server is running at ${url}`);
