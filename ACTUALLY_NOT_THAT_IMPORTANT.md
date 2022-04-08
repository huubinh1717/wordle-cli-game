# WORDLE_CLI_GAME

cloned wordle's logic in a cli game using this wordlist
"https://rhdzmota.com/files/wordle.json"

#### you can play by downloading the suitable executable for you os and run(if you trust a random guy on the internet with his .exe) it's is not really the point to this project though cause honestly it sucks ass and is just a little excercise for me.

## I planned to make a web wordle clone but nahh I'm lazy so I made this instead

thanks to the provider of the previously mentioned link for the word list

\*the game does not check if word is meaningful/in the list 'cause i dunno if
the performance hit will be worth it, but it is as easy as editing line 43 to:

```ts
// can be just the part after || but i think if it not > 5 char,
// it would not check the second condition and better perf?
if(guess.length !== 5 || !wordList.includes(guess)){...}
```

# ---------------------------------

# DevLog?:) : BUGs :(

## #1: Even new features of JS have use cases, look at you

so there is this piece of code(not shit(you if you laughed(sorry))):

```ts
const turns: number = numTurns ? numTurns : 6;
```

stupid I know, even if it was not making infinite game loops, it would still be
stupid cause it should just simply be

```ts
// cleaner implementaion but same error
// (oh and just like 2 lines below I repeated the clunky long code for intializing chosen word
// but forgot to fix and now do not want to mess up commit mess, it is not wrong though soooooo,
// use ur imagination ok)

const turns: number = numTurns || 6;
```

but guess what, it does cause infinate game loop:( since 0(and ""(empty string))
is a null value in JS

#### fixx:

```ts
// nullish coellesing opperator (??) return true even for 0 and ""
const turns: number = numTurns ?? 6;
```

### reminder to future self: nullish coellesing is great, unlike you:(

## #2: Recursion messed me up (wtf is with me and infinite game loops)

I've noticed that the program sometimes loop instead of ending when player sucks
and cannot guess, i brushed it off cause uncertain of what the problem was and
thought it was something to do with the hardware(obviously not and definitely
stupid) i was assured by the fact that it scarcely came up again while testing.
But oh am i dumb. turns out it was the recursion i use to check if word is
valid, if its not, invoke the main again but i forgot to return in the if
statement:( that's also why it did not came up in testing, i did not check the
case the player input invalid words. next time i should remember to return
recursive functions:(

#### fix is as easy as:

```ts
if (guess.length !== 5) {
	console.log('invalid guess 😞😢, try inputting a 5-letter word');
	main([], chosenOne, turns);
	return 0; // * new line
}
```

### reminder to future self: unlike you, the program is unlikely wrong, don't blame

## 3: Recursion is still trippy af

while adding the the feature to continue playing, i came up with these funcs

```ts
function endGame() {
	console.log('wait 3 secs, term will clear');
	setTimeout(() => {
		console.clear();
		return;
	}, 3000);
}

function ifContinue() {
	switch (uInput('wanna continue playing?(y/n): ').toLowerCase()) {
		case 'y':
			game(wList);
		// return;    added later as fix
		case 'n':
			endGame();
	}
}
// result: prints "wait 3 secs, term will clear" multiple times
```

it would run when you win or lose, but since i'm bad at recursion, i overlooked
the fact that when U want to replay, the second func would be running, while the
first would wait for return of second func, if i do not escape the second func,
the uInput actually is now n so 2 endGame is called

#### fix: add return like the code above

### reminder to future self: when there's a recursion bug, it's prob a missing return(easily fixable, unlike you)
