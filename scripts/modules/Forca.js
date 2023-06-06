import Components from './Components.js';

export default class Forca extends Components {
  constructor(clue = null, amountClue = 3) {
    super();
    this.data = null;
    this.word = null;
    this.letter = null;
    this.body = 6;
    this.amountClue = amountClue;
    this.countClue = 0;
    this.countLetters = [];
    this.clue = clue;
    this.mainComponent = this.createTagComponent('main', 'main');
    this.gameComponent = null;
    this.usedLetter = this.createTagComponent('p', 'used-letters');
  }

  async getDataWorlds() {
    await fetch('./scripts/modules/data.json')
      .then((r) => r.json())
      .then((r) => {
        this.data = r;
        this.handleEvents();
      })
      .catch((error) => console.error(error));
  }

  createWord() {
    if (this.clue == null) {
      this.clue = this.data[Math.floor(Math.random() * this.data.length)].clue;
    }

    this.data.forEach((word) => {
      if (word.clue === this.clue) {
        this.word = word.word[Math.floor(Math.random() * word.word.length)];
        this.countClue = Math.floor(this.word.length / this.amountClue);
      }
    });
    console.log(this.word);
  }

  handleEvents() {
    console.log(this.data);
    if (this.word == null) {
      this.createWord();
    }
    this.createComponent();
  }

  createComponent() {
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
    this.getDataWorlds();
  }
}
