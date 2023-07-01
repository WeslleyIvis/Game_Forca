export default class Components {
  createNode(
    tag,
    className = null,
    text = null,
    attribute = { att: '', value: '', title: '' },
  ) {
    const content = document.createElement(tag);
    className ? content.classList.add(className) : null;
    text ? (content.innerText = text) : null;
    attribute.att && attribute.value
      ? content.setAttribute(attribute.att, attribute.value)
      : null;
    attribute.title ? (content.title = attribute.title) : null;

    return content;
  }

  createSelect(data = [], className, title, random = false) {
    const select = this.createNode('select', className, '', {
      title: title,
    });

    random
      ? select.appendChild(
          this.createNode('option', 'option-category', 'Random', {
            att: 'value',
            value: 'Random',
          }),
        )
      : null;

    data.forEach((option) => {
      select.appendChild(
        this.createNode('option', null, option.name, {
          att: 'value',
          value: option.name,
        }),
      );
    });

    return select;
  }

  createInputText(className, placeholder = 'digit', maxLength = 1) {
    const input = document.createElement('input');
    input.classList.add(className);
    input.placeholder = placeholder;
    input.maxLength = maxLength;

    return input;
  }

  createButton(value, className = null) {
    const button = document.createElement('input');
    button.type = 'button';
    button.value = value;
    button.classList.add(className);

    return button;
  }

  createArrayComponent(word = '', tag = '', className, childTag) {
    const content = this.createNode(tag, className);

    for (let i = 0; i < word.length; i++) {
      let letter = this.createNode(childTag);

      if (childTag.toUpperCase() === 'BUTTON') {
        letter.innerText = word[i];
      } else letter.dataset.value = word[i].toUpperCase();

      content.appendChild(letter);
    }

    return content;
  }

  createArrayWord(word = '', tag, className) {
    const container = this.createNode(tag, className);
    let wordList = [];
    let currentWord = '';

    for (let i = 0; i < word.length; i++) {
      if (word.charAt(i) !== ' ') {
        currentWord += word.charAt(i);
        if (i === word.length - 1) wordList.push(currentWord);
      } else {
        wordList.push(currentWord);
        currentWord = '';
      }
    }

    console.log(wordList);
    wordList.forEach((word) => {
      const containerWord = this.createNode('div', 'word-box');
      for (let i = 0; i < word.length; i++) {
        const letra = this.createNode('span', null, null, {
          att: 'value',
          value: word.charAt(i),
        });
        containerWord.appendChild(letra);
      }
      container.appendChild(containerWord);
    });

    console.log(container);
    return wordList;
  }

  createFigureComponent(src, alt = 'imagem', className) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');

    figure.classList.add(className);
    img.src = src;
    img.alt = alt;
    figure.appendChild(img);

    return figure;
  }
}
