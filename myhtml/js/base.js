/**
 * BASE Function JS
 * author: Don
 * copyright: http://tangzhengwen.com
 * update: 2015-10-23
 * version: 2.5.4
 * desc:
 *      + cssPxChange, adpAryScopeStyle, adpOneAbsStyle, adpRateStyle
 *      M adpAllStyle
 */

(function (name, factory) {
//    if (typeof define === "function" && define.amd) {
//        define(factory);
//    } else
    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        this[name] = factory();
    }
}('BASE', function () {
    var WIN = window,
            DOC = document,
            NAV = navigator,
            LOC = location;
    var innerHTML = "innerHTML",
            className = "className",
            appendChild = "appendChild",
            style = "style",
            addEventListener = "addEventListener";
    var adpWidthAry = [320, 360, 480, 540, 640, 720, 768, 800, 1080];
    var adpHeightAry = [300, 400, 450, 500, 600, 650, 690, 750, 800];
    var CFG = {
        isTouch: 'ontouchstart' in WIN  //Boolean, is touch device
    };
    var P = {
        cfg: CFG,
        /*===== No dependence =====*/
        //tool
        getUrl: getUrl,
        concatUrl: concatUrl,
        extendObj: extendObj,
        jsonParse: jsonParse,
        jsonStringify: jsonStringify,
        strCompare: strCompare,
        dataRound: dataRound,
        getCoord: getCoord,
        cssPxChange: cssPxChange,
        execFun: execFun,
        newXhr: newXhr,
        //dom
        getEle: getEle,
        creEle: creEle,
        txtEle: txtEle,
        disEle: disEle,
        rmvEle: rmvEle,
        parEle: parEle,
        dealCls: dealCls,
        /*===== No dependence =====*/
        getPrefix: getPrefix, //creEle
        xhrRes: xhrRes, //execFun
        styleReady: styleReady, //execFun
        getStorage: getStorage, //execFun,jsonParse
        setStorage: setStorage, //jsonStringify
        ajax: ajax, //concatUrl,newXhr,xhrRes,execFun
        txtReader: txtReader, //newXhr,xhrRes,execFun
        jsReader: jsReader, //execFun
        cssReader: cssReader, //execFun,styleReady
        createStyle: createStyle, //execFun,styleReady
        adpAryScopeStyle: adpAryScopeStyle, //cssPxChange,createStyle
        adpOneAbsStyle: adpOneAbsStyle, //cssPxChange,createStyle
        adpAllStyle: adpAllStyle, //execFun,createStyle
        adpRateStyle: adpRateStyle, //execFun,adpAryScopeStyle,adpOneAbsStyle getAdpNewSize
    };

    /*========== function ==========*/
    /*===== No dependence =====*/
    function getUrl(attr, ignore) {
        /**
         * get the value of attr from URL search, e.g. ?a=1&b=123
         * @attr String
         * @ignore Boolean, ignore case
         * return String, e.g. BASE.getUrl('b') === '123'
         */
        if (typeof attr !== "string") {
            console.log('%cBASE.js->getUrl->Error:%c @attr must be a String', 'color: #ac2925', 'color: auto');
            return;
        }
        var t = "", n;
        var reg = ignore ? 'gi' : 'g';
        decodeURIComponent(LOC.search).toString().replace(new RegExp("[?&]" + attr + "=[^&]+", reg), function (r) {
            n = r.split("=")[1];
            n && (t = n);
        });

        console.log('%cBASE.js->getUrl->Info:%c ' + t, 'color: #269abc', 'color: auto');
        return t;
    }
    function concatUrl(url, obj) {
        /**
         * concat url
         * @url String
         * @obj Object
         * return String, e.g. ?a=1&b=123
         */
        if (typeof url !== "string") {
            console.log('%cBASE.js->concatUrl->Error:%c @url must be a String', 'color: #ac2925', 'color: auto');
            return url;
        }
        if (typeof obj !== "object") {
            console.log('%cBASE.js->concatUrl->Error:%c @obj must be a Object', 'color: #ac2925', 'color: auto');
            return url;
        }
        if (url.indexOf('?') < 0) {
            url += '?';
        } else {
            url += '&';
        }
        for (var va in obj) {
            url += va + "=" + obj[va] + "&";
        }
        var len = url.length;
        if (url[len - 1] === '&' || url[len - 1] === '?') {
            url = url.slice(0, len - 1);
        }
        console.log('%cBASE.js->concatUrl->Info:%c ' + url, 'color: #269abc', 'color: auto');
        return url;
    }
    function extendObj(srcObj, tarObj, bool, subExtend) {
        /**
         * extend the source obj according to the target obj
         * @srcObj,@tarObj Object
         * @bool Boolean, true tar is srcObj else is tarObj
         * @subExtend Boolean, extend sub obj
         * return undefined
         */
        if (typeof srcObj !== "object" || typeof tarObj !== "object") {
            console.log('%cBASE.js->extendObj->Error:%c @srcObj & @tarObj must be a Object', 'color: #ac2925', 'color: auto');
            return;
        }
        var tar = tarObj;
        bool && (tar = srcObj);
        for (var va in tar) {
            if (subExtend) {
                dealSubExtend(va);
            } else {
                if (tarObj[va] !== undefined)
                    srcObj[va] = tarObj[va];
            }
        }
        console.log('%cBASE.js->extendObj->Info:%c %o', 'color: #269abc', 'color: auto', srcObj);

        function dealSubExtend(attr) {
            if (typeof tarObj[attr] === "object") {
                if (typeof srcObj[attr] === "object") {
                    for (var val in tarObj[attr]) {
                        srcObj[attr][val] = tarObj[attr][val];
                    }
                } else {
                    srcObj[attr] = tarObj[attr];
                }
            } else {
                if (tarObj[va] !== undefined)
                    srcObj[attr] = tarObj[attr];
            }
        }
    }
    function jsonParse(txt) {
        /**
         * try to catch JOSN parse error
         * @txt String
         * return Object
         */
        var ret;
        try {
            ret = JSON.parse(txt);
        } catch (e) {
            console.log('%cBASE.js->jsonParse->Error:%c JSON.parse error - %c' + e, 'color: #ac2925', 'color: auto', 'color: red');
        }
        return ret;
    }
    function jsonStringify(obj) {
        /**
         * try to catch JOSN stringify error
         * @obj Object
         * return String
         */
        var ret;
        try {
            ret = JSON.stringify(obj);
        } catch (e) {
            console.log('%cBASE.js->jsonStringify->Error:%c JSON.stringify error - %c' + e, 'color: #ac2925', 'color: auto', 'color: red');
        }
        return ret;
    }
    function strCompare(aStr, bStr, splitDot) {
        /**
         * string compare
         * @bStr,@aStr String
         * @splitDot String, default '.'
         * aStr > bStr return 1
         * aStr < bStr return -1
         * aStr == bStr return 0
         * 2.0.123 > 2.0.1221.5
         */
        if (typeof aStr !== "string" || typeof bStr !== "string") {
            console.log('%cBASE.js->strCompare->Error:%c @aStr & @bStr must be a String', 'color: #ac2925', 'color: auto');
            return;
        }
        var ret = 0;
        if (bStr === aStr)
            return ret;
        var dot = '.';
        if (splitDot && typeof splitDot === "string")
            dot = splitDot;

        var bAry = bStr.split(dot);
        var aAry = aStr.split(dot);
        var len = bAry.length;
        (aAry.length < len) && (len = aAry.length);
        for (var i = 0; i < len; i++) {
            if (aAry[i] - 0 > bAry[i] - 0) {
                ret = 1;
                break;
            } else if (aAry[i] - 0 < bAry[i] - 0) {
                ret = -1;
                break;
            }
        }
        console.log('%cBASE.js->strCompare->Info:%c ' + aStr + ' - ' + bStr + ' = ' + ret, 'color: #269abc', 'color: auto');
        return ret;
    }
    function dataRound(val, bit) {
        /**
         * numerical precision control
         * @val Number or String, e.g. 123 or '123'
         * @bit Number, precision, default is 0
         * return Number, e.g. BASE.dataRound('123.25', 1) === '123.3'
         */
        var ret;
        if ((val || val === 0) && !isNaN(val - 0)) {
            if (!bit || typeof bit !== 'number') {
                bit = 0;
            }
            var e = 1;
            for (var i = 0; i < bit; i++) {
                e *= 10;
            }
            ret = Math.round(val * e) / e;
        } else {
            console.log('%cBASE.js->dataRound->Warn:%c Invalid @val -%c ' + val, 'color: #d58512', 'color: auto', 'color: red');
        }
        console.log('%cBASE.js->dataRound->Info:%c ' + ret, 'color: #269abc', 'color: auto');
        return ret;
    }
    function getCoord(e, c) {
        /**
         * get event targe coord
         * @e Event
         * @c String, 'Y' or 'X'(default)
         * return Number
         */
        if (!e) {
            console.log('%cBASE.js->getCoord->Error:%c @e can not be empty', 'color: #ac2925', 'color: auto');
            return;
        }
        var org = e.originalEvent,
                ct = e.changedTouches;
        (c !== 'Y' && c !== 'y') && (c = 'X');
        c = c.toUpperCase();
        return ct || (org && org.changedTouches) ? (org ? org.changedTouches[0]['page' + c] : ct[0]['page' + c]) : e['page' + c];
    }
    function cssPxChange(styleStr, adpRate) {
        /**
         * change style px value to adp*value
         * @styleStr String, css style
         * @adpRate Number, adp rate except 0
         * return String
         */
        if (!styleStr || typeof styleStr !== "string") {
            console.log('%cBASE.js->cssPxChange->Error:%c @styleStr must be a String', 'color: #ac2925', 'color: auto');
            return;
        }
        adpRate -= 0;
        if (!adpRate || isNaN(adpRate)) {
            console.log('%cBASE.js->cssPxChange->Error:%c @adpRate must be a Number except 0', 'color: #ac2925', 'color: auto');
            return;
        }
        var num, val;
        return styleStr.replace(/-?\d+\.?\d*px/g, function (e) {
            num = parseFloat(e);
            if (num === 1 || num === -1 || num === 0)
                return num + 'px';
            val = num * adpRate;
            if (val > 0 && val < 1) {
                val = 1;
            } else if (val > -1 && val < 0) {
                val = -1;
            }
            return val + "px";
        });
    }

    function getEle(str) {
        /**
         * get DOM Element
         * @str String, '#id', '.class', 'tag'
         * return Element(#id) or Array Elements(.class tag)
         */
        if (typeof str !== "string") {
            console.log('%cBASE.js->getEle->Error:%c @str must be a String', 'color: #ac2925', 'color: auto');
            return;
        }
        var ary = str.split(' ');
        var par = DOC;
        for (var i = 0; i < ary.length; i++) {
            par = getTargetElement(ary[i]);
        }
        return par;

        function getTargetElement(subStr) {
            if (!par)
                return;
            if (par[0])
                par = par[0];
            var tar;
            try {
                if (subStr.indexOf("#") === 0) {  //id
                    tar = par.getElementById(subStr.substring(1));
                } else if (subStr.indexOf(".") === 0) {  //class
                    tar = par.getElementsByClassName(subStr.substring(1));
                } else {  //tag
                    tar = par.getElementsByTagName(subStr);
                }
            } catch (e) {
                console.log('%cBASE.js->getEle->Error:%c getTargetElement error - %c' + e, 'color: #ac2925', 'color: auto', 'color: red');
            }
            return tar;
        }
    }
    function creEle(tag, parEle, id, cls) {
        /**
         * create DOM Element
         * @tag String, default is 'div'
         * @parEle Element, parent node
         * @id,@cls String
         * all parameter allow empty
         * return Element
         */
        !tag && (tag = "div");
        if (typeof tag !== "string") {
            console.log('%cBASE.js->creEle->Error:%c @tag must be a String', 'color: #ac2925', 'color: auto');
            return;
        }
        var ele = DOC.createElement(tag);
        id && (typeof id === "string") && (ele.id = id);
        cls && (typeof cls === "string") && (ele.className = cls);
        parEle && parEle.appendChild && parEle.appendChild(ele);
        return ele;
    }
    function txtEle(ele, str) {
        /**
         * text str to Element
         * @ele Element
         * @str String or Number, empty mean clear
         * return undefined
         */
        if (!ele) {
            console.log('%cBASE.js->txtEle->Error:%c @ele can not be empty', 'color: #ac2925', 'color: auto');
            return;
        }
        if (typeof str !== "string" && typeof str !== "number") {
            console.log('%cBASE.js->txtEle->Error:%c @str must be a String or Number', 'color: #ac2925', 'color: auto');
            return;
        }
        str += '';
        if (ele.innerText !== undefined) {
            ele.innerText = str;
        } else if (ele.textContent !== undefined) {
            ele.textContent = str;
        } else {
            console.log('%cBASE.js->txtEle->Error:%c @ele must be an HTMLElement', 'color: #ac2925', 'color: auto');
        }
    }
    function disEle(ele, opt) {
        /**
         * haddle DOM Element hide and show
         * @ele Element
         * @opt Boolean or String
         */
        if (!ele || !ele.style) {
            console.log('%cBASE.js->disEle->Error:%c @ele must be an HTMLElement', 'color: #ac2925', 'color: auto');
            return;
        }
        if (opt === 'display') {
            return ele.style.display;
        }
        if (opt) {
            ele.style.display = (typeof opt === 'string') ? opt : 'block';
        } else {
            ele.style.display = 'none';
        }
    }
    function rmvEle(ele, isSelf) {
        /**
         * remove DOM Element
         * @ele Element
         * @isSelf Boolean, true remove ele self, false remove ele children
         * return undefined
         */
        if (!ele) {
            console.log('%cBASE.js->rmvEle->Error:%c @ele can not be empty', 'color: #ac2925', 'color: auto');
            return;
        }
        if (isSelf) {
            var parentNode = ele.parentNode;
            if (parentNode && parentNode.removeChild) {
                parentNode.removeChild(ele);
            } else {
                console.log('%cBASE.js->rmvEle->Warn:%c @ele must be an HTMLElement', 'color: #d58512', 'color: auto');
            }
        } else {
            if (ele.removeChild) {
                while (ele.firstChild) {
                    ele.removeChild(ele.firstChild);
                }
            } else {
                console.log('%cBASE.js->rmvEle->Warn:%c @ele must be an HTMLElement', 'color: #d58512', 'color: auto');
            }
        }
    }
    function parEle(tarElement, parElement) {
        /**
         * determine whether @parElement is @tarElement's parent element
         * @tarElement,@parElement Element
         * return Boolean
         */
        if (!tarElement || !parElement) {
            console.log('%cBASE.js->parEle->Error:%c @tarElement & @parElement can not be empty', 'color: #ac2925', 'color: auto');
            return;
        }
        if (!tarElement.parentElement)
            return false;
        if (tarElement.parentElement === parElement)
            return true;
        if (tarElement.parentElement === DOC.body)
            return false;
        parEle(tarElement.parentElement, parElement);
    }
    function dealCls(ele, cls, opt) {
        /**
         * add cls or delete cls for ele
         * @ele Element
         * @cls String
         * @opt String, add|del|has(default)
         * return Boolean or undefined
         */
        if (!ele) {
            console.log('%cBASE.js->dealCls->Error:%c @ele can not be empty', 'color: #ac2925', 'color: auto');
            return;
        }
        if (typeof cls !== "string") {
            console.log('%cBASE.js->dealCls->Error:%c @str must be a String', 'color: #ac2925', 'color: auto');
            return;
        }

        var eleClassName = ele[className];
        if (!eleClassName) {
            if (!/^add|del$/.test(opt))
                return;
            (opt === 'add') && (ele[className] = cls);
        } else {
            var ary = eleClassName.split(' ');
            var str = '';
            var flag;
            for (var i = 0; i < ary.length; i++) {
                if (ary[i] === cls) {
                    flag = 1;
                    if (opt === 'del')
                        continue;
                }
                str += ary[i] + ' ';
            }
            if (!/^add|del$/.test(opt))
                return flag;
            (opt === 'add') && !flag && (str += cls);
            (str[str.length - 1] === ' ') && (str = str.slice(0, str.length - 1));
            ele[className] = str;

        }

        console.log('%cBASE.js->dealCls->Info: %c' + ele[className], 'color: #269abc', 'color: auto');
    }

    function execFun(callback, arg1, arg2) {
        /**
         * if callback is function then execute it
         * @callback Function
         * return callback(arg1, arg2)
         */
        if (typeof callback === 'function') {
            callback(arg1, arg2);
        } else {
            console.log('%cBASE.js->execFun->Warn:%c @callback is not a function', 'color: #d58512', 'color: auto');
        }
    }
    function newXhr() {
        //return XMLHttpRequest
        var xhr;
        if (WIN.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xhr = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        console.log('%cBASE.js->newXhr->Info:%c new XMLHttpRequest', 'color: #269abc', 'color: auto');
        return xhr;
    }

    /*===== dependence =====*/
    function getPrefix(str) {
        /**
         * get css3 prefix str
         * @str String, e.g. 'transition', 'transform'
         * return String, e.g. 'webkitTransition'
         */
        if (typeof str !== "string") {
            console.log('%cBASE.js->getPrefix->Error:%c @str must be a String', 'color: #ac2925', 'color: auto');
            return;
        }
        var alph = str.slice(0, 1);
        var con = str.slice(1);
        var upStr = alph.toUpperCase() + con;
        var lowStr = alph.toLowerCase() + con;
        var mod = creEle('modernizr')[style];
        var ary = ['webkit' + upStr, lowStr, 'Moz' + upStr, 'O' + upStr, 'ms' + upStr];
        var ret;
        for (var i = 0; i < ary.length; i++) {
            if (mod[ary[i]] !== undefined) {
                ret = ary[i];
                break;
            }
        }
        console.log('%cBASE.js->getPrefix->Info:%c ret = ' + ret, 'color: #269abc', 'color: auto');
        return ret;
    }

    function xhrRes(xhr, callback, errback) {
        /**
         * handle XMLHttpRequest
         * @xhr XMLHttpRequest
         * @callback,@errback Function
         * return undefined
         */
        console.log('%cBASE.js->xhrRes->Info:', 'color: #269abc');
        console.log('%cXMLHttpRequest.status=%c ' + xhr.status, 'color: #269abc', 'color: auto');
        console.log('%cXMLHttpRequest.responseText=%c ' + xhr.responseText, 'color: #269abc', 'color: auto');
        if (xhr.status >= 0 && xhr.status < 300) {
            execFun(callback, xhr.responseText);
        } else {
            //console.log("aaaaa"+xhr.status);
            execFun(errback, xhr.status);
        }
    }
    function styleReady(id, cssnum, callback) {
        /**
         * check style load ready
         * @id String
         * @cssnum Number
         * @callback Function
         * return undefined
         */
        cssnum -= 0;
        if (isNaN(cssnum)) {
            console.log('%cBASE.js->styleReady->Error:%c @cssnum must be a Number', 'color: #ac2925', 'color: auto');
            return;
        }

        var startTime = new Date();
        var timeout = 3000;
        var ti = setInterval(function () {
            if (DOC.styleSheets.length > cssnum) {
                if (id) {
                    if (DOC.getElementById(id)) {
                        clearTi();
                    } else {
                        (new Date() - startTime > timeout) && clearTi(1);
                    }
                } else {
                    clearTi();
                }
            } else {
                console.log('%cBASE.js->styleReady->Info:%c loading style...', 'color: #269abc', 'color: auto');
                (new Date() - startTime > timeout) && clearTi(1);
            }
        }, 10);

        function clearTi(bool) {
            clearInterval(ti);
            execFun(callback);
            if (!bool) {
                var str = id ? id : '';
                console.log('%cBASE.js->styleReady->Info:%c style onload!%c ' + str, 'color: #269abc', 'color: auto', 'color: red');
            } else {
                console.log('%cBASE.js->styleReady->Warn:%c load style timeout', 'color: #d58512', 'color: auto');
            }
        }
    }
    function getStorage(item, attr) {
        /**
         * get data from localStorage
         * @item String, record key
         * @attr String, the data obj attribute value
         * return String or Others
         */
        if (!WIN.localStorage) {
            console.log('%cBASE.js->getStorage->Error:%c the browser not support localStorage', 'color: #ac2925', 'color: auto');
            return;
        }
        if (typeof item !== "string") {
            console.log('%cBASE.js->getStorage->Error:%c @item must be a String', 'color: #ac2925', 'color: auto');
            return;
        }
        var obj = localStorage.getItem(item);
        if (!obj) {
            console.log('%cBASE.js->getStorage->Warn:%c no record under the item -%c ' + item, 'color: #d58512', 'color: auto', 'color: red');
            return;
        }
        attr && dealItemAttr();
        console.log('%cBASE.js->getStorage->Info:%c ' + item + '=' + obj, 'color: #269abc', 'color: auto');
        return obj;

        function dealItemAttr() {
            obj = jsonParse(obj);
            obj = obj[attr];
        }
    }
    function setStorage(item, strobj) {
        /**
         * set data to localStorage
         * @item String, record key
         * @strobj String,Object or Number
         * return undefined
         */
        if (!WIN.localStorage) {
            console.log('%cBASE.js->setStorage->Error:%c the browser not support localStorage', 'color: #ac2925', 'color: auto');
            return;
        }
        if (typeof item !== "string") {
            console.log('%cBASE.js->setStorage->Error:%c @item must be a String', 'color: #ac2925', 'color: auto');
            return;
        }
        if (strobj === undefined || strobj === null) {
            console.log('%cBASE.js->setStorage->Error:%c @strobj can not be%c ' + strobj, 'color: #ac2925', 'color: auto', 'color:red');
            return;
        }
        if (typeof strobj === "object") {
            strobj = jsonStringify(strobj);
        } else {
            strobj += '';
        }
        if (strobj) {
            localStorage.setItem(item, strobj);
            console.log('%cBASE.js->setStorage->Info:%c ' + item + '=' + strobj, 'color: #269abc', 'color: auto');
        } else {
            console.log('%cBASE.js->setStorage->Warn:%c !!strobj === false', 'color: #d58512', 'color: auto');
        }
    }
    function ajax(options) {
        /**
         * achieve 'ajax' communications
         * @options Object
         * return undefined
         */
        if (!options || typeof options !== "object") {
            console.log('%cBASE.js->ajax->Error:%c @options must be a Object', 'color: #ac2925', 'color: auto');
            return;
        }
        var defaults = {
            url: '', //ajax request url
            data: null, //url parameter, Object
            method: 'GET', //request type
            async: true, //asynchronous request
            send: null, //send data
            timeout: null, //unit ms，synchronous mode is the delay time
            error: null, //communication error callback function
            success: null  //communication success callback function, with callback parameter
        };
        for (var va in options) {
            defaults[va] = options[va];

        }

        var reqUrl = concatUrl(defaults.url, defaults.data);
        var async = defaults.async;
        var method = defaults.method;
        var timeout = defaults.timeout;
        var send = defaults.send;
        var errorFun = defaults.error;
        var successFun = defaults.success;
        var xhr = newXhr();
        var readystatechange = false;
        var timeoutTimer;

        timeout ? dealTimeout() : openAndSend();
        async ? dealAsyncRes() : dealSyncRes();

        return xhr;

        function dealTimeout() {
            async ? dealAsync() : dealSync();

            function dealAsync() {
                timeoutTimer = setTimeout(function () {
                    if (!readystatechange) {
                        console.log('%cBASE.js->ajax->Info:%c fun dealAsync timeout ' + timeout + 'ms', 'color: #269abc', 'color: auto');
                        xhr.onreadystatechange = null;
                        execFun(errorFun, "timeout");
                    }
                    clearTimeout(timeoutTimer);
                }, timeout);
                openAndSend();
            }
            function dealSync() {
                timeoutTimer = setTimeout(function () {
                    console.log('%cBASE.js->ajax->Info:%c fun dealSync delay ' + timeout + 'ms', 'color: #269abc', 'color: auto');
                    openAndSend();
                    xhrRes(xhr, successFun, errorFun);
                    clearTimeout(timeoutTimer);
                }, timeout);
            }
        }
        function openAndSend() {
            console.log('%cBASE.js->ajax->Info:%c openAndSend start open and send', 'color: #269abc', 'color: auto');
            xhr.open(method, reqUrl, async);
            xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
            xhr.send(send);
        }
        function dealAsyncRes() {
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    readystatechange = true;
                    clearTimeout(timeoutTimer);
                    xhrRes(xhr, successFun, errorFun);
                }
            };
        }
        function dealSyncRes() {
            if (timeout)
                return;
            xhrRes(xhr, successFun, errorFun);
        }
    }
    function txtReader(url, callback, sync) {
        /**
         * reader file as txt
         * @url String
         * @callback Function
         * @sync Boolean
         * return undefined
         */
        if (!url || typeof url !== "string") {
            execFun(callback);
            console.log('%cBASE.js->txtReader->Error:%c @url must be a String', 'color: #ac2925', 'color: auto');
            return;
        }

        var async = sync ? false : true;  //default async

        var xhr = newXhr();
        xhr.open('GET', url, async);
        xhr.send();

        if (async) {
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    dealRes();
                }
            };
        } else {
            dealRes();
        }

        function dealRes() {
            xhrRes(xhr, callback, function (status) {
                execFun(callback);
                console.log('%cBASE.js->txtReader->Error:%c read file error ' + status, 'color: #ac2925', 'color: auto');
            });
        }
    }
    function jsReader(url, id, callback) {
        /**
         * reader js >ie8
         * @url String
         * @id String, tag id
         * @callback Function, load js finish to call
         * return undefined
         */
        if (!url || typeof url !== "string") {
            execFun(callback);
            console.log('%cBASE.js->jsReader->Error:%c @url must be a String', 'color: #ac2925', 'color: auto');
            return;
        }
        if (id && DOC.getElementById(id)) {
            execFun(callback);
            console.log('%cBASE.js->jsReader->Warn:%c @id script tag already exit -%c ' + id, 'color: #d58512', 'color: auto', 'color: red');
            return;
        }

        createScript();

        function createScript() {
            var body = DOC.body;
            var script = DOC.createElement('script');
            id && (script.id = id);
            script.type = "text/javascript";
            script.charset = "utf-8";
            script.src = url;
            body.appendChild(script);

            script.onload = function () {
                execFun(callback);
                var str = id ? id : '';
                console.log('%cBASE.js->jsReader->Info:%c js onload!%c ' + str, 'color: #269abc', 'color: auto', 'color: red');
            };
        }
    }
    function cssReader(url, id, callback) {
        /**
         * reader css
         * @url String
         * @id String, tag id
         * @callback Function, load css finish to call
         * return undefined
         */
        if (!url || typeof url !== "string") {
            execFun(callback);
            console.log('%cBASE.js->cssReader->Error:%c @url must be a String', 'color: #ac2925', 'color: auto');
            return;
        }
        if (id && DOC.getElementById(id)) {
            execFun(callback);
            console.log('%cBASE.js->cssReader->Warn:%c @id link tag already exit -%c ' + id, 'color: #d58512', 'color: auto', 'color: red');
            return;
        }

        linkCss();

        function linkCss() {
            var head = DOC.getElementsByTagName('head')[0];
            var cssnum = DOC.styleSheets.length;

            var link = DOC.createElement('link');
            id && (link.id = id);
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            head.appendChild(link);

            styleReady(id, cssnum, callback);
        }
    }
    function createStyle(styleStr, id, callback) {
        /**
         * create css style tag
         * @styleStr String, css style
         * @id String, style tag id
         * @callback Function, style ready to call
         * return undefined
         */
        if (!styleStr || typeof styleStr !== "string") {
            execFun(callback);
            console.log('%cBASE.js->createStyle->Error:%c @styleStr must be a String', 'color: #ac2925', 'color: auto');
            return;
        }
        if (id && DOC.getElementById(id)) {
            execFun(callback);
            console.log('%cBASE.js->createStyle->Warn:%c @id style tag already exit -%c ' + id, 'color: #d58512', 'color: auto', 'color: red');
            return;
        }
        var head = DOC.getElementsByTagName('head')[0];
        var cssnum = DOC.styleSheets.length;
        var tag = DOC.createElement("style");
        tag.type = 'text/css';
        id && (tag.id = id);
        try {
            tag.appendChild(DOC.createTextNode(styleStr));
        } catch (e) {
            tag.styleSheet.cssText = styleStr;
        }
        head.appendChild(tag);

        styleReady(id, cssnum, callback);
    }
    function adpAryScopeStyle(styleStr, adpAry, adp, bool, id, callback) {
        /**
         * create css style in an adp array scope
         * @styleStr String, css style
         * @adpAry Array, adp style point array
         * @adp Number, standard adp scale
         * @bool Boolean, adp according to innerHeight
         * @id String, style tag id
         * @callback Function, style ready to call
         * return undefined
         */
        if (!styleStr || typeof styleStr !== "string" ||
                !adpAry || !adpAry.length ||
                !adp || isNaN(adp - 0)) {
            execFun(callback);
            console.log('%cBASE.js->adpAryScopeStyle->Error:%c parameter type error', 'color: #ac2925', 'color: auto');
            return;
        }

        var csspre = '@media(min-';
        var newStyleStr = '';
        for (var i = 0; i < adpAry.length; i++)
            deal(i);
        createStyle(newStyleStr, id, callback);

        function deal(i) {
            var str = cssPxChange(styleStr, adpAry[i] / adp);
            newStyleStr += (bool ? csspre + 'height:' : csspre + 'width:') + (adpAry[i] - 1) + 'px){' + str + '}';
        }
    }
    function adpOneAbsStyle(styleStr, size, adp, bool, id, callback) {
        /**
         * create css style in absolute size
         * @styleStr String, css style
         * @size Number, adp absolute size
         * @adp Number, standard adp scale
         * @bool Boolean, adp according to innerHeight
         * @id String, style tag id
         * @callback Function, style ready to call
         * return undefined
         */
        if (!styleStr || typeof styleStr !== "string" ||
                !size || isNaN(size - 0) ||
                !adp || isNaN(adp - 0)) {
            execFun(callback);
            console.log('%cBASE.js->adpOneAbsStyle->Error:%c parameter type error', 'color: #ac2925', 'color: auto');
            return;
        }

        var csspre = '@media(';
        var newId = (id ? id : 'css') + '-' + size;
        if (DOC.getElementById(newId))
            return execFun(callback);
        var str = cssPxChange(styleStr, size / adp);
        var newStyleStr = (bool ? csspre + 'height:' : csspre + 'width:') + size + 'px){' + str + '}';
        createStyle(newStyleStr, newId, callback);
    }
    function adpAllStyle(styleStr, id, callback, adp, bool) {
        /**
         * create css style and change px to px*scale
         * @styleStr String, css style
         * @id String, style tag id
         * @callback Function, style ready to call
         * @adp Number, standard adp scale, default is 480(w) or 690(h)
         * @bool Boolean, adp according to innerHeight
         * return undefined
         */
        if (!styleStr || typeof styleStr !== "string") {
            execFun(callback);
            console.log('%cBASE.js->adpAllStyle->Error:%c @styleStr must be a String', 'color: #ac2925', 'color: auto');
            return;
        }
        CFG.adpType = bool ? 'height' : 'width';
        isNaN(adp - 0) && (bool ? adp = 690 : adp = 480);
        var adpAry = bool ? adpHeightAry : adpWidthAry;
        adpAryScopeStyle(styleStr, adpAry, adp, bool, id, dealNewSize);

        function dealNewSize() {
            var size = getAdpNewSize(bool, adpAry);
            if (!size)
                return deal();
            adpOneAbsStyle(styleStr, size, adp, bool, id, deal);

            function deal() {
                execFun(callback);
                WIN[addEventListener]('resize', function () {
                    size = getAdpNewSize(bool, adpAry);
                    size && adpOneAbsStyle(styleStr, size, adp, bool, id);
                });
            }
        }
    }
    function adpRateStyle(styleStr, id, callback, width, height) {
        /**
         * create css style and change px to px*scale according width : height
         * @styleStr String, css style
         * @id String, style tag id
         * @callback Function, style ready to call
         * @width Number, width standard adp scale, default is 480
         * @height Number, height standard adp scale, default is 690
         * return undefined
         */
        if (!styleStr || typeof styleStr !== "string") {
            execFun(callback);
            console.log('%cBASE.js->adpRateStyle->Error:%c @styleStr must be a String', 'color: #ac2925', 'color: auto');
            return;
        }
        !id && (id = 'css');
        isNaN(width - 0) && (width = 480);
        isNaN(height - 0) && (height = 690);
        var bool, adp, adpAry;
        resetVar();
        adpAryScopeStyle(styleStr, adpAry, adp, bool, id, dealNewSize);

        function resetVar() {
            bool = WIN.innerWidth / WIN.innerHeight > width / height;
            adp = bool ? height : width;
            adpAry = bool ? adpHeightAry : adpWidthAry;
            CFG.adpType = 'rate-' + (bool ? 'h' : 'w');
        }
        function dealNewSize() {
            var size = getAdpNewSize(bool, adpAry);
            if (!size)
                return deal();
            adpOneAbsStyle(styleStr, size, adp, bool, id, deal);

            function deal() {
                execFun(callback);
                WIN[addEventListener]('resize', function () {
                    resetVar();
                    adpOneAbsStyle(styleStr, getAdpNewSize(bool), adp, bool, id + (bool ? '-h' : '-w'));
                });
            }
        }
    }

    /*===== temp =====*/
    function getAdpNewSize(bool, adpAry) {
        var size = bool ? WIN.innerHeight : WIN.innerWidth;
        if (adpAry)
            for (var i = 0; i < adpAry.length; i++) {
                if (size === adpAry[i])
                    return;
            }
        return size;
    }

    /*========== Private API ==========*/
    P.isLX = function () {
        /**
         * return 'a'
         * 'a' Android lx
         * 'i' iPhone lx
         */
        var ret;
        var userAgent = NAV.userAgent.toLowerCase();
        if (userAgent.indexOf('lingxi') > 0) {
            if (userAgent.indexOf("iphone") > 0) {
                ret = 'i';
            } else {
                ret = 'a';
            }
        }

        return ret;
    };
    P.lxExec = function (A, B, C) {
        return prompt("iflytek:" + jsonStringify([A, B]), jsonStringify(C));
    };
    P.IOSCfg = {
            "pver": "3.0",
            "aid": "108ViaFly",
            "osid": "iPhone",
            "clientver": '0.0.0000'
    };
    P.IOSIsNeedPos = false;
    P.IOSLoadBase = false;
    P.IOSLoadLbs = false;
    P.IOSCB = null;
    P.getLXConfigInfo = function (bool, isNeedPos, callback) {
        var isLx = P.isLX();
        if (isLx !== 'a' &&  isLx !== 'i') {
            callback(defaultCfg());
            return;
        }else if (isLx === 'a') {
            callback(P.getAndroidConfigInfo(bool, isNeedPos));
            return;
        }else if (isLx === 'i') {
            P.getIPhoneConfigInfo(bool, isNeedPos, callback);
            return;
        }

        function defaultCfg() {
            return bool ? {
                "pver": "3.0",
                "aid": "108ViaFly",
                "osid": "Android",
                "clientver": '0.0.0000'
            } : "";
        }
    };
    P.getAndroidConfigInfo = function (bool, isNeedPos) {
        var appBaseInfoStr = P.lxExec("SystemComponents", "getBaseInfo", []);
        if (!appBaseInfoStr)
            return defaultCfg();
        var lxCfg;
        try {
            lxCfg = eval("(" + appBaseInfoStr + ")").message;
            lxCfg && (lxCfg.aid = "108ViaFly");
            if (isNeedPos) {
                var posStr = P.lxExec("LBSComponents", "getLbsInfo", []);
                try {
                    var posObj = eval("(" + posStr + ")").message;
                    lxCfg.long = posObj.longitude;
                    lxCfg.lat = posObj.latitude;
                    lxCfg.pos = posObj.addressName;
                    lxCfg.city = posObj.city;
                } catch (e) {
                }
            }
        } catch (e) {
            lxCfg = defaultCfg();
        }

        var verifytoken = getUrl('c_home_t');
        if(verifytoken && verifytoken == '1'){
            var appVerifyToken = P.lxExec("SystemComponents", "getVerifyToken", []);
            //新验证码替换老的
            try {
                if (appVerifyToken) {
                    var vercode = eval("(" + appVerifyToken + ")").message;
                    if (vercode.verifyToken) {
                        lxCfg.token = vercode.verifyToken;
                    }
                }
            } catch (e) {
                console.log('deal appVerifyToken error......');
            }
        }

        if(lxCfg){
            lxCfg.ver = lxCfg.clientver;
        }

        return lxCfg;

        function defaultCfg() {
            return bool ? {
                "pver": "3.0",
                "aid": "108ViaFly",
                "osid": "Android",
                "ver": '0.0.0000'
            } : "";
        }
    };
    P.getIPhoneConfigInfo = function (bool, isNeedPos, callback) {
        P.IOSIsNeedPos = isNeedPos;
        P.IOSCB = callback;
        window.location.href = 'iflytek://SystemComponents.getBaseInfo';
    };
    P.lxShowAuthView = function () {
        try {
            WIN.lxShowAuthView_callback = function () {
                LOC.reload();
            };
            browserView.showAuthView('lxShowAuthView_callback');
        } catch (e) {
            console.log("Not Find browserView.showAuthView()");
        }
        P.lxSendMsgPage();
    };
    P.lxEncrypt = function (str, key) {
        var ret = '';
        try {
            ret = browserView.encrypt(str, key.slice(key.length - 3));
        } catch (e) {
            console.log('browserView.encrypt error: ' + e);
        }

        return ret;
    };
    P.lxDecrypt = function (str, key) {  //解密
        var ret = '';
        try {
            ret = browserView.decrypt(str, key.slice(key.length - 3));
        } catch (e) {
            console.log('browserView.decrypt error: ' + e);
        }

        return ret;
    };
    P.lxVoiceRegister = function (voiceObj) {
        (function () {
            !voiceObj && (voiceObj = {});
            P.lxExec("LxBrowserComponents", "showSpeakButton", [true]);
            P.lxExec("LxBrowserComponents", "isEventCallBackForJS", [true]);
            var str = P.lxExec("SystemComponents", "isSpeechDialogMode", []);
            try {
                str = eval("(" + str + ")");
                !str.message && (voiceObj.isText = 1);
            } catch (e) {
            }
        })();

        WIN.onTtsPlayBegin = function () {
            voiceObj.ttsPlay = 1;
        };
        WIN.onTtsPlayComplete = function () {
            voiceObj.ttsPlay = 0;
        };
        WIN.onTtsInterrupt = function () {
            voiceObj.ttsPlay = 0;
        };
        WIN.onPlayButtonClick = function () {
            if (!voiceObj.ttsPlay)
                return $EF(voiceObj.ttsPlayFun);
            ttsStop();
        };

        WIN.onHomeKeyClick = ttsStop;
        WIN.onActivityPause = ttsStop;
        WIN.onActivityStop = ttsStop;
        WIN.onPagePause = ttsStop;
        WIN.onPageDestroy = ttsStop;

        return voiceObj;

        function ttsStop() {
            if (voiceObj.ttsPlay) {
                P.lxExec("SynthesizeComponents", "ttsStop", []);
                voiceObj.ttsPlay = 0;
            }
            voiceObj.ttsNoBegin = 1;
        }
    };
    P.lxVoiceBroadcast = function (caller, keyword, numStr) {
        if (caller === undefined)
            return P.lxExec("SynthesizeComponents", "ttsSpeak", ["为您找到下面的结果"]);
        var callerStr = caller + '';
        var beforeTxt = '尾号[n1]' + callerStr.slice(callerStr.length - 4) + '[n0]的手机号码';
        P.lxExec("SynthesizeComponents", "ttsSpeak", [beforeTxt + keyword + "为：" + numStr]);
    };
    P.lxSendMsgPage = function (info) {
        var body = DOC.body;
        var main = getEle('#main');
        rmvEle(main);
        var msgPage = creEle('', main, '', 'msgPage');
        var msgInfo = creEle('', msgPage, '', 'msgPage-info');
        txtEle(msgInfo, info ? info : '当前未能获取您的手机号，可通过免费短信查询');
        creEle('', msgPage, '', 'line');
        var msgCall = creEle('', msgPage, '', 'noselect msgPage-btn');
        txtEle(msgCall, '免费短信查话费');
        creEle('', msgPage, '', 'line');
        var msgFlow = creEle('', msgPage, '', 'noselect msgPage-btn');
        txtEle(msgFlow, '免费短信查流量');
        //var msgCredit = creEle('', msgPage);
        //txtEle(msgCredit, '免费短信查积分');

        msgCall.onclick = function () {
			if (P.isLX() === 'i'){
				window.location.href = 'iflytek://lxOvsExtComponents.queryBySms?type=queryTelFee';
			}else{
				P.lxExec('lxOvsExtComponents', 'queryBySms', ['queryTelFee']);
			}
            P.baidu('new-发短信页面-免费短信查话费');
        };
        msgFlow.onclick = function () {
			if (P.isLX() === 'i'){
				window.location.href = 'iflytek://lxOvsExtComponents.queryBySms?type=queryDataTrans';
			}else{
				P.lxExec('lxOvsExtComponents', 'queryBySms', ['queryDataTrans']);
			}
            P.baidu('new-发短信页面-免费短信查流量');
        };
        //msgCredit.onclick = function () {
        //    P.lxExec('lxOvsExtComponents', 'queryBySms', ['queryTelCredits']);
        //};

        disEle(body, 1);
    };
    P.lxSendMsgDlg = function (bool) {
        var msgDlg = getEle("#msgDlg");
        !msgDlg && create();
        !bool ? open() : close();

        function create() {
            var body = DOC.body;
            msgDlg = creEle('', body, '', 'msgDlg');
            var msgDlgDiv = creEle('', msgDlg);
            var msgDlgCon = creEle('', msgDlgDiv, '', 'msgDlg-con');
            var msgDlgConHead = creEle('', msgDlgCon, '', 'msgDlg-conHead');
            txtEle(msgDlgConHead, '请选择');
            var msgCall = creEle('', msgDlgCon, '', 'noselect msgDlg-conBtn');
            txtEle(msgCall, '免费短信查话费');
            var msgFlow = creEle('', msgDlgCon, '', 'noselect msgDlg-conBtn');
            txtEle(msgFlow, '免费短信查流量');

            msgDlg.onclick = close;
            msgDlgCon.onclick = function (e) {
                e.stopPropagation();
                e.preventDefault();
            };

            msgCall.onclick = function () {
                if (P.isLX() === 'i'){
                    window.location.href = 'iflytek://lxOvsExtComponents.queryBySms?type=queryTelFee';
                }else{
                    P.lxExec('lxOvsExtComponents', 'queryBySms', ['queryTelFee']);
                }
                P.baidu('new-发短信页面-免费短信查话费');
                close();
            };
            msgFlow.onclick = function () {
                if (P.isLX() === 'i'){
                    window.location.href = 'iflytek://lxOvsExtComponents.queryBySms?type=queryDataTrans';
                }else{
                    P.lxExec('lxOvsExtComponents', 'queryBySms', ['queryDataTrans']);
                }
                P.baidu('new-发短信页面-免费短信查流量');
                close();
            };
        }
        function open() {
            disEle(msgDlg, 1);
            setTimeout(function () {
                msgDlg[style].opacity = 1;
            }, 0);
        }
        function close() {
            msgDlg[style].opacity = 0;
            setTimeout(function () {
                disEle(msgDlg);
            }, 301);
        }
    };
    P.isNotApp = function () {
        var body = DOC.body;
        rmvEle(body);
        var div = creEle('', body, 'isNotApp', 'isNotApp');
        div[innerHTML] = '请下载<a href="http://s1.voicecloud.cn/resources/lxdl/index.html?cm=lx"> 灵犀语音助手 </a>进行浏览';
        disEle(body, 1);
    };

    P.loading = function (bool, parEle) {
        var loading = getEle("#loading");
        !loading && create();
        disEle(loading, !!bool);

        function create() {
            !parEle && (parEle = DOC.body);
            loading = creEle('', parEle, 'loading', 'loading');
            var ld = creEle('', loading, '', 'Ld');
            for (var i = 0; i < 12; i++)
                creEle('', ld, '', 'Ld-one Ld' + i);
            var lab = creEle('', loading, '', 'loading-lab');
            txtEle(lab, '正在加载');
        }
    };
    P.alertInfo = function (txt, opt) {
        var dlg = getEle("#alertInfo");
        if (!dlg) {
            dlg = creEle('', DOC.body, 'alertInfo');
            creEle('', dlg, 'alertInfo_bit');
        }
        var bit = getEle("#alertInfo_bit");
        dlg.onclick = '';
        dlg.timeout && clearTimeout(dlg.timeout);
        if (txt === undefined && opt === undefined)
            return close();
        bit[innerHTML] = txt;
        //$T(bit, txt);
        disEle(dlg, 1);
        setTimeout(function () {
            bit[style].opacity = 1;
            if (opt)
                return;
            dlg.timeout = setTimeout(close, 3000);
            dlg.onclick = close;
        }, 0);

        function close() {
            bit[style].opacity = 0;
            setTimeout(function () {
                disEle(dlg);
            }, 301);
        }
    };
    P.round = function (val, bit) {
        /**
         * numerical precision control
         * @val Number or String, like 123 or '123'
         * @bit Number, precision, default is 0
         */
        var ret = false;
        if ((val || val === 0) && !isNaN(val - 0)) {
            if ((!bit && bit !== 0) || typeof bit !== 'number') {
                bit = 2;
            }
            var e = 1;
            for (var i = 0; i < bit; i++) {
                e *= 10;
            }
            ret = Math.round(val * e) / e;
        } else {
            console.log('Warning->BASE.round: the @val=' + val + ' Invalid');
        }
        console.log('Info->BASE.round: the result is ' + ret);
        return ret;
    };
    P.getUtil = function (numStr, bool, util) {
        if(numStr === 'N')
            return '无限量';
        var num = numStr - 0;
        if (isNaN(num) || numStr === '')
            return;
        var pn = ((num >= 0) ? 1 : 0);
        var absNum = Math.abs(num);
        !util && (util = '分钟');
        return bool ? (P.round(num) + util) : [pn, P.round(absNum), util];
    };
    P.getCallUtil = function (numStr, bool) {
        if(numStr === 'N')
            return '无限量';
        var num = numStr - 0;
        if (isNaN(num) || numStr === '')
            return bool ? '----元' : '';
        var pn = ((num >= 0) ? 1 : 0);
        var absNum = Math.abs(num);
        if (absNum < 10000) { //元
            return bool ? (P.round(num) + '元') : [pn, P.round(absNum), '元'];
        } else { //万元
            return bool ? (P.round(num / 10000) + '万元') : [pn, P.round(absNum / 10000), '万元'];
        }
    };
    P.getFlowUtil = function (numStr, bool) {
        if(numStr === 'N')
            return '无限量';
        var num = numStr - 0;
        if (isNaN(num) || numStr === '')
            return bool ? '----M' : '';
        var pn = ((num >= 0) ? 1 : 0);
        var absNum = Math.abs(num);
        if (absNum < 1 && absNum !== 0) { //kb
            return bool ? (P.round(num * 1024) + 'K') : [pn, P.round(absNum * 1024), 'K'];
        } else if (num < 1024) { //mb
            return bool ? (P.round(num) + 'M') : [pn, P.round(absNum), 'M'];
        } else { //gb
            return bool ? (P.round(num / 1024) + 'G') : [pn, P.round(absNum / 1024), 'G'];
        }
    };
    P.formatCaller = function (str) {
        if (!str)
            return '';
        (typeof str === "number") && (str += '');
        var newstr = str;
        if (str.length === 11)
            newstr = str.slice(0, 3) + "-" + str.slice(3, 7) + "-" + str.slice(7);
        return newstr;
    };
    P.formatTime = function () {
        var date = new Date();
        var yyyy = date.getFullYear();
        var MM = format(date.getMonth() + 1);
        var dd = format(date.getDate());
        var hh = format(date.getHours());
        var mm = format(date.getMinutes());
        var ss = format(date.getSeconds());
        var ret = yyyy + MM + dd + hh + mm + ss;
        return ret;

        function format(num) {
            var numStr = num;
            if (numStr < 10)
                numStr = '0' + numStr;
            return numStr + "";
        }
    };
    P.baidu = function (category, evnet) {
        !evnet && (evnet = '点击');
        try {
            _hmt.push(['_trackEvent', category, evnet]);
        } catch (e) {
            console.log(e);
        }
    };

    return P;
}));

function onOCCallback(posStr) {
    var functionname;
    try {
       var posObj = eval("(" + posStr + ")");
       functionname  = posObj.function;
       if (functionname === "getBaseInfo"){
            BASE.extendObj(BASE.IOSCfg,posObj.message);
            BASE.IOSLoadBase = true;
            if(BASE.IOSIsNeedPos)
                window.location.href = 'iflytek://LBSComponents.getLbsInfo';
       }else if (functionname === "getLbsInfo"){
            BASE.IOSCfg.long = posObj.message.longitude;
            BASE.IOSCfg.lat = posObj.message.latitude;
            BASE.IOSCfg.pos = posObj.message.addressName;
            BASE.IOSCfg.city = posObj.message.city;
            BASE.IOSLoadLbs = true;
       }
    }catch(e) {
        //alert(e);
        console.log(e);
    }

    if(BASE.IOSIsNeedPos){
        if((BASE.IOSLoadBase && BASE.IOSLoadLbs) || functionname === "getLbsInfo") {
            BASE.IOSCB(BASE.IOSCfg);
        }
    }else{
        BASE.IOSCB(BASE.IOSCfg);
    }
};
