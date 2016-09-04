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

    var Caller;

    var IsAdLX = $ISLX() === 'a' || $ISLX() === 'i';
    //var LXCfg = $GETLXCONFIGINFO(1);
    var LXCfg = null;
    var IsEncryption = 0; //????
    var VoiceType = $G("type"); //??????
    var VoiceCat = $G("cat"); //??????
    var IsTxt = ($G('istxt') === '1') ? 1 : 0;
    var IsCaller = $G("caller");
    var qdCaller = '';
    var IsReload;

    var body = DOC.body;
    var Debug = $G('debug', 1);

        function initChess(){
        var chess_board=$$(".chessboard");
        for(var i=0; i<15; i++){
            for(var j=0; j<15; j++){
                var chess = $_("div",chess_board,"","chess");

                $T(chess[i*14+j],i+j)
                console.log("aa")
            }
        }



    }
    initChess();
    console.log("chess loaded");
})()