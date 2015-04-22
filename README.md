15 Piece Puzzle Game

Project idea link : http://wiki.imaginea.com/Back2Front/ProjectIdeas#15-piece_puzzle

Approach:
1. Single player game, user will be prompted to enter Name
2. Game layout will be displayed, it consists of Game Panels, Controls, History panel, Leader board - derived based on Number of movements and time taken to finish the game, Footer panel to display the name, clock and number of movements
3. Once the values are properly aligned Game will end, # of movements and time taken to complete will be displayed

Technology Stack:
1. Bootstrap CSS
2. JS

Core components:
1. Shuffle numbers between 0-15 and place them in the Game panel2
2. Event determinator to identify the pieces which can be moved and what direction it can move
3. Strategy to Repaint the Game panel when event occured
4. Event & Time counter

Basic formula to identify the Piece movement:
Consider the piece which has the 0 value as hollow space, so pieces arround it can be moved. Represent the 0th value position as x,y
Possible movement:
(x-1, y)
(x+1, y)
(x, y-1)
(x, y+1)

x and y values should not be less than 0 or greater than 4. those movement are not permitted.