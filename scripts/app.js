import Forca from './modules/Forca.js';

const button = document.createElement('button');
button.value = 'asdasd';
document.body.appendChild(button);

let game = new Forca();

console.log('teste');

button.addEventListener('click', () => {
  game = new Forca();
  game.init();
});

game.init();

console.log(game);
