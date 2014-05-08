function Game () {
  this.board = new Board;
  this.strategy = new Strategy(this.board);
  this.actuator = new Actuator(this.board);

  this.events = {
    loss: new Event('loss'),
    draw: new Event('draw')
  }

  this.markup = {
    board: document.getElementById('board')
  };

  this.setup();
}

Game.prototype.setup = function () {
  this.strategy.initialMove();
  this.actuator.setup();

  this.bindEvents();
};

Game.prototype.play = function (position) {
  if (this.board.isEmpty(position) && this.isOngoing()) {
    this.board.setCell(position);
    this.strategy.strategize();
    this.actuator.render();

    this.dispatchEvents();
  }
};

Game.prototype.isOver = function () {
  return this.strategy.adjacentPositions.some(function (positions, index) {
    var positions = positions.concat(this.strategy.winningPositions[index]);
    return this.board.belongsTo(this.board.players.computer, positions);
  }.bind(this));
};

Game.prototype.isDraw = function () {
  return this.board.isFull() && !this.isOver();
};

Game.prototype.isOngoing = function () {
  return !(this.isOver() || this.isDraw());
};

Game.prototype.bindEvents = function () {
  this.markup.board.addEventListener('click', function (event) {
    if (this.isOngoing()) { this.play(event.target.dataset.position); }
    else { this.restart(); }
  }.bind(this));

  window.addEventListener('resize', function () {
    this.actuator.render();
  }.bind(this));
};

Game.prototype.dispatchEvents = function () {
  if (this.isOver()) { window.dispatchEvent(this.events.loss); }
  else if (this.isDraw()) { window.dispatchEvent(this.events.draw); }
};

Game.prototype.restart = function () {
  window.location.reload();
};
