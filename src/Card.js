import {API} from './API.js';

export class Card {
    constructor(data, keyword) {
        this.data = data;
        this.keyword = keyword;
        this.source = data.source.name;
        this.title = data.title;
        this.publishedAt = data.publishedAt;
        this.description = data.description;
        this.urlToImage = data.urlToImage;
        this.link = data.url;
        this.card = this.createCard();
        this.applyEvents();
        this.id = undefined;
    }

    applyEvents(){
        if (!localStorage.getItem('token')) {
            this.card.querySelector('.news-article__save').addEventListener('mouseover', () => {
                this.card.querySelector('.news-article__remove').style.display = 'block';
            });
            this.card.querySelector('.news-article__save').addEventListener('mouseout', () => {
                this.card.querySelector('.news-article__remove').style.display = 'none';
            });
        }
        else {
            this.card.querySelector('.news-article__save').addEventListener('click', ()=>{
                if(this.card.querySelector('.news-article__save').style.backgroundImage !== 'url("../../../images/Rectangle_active.png")') {
                    new API(this.data).saveCard()
                        .then((resp)=>{
                            this.card.querySelector('.news-article__save').style.backgroundImage = 'url("../../../images/Rectangle_active.png")';
                            this.id = resp.id;
                        })
                        .catch((err)=>{
                            this.card.querySelector('.news-article__remove').innerHTML = err;
                            this.card.querySelector('.news-article__remove').style.display = 'block';
                        })
                }
                else {
                    new API(this.data).deleteCard()
                        .then(()=>{
                            this.card.querySelector('.news-article__save').style.backgroundImage = 'url("../../../images/Rectangle 8.png")';
                        })
                        .catch((err)=>{
                            this.card.querySelector('.news-article__remove').value = err;
                            this.card.querySelector('.news-article__remove').style.display = 'block';
                        })
                }
            });
        }
    }

    createCard(){
        const card = document.createElement("div");
        card.classList.add('news-article');
        const dictionary = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        const dateFormat = `${new Date(this.publishedAt).getDate()} ` + `${dictionary[new Date(this.publishedAt).getMonth()]}, ` + `${new Date(this.publishedAt).getFullYear()}`;
        const cutDescr = this.description.slice(0, 100) + '...';
        card.innerHTML = `<div class="news-article__background" style="background-image: url(${this.urlToImage})"></div>
                    <div class="news-article__save"></div>
                    <div class="news-article__remove">Войдите, чтобы сохранять статьи</div>
                    <p class="news-article__date">${dateFormat}</p>
                    <h3 class="news-article__heading">${this.title}</h3>
                    <p class="news-article__text">${cutDescr}</p>
                    <p class="news-article__media">${this.source}</p>`;
        return card;
    }
}