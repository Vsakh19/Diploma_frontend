import './pages/index.css';
import {Popup} from './Popup.js';
import {MenuPopup} from "./MenuPopup";
import {ServerAPI} from './ServerAPI';
import {SuccessPopup} from './SuccessPopup';
import {Search} from './Search';
import {NewsAPI} from './NewsAPI'
import './SavedPage.js';

const regButtons = document.querySelectorAll('.authBtn');
const soutButtons = document.querySelectorAll('.signoutBtn');
const mobileOpen = document.querySelector('.headerOpen');
const savedButtons = document.querySelectorAll('.saved');
const mobileMenu = new MenuPopup(document.querySelector('.header-group_mobile'));

if(window.location.href.split('/').slice(-1)[0] !== 'saved.html'){
    const SignUpForm = new Popup(document.querySelector('.signup'));
    const SignInForm = new Popup(document.querySelector('.signin'));
    const searchField = new Search(document.querySelector('.search-form'));
    const successedReg = new SuccessPopup(document.querySelector('.popup_registered'));




    for(let i = 0; i<regButtons.length; i+=1){
        regButtons[i].addEventListener('click', ()=>{
            mobileMenu.hide();
            SignUpForm.show();
        });
    }

    successedReg.enter.addEventListener('click', () => {
        successedReg.hide();
        SignInForm.show();
    });
    SignUpForm.swap.addEventListener('click', ()=>{
        SignUpForm.hide();
        SignInForm.show();
    });

    SignInForm.swap.addEventListener('click', ()=>{
        SignInForm.hide();
        SignUpForm.show();
    });

    SignUpForm.submit.addEventListener('click', (event)=>{
        event.preventDefault();
        const data = new ServerAPI([SignUpForm.form.email.value, SignUpForm.form.password.value, SignUpForm.form.name.value]);
        data.SignUp()
            .then((res)=>{
                if (res.ok){
                    return res.json()
                }
                else Promise.reject(res.statusText)
                .catch((err)=>{
                    SignUpForm.form.querySelector('.popup__error-exists').style.display = 'block';
                    SignUpForm.form.querySelector('.popup__error-exists').innerHTML = err;
                })
            })
            .then((res)=>{
                if(res.message === 'Произошла ошибка'){
                    Promise.reject('Такой пользователь уже существует.')
                        .catch((err)=>{
                            SignUpForm.form.querySelector('.popup__error-exists').style.display = 'block';
                            SignUpForm.form.querySelector('.popup__error-exists').innerHTML = err;
                        })
                }
                else {
                    SignUpForm.hide();
                    successedReg.show();
                    SignUpForm.shadow.style.display = 'flex';
                    localStorage.setItem('user', SignUpForm.form.name.value);
                }
            })
            .catch((err)=>{
                SignUpForm.form.querySelector('.popup__error-exists').style.display = 'block';
                SignUpForm.form.querySelector('.popup__error-exists').innerHTML = err;
            })
    });

    SignInForm.submit.addEventListener('click', (event)=>{
        event.preventDefault();
        const data = new ServerAPI([SignInForm.form.email.value, SignInForm.form.password.value]);
        data.SignIn()
            .then((res)=>{
                if (res.ok){
                    return res.json()
                }
                else Promise.reject(res.statusText)
                .catch((err)=>{
                    SignInForm.form.querySelector('.popup__error-exists').style.display = 'block';
                    SignInForm.form.querySelector('.popup__error-exists').innerHTML = err;
                })
                
            })
            .then((data)=>{
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', data.data.name);
                SignInForm.hide();
                for(let i = 0; i < soutButtons.length; i+=1) {
                    soutButtons[i].style.display = 'block';
                    soutButtons[i].innerHTML = data.data.name + soutButtons[i].innerHTML;
                }
                for(let i = 0; i < savedButtons.length; i+=1) {
                    savedButtons[i].style.display = 'block';
                }
                for(let i = 0; i<regButtons.length; i+=1) {
                    regButtons[i].style.display = 'none';
                }
            })
            .catch((err)=>{
                SignInForm.form.querySelector('.popup__error-exists').style.display = 'block';
                SignInForm.form.querySelector('.popup__error-exists').innerHTML = err;
            })
    });

}

if (!localStorage.getItem('token')) {
    for (let i = 0; i < soutButtons.length; i += 1) {
        soutButtons[i].style.display = 'none';
    }
    for (let i = 0; i < savedButtons.length; i += 1) {
        savedButtons[i].style.display = 'none';
    }
    for (let i = 0; i < regButtons.length; i += 1) {
        regButtons[i].style.display = 'block';
    }
}
else {
    new ServerAPI().getMe()
        .then(res=>{
            if (res.ok){
                return res.json()
            }
            else Promise.reject(res.statusText)
            .catch(err=>{
                for (let i = 0; i < soutButtons.length; i += 1) {
                    soutButtons[i].style.display = 'none';
                }
                for (let i = 0; i < savedButtons.length; i += 1) {
                    savedButtons[i].style.display = 'none';
                }
                for (let i = 0; i < regButtons.length; i += 1) {
                    regButtons[i].style.display = 'block';
                }
            })
        })
        .then((res)=>{
            if (res.message){
                for (let i = 0; i < soutButtons.length; i += 1) {
                    soutButtons[i].style.display = 'none';
                }
                for (let i = 0; i < savedButtons.length; i += 1) {
                    savedButtons[i].style.display = 'none';
                }
                for (let i = 0; i < regButtons.length; i += 1) {
                    regButtons[i].style.display = 'block';
                }
            }
            else {
                for (let i = 0; i < soutButtons.length; i += 1) {
                    soutButtons[i].style.display = 'block';
                    soutButtons[i].innerHTML = localStorage.getItem('user') + soutButtons[i].innerHTML;
                }
                for (let i = 0; i < savedButtons.length; i += 1) {
                    savedButtons[i].style.display = 'block';
                }
                for (let i = 0; i < regButtons.length; i += 1) {
                    regButtons[i].style.display = 'none';
                }
            }
        })
        .catch(err=>{
            for (let i = 0; i < soutButtons.length; i += 1) {
                soutButtons[i].style.display = 'none';
            }
            for (let i = 0; i < savedButtons.length; i += 1) {
                savedButtons[i].style.display = 'none';
            }
            for (let i = 0; i < regButtons.length; i += 1) {
                regButtons[i].style.display = 'block';
            }
        })
}



for (let i = 0; i < soutButtons.length; i += 1) {
    soutButtons[i].addEventListener('click', ()=>{
        localStorage.removeItem('token');
        window.location.href = '/';
    })
}

mobileOpen.addEventListener('click', ()=>{
    mobileMenu.show();
});


