import { Paper } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSound from 'use-sound';
import selectSound from '../public/sounds/select.mp3';

export default function Home() {
	const router = useRouter();
	const [play] = useSound(selectSound);

	const handleClick = () => {
		play();
		router.push('/Game');
	};

	return (
		<div className='grid place-items-center h-screen bg-red-400'>
			<Head>
				<title>Dice Dash: Point Pursuit</title>
			</Head>
			<Paper
				elevation={4}
				className='p-10 font'
				sx={{ borderRadius: '1rem' }}
			>
				<div className='space-y-6'>
					<h1 className='text-6xl font-bold text-center font-funFont text-red-400'>
						Dice Dash: Point Pursuit
					</h1>
					<p>
						<strong>Gameplay</strong>
					</p>
					<ul className='list-disc ml-6'>
						<li>Each player starts with 0 points</li>
						<li>
							On your turn, roll the die repeatedly until either:
						</li>
						<ul className='list-disc ml-6'>
							<li>You roll a 1: Score nothing this turn</li>
							<li>
								You choose to hold: Add up all rolls this turn
								and add to your score
							</li>
						</ul>
						<li>If you roll a 1, your turn ends</li>
						<li>
							If you hold, your turn ends and you add the rolls to
							your score
						</li>
						<li className='text-red-500'>
							If you roll snake eyes (double 1s), you lose ALL
							your points
						</li>
						<li>
							First to reach the alloted amount of points wins
						</li>
					</ul>
					<div className='w-100 text-center'>
						<button
							className='text-3xl shadow-3xl bg-gray-300 hover:bg-gray-400 p-3 rounded-2xl mx-auto'
							onClick={handleClick}
						>
							Click Here To Play!
						</button>
					</div>
				</div>
			</Paper>
		</div>
	);
}
