export class API {
    constructor(data) {
        this.data = data;
    }

    sendSup(){
        const email = this.data[0];
        const password = this.data[1];
        const name = this.data[2];

        return fetch('http://getnewsbyword.tk/signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${name}`,
                email: `${email}`,
                password: `${password}`
            })
        })
    }

    sendSin(){
        const email = this.data[0];
        const password = this.data[1];

        return fetch('https://getnewsbyword.tk/signin', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: `${email}`,
                password: `${password}`
            })
        })
    }

    saveCard(){
        return fetch('https://getnewsbyword.tk/articles', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('token')
            },
            body: JSON.stringify({
                keyword: `${this.data.keyword}`,
                title: `${this.data.title}`,
                text: `${this.data.description}`,
                date: `${this.data.publishedAt}`,
                source: `${this.data.source}`,
                link: `${this.data.url}`,
                image: `${this.data.urlToImage}`
            })
        })
    }

    deleteCard(){
        return fetch(`https://getnewsbyword.tk/articles/${this.data.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('token')
            }
        })
    }
}