const textAreaAtt = {
  name: 'textarea',
  id: 'textarea',
  cols: '100',
  rows: '10',
  placeholder: 'Please, type your text here...',
};

function createTextArea() {
  const textArea = document.createElement('textarea');
  Object.entries(textAreaAtt).forEach((element) => {
    textArea.setAttribute(element[0], element[1]);
  });
  return textArea;
}

let language = localStorage.getItem('language') ? 'true' : 'false';

const TEXTAREA = createTextArea();

const keyboardDesc = [
  // row1
  [{ className: 'Backquote ruLet', eng: ['`', '~'], rus: ['ё', 'Ё'] },
    { className: 'Digit1', eng: ['1', '!'], rus: ['1', '!'] },
    { className: 'Digit2', eng: ['2', '@'], rus: ['2', '"'] },
    { className: 'Digit3', eng: ['3', '#'], rus: ['3', '№'] },
    { className: 'Digit4', eng: ['4', '$'], rus: ['4', ';'] },
    { className: 'Digit5', eng: ['5', '%'], rus: ['5', '%'] },
    { className: 'Digit6', eng: ['6', '^'], rus: ['6', ':'] },
    { className: 'Digit7', eng: ['7', '&'], rus: ['7', '?'] },
    { className: 'Digit8', eng: ['8', '*'], rus: ['8', '*'] },
    { className: 'Digit9', eng: ['9', '('], rus: ['9', '('] },
    { className: 'Digit0', eng: ['0', ')'], rus: ['0', ')'] },
    { className: 'Minus', eng: ['-', '_'], rus: ['-', '_'] },
    { className: 'Equal', eng: ['=', '+'], rus: ['=', '+'] },
    { className: 'Backspace', Backspace: 'Backspace' }],
  // row2
  [{ className: 'Tab', Tab: 'Tab' },
    { className: 'KeyQ Letter', eng: ['q', 'Q'], rus: ['й', 'Й'] },
    { className: 'KeyW Letter', eng: ['w', 'W'], rus: ['ц', 'Ц'] },
    { className: 'KeyE Letter', eng: ['e', 'E'], rus: ['у', 'У'] },
    { className: 'KeyR Letter', eng: ['r', 'R'], rus: ['к', 'К'] },
    { className: 'KeyT Letter', eng: ['t', 'T'], rus: ['е', 'Е'] },
    { className: 'KeyY Letter', eng: ['y', 'Y'], rus: ['н', 'Н'] },
    { className: 'KeyU Letter', eng: ['u', 'U'], rus: ['г', 'Г'] },
    { className: 'KeyI Letter', eng: ['i', 'I'], rus: ['ш', 'Ш'] },
    { className: 'KeyO Letter', eng: ['o', 'O'], rus: ['щ', 'Щ'] },
    { className: 'KeyP Letter', eng: ['p', 'P'], rus: ['з', 'З'] },
    { className: 'BracketLeft ruLet', eng: ['[', '{'], rus: ['х', 'Х'] },
    { className: 'BracketRight ruLet', eng: [']', '}'], rus: ['ъ', 'Ъ'] },
    { className: 'Backslash', eng: ['\\', '|'], rus: ['\\', '/'] },
    { className: 'Delete', Del: 'Del' }],
  // row3
  [{ className: 'CapsLock', CapsLock: 'CapsLock' },
    { className: 'KeyA Letter', eng: ['a', 'A'], rus: ['ф', 'Ф'] },
    { className: 'KeyS Letter', eng: ['s', 'S'], rus: ['ы', 'Ы'] },
    { className: 'KeyD Letter', eng: ['d', 'D'], rus: ['в', 'В'] },
    { className: 'KeyF Letter', eng: ['f', 'F'], rus: ['а', 'А'] },
    { className: 'KeyG Letter', eng: ['g', 'G'], rus: ['п', 'П'] },
    { className: 'KeyH Letter', eng: ['h', 'H'], rus: ['р', 'Р'] },
    { className: 'KeyJ Letter', eng: ['j', 'J'], rus: ['о', 'О'] },
    { className: 'KeyK Letter', eng: ['k', 'K'], rus: ['л', 'Л'] },
    { className: 'KeyL Letter', eng: ['l', 'L'], rus: ['д', 'Д'] },
    { className: 'Semicolon ruLet', eng: [';', ':'], rus: ['ж', 'Ж'] },
    { className: 'Quote ruLet', eng: ['\'', '"'], rus: ['э', 'Э'] },
    { className: 'Enter', Enter: 'Enter' }],
  // row4
  [{ className: 'ShiftLeft', Shift: 'Shift' },
    { className: 'KeyZ Letter', eng: ['z', 'Z'], rus: ['я', 'Я'] },
    { className: 'KeyX Letter', eng: ['x', 'X'], rus: ['ч', 'Ч'] },
    { className: 'KeyC Letter', eng: ['c', 'C'], rus: ['с', 'С'] },
    { className: 'KeyV Letter', eng: ['v', 'V'], rus: ['м', 'М'] },
    { className: 'KeyB Letter', eng: ['b', 'B'], rus: ['и', 'И'] },
    { className: 'KeyN Letter', eng: ['n', 'N'], rus: ['т', 'Т'] },
    { className: 'KeyM Letter', eng: ['m', 'M'], rus: ['ь', 'Ь'] },
    { className: 'Comma ruLet', eng: [',', '<'], rus: ['б', 'Б'] },
    { className: 'Period ruLet', eng: ['.', '>'], rus: ['ю', 'Ю'] },
    { className: 'Slash', eng: ['/', '?'], rus: ['.', ','] },
    { className: 'ArrowUp', up: '▲' },
    { className: 'ShiftRight', Shift: 'Shift' }],
  // row5
  [{ className: 'ControlLeft', Ctrl: 'Ctrl' },
    { className: 'Meta', Win: 'Win' },
    { className: 'AltLeft', Alt: 'Alt' },
    { className: 'Space', Space: 'Space' },
    { className: 'Language', Language: 'En' },
    { className: 'AltRight', Alt: 'Alt' },
    { className: 'ControlRight', Ctrl: 'Ctrl' },
    { className: 'ArrowLeft', left: '◄' },
    { className: 'ArrowDown', down: '▼' },
    { className: 'ArrowRight', right: '►' }],
];

