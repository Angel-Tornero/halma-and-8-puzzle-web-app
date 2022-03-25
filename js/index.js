/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Ángel Tornero Hernández
 * @date 12 May 2021
 * @brief Html script for visualizing a halma board and allowing to play.
 * @link https://github.com/PAI-ULL/pai-practica13-halma-mvc-alu0101224084
 *
 */

import {BoardModel} from './board-model.js';
import {BoardView} from './board-view.js';
import {BoardControl} from './board-control.js';

const BOARD_SIZE = 9;

/**
 * Main program.
 */
const main = () => {
  const canvasBoard = document.getElementById('board');
  const canvasCounter = document.getElementById('counter');
  const button = document.getElementById('button1');

  const boardView = new BoardView(canvasBoard, canvasCounter, BOARD_SIZE);
  const boardModel = new BoardModel(BOARD_SIZE, boardView);
  const boardControl = new BoardControl(canvasBoard, boardModel, button);
}

main();