import { Paper } from '@mui/material';
export default function EndGame({ winner }) {
	return (
		<Paper className='p-10 animate-bounce' elevation={4}>
			<div className='text-3xl font-bold'>{`${winner} Won!!`}</div>
		</Paper>
	);
}
