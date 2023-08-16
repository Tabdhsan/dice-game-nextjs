import { TextField, Paper, Button } from '@mui/material';
import { useContext, useState } from 'react';
import { Context } from '/Context';
import selectSound from '../public/sounds/select.mp3';
import useSound from 'use-sound';

export default function PlayerCreation() {
	const { setGameStarted, playerOne, setPlayerOne, playerTwo, setPlayerTwo, finalScore, setFinalScore } =
		useContext(Context);


	const [playerOneError, setPlayerOneError] = useState(false)
	const [playerTwoError, setPlayerTwoError] = useState(false)
	const [finalScoreError, setFinalScoreError] = useState(false)

	const [play] = useSound(selectSound);




	const startGame = () => {
		setPlayerOneError(false);
		setPlayerTwoError(false);
		setFinalScoreError(false)

		if (!playerOne) {
			setPlayerOneError(true);
			return;
		}

		if (!playerTwo) {
			setPlayerTwoError(true);
			return;
		}

		if (playerOne == playerTwo) {
			setPlayerTwo(prev => prev + '_2');
		}

		if (!/^[0-9]*$/.test(finalScore) || Number(finalScore) <= 0) {
			setFinalScoreError(true);
			return;
		}

		play();
		setGameStarted(true);
	};


	return (
		<Paper elevation={4} className='p-7' sx={{ borderRadius: '1rem' }}>
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
						error={playerOneError}
						helperText={playerOneError && 'Please enter a name for player 1'}
					>
						Enter Player One Name
					</TextField>
					<TextField
						label='Player 2'
						value={playerTwo}
						onChange={e => setPlayerTwo(e.target.value.trim())}
						error={playerTwoError}
						helperText={playerTwoError && 'Please enter a name for player 2'}
					>
						Enter Player One Name
					</TextField>
					<TextField
						label='Final Score'
						value={finalScore}
						onChange={(e) => setFinalScore(e.target.value.trim())}
						error={finalScoreError}
						helperText={finalScoreError && 'Please enter a valid number greater than 0'}
					>
						Set Final Score
					</TextField>
				</div>
				<div className='w-full flex'>
					<div className='flex flex-grow' />
					<Button
						className='bg-blue-400 rounded-xl p-3 m-2 font-bold text-white mx-auto hover:bg-blue-500'
						onClick={e => {
							e.preventDefault();
							startGame();
						}}
					>
						Ready?
					</Button>
					<div className='flex flex-grow' />
				</div>
			</form>
		</Paper>
	);
}
