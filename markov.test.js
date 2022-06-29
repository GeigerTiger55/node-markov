"use strict";

const { MarkovMachine } = require("./markov.js");


//TODO: This is currently failing because .chains() is not returning the correct map.
describe("markov tests", function(){
  beforeAll(function(){
    
  });

  test("getChains function", function(){
    const testMachine = new MarkovMachine('The cat in the hat.');
    console.log(testMachine.chains, '*********************');
    const answerMap = new Map([
      ["The", ["cat"]],
      ["cat", ["in"]],
      ["in", ["the"]],
      ["the", ["hat."]],
      ["hat.", [null]],
    ]);
    console.log(answerMap, '/////////////////////////////');
    expect(testMachine.chains).toEqual(answerMap);
  });

})
