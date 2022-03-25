/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Ángel Tornero Hernández
 * @date 12 May 2021
 * @brief Class Halma board (control).
 * @link https://github.com/PAI-ULL/pai-practica13-halma-mvc-alu0101224084
 * @link https://es.wikipedia.org/wiki/Halma
 */

'use strict';

/** Class for control interactivity with the board in Halma game */

export class BoardControl {
  /** @private - Canvas where the board is represented */
  #canvas;
  /** @private - Coordinates of click that means what piece we want to move */
  #originClick;
  /** @private - Coordinates of click that means what box we want to move */
  #destinyClick;
  /** @private - Manager for knowing if next click is for origin or for destiny */
  #clickOption;
  /** @private - Board model */
  #boardModel;
  /** @private - Left padding */
  #LEFT_PADDING = 220;
  /** @private - Top padding */
  #TOP_PADDING = 60;

  /**
   * Create a new BoardControl object and create event listener for move pieces
   * and restar the game.
   * @param {Object} canvas - Canvas that is going to be listened.
   */
  constructor(canvas, boardModel, button) {
    this.#canvas = canvas;
    this.#boardModel = boardModel;
    this.#clickOption = 0;
    this.#canvas.addEventListener('mousedown', this.manageClicks.bind(this, event));
    button.addEventListener('click', this.restart.bind(this));
  }

  /**
   * Method that manages the click events in the canvas element and send the
   * information to the model.
   */
  manageClicks() {
    if (this.#boardModel.gameOver()) {
      return;
    }
    const getMousePosition = (canvas, event) => {
      let rect = canvas.getBoundingClientRect();
      let xCoord = event.clientX - rect.left - this.#LEFT_PADDING;
      let yCoord = event.clientY - rect.top - this.#TOP_PADDING;
      const column = Math.floor(xCoord / (canvas.width / this.#boardModel.getSize()));
      const row = Math.floor(yCoord / (canvas.width / this.#boardModel.getSize()));
      return {'column': column, 'row': row};
    }
    const position = getMousePosition(this.#canvas, event);
    switch (this.#clickOption) {
      case 0:
        if (this.#boardModel.isPiece(position)) {
          this.#originClick = position;
          this.#clickOption++;
          this.#boardModel.highlightPieceInstruction(position);
        }
        break;
      case 1:
        this.#destinyClick = position;
        this.#clickOption--;
        this.#boardModel.tryMove(this.#originClick, this.#destinyClick);
        break;
    }
  }
  
  /**
    * Restart the click option for beginning a new game.
    */
  restart() {
    this.#boardModel.initialPosition();
    this.#clickOption = 0;
  }
}
