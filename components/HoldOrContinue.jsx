export default function HoldOrContinue({ holdFunc, continueFunc }) {
	return (
		<div className="space-x-4">
			<button
				className='bg-blue-400 rounded-xl p-2'
				onClick={holdFunc}
			>
				Hold
			</button>
			<button
				className='bg-blue-400 rounded-xl p-2'
				onClick={continueFunc}
			>
				Continue
			</button>
		</div>
	);
}
