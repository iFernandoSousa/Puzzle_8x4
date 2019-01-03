let Piece = function (topLeft, topRight, bottomLeft, bottomRight) {
    this.tl = topLeft;
    this.tr = topRight;
    this.bl = bottomLeft;
    this.br = bottomRight;

    this.turn = function () {
        var temp = this.tl;
        this.tl = this.tr;
        this.tr = this.br;
        this.br = this.bl;
        this.bl = temp;

        return this;
    }

    this.matchRight = function (piece) {
        return this.tr == piece.tl && this.br == piece.bl;
    }

    this.matchBottom = function (piece) {
        return this.bl == piece.tl && this.br == piece.tr;
    }
}

let PieceManager = function () {
    this.pieces = [];
    this.board = {};

    this.load = function () {
        this.putToEnd(new Piece('Y', 'R', 'B', 'G')); //1
        this.putToEnd(new Piece('Y', 'G', 'R', 'B')); //2
        this.putToEnd(new Piece('Y', 'B', 'G', 'R')); //3
        this.putToEnd(new Piece('Y', 'R', 'G', 'B')); //4
        this.putToEnd(new Piece('Y', 'R', 'G', 'B')); //5
        this.putToEnd(new Piece('Y', 'B', 'G', 'R')); //6
        this.putToEnd(new Piece('Y', 'G', 'B', 'R')); //7 
        this.putToEnd(new Piece('Y', 'B', 'R', 'G')); //8
    }

    this.putToEnd = function (piece) {
        this.pieces.push(piece);
    }

    this.getFirst = function () {
        return this.pieces.shift();
    }

    this.printBoard = function () {
        let line1 = '',
            line2 = '',
            line3 = '',
            line4 = '',
            line5 = '',
            line6 = '';

        //Top
        if (this.board[1]) {
            line1 += '[' + this.board[1].tl + ' ' + this.board[1].tr + ']';
            line2 += '[' + this.board[1].bl + ' ' + this.board[1].br + ']';
        }
        if (this.board[2]) {
            line1 += '[' + this.board[2].tl + ' ' + this.board[2].tr + ']';
            line2 += '[' + this.board[2].bl + ' ' + this.board[2].br + ']';
        }
        if (this.board[3]) {
            line1 += '[' + this.board[3].tl + ' ' + this.board[3].tr + ']';
            line2 += '[' + this.board[3].bl + ' ' + this.board[3].br + ']';
        }

        //Middle
        if (this.board[4]) {
            line3 += '[' + this.board[4].tl + ' ' + this.board[4].tr + ']';
            line4 += '[' + this.board[4].bl + ' ' + this.board[4].br + ']';
        }
        if (this.board[5]) {
            line3 += '     ';
            line4 += '     ';

            line3 += '[' + this.board[5].tl + ' ' + this.board[5].tr + ']';
            line4 += '[' + this.board[5].bl + ' ' + this.board[5].br + ']';
        }

        //Bottom
        if (this.board[6]) {
            line5 += '[' + this.board[6].tl + ' ' + this.board[6].tr + ']';
            line6 += '[' + this.board[6].bl + ' ' + this.board[6].br + ']';
        }
        if (this.board[7]) {
            line5 += '[' + this.board[7].tl + ' ' + this.board[7].tr + ']';
            line6 += '[' + this.board[7].bl + ' ' + this.board[7].br + ']';
        }
        if (this.board[8]) {
            line5 += '[' + this.board[8].tl + ' ' + this.board[8].tr + ']';
            line6 += '[' + this.board[8].bl + ' ' + this.board[8].br + ']';
        }

        console.log(line1);
        console.log(line2);
        console.log(line3);
        console.log(line4);
        console.log(line5);
        console.log(line6);
    }

    this.boardIsValid = function () {        
        for (let i = 1; i <= 8; i++) {
            if (!this.board[i])
                return false;
        }

        return true;
    }

    this.clearBoard = function () {
        if (this.isDebug) {
            this.printBoard();
        }

        for (let i = 8; i >= 1; i--) {
            if (this.board[i])
                this.putToEnd(this.board[i].turn());
        }
        this.board = {};
    }

    this.solve = function (isDebug) {
        this.isDebug = isDebug;
        this.load();
        let combination = 0;

        while (!this.boardIsValid()) {
            if (this.isDebug) {
                console.log('---------------------------------------');
                console.log('Combination : ' + (++combination));
                console.log('---------------------------------------');
            }

            //Piece 1
            if (!this.board[1]) {
                this.board[1] = this.getFirst();
            }

            //Piece 2
            if (!this.board[2]) {
                let currentSize = this.pieces.length;
                for (let i = 0; i < currentSize; i++) {
                    let p = this.getFirst();
                    let match = false;
                    for (let j = 0; j < 4; j++) {
                        if (this.board[1].matchRight(p)) {
                            this.board[2] = p;
                            match = true;
                            break;
                        }
                        p.turn();
                    }

                    if (!match) {
                        this.putToEnd(p.turn());
                    } else {
                        break;
                    }
                }

                //Check is empty yet, if yes, remove last Piece
                if (!this.board[2]) {
                    this.clearBoard();
                    continue;
                }
            }

            //Piece 3
            if (!this.board[3]) {
                currentSize = this.pieces.length;
                for (let i = 0; i < currentSize; i++) {
                    let p = this.getFirst();
                    let match = false;
                    for (let j = 0; j < 4; j++) {
                        if (this.board[2].matchRight(p)) {
                            this.board[3] = p;
                            match = true;
                            break;
                        }
                        p.turn();
                    }

                    if (!match) {
                        this.putToEnd(p.turn());
                    } else {
                        break;
                    }
                }

                //Check is empty yet, if yes, remove last Piece
                if (!this.board[3]) {
                    this.clearBoard();
                    continue;
                }
            }

            //Piece 4
            if (!this.board[4]) {
                currentSize = this.pieces.length;
                for (let i = 0; i < currentSize; i++) {
                    let p = this.getFirst();
                    let match = false;
                    for (let j = 0; j < 4; j++) {
                        if (this.board[1].matchBottom(p)) {
                            this.board[4] = p;
                            match = true;
                            break;
                        }
                        p.turn();
                    }
    
                    if (!match) {
                        this.putToEnd(p.turn());
                    } else {
                        break;
                    }
                }

                //Check is empty yet, if yes, remove last Piece
                if (!this.board[4]) {
                    this.clearBoard();

                    continue;
                }
            }

            //Piece 5
            if (!this.board[5]) {
                currentSize = this.pieces.length;
                for (let i = 0; i < currentSize; i++) {
                    let p = this.getFirst();
                    let match = false;
                    for (let j = 0; j < 4; j++) {
                        if (this.board[3].matchBottom(p)) {
                            this.board[5] = p;
                            match = true;
                            break;
                        }
                        p.turn();
                    }
        
                    if (!match) {
                        this.putToEnd(p.turn());
                    } else {
                        break;
                    }
                }

                //Check is empty yet, if yes, remove last Piece
                if (!this.board[5]) {
                    this.clearBoard();
                    
                    continue;
                }
            }

            //Piece 6
            if (!this.board[6]) {
                currentSize = this.pieces.length;
                for (let i = 0; i < currentSize; i++) {
                    let p = this.getFirst();
                    let match = false;
                    for (let j = 0; j < 4; j++) {
                        if (this.board[4].matchBottom(p)) {
                            this.board[6] = p;
                            match = true;
                            break;
                        }
                        p.turn();
                    }

                    if (!match) {
                        this.putToEnd(p.turn());
                    } else {
                        break;
                    }
                }

                //Check is empty yet, if yes, remove last Piece
                if (!this.board[6]) {
                    this.clearBoard();

                    continue;
                }
            }

            //Piece 7
            if (!this.board[7]) {
                currentSize = this.pieces.length;
                for (let i = 0; i < currentSize; i++) {
                    let p = this.getFirst();
                    let match = false;
                    for (let j = 0; j < 4; j++) {
                        if (this.board[6].matchRight(p)) {
                            this.board[7] = p;
                            match = true;
                            break;
                        }
                        p.turn();
                    }

                    if (!match) {
                        this.putToEnd(p.turn());
                    } else {
                        break;
                    }
                }

                //Check is empty yet, if yes, remove last Piece
                if (!this.board[7]) {
                    this.clearBoard();

                    continue;
                }
            }

             //Piece 8
             if (!this.board[8]) {
                currentSize = this.pieces.length;
                for (let i = 0; i < currentSize; i++) {
                    let p = this.getFirst();
                    let match = false;
                    for (let j = 0; j < 4; j++) {
                        if (this.board[7].matchRight(p) && this.board[5].matchBottom(p)) {
                            this.board[8] = p;
                            match = true;
                            break;
                        }
                        p.turn();
                    }

                    if (!match) {
                        this.putToEnd(p.turn());
                    } else {
                        break;
                    }
                }

                //Check is empty yet, if yes, remove last Piece
                if (!this.board[8]) {
                    this.clearBoard();

                    continue;
                }
            }

            //end while
        }
    }
}

let pieceManager = new PieceManager();
pieceManager.solve(true);
pieceManager.printBoard();
