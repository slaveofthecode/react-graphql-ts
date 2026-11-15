import { skipToken, useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { GET_USER_BY_ID } from '../../graphql/query';
import style from './index.module.css';

interface User {
	id: string;
	name: string;
	age: number;
	weight?: number;
	isMarried?: boolean;
}

const ListById = () => {
	const [userId, setUserId] = useState('');
	const trimmedId = userId.trim();

	const { data, error, loading }: any = useQuery(
		GET_USER_BY_ID,
		trimmedId !== '' ? { variables: { id: trimmedId } } : skipToken,
	);

	const user: User = data?.getUserById;

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
							<div className={style['data-container']}>
								<ul>
									<li>
										<div>
											<strong>{user.name}</strong>
											{' | '}
											<span>{user.age} años</span>
											{' | '}
											<span>{user.weight} kg.</span>
											{' | '}
											<span>{user.isMarried ? '💞 married' : '🆓 single'}</span>
										</div>
									</li>
								</ul>
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
