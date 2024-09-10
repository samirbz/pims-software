"use client"
import React, { useState } from "react"

const InputWithSelect: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("") // Store input field value
  const [options] = useState<string[]>([
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
  ])
  const [showDropdown, setShowDropdown] = useState<boolean>(false) // Control dropdown visibility

  // Handle typing in the input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    setShowDropdown(true) // Show dropdown when typing
  }

  // Handle item selection from dropdown
  const handleSelect = (option: string) => {
    setInputValue(option) // Set the selected option as the input value
    setShowDropdown(false) // Close dropdown after selection
  }

  // Filter the options based on the input value
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  )

  return (
    <div className="relative mx-auto mt-10 w-64">
      <input
        type="text"
        value={inputValue} // Bind the input value to state
        onChange={handleInputChange} // Handle input change
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // Delay dropdown close on blur
        onFocus={() => setShowDropdown(true)} // Show dropdown on input focus
        placeholder="Select or type"
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {showDropdown && filteredOptions.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer px-4 py-2 hover:bg-blue-500 hover:text-white"
              onMouseDown={() => handleSelect(option)} // Handle selection on mouse down
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-2 text-gray-700">
        <p>Selected/Typed Value: {inputValue}</p>
      </div>
    </div>
  )
}

export default InputWithSelect
