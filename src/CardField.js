export class CardField {
    constructor(field) {
        this.field = field;
    }

    addCard(card){
        this.field.appendChild(card);
    }
}