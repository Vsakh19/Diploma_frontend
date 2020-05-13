/*
import {Card} from './Card.js';
import {CardField} from './CardField.js';


if(window.location.href.split('/').slice(-1)[0] === 'search.html'){
    const cardArea = new CardField(document.querySelector('.news-grid'));
    const data = JSON.parse(sessionStorage.news);
    const keyword = sessionStorage.keyword;
    let counter = 0;
    if (data.totalResults !== 0){
        if(data.articles.length>=3) {
            for (let i = 0; i < 3; i += 1) {
                const createdCard = new Card(data.articles[i], keyword).card;
                cardArea.addCard(createdCard);
                counter += 1;
            }
        }
    }
    console.log(data.articles);

    document.querySelector('.show-more-btn').addEventListener('click', ()=>{
        const stopcounter = counter;
        if(data.articles.length - stopcounter>=3) {
            for (let i = stopcounter; i < stopcounter+3; i += 1) {
                const createdCard = new Card(data.articles[i], keyword).card;
                cardArea.addCard(createdCard);
                counter += 1;
            }
        }
        else {
            for (let i = stopcounter; i < data.articles.length; i += 1) {
                const createdCard = new Card(data.articles[i], keyword).card;
                cardArea.addCard(createdCard);
                counter += 1;
                document.querySelector('.show-more-btn').style.display = 'none';
            }
        }
    })


}
*/