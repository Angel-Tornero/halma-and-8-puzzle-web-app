/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Ángel Tornero Hernández
 * @date 18 May 2021
 * @brief Class Eight Puzzle (view).
 * @link https://github.com/PAI-ULL/pai-practica13-halma-mvc-alu0101224084
 * @link https://es.wikipedia.org/wiki/Halma
 */

'use strict';

/** Class for representing visually the board in a Eight puzzle game */
export class EightPuzzleView {
  /** @private - Canvas where the board is represented */
  #canvasBoard;
  /** @private - Canvas where the number of movements are going to be displayed */
  #canvasCounter;
  /** @private - Context for puzzle canvas */
  #ctxPuzzle;
  /** @private - Context for counter canvas */
  #ctxCounter;
  /** @private - White colour code for board */
  #WHITE = 'rgb(240, 240, 240)';
  /** @private - Black colour code for board */
  #BLACK = 'rgb(120, 120, 120)';
  /** @private - Blue colour code for board */
  #BLUE = 'rgb(0, 0, 255)';
  /** @private - Size in pixels of a box*/
  #boxSize;

  /**
   * Create a new EightPuzzleView object
   * @param {Object} canvas - Canvas where the board is represented
   */
  constructor(canvas, canvasCounter) {
    this.#canvasBoard = canvas;
    this.#canvasCounter = canvasCounter;
    this.#boxSize = canvas.width / 3;
    this.#ctxPuzzle = canvas.getContext('2d');
    this.#ctxCounter = canvasCounter.getContext('2d');
  }

  /**
   * Draw the Board model.
   */
  draw(board, counter) {
    const cellSize = this.#boxSize;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        this.#ctxPuzzle.fillStyle = ((Boolean(board[i][j].getNumber()))? this.#WHITE : this.#BLACK);
        this.#ctxPuzzle.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        if (!Boolean(board[i][j].getNumber())) continue;
        this.#ctxPuzzle.lineWidth = 10;
        this.#ctxPuzzle.strokeStyle = this.#BLUE;
        this.#ctxPuzzle.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
        this.#ctxPuzzle.lineWidth = 5;
        this.#ctxPuzzle.strokeStyle = 'black';
        this.#ctxPuzzle.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
        this.#ctxPuzzle.font = '100px Arial';
        this.#ctxCounter.fontWeight = 'bolder';
        this.#ctxPuzzle.fillStyle = 'black';
        this.#ctxPuzzle.textAlign = 'center';
        this.#ctxPuzzle.fillText(String(board[i][j].getNumber()),
            i * cellSize + cellSize / 2, j * cellSize + 140);
        
      }
    }
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
   * Show an alert when the game is over.
   * @param {Number} counter - Counter of movements in current game.
   */
  showGameOverAlert(board) {
    const cellSize = this.#boxSize;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        this.#ctxPuzzle.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        if (board[i][j]) {
          const img = document.createElement('img');
          const ctx = this.#ctxPuzzle;
          img.onload = function() {
            ctx.drawImage(img, i * cellSize, j * cellSize, cellSize, cellSize);
          }
    
        }
      }
    }
  }
}
