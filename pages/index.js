import { Paper } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
	const router = useRouter();

	return (
		<div className='grid place-items-center h-screen bg-red-400'>
			<Head>
				<title>Pig</title>
			</Head>
			<Paper elevation={4} className='p-10'>
				<div className='text-center space-y-6'>
					<h1 className='text-4xl font-bold'>Pig</h1>
					<button
						className='text-3xl shadow-3xl bg-gray-300 hover:bg-gray-400 p-3 rounded-2xl'
						onClick={() => router.push('/Game')}
					>
						Click Here To Play!
					</button>
				</div>
			</Paper>
		</div>
	);
}
