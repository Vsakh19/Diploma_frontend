export class MenuPopup {
    constructor(elem) {
        this.elem = elem;
        this.shadow = document.querySelector('.menu-shadow');
        this.close = document.querySelector('.headerClose');
        this._applyEvents();
    }

    show() {
        this.shadow.style.display = 'block';
    }

    hide(){
        this.shadow.style.display = 'none';
    }

    _applyEvents(){
        this.close.addEventListener('click', ()=>{
            this.hide();
        });
    }
}