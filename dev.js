var uInput = require('prompt-sync')({ sigint: true });
var generate = function (wList) {
	console.clear();
	console.log('initiating...');
	var word = wList[Math.floor(Math.random() * wList.length)];
	console.log("let's roll");
	return word;
};
var validate = function (guess, word) {
	var res = [];
	for (var i = 0; i < guess.length; i++) {
		for (var j = 0; j < word.length; j++) {
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
	setTimeout(function () {
		console.clear();
		return;
	}, 3000);
}
function ifContinue() {
	switch (uInput('wanna continue playing?(y/n): ').toLowerCase()) {
		case 'y':
			game(wList);
			return;
		case 'n':
			endGame();
	}
}
function game(wordList, word, numTurns) {
	var turns = numTurns !== null && numTurns !== void 0 ? numTurns : 6;
	var done = false;
	var chosenOne = word ? word : generate(wordList);
	if (turns === 6) {
		console.log('you have '.concat(turns, ' turns \n'));
	}
	console.log('\n');
	var guess = uInput('guess(5-letter, meaningful): ');
	var result = validate(guess, chosenOne);
	console.log('your guess: ', guess);
	// console.log('word: ', chosenOne);
	if (guess === chosenOne) {
		console.log('\n\nYOU WINNNN!!!🎆😍😆\n');
		done = true;
		ifContinue();
		return 0;
	}
	if (guess.length !== 5) {
		console.log('invalid guess 😞😢, try inputting a 5-letter word');
		game([], chosenOne, turns);
		return 0;
	}
	if (turns > 0 && !done) {
		turns -= 1;
		console.log('result: ', result);
		if (turns === 0) {
			console.log(
				'\n\nAwww bad luck!\uD83D\uDE22\uD83D\uDE1E\uD83D\uDE3F it was: '.concat(
					chosenOne,
					'\n',
				),
			);
			done = true;
			ifContinue();
			return 0;
		}
		console.log('remaining turn(s): ', turns);
		if (!done) {
			game([], chosenOne, turns);
		}
	}
	return 0;
}
var wList = require('./words.json').data;
game(wList);
