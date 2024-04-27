const gameBoard = (function()
{
	const gameGrid = [["", "", ""], ["", "", ""] , ["", "", ""]];
	const updateGameGrid = (x_index, y_index, value) =>
	{
		if (!gameGrid[y_index][x_index])
			gameGrid[y_index][x_index] = value;
	}
	return {updateGameGrid};
})();


const gameMaster = (function()
{
	const gameGridDom = document.querySelector("#grid-game");
	const playerTurnText = document.querySelector("#player-turn");
	const gameResultText = document.querySelector("#game-result");

	gameGridDom.addEventListener("click", (e)=>
	{
		const coords = e.target.dataset.coords.split('-');
		if (e.target.className === "game-cell")
		{
			gameBoard.updateGameGrid(parseInt(coords[1]), parseInt(coords[0]), players.getCurrentPlayerMarker());
			players.changePlayerTurn();
		}
			//alert(`Target position is ${coords[0]}y and ${coords[1]}x`);
	});
	return {gameGridDom};
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
	};
	const getPlayerNames = () =>
	{
		let player1Name = player1.name;
		let player2Name = player2.name;
		return {player1Name, player2Name};
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
	return {setPlayerNames, getPlayerNames, changePlayerTurn, getCurrentPlayerMarker};
})();

