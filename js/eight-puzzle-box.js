/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Ángel Tornero Hernández
 * @date 18 May 2021
 * @brief Class Eight Puzzle Box.
 * @link https://github.com/PAI-ULL/pai-practica13-halma-mvc-alu0101224084
 * @link https://es.wikipedia.org/wiki/Halma
 */

export class EightPuzzleBox {
  /**
   * Number that box represents.
   * @private
   */
  #number;
  /**
   * Create a EightPuzzleBox object
   * @param {EightPuzzleView} puzzleView 
   */
  constructor(number = 0) {
    this.#number = number;
  }

  /**
   * Get the number that box represents
   * @returns {Number}
   */
  getNumber() {
    return this.#number;
  }
}
