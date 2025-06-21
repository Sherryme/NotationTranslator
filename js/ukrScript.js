const blockInput = document.querySelector('.block__input-system');
const blockOutput = document.querySelector('.block__output-system');
const dropdownInput = document.getElementById('dropdown-input');
const dropdownOutput = document.getElementById('dropdown-output');
const buttonReverse = document.getElementById('button-reverse');
const buttonClear = document.querySelector('.button-clear');
const textarea = document.getElementById('input');
const textareaOutput = document.getElementById('output');
const buttonCopy = document.querySelector('.copy');
const copyMessage = document.querySelector('.copy-message');

buttonReverse.addEventListener('click', () => {
    buttonReverse.classList.toggle('block__button-active');
    if (textareaOutput.value == '') {
        textarea.value = '';
        buttonClear.classList.remove('button-clear-active');
    }
    let inputNumber = textarea.value;
    let outputNumber = textareaOutput.value;
    textarea.value = outputNumber;
    textareaOutput.value = inputNumber;
    textarea.focus();
    if (blockInput.contains(dropdownInput)) {
        blockInput.append(dropdownOutput);
        blockOutput.append(dropdownInput);
    } else {
        blockInput.append(dropdownInput);
        blockOutput.append(dropdownOutput);
    }
    if (window.innerWidth <= 426) {
        textarea.blur();
    }
});

textarea.addEventListener('keyup', () => {
    buttonClear.classList.add('button-clear-active');
});

textarea.addEventListener('click', () => {
    if (textarea.value) {
        buttonClear.classList.add('button-clear-active');
    }
});

buttonClear.addEventListener('click', () => {
    textarea.value = '';
    textareaOutput.value = '';
    buttonClear.classList.remove('button-clear-active');
    buttonCopy.classList.remove('copy-active');
    textarea.focus();
    if (window.innerWidth <= 426) {
        textarea.blur();
        textarea.classList.remove('textarea-border');
    }
});

buttonCopy.addEventListener('click', function copy() {
    textareaOutput.select();
    textareaOutput.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textareaOutput.value)
    window.getSelection().removeAllRanges();
    textareaOutput.blur();
    setTimeout(() => {
        copyMessage.classList.add('copy-message-active')
    }, 100);
    setTimeout(() => {
        copyMessage.classList.remove('copy-message-active')
    }, 1000);
})

const buttonInterpret = document.querySelector('.button-interpret');
const buttonInterpretAdaptive = document.querySelector('.button-interpret-adaptive');
const dropdowns = document.querySelectorAll(".dropdown");
let systemFrom; 
let num;
let systemTo;

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector(".select");
    const tick = dropdown.querySelector(".tick");
    const menu = dropdown.querySelector(".menu");
    const options = dropdown.querySelectorAll(".menu li");
    const selected = dropdown.querySelector(".selected")

    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked')
        tick.classList.toggle('tick-rotate');
        menu.classList.toggle('menu-open');
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            select.classList.remove('select-clicked');
            tick.classList.remove('tick-rotate');
            menu.classList.remove('menu-open');
        }
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            tick.classList.remove('tick-rotate');
            menu.classList.remove('menu-open');
            options.forEach(opt => {
                opt.classList.remove('active');
            });
            option.classList.add('active');
            if (textarea.value && textareaOutput.value) {
                buttonInterpret.click();                
            }
        });
    });
});

buttonInterpret.addEventListener('click', () => {
    dropdowns.forEach(dropdown => {
        const options = dropdown.querySelectorAll(".menu li");
        options.forEach(option => {
            if (blockInput.contains(option) && option.classList.contains('active')) {
                systemFrom = option.textContent;
                console.log(systemFrom);
            }
            if (blockOutput.contains(option) && option.classList.contains('active')) {
                systemTo = option.textContent;
                console.log(systemTo);
            }
        });
    });
    num = textarea.value;
    console.log(num); 
    convertNumber(systemFrom, num, systemTo);
    numberBar.classList.remove('number-bar-active');
});

