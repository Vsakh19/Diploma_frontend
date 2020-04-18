import {ServerAPI} from './ServerAPI.js';
import savedPic from './images/Rectangle_active.png';

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
        this._applyEvents();
        this.id = undefined;
    }

    _applyEvents(){
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
                if(this.card.querySelector('.news-article__save').style.backgroundImage !== `url("${savedPic}")`) {
                    this.data.source = this.data.source.name;
                    new ServerAPI(this.data).saveCard(this.keyword)
                        .then(res=>{
                            if (res.ok){
                                return res.json()
                            }
                            else  return Promise.reject(res.statusText)
                        
                        })
                        .then((resp)=>{
                            this.card.querySelector('.news-article__save').style.backgroundImage = `url("${savedPic}")`;
                            this.id = resp.id;
                            console.log(resp);
                        })
                        .catch((err)=>{
                            this.card.querySelector('.news-article__remove').innerHTML = err;
                            this.card.querySelector('.news-article__remove').style.display = 'block';
                        })
                }
                else {

                    new ServerAPI(this.data).deleteCard(this.id)
                        .then((res)=>{
                            if (res.ok){
                                this.card.querySelector('.news-article__save').style.backgroundImage = 'url("./images/Rectangle 8.png")';
                            }
                            else return Promise.reject(res.statusText)
                            
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
        card.querySelector('.news-article__heading').style.cursor = 'pointer';
        card.querySelector('.news-article__background').style.cursor = 'pointer';
        card.querySelector('.news-article__heading').addEventListener('click', ()=>{
            window.location.href = this.link;
        });
        card.querySelector('.news-article__background').addEventListener('click', ()=>{
            window.location.href = this.link;
        });
        return card;
    }


}