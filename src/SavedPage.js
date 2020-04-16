import {API} from "./API";
import {CardField} from "./CardField";
import {Card} from "./Card";

if(window.location.href.split('/').slice(-1)[0] === 'saved.html'){
    const cardArea = new CardField(document.querySelector('.news-grid'));
    new API('').getCards()
        .then(res=>{
            return res.json()
        })
        .then(savedCards=>{
            document.querySelector('.header-saved-content__heading').innerHTML = `${localStorage.getItem('user')}, у вас ${savedCards.length} сохранённых статей`;
            for (let i = 0; i < savedCards.length; i += 1) {
                const createdCard = new Card(savedCards[i], savedCards[i].keyword).card;
                cardArea.addCard(createdCard);
            }
        })
        .catch(err=>{
            document.querySelector('.header-saved-content__heading').innerHTML = 'При загрузке статей произошла ошибка.';
            document.querySelector('.header-saved-content__caption').style.display = 'none';
            document.querySelector('.saved-field').style.display = 'none';
        });

}