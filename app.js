document.addEventListener('DOMContentLoaded', function () {

    function GameOfLife(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.boardSize = boardHeight * boardWidth;
        this.boardCreated = false;
        this.cells = [];

        this.cellSize = 10;

        this.playButton = document.getElementById('play');
        this.pauseButton = document.getElementById('pause');

        this.start = () => {
            if (this.boardCreated) {
                this.generationInterval = setInterval(() => {
                    this.calculateNextGen()
                }, 1000/15);
            }

        };
        this.pause = () => {
            clearInterval(this.generationInterval)
        };

        this.setButtonEvents = () => {
            this.playButton.addEventListener('click', this.start);
            this.pauseButton.addEventListener('click', this.pause)
        };

        this.createBoard = () => {
            const board = document.getElementById('board');
            board.style.width = `${this.cellSize * game.width}px`;
            board.style.height = `${this.cellSize * game.height}px`;


            for (let i = 0; i < game.boardSize; i++) {
                let cell = document.createElement('DIV');
                cell.style.width = `${this.cellSize}px`;
                cell.style.height = `${this.cellSize}px`;
                cell.addEventListener('click', () => {
                    cell.classList.toggle('live')
                });

                board.appendChild(cell);
                this.cells.push(cell);
            }
            this.setButtonEvents();
            this.boardCreated = true;
        };

        this.isAlive = (cell) => {
            return cell.classList.contains('live')

        };

        this.scanNeighbours = (index, skipRow = 2, skipColumn = 2) => {
            let counter = 0;
            for (let i = -1; i < 2; i++) {
                if (i === skipRow) {
                } else {
                    for (let j = -1; j < 2; j++) {
                        if (j === skipColumn || (j === 0 && i === 0)) {
                        } else {
                            counter += this.isAlive(this.cells[index + i * this.width + j]) ? 1 : 0;
                        }
                    }
                }
            }
            return counter

        };

        this.checkNeighbours = (index) => {
            let populationCounter = 0;
            switch (true) {
                case index === 0: {
                    populationCounter = this.scanNeighbours(index, -1, -1);
                    break;
                }       //top left corner
                case index === this.width - 1: {
                    populationCounter = this.scanNeighbours(index, -1, 1);
                    break;
                }   //top right corner
                case index === this.cells.length - this.width: {
                    populationCounter = this.scanNeighbours(index, 1, -1);
                    break;
                }   //bottom left corner
                case index === this.cells.length - 1: {
                    populationCounter = this.scanNeighbours(index, 1, 1);
                    break;
                }   //bottom right corner
                case index < this.width: {
                    populationCounter = this.scanNeighbours(index, -1, 2);
                    break;
                }
                case index > this.cells.length - this.width: {
                    populationCounter = this.scanNeighbours(index, 1, 2);
                    break;
                }
                case index % this.width === 0: {
                    populationCounter = this.scanNeighbours(index, 2, -1);
                    break;
                }
                case index % this.width === this.width - 1: {
                    populationCounter = this.scanNeighbours(index, 2, 1);
                    break;
                }       //right side
                default: {
                    populationCounter = this.scanNeighbours(index, 2, 2)
                }

            }

            return populationCounter
        };

        this.calculateNextGen = () => {
            let newStates = this.cells.map((elem, index) => {
                let population = this.checkNeighbours(index);
                if (this.isAlive(elem)) {
                    if (population === 2 || population === 3) {
                        return 1
                    } else {
                        return 0
                    }
                } else {
                    if (population === 3) {
                        return 1
                    }else{
                        return 0
                    }
                }
            })
            for(let i=0;i<this.cells.length;i++){
                newStates[i] ? this.cells[i].classList.add('live') : this.cells[i].classList.remove('live') ;
            }
        }

    }

    const game = new GameOfLife(100, 50);
    game.createBoard();

});
