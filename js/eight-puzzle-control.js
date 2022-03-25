/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Ángel Tornero Hernández
 * @date 18 May 2021
 * @brief Class Eight Puzzle (control).
 * @link https://github.com/PAI-ULL/pai-practica13-halma-mvc-alu0101224084
 * @link https://es.wikipedia.org/wiki/Halma
 */

'use strict';

/** Class for control interactivity with the board in Eight puzzle game */

export class EightPuzzleControl {
  /** @private - Canvas where the board is represented */
  #canvas;
  /** @private - Board model */
  #puzzleModel;
  /** @private - Left padding */
  #LEFT_PADDING = 220;
  /** @private - Top padding */
  #TOP_PADDING = 50;

  /**
   * Create a new BoardControl object and create event listener for move pieces
   * and restar the game.
   * @param {Object} canvas - Canvas that is going to be listened.
   */
  constructor(canvas, boardModel, button) {
    this.#canvas = canvas;
    this.#puzzleModel = boardModel;
    this.#canvas.addEventListener('mousedown', this.manageClicks.bind(this, event));
    button.addEventListener('click', this.restart.bind(this));
  }

  /**
   * Method that manages the click events in the canvas element and send the
   * information to the model.
   */
  manageClicks() {
    if (this.#puzzleModel.gameOver()) {
      return;
    }
    const getMousePosition = (canvas, event) => {
      let rect = canvas.getBoundingClientRect();
      let xCoord = event.clientX - rect.left - this.#LEFT_PADDING;
      let yCoord = event.clientY - rect.top - this.#TOP_PADDING;
      const column = Math.floor(xCoord / (canvas.width / this.#puzzleModel.getSize()));
      const row = Math.floor(yCoord / (canvas.width / this.#puzzleModel.getSize()));
      return {'column': column, 'row': row};
    }
    const position = getMousePosition(this.#canvas, event);
    if (this.#puzzleModel.isNumber(position)) {
      this.#puzzleModel.tryMove(position);
    }
  }
  
  /**
    * Restart the click option for beginning a new game.
    */
  restart() {
    this.#puzzleModel.randomizeGame();
  }
}
