const uInput = require('prompt-sync')({ sigint: true });

const generate = (wList): string => {
	console.clear();
	console.log('initiating...');
	const word: string = wList[Math.floor(Math.random() * wList.length)];
	console.log("let's roll");
	return word;
};

const validate = (guess: string, word: string): number[] => {
	let res: number[] = [];
	for (let i = 0; i < guess.length; i++) {
		for (let j = 0; j < word.length; j++) {
			if (guess[i] === word[j] && i === j) {
				res[i] = 2;
			}
			if (!res[i] && guess[i] === word[j] && i !== j) {
				res[i] = 1.5;
			}
		}
		if (!res[i]) {
			res[i] = 1;
		}
	}
	return res;
};

function endGame() {
	console.log('wait 3 secs, term will clear');
	setTimeout(() => {
		console.clear();
		return;
	}, 3000);
}

function ifContinue() {
	const input = uInput('wanna continue playing?(y/n): ').toLowerCase().trim();
	if (input === 'y') {
		game(wList);
		return;
	}
	if (input === 'n') {
		endGame();
		return;
	} else {
		ifContinue();
		return;
	}
}

function game(wordList?: string[], word?: string, numTurns?: number) {
	let turns: number = numTurns ?? 6;
	let done: boolean = false;
	const chosenOne: string = word ? word : generate(wordList);
	if (turns === 6) {
		console.log(`you have ${turns} turns \n`);
	}
	console.log('\n');
	const guess: string = uInput('guess(legitimate, 5-letter): ')
		.toLowerCase()
		.trim();
	const result: number[] = validate(guess, chosenOne);
	console.log('your guess: ', guess);
	// console.log('word: ', chosenOne);

	if (guess === chosenOne) {
		console.log('\n\nYOU WINNNN!!!🎆😍😆\n');
		done = true;
		ifContinue();
		return 0;
	}

	if (
		guess.length !== 5 ||
		guess.includes(' ') ||
		!wordList.includes(guess)
	) {
		console.log(
			'invalid guess 😞😢, try inputting a meaningful 5-letter word ',
		);
		game(wordList, chosenOne, turns);
		return 0;
	}
	if (turns > 0 && !done) {
		turns -= 1;
		console.log('result: ', result);
		if (turns === 0) {
			console.log(`\n\nAwww bad luck!😢😞😿 it was: ${chosenOne}\n`);
			done = true;
			ifContinue();
			return 0;
		}
		console.log('remaining turn(s): ', turns);
		if (!done) {
			game(wordList, chosenOne, turns);
		}
	}
	return 0;
}

const { data: wList }: { data: string[] } = require('./words.json');

game(wList);
