import { useState } from 'react';
import { skipToken, useQuery } from '@apollo/client/react';
import { GET_USER_BY_ID } from '../graphql/query';

interface User {
	id: string;
	name: string;
	age: number;
	weight?: number;
	isMarried?: boolean;
}

// interface GetUserByIdData {
// 	getUserById: User | null;
// }

// interface GetUserByIdVars {
// 	id: string;
// }

const ListById = () => {
	const [userId, setUserId] = useState('');
	const trimmedId = userId.trim();

	// const { data, error, loading } = useQuery<GetUserByIdData, GetUserByIdVars>(
	// 	GET_USER_BY_ID,
	// 	trimmedId !== '' ? { variables: { id: trimmedId } } : skipToken
	// );
	const { data, error, loading }: any = useQuery(
		GET_USER_BY_ID,
		trimmedId !== '' ? { variables: { id: trimmedId } } : skipToken
	);

	const user = data?.getUserById;

	return (
		<main>
			<h2>Find by ID</h2>
			<div>
				<input
					placeholder="id..."
					value={userId}
					onChange={(e) => setUserId(e.target.value)}
				/>
				<div>
					{loading && <p>Loading...</p>}
					{error && <p>Error: {error.message}</p>}

					{!loading &&
						!error &&
						trimmedId !== '' &&
						(user ? (
							<div>
								<p>
									<strong>{user.id}</strong> - <span>{user.name}</span>
								</p>
								<p>Is this user married? {user.isMarried ? '💞' : '🆓'}</p>
							</div>
						) : (
							<p>No results</p>
						))}
				</div>
			</div>
		</main>
	);
};

export default ListById;
