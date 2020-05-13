import {ServerAPI} from "./ServerAPI";

export class SavedCard {
    constructor(data, keyword) {
        this.data = data;
        this.keyword = keyword;
        this.id = this.data._id;
        this.source = data.source;
        this.title = data.title;
        this.link = data.url;
        this.card = this._createSavedCard();
    }

    _createSavedCard(){
        const card = document.createElement("div");
        card.classList.add('news-article');
        const dictionary = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        const dateFormat = `${new Date(this.data.date).getDate()} ` + `${dictionary[new Date(this.data.date).getMonth()]}, ` + `${new Date(this.data.date).getFullYear()}`;
        const cutDescr = this.data.text.slice(0, 100) + '...';
        card.innerHTML = `<div class="news-article__background" style="background-image: url(${this.data.image})"></div>
                    <div class="news-article__trash"></div>
                    <div class="news-article__remove">Убрать из сохраненных</div>
                    <div class="news-article__tag">${this.keyword}</div>
                    <p class="news-article__date">${dateFormat}</p>
                    <h3 class="news-article__heading">${this.title}</h3>
                    <p class="news-article__text">${cutDescr}</p>
                    <p class="news-article__media">${this.source}</p>`;
        card.querySelector('.news-article__heading').style.cursor = 'pointer';
        card.querySelector('.news-article__background').style.cursor = 'pointer';
        card.querySelector('.news-article__heading').addEventListener('click', ()=>{
            window.location.href = this.link;
        });
        card.querySelector('.news-article__background').addEventListener('click', ()=>{
            window.location.href = this.link;

        });
        card.querySelector('.news-article__trash').addEventListener('click', ()=>{
            new ServerAPI('').deleteCard(this.id)
                .then(res=>{
                    if (res.ok){
                        window.location.href = '/saved.html';
                    }
                    else return Promise.reject(res.statusText)
                })
                .catch(err=>{
                    card.querySelector('.news-article__remove').innerHTML = err;
                })
        });



        return card;
    }
}