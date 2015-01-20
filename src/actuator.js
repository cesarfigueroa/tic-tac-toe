function Actuator (game, board) {
  this.game = game;
  this.board = board;

  this.markup = {
    board: document.querySelector('#board'),
    cells: document.querySelectorAll('.cell'),
    overlay: document.querySelector('.overlay'),
    title: document.querySelector('.overlay-title')
  };

  this.events = {
    loss: new Event('loss'),
    draw: new Event('draw')
  };

  this.bindEvents();
  this.bindCustomEvents();
};

Actuator.prototype.bindEvents = function () {
  this.markup.board.addEventListener('click', function (event) {
    if (this.game.isOngoing()) {
      this.game.play(event.target.dataset.position);
    }
  }.bind(this));

  this.markup.board.addEventListener('touchend', function (event) {
    event.preventDefault();

    if (this.game.isOngoing()) {
      this.game.play(event.target.dataset.position);
    }
  }.bind(this));

  this.markup.overlay.addEventListener('click', function (event) {
    if (event.target.tagName.toLowerCase() == 'button') {
      this.game.restart(event.target.value);
    }
  }.bind(this));

  window.addEventListener('resize', function () {
    this.adjustSpacing();
  }.bind(this));
}

Actuator.prototype.bindCustomEvents = function () {
  window.addEventListener('draw', function () {
    this.markup.overlay.classList.add('open');
    this.markup.title.textContent = 'It’s a tie! Play again?';
  }.bind(this));

  window.addEventListener('loss', function () {
    this.markup.overlay.classList.add('open');
    this.markup.title.textContent = 'You lose. Play again?';
  }.bind(this));
};

Actuator.prototype.render = function () {
  this.updateCells();
  this.adjustSpacing();
  this.dispatchEvents();
};

Actuator.prototype.updateCells = function () {
  Array.prototype.map.call(this.markup.cells, function (element, index) {
    if (this.board.isOccupied(index)) {
      element.classList.add('occupied', this.board.getCell(index));
      element.textContent = this.board.getCell(index);
    }
  }.bind(this));
};

Actuator.prototype.adjustSpacing = function () {
  Array.prototype.map.call(this.markup.cells, function (element) {
    element.style.height = element.scrollWidth + 'px';
  });
};

Actuator.prototype.dispatchEvents = function () {
  if (this.game.isWon()) {
    window.dispatchEvent(this.events.loss);
  } else if (this.game.isDraw()) {
    window.dispatchEvent(this.events.draw);
  }
};

Actuator.prototype.reset = function () {
  this.clearMessage();
  this.clearCells();
};

Actuator.prototype.clearMessage = function () {
  this.markup.overlay.classList.remove('open');
};

Actuator.prototype.clearCells = function () {
  Array.prototype.map.call(this.markup.cells, function (element) {
    element.classList.remove('occupied', 'x', 'o');
    element.textContent = null;
  });
};
