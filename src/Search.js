export class Search {
    constructor(form) {
        this.field = form.searchField;
        this.error = form.querySelector('.search-error');
        this.submit = form.submit;
        this.applyEvents();
    }
    validate(){
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

    applyEvents(){
        this.field.addEventListener('input', ()=>{
            this.validate();
        });

        this.submit.addEventListener('click', (e)=>{
            e.preventDefault();
            if(this.validate()){
                this.getNews(this.field.value)
                    .then(res=>{
                        return res.json();
                    })
                    .then(res=>{
                        sessionStorage.setItem('news', JSON.stringify(res));
                        sessionStorage.setItem('keyword', this.field.value);
                        window.location.href = '/search.html';
                    })
                    .catch(()=>{
                        document.querySelector('.search-result__heading').value = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
                    })
            }
        });
    }
}