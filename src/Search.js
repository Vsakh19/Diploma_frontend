import {CardField} from "./CardField";
import {Card} from "./Card";
import {NewsAPI} from "./NewsAPI";

export class Search {
    constructor(form) {
        this.field = form.searchField;
        this.error = form.querySelector('.search-error');
        this.submit = form.submit;
        this.cardArea = new CardField(document.querySelector('.news-grid'));
        this.applyEvents();
    }
    _validate(){
        if (this.field.value.length === 0){
            this.error.style.display = 'block';
            this.submit.setAttribute('disabled', '');
            return false
        }
        else {
            this.error.style.display = 'none';
            this.submit.removeAttribute('disabled');
            return true
        }
    }

    getNews(keyword){
        const curDate = new Date();
        /*const predate = new Date();
        const sevenAgo = predate.getDate() - 1;
        predate.setDate(sevenAgo);
        const url = 'http://newsapi.org/v2/everything?' +
            `q=${keyword}&` +
            'from=' + `${predate.getFullYear()}` + '-' + `${predate.getMonth()}` + '-' + `${predate.getDate()}` + '&' +
            'to=' + `${curDate.getFullYear()}` + '-' + `${curDate.getMonth()}` + '-' + `${curDate.getDate()}` + '&' +
            'pageSize=100' +
            'sortBy=popularity&' +
            'apiKey=8c2c1927a2a14e859f6f779b19745435';*/
        const url = 'http://newsapi.org/v2/everything?' +
            `q=${keyword}&` +
            'from=' + `${curDate.getFullYear()}` + '-' + `${curDate.getMonth()}` + '-' + `${curDate.getDate()}` + '&' +
            'pageSize=100' +
            'sortBy=popularity&' +
            'apiKey=8c2c1927a2a14e859f6f779b19745435';
        return fetch(new Request(url));
    }

    showResult(news, keyword){
        const data = JSON.parse(news);
        let counter = 0;
        if (data.totalResults !== 0){
            if(data.articles.length>=3) {
                for (let i = 0; i < 3; i += 1) {
                    const createdCard = new Card(data.articles[i], keyword).card;
                    this.cardArea.addCard(createdCard);
                    counter += 1;
                }
            }
        }

        document.querySelector('.show-more-btn').addEventListener('click', ()=>{
            const stopcounter = counter;
            if(data.articles.length - stopcounter>=3) {
                for (let i = stopcounter; i < stopcounter+3; i += 1) {
                    const createdCard = new Card(data.articles[i], keyword).card;
                    this.cardArea.addCard(createdCard);
                    counter += 1;
                }
            }
            else {
                for (let i = stopcounter; i < data.articles.length; i += 1) {
                    const createdCard = new Card(data.articles[i], keyword).card;
                    this.cardArea.addCard(createdCard);
                    counter += 1;
                    document.querySelector('.show-more-btn').style.display = 'none';
                }
            }
        })
    }

    applyEvents(){
        this.field.addEventListener('input', ()=>{
            this._validate();
        });

        this.submit.addEventListener('click', (e)=>{
            this.cardArea.field.innerHTML = '';
            const preloader = document.createElement('i');
            preloader.classList.add('circle-preloader');
            e.preventDefault();
            document.querySelector('.search-result').style.display = 'block';
            if(this._validate()){
                document.querySelector('.search-result').appendChild(preloader);
                document.querySelector('.show-more-btn').style.display = 'none';
                new NewsAPI(this.field.value).getNews()
                    .then(res=>{
                        if (res.ok){
                            return res.json()
                        }
                        else Promise.reject(res.statusText)
                        .catch(()=>{
                            console.log(res.json());
                            document.querySelector('.search-result__heading').value = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
                            document.querySelector('.search-result').removeChild(preloader);
                        })
                    })
                    .then(res=>{
                        this.showResult(JSON.stringify(res), this.field.value);
                        document.querySelector('.show-more-btn').style.display = 'flex';
                        document.querySelector('.search-result').removeChild(preloader);
                    })
                    .catch(()=>{
                        document.querySelector('.search-result__heading').value = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
                    })
            }
        });
    }
}