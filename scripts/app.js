import Menu from './modules/Menu.js';

const menu = new Menu();

//menu.forca.createForca();

menu.handlerMenu();
document.querySelector('main').appendChild(menu.container);

console.log(menu);
