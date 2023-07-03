import Components from './Components.js';
export default class Forca extends Components {
  constructor(main = null, menu, amountClue = 3) {
    super();
    this.main = document.querySelector(main);
    this.menu = menu;
    this.mainComponent = this.createNode('section', 'container-forca');
    this.data = menu.options.dataWord;
    this.word = '';
    this.usedLettersWord = '';
    this.letter = '';
    this.body = 0;
    this.amountClue = amountClue;
    this.maxClue = 0;
    this.countLetters = [];
    this.clue = menu.options.category;
    this.character = menu.options.character;
    this.contentImage = null;
    this.gameComponent = null;
    this.buttons = this.createArrayComponent(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZÇ',
      'section',
      'buttons',
      'button',
    );
  }

  createWord(word, clue) {
    if ((word == '' && clue == '') || clue == 'Random') {
      this.clue = clue =
        this.data[Math.floor(Math.random() * this.data.length)].name;
      this.randomWord(clue);
    }

    if (word == '' && clue !== '') {
      this.randomWord(clue);
    }
  }

  randomWord(category) {
    this.data.forEach((dataName) => {
      if (dataName.name.toUpperCase() === category.toUpperCase()) {
        this.word =
          dataName.word[
            Math.floor(Math.random() * dataName.word.length)
          ].toUpperCase();

        this.maxClue = Math.floor(this.word.length / this.amountClue);
      }
    });
  }

  handleEvents() {
    if (this.word == '') {
      this.createWord(this.word, this.clue);
    }
    this.createInterface();
  }

  async createInterface() {
    // Create Title h2, categoria da palavra
    this.mainComponent.appendChild(this.createNode('h2', 'clue', this.clue));

    // Get image do personagem selecioanda no menu
    //this.character = await this.getHeroImage(this.character);

    // Cria a imagem do personagem selecionado

    this.contentImage = this.createFigureComponent(
      this.character.images[this.body],
      'srIncrivel',
      'content-img',
    );

    this.mainComponent.appendChild(this.contentImage);

    // Cria a palavra

    this.mainComponent.appendChild(
      (this.gameComponent = this.createArrayWord(this.word, 'div', 'box-word')),
    );

    this.selectLetterEvent(this.mainComponent.appendChild(this.buttons));

    this.clueEvent(
      this.mainComponent.appendChild(this.createButton('Dica', 'button-clue')),
    );

    this.main.appendChild(this.mainComponent);
  }

  selectLetterEvent(node) {
    let timer = true;

    const interval = (seconds) => {
      let out = setTimeout(() => {
        timer = true;
      }, seconds);
    };

    const setLetter = (letter) => {
      this.letter = letter;
      this.validLetter(this.letter);
    };

    document.addEventListener('keydown', ({ key }) => {
      if (timer) {
        timer = false;
        interval(600);
        setLetter(key);
      }
    });

    node.childNodes.forEach((element) => {
      element.addEventListener(['click'], (event) => {
        setLetter(event.target.innerText.toUpperCase());
      });
    });
  }

  validLetter(letter) {
    letter = letter.toUpperCase();
    if (this.word.includes(' ')) {
      this.word = this.word.replace(/\s/g, '');
    }

    this.usedLettersWord = '';
    this.gameComponent.childNodes.forEach((element) => {
      element.childNodes.forEach((node) => {
        if (node.dataset.value.toUpperCase() == letter) node.innerText = letter;

        if (node.innerText != '') this.usedLettersWord += node.dataset.value;
      });
    });

    if (
      !this.countLetters.includes(letter) &&
      letter !== ' ' &&
      !/[1-9a-z]/.test(letter)
    ) {
      this.countLetters.push(letter);
      this.bodyLife(letter);

      this.buttons.childNodes.forEach((element) => {
        if (this.word.includes(letter) && element.innerText == letter) {
          element.disabled = true;
          element.classList.add('on-word');
        } else if (element.innerText == letter) {
          element.disabled = true;
          element.classList.add('off-word');
        }
      });
    }
  }

  clueEvent(node) {
    node.addEventListener('click', () => {
      const validLetter = () => {
        let randomLetter = 0;

        do {
          let count = 0;
          randomLetter =
            this.word[
              Math.floor(Math.random() * (this.word.length - count)) + count
            ];
          count++;
        } while (this.usedLettersWord.includes(randomLetter));

        if (this.maxClue >= 1) {
          this.validLetter(randomLetter);
        }

        this.maxClue--;
      };

      if (this.maxClue >= 1) validLetter();
      else node.disabled = true;
    });
  }

  bodyLife(letter) {
    const disableInputs = () => {
      this.mainComponent.childNodes.forEach((element) => {
        if (element.nodeName == 'INPUT') {
          element.disabled = true;
        }
      });
      this.buttons.childNodes.forEach((element) => {
        element.disabled = true;
        element.classList.add('off');
      });
    };

    if (!this.usedLettersWord.includes(letter) && this.body < 6) {
      this.body++;
      this.contentImage.firstChild.src = this.character.images[this.body];
    }

    if (this.body == 6) {
      this.mainComponent.appendChild(
        this.menu.modalFinishGame(this.menu, this.word),
      );

      disableInputs();
    }

    if (this.usedLettersWord.length == this.word.length) {
      this.mainComponent.appendChild(
        this.menu.modalFinishGame(this.menu, this.word),
      );
      disableInputs();
    }
  }

  finishGame(node, status) {
    const modalFinish = this.createNode('div', 'modal-finish');
    const statusGame = this.createNode('h2', '', 'ugauga');

    const buttons = [
      this.createButton('Continue', 'btn-menu'),
      this.createButton('Menu', 'btn-menu'),
    ];

    buttons.forEach((element) => {
      element.addEventListener('click', () => {
        node = element.innerText;
        return node;
      });
      this.main.appendChild(element);
    });

    modalFinish.appendChild(statusGame);
  }

  createForca(a) {
    this.handleEvents();
  }
}
