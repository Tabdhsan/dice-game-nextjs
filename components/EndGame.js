import { Paper } from '@mui/material';
import { Context } from '/Context';
export default function EndGame({ winner }) {
	const { gameStarted } = useContext(Context);
	return (
		<Paper className='p-10 animate-bounce' elevation={4}>
			<div className='text-3xl font-bold'>{`${winner} Won!!`}</div>
		</Paper>
	);
}
