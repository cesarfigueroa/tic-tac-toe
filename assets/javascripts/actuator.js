function Actuator (board) {
  this.board = board;

  this.markup = {
    board: document.getElementById('board')
  };
}

Actuator.prototype.setup = function () {
  this.bindEvents();
  this.render();
};

Actuator.prototype.bindEvents = function () {
  window.addEventListener('draw', function () {
    this.markup.board.classList.add('draw');
  }.bind(this));

  window.addEventListener('loss', function () {
    this.markup.board.classList.add('loss');
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
