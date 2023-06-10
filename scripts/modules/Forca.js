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
    this.buttons = this.createArrayComponent(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZÇ',
      'section',
      'buttons',
      'button',
    );
    this.imagens = [
      'https://pbs.twimg.com/media/FKSuneVXsAMip3H.jpg',
      'https://pbs.twimg.com/media/FNhKDVWWYAM3RRY.jpg',
      'https://rvideos2.memedroid.com/videos/UPLOADED641/63b20d4a84dc0.webp',
      'https://rvideos2.memedroid.com/videos/UPLOADED641/63b20d4a84dc0.webp',
      'https://imageproxy.ifunny.co/crop:x-20,resize:640x,quality:90x75/images/fa634c9bcc68224650424d6b130119d09e984745fde8a4069d00c4d38585195c_1.jpg',
      'https://yt3.googleusercontent.com/SHJxMpwQV2c0JY7ICeV_ze63v2NLx1GCKqG_dQOMLh2DIkFLXTrJrQ4OieVovt9ae6VzcKP4=s900-c-k-c0x00ffffff-no-rj',
      'https://i.pinimg.com/originals/e4/dc/a8/e4dca847978d7224b53855a33de7a226.jpg',
    ];
    this.contentImage = this.createFigureComponent(
      this.imagens[0],
      'srIncrivel',
      'content-img',
    );
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
        this.word =
          word.word[Math.floor(Math.random() * word.word.length)].toUpperCase();
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

    this.mainComponent.appendChild(this.contentImage);

    this.mainComponent.appendChild(
      (this.gameComponent = this.createArrayComponent(
        this.word,
        'section',
        'box-word',
        'p',
      )),
    );

    this.selectLetterEvent(this.mainComponent.appendChild(this.buttons));

    this.clueEvent(
      this.mainComponent.appendChild(this.createButton('Dica', 'button-clue')),
    );

    this.mainComponent.appendChild(
      this.createArrayComponent('123456', 'div', 'body-forca', 'span'),
    );

    this.mainComponent.appendChild(this.usedLetter);
    document.body.appendChild(this.mainComponent);
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
    this.usedLettersWord = '';

    this.gameComponent.childNodes.forEach((element) => {
      if (element.dataset.value == letter) element.innerText = letter;

      if (element.innerText != '')
        this.usedLettersWord += element.dataset.value;
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
      this.contentImage.firstChild.src = this.imagens[this.body];
    }

    if (this.body == 6) {
      window.alert('Perdeu! a palavra certa é ' + this.word);
      disableInputs();
    }

    if (this.usedLettersWord.length == this.word.length) {
      window.alert('Venceu');
      disableInputs();
    }
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
