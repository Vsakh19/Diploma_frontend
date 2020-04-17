export class Popup {
    constructor(elem) {
        this.elem = elem;
        this.shadow = document.querySelector('.popup__shadow');
        this.form = elem.querySelector('.popup__regform');
        this.close = elem.querySelector('.popup__close');
        this.swap = elem.querySelector('.popup__underlink');
        this.submit = this.form.submitBtn;
        this._applyEvents();
}

    show() {
        this.shadow.style.display = 'flex';
        this.elem.classList.remove('popup__reg_disabled');
        document.querySelector('.headerOpen').style.display = 'none';
        document.querySelector('.header-menu__heading').style.zIndex = '1';
    }

    hide(){
        this.shadow.style.display = 'none';
        this.elem.classList.add('popup__reg_disabled');
        document.querySelector('.headerOpen').style.display = 'block';
        document.querySelector('.header-menu__heading').style.zIndex = '0';
    }

    _validate(field, email){
        if(email === true){
            return /^\w+(([-\.])\w+)*@\w{2,}(\.\w{2,})+$/.test(field);
        }
        else{
            return /^[A-Z][a-z]*-[A-Z][a-z]*|[A-Z][a-z]*$/.test(field);
        }
    }

    _applyEvents(){
        this.close.addEventListener('click', ()=>{
            this.hide();
        });
        this.form.email.addEventListener('input', (event)=>{
            if (!this._validate(this.form.email.value, true)) {
                document.querySelector('.popup__error').style.display = 'block';
                this.submit.setAttribute("disabled", "");
            }
            else {
                document.querySelector('.popup__error').style.display = 'none';
                this.submit.removeAttribute("disabled");
            }
        });
        this.form.password.addEventListener('input', ()=>{
            this._validate(this.form.password.value, false);
        });

    }
}