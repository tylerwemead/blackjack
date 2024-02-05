let deck = [];
const DECK_NUMBER = 6;
const SUITS = 4;
const SUIT_SIZE = 13;
const DEALT_HAND = 2;
let playerHand = [];
let dealerHand = [];
let playerScore;
let dealerScore;

const PLAYER_HAND = document.querySelector(".playerHand");
const DEALER_HAND = document.querySelector(".dealerHand");
const HAND_ACTIONS = document.querySelector(".handActions");
const DEAL_BUTTON = document.querySelector(".deal");
const HIT_BUTTON = document.querySelector(".handHit");
const PLAYER_SCORE = document.querySelector(".playerScore");


const faceValue = {
    0: "ACE",
    1: "TWO",
    2: "THREE",
    3: "FOUR",
    4: "FIVE",
    5: "SIX",
    6: "SEVEN",
    7: "EIGHT",
    8: "NINE",
    9: "TEN",
    10: "JACK",
    11: "QUEEN",
    12: "KING"
}

const suitValue = {
    0: "HEARTS",
    1: "DIAMONDS",
    2: "SPADES",
    3: "CLUBS"
}

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.valueView;
        this.suitView;
    }    
}

function buildDeck() {
    for (let d = 0; d < DECK_NUMBER; d++) {
        for (let i = 0; i < SUITS; i++) {
            for (let j = 0; j < SUIT_SIZE; j++) {
                let card = new Card;
                card.suit = i;
                card.value = j;
                card.suitView = suitValue[i];
                card.valueView = faceValue[j];
                deck.push(card);
            }
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function initialDeal() {
    for (let i = 0; i < DEALT_HAND; i++) {
        playerHand.push(deck.pop());
        dealerHand.push(deck.pop());
        if (!PLAYER_HAND.textContent) {
            PLAYER_HAND.textContent = `${playerHand[i].valueView} of ${playerHand[i].suitView}`;
        } else {
            PLAYER_HAND.textContent = `${PLAYER_HAND.textContent}, ${playerHand[i].valueView} of ${playerHand[i].suitView}`;
        }
    }
    console.log(playerHand);
    console.log(dealerHand);
    let score = scoreHand(playerHand);
    if (score == 21) {
        PLAYER_SCORE.textContent = "BLACKJACK";
    }
    
}

function scoreHand(hand) {
    let score = 0;
    console.log(hand.length);
    for(let i = 0; i < hand.length; i++){
        if (hand[i].value > 8) {
            score += 10;
        } else if (hand[i].value > 0) {
            score += hand[i].value + 1;
        } else if (hand[i].value == 0) {
            score += 11;
        }
    }
    
    for (let i = 0; i < hand.length; i++){
        if (hand[i].value == 0 && score > 21) {
            score -= 10;
        }
    }
    console.log(score);
    if (score > 21) {
        PLAYER_SCORE.textContent = "BUST";
        return;
    }
    PLAYER_SCORE.textContent = score.toString();
    return score;
}

function hit(hand) {
    if (hand[0] == null) {
        return;
    }
    hand.push(deck.pop());
    PLAYER_HAND.textContent = `${PLAYER_HAND.textContent}, ${playerHand[playerHand.length - 1].valueView} of ${playerHand[playerHand.length - 1].suitView}`;
    console.log(hand);
    scoreHand(playerHand);
}

buildDeck();
shuffleDeck();
DEAL_BUTTON.addEventListener("click", initialDeal);
HIT_BUTTON.addEventListener("click", () => {hit(playerHand);});

