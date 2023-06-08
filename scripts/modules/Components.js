export default class Components {
  createTagComponent(tag, className, value = null) {
    const content = document.createElement(tag);
    content.classList.add(className);
    content.innerText = value;

    return content;
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

  createArrayComponent(word = 'word', tag = 'section', className) {
    const content = this.createTagComponent(tag, className);

    for (let i = 0; i < word.length; i++) {
      let letter = this.createTagComponent('p', 'a');
      letter.dataset.value = word[i].toUpperCase();
      content.appendChild(letter);
    }

    return content;
  }
}
