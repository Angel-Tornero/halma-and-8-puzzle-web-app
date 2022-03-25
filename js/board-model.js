/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Ángel Tornero Hernández
 * @date 12 May 2021
 * @brief Class Halma board (model).
 * @link https://github.com/PAI-ULL/pai-practica13-halma-mvc-alu0101224084
 * @link https://es.wikipedia.org/wiki/Halma
 */

'use strict';

/** Class for representing the board in a Halma game */

export class BoardModel {
  /** @private - Size of the board in boxes */
  #size;
  /** 
   * @private - Matrix of boxes of the board (Boolean). True represents the
   * existence of a piece in the box and false otherwise.
   * */
  #boxes;
  /** @private - Counter of movements */
  #counter;
  /** @private - Board view */
  #boardView;
  /** @private - Indicate if the game is over */
  #gameOver = true;

  /**
   * Create a new Board object
   * @param {Number} size - Size of the board in boxes.
   */
  constructor(size = 9, boardView) {
    this.#size = size;
    this.#boardView = boardView;
    this.#boxes = [];
    for (let i = 0; i < this.#size; i++) {
      let row = [];
      for (let j = 0; j < this.#size; j++) {
        row.push(false);
      }
      this.#boxes.push(row);
    }
    this.initialPosition();
  }

  /**
   * Place the pieces in initial position.
   */
  initialPosition() {
    this.#counter = 0;
    for (let i = 0; i < this.#size; i++) {
      for (let j = 0; j < this.#size; j++) {
        this.#boxes[i][j] = false;
      }
    }
    for (let i = 0; i < 3; i++) {
      for (let j = this.#size - 3; j < this.#size; j++) {
        this.#boxes[i][j] = true;
      }
    }
    this.#gameOver = false;
    this.#boardView.draw(this.#boxes, this.#counter);
  }

  /**
   * Getter of size.
   * @returns {Number} - Size of the board in boxes.
   */
  getSize() {
    return this.#size;
  }

  /**
   * Method that tries the move of the user and only performs it
   * if is a valid one. Then, sends the information to the BoardView.
   * @param {Object} firstPosition - First click position.
   * @param {Object} secondPosition - Second click position.
   */
  tryMove(firstPosition, secondPosition) {
    if (this.#isValidMovement(firstPosition, secondPosition)) {
      this.#move(firstPosition, secondPosition);
      this.#boardView.renderLastMove(firstPosition, secondPosition, this.#counter);
    } else {
      this.#boardView.unhighlightPiece(firstPosition);
    }
    if (this.#isGameOver()) {
      this.#boardView.showGameOverAlert(this.#boxes);
    }
  }

  /**
   * Calculates if the given movement is valid.
   * @param {Object} origin - Origin box.
   * @param {Object} destiny - Destiny box.
   * @returns {Boolean}
   */
   #isValidMovement(origin, destiny) {
    if (!this.#boxes[origin['column']][origin['row']] ||
        this.#boxes[destiny['column']][destiny['row']] ||
        Math.abs(origin['column'] - destiny['column']) > 2 ||
        Math.abs(origin['row'] - destiny['row'] > 2)) {
      return false;
    }
    if (origin['column'] === destiny['column']) {
      return this.#verticalMovement(origin, destiny);
    }
    if (origin['row'] === destiny['row']) {
      return this.#horizontalMovement(origin, destiny);
    }
    if (origin['row'] + origin['column'] === destiny['row'] + destiny['column'] ||
        origin['row'] - origin['column'] === destiny['row'] - destiny['column']) {
      return this.#diagonalMovement(origin, destiny);
    }
  }

  /**
   * Checks if going from origin to destiny is a valid vertical movement.
   * @param {Object} origin - Origin box.
   * @param {Object} destiny - Destiny box.
   * @returns {Boolean}
   */
  #verticalMovement(origin, destiny) {
    const intermediatePieceRow = (origin['row'] + destiny['row']) / 2;
    if (Math.abs(origin['row'] - destiny['row']) === 2) {
      if (!this.#boxes[origin['column']][intermediatePieceRow]) {
        return false
      }
    }
    return true;
  }

  /**
   * Checks if going from origin to destiny is a valid horizontal movement.
   * @param {Object} origin - Origin box.
   * @param {Object} destiny - Destiny box.
   * @returns {Boolean}
   */
  #horizontalMovement(origin, destiny) {
    const intermediatePieceColumn = (origin['column'] + destiny['column']) / 2;
    if (Math.abs(origin['column'] - destiny['column']) === 2) {
      if (!this.#boxes[intermediatePieceColumn][origin['row']]) {
        return false
      }
    }
    return true;
  }

  /**
   * Checks if going from origin to destiny is a valid diagonal movement.
   * @param {Object} origin - Origin box.
   * @param {Object} destiny - Destiny box.
   * @returns {Boolean}
   */
  #diagonalMovement(origin, destiny) {
    const intermediatePieceColumn = (origin['column'] + destiny['column']) / 2;
    const intermediatePieceRow = (origin['row'] + destiny['row']) / 2;
    if (Math.abs(origin['column'] - destiny['column']) === 2) {
      if (!this.#boxes[intermediatePieceColumn][intermediatePieceRow]) {
        return false
      }
    }
    return true;
  }

  /**
   * Performs the move of a piece.
   * @param {Object} origin - Origin box.
   * @param {Object} destiny - Destiny box.
   */
  #move(origin, destiny) {
    this.#boxes[origin['column']][origin['row']] = !this.#boxes[origin['column']][origin['row']];
    this.#boxes[destiny['column']][destiny['row']] = !this.#boxes[destiny['column']][destiny['row']];
    this.#counter++;
  }

  /**
   * Instruct the viewer to highlight a piece.
   * @param {Object} position - Position of the piece that is wanted to highlight.
   */
  highlightPieceInstruction(position) {
    this.#boardView.highlightPiece(position)
  }

  /**
   * Indicate if the given position contains a piece.
   * @param {Object} position
   * @returns {Boolean}
   */
  isPiece(position) {
    return this.#boxes[position['column']][position['row']];
  }

  /**
   * Calculate if the game is over.
   * @returns {Boolean}
   */
  #isGameOver() {
    for (let i = this.#size - 3; i < this.#size; i++) {
      for (let j = 0; j < 3; j++) {
        if (!this.#boxes[i][j]) {
          return false;
        }
      }
    }
    this.#gameOver = true;
    return true;
  }

  /**
   * Indicate if the game is over.
   * @returns {Boolean}
   */
   gameOver() {
    return this.#gameOver;
  }
}