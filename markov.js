"use strict";

/** Textual markov chain generator. */

const argv = process.argv;
const fsP = require('fs/promises');

async function readMyFile(path) {
  let contents;
  try {
    contents = await fsP.readFile(path, 'utf8');

  } catch (err) {
    console.log('Error retrieving contents');
    process.exit(1);
  }
  return contents;
}

class MarkovMachine {
  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {

    let wordChains = {};

    for (let i = 0; i < this.words.length; i++) {
      let listOfNextWords = wordChains[this.words[i]] || [];
      if (this.words[i + 1]) {
        listOfNextWords.push(this.words[i + 1]);
      } else {
        listOfNextWords.push(null);
      }
      wordChains[this.words[i]] = listOfNextWords;
    }
    return wordChains;
  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {

    let textArrangement = [this.words[0]];
    let i = 0;

    do {
      let numberOfChoices;
      if (this.chains[`${textArrangement[i]}`]) {
        numberOfChoices = this.chains[`${textArrangement[i]}`].length;
      } else {
        break;
      }

      let randomWordSelection = Math.floor(Math.random() * numberOfChoices);
      let nextWord = this.chains[textArrangement[i]][randomWordSelection];

      if (nextWord) {
        textArrangement.push(nextWord);
        i++;
      } else {
        break;
      }
    } while (true);

    return textArrangement.join(" ");
  }
}

async function runMe() {
  const text = await readMyFile(argv[2]);
  const markovMachine = new MarkovMachine(text);
  console.log(markovMachine.getText());
}

runMe();

