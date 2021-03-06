export class SuccessPopup {
    constructor(elem) {
        this.elem = elem;
        this.shadow = document.querySelector('.popup__shadow');
        this.close = elem.querySelector('.popup__close');
        this.enter = elem.querySelector('.popup__login');
        this._applyEvents();
    }

    _applyEvents() {
        this.close.addEventListener('click', () => {
            this.hide();
        });
    }

    hide(){
        this.elem.style.display = 'none';
        this.shadow.style.display = 'none';
    }

    show() {
        this.elem.style.display = 'flex';
    }
}