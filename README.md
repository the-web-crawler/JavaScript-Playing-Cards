# JavaScript Playing Cards
Use playing cards in JavaScript
## Playing Cards Overview
A standard deck of playing cards contains 52 cards. Each one of these cards has both a rank and a suit. The rank can be a number from 1-10 or can be Ace, Jack, Queen, or King. The suit can be Hearts, Diamonds, Clubs, or Spades. If it is one of the first two, then the card's color is red. If it is one of the last two, the card's color is black. Many decks of cards include two extra cards (one red and one black) which both have the rank JOKER and no suit.
## Getting started
In your HTML file, add a `script` element linked to the `cards.js` file.
```html
<script src="cards.js"></script>
<!-- or -->
<script src="https://raw.githubusercontent.com/the-web-crawler/JavaScript-Playing-Cards/main/cards.js"></script>
```
## Card Syntax
Each card is a plain object with three properties: `r` (rank), `s` (suit), and `c` (color). Jokers lack the `s` property.
``` js
//queen of hearts
const q = {
  r:"Q",
  s:"H",
  c:"red"
};

//black joker
const j = {
  r:"JOKER",
  c:"black",
};
```
## Creating a Deck of Cards
To create a standard deck of cards, use `cards.makeDeck()`. To create a 54 card deck with jokers, use `cards.makeDeck(true)`.
``` js
const myStandardDeck = cards.makeDeck(); // create array of card objects
console.log(myStandardDeck[0]); // {r: "A", s: "H", c: "red"}

const myDeck = cards.makeDeck(true); // create array of card objects with jokers at the end
console.log(myDeck[53]); // {r: "JOKER", c: "black"}
```
## Shuffling Cards
Use `cards.shuffle(deck)` to return an array of cards in randomized order. Note that the deck to be shuffled does not have to be full, and can also include duplicates of the same card.
## Drawing Cards
Use `cards.draw(deck)` to draw the "top" card of the deck. The return value is an object with two properties: `card`, which is the card that was at the end of the array, and `deck`, which is the original deck missing the card drawn. Note that this method changes the original array.
``` js
let cardDeck = cards.makeDeck(true);
let playerHand = [];
let drawn = cards.draw(cardDeck); //draw the card, which takes away the last card from cardDeck
playerHand.push(drawn.card); //add the drawn card to the player's hand

console.log(cardDeck === drawn.deck); //true
```
## Deal Cards to Multiple Players
The `deal(deck, players, amount="imperfect")` method takes three parameters. The first is the deck of cards to draw from. The second is the amount of players to deal to. The third is the amount of cards to deal. Alternatively, the amount can be "imperfect", which deals the entire deck, or "perfect", which deals as much of the deck as possible while keeping the number of cards in each hand the same. Here's how to deal 7 cards to 4 players:
```js
let cardDeck = cards.makeDeck(true);
let dealt = cards.deal(cardDeck, 4, 7); //deal 7 cards to each of the 4 players, drawing from cardDeck
let playerHands = dealt.hands; //this is an array of arrays (list of players' hands of cards)

console.log(cardDeck === dealt.deck); //true
```
## Measuring Ranks
Often times one will need to have the rank as a number value. The methods `numeric` and `unNumeric` will do this. Aces can be high or low, which can be specified. Note that when ace is high, it is greater than king but less than joker. Here is `cards.numeric()`:
```js
//syntax: cards.numeric(rank, aceHigh=true);
console.log( cards.numeric("4") ); //4
console.log( cards.numeric("K") ); //13
console.log( cards.numeric("A") ); //14
console.log( cards.numeric("A", false) ); //1
console.log( cards.numeric("JOKER") ); //15
console.log( cards.numeric("JOKER", false) ); //14
```
And `cards.unNumeric` basically works backwards:
```js
//syntax: cards.unNumeric(rank, aceHigh=true);
console.log( cards.unNumeric(4) ); //"4"
console.log( cards.unNumeric(13) ); //"K"
console.log( cards.unNumeric(14) ); //"A"
console.log( cards.unNumeric(1, false) ); //"A"
console.log( cards.unNumeric(15) ); //"JOKER"
console.log( cards.unNumeric(14, false) ); //"JOKER"
```
## Cards as Characters
There is a character pertaining to each playing card. You can view a full list [here](https://www.htmlsymbols.xyz/games-symbols/playing-cards). To show a card as a charater, use `cards.char(card)`. The parameter `card` can be a card object, the string `"back"` (which returns the playing card back character with the color red), or an array of these.
```js
let cardCharacter = cards.char( {r:"K", s:"H", c:"red"} );
let backOfCard = cards.char("back");
console.log( cardCharacter.n ); //"&#127166;"
console.log( cardCharacter.c ); //"red"

console.log( backOfCard.n ); //"&#127136;"
console.log( backOfCard.c ); //"red"
```
Or, specify that `card.n` should be in number form:
```js
let cardCharacter = cards.char( {r:"K", s:"H", c:"red"}, false);
console.log( cardCharacter.n ); //127166
console.log( cardCharacter.c ); //"red"
```
To convert the characters back into cards, use `cards.charCard(n)`.
```js
console.log( cards.charCard(127166) ); //{r:"K", s:"H", c:"red"}
console.log( cards.charCard(127136) ); //"back"
```
## License
Distributed under the MIT License. See [LICENSE.txt](LICENSE.txt) for more information.
## Acknowledgements
* [https://www.htmlsymbols.xyz/games-symbols/playing-cards](https://www.htmlsymbols.xyz/games-symbols/playing-cards)
