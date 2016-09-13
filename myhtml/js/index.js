// Type:Personal WebPage
// Auther:Weihang Yu
// Time:8/30/2016


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
    var IsEncryption = 0; //是否加密
    var VoiceType = $G("type"); //语音播报类型
    var VoiceCat = $G("cat"); //语音播报种类
    var IsTxt = ($G('istxt') === '1') ? 1 : 0;
    var IsCaller = $G("caller");
    var qdCaller = '';
    var IsReload;

    var body = DOC.body;
    var Debug = $G('debug', 1);

 
     function initializeCb(cfg) {
        initEvent();
        initAjax();
        setTimeout(function () {
            $D(body, 1);
        }, 0);
    }

    function initAjax() {
        $LOADING(1);
        var key = IsEncryption ? $FORMATTIME() : '';
        var ts = IsEncryption ? '?t=' + key+'&gz=1' : '';

        $AJAX({
            url: CFG.ajaxUrl + ts,
            timeout: 8e3,
            method: 'POST',
            send: getSendStr(),
            error: error,
            success: function (dataStr) {
                var dataObj = $JP(IsEncryption ? $LXDECRYPT(dataStr, key) : dataStr);
                console.log('get obj: %o', dataObj);
                if (!dataObj || dataObj.returncode !== '000000') {
                    var info = '请求失败';
                    dataObj && dataObj.returnmsg && (info = dataObj.returnmsg);
                    return error(info);
                }
                $LOADING();
                console.log(dataObj)
                if(dataObj.returncode == '000000'){
                    initData(dataObj.result);
                }
            }
        });

        //initAd($$("#ad")) by chujing
        function error(info) {
            $LOADING();
            !info && (info = '加载数据失败，请检查网络连接');
            (info === 'timeout') && (info = '加载数据超时，请稍后重试');
            $ALERTINFO(info);
        }

        

    }

    function jump(){
        $$("#game").onclick = function(){
            LOC.href = "fivefly.html"
        }
        var title = ($$(".title")[0])
        title.onclick = function(){
            LOC.href = "main.html"
        }
    }

    jump();
    // (function(){
    // var jumps = BASE.creEle();
    // jumps.url = "my3.html"


    // jumpPage(jumps);
    // })()
})()

