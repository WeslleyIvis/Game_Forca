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
    this.usedLetter = document.createElement('p');
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
    const textClue = document.createElement('h2');
    textClue.innerText = this.clue;

    this.mainComponent.appendChild(textClue);
    this.mainComponent.appendChild(this.createSectionGame());
    this.mainComponent.appendChild(this.createButtons());
    this.mainComponent.appendChild(this.usedLetter);
    this.usedLetter.classList.add('used-letters');
    document.body.appendChild(this.mainComponent);
  }

  createSectionGame() {
    const sectionGame = document.createElement('section');
    sectionGame.classList.add('box-word');

    for (let i = 0; i < this.word.length; i++) {
      let position = document.createElement('p');
      let pContent = document.createElement('div');
      pContent.classList.add('space-letter');
      pContent.appendChild(position);
      position.title = this.word[i].toUpperCase();
      sectionGame.appendChild(pContent);
    }

    return (this.gameComponent = sectionGame);
  }

  createButtons() {
    const inputText = document.createElement('input');
    inputText.classList.add('letter');
    inputText.placeholder = 'Letra';
    inputText.type = 'text';
    inputText.maxLength = 1;
    this.handleEvent(inputText);
    return inputText;
  }

  handleEvent(input) {
    input.addEventListener('keyup', (event) => {
      this.letter = event.target.value.toUpperCase();

      this.gameComponent.childNodes.forEach((element) => {
        if (element.firstChild.title == this.letter) {
          element.firstChild.innerText = this.letter;
        }
      });

      if (!this.countLetters.includes(this.letter) && this.letter !== ' ')
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
