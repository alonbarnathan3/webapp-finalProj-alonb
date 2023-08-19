# Snake Game Web Application

The Snake Game Web Application is a simple browser-based game that allows users to play the classic Snake game. Players control a snake to collect food items and grow longer while avoiding collisions with walls and the snake's own body.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API](#api)
- [MongoDB Database](#mongodb-database)
- [Contributing](#contributing)
- [License](#license)

## Features

- Play the classic Snake game directly in your browser.
- Customize gameplay by choosing different skill levels and snake/food colors.
- View and compare high scores for different skill levels.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, etc.)
- Node.js and npm (for running the server and scripts)

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/snake-game.git
Save to grepper
Navigate to the project directory:

bash
Copy code
cd snake-game
Install the required dependencies:

bash
Copy code
npm install
Usage
Start the server:

bash

npm start
Open your web browser and navigate to http://localhost:3000.

The game's login page will be displayed. Enter your username, choose a skill level, and select snake and food colors. Then click the "Login" button to start playing.

Use the arrow keys to control the snake's movement: Up, Down, Left, and Right.

Eat the food items to grow the snake and earn points. Avoid collisions with walls and the snake's body.

Click the "Start Again" button to restart the game or the "Switch User" button to return to the login page.

Click the "Score Board" button to view the top scores for different skill levels.

Configuration
The game allows users to customize gameplay by choosing their username, skill level, snake color, and food color. The game's appearance can be modified through the CSS styles in the HTML files.

API
The application includes an API that interacts with a MongoDB database to manage user data and scores. The API functions are located in the api.js file.

To set up the API:

Configure the MongoDB connection URI in the api.js file.
Uncomment and customize the necessary functions (addUser, find, update, list) according to your requirements.
MongoDB Database
The Snake Game Web Application uses a MongoDB database to store user information and high scores. The database stores user data including usernames, skill levels, and game scores. The API functions interact with this database to add, retrieve, and update user information.

To set up the MongoDB database:

Create a MongoDB Atlas account or use an existing account.
Create a new cluster and obtain the connection URI.
Configure the MongoDB connection URI in the api.js file.
Contributing
Contributions to this project are welcome! If you find any issues or have suggestions for improvements, please feel free to create a pull request or submit an issue.

License
This project is licensed under the MIT License. See the LICENSE file for details.