const functionalKeysNames = [];

class AddKey {
  constructor(obj, lang) {
    this.lang = lang;
    const keyButton = document.createElement('div');
    const classes = obj.className.split(' ');
    keyButton.classList.add('keyboard__key');
    keyButton.classList.add(...classes);
    keyButton.setAttribute('onclick', 'keyClick();');
    if (Object.prototype.hasOwnProperty.call(obj, 'eng')) {
      keyButton.classList.add('key');
      switch (this.lang) {
        case 'true': {
          keyButton.insertAdjacentHTML('beforeEnd', `<div class = "first">${obj.rus[0]}</div>`);
          keyButton.insertAdjacentHTML('afterBegin', `<div class = "second">${obj.rus[1]}</div>`);
          break;
        }
        default: {
          keyButton.insertAdjacentHTML('beforeEnd', `<div class = "first">${obj.eng[0]}</div>`);
          keyButton.insertAdjacentHTML('afterBegin', `<div class = "second">${obj.eng[1]}</div>`);
          break;
        }
      }
    } else {
      keyButton.classList.add('functional_keys');
      keyButton.insertAdjacentHTML('afterBegin', Object.entries(obj)[1][1]);
      functionalKeysNames.push(Object.entries(obj)[0][1]);
    }
    return keyButton;
  }
}

function createKeyboardRow(numberOfRow, lang) {
  const keyboardRow = document.createElement('div');
  keyboardRow.classList.add('keyboard__row');
  keyboardDesc[numberOfRow].forEach((option) => {
    const newKey = new AddKey(option, lang);
    keyboardRow.insertAdjacentElement('beforeEnd', newKey);
  });
  return keyboardRow;
}

function createKeyboard(lang) {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  for (let i = 0; i < keyboardDesc.length; i += 1) {
    keyboard.insertAdjacentElement('beforeEnd', createKeyboardRow(i, lang));
  }
  return keyboard;
}

const KEYBOARD = createKeyboard(language);
let allKeys = KEYBOARD.querySelectorAll('.keyboard__key');

function buttonLanguage(lang) {
  if (lang === 'true') {
    document.querySelector('.Language').innerHTML = 'RU';
  } else {
    document.querySelector('.Language').innerHTML = 'EN';
  }
}
const description = document.createElement('div');
description.classList.add('keyboard__desc');
description.innerHTML = 'Клавиатура сделана на Windows. Переключение языков (кнопкой en/ru или левый shift+alt)';

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('body').appendChild(TEXTAREA);
  document.querySelector('body').appendChild(KEYBOARD);
  document.querySelector('body').appendChild(description);
  buttonLanguage(language);
});

function insertTextCursor(text) {
  if ((TEXTAREA.selectionStart) || (TEXTAREA.selectionStart === '0')) {
    const curStart = TEXTAREA.selectionStart;
    const curEnd = TEXTAREA.selectionEnd;
    TEXTAREA.value = TEXTAREA.value.substring(0, curStart) + text + TEXTAREA.value.substring(curEnd, TEXTAREA.value.length);
    TEXTAREA.setSelectionRange(curStart + text.length, curStart + text.length);
  } else {
    TEXTAREA.value += text;
  }
}

/* Сhanging the language */

function languages() {
  if (!localStorage.getItem('language')) {
    language = 'true';
    localStorage.setItem('language', 'true');
  } else {
    language = 'false';
    localStorage.removeItem('language');
  }
  const KEYBOARD1 = createKeyboard(language);
  allKeys = KEYBOARD1.querySelectorAll('.keyboard__key');
  document.querySelector('.keyboard').replaceWith(KEYBOARD1);
  buttonLanguage(language);
}

/* Functional keys */

