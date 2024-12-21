# WORD puzzLE Helper

This webapp helps solve a popular word puzzle where one has six chances to guess a word chosen at random. After each turn, the computer provides feedback on each letter in a color-coded format:

- Green - the letter is the correct letter for that position in the word.
- Yellow - the letter is present in the word but not at this position.
- Gray - the letter is not present in the word.

Try it out here: [https://wordle.tommount.net](https://wordle.tommount.net)

# Using the App

In each turn, enter both the guess and the feedback received from whatever platform you're actually playing on. Under each letter is a swatch of colors. Click the color that your platform came back with for each letter. When all letters have been filled in and all feedback has been recorded, click "Submit."

The app will process each guess against the official word list and remove words based on the feedback. At the end of each round you will be told the percentage of the remaining words were eliminated and how many words are still possible.

The game ends when all letters are marked "green" or all six turns have been taken.

## What this app DOES do

This app WILL:

- start with an official word list of 5-letter words (excluding objectionable or obscene words);
- update that word list after each turn;
- offer feedback on the quality of the guess;
- optionally show the remaining words that can still be guessed.

## What this app DOES NOT do

This app WILL NOT:

- choose a starting word - this app isn't the game, it's a helper to the game;
- check if you entered an actual word or not;
- keep score from visit to visit - again, this app isn't the actual game.

# More Information

This app grew out of a command-line project I wrote a few years ago to play around with the idea of set theory in JavaScript/Typescript. That project is available [here](https://github.com/tmountjr/wordle_solver) if you want to play around with it. I can't guarantee all the steps necessary to run a raw Typescript project on your commandline; this is mostly for advanced users. I decided to put it online so I didn't have to keep running into my office to run the CLI whenever I wanted to work through a puzzle.

When building this frontend in [Next.js](https://nextjs.org), I took the word list in JSON format, as well as the [WordList.ts](https://github.com/tmountjr/wordle_solver/blob/main/WordList.ts) class and the [helpers.ts](https://github.com/tmountjr/wordle_solver/blob/main/helpers.ts) file (which provides the actual set operations) from the CLI and copied them over to the app (since the CLI isn't set up as an NPM module).
