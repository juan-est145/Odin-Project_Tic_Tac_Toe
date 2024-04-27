const gameBoard = (function()
{
	const gameGrid = [["", "", ""], ["", "", ""] , ["", "", ""]];

	const updateGameGrid = (x_index, y_index, value) =>
	{
		if (!gameGrid[y_index][x_index])
		{
			gameGrid[y_index][x_index] = value;
			return (true);
		}
		return (false);
	}

	const getCellValue = (x_index, y_index) =>
	{
		if (x_index >= 0 && x_index <= 2 && y_index >= 0 && y_index <= 2)
			return (gameGrid[y_index][x_index]);
		return (null);
	}

	const searchForWinner = (x_coord, y_coord, marker) =>
	{
		if (gameGrid[0][x_coord] === marker && gameGrid[1][x_coord] === marker && gameGrid[2][x_coord] === marker)
			return (true);
		else if (gameGrid[y_coord][0] === marker && gameGrid[y_coord][1] === marker && gameGrid[y_coord][2] === marker)
			return (true);
		else if (gameGrid[0][0] === marker && gameGrid[1][1] === marker && gameGrid[2][2] === marker)
			return (true);
		else if (gameGrid[0][2] === marker && gameGrid[1][1] === marker && gameGrid[2][0] === marker)
			return (true);
		return (false);
	}
	return {updateGameGrid, getCellValue, searchForWinner};
})();


const gameMaster = (function()
{
	const gameGridDom = document.querySelector("#grid-game");
	const playerTurnText = document.querySelector("#player-turn");
	const gameResultText = document.querySelector("#game-result");
	let gameWon = false;
	let playedRounds = 0;

	gameGridDom.addEventListener("click", (e)=>
	{
		if (e.target.className !== "game-cell" && gameWon === true)
			return ;
		const coords = e.target.dataset.coords.split('-');
		if (gameBoard.updateGameGrid(parseInt(coords[1]), parseInt(coords[0]), players.getCurrentPlayerMarker()) === true)
		{
			e.target.textContent = gameBoard.getCellValue(coords[1], coords[0]);
			playedRounds++;
			if (playedRounds >= 5 && playedRounds < 9)
			{
				gameWon = gameBoard.searchForWinner(parseInt(coords[1]), parseInt(coords[0]), players.getCurrentPlayerMarker());
				if (gameWon === true)
				{
					gameResultText.textContent = `${players.getCurrentPlayerName()} wins the game`;
					playerTurnText.textContent = "";
				}
			}
			else if (playedRounds === 9)
				gameResultText.textContent = "Draw";
			if (gameWon === false)
			{
				players.changePlayerTurn();
				playerTurnText.textContent = `${players.getCurrentPlayerName()}'s turn`;
			}
		}
	});

	return {};
})();


const players = (function()
{
	const player1 = createPlayer(null, 'X');
	const player2 = createPlayer(null, 'O');
	let currentPlayerTurn = "Player 1";

	function createPlayer(name, marker)
	{
		return {name, marker};
	};

	const setPlayerNames = () =>
	{
		let player1Input;
		let player2Input;
		while (!player1Input)
			player1Input = prompt("Enter player 1 name");
		while (!player2Input)
			player2Input = prompt("Enter player 2 name");
		player1.name = player1Input;
		player2.name = player2Input;
		document.querySelector("#player-turn").textContent = `${player1.name}'s turn`;
	};
	
	const getCurrentPlayerName = () =>
	{
		return (currentPlayerTurn === "Player 1" ? player1.name : player2.name);
	};

	const changePlayerTurn = () =>
	{
		currentPlayerTurn = currentPlayerTurn === "Player 1" ? "Player 2" : "Player 1";
		return (currentPlayerTurn); 
	};

	const getCurrentPlayerMarker = () =>
	{
		return (currentPlayerTurn === "Player 1" ? "X" : "O");
	}

	return {setPlayerNames, getCurrentPlayerName, changePlayerTurn, getCurrentPlayerMarker};
})();

players.setPlayerNames()
