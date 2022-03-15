import { useContext } from 'react';
import GameBoard from '/components/GameBoard';
import PlayerCreation from '/components/PlayerCreation';
import { Context } from '/Context';

export default function Game() {
	const { gameStarted } = useContext(Context);

	return !gameStarted ? (
		<div className='grid place-items-center h-screen bg-red-400'>
			<PlayerCreation />
		</div>
	) : (
		<div className='grid place-items-center h-screen bg-red-400'>
			<GameBoard />
		</div>
	);
}
