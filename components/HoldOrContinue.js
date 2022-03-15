export default function HoldOrContinue({ holdFunc, continueFunc }) {
	return (
		<div className='mb-5'>
			<p className='mt-7'>Would You Like To Hold or Continue?</p>
			<div className='space-x-4 space-y-4'>
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
		</div>
	);
}
