function Actuator (board) {
  this.board = board;

  this.markup = {
    board: document.getElementById('board')
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
  this.sync();
  this.adjustSpacing();
};

Actuator.prototype.sync = function () {
  for (var index = 0; index < this.board.markup.cells.length; index++) {
    var cell = this.board.markup.cells[index];

    if (this.board.isOccupied(index)) {
      cell.classList.add('occupied', this.board.getCell(index));
      cell.textContent = this.board.getCell(index);
    }
  }
};

Actuator.prototype.adjustSpacing = function () {
  for (var index = 0; index < this.board.markup.cells.length; index++) {
    var cell = this.board.markup.cells[index];
    cell.style.height = cell.scrollWidth + 'px';
  }
};

Actuator.prototype.reset = function () {
  this.clearMessage();
  this.clearCells();
};

Actuator.prototype.clearMessage = function () {
  this.markup.board.classList.remove('message', 'loss', 'draw');
};

Actuator.prototype.clearCells = function () {
  for (var index = 0; index < this.board.markup.cells.length; index++) {
    this.board.markup.cells[index].classList.remove('occupied', 'x', 'o');
    this.board.markup.cells[index].textContent = null;
  }
};
