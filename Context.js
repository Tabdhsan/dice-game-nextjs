import { createContext, useState } from 'react';

const Context = createContext();

function ContextProvider({ children }) {
	const [gameStarted, setGameStarted] = useState(false);
	const [playerOne, setPlayerOne] = useState('');
	const [playerTwo, setPlayerTwo] = useState('');

	return (
		<Context.Provider
			value={{
				gameStarted,
				setGameStarted,

				playerOne,
				setPlayerOne,
				playerTwo,
				setPlayerTwo,
			}}
		>
			{children}
		</Context.Provider>
	);
}

export { ContextProvider, Context };
