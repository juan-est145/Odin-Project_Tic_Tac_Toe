const gameBoard = (function()
{
	const gameGrid = [["", "", ""], ["", "", ""] , ["", "", ""]];
	const updateGameGrid = (x_index, y_index, value) =>
	{
		gameGrid[y_index][x_index] = value;
	}
	return {updateGameGrid};
})();


const gameMaster = (function()
{
	const gameGridDom = document.querySelector("#grid-game");
	gameGridDom.addEventListener("click", (e)=>
	{
		const coords = e.target.dataset.coords.split('-');
		if (e.target.className === "game-cell")
			alert(`Target position is ${coords[0]}y and ${coords[1]}x`);
	});
	return {gameGridDom};
})();


const players = (function()
{
	let player1Name;
	let player2Name;
	const setPlayerNames = () =>
	{
		let player1Input;
		let player2Input;
		while (!player1Input)
			player1Input = prompt("Enter player 1 name");
		while (!player2Input)
			player2Input = prompt("Enter player 2 name");
		player1Name = player1Input;
		player2Name = player2Input;
	}
	const getPlayerNames = () =>
	{
		return [player1Name, player2Name];
	}
	return {setPlayerNames, getPlayerNames};
})();

