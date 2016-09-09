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
    function index(Obj){

        for (var i=0; i<255;i++){
            if(chess_board.childNodes[i] == Obj){
                return i;
            }
        }
    }

var Game= {
    start : 1,
    currTurn:"black",
    posX:0,
    posY:0,

//isWin: return 0 not win
//       return 1 row win
//       return 2 column win
//              3 left-top to right-btm
//              4 right-top to left-btm
    isWin: function(){
        var num = 0;
        var conti = 1;
        var color = board[posX][posY];
        //row
        for(var j=Math.max((posY-5),0); j<=Math.min(posY+5,14);j++){
            if(board[posX][j] == color){
                conti = 1;
                num++;
                if(num>=5) return 1;
            }
            else{
                conti = 0;
                num = 0;
            }
            
        }
        num=0;
        //column
        for(var i=Math.max((posX-5),0); i<=Math.min(posX+5,14);i++){
            if(board[i][posY] == color){
                conti = 1;
                num++;
                if(num>=5) return 2;
            }
            else{
                conti = 0;
                num = 0;
            }
            
        }
        num=0;
        // left-top to right-btm
        var left = Math.min(posX,posY,5);
        var right = Math.min(14-posX,14-posY,5);
        console.log("lr");
        console.log(left);
        console.log(right);
        for(var i = posX-left, j = posY-left; i <= posX+right, j <= posY+right ;i++,j++){
            if(board[i][j] == color){
                conti = 1;
                num++;

                if(num>=5) return 3;
            }
            else{
                conti = 0;
                num = 0;
            }
            

        }
        num=0;
        // right-top to left-btm
        var left = Math.min

        return false;

    },


    colorChange: function(){
        if(Game.currTurn == "black"){
            Game.currTurn = "white";
        }
        else{
            Game.currTurn = "black";
        }
    },




    chessStep: function (pos) {
        //step1: input position into board
        Game.colorChange();
        $CLS(pos, Game.currTurn, "add");
        if(Game.currTurn=="black"){
            board[posX][posY] = 1;
        }
        else{
            board[posX][posY] = 2;
        }

        //step2: check isWin
        var winWay = Game.isWin();
        if(winWay){
            Game.start = 0;


        }
        


        

    },
        
    initChess: function() {
            Game.start = 1;
            for (var i = 0; i < 15; i++) {
                for (var j = 0; j < 15; j++) {
                    var chess = $_("div", chess_board, "", "chess");
                    chess.onclick = function () {
                        if(Game.start == 0){
                            return;
                        }
                        if((this.className.indexOf("black") <= -1) &&
                        (this.className.indexOf("white") <= -1)) {
                        var idx = index(this) -1;
                        posX= idx/15|0;
                        posY= idx%15;
                        // console.log(idx)
                        console.log(posX);
                        console.log(posY);
                            (Game.chessStep(this));
                        }
                    }
                    //$CLS(this,"black","add")
                }
            }
        },
                        

    }


    Game.initChess();
    // console.log($$(".chess")[0]);
    // var i = 0;
    // var chessPos = $$(".chess")[i];
    // chessPos.onclick =function () {
        
    //     console.log("hhhhhhhhhh");
    // };
    console.log("chess loaded");
})()