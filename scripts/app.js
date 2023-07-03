import Menu from './modules/Menu.js';
import Forca from './modules/Forca.js';
import FecthData from './modules/FecthData.js';
import Components from './modules/Components.js';

const getData = new FecthData();
const dataWord = await getData.data('./scripts/modules/data.json');
const dataCharacter = await getData.data('./scripts/modules/dataImages.json');

const menu = new Menu(dataWord, dataCharacter);
const components = new Components();
let status = false;

// MENU

const startButton = components.createButton('Start', 'button-start');
menu.handlerMenu();

startButton.addEventListener('click', () => {
  document.querySelector('main').removeChild(menu.container);

  menu.setCharacter(menu.options.charName);
  const forca = new Forca('main', menu);

  forca.createForca(menu);
});

menu.container.appendChild(startButton);

document.querySelector('main').appendChild(menu.container);

//this.forca.finishGame('a', 'a');
