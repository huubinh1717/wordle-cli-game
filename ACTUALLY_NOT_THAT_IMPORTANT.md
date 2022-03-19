# wordle-cli-game
cloned wordle's logic in a cli game using this wordlist "https://rhdzmota.com/files/wordle.json"

## I planned to make a web wordle clone but nahh I'm lazy so I made this instead
thanks to the provider of the previously mentioned link for the word list

*the game does not check if word is meaningful/in the list 'cause i dunno if the performance hit will be worth it,
but it is as easy as editting line 43 to if(guess.length !== 5 || !wordList.has(guess)){...}
