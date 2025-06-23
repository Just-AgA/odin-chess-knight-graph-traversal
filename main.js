function knightMoves(source, destination) {
  const possibleMoves = [
    [1, 2],
    [2, 1],
    [-1, 2],
    [-2, 1],
    [1, -2],
    [2, -1],
    [-1, -2],
    [-2, -1],
  ];

  const queue = [];
  const visited = new Set();

  function isWithinTheBoard(x, y) {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
  }

  function convertPositionToString([x, y]) {
    return `${x},${y}`;
  }

  queue.push([source, [source]]);
  visited.add(convertPositionToString(source));

  let moves = 0;

  while (queue.length > 0) {
    const currentLevelSize = queue.length;

    // Process all nodes at the current move count (BFS layer)
    for (let i = 0; i < currentLevelSize; i++) {
      const [pos, path] = queue.shift();
      const [x, y] = pos;

      if (x === destination[0] && y === destination[1]) {
        return `You made it in ${moves} moves. Here is your path:
        \n${JSON.stringify(path)}`;
      }

      for (const move of possibleMoves) {
        const nextX = x + move[0];
        const nextY = y + move[1];
        const nextPos = [nextX, nextY];
        const nextPosStr = convertPositionToString(nextPos);

        if (isWithinTheBoard(nextX, nextY) && !visited.has(nextPosStr)) {
          visited.add(nextPosStr);
          queue.push([nextPos, [...path, nextPos]]);
        }
      }
    }

    moves++;
  }

  return [];
}
