# wordle-cli-game

cloned wordle's logic in a cli game using this wordlist "https://rhdzmota.com/files/wordle.json"

## I planned to make a web wordle clone but nahh I'm lazy so I made this instead

thanks to the provider of the previously mentioned link for the word list

\*the game does not check if word is meaningful/in the list 'cause i dunno if the performance hit will be worth it,
but it is as easy as editting line 43 to:

```ts
// can be just the part after || but i think if it not > 5 char,
// it would not check the second condition and better perf?
if(guess.length !== 5 || !wordList.includes(guess)){...}
```

# ---------------------------------

# DevLog?:) : BUGs :(

## #1: Even new features of JS have use cases, look at you

so there is this peace of code(not shit, like you if you laugh):
```ts
const turns: number = numTurns ? numTurns : 6
```
stupid I know, even if it was not making infinite game loops, it would still be stupid cause it should just simply be 
```ts
// cleaner implementaion but same error cause 0(and ""(empty string)) is a null value in JS
const turns: number = numTurns || 6
```
but guess what, it does cause infinate game loop:( (oh and just like 2 lines below I repeated the clunky long code for intializing chosen word but forgot to fix 
and now do not want to mess up commit mess, it is not wrong soooooo, use ur imagination ok)
#### fixx: 
```ts
// nullish coellesing opperator (??) return true even for 0 and ""
const turns: number = numTurns ?? 6
```
### reminder to future self: nullish coellesing is great, unlike you:( 
