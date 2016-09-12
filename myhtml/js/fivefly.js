(function () {
    var WIN = window,
        DOC = document,
        NAV = navigator,
        LOC = location,
        HIS = history;
    var innerHTML = "innerHTML",
        className = "className",
        appendChild = "appendChild",
        style = "style",
        getAttribute = "getAttribute";
    var Base = BASE;
    var Touch = Base.cfg.isTouch;
    var $$ = Base.getEle,
        $_ = Base.creEle,
        $D = Base.disEle,
        $T = Base.txtEle,
        $R = Base.rmvEle,
        $G = Base.getUrl,
        $GC = Base.getCoord,
        $CLS = Base.dealCls,
        $EF = Base.execFun,
        $JP = Base.jsonParse,
        $JS = Base.jsonStringify,
        $SS = Base.setStorage,
        $GS = Base.getStorage,
        $AJAX = Base.ajax,
        $ADPALLSTYLE = Base.adpAllStyle,
        $TXTREADER = Base.txtReader,
        $CREATESTYLE = Base.createStyle,
    //Private
        $ISLX = Base.isLX,
        $LXEXEC = Base.lxExec,
        $GETLXCONFIGINFO = Base.getLXConfigInfo,
        $LXSHOWAUTHVIEW = Base.lxShowAuthView,
        $LXENCRYPT = Base.lxEncrypt,
        $LXDECRYPT = Base.lxDecrypt,
        $LXVOICEREGISTER = Base.lxVoiceRegister,
        $LXVOICEBROADCAST = Base.lxVoiceBroadcast,
        $LXSENDMSGPAGE = Base.lxSendMsgPage,
        $LXSENDMSGDLG = Base.lxSendMsgDlg,
        $ISNOTAPP = Base.isNotApp,
        $LOADING = Base.loading,
        $ALERTINFO = Base.alertInfo,
        $RD = Base.round,
        $GETUTIL = Base.getUtil,
        $GETCALLUTIL = Base.getCallUtil,
        $GETFLOWUTIL = Base.getFlowUtil,
        $FORMATCALLER = Base.formatCaller,
        $FORMATTIME = Base.formatTime,
        $BAIDU = Base.baidu;


    var body = DOC.body;
    var Debug = $G('debug', 1);

    var board = new Array();
    for(var i=0;i<15;i++){
        board[i]=new Array();
        for(var j=0;j<15;j++)
        {
            board[i][j]=0;
        }
    }
    var chess_board = $$("#chessboard");
    var restart = $$("#reset");
    var output = $$("#screem");
    function index(Obj){

        for (var i=0; i<255;i++){
            if(chess_board.childNodes[i] == Obj){
                return i;
            }
        }
    }
    function markPos(i, j, color) {
        var index = i * 15 + j + 1;
        var tar = chess_board.childNodes[index];
        if (color == "black"){

            $CLS(tar, "black", "del");
            $CLS(tar, "black-mark","add");
        }
        else{

            $CLS(tar, "white", "del");
            $CLS(tar, "white-mark","add");
            }
    }

    function deMark(i,j,color){
        if(i<0&&j<0) return;
        var index = i * 15 + j + 1;
        var tar = chess_board.childNodes[index];
        if (color == "black"){

            $CLS(tar, "black-mark", "del");
            $CLS(tar, "black","add");
        }
        else{

            $CLS(tar, "white-mark", "del");
            $CLS(tar, "white","add");
        }
    }


var Game= {
    start: 1,
    currTurn: "black",
    posX: -1,
    posY: -1,
    lastX: 0,
    lastY: 0,
    color: 1,
//isWin: return 0 not win
//       return 1 row win
//       return 2 column win
//              3 left-top to right-btm
//              4 right-top to left-btm
    isWin: function () {
        var num = 0;
        var conti = 1;

        //row
        for (var j = Math.max((Game.posY - 5), 0); j <= Math.min(Game.posY + 5, 14); j++) {
            if (board[Game.posX][j] == Game.color) {
                conti = 1;
                num++;
                if (num >= 5) return 1;
            }
            else {
                conti = 0;
                num = 0;
            }

        }
        num = 0;
        //column
        for (var i = Math.max((Game.posX - 5), 0); i <= Math.min(Game.posX + 5, 14); i++) {
            if (board[i][Game.posY] == Game.color) {
                conti = 1;
                num++;
                if (num >= 5) return 2;
            }
            else {
                conti = 0;
                num = 0;
            }

        }
        num = 0;
        // left-top to right-btm
        var left = Math.min(Game.posX, Game.posY, 5);
        var right = Math.min(14 -Game. posX, 14 - Game.posY, 5);
        // console.log("lr");
        // console.log(left);
        // console.log(right);
        for (var i = Game.posX - left, j = Game.posY - left; i <= Game.posX + right, j <= Game.posY + right; i++, j++) {
            if (board[i][j] == Game.color) {
                conti = 1;
                num++;

                if (num >= 5) return 3;
            }
            else {
                conti = 0;
                num = 0;
            }


        }
        num = 0;
        // left-btm to right-top to 
        var left = Math.min(14 - Game.posX, Game.posY, 5);
        var right = Math.min(14 - Game.posY, Game.posX, 5);
        for (var i = Game.posX + left, j = Game.posY - left; i <= Game.posX - right, j <= Game.posY + right; i--, j++) {
            if (board[i][j] == Game.color) {
                conti = 1;
                num++;

                if (num >= 5) return 4;
            }
            else {
                conti = 0;
                num = 0;
            }
        }

        return false;

    },


    colorChange: function () {
        if (Game.currTurn == "black") {
            Game.currTurn = "white";
        }
        else {
            Game.currTurn = "black";
        }
    },


    chessStep: function (pos) {
        //step1: input position into board
        Game.colorChange();
        $CLS(pos, Game.currTurn, "add");
        if (Game.currTurn == "black") {
            board[Game.posX][Game.posY] = 1;
            Game.color = 1;
        }
        else {
            board[Game.posX][Game.posY] = 2;
            Game.color = 2;
        }

        //step2: check isWin
        var winWay = Game.isWin();
        var tempColor = (Game.currTurn=="black"? "white":"black");
        deMark(Game.lastX,Game.lastY, (Game.currTurn=="black"? "white":"black"));
        markPos(Game.posX, Game.posY, Game.currTurn);
        if (winWay) {
            Game.endGame(winWay);
            //output winner
            var temp = Game.currTurn+" wins";
            $T(output,temp);

        }
    },


    initChess: function () {
        Game.start = 1;
        Game.currTurn = "black";
            Game.posX = -1;
            Game.posY =-1;
            Game.lastX= 0;
            Game.lastY= 0;
            Game.color= 1;
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 15; j++) {
                var chess = $_("div", chess_board, "", "chess");
                chess.onclick = function () {
                    if (Game.start == 0) {
                        return;
                    }
                    if ((this.className.indexOf("black") <= -1) &&
                        (this.className.indexOf("white") <= -1)) {
                        var idx = index(this) - 1;
                        Game.lastX = Game.posX;
                        Game.lastY = Game.posY;
                        Game.posX = idx / 15 | 0;
                        Game.posY = idx % 15;
                        // console.log(idx)
                        console.log(Game.posX);
                        console.log(Game.posY);
                        console.log(Game.lastX);
                        console.log(Game.lastX);
                        (Game.chessStep(this));
                    }
                }
                //$CLS(this,"black","add")
            }
        }
    },

    endGame: function (opt) {
        Game.start = 0;

         switch(opt){
             case 1:
                 for(var j = Game.posY-1; j>=0; j-- ){
                     if(Game.color == board[Game.posX][j]){
                         markPos(Game.posX,j,Game.currTurn)
                     }
                     else{
                         break;
                     }
                 }
                 for(var j = Game.posY+1; j<=14; j++ ){
                     if(Game.color == board[Game.posX][j]){
                         markPos(Game.posX,j,Game.currTurn)
                     }
                     else{
                         break;
                     }
                 }
                 break;
             case 2:
                 for(var i = Game.posX-1; i>=0; i-- ){
                     if(Game.color == board[i][Game.posY]){
                         markPos(i,Game.posY,Game.currTurn);
                     }
                     else{
                         break;
                     }
                 }
                 for(var i = Game.posX+1; i<=14; i++ ){
                     if(Game.color == board[i][Game.posY]){
                         markPos(i,Game.posY,Game.currTurn);
                     }
                     else{
                         break;
                     }
                 }
                 break;
             case 3:
                 for(var j = Game.posY- 1, i = Game.posX-1; i>=0, j>=0; i--,j-- ){
                     if(Game.color == board[i][j]){
                         markPos(i,j,Game.currTurn);
                     }
                     else{
                         break;
                     }
                 }
                 for(var j = Game.posY+ 1, i = Game.posX+1; i<=14, j<=14; i++,j++ ){
                     if(Game.color == board[i][j]){
                         markPos(i,j,Game.currTurn);
                     }
                     else{
                         break;
                     }
                 }
                 break;
             case 4:
                 for(var j = Game.posY- 1, i = Game.posX+1; i<=14, j>=0; i++,j-- ){
                     if(Game.color == board[i][j]){
                         markPos(i,j,Game.currTurn);
                     }
                     else{
                         break;
                     }
                 }
                 for(var j = Game.posY+ 1, i = Game.posX-1; i>=0, j<=14; i--,j++ ){
                     if(Game.color == board[i][j]){
                         markPos(i,j,Game.currTurn);
                     }
                     else{
                         break;
                     }
                 }




        }
    },
}

    function clear() {
        restart.onclick = function () {
            console.log("sss")
            $R(chess_board, false);
            for (var i = 0; i < 15; i++) {
                for (var j = 0; j < 15; j++) {
                    board[i][j] = 0;
                }
            }
            $T(output,"")

            Game.initChess();
        };
    }



    


    Game.initChess();
    clear();
    console.log("chess loaded");
})()