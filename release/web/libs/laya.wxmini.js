!function(i,e,n){n.un,n.uns;var t=n.static,o=n.class,a=n.getset,r=(n.__newvec,laya.utils.Browser),l=(laya.events.Event,laya.events.EventDispatcher),s=laya.resource.HTMLImage,u=laya.utils.Handler,c=laya.display.Input,d=laya.net.Loader,f=(laya.maths.Matrix,laya.renders.Render),h=laya.utils.RunDriver,p=laya.media.SoundChannel,v=laya.media.SoundManager,m=(laya.resource.Texture,laya.net.URL),g=laya.utils.Utils,w=function(){function e(){}return o(e,"laya.wx.mini.MiniAdpter"),e.getJson=function(i){return JSON.parse(i)},e.init=function(t,o){void 0===t&&(t=!1),void 0===o&&(o=!1),e._inited||(e._inited=!0,(e.window=i).navigator.userAgent.indexOf("MiniGame")<0||(e.isZiYu=o,e.isPosMsgYu=t,e.EnvConfig={},e.isZiYu||(C.setNativeFileDir("/layaairGame"),C.existDir(C.fileNativeDir,u.create(e,e.onMkdirCallBack))),e.systemInfo=wx.getSystemInfoSync(),e.window.focus=function(){},n.getUrlPath=function(){},e.window.logtime=function(i){},e.window.alertTimeLog=function(i){},e.window.resetShareInfo=function(){},e.window.CanvasRenderingContext2D=function(){},e.window.CanvasRenderingContext2D.prototype=e.window.wx.createCanvas().getContext("2d").__proto__,e.window.document.body.appendChild=function(){},e.EnvConfig.pixelRatioInt=0,h.getPixelRatio=e.pixelRatio,e._preCreateElement=r.createElement,r.createElement=e.createElement,h.createShaderCondition=e.createShaderCondition,g.parseXMLFromString=e.parseXMLFromString,c._createInputElement=_._createInputElement,e.EnvConfig.load=d.prototype.load,d.prototype.load=x.prototype.load,d.clearRes=e.clearRes,d.prototype._loadImage=y.prototype._loadImage,e.isZiYu&&t&&wx.onMessage(function(i){i.isLoad&&(C.ziyuFileData[i.url]=i.data)})))},e.clearRes=function(i,e){void 0===e&&(e=!1),i=m.formatURL(i);var n=d.getAtlas(i);if(n){for(var t=0,o=n.length;t<o;t++){var a=n[t],r=d.getRes(a);delete d.loadedMap[a],r&&r.destroy(e)}n.length=0,delete d.atlasMap[i],delete d.loadedMap[i],C.remove("",i)}else{var l=d.loadedMap[i];l&&(delete d.loadedMap[i],l instanceof laya.resource.Texture&&l.bitmap&&l.destroy(e))}},e.onMkdirCallBack=function(i,e){i||(C.filesListObj=JSON.parse(e.data))},e.pixelRatio=function(){if(!e.EnvConfig.pixelRatioInt)try{return console.log(e.systemInfo),e.EnvConfig.pixelRatioInt=e.systemInfo.pixelRatio,e.systemInfo.pixelRatio}catch(i){}return e.EnvConfig.pixelRatioInt},e.createElement=function(n){if("canvas"==n){var t;return 1==e.idx?e.isZiYu?(t=sharedCanvas).style={}:t=i.canvas:t=i.wx.createCanvas(),e.idx++,t}if("textarea"==n||"input"==n)return e.onCreateInput(n);if("div"==n){var o=e._preCreateElement(n);return o.contains=function(i){return null},o.removeChild=function(i){},o}return e._preCreateElement(n)},e.onCreateInput=function(i){var n=e._preCreateElement(i);return n.focus=_.wxinputFocus,n.blur=_.wxinputblur,n.style={},n.value=0,n.parentElement={},n.placeholder={},n.type={},n.setColor=function(i){},n.setType=function(i){},n.setFontFace=function(i){},n.addEventListener=function(i){},n.contains=function(i){return null},n.removeChild=function(i){},n},e.createShaderCondition=function(i){var e=this;return function(){return e[i.replace("this.","")]}},e.EnvConfig=null,e.window=null,e._preCreateElement=null,e._inited=!1,e.wxRequest=null,e.systemInfo=null,e.version="0.0.1",e.isZiYu=!1,e.isPosMsgYu=!1,e.parseXMLFromString=function(e){var n;e=e.replace(/>\s+</g,"><");try{n=(new i.Parser.DOMParser).parseFromString(e,"text/xml")}catch(i){throw"需要引入xml解析库文件"}return n},e.idx=1,e}(),y=function(){function i(){}o(i,"laya.wx.mini.MiniImage");return i.prototype._loadImage=function(e){var n=!1;-1==e.indexOf("layaNativeDir/")&&(n=!0,e=m.formatURL(e)),C.getFileInfo(e)?i.onCreateImage(e,this,!n):-1!=e.indexOf("http://")||-1!=e.indexOf("https://")?C.downImg(e,new u(i,i.onDownImgCallBack,[e,this]),e):i.onCreateImage(e,this,!0)},i.onDownImgCallBack=function(e,n,t){t?n.onError(null):i.onCreateImage(e,n)},i.onCreateImage=function(i,e,n){function t(){l.onload=null,l.onerror=null,delete e.imgCache[i]}void 0===n&&(n=!1);var o;if(n)o=i;else{var a=C.getFileInfo(i).md5;o=C.getFileNativePath(a)}null==e.imgCache&&(e.imgCache={});var l,u=function(){t(),e.onLoaded(l)},c=function(){t(),e.event("error","Load image failed")};"nativeimage"==e._type?((l=new r.window.Image).crossOrigin="",l.onload=u,l.onerror=c,l.src=o,e.imgCache[i]=l):new s.create(o,{onload:u,onerror:c,onCreate:function(n){l=n,e.imgCache[i]=n}})},i}(),_=function(){function e(){}return o(e,"laya.wx.mini.MiniInput"),e._createInputElement=function(){c._initInput(c.area=r.createElement("textarea")),c._initInput(c.input=r.createElement("input")),c.inputContainer=r.createElement("div"),c.inputContainer.style.position="absolute",c.inputContainer.style.zIndex=1e5,r.container.appendChild(c.inputContainer),c.inputContainer.setPos=function(i,e){c.inputContainer.style.left=i+"px",c.inputContainer.style.top=e+"px"},n.stage.on("resize",null,e._onStageResize),wx.onWindowResize&&wx.onWindowResize(function(e){i.dispatchEvent&&i.dispatchEvent("resize")}),v._soundClass=F,v._musicClass=F;var t=w.systemInfo.model,o=w.systemInfo.system;-1!=t.indexOf("iPhone")&&(r.onIPhone=!0),-1==o.indexOf("Android")&&-1==o.indexOf("Adr")||(r.onAndriod=!0)},e._onStageResize=function(){n.stage._canvasTransform.identity().scale(r.width/f.canvas.width/h.getPixelRatio(),r.height/f.canvas.height/h.getPixelRatio())},e.wxinputFocus=function(i){var e=c.inputElement.target;e&&!e.editable||(w.window.wx.offKeyboardConfirm(),w.window.wx.offKeyboardInput(),w.window.wx.showKeyboard({defaultValue:e.text,maxLength:e.maxChars,multiple:e.multiline,confirmHold:!0,confirmType:"done",success:function(i){},fail:function(i){}}),w.window.wx.onKeyboardConfirm(function(i){var n=i?i.value:"";e.text=n,e.event("input"),laya.wx.mini.MiniInput.inputEnter()}),w.window.wx.onKeyboardInput(function(i){var n=i?i.value:"";e.multiline||-1==n.indexOf("\n")?(e.text=n,e.event("input")):laya.wx.mini.MiniInput.inputEnter()}))},e.inputEnter=function(){c.inputElement.target.focus=!1},e.wxinputblur=function(){e.hideKeyboard()},e.hideKeyboard=function(){w.window.wx.offKeyboardConfirm(),w.window.wx.offKeyboardInput(),w.window.wx.hideKeyboard({success:function(i){console.log("隐藏键盘")},fail:function(i){console.log("隐藏键盘出错:"+(i?i.errMsg:""))}})},e}(),x=function(){function i(){}o(i,"laya.wx.mini.MiniLoader");return i.prototype.load=function(e,n,t,o,a){void 0===t&&(t=!0),void 0===a&&(a=!1);this._url=e,0===e.indexOf("data:image")?this._type=n="image":this._type=n||(n=this.getTypeFromUrl(e)),this._cache=t,this._data=null;var r="ascii";-1!=e.indexOf(".fnt")?r="utf8":"arraybuffer"==n&&(r="");var l=g.getFileExtension(e);if(-1!=i._fileTypeArr.indexOf(l))w.EnvConfig.load.call(this,e,n,t,o,a);else if(C.getFileInfo(e))w.EnvConfig.load.call(this,e,n,t,o,a);else{if(-1!=e.indexOf("layaNativeDir/")){if(w.isZiYu){var s=C.ziyuFileData[e];return void this.onLoaded(s)}return void C.read(e,r,new u(i,i.onReadNativeCallBack,[r,e,n,t,o,a,this]))}-1!=(e=m.formatURL(e)).indexOf("http://")||-1!=e.indexOf("https://")?w.EnvConfig.load.call(this,e,n,t,o,a):C.readFile(e,r,new u(i,i.onReadNativeCallBack,[r,e,n,t,o,a,this]),e)}},i.onReadNativeCallBack=function(i,e,n,t,o,a,r,l,s){if(void 0===t&&(t=!0),void 0===a&&(a=!1),void 0===l&&(l=0),l)1==l&&w.EnvConfig.load.call(r,e,n,t,o,a);else{var u;u="json"==n||"atlas"==n?w.getJson(s.data):"xml"==n?g.parseXMLFromString(s.data):s.data,r.onLoaded(u),!w.isZiYu&&w.isPosMsgYu&&"arraybuffer"!=n&&wx.postMessage({url:e,data:u,isLoad:!0})}},t(i,["_fileTypeArr",function(){return this._fileTypeArr=["png","jpg","bmp","jpeg","gif"]}]),i}(),C=(function(){function i(){}o(i,"laya.wx.mini.MiniLocation"),i.__init__=function(){w.window.navigator.geolocation.getCurrentPosition=i.getCurrentPosition,w.window.navigator.geolocation.watchPosition=i.watchPosition,w.window.navigator.geolocation.clearWatch=i.clearWatch},i.getCurrentPosition=function(i,e,n){w.window.wx.getLocation(getSuccess=function(e){var n={};n.coords=e,n.timestamp=r.now(),null!=i&&i(n)},e)},i.watchPosition=function(e,t,o){i._curID++;var a;(a={}).success=e,a.error=t,i._watchDic[i._curID]=a,n.timer.loop(1e3,null,i._myLoop)},i.clearWatch=function(e){delete i._watchDic[e],i._hasWatch()||n.timer.clear(null,i._myLoop)},i._hasWatch=function(){var e;for(e in i._watchDic)if(i._watchDic[e])return!0;return!1},i._myLoop=function(){i.getCurrentPosition(i._mySuccess,i._myError)},i._mySuccess=function(e){var n={};n.coords=e,n.timestamp=r.now();var t;for(t in i._watchDic)i._watchDic[t].success&&i._watchDic[t].success(n)},i._myError=function(e){var n;for(n in i._watchDic)i._watchDic[n].error&&i._watchDic[n].error(this.rst)},i._watchDic={},i._curID=0}(),function(i){function e(){e.__super.call(this)}return o(e,"laya.wx.mini.MiniFileMgr",l),e.isLoadFile=function(i){return-1!=e._fileTypeArr.indexOf(i)},e.getFileInfo=function(i){var n=i.split("?")[0],t=e.filesListObj[n];return null==t?null:t},e.onFileUpdate=function(i,n){var t=i.split("/"),o=t[t.length-1],a=e.getFileInfo(n);null==a?e.onSaveFile(n,o):a.readyUrl!=n&&e.remove(o,n)},e.exits=function(i,n){var t=e.getFileNativePath(i);e.fs.getFileInfo({filePath:t,success:function(i){null!=n&&n.runWith([0,i])},fail:function(i){null!=n&&n.runWith([1,i])}})},e.read=function(i,n,t,o){void 0===n&&(n="ascill"),void 0===o&&(o="");var a;a=""!=o?e.getFileNativePath(i):i,e.fs.readFile({filePath:a,encoding:n,success:function(i){null!=t&&t.runWith([0,i])},fail:function(i){i&&""!=o?e.down(o,n,t,o):null!=t&&t.runWith([1])}})},e.readNativeFile=function(i,n){e.fs.readFile({filePath:i,encoding:"",success:function(i){null!=n&&n.runWith([0])},fail:function(i){null!=n&&n.runWith([1])}})},e.down=function(i,n,t,o){void 0===n&&(n="ascill"),void 0===o&&(o="");var a=e.getFileNativePath(o);e.wxdown({url:i,filePath:a,success:function(i){200===i.statusCode&&e.readFile(i.filePath,n,t,o)},fail:function(i){null!=t&&t.runWith([1,i])}}).onProgressUpdate(function(i){null!=t&&t.runWith([2,i.progress])})},e.readFile=function(i,n,t,o){void 0===n&&(n="ascill"),void 0===o&&(o=""),e.fs.readFile({filePath:i,encoding:n,success:function(n){-1==i.indexOf("http://")&&-1==i.indexOf("https://")||e.onFileUpdate(i,o),null!=t&&t.runWith([0,n])},fail:function(i){i&&null!=t&&t.runWith([1,i])}})},e.downImg=function(i,n,t){void 0===t&&(t="");e.wxdown({url:i,success:function(i){200===i.statusCode&&e.copyFile(i.tempFilePath,t,n)},fail:function(i){null!=n&&n.runWith([1,i])}})},e.copyFile=function(i,n,t){var o=i.split("/"),a=o[o.length-1],r=(n.split("?")[0],e.getFileInfo(n)),l=e.getFileNativePath(a);e.getCacheUseSize()+5242880>=52428800&&e.onClearCacheRes(5242880),e.fs.copyFile({srcPath:i,destPath:l,success:function(i){r?r.readyUrl!=n?e.remove(a,n,t):null!=t&&t.runWith([0]):(e.onSaveFile(n,a),null!=t&&t.runWith([0]))},fail:function(i){null!=t&&t.runWith([1,i])}})},e.onClearCacheRes=function(i){var n=0;for(var t in e.filesListObj){var o=e.filesListObj[t];if("fileUsedSize"!=t){if(n>=i)break;var a=d.getRes(o.readyUrl);a&&0==a.bitmap.useNum?(n+=o.size,e.remove("",o.readyUrl)):null==a&&(n+=o.size,e.remove("",o.readyUrl))}}},e.getFileNativePath=function(i){return laya.wx.mini.MiniFileMgr.fileNativeDir+"/"+i},e.remove=function(i,n,t){void 0===n&&(n="");var o=e.getFileInfo(n),a=e.getFileNativePath(o.md5);e.fs.unlink({filePath:a,success:function(o){e.onSaveFile(n,i,""!=i),null!=t&&t.runWith([0])},fail:function(i){}})},e.onSaveFile=function(i,n,t){void 0===t&&(t=!0);var o=i.split("?")[0];if(null==e.filesListObj.fileUsedSize&&(e.filesListObj.fileUsedSize=0),t){e.filesListObj[o]={md5:n,readyUrl:i};var a=e.getFileNativePath(n);e.fs.getFileInfo({filePath:a,success:function(t){e.filesListObj[o]={md5:n,readyUrl:i,size:t.size},e.filesListObj.fileUsedSize=parseInt(e.filesListObj.fileUsedSize)+t.size,e.fs.writeFile({filePath:e.fileNativeDir+"/"+e.fileListName,encoding:"utf8",data:JSON.stringify(e.filesListObj),success:function(i){},fail:function(i){}})},fail:function(i){console.log("fail"),console.log(i)},complete:function(i){}})}else{var r=parseInt(e.filesListObj[o].size);e.filesListObj.fileUsedSize=parseInt(e.filesListObj.fileUsedSize)-r,delete e.filesListObj[o],e.fs.writeFile({filePath:e.fileNativeDir+"/"+e.fileListName,encoding:"utf8",data:JSON.stringify(e.filesListObj),success:function(i){},fail:function(i){}})}},e.getCacheUseSize=function(){return e.filesListObj&&e.filesListObj.fileUsedSize?e.filesListObj.fileUsedSize:0},e.existDir=function(i,n){e.fs.mkdir({dirPath:i,success:function(i){null!=n&&n.runWith([0,{data:JSON.stringify({})}])},fail:function(i){-1!=i.errMsg.indexOf("file already exists")?e.readSync(e.fileListName,"utf8",n):null!=n&&n.runWith([1,i])}})},e.readSync=function(i,n,t,o){void 0===n&&(n="ascill"),void 0===o&&(o="");var a,r=e.getFileNativePath(i);try{a=e.fs.readFileSync(r,n),null!=t&&t.runWith([0,{data:a}])}catch(i){null!=t&&t.runWith([1])}},e.setNativeFileDir=function(i){e.fileNativeDir=wx.env.USER_DATA_PATH+i},e.filesListObj={},e.fileNativeDir=null,e.fileListName="layaairfiles.txt",e.ziyuFileData={},t(e,["_fileTypeArr",function(){return this._fileTypeArr=["json","ani","xml","sk","txt","atlas","swf","part","fnt","proto","lh","lav","lani","lmat","lm","ltc"]},"fs",function(){return this.fs=wx.getFileSystemManager()},"wxdown",function(){return this.wxdown=wx.downloadFile}]),e}()),F=function(i){function e(){this._sound=null,this.url=null,this.loaded=!1,e.__super.call(this),this._sound=e._createSound()}o(e,"laya.wx.mini.MiniSound",l);var n=e.prototype;return n.load=function(i){function n(){t._sound.onCanplay(e.bindToThis(t.onCanPlayCallBack,t)),t._sound.onError(e.bindToThis(t.onCanPlayCallBack,t))}var t=this;if(i=m.formatURL(i),this.url=i,e._audioCache[i])this.event("complete");else{this._sound.src=i,this._sound.onCanplay(function(){n(),o.loaded=!0,o.event("complete"),e._audioCache[o.url]=o});var o=this;this._sound.onError(function(){n(),o.event("error")})}},n.onCanPlayCallBack=function(){},n.play=function(i,n){void 0===i&&(i=0),void 0===n&&(n=0);var t;this.url==v._tMusic?(e._musicAudio||(e._musicAudio=e._createSound()),t=e._musicAudio):t=e._createSound(),t.src=this.url;var o=new I(t);return o.url=this.url,o.loops=n,o.startTime=i,o.play(),v.addChannel(o),o},n.dispose=function(){var i=e._audioCache[this.url];i&&(i.src="",delete e._audioCache[this.url])},a(0,n,"duration",function(){return this._sound.duration}),e._createSound=function(){return e._id++,w.window.wx.createInnerAudioContext()},e.bindToThis=function(i,e){return i.bind(e)},e._musicAudio=null,e._id=0,e._audioCache={},e}(),I=function(i){function e(i){this._audio=null,this._onEnd=null,e.__super.call(this),this._audio=i,this._onEnd=e.bindToThis(this.__onEnd,this),i.onEnded(this._onEnd)}o(e,"laya.wx.mini.MiniSoundChannel",p);var t=e.prototype;return t.__onEnd=function(){if(1==this.loops)return this.completeHandler&&(n.timer.once(10,this,this.__runComplete,[this.completeHandler],!1),this.completeHandler=null),this.stop(),void this.event("complete");this.loops>0&&this.loops--,this.startTime=0,this.play()},t.play=function(){this.isStopped=!1,v.addChannel(this),this._audio.play()},t.stop=function(){this.isStopped=!0,v.removeChannel(this),this.completeHandler=null,this._audio&&(this._audio.pause(),this._audio.onStop(e.bindToThis(this.onStopEndEd,this)),this._audio.onEnded(e.bindToThis(this.onStopEndEd,this)),this._audio=null)},t.onStopEndEd=function(){},t.pause=function(){this.isStopped=!0,this._audio.pause()},t.resume=function(){this._audio&&(this.isStopped=!1,v.addChannel(this),this._audio.play())},a(0,t,"position",function(){return this._audio?this._audio.currentTime:0}),a(0,t,"duration",function(){return this._audio?this._audio.duration:0}),a(0,t,"volume",function(){return 1},function(i){}),e.bindToThis=function(i,e){return i.bind(e)},e}()}(window,document,Laya),"function"==typeof define&&define.amd&&define("laya.core",["require","exports"],function(i,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});for(var n in Laya){var t=Laya[n];t&&t.__isclass&&(e[n]=t)}});