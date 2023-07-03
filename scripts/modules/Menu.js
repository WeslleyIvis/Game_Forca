import Components from './Components.js';
import Forca from './Forca.js';
export default class Menu {
  constructor(dataWord, dataCharacter) {
    this.node = new Components();
    this.container = this.node.createNode('section', 'menu');
    this.options = {
      dataWord: dataWord,
      dataCharacter: dataCharacter,
      category: 'Random',
      charName: '',
      character: [],
    };
  }

  setCategory(value) {
    this.options.category = value;
  }

  setCharacter(value = '') {
    if (value === '' || value === 'Random') {
      this.options.character =
        this.options.dataCharacter[
          Math.floor(Math.random() * this.options.dataCharacter.length)
        ];
    } else {
      this.options.dataCharacter.forEach((char) => {
        if (char.name === value) this.options.character = char;
      });
    }

    return this.options.character;
  }

  createMenu() {
    this.setCharacter('');

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
      this.options.charName = event.target.value;
    });

    this.container.appendChild(selectCategory);
    this.container.appendChild(selectCharacter);

    return this.container;
  }

  select(data, title, selectNode = { id, selectTitle, random }) {
    let selectContent = this.node.createNode('div', 'select-box');
    const label = document.createElement('label');
    label.innerText = title;
    label.setAttribute('for', selectNode.id);

    let customSelect = this.node.createNode('div', 'custom-select');

    let select = this.node.createSelect(
      data,
      selectNode.id,
      selectNode.selectTitle,
      selectNode.random,
    );

    selectContent.appendChild(label);
    customSelect.appendChild(select);
    selectContent.appendChild(customSelect);

    return selectContent;
  }

  modalFinishGame(options, word) {
    const modal = this.node.createNode('div', 'modal-finish');
    modal.appendChild(this.node.createNode('h2', null, word));

    const btnC = this.node.createButton('Continua');
    btnC.addEventListener('click', () => {
      document
        .querySelector('main')
        .removeChild(document.querySelector('main').firstChild);
      const forca = new Forca('main', options);
      forca.createForca();
    });

    const btnM = this.node.createButton('Menu');
    btnM.addEventListener('click', () => {
      document
        .querySelector('main')
        .removeChild(document.querySelector('main').firstChild);
      document.querySelector('main').appendChild(this.container);
    });

    modal.appendChild(btnC);
    modal.appendChild(btnM);

    return modal;
  }

  handlerMenu() {
    this.createMenu();
  }
}
