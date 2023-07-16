import HoldOrContinue from '/components/HoldOrContinue';
import { Alert, Paper, Snackbar, Typography } from '@mui/material';
import { useRef, useState, useEffect, useReducer, useContext } from 'react';
import Dice from 'react-dice-roll';
import { Context } from '/Context';
import EndGame from './EndGame';

const diceReducer = (state, action) => {
	switch (action.type) {
		case 'leftRolled':
			return { ...state, leftDieValue: action.payload };
		case 'rightRolled':
			return { ...state, rightDieValue: action.payload };
		case 'clearDice':
			return { rightDieValue: 0, leftDieValue: 0 };

		default:
			throw new Error();
	}
};

export default function GameBoard() {
	const WINNING_SCORE = 20;
	const { playerOne, playerTwo, finalScore } = useContext(Context);
	const leftDice = useRef();
	const rightDice = useRef();

	const [diceStates, diceDispatch] = useReducer(diceReducer, {
		leftDieValue: 0,
		rightDieValue: 0,
		diceRolling: false,
	});

	const { leftDieValue, rightDieValue } = diceStates;

	const [showHoldOrContinue, setShowHoldOrContinue] = useState(false);

	const [playerOneTotalScore, setPlayerOneTotalScore] = useState(0);
	const [playerTwoTotalScore, setPlayerTwoTotalScore] = useState(0);
	const [turnScore, setTurnScore] = useState(0);
	const [turnActive, setTurnActive] = useState(false);
	const [activeUser, setActiveUser] = useState(playerOne);
	const [oneRolled, setOneRolled] = useState(false);
	const [winner, setWinner] = useState(false);
	const [isFirstTurn, setIsFirstTurn] = useState(true)
	const [turnTextToShow, setTurnTextToShow] = useState('Click Roll Dice to Start Game')

	const noOnesOrDoubles = () => {
		return (
			leftDieValue != 1 &&
			rightDieValue != 1 &&
			leftDieValue != rightDieValue
		);
	};

	const checkForValidDoubles = () => {
		return (
			leftDieValue == rightDieValue && leftDieValue + rightDieValue !== 2
		);
	};

	const onesRolled = () => {
		if (leftDieValue == 1 && rightDieValue == 1) {
			activeUser === playerOne
				? setPlayerOneTotalScore(0)
				: setPlayerTwoTotalScore(0);
		}
		setOneRolled(true);
	};

	const notActiveUser = playerOne == activeUser ? playerTwo : playerOne;

	useEffect(() => {
		if (oneRolled) {
			endTurn();
		}
	}, [oneRolled]);

	const gameLogic = () => {

		if (leftDieValue == 1 && rightDieValue == 1) {
			setTurnTextToShow(`OH NO!!! ${activeUser} Rolled Snake Eyes! ${activeUser} Loses All Their Points!`)
		} else if
			(leftDieValue == 1 || rightDieValue == 1) {
			setTurnTextToShow(`Oh No! ${activeUser} Rolled a One! ${notActiveUser}'s Turn to Roll!`)

		} else if (leftDieValue == rightDieValue) {

			setTurnTextToShow(`${activeUser} Rolled Doubles! Roll Again!`)
		} else {

			setTurnTextToShow('Hold or Continue?')
		}

		if (noOnesOrDoubles() == true) {
			setTurnScore(prevScore => prevScore + leftDieValue + rightDieValue);
			setShowHoldOrContinue(true);
		} else if (checkForValidDoubles() == true) {
			setTurnScore(prevScore => prevScore + leftDieValue + rightDieValue);
			setShowHoldOrContinue(false);
		} else {
			onesRolled();
		}
		diceDispatch({ type: 'clearDice' });
	};

	const takeTurn = () => {
		if (isFirstTurn) {
			setIsFirstTurn(false)
		}
		setTurnActive(true);
		leftDice.current?.rollDice();
		rightDice.current?.rollDice();
	};


	useEffect(() => {
		if (rightDieValue != 0) {
			gameLogic();
		}
	}, [rightDieValue]);

	const holdFunc = () => {
		setTurnTextToShow(`${activeUser} Chose to Hold. ${notActiveUser}'s Turn!`)
		endTurn();
	}



	const endTurn = () => {
		if (
			(playerTwoTotalScore + turnScore >= finalScore &&
				activeUser == playerTwo) ||
			(playerOneTotalScore + turnScore >= finalScore &&
				activeUser == playerOne)
		) {
			setWinner(activeUser);
			return;
		}

		if (!oneRolled) {
			activeUser == playerOne
				? setPlayerOneTotalScore(prevScore => prevScore + turnScore)
				: setPlayerTwoTotalScore(prevScore => prevScore + turnScore);
		}
		setTurnScore(0);
		setTurnActive(false);
		setShowHoldOrContinue(false);

		if (activeUser == playerOne) {
			setActiveUser(playerTwo);
		} else {
			setActiveUser(playerOne);
		}
		setTurnActive(false);
		setOneRolled(false);
	};
	return !winner ? (
		<Paper elevation={3} className='w-1/2 min-1/2 h-3/5 p-10'>
			<p className='text-3xl py-5 px-10 font-bold text-center'>Dice Game</p>
			<p className='text-center text-2xl px-10 py-3 '>{`${activeUser}'s Turn`}</p>
			<p className='text-center pb-10'>{`${activeUser} Turn Score So Far is ${turnScore}`}</p>

			<div className='flex'>
				<div className='flex space-x-10 mx-auto'>
					<Dice
						onRoll={value =>
							diceDispatch({
								type: 'leftRolled',
								payload: value,
							})
						}
						size='100'
						rollingTime='500'
						ref={leftDice}
						disabled
					/>
					<Dice
						ref={rightDice}
						onRoll={value =>
							diceDispatch({
								type: 'rightRolled',
								payload: value,
							})
						}
						size='100'
						rollingTime='500'
						disabled
					/>
				</div>
			</div>
			<div className='text-center'>
				<div className='h-24 flex items-center justify-center'>
					<Typography className='text-xl my-auto break-normal'>{turnTextToShow}</Typography>
				</div>
				{!showHoldOrContinue ? (
					<button
						className='text-center bg-blue-400 rounded-xl p-2'
						onClick={takeTurn}
					>
						{turnActive ? `ROLL AGAIN` : 'ROLL DICE'}
					</button>
				) : (
					<HoldOrContinue
						holdFunc={holdFunc}
						continueFunc={() => takeTurn()}
					/>
				)}
				<div className='mt-8'>
					<p className='text-2xl'>{`${playerOne} Total Score: ${playerOneTotalScore}`}</p>
					<p className='text-2xl'>{`${playerTwo} Total Score: ${playerTwoTotalScore}`}</p>
				</div>
			</div>
		</Paper>
	) : (
		<EndGame winner={winner} />
	);
}
