import { useState } from 'react';
import type { User } from '../types';
import { useMutation } from '@apollo/client/react';
import { ADD_USER } from '../graphql/mutation';
import { GET_USERS } from '../graphql/query';

type NewUser = Omit<User, 'id'>;

const Add = () => {
	const [newUser, setNewUser] = useState<NewUser>();

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
		<main>
			<h2>Add</h2>
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
				<button type="button" onClick={handleAddUser}>
					+
				</button>
			</div>
		</main>
	);
};

export default Add;
