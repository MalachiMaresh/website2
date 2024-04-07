show = document.getElementById('rules-btn')
close = document.getElementById('close-btn')
rules = document.getElementById('rules')
canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')
start = document.getElementById('start')
easy = document.getElementById('easy')
medium = document.getElementById('medium')
hard = document.getElementById('hard')


score = 0
BrickRowCount = 9
BrickColumnCount = 5



ball = {
    x: canvas.width / 2,
    y: canvas.height - 40,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
}

paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 150,
    h: 10,
    speed: 8,
    dx: 0
}

BrickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

bricks = []
for (let i = 0; i < BrickRowCount; i++) {
    bricks[i] = []
    for (let j = 0; j < BrickColumnCount; j++) {
        const x = i * (BrickInfo.w + BrickInfo.padding) + BrickInfo.offsetX
        const y = j * (BrickInfo.h + BrickInfo.padding) + BrickInfo.offsetY
        bricks[i][j] = {
            x,
            y,
            ...BrickInfo
        }
    }
}

level = 1

function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = '#0095DD'
    ctx.fill()
    ctx.closePath()
}

function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, true)
    ctx.fillStyle = '#0095DD'
    ctx.fill()
    ctx.closePath()
}

function drawScore() {
    ctx.font = '20px Arial'
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}

function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                ctx.beginPath()
                ctx.rect(brick.x, brick.y, brick.w, brick.h)
                ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent'
                ctx.fill()
                ctx.closePath()
            }
        })
    })
}

function movePaddle() {
    paddle.x += paddle.dx

    if (paddle.x < 0) {
        paddle.x = 0
    }

    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w
    }
}

function moveBall1() {
    ball.x += ball.dx
    ball.y += ball.dy

    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1
    }

    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1
    }

    if (
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    ) {
        ball.dy = -ball.speed
    }

    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (
                    ball.x - ball.size > brick.x &&
                    ball.x + ball.size < brick.x + brick.w &&
                    ball.y - ball.size < brick.y + brick.h &&
                    ball.y + ball.size > brick.y
                ) {
                    ball.dy *= -1
                    brick.visible = false
                    increaseScore()
                }
            }
        })
    })
}

function moveBall2() {
    ball.x += 2 * ball.dx
    ball.y += 1.5 * ball.dy

    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1
    }

    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1
    }

    if (
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    ) {
        ball.dy = -ball.speed
    }

    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (
                    ball.x - ball.size > brick.x &&
                    ball.x + ball.size < brick.x + brick.w &&
                    ball.y - ball.size < brick.y + brick.h &&
                    ball.y + ball.size > brick.y
                ) {
                    ball.dy *= -1
                    brick.visible = false
                    increaseScore()
                }
            }
        })
    })
}

function moveBall3() {
    ball.x += 2.5 * ball.dx
    ball.y += 2 * ball.dy

    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1
    }

    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1
    }

    if (
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    ) {
        ball.dy = -ball.speed
    }

    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (
                    ball.x - ball.size > brick.x &&
                    ball.x + ball.size < brick.x + brick.w &&
                    ball.y - ball.size < brick.y + brick.h &&
                    ball.y + ball.size > brick.y
                ) {
                    ball.dy *= -1
                    brick.visible = false
                    increaseScore()
                }
            }
        })
    })
}


function increaseScore() {
    score++
    if (score == BrickRowCount * BrickColumnCount) {
        showAllBricks()
    }
}

function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true
        })
    })
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPaddle()
    drawBall()
    drawScore()
    drawBricks()
}

function update() {
    if (level == 1){
        moveBall1()
    }
    if (level == 2){
        moveBall2()
    }
    if (level == 3){
        moveBall3()
    }

    movePaddle()
    draw()
    if (ball.y + ball.size <= canvas.height) {
        requestAnimationFrame(update)
    }
    else {
        ball.dy *= -1
        start.style.zIndex = 4
        start.disabled = false
        easy.disabled = false
        medium.disabled = false
        hard.disabled = false
    }
}

function changeCoord() {
    ball.x = canvas.width / 2
    ball.y = canvas.height - 40
    ball.speed = 4
    ball.dx = 4
    ball.dy = -4
    paddle.x = canvas.width / 2 - 40
    paddle.y = canvas.height - 20
}


function keyDown(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right' || e.key == 'd') {
        paddle.dx = paddle.speed
    }

    if (e.key == 'ArrowLeft' || e.key == 'Left' || e.key == 'a') {
        paddle.dx = -paddle.speed
    }
}

function keyUp(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right' || e.key == 'd' || e.key == 'ArrowLeft' || e.key == 'Left' || e.key == 'a')
        paddle.dx = 0
}

document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

show.addEventListener('click', () => {
    rules.classList.toggle('show')
})

close.addEventListener('click', () => {
    rules.classList.toggle('show')
})

start.addEventListener('click', () => {
    showAllBricks()
    if (level == 1){
        paddle.w = 150
    }
    if (level == 2){
        paddle.w = 100
    }
    if (level == 3){
        paddle.w = 60
    }
    changeCoord()
    score = 0
    start.style.zIndex = -1
    update()
    start.disabled = true
    easy.disabled = true
    medium.disabled = true
    hard.disabled = true
})

easy.addEventListener('click', () => {
    level = 1
    console.log(easy)

})

medium.addEventListener('click', () => {
    level = 2
    console.log(medium)

})

hard.addEventListener('click', () => {
    level = 3

})
