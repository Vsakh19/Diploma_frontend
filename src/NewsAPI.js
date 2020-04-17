export class NewsAPI {
    constructor(keyword) {
        this.keyword = keyword;
    }

    getNews(){
        const curDate = new Date();
        const predate = new Date();
        const sevenAgo = predate.getDate() - 7;
        predate.setDate(sevenAgo);
        const url = 'http://newsapi.org/v2/everything?' +
            `q=${this.keyword}&` +
            'from=' + `${predate.getFullYear()}` + '-' + `${predate.getMonth()+1}` + '-' + `${predate.getDate()}` + '&' +
            'to=' + `${curDate.getFullYear()}` + '-' + `${curDate.getMonth()+1}` + '-' + `${curDate.getDate()}` + '&' +
            'pageSize=100' +
            'sortBy=popularity&' +
            'apiKey=8c2c1927a2a14e859f6f779b19745435';
        /*const url = 'http://newsapi.org/v2/everything?' +
            `q=${this.keyword}&` +
            'from=' + `${curDate.getFullYear()}` + '-' + `${curDate.getMonth()}` + '-' + `${curDate.getDate()}` + '&' +
            'pageSize=100' +
            'sortBy=popularity&' +
            'apiKey=8c2c1927a2a14e859f6f779b19745435';
            */
        return fetch(new Request(url));
    }
}