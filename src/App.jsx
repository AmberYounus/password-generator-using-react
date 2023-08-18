import React, { useRef, useState } from 'react';
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from './Character.';
import { messageFail, messageSuccess } from './Message';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
<React.StrictMode></React.StrictMode>

const App = () => {
  const ToastContainerRef = useRef()
  const [password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(26)
  const [includeUpperCaseLetters, setIncludeUpperCaseLetters] = useState(false)
  const [includeLowerCaseLetters, setIncludeLowerCaseLetters] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSpecialSymbols, setIncludeSpecialSymbols] = useState(false)

  const handleGeneratePassword = () => {
    if (!includeUpperCaseLetters && !includeLowerCaseLetters && !includeNumbers && !includeSpecialSymbols) {
      notify("To generate password you must select atleast one checkbox", true)
    }
    else {
      let characterList = ""
      if (includeNumbers) {

        characterList = characterList + numbers
      }
      if (includeUpperCaseLetters) {
        characterList = characterList + upperCaseLetters
      }
      if (includeLowerCaseLetters) {
        characterList = characterList + lowerCaseLetters
      }
      if (includeSpecialSymbols) {
        characterList = characterList + specialCharacters
      }
      setPassword(createPassword(characterList))
      notify("Password is generated successfully", false)
    }
  }
  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length
    for (let i = 0; i < passwordLength; i++) {
      const characters = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characters)

    }
    return password
  }
  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password)
  }

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    } else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  }
  const handleCopyPassword = (e) => {
    if (password === "") {
      notify(messageFail, true)
    } else {
      copyToClipboard(password)
      notify(messageSuccess)
    }
  }
  return (
    <>
      <div className="App">
        <div className="container">
          <div className="generator">
            <h2 className="generator-header">
              Password Generator
            </h2>
            <div className="generator-password">
              <h3>{password}</h3>
              <button className="copy-btn">
                <i className='far fa-clipboard' onClick={handleCopyPassword}></i>
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="password-strength"><i> Password Length</i></label>
              <input type="number" className='pwd' id='password-strength' max="30" min="5" name='password-strength' defaultValue={passwordLength} onChange={(e) => { setPasswordLength(e.target.value) }} />
            </div>
            <div className="form-group">
              <label htmlFor="uppercase-letters">Add Uppercase Letters</label>
              <input type="checkbox" id='uppercase-letters' name='uppercase-letters' checked={includeUpperCaseLetters} onChange={(e) => { setIncludeUpperCaseLetters(e.target.checked) }} />
            </div>
            <div className="form-group">
              <label htmlFor="lowercase-letters">Add Lowercase Letters</label>
              <input type="checkbox" id='lowercase-letters' name='lowercase-letters' checked={includeLowerCaseLetters} onChange={(e) => { setIncludeLowerCaseLetters(e.target.checked) }} />
            </div>
            <div className="form-group">
              <label htmlFor="include-numbers">Includes Number</label>
              <input type="checkbox" id='include-numbers' name='include-numbers' checked={includeNumbers} onChange={(e) => { setIncludeNumbers(e.target.checked) }} />
            </div>

            <div className="form-group">
              <label htmlFor="include-symbols">Include Special Symbols</label>
              <input type="checkbox" id='include-symbols' name='include-symbols' checked={includeSpecialSymbols} onChange={(e) => { setIncludeSpecialSymbols(e.target.checked) }} />
            </div>
            <button className='generator-btn' onClick={handleGeneratePassword}>Generate Password</button>
            <ToastContainer
              position='top-center'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              ref={ToastContainerRef}
              pauseOnFocusLoss
              draggable
              pauseOnHover />
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
