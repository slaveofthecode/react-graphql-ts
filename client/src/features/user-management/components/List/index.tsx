import { useQuery } from '@apollo/client/react';
import { GET_USERS } from '../../graphql/query';
import type { User } from '../../types';
import style from './index.module.css';

const List = () => {
	const { data, error, loading }: any = useQuery(GET_USERS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<main>
			<h2>Users</h2>
			<div className={style['list-container']}>
				{data.getUsers.length ? (
					data.getUsers.map((user: User) => (
						<div key={user.id} className={style.row}>
							<div>
								<strong>{user.id}</strong>
							</div>
							<div>
								<span>{user.name}</span>
							</div>
							<div>
								<p>{user.isMarried ? '💞 married' : '🆓 single'}</p>
							</div>
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
