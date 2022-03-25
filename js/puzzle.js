/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Ángel Tornero Hernández
 * @date 12 May 2021
 * @brief Html script for visualizing a 8-puzzle game and allowing to play.
 * @link https://github.com/PAI-ULL/pai-practica13-halma-mvc-alu0101224084
 *
 */

import {EightPuzzleModel} from './eight-puzzle-model.js';
import {EightPuzzleView} from './eight-puzzle-view.js';
import {EightPuzzleControl} from './eight-puzzle-control.js';

/**
 * Main program.
 */
const main = () => {
  const canvasEightPuzzle = document.getElementById('puzzle');
  const canvasCounter = document.getElementById('counter');
  const button = document.getElementById('button1');

  const eightPuzzleView = new EightPuzzleView(canvasEightPuzzle, canvasCounter);
  const eightPuzzleModel = new EightPuzzleModel(eightPuzzleView);
  const eightPuzzleControl = new EightPuzzleControl(canvasEightPuzzle, eightPuzzleModel, button);
}

main();