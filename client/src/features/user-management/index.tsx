import Add from './components/Add';
import List from './components/List';
import ListById from './components/ListById';
import style from './styles.module.css';

function UserManagement() {
	return (
		<>
			<div className={style['flex-horizontal-between']}>
				<ListById />
				<Add />
			</div>
			<List />
		</>
	);
}

export default UserManagement;
