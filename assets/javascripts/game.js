function Game () {
  this.board = new Board;
  this.strategy = new Strategy(this.board);
  this.actuator = new Actuator(this.board);

  this.events = {
    loss: new Event('loss'),
    draw: new Event('draw')
  };

  this.markup = {
    board: document.getElementById('board')
  };

  this.setup();
  this.bindEvents();
}

Game.prototype.setup = function () {
  this.strategy.initialMove();
  this.actuator.render();
};

Game.prototype.teardown = function () {
  this.board.reset();
  this.actuator.reset();
};

Game.prototype.play = function (position) {
  if (position && this.board.isEmpty(position) && this.isOngoing()) {
    this.board.setCell(position);
    this.strategy.strategize();
    this.actuator.render();
    this.dispatchEvents();
  } else if (this.isOver()) {
    this.restart();
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

Game.prototype.bindEvents = function () {
  this.markup.board.addEventListener('click', function (event) {
    this.play(event.target.dataset.position);
  }.bind(this));

  this.markup.board.addEventListener('touchend', function (event) {
    event.preventDefault();
    this.play(event.target.dataset.position);
  }.bind(this));

  window.addEventListener('resize', function () {
    this.actuator.adjustSpacing();
  }.bind(this));
};

Game.prototype.dispatchEvents = function () {
  if (this.isWon()) { window.dispatchEvent(this.events.loss); }
  else if (this.isDraw()) { window.dispatchEvent(this.events.draw); }
};

Game.prototype.restart = function () {
  this.teardown();
  this.setup();
};
