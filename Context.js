import { createContext, useState } from 'react';

const Context = createContext();

function ContextProvider({ children }) {
	const [gameStarted, setGameStarted] = useState(false);
	const [playerOne, setPlayerOne] = useState('');
	const [playerTwo, setPlayerTwo] = useState('');
	const [finalScore, setFinalScore] = useState(20)

	return (
		<Context.Provider
			value={{
				gameStarted,
				setGameStarted,

				playerOne,
				setPlayerOne,
				playerTwo,
				setPlayerTwo,
				finalScore,
				setFinalScore
			}}
		>
			{children}
		</Context.Provider>
	);
}

export { ContextProvider, Context };
