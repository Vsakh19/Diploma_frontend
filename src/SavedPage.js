import {ServerAPI} from "./ServerAPI";
import {CardField} from "./CardField";
import {SavedCard} from "./SavedCard";

function findFrequent(arr){
    const sortedArr = arr.sort();
    const reduced = sortedArr.filter(function (val, index, arr){
        return arr.indexOf(val) === index;
    });
    let first = ['', 0];
    let second = ['', 0];
    let temp = [sortedArr[0], 1];
    for (let i = 1; i < sortedArr.length; i+=1){
        if (sortedArr[i] === temp[0]){
            temp[1] += 1;
        }
        else {
            if (temp[1] > first[1]) {
                first = [temp[0], temp[1]]
            }
            else if (temp[1] > second[1]) {
                second = [temp[0], temp[1]]
            }
            temp = [sortedArr[i], 1];
        }
        if (i === sortedArr.length-1){
            if (temp[1] > first[1]) {
                first = [temp[0], temp[1]]
            }
            else if (temp[1] > second[1]) {
                second = [temp[0], temp[1]]
            }
        }

    }
    return [first, second, reduced]
}


if(window.location.href.split('/').slice(-1)[0] === 'saved.html'){
    if (!localStorage.getItem('token')){
        window.location.href = '/';
    }
    const cardArea = new CardField(document.querySelector('.news-grid'));
    const heading = document.querySelector('.header-saved-content__heading');
    new ServerAPI('').getCards()
        .then(res=>{
            if (res.ok){
                return res.json()
            }
            else Promise.reject(res.statusText)
            .catch(err=>{
                console.log(err);
                heading.innerHTML = 'При загрузке статей произошла ошибка.';
                document.querySelector('.saved-field').style.display = 'none';
            })
        })
        .then(savedCards=>{
            const keysArray = [];
            document.querySelector('.header-saved-content__heading').innerHTML = `${localStorage.getItem('user')}, у вас ${savedCards.length} сохранённых статей`;
            for (let i = 0; i < savedCards.length; i += 1) {
                const createdCard = new SavedCard(savedCards[i], savedCards[i].keyword).card;
                cardArea.addCard(createdCard);
                keysArray.push(savedCards[i].keyword);
            }
            const calcedKeys = findFrequent(keysArray);
            const caption = document.createElement('h2');
            caption.classList.add('header-saved-content__caption');
            if (calcedKeys[2].length>2) {
                caption.innerHTML = `По ключевым словам: <span class="header-saved-content__bold">${calcedKeys[0][0]}
                </span>, <span class="header-saved-content__bold">${calcedKeys[1][0]}</span> и
                <span class="header-saved-content__bold">${calcedKeys[2].length - 2} другим</span>`;
            }
            else if (calcedKeys[2].length === 1) {
                caption.innerHTML = `По ключевому слову: <span class="header-saved-content__bold">${calcedKeys[2][0]}
                </span>`;
            }
            else {
                caption.innerHTML = `По ключевым словам: <span class="header-saved-content__bold">${calcedKeys[0][0]}
                </span> и <span class="header-saved-content__bold">${calcedKeys[1][0]}</span>`;
            }
            document.querySelector('.header-saved-content').appendChild(caption);
        })
        .catch(err=>{
            console.log(err);
            heading.innerHTML = 'При загрузке статей произошла ошибка.';
            document.querySelector('.saved-field').style.display = 'none';
        });

}