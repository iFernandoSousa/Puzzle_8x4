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
        return this.tr == piece.tl && this.br == piece.bl
    }

    this.matchBottom = function (piece) {
        return this.bl == piece.tl && this.br == piece.tr
    }

    this.clone = function() {
        return new Piece(this.tl, this.tr, this.bl, this.br)
    }
}

let PieceManager = function () {
    this.getPieces = function () {
        let pieces = [];
        pieces.push(new Piece('G', 'Y', 'R', 'B')); //1
        pieces.push(new Piece('R', 'B', 'G', 'Y')); //3
        pieces.push(new Piece('Y', 'R', 'B', 'G')); //2
        pieces.push(new Piece('R', 'B', 'Y', 'G')); //4
        pieces.push(new Piece('G', 'Y', 'R', 'B')); //5
        pieces.push(new Piece('Y', 'G', 'R', 'B')); //6
        pieces.push(new Piece('G', 'R', 'B', 'Y')); //7
        pieces.push(new Piece('R', 'B', 'Y', 'G')); //8

        return pieces;
    }

    this.getPiece = function (pieces, index) {
        if (index < pieces.length)
            return pieces.splice(index, 1)[0];
    }

    this.printBoard = function (board) {
        let line1 = '',
            line2 = '',
            line3 = '',
            line4 = '',
            line5 = '',
            line6 = '';

        //Top
        if (board[0]) {
            line1 += '[' + board[0].tl + ' ' + board[0].tr + ']';
            line2 += '[' + board[0].bl + ' ' + board[0].br + ']';
        }
        if (board[1]) {
            line1 += '[' + board[1].tl + ' ' + board[1].tr + ']';
            line2 += '[' + board[1].bl + ' ' + board[1].br + ']';
        }
        if (board[2]) {
            line1 += '[' + board[2].tl + ' ' + board[2].tr + ']';
            line2 += '[' + board[2].bl + ' ' + board[2].br + ']';
        }

        //Middle
        if (board[3]) {
            line3 += '[' + board[3].tl + ' ' + board[3].tr + ']';
            line4 += '[' + board[3].bl + ' ' + board[3].br + ']';
        }
        if (board[4]) {
            line3 += '     ';
            line4 += '     ';

            line3 += '[' + board[4].tl + ' ' + board[4].tr + ']';
            line4 += '[' + board[4].bl + ' ' + board[4].br + ']';
        }

        //Bottom
        if (board[5]) {
            line5 += '[' + board[5].tl + ' ' + board[5].tr + ']';
            line6 += '[' + board[5].bl + ' ' + board[5].br + ']';
        }
        if (board[6]) {
            line5 += '[' + board[6].tl + ' ' + board[6].tr + ']';
            line6 += '[' + board[6].bl + ' ' + board[6].br + ']';
        }
        if (board[7]) {
            line5 += '[' + board[7].tl + ' ' + board[7].tr + ']';
            line6 += '[' + board[7].bl + ' ' + board[7].br + ']';
        }

        console.log(line1);
        console.log(line2);
        console.log(line3);
        console.log(line4);
        console.log(line5);
        console.log(line6);
    }

    this.clonePieces = function(pieces) {
        let nPieces =  []
        for (let p = 0; p < pieces.length; p++) {
            if (pieces[p])
                nPieces.push(pieces[p].clone())
        }
        return nPieces
    }

    this.cloneBoard = function(board) {
        let nBboard = [];
        for(let b=0; b < board.length; b++) {
            if (board[b])
                nBboard.push(board[b].clone())
        }
        return nBboard
    }

    this.match = function (board_, pieces_) {
        this.combinations++;

        //Make a copy
        board = this.cloneBoard(board_);
        pieces = this.clonePieces(pieces_);

        //Check if the board is empty
        if (board.length == 0) { //Top Left
            //Start the board with all pieces and all position possibles
            for (let i = 0; i < pieces.length; i++) {
                let piecesCopy = this.clonePieces(pieces);
                let piece = this.getPiece(piecesCopy, i);

                for (let j = 0; j < 4; j++) {
                    piece.turn();
                    this.match([piece], piecesCopy)
                }
            }
        } else if (board.length == 1 || board.length == 2 || board.length == 6) { //Top Center and Top Right
            for (let p = 0; p < pieces.length; p++) {
                let piece = pieces[p];

                for (let j = 0; j < 4; j++) {
                    piece.turn();

                    if (board[(board.length - 1)].matchRight(piece)) {
                        let piecesCopy = this.clonePieces(pieces);
                        board[board.length] = this.getPiece(piecesCopy, p);

                        this.match(board, piecesCopy);
                    }
                }
            }
        } else if (board.length == 3 || board.length == 4 || board.length == 5 || board.length == 7) { //Center Left and Center Right
            let compareTo;
            if (board.length == 3)
                compareTo = 0;
            else if (board.length == 4)
                compareTo = 2;
            else if (board.length == 5)
                compareTo = 3;
            else compareTo = 4


            for (let p = 0; p < pieces.length; p++) {
                let piece = pieces[p];

                for (let j = 0; j < 4; j++) {
                    piece.turn();
                    if (board.length != 7) {
                        if (board[compareTo].matchBottom(piece)) {
                            let piecesCopy = this.clonePieces(pieces);
                            board[board.length] = this.getPiece(piecesCopy, p);

                            this.match(board, piecesCopy);
                        }
                    } else if (board[compareTo].matchBottom(piece) && board[(board.length - 1)].matchRight(piece)) {
                        let piecesCopy = this.clonePieces(pieces);
                        board[board.length] = this.getPiece(piecesCopy, p);

                        this.match(board, piecesCopy);
                    }
                }
            }
        }

        if (board.length == 8) {
            if (!this.solutions.includes(board)) {
                this.solutions.push(board);
                console.log('Solution:' + this.solutions.length + ' of ' + this.combinations + ' combinations');
                this.printBoard(board);
                console.log('-------------------------------');
            }
        }
    }

    this.solveIt = function () {
        this.combinations = 0;
        this.solutions = [];
        this.match([], this.getPieces());
    }
}

let pieceManager = new PieceManager();
pieceManager.solveIt();
