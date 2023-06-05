export default class Forca {
  constructor(clue) {
    this.data = null;
    this.clue = clue;
    this.word = null;
    this.body = 6;
    this.CountClue = 0;
  }

  async generateWord() {
    await fetch('./scripts/modules/data.json')
      .then((r) => r.json())
      .then((r) => {
        this.data = r;
        this.handleEvents();
      })
      .catch((error) => console.error(error));
  }

  handleEvents() {
    console.log(this.data);
    if (this.word == null) {
      this.createWord();
    }

    this.createComponent();
  }

  createWord() {
    this.data.forEach((word) => {
      if (word.clue === this.clue) {
        this.word = word.word[Math.floor(Math.random() * word.word.length)];
      }
    });
    console.log(this.word);
  }

  createComponent() {
    let main = document.createElement('main');
    main.classList.add('main');

    for (let i = 0; i < this.word.length; i++) {
      let position = document.createElement('p');
      position.setAttribute('value', this.word[i].toLowerCase());

      main.appendChild(position);
    }

    let inputText = document.createElement('input');
    inputText.placeholder = 'Character';
    inputText.type = 'text';
    inputText.maxLength = 1;

    main.appendChild(inputText);

    document.body.appendChild(main);
  }

  init() {
    this.generateWord();
  }
}
