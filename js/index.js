btn1 = document.querySelector('.btn1')
btn2 = document.querySelector('.btn2')
btn3 = document.querySelector('.btn3')
ins = document.querySelector('.ins')
br = document.querySelector('.br')
ha = document.querySelector('.ha')

btn1.addEventListener('click', () => {
    ins.classList.toggle('active')
})


btn2.addEventListener('click', () => {
    br.classList.toggle('active')
})


btn3.addEventListener('click', () => {
    ha.classList.toggle('active')
})

