import Components from './Components.js';
import Forca from './Forca.js';

export default class Menu {
  constructor() {
    this.forca = new Forca();
    this.container = this.forca.createNode('section', 'menu');
    this.data = null;
  }

  async getDataWorlds() {
    const data = await fetch('./scripts/modules/data.json')
      .then((r) => r.json())
      .catch((err) => console.log(err));

    return data;
  }

  async getDataCharacter() {
    const data = await fetch('./scripts/modules/dataImages.json')
      .then((r) => r.json)
      .catch((err) => console.log(err));

    return data;
  }

  createMenu() {
    this.container.appendChild(this.createCategories());
  }

  createCategories() {
    if (this.data) {
      let buttons = this.forca.createNode('div', 'categories');
      buttons.appendChild(
        this.forca.createNode('button', 'btn-category', 'Random', {
          att: 'type',
          value: 'button',
        }),
      );

      this.data.forEach((element) => {
        buttons.appendChild(
          this.forca.createNode('button', 'btn-category', element.clue, {
            att: 'type',
            value: 'button',
          }),
        );
      });

      let selectCategory = '';
      buttons.childNodes.forEach((btn) => {
        btn.addEventListener('click', () =>
          this.seletedCategory(btn.innerText),
        );
      });

      return buttons;
    }
  }

  seletedCategory(category) {
    this.forca = new Forca('', category, 'Faustão');
    this.forca.createForca();
  }

  async handlerMenu() {
    this.data = await this.getDataWorlds();
    this.character = await this.getDataCharacter();

    this.createMenu();
  }
}
