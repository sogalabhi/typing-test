# Typing Speed Test App

This project is a web-based typing speed test application inspired by Monkeytype. The app allows users to take typing tests based on either time (e.g., 60 seconds) or a fixed number of words (e.g., 50 words) and provides valuable performance analytics.

## Features

### Typing Test Modes
- **Time-based Test**: Users can select a test duration (e.g., 60 seconds) to measure their typing speed.
- **Word-based Test**: Users can opt for a test based on a specific number of words (e.g., 50 words).

### Performance Metrics
- **Words Per Minute (WPM)**: Calculates and displays the user's typing speed upon completion of the test.
- **Accuracy**: Tracks and shows the accuracy of the typed words compared to the target text after the test.
- **Real-time Feedback**: Provides immediate feedback on correct and incorrect letters as the user types.

### Analytics
- **Speed and Accuracy Stats**: Users receive detailed stats at the end of the test, including WPM and accuracy percentages.
- **Personal Stats**: Users can view their personal typing statistics to track their performance over time.
- **Graph Visualization**: Displays a graph (using Chart.js) illustrating how the user's typing speed changes throughout the test duration.

### Leaderboard
- **All-time Leaderboard**: Ranks and displays the top typists of all time, showcasing their best scores and performance metrics.

## How to Use

1. Choose between the time-based or word-based test mode.
2. Start typing the displayed text.
3. At the end of the test, view your typing speed (WPM) and accuracy.
4. Check your personal stats to track your performance.
5. View the all-time leaderboard to see how you compare to other typists.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (React)
- **Backend**: Node.js, Express
- **Database**: MongoDB (for storing typing results and leaderboard data)
- **Chart.js**: For visualizing typing speed over time.
- **Socket.io**: (Planned for future multiplayer features)

## Future Enhancements

- **Multiplayer Mode**: Introduce a feature allowing users to compete against 5 random users in real-time.
- **Typing Speed Improvement Tracker**: Show how users' typing speeds improve over time.
- **Daily Leaderboard**: Implement a daily leaderboard to showcase the top performers for the day.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**

    ```bash
    git clone https://github.com/sogalabhi/news-feed.git
    cd news-feed
    ```

2. **Install Dependencies**

    Navigate to both the frontend and backend directories and install the required packages:

    ```bash
    # Frontend setup
    npm i

    # Backend setup
    cd backend
    npm i
    ```

3. **Start the Application**

    ```bash
    # Frontend setup
    npm run dev

    # Backend setup
    cd backend
    nodemon index.js
    # and run the python file in backend folder
    ```

    The frontend will run on `http://localhost:5173` and the backend on `http://localhost:3000`.
