import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect ,useRef} from 'react';


function App() {

  const [length, SetLength] = useState(8);
  const [charallowed, SetCharallowed] = useState(false);
  const [numallowed, SetNumallowed] = useState(false);
  const[password,SetStoredPass]=useState("")

  const passwordref =useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass =" "
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numallowed) str+= "0123456789"
    if (charallowed)str+="!@#$%^&*()_+{}[]~"

for(let i=1;i<=length;i++){

  let char=Math.floor(Math.random()*str.length+1)
// in pass we storing some random special character 
  pass+=str.charAt(char)
}

SetStoredPass(pass)

  },[length,numallowed,charallowed,SetStoredPass])

  //saving /copying the password into clipboard
  const copypasswordToClipboard = useCallback(()=>{
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)},[password]
  )


useEffect(()=>{ passwordGenerator()},[length,numallowed,charallowed,
  SetStoredPass])
  return (
    <>

{/* <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-800 bg-gray-700">
        <h1 className="text-4xl text-center mx-4 my-4 text-white"> */}

    <div className='w-full max-w-md mx-auto shadow-md
    rounded-lg px-4 py-8 my-8 text-red-500 bg-gray-700'>Password Generator
  <div className='flex shadow
  rounded-lg overflow-hidden mb-4'>
    <input
    type='text'
    value={password}
    className='outline-none w-full py-1 px-3'
    placeholder='Password'
    readOnly
    ref={passwordref}
/>
<button 
onClick={copypasswordToClipboard}
className='outline-none bg-orange-700 text-white
px-3 py-0.5 shrink-0 '> copy
</button>
</div>


<div className='flex text-sm gap-x-2'>
  <div className='flex items-center gap-x-1'>
    <input
    type="range"
    min={6}
    max={100}
    value={length}
    className='cursor-pointer'
    onChange={(e) => {SetLength(e.target.value)}}
    />
    <label>Length:{length}</label>
  </div>

  <div className='flex items-center gap-x-1'>
    <input
    type="checkbox"
    defaultChecked={numallowed}
    id="numberInput"
    onChange={(e) => {
      SetNumallowed((prev) => !prev);
      }}
    />
    <label htmlFor="numberInput">Numbers</label>
  </div>

  <div className='flex items-center gap-x-1'>
    <input
    type="checkbox"
    defaultChecked={charallowed}
    id="characterInput"
    onChange={(e) => {
      SetCharallowed((prev) => !prev);
      }}
    />
    <label htmlFor="characterInput">Characters</label>
  </div>
</div>

  </div>
</>
  );
}

export default App;
