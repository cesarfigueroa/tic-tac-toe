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

  this.player = this.players.computer;
  this.opponent = this.players.human;

  this.markup = {
    cells: document.getElementsByClassName('cell')
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

Board.prototype.swapPlayers = function () {
  if (this.player == this.players.computer) {
    this.player = this.players.human;
    this.opponent = this.players.computer;
  } else {
    this.player = this.players.computer;
    this.opponent = this.players.human;
  }
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
