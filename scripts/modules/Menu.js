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
      'Categoria',
      {
        id: 'select-category',
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
      'Personagem',
      {
        id: 'select-character',
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

  select(data, title, selectNode = { id, selectTitle, random }) {
    let selectContent = this.forca.createNode('div', 'select-box');
    const label = document.createElement('label');
    label.innerText = title;
    label.setAttribute('for', selectNode.id);

    let customSelect = this.forca.createNode('div', 'custom-select');

    let select = this.forca.createSelect(
      data,
      selectNode.id,
      selectNode.selectTitle,
      selectNode.random,
    );

    selectContent.appendChild(label);
    customSelect.appendChild(select);
    selectContent.appendChild(customSelect);

    console.log(selectContent);
    return selectContent;
  }

  startGame(button) {
    // const audio = new Audio('./scripts/tom_1.mp3');
    // audio.play();

    button.addEventListener('click', () => {
      document.querySelector('main').removeChild(this.container);

      // Select random character
      if (this.options.character === '') {
        this.options.character =
          this.options.dataCharacter[
            Math.floor(Math.random() * this.options.dataCharacter.length)
          ];
      }
      // Create Forca game
      this.forca = new Forca(
        'main',
        '',
        this.options.category,
        this.options.dataWord,
        this.options.character,
      );

      this.forca.createForca();
      this.options.character = '';
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
