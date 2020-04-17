export class SuccessPopup {
    constructor(elem) {
        this.elem = elem;
        this.shadow = document.querySelector('.popup__shadow');
        this.close = elem.querySelector('.popup__close');
        this.enter = elem.querySelector('.popup__login');
        this.applyEvents();
    }

    applyEvents() {
        this.close.addEventListener('click', () => {
            this.hide();
        });
    }

    hide(){
        this.shadow.style.display = 'none';
    }

    show() {
        this.elem.style.display = 'flex';
    }
}