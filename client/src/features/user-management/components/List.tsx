import { useQuery } from '@apollo/client/react';
import { GET_USERS } from '../graphql/query';
import type { User } from '../types';

const List = () => {
	const { data, error, loading }: any = useQuery(GET_USERS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	console.log('data', data);

	return (
		<main>
			<h2>Users</h2>
			<div>
				{data.getUsers.length ? (
					data.getUsers.map((user: User) => (
						<div key={user.id}>
							<p>
								<strong>{user.id}</strong> - <span>{user.name}</span>
							</p>
							<p>Is this user married ? {user.isMarried ? '💞' : '🆓'}</p>
						</div>
					))
				) : (
					<p>No results</p>
				)}
			</div>
		</main>
	);
};

export default List;
