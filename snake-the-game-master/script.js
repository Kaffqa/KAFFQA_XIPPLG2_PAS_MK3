// Mendapatkan elemen canvas dan konteksnya
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");

// Ukuran satu kotak pada canvas
let box = 32;

// Array untuk menyimpan posisi setiap segmen ular
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};

// Arah awal gerakan ular
let direction = "right";

// Objek untuk menyimpan posisi makanan
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};

// Fungsi untuk menggambar latar belakang canvas
function criarBG() {
    context.fillStyle = "Yellow";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Fungsi untuk menggambar ular
function criarCobrinha() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Fungsi untuk menggambar makanan
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Mendengarkan tombol panah yang ditekan untuk mengubah arah ular
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

// Fungsi untuk menginisialisasi dan menjalankan permainan
function iniciarJogo() {
    // Menangani batas-batas canvas dan kondisi game over

    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // Memeriksa tabrakan dengan tubuh ular
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('Game Over :(');
            snake = [];
            snake[0] = {
                x: 8 * box,
                y: 8 * box
            };
            direction = "right";
            food = {
                x: Math.floor(Math.random() * 15 + 1) * box,
                y: Math.floor(Math.random() * 15 + 1) * box
            };
            jogo = setInterval(iniciarJogo, 100);
        }
    }

    // Menggambar elemen-elemen permainan
    criarBG();
    criarCobrinha();
    drawFood();

    // Mengupdate posisi ular
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    // Memeriksa apakah ular memakan makanan
    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        // Jika ular memakan makanan, menentukan posisi baru untuk makanan
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    // Menyusun posisi kepala baru ular
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Menambahkan kepala baru ke awal array ular
    snake.unshift(newHead);
}

// Menginisialisasi dan menjalankan permainan dengan interval 100 milidetik
let jogo = setInterval(iniciarJogo, 100);
