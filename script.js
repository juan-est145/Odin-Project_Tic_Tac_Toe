const gameBoard = (function()
{
	const gameGrid = [["", "", ""], ["", "", ""] , ["", "", ""]];
	const updateGameGrid = function(x_index, y_index, value)
	{
		gameGrid[y_index][x_index] = value;
	}
	return {updateGameGrid};
})();



