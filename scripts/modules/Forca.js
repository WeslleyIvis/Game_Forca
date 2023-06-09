import Components from './Components.js';

export default class Forca extends Components {
  constructor(word = '', clue = '', amountClue = 3) {
    super();
    this.word = word;
    this.usedLettersWord = '';
    this.letter = '';
    this.body = 0;
    this.amountClue = amountClue;
    this.maxClue = 0;
    this.countLetters = [];
    this.clue = clue;
    this.mainComponent = this.createTagComponent('main', 'main');
    this.gameComponent = null;
    this.usedLetter = this.createTagComponent('p', 'used-letters');
    this.data = './scripts/modules/data.json';
  }

  async getDataWorlds(data) {
    await fetch(data)
      .then((r) => r.json())
      .then((r) => {
        this.data = r;
        this.handleEvents();
      })
      .catch((error) => console.error(error));
  }

  createWord(word, clue) {
    if (word == '' && clue == '') {
      this.clue = clue =
        this.data[Math.floor(Math.random() * this.data.length)].clue;
      this.randomWord(clue);
    }

    if (word == '' && clue !== '') {
      this.randomWord(clue);
    }
  }

  randomWord(category) {
    this.data.forEach((word) => {
      if (word.clue.toUpperCase() === category.toUpperCase()) {
        this.word = word.word[Math.floor(Math.random() * word.word.length)];
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

  createInterface() {
    this.mainComponent.appendChild(
      this.createTagComponent('h2', 'clue', this.clue),
    );

    this.mainComponent.appendChild(
      (this.gameComponent = this.createArrayComponent(
        this.word,
        'section',
        'box-word',
      )),
    );

    this.textEvent(
      this.mainComponent.appendChild(
        this.createInputText('inp-letter', 'Leter'),
      ),
    );

    this.clueEvent(
      this.mainComponent.appendChild(this.createButton('Dica', 'button-clue')),
    );

    this.mainComponent.appendChild(
      this.createArrayComponent('123456', 'div', 'body-forca'),
    );

    this.mainComponent.appendChild(this.usedLetter);
    document.body.appendChild(this.mainComponent);
  }

  textEvent(node) {
    node.addEventListener('keyup', (event) => {
      this.letter = event.target.value.toUpperCase();

      this.validLetter(this.letter);

      node.value = null;
    });
  }

  validLetter(letter) {
    letter = letter.toUpperCase();
    this.usedLettersWord = '';

    this.gameComponent.childNodes.forEach((element) => {
      if (element.dataset.value == letter) element.innerText = letter;

      if (element.innerText != '')
        this.usedLettersWord += element.dataset.value;
    });

    if (
      !this.countLetters.includes(letter) &&
      letter !== ' ' &&
      !/[\d\W]/.test(letter)
    ) {
      this.countLetters.push(letter);
      this.bodyLife(letter);
    }
    this.writeUsedLetters();
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
    });
  }

  bodyLife(letter) {
    if (!this.usedLettersWord.includes(letter)) {
      console.log(letter);
      this.body++;
    }

    console.log(this.mainComponent.childNodes);

    if (this.body > 6) window.alert('Perdeu! a palavra certa é ' + this.word);
  }

  writeUsedLetters() {
    this.usedLetter.innerText = '';

    this.countLetters.forEach((value) => {
      this.usedLetter.innerText += value + ' - ';
    });
  }

  init() {
    this.getDataWorlds(this.data);
  }
}