textarea.addEventListener('keypress', (e) => {
    if (e.code === 'Enter') {
        e.preventDefault(); 
        if (textarea.value == '') {
            textarea.classList.add('textarea-error');
            textarea.blur();
        }
        buttonInterpret.click();
    }
});

buttonInterpretAdaptive.addEventListener('click', () => {
    buttonInterpret.click();
});

function convertNumber(numFrom, num, numTo) {
    let systems = {
        "Двійкова": 2,
        "Вісімкова": 8,
        "Десяткова": 10,
        "Шістнадцяткова": 16,
    }

    let checkCorrectNum;
    switch (systems[numFrom]) {
        case 2:
            checkCorrectNum = /^[01]+$/;
            break;
        case 8:
            checkCorrectNum = /^[0-7]+$/;
            break;
        case 10:
            checkCorrectNum = /^[0-9]+$/;
            break;
        case 16:
            checkCorrectNum = /^[0-9A-Fa-f]+$/;
            break;
    }
    
    if (!checkCorrectNum.test(num)) {
        if (textarea.value == '') {
            textarea.placeholder = "Введіть число, з якої хочете перевести.";
        } else {
            switch (systems[numFrom]) {
                case 2:
                    textarea.placeholder = 'Неправильне число для вказаної системи числення! Допустимі цифри: 0, 1.';                    
                    break;
                case 8:
                    textarea.placeholder = 'Неправильне число для вказаної системи числення! Допустимі цифри: 0, 1, 2, 3, 4, 5, 6, 7.';
                    break;
                case 10:
                    textarea.placeholder = 'Неправильне число для вказаної системи числення! Допустимі цифри: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.';
                    break;
                case 16:
                    textarea.placeholder = 'Неправильне число для вказаної системи числення! Допустимі цифри: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F.';                    
                    break;
            }
            textarea.blur();
        }
        textarea.value = '';
        textareaOutput.value = '';
        textarea.classList.add('textarea-error');
        buttonClear.classList.remove('button-clear-active');
        textarea.addEventListener('click', () => {
            textarea.classList.remove('textarea-error');
            textarea.placeholder = "Введіть число, з якої хочете перевести.";
        });
        return;
    }
    
    let decimalNumber = parseInt(num, systems[numFrom]);
    let convertedNum = decimalNumber.toString(systems[numTo]).toUpperCase();
    textareaOutput.value = convertedNum; 
    buttonCopy.classList.add('copy-active');
}
textarea.addEventListener('keyup', () => {
    if (textarea.value == '') {
        textareaOutput.value = '';
        buttonClear.classList.remove('button-clear-active');
        buttonCopy.classList.remove('copy-active');
    }
})

// const numberBar = document.querySelector('.number-bar');
// const numberBarColumns = document.querySelectorAll('.number-bar__column');
// const backspace = document.getElementById('backspace');
// const enter = document.getElementById('enter');
// function getValueNumberBar() {
//     numberBarColumns.forEach((column) =>{
//         if (!column.dataset.hasEvent) {
//             column.addEventListener('click', () => {
//                 let value = column.textContent.trim();
//                 if (column === backspace) {
//                     value = '';
//                     textarea.value = textarea.value.slice(0, -1);
//                 } else if(column === enter){
//                     buttonInterpret.click();
//                     numberBar.classList.remove('number-bar-active');
//                 } else{
//                     textarea.value += value;
//                     buttonClear.classList.add('button-clear-active');
//                 }
//             })
//         }
//         column.dataset.hasEvent = 'true';
//     });
// }

// function checkMobile() {
//     if (window.innerWidth <= 426) {
//         textarea.addEventListener('click', () => {
//             textarea.blur();
//             numberBar.classList.add('number-bar-active');
//             textarea.classList.add('textarea-border');
//             textarea.classList.remove('textarea-error');
//             getValueNumberBar();
//         });
//         document.addEventListener('click', (e) => {
//             if (!numberBar.contains(e.target) && !textarea.contains(e.target)) {
//                 numberBar.classList.remove('number-bar-active');
//                 textarea.classList.remove('textarea-border');
//             }
//         })
//     } else{
//         return;
//     }
// }
// checkMobile();
