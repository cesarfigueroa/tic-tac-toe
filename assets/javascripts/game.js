function Game () {
  this.board = new Board;
  this.strategy = new Strategy(this.board);
  this.actuator = new Actuator(this, this.board);

  this.settings = {
    isFirst: false
  };


  this.setup();
}

Game.prototype.setup = function () {
  if (this.settings.isFirst) {
    this.board.setInitialPlayer('human');
  } else {
    this.board.setInitialPlayer('computer');
    this.strategy.initialMove();
  }

  this.actuator.render();
};

Game.prototype.teardown = function () {
  this.board.reset();
  this.actuator.reset();
};

Game.prototype.play = function (position) {
  if (position && this.board.isEmpty(position)) {
    this.board.setCell(position);
    this.strategy.strategize();
    this.actuator.render();
  }
};

Game.prototype.isWon = function () {
  return this.strategy.adjacentPositions.some(function (positions, index) {
    var positions = positions.concat(this.strategy.winningPositions[index]);
    return this.board.belongsTo(this.board.players.computer, positions);
  }.bind(this));
};

Game.prototype.isDraw = function () {
  return this.board.isFull() && !this.isWon();
};

Game.prototype.isOver = function () {
  return this.isDraw() || this.isWon();
};

Game.prototype.isOngoing = function () {
  return !this.isOver();
};

Game.prototype.restart = function () {
  this.teardown();
  this.setup();
};
