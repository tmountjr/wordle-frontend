'use client'
import Guess from '@/components/Guess'
import { WordList } from '@/lib/WordList'
import { useState, useEffect } from "react"

export default function Board() {
  const [ guesses, setGuesses ] = useState([
    {
      id: 1,
      values: Array(5).fill(''),
      results: Array(5).fill('X'),
      message: '',
      disabled: Array(5).fill(false)
    }
  ])
  const [ gameOver, setGameOver ] = useState(false)
  const [ wordList, setWordList ] = useState(new WordList(['xxxxx']))
  const [ messageClasses, setMessageClasses ] = useState(['text-center'])
  const [ flyoutOpen, setFlyoutOpen ] = useState(false)

  useEffect(() => {
    const fetchWordlist = async () => {
      const response = await fetch('/wordlist.json')
      const data = await response.json()
      
      const wl = new WordList(data)
      setWordList(wl)
    }
    fetchWordlist()
  }, [])

  /**
   * Handle a submission from a Guess component.
   * @param {number} index The index of the Guess component.
   * @param {string[]} values The guessed values.
   * @param {string[]} results The results of this guess.
   */
  const handleGuessSubmit = (index, values, results) => {
    // Update the word list with the guess and results.
    // We can't easily clone the WordList class so we'll take the words property
    // and generate a new WordList instance from scratch.
    const oldSize = wordList.size
    wordList.processExternalResult(
      values.join("").toLowerCase(),
      results.map(r => r.toLowerCase())
    )
    const wordsRemaining = wordList.words
    const newWL = new WordList(wordsRemaining)
    setWordList(newWL)
    const newSize = wordList.size
    const wordsEliminated = oldSize - newSize
    const pctEliminated = ((wordsEliminated / oldSize) * 100).toFixed(2)
    const correctGuess = results.every(color => color === 'G')
    const message = correctGuess
      ? 'You guessed the word!'
      : `This guess eliminated ${pctEliminated}% of words from the list. There are now ${newSize} valid words left.`

    // Store this guess operation in the main list.
    const newGuesses = [...guesses]
    newGuesses[index] = { id: index + 1, values, results, message }
    setGuesses(newGuesses)

    // Check if the game should be over.
    if (correctGuess) {
      // Game is over if all letters are correctly placed.
      setMessageClasses([...messageClasses, 'text-green-500'])
      setGameOver(true)
    } else if (guesses.length < 6) {
      // If not all letters are placed AND we stil have guesses left to make...
      const nextValues = values.map((value, i) => (results[i] === "G" ? value : ""))
      const nextResults = results.map(result => (result === "G" ? "G" : "X"))
      const nextDisabled = results.map(result => result === "G")
      setGuesses([
        ...newGuesses,
        {
          id: newGuesses.length + 1,
          values: nextValues,
          results: nextResults,
          message: '',
          disabled: nextDisabled,
        }
      ])
    } else {
      // Not all letters are placed but we're out of guesses.
      setMessageClasses([...messageClasses, 'text-red-500'])
      setGameOver(true)
    }
  }

  return (
    <>
      <div className="space-y-2 w-full">
        {guesses.map((guess, index) => (
          <Guess
            key={guess.id}
            initialValues={guess.values}
            initialResults={guess.results}
            message={guess.message}
            onSubmit={(values, results) => handleGuessSubmit(index, values, results)}
            disabled={guess.disabled}
            previousValues={index > 0 ? guesses[index - 1].values : null}
          />
        ))}
        {gameOver && <div className={messageClasses.join(' ')}>Game Over!</div>}
      </div>
      <div className="mt-4">
        <a href="#" onClick={() => setFlyoutOpen(true)}>Click here to see remaining valid words.</a>
      </div>
      {flyoutOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-75 z-50" onClick={() => setFlyoutOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-1/3 bg-white dark:bg-gray-800 shadow-lg p-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button className="text-right text-gray-700 dark:text-gray-300" onClick={() => setFlyoutOpen(false)}>[Close]</button>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Remaining Valid Words</h2>
            <ul className="text-gray-700 dark:text-gray-300">
              {wordList.words.map((word, index) => (
                <li key={`word-${index}`}>{word}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}