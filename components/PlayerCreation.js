// FIXME Add textfield errors
import { TextField, Paper } from '@mui/material';
import { useContext, useState } from 'react';
import { Context } from '/Context';

export default function PlayerCreation() {
	const { setGameStarted, playerOne, setPlayerOne, playerTwo, setPlayerTwo } =
		useContext(Context);

	const startGame = () => {
		playerOne && playerTwo && setGameStarted(true);
	};

	return (
		<Paper elevation={4} className='p-7'>
			<p className='mb-4 text-center'>You Will Need 2 Players!</p>
			<form
				onSubmit={e => {
					e.preventDefault();
					if (playerOne == playerTwo) {
						setPlayerTwo(prev => prev + '_2');
					}
					startGame();
				}}
			>
				<div className='flex flex-col space-y-5'>
					<TextField
						label='Player 1'
						value={playerOne}
						onChange={e => setPlayerOne(e.target.value.trim())}
					>
						Enter Player One Name
					</TextField>
					<TextField
						label='Player 2'
						value={playerTwo}
						onChange={e => setPlayerTwo(e.target.value.trim())}
					>
						Enter Player One Name
					</TextField>
				</div>
				<div className='w-full flex'>
					<div className='flex flex-grow' />
					<button
						className='bg-blue-400 rounded-xl p-3 m-2 font-bold text-white mx-auto hover:bg-blue-500'
						onClick={e => {
							e.preventDefault();
							if (playerOne == playerTwo) {
								setPlayerTwo(prev => prev + '_2');
							}
							startGame();
						}}
					>
						Ready?
					</button>
					<div className='flex flex-grow' />
				</div>
			</form>
		</Paper>
	);
}
