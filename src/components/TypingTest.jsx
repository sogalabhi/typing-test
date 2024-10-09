import React, { useEffect, useRef, useState } from 'react'

const TypingTest = () => {
    const paragraph = `According to the caption on the bronze marker placed by the Multnomah Chapter of the Daughters of the American Revolution on May 12, 1939, College Hall is the oldest building in continuous use for Educational purposes west of the Rocky Mountains. Here were educated men and women who have won recognition throughout the world in all the learned professions.`
    const maxTime = 10
    const [timeLeft, settimeLeft] = useState(maxTime)
    const [Mistakes, setMistakes] = useState(0)
    const [WPM, setWPM] = useState(0)
    const [accuracy, setaccuracy] = useState(0)
    const [charIndex, setcharIndex] = useState(0)
    const [isTyping, setisTyping] = useState(false)
    const inputRef = useRef(null)
    const charRefs = useRef([])
    const [correctwrong, setCorrectwrong] = useState([])
    const [isBackPressed, setisBackPressed] = useState(false)
    useEffect(() => {
        inputRef.current.focus()
        setCorrectwrong(Array(charRefs.current.length).fill(''))
    }, [])
    useEffect(() => {
        let interval;
        if (isTyping && timeLeft > 0) {
            interval = setInterval(() => {
                settimeLeft(timeLeft - 1);
                let correctChars = charIndex - Mistakes;
                let totalTime = maxTime - timeLeft;

                let wpm = Math.round((correctChars / 5 / totalTime) * 60);
                wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
                setWPM(wpm)

                let acc = Math.round((correctChars / charIndex) * 100);
                setaccuracy(acc)
            }, 1000);
        }
        else if (timeLeft === 0) {
            clearInterval(interval)
            setisTyping(false)
        }
        return () => {
            clearInterval(interval)
        }
    }, [isTyping, timeLeft])

    const onKeyDown = (e) => {
        const characters = charRefs.current
        let currentChar = charRefs.current[charIndex]
        let typedChar = e.target.value.slice(-1)
        if (e.keyCode === 8 && charIndex > 0) {
            setisBackPressed(true)
            setcharIndex(charIndex - 1)
            correctwrong[charIndex - 1] = ""
            if (typedChar != currentChar.textContent) { if (Mistakes > 0) setMistakes(Mistakes - 1); }
        }
        else {
            setisBackPressed(false)
        }

    }
    const handleOnChange = (e) => {
        const characters = charRefs.current
        let currentChar = charRefs.current[charIndex]
        let typedChar = e.target.value.slice(-1)
        if (!isBackPressed) {
            if (charIndex < characters.length && timeLeft > 0) {
                if (!isTyping) setisTyping(true)
                if (typedChar === currentChar.textContent) {
                    setcharIndex(charIndex + 1)
                    correctwrong[charIndex] = "bg-green-600 text-opacity-100"
                }
                else {
                    setcharIndex(charIndex + 1)
                    setMistakes(Mistakes + 1)
                    correctwrong[charIndex] = "bg-red-500 text-opacity-100"
                }
                if (charIndex === characters.length - 1) setisTyping(false)
            }
            else {
                setisTyping(false)
            }
        }
    }
    const resetBtn = ()=>{
        setisTyping(false)
        settimeLeft(maxTime)
        setcharIndex(0)
        setMistakes(0)
        setWPM(0)
        setCorrectwrong(Array(charRefs.current.length).fill(''))
    }
    return (
        <div>

            <div className="h-96 border-2 mx-40 my-10 p-10 text-xl relative">
                <input type="text" name="paragraph" id="paragraph" className='opacity-0 z-50 absolute h-[85%] w-[85%]' ref={inputRef} onChange={handleOnChange} onKeyDown={onKeyDown} />
                {
                    paragraph.split("").map(
                        (char, index) => (
                            <span className={`char text-gray-50	 ${index === charIndex ? "underline" : ""} ${correctwrong[index]}`} key={index} ref={(e) => (charRefs.current[index] = e)}>{char}</span>
                        )
                    )
                }</div>
            {!isTyping && <div className="mx-40 flex gap-10 justify-evenly items-center">
                <p>Time left: <strong>{timeLeft}</strong></p>
                <p>Mistakes: <strong>{Mistakes}</strong></p>
                <p>WPM: <strong>{WPM}</strong></p>
                <p>Accuracy: <strong>{accuracy}</strong></p>
                <button className='bg-yellow-300 p-1 rounded text-black' onClick={resetBtn}>Try again</button>
            </div>}
        </div>
    )
}

export default TypingTest
