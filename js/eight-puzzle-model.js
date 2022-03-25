/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Ángel Tornero Hernández
 * @date 18 May 2021
 * @brief Class Eight Puzzle (model).
 * @link https://github.com/PAI-ULL/pai-practica13-halma-mvc-alu0101224084
 * @link https://es.wikipedia.org/wiki/Halma
 */

import {EightPuzzleBox} from './eight-puzzle-box.js';

/** Class for representing the model of a eight-puzzle game */
export class EightPuzzleModel {
  /**
   * Size in boxes of the problem "board"
   * @private
   */
  #SIZE = 3;
  /**
   * Manages the view of the puzzle
   * @private
   */
  #puzzleView;
  /**
   * Boxes of the game
   * @private
   */
  #boxes;
  /**
   * Counter of movements
   * @private
   */
  #counter;
  /**
   * Game over
   * @private 
   */
  #gameOver;

  /**
   * Create a EightPuzzleModel object
   * @param {EightPuzzleView} puzzleView 
   */
  constructor(puzzleView) {
    this.#puzzleView = puzzleView;
    this.generateGameOver();
    //this.randomizeGame();
  }

  /**
   * Randomize the boxes and starts a new game
   */
  randomizeGame() {
    this.#gameOver = false;
    this.#counter = 0;
    this.#boxes = [];
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 0; i < this.#SIZE; i++) {
      let row = [];
      for (let j = 0; j < this.#SIZE; j++) {
        const randomElementIndex = Math.floor(Math.random() * numbers.length);
        row.push(new EightPuzzleBox(numbers[randomElementIndex]));
        numbers.splice(randomElementIndex, 1);
      }  
      this.#boxes.push(row);
    }
    console.log(this.#boxes);
    this.#puzzleView.draw(this.#boxes, this.#counter);
  }

  /**
   * Generates a game over
   */
  generateGameOver() {
    this.#gameOver = false;
    this.#counter = 0;
    this.#boxes = [];
    let number = 1;
    let column = number;
    for (let i = 0; i < this.#SIZE; i++) {
      let row = [];
      let column = number;
      for (let j = 0; j < this.#SIZE; j++) {
        if (column === 9) {
          row.push(new EightPuzzleBox(0));
          continue;
        }
        row.push(new EightPuzzleBox(column));
        column += 3;
      }
      number++;
      this.#boxes.push(row);
    }
    console.log(this.#boxes);
    this.#puzzleView.draw(this.#boxes, this.#counter);
  }

  /**
   * Calculates if is game over
   */
  gameOver() {
    let number = 1;
    for (let i = 0; i < this.#SIZE; i++) {
      for (let j = 0; j < this.#SIZE; j++) {
        if (!Boolean(this.#boxes[i][j].getNumber())) continue;
        if (this.#boxes[j][i].getNumber() !== number) {
          return false;
        }
        number++;
      }  
    }
    console.log('GAME OVER');
    return true;
  }

  /**
   * Indicates if is game over
   * @returns {Boolean}
   */
  isGameOver() {
    return this.#gameOver;
  }

  /**
   * Returns size
   * @returns {Number}
   */
  getSize() {
    return 3;
  }

  /**
   * Try a movement and performs it if is possible
   * @param {Object} position 
   */
  tryMove(position) {
    console.log(position);
    const xCoord = position['column'];
    const yCoord = position['row'];
    const origin = this.#boxes[xCoord][yCoord];
    if (Boolean(this.#boxes[xCoord + 1]) && 
        !Boolean(this.#boxes[xCoord + 1][yCoord].getNumber())) {
      this.#boxes[xCoord][yCoord] = this.#boxes[xCoord + 1][yCoord];
      this.#boxes[xCoord + 1][yCoord] = origin;
      this.#counter++;
      this.#puzzleView.draw(this.#boxes, this.#counter);
      return;
    }
    if (Boolean(this.#boxes[xCoord - 1]) && 
        !Boolean(this.#boxes[xCoord - 1][yCoord].getNumber())) {
      this.#boxes[xCoord][yCoord] = this.#boxes[xCoord - 1][yCoord];
      this.#boxes[xCoord - 1][yCoord] = origin;
      this.#counter++;
      this.#puzzleView.draw(this.#boxes, this.#counter);
      return;
    }
    if (Boolean(this.#boxes[xCoord][yCoord + 1]) && 
        !Boolean(this.#boxes[xCoord][yCoord + 1].getNumber())) {
      this.#boxes[xCoord][yCoord] = this.#boxes[xCoord][yCoord + 1];
      this.#boxes[xCoord][yCoord + 1] = origin;
      this.#counter++;
      this.#puzzleView.draw(this.#boxes, this.#counter);
      return;
    }
    if (Boolean(this.#boxes[xCoord][yCoord - 1]) &&
        !Boolean(this.#boxes[xCoord][yCoord - 1].getNumber())) {
      this.#boxes[xCoord][yCoord] = this.#boxes[xCoord][yCoord - 1];
      this.#boxes[xCoord][yCoord - 1] = origin;
      this.#counter++;
      this.#puzzleView.draw(this.#boxes, this.#counter);
      return;
    }
  }

  /**
   * Indicates if the box contains a number
   * @param {Object} position 
   */
  isNumber(position) {
    return Boolean(this.#boxes[position['column']][position['row']]);
  }
}
