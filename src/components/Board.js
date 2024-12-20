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
      message: ''
    }
  ])
  const [ gameOver, setGameOver ] = useState(false)
  const [ wordList, setWordList ] = useState(new WordList(['xxxxx']))

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
    const message = `This guess eliminated ${pctEliminated}% of words from the list. There are now ${newSize} valid words left.`

    // Store this guess operation in the main list.
    const newGuesses = [...guesses]
    newGuesses[index] = { id: index + 1, values, results, message }
    setGuesses(newGuesses)

    // Check if the game should be over.
    if (results.every(color => color === 'G')) {
      // Game is over if all letters are correctly placed.
      setGameOver(true)
    } else if (guesses.length < 6) {
      // If not all letters are placed AND we stil have guesses left to make...
      const nextValues = values.map((value, i) => (results[i] === "G" ? value : ""))
      const nextResults = results.map(result => (result === "G" ? "G" : "X"))
      setGuesses([
        ...newGuesses,
        {
          id: newGuesses.length + 1,
          values: nextValues,
          results: nextResults,
          message: ''
        }
      ])
    } else {
      // Not all letters are placed but we're out of guesses.
      setGameOver(true)
    }
  }

  return (
    <>
      <div className="space-y-2">
        {guesses.map((guess, index) => (
          <Guess
            key={guess.id}
            initialValues={guess.values}
            initialResults={guess.results}
            message={guess.message}
            onSubmit={(values, results) => handleGuessSubmit(index, values, results)}
          />
        ))}
        {gameOver && <div className="text-center text-green-500">Game Over!</div>}
      </div>
    </>
  )
}