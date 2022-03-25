/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Ángel Tornero Hernández
 * @date 12 May 2021
 * @brief Class Halma board (view).
 * @link https://github.com/PAI-ULL/pai-practica13-halma-mvc-alu0101224084
 * @link https://es.wikipedia.org/wiki/Halma
 */

'use strict';

/** Class for representing visually the board in a Halma game */
export class BoardView {
  /** @private - Canvas where the board is represented */
  #canvasBoard;
  /** @private - Canvas where the number of movements are going to be displayed */
  #canvasCounter;
  /** @private - Context for board canvas */
  #ctxBoard;
  /** @private - Context for board canvas */
  #ctxCounter;
  /** @private - White colour code for board */
  #WHITE = 'rgb(240, 240, 240)';
  /** @private - Black colour code for board */
  #BLACK = 'rgb(120, 120, 120)';
  /** @private - White colour code for board */
  #WHITE_WIN = 'rgb(233, 127, 210)';
  /** @private - Black colour code for board */
  #BLACK_WIN = 'rgb(126, 53, 175)';
  /** @private - Size in pixels of a box*/
  #boxSize;
  /** @private - Image of piece */
  #PIECE_IMG = './img/piece.png';
  /** @private - Image of highlighted piece */
  #HIGHLIGHTED_PIECE_IMG = './img/highlight.png';

  /**
   * Create a new BoardView object
   * @param {Object} canvas - Canvas where the board is represented
   */
  constructor(canvas, canvasCounter, boardSize) {
    this.#canvasBoard = canvas;
    this.#canvasCounter = canvasCounter;
    this.#boxSize = canvas.width / boardSize;
    this.#ctxBoard = canvas.getContext('2d');
    this.#ctxCounter = canvasCounter.getContext('2d');
  }

  /**
   * Draw the Board model.
   */
  draw(board, counter) {
    const cellSize = this.#boxSize;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        this.#ctxBoard.fillStyle = (((i + j) % 2 === 0)? this.#WHITE : this.#BLACK);
        this.#ctxBoard.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        if (board[i][j]) {
          const img = document.createElement('img');
          const ctx = this.#ctxBoard;
          img.onload = function() {
            ctx.drawImage(img, i * cellSize, j * cellSize, cellSize, cellSize);
          }
          img.src = this.#PIECE_IMG;
        }
      }
    }
    this.#showMovesCounter(counter);
  }

  /**
   * Update the view of the board but only rendering the boxes of last movement
   * to optimize the time.
   * @param {Object} origin - Origin box.
   * @param {Object} destiny - Destiny box.
   * @param {Number} counter - Counter of movements in current game.
   */
  renderLastMove(origin, destiny, counter) {
    const cellSize = this.#boxSize;
    this.#ctxBoard.fillStyle = (((origin['column'] + origin['row']) % 2 === 0)? this.#WHITE : this.#BLACK);
    this.#ctxBoard.fillRect(origin['column'] * cellSize, origin['row'] * cellSize, cellSize, cellSize);

    this.#ctxBoard.fillStyle = (((destiny['column'] + destiny['row']) % 2 === 0)? this.#WHITE : this.#BLACK);
    this.#ctxBoard.fillRect(destiny['column'] * cellSize, destiny['row'] * cellSize, cellSize, cellSize);
    const img = document.createElement('img');
    const ctx = this.#ctxBoard;
    img.onload = function() {
      ctx.drawImage(img, destiny['column'] * cellSize, destiny['row'] * cellSize, cellSize, cellSize);
    }
    img.src = this.#PIECE_IMG;
    this.#showMovesCounter(counter);
  }

  /**
   * Write the counter of movements in the correspondent canvas.
   * @param {Number} counter - Counter of movements in current game.
   */
  #showMovesCounter(counter) {
    const ctxCounter = this.#canvasCounter.getContext('2d');
    ctxCounter.clearRect(0, 0, this.#canvasCounter.width, this.#canvasCounter.height);
    ctxCounter.font = '50px Arial';
    ctxCounter.fillStyle = 'black';
    ctxCounter.textAlign = 'right';
    ctxCounter.fillText(String(counter), 280, 50);
  }

  /**
   * Highlight a piece by changing his image.
   * @param {Object} position - Position of the piece that is wanted to highlight.
   */
  highlightPiece(position) {
    const cellSize = this.#boxSize;
    this.#ctxBoard.fillStyle = (((position['column'] + position['row']) % 2 === 0)? this.#WHITE : this.#BLACK);
    const img = document.createElement('img');
    const ctx = this.#ctxBoard;
    img.onload = function() {
      ctx.drawImage(img, position['column'] * cellSize, position['row'] * cellSize, cellSize, cellSize);
    }
    img.src = this.#HIGHLIGHTED_PIECE_IMG;
  }

  /**
   * Revert the highlighting of a piece.
   * @param {Object} position - Position of the piece that is wanted to highlight.
   */
  unhighlightPiece(position) {
    const cellSize = this.#boxSize;
    this.#ctxBoard.fillStyle = (((position['column'] + position['row']) % 2 === 0)? this.#WHITE : this.#BLACK);
    const img = document.createElement('img');
    const ctx = this.#ctxBoard;
    img.onload = function() {
      ctx.drawImage(img, position['column'] * cellSize, position['row'] * cellSize, cellSize, cellSize);
    }
    img.src = this.#PIECE_IMG;
  }

  /**
   * Show an alert when the game is over.
   * @param {Number} counter - Counter of movements in current game.
   */
  showGameOverAlert(board) {
    const cellSize = this.#boxSize;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        this.#ctxBoard.fillStyle = (((i + j) % 2 === 0)? this.#WHITE_WIN : this.#BLACK_WIN);
        this.#ctxBoard.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        if (board[i][j]) {
          const img = document.createElement('img');
          const ctx = this.#ctxBoard;
          img.onload = function() {
            ctx.drawImage(img, i * cellSize, j * cellSize, cellSize, cellSize);
          }
          img.src = this.#HIGHLIGHTED_PIECE_IMG;
        }
      }
    }
  }
}
