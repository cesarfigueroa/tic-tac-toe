function Actuator (board) {
  this.board = board;
}

Actuator.prototype.render = function () {
  this.sync();
  this.adjustSpacing();
};

Actuator.prototype.sync = function () {
  for (var index = 0; index < this.board.markup.cells.length; index++) {
    var cell = this.board.markup.cells[index];

    if (this.board.isOccupied(index)) {
      cell.classList.add('occupied', this.board.getCell(index));
      cell.innerText = this.board.getCell(index);
    }
  }
};

Actuator.prototype.adjustSpacing = function () {
  for (var index = 0; index < this.board.markup.cells.length; index++) {
    var cell = this.board.markup.cells[index];
    cell.style.height = cell.scrollWidth + 'px';
  }
};
