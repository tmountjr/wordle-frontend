import { useState, useRef, useEffect } from 'react'

export default function Guess({ initialValues, initialResults, onSubmit, message, disabled }) {
  const [ values, setValues ] = useState(initialValues)
  const [ results, setResults ] = useState(initialResults)
  const [ submitted, setSubmitted ] = useState(false)
  const inputRefs = useRef([])

  useEffect(() => {
    setValues(initialValues)
    setResults(initialResults)
  }, [initialValues, initialResults])

  const handleChange = (e, index) => {
    const newValues = [...values]
    newValues[index] = e.target.value.toUpperCase()
    setValues(newValues)

    if (e.target.value && index < 4) {
      let nextIndex = index + 1
      while (nextIndex < 5 && disabled[nextIndex]) {
        nextIndex++
      }
      if (nextIndex < 5) {
        inputRefs.current[nextIndex].focus()
      }
    }
  }

  const getColorClass = (color) => {
    switch (color) {
      case 'G':
        return 'bg-green-500'
      case 'Y':
        return 'bg-yellow-500'
      case 'X':
      default:
        return 'bg-gray-300 dark:bg-gray-700 dark:text-white'
    }
  }

  const handleColorChange = (index, color) => {
    const newResults = [...results]
    newResults[index] = color
    setResults(newResults)
  }

  const handleSubmit = () => {
    const allFilled = values.every(value => /^[A-Z]$/.test(value))
    if (allFilled) {
      setSubmitted(true)
      onSubmit(values, results)
    } else {
      alert('Please fill in all fields for this guess with letters (A-Z).')
    }
  }

  return (
    <>
      <div className="space-y-4 flex flex-col">
        <div className="grid grid-cols-5 gap-4">
          {values.map((value, index) => (
            <div key={`container-${index}`} className="flex flex-col items-center">
              <input
                key={`letter-${index}`}
                ref={(el) => inputRefs.current[index] = el}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e, index)}
                className={`w-12 h-12 text-center text-xl border-2 focus:outline-none border-gray-300 focus:border-blue-500 rounded-md ${getColorClass(results[index])} text-black`}
                disabled={submitted || disabled[index]}
                tabIndex={index + 1}
              />
              {!submitted && !disabled[index] && (
                <div className="flex space-x-1 mt-2">
                  <button
                    onClick={() => handleColorChange(index, 'G')}
                    className="w-4 h-4 bg-green-500 rounded-full"
                    tabIndex={6 + index * 3 + 1}
                  >
                  </button>
                  <button
                    onClick={() => handleColorChange(index, 'Y')}
                    className="w-4 h-4 bg-yellow-500 rounded-full"
                    tabIndex={6 + index * 3 + 2}
                  >
                  </button>
                  <button
                    onClick={() => handleColorChange(index, 'X')}
                    className="w-4 h-4 bg-gray-300 rounded-full"
                    tabIndex={6 + index * 3 + 3}
                  >
                  </button>
                </div>
              )}
            </div> 
          ))}
        </div>
        {!submitted && (
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-blue-500 text-white rounded-md"
          >
            Submit
          </button>
        )}
        {submitted && message && (
          <div className="text-center text-gray-700 dark:text-gray-400">
            {message}
          </div>
        )}
      </div>
    </>
  )
}