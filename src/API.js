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

    getCards(){
        return fetch('https://getnewsbyword.tk/articles', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('token')
            }
        })
    }

    saveCard(keyword){
        console.log(this.data.source);
        return fetch('https://getnewsbyword.tk/articles', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('token')
            },
            body: JSON.stringify({
                keyword: `${keyword}`,
                title: `${this.data.title}`,
                text: `${this.data.description}`,
                date: `${this.data.publishedAt}`,
                source: `${this.data.source}`,
                link: `${this.data.url}`,
                image: `${this.data.urlToImage}`
            })
        })
    }

    deleteCard(id){
        return fetch(`https://getnewsbyword.tk/articles/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('token')
            }
        })
    }

    getMe(){
        return fetch(`https://getnewsbyword.tk/users/me`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('token')
            }
        })
    }
}