function capsLock() {
  const capsLockButton = document.querySelector('.CapsLock');
  const classes = Array.from(capsLockButton.classList);
  if (classes.includes('CapsLock-active')) {
    capsLockButton.classList.remove('CapsLock-active');
  } else {
    capsLockButton.classList.add('CapsLock-active');
  }
}
function shift(classes) {
  let shiftAll = '';
  if (classes.includes('ShiftRight')) {
    shiftAll = document.querySelector('.ShiftRight');
    if (classes.includes('Shift-active')) {
      shiftAll.classList.remove('Shift-active');
    } else {
      shiftAll.classList.add('Shift-active');
    }
  } else {
    shiftAll = document.querySelector('.ShiftLeft');
    if (classes.includes('Shift-active')) {
      shiftAll.classList.remove('Shift-active');
    } else {
      shiftAll.classList.add('Shift-active');
    }
  }
}

function backspace() {
  if (TEXTAREA.selectionStart === TEXTAREA.selectionEnd) {
    TEXTAREA.setRangeText('', TEXTAREA.selectionStart - 1, TEXTAREA.selectionEnd);
  } else {
    TEXTAREA.setRangeText('', TEXTAREA.selectionStart, TEXTAREA.selectionEnd);
  }
}

function del() {
  if (TEXTAREA.selectionStart === TEXTAREA.selectionEnd) {
    TEXTAREA.setRangeText('', TEXTAREA.selectionStart, TEXTAREA.selectionEnd + 1);
  } else {
    TEXTAREA.setRangeText('', TEXTAREA.selectionStart, TEXTAREA.selectionEnd);
  }
}
function arrowLeft() {
  TEXTAREA.focus();
  TEXTAREA.setSelectionRange(TEXTAREA.selectionStart - 1, TEXTAREA.selectionEnd - 1);
}
function arrowRight() {
  TEXTAREA.focus();
  TEXTAREA.setSelectionRange(TEXTAREA.selectionStart + 1, TEXTAREA.selectionEnd + 1);
}
function arrowDown() {
  TEXTAREA.focus();
  const len = TEXTAREA.value.length;
  TEXTAREA.setSelectionRange(len, len);
}
function arrowUp() {
  TEXTAREA.focus();
  TEXTAREA.setSelectionRange(0, 0);
}
function tab() {
  insertTextCursor('    ');
}
function space() {
  insertTextCursor(' ');
}
function enter() {
  insertTextCursor('\n');
}

/* adding content to TextAria */

function addContent(target) {
  const capsClasses = Array.from(document.querySelector('.CapsLock').classList);
  const shiftRightClasses = Array.from(document.querySelector('.ShiftRight').classList);
  const shiftLeftClasses = Array.from(document.querySelector('.ShiftLeft').classList);
  const classes = Array.from(target.classList);
  if (classes.includes('ShiftRight') || classes.includes('ShiftLeft')) shift(classes);
  if (classes.includes('CapsLock')) capsLock();
  if (classes.includes('AltLeft') && shiftLeftClasses.includes('Shift-active')) languages();
  if (language === 'true' && capsClasses.includes('CapsLock-active') && (shiftRightClasses.includes('Shift-active') || shiftLeftClasses.includes('Shift-active'))) {
    if (classes.includes('Letter') || classes.includes('ruLet')) {
      insertTextCursor(target.children[1].innerText);
    } else if (classes.includes('key') && (!classes.includes('Letter') || !classes.includes('ruLet'))) {
      insertTextCursor(target.children[0].innerText);
    }
  } else if (capsClasses.includes('CapsLock-active') && (shiftRightClasses.includes('Shift-active') || shiftLeftClasses.includes('Shift-active'))) {
    if (classes.includes('key') && classes.includes('Letter')) {
      insertTextCursor(target.children[1].innerText);
    } else if (classes.includes('key')) {
      insertTextCursor(target.children[0].innerText);
    }
  } else if (shiftRightClasses.includes('Shift-active') || shiftLeftClasses.includes('Shift-active')) {
    if (classes.includes('key')) {
      insertTextCursor(target.children[0].innerText);
    }
  } else if (capsClasses.includes('CapsLock-active')) {
    if (classes.includes('key')) {
      insertTextCursor(target.children[1].innerText.toUpperCase());
    }
  } else if (classes.includes('key')) {
    insertTextCursor(target.children[1].innerText);
  }
  if (classes.includes('Backspace')) backspace();
  if (classes.includes('Delete')) del();
  if (classes.includes('Enter')) enter();
  if (classes.includes('Language')) languages();
  if (classes.includes('Space')) space();
  if (classes.includes('Tab')) tab();
  if (classes.includes('ArrowLeft')) arrowLeft();
  if (classes.includes('ArrowRight')) arrowRight();
  if (classes.includes('ArrowDown')) arrowDown();
  if (classes.includes('ArrowUp')) arrowUp();
}

/* Listener */

function keyClick() {
  addContent(event.currentTarget);
}

document.addEventListener('keyup', () => {
  allKeys.forEach((button) => button.classList.remove('active'));
});

document.addEventListener('keydown', (event) => {
  if (event.isTrusted) event.preventDefault();
  allKeys.forEach((button) => {
    if (button.classList[1] === event.code) {
      button.classList.add('active');
      addContent(button);
    }
  });
});
