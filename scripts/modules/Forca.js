export default class Forca {
  constructor(clue = null, amountClue = 3) {
    this.data = null;
    this.word = null;
    this.letter = null;
    this.body = 6;
    this.amountClue = amountClue;
    this.countClue = 0;
    this.countLetters = [];
    this.clue = clue;
    this.mainComponent = document.createElement('main');
    this.gameComponent = null;
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
    let textClue = document.createElement('h2');
    textClue.innerText = this.clue;

    this.mainComponent.appendChild(textClue);
    this.mainComponent.appendChild(this.createSectionGame());
    document.body.appendChild(this.mainComponent);
  }

  createSectionGame() {
    let sectionGame = document.createElement('section');
    sectionGame.classList.add('main');

    for (let i = 0; i < this.word.length; i++) {
      let position = document.createElement('p');
      position.title = this.word[i].toLowerCase();
      sectionGame.appendChild(position);
    }

    let inputText = document.createElement('input');
    inputText.placeholder = 'Letra';
    inputText.type = 'text';
    inputText.maxLength = 1;
    this.handleEvent(inputText);
    sectionGame.appendChild(inputText);
    this.gameComponent = sectionGame;

    return sectionGame;
  }

  handleEvent(input) {
    input.addEventListener('keydown', (event) => {
      console.dir(event.target);
      this.letter = event.target.value;
      this.gameComponent.childNodes.forEach((element) => {
        if (element.title == event.target.value) {
          element.innerText = event.target.value;
        }
      });
    });
  }

  init() {
    this.getDataWorlds();
  }
}
