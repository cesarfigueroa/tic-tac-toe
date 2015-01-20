function Board () {
  this.cells = [null, null, null, null, null, null, null, null, null]; // 9
  this.pieces = ['x', 'o'];

  this.positions = {
    center: 4,
    corners: [0, 2, 6, 8],
    sides: [1, 3, 5, 7]
  };

  this.players = {
    computer: new Player('x'),
    human: new Player('o')
  };
}

Board.prototype.getCell = function (position) {
  return this.cells[position];
};

Board.prototype.setCell = function (position) {
  if (this.isEmpty(position)) {
    this.cells[position] = this.player.piece;
    this.swapPlayers();
  }
};

Board.prototype.setPlayers = function (player, opponent) {
  this.player = this.players[player];
  this.opponent = this.players[opponent];
};

Board.prototype.swapPlayers = function () {
  switch (this.player) {
    case this.players.human:
      return this.setPlayers('computer', 'human');
    case this.players.computer:
      return this.setPlayers('human', 'computer');
  }
};

Board.prototype.setInitialPlayer = function (player) {
  switch (player) {
    case 'human':
      return this.setPlayers('human', 'computer');
    case 'computer':
      return this.setPlayers('computer', 'human');
  }
};

Board.prototype.reset = function () {
  this.cells = this.cells.map(function () {
    return null;
  });
};

Board.prototype.isOccupied = function (position) {
  return this.pieces.indexOf(this.getCell(position)) > -1;
}

Board.prototype.isEmpty = function (position) {
  return !this.isOccupied(position);
};

Board.prototype.isFull = function () {
  return this.cells.every(function (cell, position) {
    return this.isOccupied(position);
  }.bind(this));
};

Board.prototype.belongsTo = function (player, positions) {
  if (Array.isArray(positions)) {
    return positions.every(function (position) {
      return this.belongsTo(player, position);
    }.bind(this));
  } else {
    return this.getCell(positions) == player.piece;
  }
};
