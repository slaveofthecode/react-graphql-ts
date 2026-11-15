import { useMutation } from '@apollo/client/react';
import { type FormEvent, useState } from 'react';
import { ADD_USER } from '../../graphql/mutation';
import { GET_USERS } from '../../graphql/query';
import type { User } from '../../types';
import style from './index.module.css';

interface AddUserFormState {
	name: string;
	age: string;
	weight: string;
	isMarried: boolean;
}

interface AddUserData {
	addUser: User;
}

interface AddUserVars {
	name: string;
	age: number;
	weight?: number;
	isMarried: boolean;
}

interface GetUsersData {
	getUsers: User[];
}

const INITIAL_FORM: AddUserFormState = {
	name: '',
	age: '',
	weight: '',
	isMarried: false,
};

const Add = () => {
	const [newUser, setNewUser] = useState<AddUserFormState>(INITIAL_FORM);

	const [addUser, { loading, error }] = useMutation<AddUserData, AddUserVars>(
		ADD_USER,
		{
			update(cache, { data }) {
				if (!data?.addUser) return;

				cache.updateQuery<GetUsersData>(
					{ query: GET_USERS },
					(existingData) => {
						if (!existingData) return;
						return {
							getUsers: [...existingData.getUsers, data.addUser],
						};
					},
				);
			},
		},
	);

	const handleAddUser = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await addUser({
			variables: {
				name: newUser.name.trim(),
				age: Number(newUser.age),
				weight: newUser.weight !== '' ? Number(newUser.weight) : undefined,
				isMarried: newUser.isMarried,
			},
		});

		setNewUser(INITIAL_FORM);
	};

	return (
		<main className={style.main}>
			<h2>Add</h2>
			<form className={style['input-containers']} onSubmit={handleAddUser}>
				<input
					name="name"
					placeholder="name..."
					required
					value={newUser.name}
					onChange={(e) =>
						setNewUser((prev) => ({ ...prev, name: e.target.value }))
					}
				/>
				<input
					name="age"
					placeholder="age..."
					type="number"
					required
					className={style['input-short']}
					min={0}
					max={120}
					value={newUser.age}
					onChange={(e) =>
						setNewUser((prev) => ({ ...prev, age: e.target.value }))
					}
				/>
				<input
					name="weight"
					placeholder="weight"
					type="number"
					className={style['input-short']}
					min={0}
					max={1000}
					step={0.1}
					value={newUser.weight}
					onChange={(e) =>
						setNewUser((prev) => ({ ...prev, weight: e.target.value }))
					}
				/>
				<div>
					<label htmlFor="isMarried">Is married?</label>
					<input
						id="isMarried"
						name="isMarried"
						type="checkbox"
						checked={newUser.isMarried}
						onChange={(e) =>
							setNewUser((prev) => ({
								...prev,
								isMarried: e.target.checked,
							}))
						}
					/>
				</div>
				<button type="submit" disabled={loading}>
					{loading ? '...' : '+'}
				</button>
			</form>
			{error && <p>Error: {error.message}</p>}
		</main>
	);
};

export default Add;
