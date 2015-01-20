function Strategy (board) {
  this.board = board;

  this.adjacentPositions = [
    [0, 1], [0, 2], [1, 2], // top row
    [0, 3], [0, 6], [3, 6], // left column
    [0, 4], [0, 8], [4, 8], // left diagonal
    [2, 4], [2, 6], [4, 6], // right diagonal
    [3, 4], [3, 5], [4, 5], // middle row
    [1, 4], [1, 7], [4, 7], // middle column
    [6, 7], [6, 8], [7, 8], // bottom row
    [2, 5], [2, 8], [5, 8]  // right column
  ];

  this.winningPositions = [
    2, 1, 0, // top row
    6, 3, 0, // left column
    8, 4, 0, // left diagonal
    6, 4, 2, // right diagonal
    5, 4, 3, // middle row
    7, 4, 1, // middle column
    8, 7, 6, // bottom row
    8, 5, 2  // right column
  ];

  this.opposingCorners = [8, 6, 2, 0];
  this.outerPositions = this.board.positions.corners.concat(this.board.positions.sides);
}

Strategy.prototype.strategize = function () {
  if (this.canWin()) {
    this.win();
  } else if (this.canBlock()) {
    this.block();
  } else if (this.isCenterAvailable()) {
    this.moveToCenter();
  } else if (this.isOpposingCornerAvailable()) {
    this.moveToOpposingCorner();
  } else {
    this.markStrategicPosition();
  }
};

Strategy.prototype.initialMove = function () {
  var randomPosition = Math.floor(Math.random() * this.board.cells.length);
  return this.board.setCell(randomPosition);
};

Strategy.prototype.canWin = function () {
  return this.adjacentPositions.some(function (positions, index) {
    return this.board.belongsTo(this.board.player, positions)
        && this.board.isEmpty(this.winningPositions[index]);
  }.bind(this));
};

Strategy.prototype.win = function () {
  for (var index = 0; index < this.adjacentPositions.length; index++) {
    if (this.board.belongsTo(this.board.player, this.adjacentPositions[index])
        && this.board.isEmpty(this.winningPositions[index])) {
      return this.board.setCell(this.winningPositions[index]);
    }
  }
};

Strategy.prototype.canBlock = function () {
  return this.adjacentPositions.some(function (positions, index) {
    return this.board.belongsTo(this.board.opponent, positions)
        && this.board.isEmpty(this.winningPositions[index]);
  }.bind(this));
};

Strategy.prototype.block = function () {
  for (var index = 0; index < this.adjacentPositions.length; index++) {
    if (this.board.belongsTo(this.board.opponent, this.adjacentPositions[index])
        && this.board.isEmpty(this.winningPositions[index])) {
      return this.board.setCell(this.winningPositions[index]);
    }
  }
};

Strategy.prototype.isCenterAvailable = function () {
  return this.board.isEmpty(this.board.positions.center);
};

Strategy.prototype.moveToCenter = function () {
  return this.board.setCell(this.board.positions.center);
};

Strategy.prototype.isOpposingCornerAvailable = function () {
  return this.board.positions.corners.some(function (corner, index) {
    return this.board.belongsTo(this.board.opponent, corner)
        && this.board.isEmpty(this.opposingCorners[index]);
  }.bind(this));
};

Strategy.prototype.moveToOpposingCorner = function () {
  for (var index = 0; index < this.board.positions.corners.length; index++) {
    if (this.board.belongsTo(this.board.opponent, this.board.positions.corners[index])
        && this.board.isEmpty(this.opposingCorners[index])) {
      return this.board.setCell(this.opposingCorners[index]);
    }
  }
};

Strategy.prototype.markStrategicPosition = function () {
  for (var index = 0; index < this.outerPositions.length; index++) {
    if (this.board.isEmpty(this.outerPositions[index])) {
      return this.board.setCell(this.outerPositions[index]);
    }
  }
};
