import React, { useEffect, useRef, useState } from 'react'

const TypingTest = () => {
    const [paragraph, setParagraph] = useState(`According to the caption on the bronze marker placed by the Multnomah Chapter of the Daughters of the American Revolution on May 12, 1939, College Hall is the oldest building in continuous use for Educational purposes west of the Rocky Mountains. Here were educated men and women who have won recognition throughout the world in all the learned professions.`);
    const maxTime = 60
    const [timeLeft, settimeLeft] = useState(maxTime)
    const [timetaken, settimetaken] = useState(0)
    const [Mistakes, setMistakes] = useState(0)
    const [WPM, setWPM] = useState(0)
    const [accuracy, setaccuracy] = useState(0)
    const [charIndex, setcharIndex] = useState(0)
    const [isTyping, setisTyping] = useState(false)
    const inputRef = useRef(null)
    const charRefs = useRef([])
    const [correctwrong, setCorrectwrong] = useState([])
    const [isBackPressed, setisBackPressed] = useState(false)
    const [mode, setMode] = useState(null)
    useEffect(() => {
        inputRef.current.focus()
        setCorrectwrong(Array(charRefs.current.length).fill('text-[#646669]'))
    }, [mode])
    useEffect(() => {
        let interval;
        if (isTyping && timeLeft > 0 && charIndex < paragraph.length) {
            if (mode === "time") {
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
            else if (mode === "words") {
                interval = setInterval(() => {
                    settimetaken(timetaken + 1);
                    console.log(timetaken)
                    if (charIndex < paragraph.length) {
                        let correctChars = charIndex - Mistakes;

                        let wpm = Math.round((correctChars / 5 / timetaken) * 60);
                        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
                        setWPM(wpm)

                        let acc = Math.round((correctChars / charIndex) * 100);
                        setaccuracy(acc)
                    }
                }, 1000);
            }
        }
        else if (timeLeft === 0) {
            clearInterval(interval)
            setisTyping(false)
        }
        if (mode === "words") {
            setParagraph(paragraph.split(" ").slice(0, 5).join(" "));
        }
        else if (mode === "time") {
            setParagraph(`According to the caption on the bronze marker placed by the Multnomah Chapter of the Daughters of the American Revolution on May 12, 1939, College Hall is the oldest building in continuous use for Educational purposes west of the Rocky Mountains. Here were educated men and women who have won recognition throughout the world in all the learned professions.`)
        }
        return () => {
            clearInterval(interval)
        }
    }, [isTyping, timeLeft, timetaken, mode])

    const onKeyDown = (e) => {
        let currentChar = charRefs.current[charIndex]
        let typedChar = e.target.value.slice(-1)
        if (e.keyCode === 8 && charIndex > 0 && charIndex < paragraph.length && timeLeft > 0) {
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
        console.log(characters.length)
        let currentChar = charRefs.current[charIndex]
        let typedChar = e.target.value.slice(-1)
        if (!isBackPressed) {
            if (charIndex < paragraph.length && timeLeft > 0) {
                if (!isTyping) setisTyping(true)
                if (typedChar === currentChar.textContent) {
                    setcharIndex(charIndex + 1)
                    correctwrong[charIndex] = "text-white"
                }
                else {
                    setcharIndex(charIndex + 1)
                    setMistakes(Mistakes + 1)
                    correctwrong[charIndex] = "text-red-500"
                }
                if (charIndex === characters.length - 1) setisTyping(false)
            }
            else {
                setisTyping(false)
            }
        }
    }
    const resetBtn = () => {
        setisTyping(false)
        settimeLeft(maxTime)
        setcharIndex(0)
        setMistakes(0)
        setWPM(0)
        setaccuracy(100)
        setCorrectwrong(Array(charRefs.current.length).fill('text-[#646669]'))
        document.getElementById('paragraph').value = ""
    }
    return (
        <div>
            <div className="flex gap-10 items-center justify-center">
                <p className="text-2xl">Select mode</p>
                <p className={`${mode === "words" ? "text-white" : 'text-[#646669]'}  cursor-pointer`} onClick={() => { setMode("words"); resetBtn() }}>Words - 5</p>
                <p className={`${mode === "time" ? "text-white" : 'text-[#646669]'} cursor-pointer`} onClick={() => { setMode("time"); resetBtn() }}>Time - 60 seconds</p>
            </div>
            <div className="h-96 border-2 mx-40 my-10 p-10 text-xl relative">
                <input type="text" name="paragraph" id="paragraph" className='opacity-0 z-50 absolute h-[85%] w-[85%]' ref={inputRef} onChange={handleOnChange} onKeyDown={onKeyDown} />
                {
                    paragraph.split("").map(
                        (char, index) => (
                            <span className={`${index === charIndex ? "underline" : ""} ${correctwrong[index]}`} key={index} ref={(e) => (charRefs.current[index] = e)}>{char}</span>
                        )
                    )
                }</div>
            {<div className="mx-40 flex gap-10 justify-evenly items-center">
                <p>Time left: <strong>{mode === "time" ? timeLeft : "infinity"}</strong></p>
                <p>Mistakes: <strong>{Mistakes}</strong></p>
                <p>WPM: <strong>{WPM}</strong></p>
                <p>Accuracy: <strong>{accuracy}</strong></p>
                <button className='bg-yellow-300 p-1 rounded text-black' onClick={resetBtn}>Try again</button>
            </div>}
        </div>
    )
}

export default TypingTest
