function Actuator (board) {
  this.board = board;

  this.markup = {
    board: document.getElementById('board'),
    cells: document.getElementsByClassName('cell')
  };

  this.bindEvents();
};

Actuator.prototype.bindEvents = function () {
  window.addEventListener('draw', function () {
    this.markup.board.classList.add('message', 'draw');
  }.bind(this));

  window.addEventListener('loss', function () {
    this.markup.board.classList.add('message', 'loss');
  }.bind(this));
};

Actuator.prototype.render = function () {
  this.updateCells();
  this.adjustSpacing();
};

Actuator.prototype.updateCells = function () {
  [].map.call(this.markup.cells, function (element, index) {
    if (this.board.isOccupied(index)) {
      element.classList.add('occupied', this.board.getCell(index));
      element.textContent = this.board.getCell(index);
    }
  }.bind(this));
};

Actuator.prototype.adjustSpacing = function () {
  [].map.call(this.markup.cells, function (element) {
    element.style.height = element.scrollWidth + 'px';
  });
};

Actuator.prototype.reset = function () {
  this.clearMessage();
  this.clearCells();
};

Actuator.prototype.clearMessage = function () {
  this.markup.board.classList.remove('message', 'loss', 'draw');
};

Actuator.prototype.clearCells = function () {
  [].map.call(this.markup.cells, function (element) {
    element.classList.remove('occupied', 'x', 'o');
    element.textContent = null;
  });
};
