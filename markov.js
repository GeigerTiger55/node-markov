/** Textual markov chain generator. */

const argv = process.argv;
const fsP = require('fs/promises');

async function readMyFile(path){
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
    // TODO: implement this!
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
    console.log(wordChains, "wordchains");
    return wordChains;
  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // TODO: implement this!

    // - start at the first word in the input text
    let textArrangement = [this.words[0]];
    let i = 0;
    // - find a random word from the following-words of that
    do {
      console.log(i, "i");
      //check if any other options besides null
      //if null only option, then break
      let numberOfChoices;
      if (this.chains[`${textArrangement[i]}`]) {
        numberOfChoices = this.chains[`${textArrangement[i]}`].length;
      } else {
        break;
      }

      let randomWordSelection = Math.floor(Math.random() * numberOfChoices);
      let nextWord = this.chains[textArrangement[i]][randomWordSelection];
      //check if random word selected if word or if null
      if (nextWord) {
        textArrangement.push(nextWord);
        i++;
      } else {
        break;
      }
      console.log(textArrangement[i - 1], "text arr i-1");
    } while (true); //TODO: update to check if null
    // - repeat until reaching the terminal null
    console.log(textArrangement.join(" "), "text story");
    return textArrangement.join(" ");
  }
}

const text = readMyFile(argv[2]);
const markovMachine = new MarkovMachine(text);
console.log(markovMachine.getText());