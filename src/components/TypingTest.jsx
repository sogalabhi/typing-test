import React from 'react'

const TypingTest = () => {
    const paragraph = `According to the caption on the bronze marker placed by the Multnomah Chapter of the Daughters of the American Revolution on May 12, 1939, College Hall is the oldest building in continuous use for Educational purposes west of the Rocky Mountains. Here were educated men and women who have won recognition throughout the world in all the learned professions.`
    return (
        <div>
            <div className="h-96 border-2 mx-40 my-10 p-10 text-xl">{paragraph}</div>
            <div className="mx-40 flex gap-10 justify-evenly items-center">
                <p>Time left:</p>
                <p>Mistakes:</p>
                <p>WPM:</p>
                <p>CPM:</p>
                <button className='bg-yellow-300 p-1 rounded '>Try again</button>
            </div>
        </div>
    )
}

export default TypingTest
