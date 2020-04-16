import './pages/index.css';
import {Popup} from './Popup.js';
import {MenuPopup} from "./MenuPopup";
import {API} from './API';
import {SuccessPopup} from './SuccessPopup';
import {Search} from './Search';
import './SearchPage.js';

const regButton = document.querySelectorAll('.authBtn');
const soutButton = document.querySelectorAll('.signoutBtn');
const mobileOpen = document.querySelector('.headerOpen');
const savedButton = document.querySelectorAll('.saved');
const supForm = new Popup(document.querySelector('.signup'));
const sinForm = new Popup(document.querySelector('.signin'));
const mobileMenu = new MenuPopup(document.querySelector('.header-group_mobile'));
const successedReg = new SuccessPopup(document.querySelector('.popup_registered'));
const searchField = new Search(document.querySelector('.search-form'));

if (!localStorage.getItem('token')) {
    for (let i = 0; i < soutButton.length; i += 1) {
        soutButton[i].style.display = 'none';
    }
    for (let i = 0; i < savedButton.length; i += 1) {
        savedButton[i].style.display = 'none';
    }
    for (let i = 0; i < regButton.length; i += 1) {
        regButton[i].style.display = 'block';
    }
}
else {
    for (let i = 0; i < soutButton.length; i += 1) {
        soutButton[i].style.display = 'block';
    }
    for (let i = 0; i < savedButton.length; i += 1) {
        savedButton[i].style.display = 'block';
    }
    for (let i = 0; i < regButton.length; i += 1) {
        regButton[i].style.display = 'none';
    }
}

for(let i = 0; i<regButton.length; i+=1){
        regButton[i].addEventListener('click', ()=>{
            mobileMenu.hide();
            supForm.show();
        });
}

for (let i = 0; i < soutButton.length; i += 1) {
    soutButton[i].addEventListener('click', ()=>{
        localStorage.removeItem('token');
        window.location.href = '/';
    })
}

mobileOpen.addEventListener('click', ()=>{
    mobileMenu.show();
});

supForm.swap.addEventListener('click', ()=>{
    supForm.hide();
    sinForm.show();
});

sinForm.swap.addEventListener('click', ()=>{
    sinForm.hide();
    supForm.show();
});

supForm.submit.addEventListener('click', (event)=>{
    event.preventDefault();
    const data = new API([supForm.form.email.value, supForm.form.password.value, supForm.form.name.value]);
    data.sendSup()
        .then(()=>{
            supForm.hide();
            successedReg.show();
            supForm.shadow.style.display = 'flex';
        })
        .catch((err)=>{
            supForm.form.querySelector('.popup__error-exists').style.display = 'block';
            supForm.form.querySelector('.popup__error-exists').innerHTML = err;
        })
});

sinForm.submit.addEventListener('click', (event)=>{
    event.preventDefault();
    const data = new API([supForm.form.email.value, supForm.form.password.value]);
    data.sendSin()
        .then((res)=>{
            return res.json
        })
        .then((data)=>{
            localStorage.setItem('token', data.token);
            for(let i = 0; i < soutButton.length; i+=1) {
                soutButton[i].style.display = 'block';
            }
            for(let i = 0; i < savedButton.length; i+=1) {
                savedButton[i].style.display = 'block';
            }
            regButton.style.display = 'none';
        })
        .catch((err)=>{
            supForm.form.querySelector('.popup__error-exists').style.display = 'block';
            supForm.form.querySelector('.popup__error-exists').innerHTML = err;
        })
});

