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
    const signUpForm = new Popup(document.querySelector('.signup'));
    const signInForm = new Popup(document.querySelector('.signin'));
    const searchField = new Search(document.querySelector('.search-form'));
    const successedReg = new SuccessPopup(document.querySelector('.popup_registered'));


    signUpForm.applySignUpEvents();
    signInForm.applySignInEvents();
    
    for(let i = 0; i<regButtons.length; i+=1){
        regButtons[i].addEventListener('click', ()=>{
            mobileMenu.hide();
            signUpForm.show();
        });
    }

    successedReg.enter.addEventListener('click', () => {
        successedReg.hide();
        signInForm.show();
    });
    signUpForm.swap.addEventListener('click', ()=>{
        signUpForm.hide();
        signInForm.show();
    });

    signInForm.swap.addEventListener('click', ()=>{
        signInForm.hide();
        signUpForm.show();
    });

    signUpForm.submit.addEventListener('click', (event)=>{
        event.preventDefault();
        const data = new ServerAPI([signUpForm.form.email.value, signUpForm.form.password.value, signUpForm.form.name.value]);
        data.signUp()
            .then((res)=>{
                if (res.ok){
                    return res.json()
                }
                else return Promise.reject(res.statusText)
                
            })
            .then((res)=>{
                if(res.message === 'Произошла ошибка'){
                    return Promise.reject('Такой пользователь уже существует.')
                    
                }
                else {
                    signUpForm.hide();
                    successedReg.show();
                    signUpForm.shadow.style.display = 'flex';
                    localStorage.setItem('user', signUpForm.form.name.value);
                }
            })
            .catch((err)=>{
                signUpForm.form.querySelector('.popup__error-exists').style.display = 'block';
                signUpForm.form.querySelector('.popup__error-exists').innerHTML = err;
            })
    });

    signInForm.submit.addEventListener('click', (event)=>{
        event.preventDefault();
        const data = new ServerAPI([signInForm.form.email.value, signInForm.form.password.value]);
        data.signIn()
            .then((res)=>{
                if (res.ok){
                    return res.json()
                }
                else return Promise.reject(res.statusText)
                
            })
            .then((data)=>{
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', data.data.name);
                signInForm.hide();
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
                signInForm.form.querySelector('.popup__error-exists').style.display = 'block';
                signInForm.form.querySelector('.popup__error-exists').innerHTML = err;
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
            else return Promise.reject(res.statusText)
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


