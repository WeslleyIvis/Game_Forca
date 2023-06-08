import Components from './Components.js';

export default class Forca extends Components {
  constructor(word = null, clue = null, amountClue = 3) {
    super();
    this.word = word;
    this.letter = null;
    this.body = 6;
    this.amountClue = amountClue;
    this.countClue = 0;
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
    if (word == null && clue == null) {
      this.clue = clue =
        this.data[Math.floor(Math.random() * this.data.length)].clue;
      this.randomWord(clue);
    }

    if (word == null && clue !== null) {
      this.randomWord(clue);
    }
  }

  randomWord(category) {
    this.data.forEach((word) => {
      if (word.clue.toUpperCase() === category.toUpperCase()) {
        this.word = word.word[Math.floor(Math.random() * word.word.length)];
        this.countClue = Math.floor(this.word.length / this.amountClue);
      }
    });
  }

  handleEvents() {
    if (this.word == null) {
      this.createWord(this.word, this.clue);
    }
    this.createComponent();
  }

  createComponent() {
    this.mainComponent.appendChild(
      this.createTagComponent('h2', 'clue', this.clue),
    );

    console.log(this.word);
    this.mainComponent.appendChild(
      (this.gameComponent = this.createArrayComponent(
        this.word,
        'section',
        'box-word',
      )),
    );

    const inputText = this.createInput('text', 'inp-letter');
    this.buttonEvent(inputText);
    this.mainComponent.appendChild(inputText);
    this.mainComponent.appendChild(this.usedLetter);
    document.body.appendChild(this.mainComponent);
  }

  buttonEvent(input) {
    input.addEventListener('keyup', (event) => {
      this.letter = event.target.value.toUpperCase();
      this.gameComponent.childNodes.forEach((element) => {
        if (element.dataset.value == this.letter) {
          element.innerText = this.letter;
        }
      });

      if (
        !this.countLetters.includes(this.letter) &&
        this.letter !== ' ' &&
        !/[\d\W]/.test(this.letter)
      )
        this.countLetters.push(this.letter);

      this.writeUsedLetters();

      input.value = null;
    });
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
