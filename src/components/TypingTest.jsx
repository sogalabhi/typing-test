import React, { useEffect, useRef, useState } from 'react'

const TypingTest = ({ setStats, setShowStats }) => {
    const para = 'the sky was bright blue and the sun was shining as the children ran through the field of green grass they laughed and played with joy feeling the warm breeze against their faces the day was perfect for an adventure they climbed trees explored the woods and discovered a hidden stream flowing gently through the forest they built a small fort using sticks and leaves imagining it was their secret hideaway as the sun began to set they gathered their things and headed home tired but happy from the day filled with fun and memories to cherish forever'
    const [paragraph, setParagraph] = useState(``);
    const maxTime = 10
    const maxWords = 5
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
    const [tempStats, settempStats] = useState([])
    useEffect(() => {
        inputRef.current.focus()
        setCorrectwrong(Array(para.length).fill('text-[#646669]'))
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

                    settempStats(prev => [...prev, { 'time': (maxTime - timeLeft + 1), 'wpm': wpm, 'accuracy': acc }])

                }, 1000);
            }
            else if (mode === "words") {
                interval = setInterval(() => {
                    settimetaken(timetaken + 1);
                    if (charIndex < paragraph.length) {
                        let correctChars = charIndex - Mistakes;

                        let wpm = Math.round((correctChars / 5 / timetaken) * 60);
                        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
                        setWPM(wpm)

                        let acc = Math.round((correctChars / charIndex) * 100);
                        setaccuracy(acc)

                        settempStats(prev => [...prev, { 'time': (timetaken), 'wpm': wpm, 'accuracy': acc }])

                    }
                }, 1000);
            }
        }
        else if (timeLeft === 0 || charIndex == paragraph.length) {
            clearInterval(interval)
            setisTyping(false)
            setStats(tempStats)
            setShowStats(true)
        }

        return () => {
            clearInterval(interval)
        }
    }, [isTyping, timeLeft, timetaken, mode])

    //change paragraph
    useEffect(() => {
        if (mode === "words") {
            setParagraph(pickRandomWords(para, maxWords))
        }
        else if (mode === "time") {
            setParagraph(para)
        }
    }, [mode])

    const pickRandomWords = (paragraph, count) => {
        // Split the paragraph by spaces
        let words = paragraph.split(' ').filter(word => word.trim() !== '');
        // Shuffle the array of words
        for (let i = words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [words[i], words[j]] = [words[j], words[i]];
        }

        // Return the first 'numWords' words
        return words.slice(0, count).join(' ');
    }
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
        setStats([])
        settempStats([])
        setShowStats(false)
    }
    return (
        <div>
            <div className="flex gap-10 items-center justify-center">
                <p className="text-2xl">Select mode {mode}</p>
                <p className={`${mode === "words" ? "text-white" : 'text-[#646669]'}  cursor-pointer`} onClick={() => { setMode("words"); resetBtn() }}>Words - 50</p>
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
