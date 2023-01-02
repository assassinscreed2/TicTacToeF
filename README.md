#### DOCUMENTATION

##Overview:
The application is deployed on ‘Render’ on the free plan. So there can be issues like long waiting to open the page or the site being inactive etc. For this reason, I have also created a small loom video showing the demo of the application.
The Application is designed only for mobile view(e.g. IPhone SE)

Loom Video Link: https://www.loom.com/share/3dca0151b7524a80a6318aed257df1de

## Running Code
•	Clone backend code and frontend code from the provided github link
o	Frontend: assassinscreed2/TicTacToeF: dsf (github.com)
o	Backend: assassinscreed2/TicTacToeB (github.com)
•	Run command ‘npm install’ to install dependencies in backend folder and frontend folder
•	Run the command ‘node server.js’ or ‘nodemon server.js’ in the backend folder to start the server
•	Run the command ‘npm start’ in the frontend folder to start the react application
•	Replace all the URLs starting with ‘https://tictactoebackend-t2lr.onrender.com’ to ‘http://localhost:8000’ in the frontend react application to run the application in localhost

## Architecture
•	Frontend is designed only for mobile view (e.g IPhone SE)
•	Created REST APIs to
o	Register users
o	Login users
o	Fetch all games for a particular user
o	To update the move made by a user
o	To start game
o	To delete finished game
•	The database used is MongoDB which contains two collections
o	User collection: Store information about user
o	Game collection: Store information about every ongoing or finished games between  users
•	In each game there are nine variables which denotes the nine positions in a TicTacToe Game.
•	After each move, ap API call is made to the server for updating the positions and an updated game positions are returned which is then rendered using the useState hook
•	Since there is no use of webhooks and server-sent events, therefore after every move, users have to reload the web page to render the updated game positions


## Difficulties
•	The first difficulty in front of me was to design a logic for creating the application. I need to figure out in what format should I take input so that I could track the current status of the game.
•	The other difficulty I faced was figuring out a way to keep track of opponents since there will be different opponents in every game for the same user and the user can switch between different games.
•	There were also many bugs that I spent time on to fix