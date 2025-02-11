import React,{ useCallback, useEffect, useState, useRef } from 'react'

function App() {
  const [length,setLength] = useState(8)
  const [numbersAllowed,setNumbersallowed] = useState(false)
  const [charAllowed,setCharallowed] = useState(false)
  const [password,setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if(numbersAllowed) str += "1234567890";
        if(charAllowed) str += "!@#$%^&*(){}[]~`-+-=|";

        for (let i = 0; i < length; i++) {
          let char = Math.floor(Math.random() * str.length + 1)
          pass += str.charAt(char);
        }
        setPassword(pass);
  },
    [length,numbersAllowed,charAllowed,setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])    

  // useRef
  const passwordRef = useRef(null)

  useEffect(() => {
    passwordGenerator();
  },[length,numbersAllowed,charAllowed,setPassword]);


  return (
    <div className="w-full max-w-md mx-auto 
    shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
         <h1 className='text-white text-center my-3'>
              Password generator
        </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
      />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
      </div>
  <div className='flex text-sm gap-x-4'>
    <div className='flex items-center gap-x-'>
          <input 
          type="range"
          min={6}
          max={50}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
    </div>
    <div className="flex items-center gap-x-1">
        <input
            type="checkbox"
            defaultChecked={numbersAllowed}
            id="numberInput"
            onChange={() => {
                setNumbersallowed((prev) => !prev);
            }}
        />
        <label htmlFor="numberInput">Numbers</label>
    </div>
    <div className="flex items-center gap-x-1">
        <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharallowed((prev) => !prev )
            }}
        />
        <label htmlFor="characterInput">Characters</label>
    </div>
  </div> 
</div>
  )
}

export default App
