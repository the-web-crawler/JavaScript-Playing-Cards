const cards = {
    ranks: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "JOKER"],
    aceHighRanks: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "JOKER"],
    makeDeck: function(jokers) {
        let deck = [{r:"A",s:"H",c:"red"},{r:"2",s:"H",c:"red"},{r:"3",s:"H",c:"red"},{r:"4",s:"H",c:"red"},{r:"5",s:"H",c:"red"},{r:"6",s:"H",c:"red"},{r:"7",s:"H",c:"red"},{r:"8",s:"H",c:"red"},{r:"9",s:"H",c:"red"},{r:"10",s:"H",c:"red"},{r:"J",s:"H",c:"red"},{r:"Q",s:"H",c:"red"},{r:"K",s:"H",c:"red"},{r:"A",s:"D",c:"red"},{r:"2",s:"D",c:"red"},{r:"3",s:"D",c:"red"},{r:"4",s:"D",c:"red"},{r:"5",s:"D",c:"red"},{r:"6",s:"D",c:"red"},{r:"7",s:"D",c:"red"},{r:"8",s:"D",c:"red"},{r:"9",s:"D",c:"red"},{r:"10",s:"D",c:"red"},{r:"J",s:"D",c:"red"},{r:"Q",s:"D",c:"red"},{r:"K",s:"D",c:"red"},{r:"A",s:"C",c:"black"},{r:"2",s:"C",c:"black"},{r:"3",s:"C",c:"black"},{r:"4",s:"C",c:"black"},{r:"5",s:"C",c:"black"},{r:"6",s:"C",c:"black"},{r:"7",s:"C",c:"black"},{r:"8",s:"C",c:"black"},{r:"9",s:"C",c:"black"},{r:"10",s:"C",c:"black"},{r:"J",s:"C",c:"black"},{r:"Q",s:"C",c:"black"},{r:"K",s:"C",c:"black"},{r:"A",s:"S",c:"black"},{r:"2",s:"S",c:"black"},{r:"3",s:"S",c:"black"},{r:"4",s:"S",c:"black"},{r:"5",s:"S",c:"black"},{r:"6",s:"S",c:"black"},{r:"7",s:"S",c:"black"},{r:"8",s:"S",c:"black"},{r:"9",s:"S",c:"black"},{r:"10",s:"S",c:"black"},{r:"J",s:"S",c:"black"},{r:"Q",s:"S",c:"black"},{r:"K",s:"S",c:"black"}];
        if (jokers) deck = deck.concat([{r:"JOKER", c:"red"}, {r:"JOKER", c:"black"}]);
        return deck;
    },
    shuffle: function(deck) {
        let newDeck = [];
        while(deck.length > 0) {
            const rand = Math.floor(Math.random()*deck.length);
            newDeck.push(deck[rand]);
            deck.splice(rand, 1);
        };
        return newDeck;
    },
    draw: function(deck) {
        const returnValue = {
            card: deck[deck.length - 1],
        };
        deck.splice(deck.length - 1);
        returnValue.deck = deck;
        return returnValue;
    },
    deal: function(deck, players, amount="imperfect") {
        if (isNaN(Number(amount)) || (amount <= Math.ceil(deck.length/players))) {
            if (amount === "imperfect") amount = Math.ceil(deck.length/players);
            if (amount === "perfect") amount = Math.floor(deck.length/players);
        }else {
            throw "Amount of cards to deal exceeds the length of the deck.";
        };
        const returnValue = {
            deck:null,
            hands:[],
        };
        for (let i = 0; i < players; i++) {
            returnValue.hands.push([]);
        };
        for (let currentCard = 0; currentCard < amount; currentCard++) {
            if (deck.length === 0) break;
            for (let player = 0; player < players; player++) {
                if (deck.length === 0) break;
                let drawn = this.draw(deck);
                returnValue.hands[player].push(drawn.card);
                deck = drawn.deck;
            };
        };
        returnValue.deck = deck;
        return returnValue;
    },
    numeric: function(rank, aceHigh=true) {
        if (aceHigh) {
            return this.aceHighRanks.indexOf(rank) + 2;
        }else {
            return this.ranks.indexOf(rank) + 1;
        };
    },
    unNumeric: function(rank, aceHigh=true) {
        if (aceHigh) {
            return this.aceHighRanks[rank - 2];
        }else {
            return this.ranks[rank - 1];
        };
    },
    repair: function(card) {
        let returnValue = [];
        let loopThrough = 1;
        if (card.constructor !== Object) loopThrough = card.length;
        for (let i = 0; i < loopThrough; i++) {
            let currentCard;
            card.constructor === Object ? currentCard = card : currentCard = card[i];
            currentCard.r = currentCard.r.toUpperCase();
            if (currentCard.r !== "JOKER") {
                currentCard.s = currentCard.s.toUpperCase();
                switch(currentCard.s) {
                    case "S":
                    case "C":
                        currentCard.c = "black";
                        break;
                    case "H":
                    case "D":
                        currentCard.c = "red";
                        break;
                };
            };
            returnValue.push(currentCard);
        };
        if (card.constructor === Object) {return returnValue[0]} else {return returnValue}; 
    },
    char: function(card, entity=true) {
        let returnValue = [];
        let loopThrough = 1;
        if (card.constructor !== Object) loopThrough = card.length;
        if (typeof card === "string") loopThrough = 1;
        for (let i = 0; i < loopThrough; i++) {
            let currentCard;
            if (card.constructor === Object) {
                currentCard = card
            }else {
                if (typeof card === "object") {
                    currentCard = card[i];
                }else {
                    currentCard = "back";
                };
            };
            if (currentCard !== "back") {
                currentCard = this.repair(currentCard);
                // https://www.htmlsymbols.xyz/games-symbols/playing-cards
                let n = 127136;
                if (currentCard.r !== "JOKER") {
                    if (["Q", "K"].includes(currentCard.r)) n++;
                    switch(currentCard.s) {
                        case "H":
                            n += 16;
                            break;
                        case "D":
                            n += 32;
                            break;
                        case "C":
                            n += 48;
                            break;
                    }
                    n += this.numeric(currentCard.r, false);
                }else {
                    n = 127167;
                };
                if (entity)  n = "&#" + n + ";";
                returnValue.push({n:n,c:currentCard.c});
            }else {
                let n = 127136;
                if (entity)  n = "&#" + n + ";";
                returnValue.push({n:n,c:"red"});
            };
        };
        if ((card.constructor === Object) || (typeof card === "string")) {return returnValue[0]} else {return returnValue} ;
    },
    charCard: function(n, forceColor=false) {
        let returnArray = (typeof n === "object");
        const returnValue = [];
        if (typeof n !== "object") n = [n];
        for (let i = 0; i < n.length; i++) {
            n[i] = Number(n[i]);
            returnValue.push({});
            if (n[i] !== 127167) {
                let sub;
                if ((n[i] >= 127137) && (n[i] <= 127150)) {
                    returnValue[i].s = "S";
                    sub = 127137;
                };
                if ((n[i] >= 127153) && (n[i] <= 127166)) {
                    returnValue[i].s = "H";
                    sub = 127153;
                };
                if ((n[i] >= 127169) && (n[i] <= 127182)) {
                    returnValue[i].s = "D";
                    sub = 127169;
                };
                if ((n[i] >= 127185) && (n[i] <= 127198)) {
                    returnValue[i].s = "C";
                    sub = 127185;
                };
                if (n[i] - sub === 12 || n[i] - sub === 13) sub++;
                returnValue[i].r = this.ranks[n[i] - sub];
                returnValue[i] = this.repair(returnValue[i]);
            }else {
                returnValue[i] = {r:"JOKER"};
            };

            if (forceColor !== false) {
                returnValue[i].c = forceColor;
            };
        };
        if (returnArray) {return returnValue} else {return returnValue[0]};
    },
};
