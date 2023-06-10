const cards = {
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
        if (Number(amount) <= Math.ceil(deck.length/players)) {
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
        rank = rank.toUpperCase().replaceAll("JOKER", "15").replaceAll("J", "11").replaceAll("Q", "12").replaceAll("K", "13");
        if (aceHigh) {
            rank = rank.replaceAll("A", "14");
        }else {
            rank = rank.replaceAll("A", "1");
        };
        return Number(rank);
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
    svg: function(card) {
        let returnValue = [];
        let loopThrough = 1;
        if (card.constructor !== Object) loopThrough = card.length;
        for (let i = 0; i < loopThrough; i++) {
            let currentCard;
            card.constructor === Object ? currentCard = card : currentCard = card[i];
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
            let svg = 
            `<?xml version="1.0" encoding="utf-8"?>
            <svg style="width: 163.5px; height: 245px; background-color: white;" xmlns="http://www.w3.org/2000/svg">
                <text y="210px" style="font-size: 250px;" fill="` + currentCard.c + `">` + "&#" + n + ";" + `</text>
            </svg>`;
            returnValue.push("<img style='width: 163.5px; height: 245px; border: 2px solid " + currentCard.c + ";' src='data:image/svg+xml;base64," + btoa(svg) + "'>");
            // return svg;
        };
        if (card.constructor === Object) {return returnValue[0]} else {return returnValue} ;
    },
};
