import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import './App.css';
import { useState } from 'react';

interface User {
	id: string;
	name: string;
	age: number;
	weight?: number;
	isMarried?: boolean;
}

type NewUser = Omit<User, 'id'>;

const GET_USERS = gql`
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

const GET_USER_BY_ID = gql`
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
//         addUser(name: String!, age: Int!, weight: Float, isMarried: Boolean):User
const ADD_USER = gql`
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

function App() {
	const [newUser, setNewUser] = useState<NewUser>();

	const { data, error, loading }: any = useQuery(GET_USERS);
	const {
		data: getUserByIdData,
		// error: getUserByIdError,
		loading: getUserByIdLoading,
	}: any = useQuery(GET_USER_BY_ID, {
		variables: {
			id: '2',
		},
	});

	const [addUser] = useMutation(ADD_USER, {
		update(cache, { data }: { data: any }) {
			if (!data?.addUser) return;

			cache.updateQuery({ query: GET_USERS }, (existingData: any) => {
				if (!existingData) return;
				return {
					getUsers: [...existingData.getUsers, data.addUser],
				};
			});
		},
	});

	if (loading) return <p>Data loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const handleAddUser = async () => {
		console.log(newUser);
		addUser({
			variables: {
				name: newUser.name,
				age: +newUser.age,
				weight: +newUser.weight,
				isMarried: newUser.isMarried,
			},
		});
	};

	return (
		<>
			<h1>Users</h1>
			<main>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '12px',
						flexWrap: 'wrap',
					}}
				>
					{data.getUsers.map((user: User) => (
						<div
							key={user.id}
							style={{
								backgroundColor: 'rgba(0,0,0,.5',
								padding: '1rem',
								borderRadius: '12px',
								textAlign: 'left',
								boxShadow: '0px 0px 15px 0px rgba(255,255,255,.25)',
							}}
						>
							<p>
								<strong>{user.id}</strong> - <span>{user.name}</span>
							</p>
							<p>Is this user married ? {user.isMarried ? '🤦🏻‍♂️' : '😜'}</p>
						</div>
					))}
				</div>

				<div>
					<h1>User by Id</h1>
					<input placeholder="Put here the id to find..." />
					<div>
						{getUserByIdLoading ? (
							<p>Loading user...</p>
						) : (
							<div
								style={{
									backgroundColor: 'rgba(0,0,0,.5',
									padding: '1rem',
									borderRadius: '12px',
									textAlign: 'left',
									boxShadow: '0px 0px 15px 0px rgba(255,255,255,.25)',
								}}
							>
								<p>
									<strong>{getUserByIdData.getUserById.id}</strong> -{' '}
									<span>{getUserByIdData.getUserById.name}</span>
								</p>
								<p>
									Is this user married ?{' '}
									{getUserByIdData.getUserById.isMarried ? '🤦🏻‍♂️' : '😜'}
								</p>
							</div>
						)}
					</div>
				</div>

				<div>
					<h1>Add User</h1>
					<div>
						<input
							placeholder="name..."
							required
							onChange={(e) =>
								setNewUser((prev) => ({ ...prev, name: e.target.value }))
							}
						/>
						<input
							placeholder="age..."
							type="number"
							required
							onChange={(e) =>
								setNewUser((prev: any) => ({
									...prev,
									age: e.target.value,
								}))
							}
						/>
						<input
							placeholder="weigh"
							type="number"
							onChange={(e) =>
								setNewUser((prev: any) => ({ ...prev, weight: e.target.value }))
							}
						/>
						<div>
							<label htmlFor="isMarried">Is married?</label>
							<input
								id="isMarried"
								type="checkbox"
								onChange={(e) =>
									setNewUser((prev) => ({
										...prev,
										isMarried: e.target.checked,
									}))
								}
							/>
						</div>
					</div>
					<div>
						<button onClick={handleAddUser}>+</button>
					</div>
				</div>
			</main>
		</>
	);
}

export default App;
