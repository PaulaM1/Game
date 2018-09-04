var Furry = function () {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
};
var Coin = function () {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
};
var Game = function () {
    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function (x, y) {
        return x + (y * 10);
    };
    this.showFurry = function () {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    };
    this.hideVisibleFurry = function () {
        var furryElement = document.querySelector(".furry");
        furryElement.classList.remove("furry");
    };
    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };
    var self = this;
    this.moveFurry = function () {
        this.checkCoinCollision();
        this.hideVisibleFurry();
        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y + 1;
        }
        this.gameOver();
        this.showFurry();
        this.turnFurry();
    };
    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
        ;
    };
    this.checkCoinCollision = function () {
        var result = document.querySelector("#score strong");
        var coinElement = document.querySelector(".coin");
        if ((this.furry.x === this.coin.x) && (this.furry.y === this.coin.y)) {
            coinElement.classList.remove("coin");
            this.score += 1;
            result.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };
    this.gameOver = function () {
        if ((this.furry.x > 9) || (this.furry.x < 0) || (this.furry.y > 9) || (this.furry.y < 0)) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
        }
    };
    this.startGame = function () {
        this.idSetInterval = setInterval(function () {
            self.moveFurry()
        }, 250);
        self.showCoin();
        self.showFurry();
    };
    // checking keydown
    document.addEventListener('keydown', function (event) {
        self.turnFurry(event);
    });
    this.startGame();
};
var game = new Game();