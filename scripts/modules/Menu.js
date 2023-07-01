import Forca from './Forca.js';

export default class Menu {
  constructor() {
    this.forca = new Forca();
    this.container = this.forca.createNode('section', 'menu');
    this.options = {
      dataWord: [],
      dataCharacter: [],
      category: 'Random',
      character: '',
    };
  }

  async getDataWorlds() {
    const data = await fetch('./scripts/modules/data.json')
      .then((r) => r.json())
      .catch((err) => console.log(err));

    return data;
  }

  async getDataCharacter() {
    const data = await fetch('./scripts/modules/dataImages.json')
      .then((r) => r.json())
      .catch((err) => console.log(err));

    return data;
  }

  setCategory(value) {
    this.options.category = value;
  }

  setCharacter(value) {
    this.options.dataCharacter.forEach((char) => {
      if (char.name === value) this.options.character = char;
    });
  }

  createMenu() {
    const selectCategory = this.select(
      this.options.dataWord,
      'Selecione a Categoria',
      {
        className: 'select-category',
        selectTitle: 'category',
        random: true,
      },
      this.options.category,
    );

    selectCategory.childNodes[1].addEventListener('change', (event) => {
      this.setCategory(event.target.value);
    });

    const selectCharacter = this.select(
      this.options.dataCharacter,
      'Selecione o Personagem',
      {
        className: 'select-character',
        selectTitle: 'character',
        random: true,
      },
    );

    selectCharacter.childNodes[1].addEventListener('change', (event) => {
      this.setCharacter(event.target.value);
    });

    const startButton = this.forca.createNode(
      'button',
      'button-start',
      'Iniciar',
      {
        att: 'type',
        value: 'button',
      },
    );

    this.startGame(startButton);

    this.container.appendChild(selectCategory);
    this.container.appendChild(selectCharacter);
    this.container.appendChild(startButton);
  }

  select(data, title, selectNode = { className, selectTitle, random }) {
    let selectContent = this.forca.createNode('div', 'select-box');
    selectContent.appendChild(this.forca.createNode('h2', null, title));

    let select = this.forca.createSelect(
      data,
      selectNode.className,
      selectNode.selectTitle,
      selectNode.random,
    );

    selectContent.appendChild(select);

    return selectContent;
  }

  startGame(button) {
    button.addEventListener('click', () => {
      this.container.innerHTML = '';

      this.forca = new Forca(
        '',
        this.options.category,
        this.options.dataWord,
        this.options.character,
      );

      this.forca.createForca();
    });
  }

  createInstaceForca(category) {
    this.forca = new Forca('', category, '');
    this.forca.createForca();
  }

  async handlerMenu() {
    this.options.dataWord = await this.getDataWorlds();
    this.options.dataCharacter = await this.getDataCharacter();

    this.createMenu();
  }
}
