const pledgeCircle = document.querySelectorAll('.pledge-box .circle');
const pledgeName = document.querySelectorAll('.pledge-box .pledge-name');
const hamburgerIcon = document.querySelector('.hamburger');
const menuMobile = document.querySelector('.faq.mobile');
const mobileBackground = document.querySelector('.mobile.background')

const backBtn = document.querySelector('.back');
const modalWrapper = document.querySelector('.modal-wrapper');
const selectModal = document.querySelector('.select-modal');
const successModal = document.querySelector('.success-modal');
const closeModalIcon = document.querySelector('.close-modal');
const continueBtn = document.querySelectorAll('.continue');
const gotItBtn = document.querySelector('.got-it');
const inputs = document.querySelectorAll('input');

let iconFlag = true;
let bookmarkFlag = true;

const enterHoverName = (name) => {
    const box = name.closest('.pledge-box');
    box.querySelector('.circle').classList.add('hover')
}

const leaveHoverName = (name) => {
    const box = name.closest('.pledge-box');
    box.querySelector('.circle').classList.remove('hover')
}

const menuFun = () => {
    menuMobile.classList.toggle('show');
    mobileBackground.classList.toggle('show');
    if(iconFlag){
        hamburgerIcon.src = "images/icon-close-menu.svg";
        hamburgerIcon.style.width = "14px";
        hamburgerIcon.style.height = "15px";
        iconFlag = !iconFlag;
    } else {
        hamburgerIcon.src = "images/icon-hamburger.svg";
        hamburgerIcon.style.width = "16px";
        hamburgerIcon.style.height = "15px";
        iconFlag = !iconFlag;
    }
}

menuMobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', function(){
        menuMobile.classList.toggle('show');
        mobileBackground.classList.toggle('show');
        hamburgerIcon.src = "images/icon-hamburger.svg";
        hamburgerIcon.style.width = "16px";
        hamburgerIcon.style.height = "15px";
        iconFlag = !iconFlag;
    }) 
});

const clearPledges = () => {
    document.querySelectorAll('.pledge-box').forEach(box => {
        box.style.border = "1px solid rgba(0, 0, 0, 0.15)";
        box.querySelector('.pop').style.display = "none";
        box.querySelector('.mini-circle').style.transform = "scale(0)"
    })
}

const clearInputs = () => {
    inputs.forEach(input => {
        input.value = "";
    })
}

const selectedPledge = (chosenStand, inAbout) => {
    clearPledges();
    if(inAbout) {
    const boxId = chosenStand.closest('.reward-box').getAttribute('data-id');
    const modalBox = selectModal.querySelector(`[data-id="${boxId}"]`);
    modalBox.style.border = "2px solid #3cb3ab";
    modalBox.querySelector('.pop').style.display = 'flex';
    modalBox.querySelector('.mini-circle').style.transform = "scale(1)";
    modalBox.querySelector('input').focus();
} else  {
    const modalBox = chosenStand.closest('.pledge-box');
    modalBox.style.border = "2px solid #3cb3ab";
    modalBox.querySelector('.pop').style.display = 'flex';
    modalBox.querySelector('.mini-circle').style.transform = "scale(1)";
    modalBox.querySelector('input').focus();
}
}

const showSelection = (chosenStand = "", inAbout = false) => {
    modalWrapper.style.display = 'block';
    selectModal.style.display = 'flex';
    document.body.classList.add('modal-open');
    if(chosenStand) {
        selectedPledge(chosenStand, inAbout);
    }

}

const closeModal = (isPledge) => {
    document.body.classList.remove('modal-open');
    modalWrapper.style.display = 'none';
    selectModal.style.display = 'none';
    successModal.style.display = 'none';
    if(isPledge){
        clearPledges();
        clearInputs();
    }
}

const showSuccessModal = () => {
    document.body.classList.add('modal-open');
    modalWrapper.style.display = 'block';
    successModal.style.display = 'flex';
}

const borderInput = (input) => {
    input.closest('.float-container').style.border = '1px solid #3cb3ab';
}

const unborderInput = (input) => {
    input.closest('.float-container').style.border = '1px solid rgba(0,0,0,.15)';
}

const changeBookmark = (button) => {
    if(bookmarkFlag){
        button.querySelector('img').src = "images/icon-bookmark-saved.svg";
        button.innerHTML = `<img src="images/icon-bookmark-saved.svg" alt="bookmark">Bookmarked`;
        button.style.color = "#147a73";
        bookmarkFlag = !bookmarkFlag;
    } else {
        button.querySelector('img').src = "images/icon-bookmark.svg";
        button.innerHTML = `<img src="images/icon-bookmark.svg" alt="bookmark">Bookmark`;
        button.style.color = "#7a7a7a";
        bookmarkFlag = !bookmarkFlag;
    }
}
const checkAmount = (button) => {
    const pledgeBox = button.closest('.pledge-box');
    const actualDataID = pledgeBox.getAttribute('data-id');
    switch(actualDataID) {
        case '0':
            if(pledgeBox.querySelector('input').value <= 0){
                return 0
            } else {
                return 1
            }
        case '1':
            if(pledgeBox.querySelector('input').value < 25){
                return 0
            } else {
                return 1
            }
        case '2':
            if(pledgeBox.querySelector('input').value < 75){
                return 0
            } else {
                return 1
            }
        case '3':
            if(pledgeBox.querySelector('input').value < 200){
                return 0
            } else {
                return 1
            }
    }
}
continueBtn.forEach(button => {
     button.addEventListener('click', function(){
        const isRequired = checkAmount(button);
        if(!isRequired) {
            button.closest('.pledge-box').querySelector('.pledge-amount').classList.add('invalid-value');
            setTimeout(()=>{button.closest('.pledge-box').querySelector('.pledge-amount').classList.remove('invalid-value')}, 500);
 
        } else {
            closeModal();
            showSuccessModal();
            clearInputs();
            clearPledges();
        }
     })
})

pledgeName.forEach(name => {
    name.addEventListener('mouseenter', function(){enterHoverName(name)});
    name.addEventListener('mouseleave', function(){leaveHoverName(name)});
})


hamburgerIcon.addEventListener('click', menuFun);
closeModalIcon.addEventListener('click', function(){closeModal(true);})
gotItBtn.addEventListener('click', function(){closeModal(false)});