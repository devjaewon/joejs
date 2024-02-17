(function () {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var r$1=function(){function r(){this._registry={};}return r.prototype.on=function(r,t,e){var i=this;switch(typeof r){case"string":if(!t)throw new Error("[@kjojs/hands] argument eventHandler required!");var n=r,s=t;this._registry[n]=this._registry[n]||[],this._registry[n].push({life:null!=e?e:-1,handler:s});break;case"object":if(!r)throw new Error("[@kjojs/hands] argument eventSpecification required!");var h=r;Object.entries(h).forEach((function(r){var t=r[0],e=r[1];i.on(t,e);}));}return this},r.prototype.once=function(r,t){var e=this;switch(typeof r){case"string":if(!t)throw new Error("[@kjojs/hands] argument eventHandler required!");var i=r,n=t;this.on(i,n,1);break;case"object":var s=r;Object.entries(s).forEach((function(r){var t=r[0],i=r[1];e.on(t,i,1);}));}return this},r.prototype.off=function(r,t){if(!r)return this._registry={},this;if("string"==typeof r){var e=r;if(t){if(this._registry[e]){var i=(this._registry[e]||[]).findIndex((function(r){return r.handler===t}));i>=0&&(1===this._registry[e].length?delete this._registry[e]:this._registry[e].splice(i,1));}}else delete this._registry[e];}return this},r.prototype.emit=function(r,t){for(var e=[],i=this._registry[r]||[],n=0;n<i.length;n++){var s=i[n];s.life>0&&s.life--,s.handler(t),0!==s.life&&e.push(s);}e.length>0?this._registry[r]=e:delete this._registry[r];},r.prototype.has=function(r,t){if(!r)return Object.keys(this._registry).length>0;var e=r,i=!!this._registry[e]&&this._registry[e].length>0;return t?!!i&&this._registry[e].findIndex((function(r){return r.handler===t}))>=0:i},r}();

    function e(e){this._el=this._initElements(e),this._evbus=new r$1,this._evmap={};}function n(t){const e=t.width,n=t.height,s=t.left??t.x,r=t.top??t.y;return {top:r,right:s+e,bottom:r+n,left:s,width:e,height:n}}function s$1(t){return new e(t)}e.prototype._initElements=function(t){switch(typeof t){case"string":return Array.prototype.slice.call(document.querySelectorAll(t));case"object":if(Array.isArray(t)&&(0===t.length||t.every((t=>t instanceof Element))))return t;if(t instanceof Element)return [t]}throw new Error("[@kjojs/idom] invalid elements")},e.prototype.transition=function(t,e,n){const s=n?.duration??300,r=`${t} ${s/1e3+"s"} ${n?.timingFunction??"ease"}`;return new Promise((n=>{let i=!1,o=null;const a=()=>{o&&(clearTimeout(o),o=null),i||(this.off("transitionend",a),this.css("transition",null),i=!0,n());};this.once("transitionend",a),this.css("transition",r),o=setTimeout(a,s+20),requestAnimationFrame((()=>{this.css(t,e);}));}))},e.prototype.attr=function(t,e){switch(typeof t){case"string":switch(e){case void 0:return this._getAttrValue(t);case null:this._removeAttrValue(t);break;default:this._setAttrValue(t,e);}break;case"object":if(null===t)return this;Object.entries(t).forEach((([t,e])=>{this.attr(t,e);}));}return this},e.prototype.data=function(t,e,n){switch(typeof t){case"string":switch(e){case void 0:return this._getDataValue(t,n);case null:this._removeDataValue(t);break;default:this._setDataValue(t,e);}break;case"object":if(null===t)return this;Object.entries(t).forEach((([t,e])=>{this.data(t,e);}));}return this},e.prototype._getAttrValue=function(t){return this.isEmpty()?null:this._el[0].getAttribute(t)||null},e.prototype._removeAttrValue=function(t){this.each((e=>e.removeAttribute(t)));},e.prototype._setAttrValue=function(t,e){this.each((n=>n.setAttribute(t,e)));},e.prototype._getDataValue=function(t,e){if(this.isEmpty())return null;const n=this._el[0].dataset[t]||null;if(!n||e&&e.noTypeConversion)return n;switch(n){case"true":return !0;case"false":return !1}const s=parseFloat(n);return Number.isNaN(s)?n:s},e.prototype._removeDataValue=function(t){this.each((e=>{delete e.dataset[t];}));},e.prototype._setDataValue=function(t,e){this.each((n=>{n.dataset[t]=e.toString();}));},e.prototype.addClass=function(t){return this.each((e=>{e.classList.add(t);})),this},e.prototype.removeClass=function(t){return this.each((e=>{e.classList.remove(t);})),this},e.prototype.toggleClass=function(t){return this.each((e=>{e.classList.toggle(t);})),this},e.prototype.hasClass=function(t){let e=!1;return this.each((n=>{n.classList.contains(t)&&(e=!0);})),e},e.prototype.on=function(t,e,n){switch(typeof t){case"string":this._checkAndAttachEventHandler(t);break;case"object":t&&Object.keys(t).forEach((t=>this._checkAndAttachEventHandler(t)));}return this._evbus.on(t,e,n),this},e.prototype.once=function(t,e){return this.on(t,e,1),this},e.prototype.off=function(t,e){return this._evbus.off(t,e),t?this._checkAndDetachEventHandler(t):this._clearEventHandler(),this},e.prototype._checkAndAttachEventHandler=function(t){if(!this._evbus.has(t)){const e=this._handleEvent(t);this.each((n=>n.addEventListener(t,e))),this._evmap[t]=e;}},e.prototype._checkAndDetachEventHandler=function(t){if(!this._evbus.has(t)){const e=this._evmap[t];this.each((n=>n.removeEventListener(t,e)));}},e.prototype._clearEventHandler=function(){Object.keys(this._evmap).forEach((t=>{const e=this._evmap[t];e&&this.each((n=>n.removeEventListener(t,e)));}));},e.prototype._handleEvent=function(t){return e=>{this._evbus.emit(t,e);}},e.prototype.css=function(t,e){switch(typeof t){case"string":switch(e){case void 0:return this._getCssValue(t);case null:this._removeCssValue(t);break;default:this._setCssValue(t,e);}break;case"object":if(null===t)return this;Object.entries(t).forEach((([t,e])=>{this.css(t,e);}));}return this},e.prototype._getCssValue=function(t){return this.isEmpty()?null:this._el[0].style.getPropertyValue(t)||null},e.prototype._removeCssValue=function(t){this.each((e=>e.style.removeProperty(t)));},e.prototype._setCssValue=function(t,e){this.each((n=>n.style.setProperty(t,e)));},e.prototype.get=function(t){return this._el[t]||null},e.prototype.closest=function(t){const n=[];return this.each((e=>{const s=this._closest(e,t);s&&n.push(s);})),new e(n)},e.prototype.find=function(t){const n=[];return this.each((e=>{e.querySelectorAll(t).forEach((t=>{n.push(t);}));})),new e(n)},e.prototype.first=function(){return new e(this.isEmpty()?[]:[this._el[0]])},e.prototype.last=function(){return new e(this.isEmpty()?[]:[this._el[this._el.length-1]])},e.prototype.rect=function(){if(this.isEmpty())return {left:0,top:0,right:0,bottom:0,width:0,height:0};return n(this._el[0].getBoundingClientRect())},e.prototype.html=function(t){switch(typeof t){case"undefined":{let t="";return this.each((e=>{t+=e.innerHTML;})),t}case"string":this.each((e=>{e.innerHTML=t;}));}return this},e.prototype.text=function(t){switch(typeof t){case"undefined":{let t="";return this.each((e=>{t+=e.innerText;})),t}case"string":this.each((e=>{e.innerText=t;}));}return this},e.prototype._closest=function(t,e){let n=t;for(;n;){if(n.matches(e))return n;n=n.parentElement;}return null},e.prototype.each=function(t){this._el.forEach(t);},e.prototype.isEmpty=function(){return 0===this._el.length};

    var getSliderAnimation = function (option) {
        var _a, _b;
        return {
            duration: (_a = option === null || option === void 0 ? void 0 : option.duration) !== null && _a !== void 0 ? _a : 300,
            timingFunction: (_b = option === null || option === void 0 ? void 0 : option.timingFunction) !== null && _b !== void 0 ? _b : 'ease',
        };
    };
    var mergeSliderAnimation = function (animation, option) {
        var _a, _b;
        return {
            duration: (_a = option === null || option === void 0 ? void 0 : option.duration) !== null && _a !== void 0 ? _a : animation.duration,
            timingFunction: (_b = option === null || option === void 0 ? void 0 : option.timingFunction) !== null && _b !== void 0 ? _b : animation.timingFunction,
        };
    };

    var SliderDirection;
    (function (SliderDirection) {
        SliderDirection["RIGHT"] = "RIGHT";
        SliderDirection["LEFT"] = "LEFT";
        SliderDirection["STOP"] = "STOP";
    })(SliderDirection || (SliderDirection = {}));

    var SliderAfterMoveEnd;
    (function (SliderAfterMoveEnd) {
        SliderAfterMoveEnd["RESTORE"] = "RESTORE";
        SliderAfterMoveEnd["CRITICAL_POINT"] = "CRITICAL_POINT";
    })(SliderAfterMoveEnd || (SliderAfterMoveEnd = {}));

    var getSliderContext = function (option) {
        var _a, _b, _c, _d;
        return {
            config: {
                afterMoveEndAnimation: getSliderAnimation(option === null || option === void 0 ? void 0 : option.afterMoveEndAnimation),
                afterMoveEndStrategy: (_a = option === null || option === void 0 ? void 0 : option.afterMoveEndStrategy) !== null && _a !== void 0 ? _a : SliderAfterMoveEnd.CRITICAL_POINT,
                slideNextCriticalPoint: (_b = option === null || option === void 0 ? void 0 : option.slideNextCriticalPoint) !== null && _b !== void 0 ? _b : 80,
                lastTreshold: (_c = option === null || option === void 0 ? void 0 : option.lastTreshold) !== null && _c !== void 0 ? _c : 999999,
                notResize: (_d = option === null || option === void 0 ? void 0 : option.notResize) !== null && _d !== void 0 ? _d : false,
            },
            x: 0,
            index: 0,
        };
    };

    var SliderCamera = /** @class */ (function () {
        function SliderCamera(element, _context) {
            this._context = _context;
            this._direction = SliderDirection.STOP;
            this._isBlocked = false;
            this._dom = s$1(element);
        }
        return SliderCamera;
    }());

    var r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e;}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);},r(t,e)};function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t;}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n);}var o=function(){return o=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},o.apply(this,arguments)};"function"==typeof SuppressedError&&SuppressedError;var s,a=function(t){function e(){return t.call(this,"[Hands.js] element binding required!")||this}return i(e,t),e}(Error);new a;var u=function(t){function e(){return t.call(this,"[Hands.js] unknown error!")||this}return i(e,t),e}(Error),l=new u,p=function(t){function e(e,r,i){var o=t.call(this)||this;return o._id=e,o.opt=i,o._isSubscribed=!1,o._dom=s$1(r),o}return i(e,t),Object.defineProperty(e.prototype,"id",{get:function(){return this._id},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"dom",{get:function(){return this._dom},enumerable:!1,configurable:!0}),e.prototype.destroy=function(){this._dom.off(),this.off();},e}(r$1);!function(t){t[t.ready=0]="ready",t[t.start=1]="start",t[t.move=2]="move",t[t.end=3]="end";}(s||(s={}));var d,h="MOUSE_SOURCE",_=function(t){function e(e,n){var r=t.call(this,h,e,n)||this;return r._status=s.ready,r._event=null,r._handleMouseStart=function(t){r._status=s.start,r._event=t,r.emit("input",r);},r._handleMouseMove=function(t){r._status=s.move,r._event=t,r.emit("input",r);},r._handleMouseEnd=function(t){r._status=s.end,r._event=t,r.emit("input",r),r._clear();},r}return i(e,t),e.prototype.init=function(){this.dom.css({"user-drag":"none","-webkit-user-drag":"none","-moz-user-drag":"none"}),this._subscribeNativeEvents();},Object.defineProperty(e.prototype,"status",{get:function(){return this._status},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"event",{get:function(){return this._event},enumerable:!1,configurable:!0}),e.prototype._clear=function(){this._status=s.ready,this._event=null;},e.prototype._subscribeNativeEvents=function(){this._isSubscribed||(this.dom.on("mousedown",this._handleMouseStart),this.dom.on("mousemove",this._handleMouseMove),this.dom.on("mouseleave",this._handleMouseEnd),this.dom.on("mouseup",this._handleMouseEnd),this._isSubscribed=!0);},e}(p);!function(t){t[t.ready=0]="ready",t[t.start=1]="start",t[t.move=2]="move",t[t.end=3]="end";}(d||(d={}));var v,f="TOUCH_SOURCE",y=function(t){function e(e,n){var r=t.call(this,f,e,n)||this;return r._status=d.ready,r._event=null,r._handleTouchStart=function(t){r._status=d.start,r._event=t,r.emit("input",r);},r._handleTouchMove=function(t){r._status=d.move,r._event=t,r.emit("input",r);},r._handleTouchEnd=function(t){r._status=d.end,r._event=t,r.emit("input",r),r._clear();},r._handleTouchCancel=function(t){r._status=d.end,r._event=t,r.emit("input",r),r._clear();},r}return i(e,t),e.prototype.init=function(){var t;this.dom.css(o({"touch-action":"pan-x pan-y","user-drag":"none","-webkit-user-drag":"none","-moz-user-drag":"none"},(null===(t=this.opt)||void 0===t?void 0:t.cssStyles)||{})),this._subscribeNativeEvents();},Object.defineProperty(e.prototype,"status",{get:function(){return this._status},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"event",{get:function(){return this._event},enumerable:!1,configurable:!0}),e.prototype._subscribeNativeEvents=function(){this._isSubscribed||(this.dom.on("touchstart",this._handleTouchStart),this.dom.on("touchmove",this._handleTouchMove),this.dom.on("touchend",this._handleTouchEnd),this.dom.on("touchcancel",this._handleTouchCancel),this._isSubscribed=!0);},e.prototype._clear=function(){this._status=d.ready,this._event=null;},e}(p);!function(t){t.start="start",t.move="move",t.end="end";}(v||(v={}));var m=function(){function t(){this._current=null,this._prev=null,this._start=null;}return Object.defineProperty(t.prototype,"current",{get:function(){return this._current},enumerable:!1,configurable:!0}),t.prototype.process=function(t){var e=t.event;if(e){var n=this._start,r=this._current,i=function(t){var e;if((null!==(e=null==t?void 0:t.targetTouches.length)&&void 0!==e?e:0)>0)return t.targetTouches[0];return null}(e),o={type:this._getEventTypeByTouchSource(t),clientX:0,clientY:0,pageX:0,pageY:0,screenX:0,screenY:0,deltaX:0,deltaY:0,tdeltaX:0,tdeltaY:0,velocityX:0,velocityY:0,time:e.timeStamp};if(o.type===v.end&&r)o.clientX=r.clientX,o.clientY=r.clientY,o.pageX=r.pageX,o.pageY=r.pageY,o.screenX=r.screenX,o.screenY=r.screenY,o.deltaX=0,o.deltaY=0,o.tdeltaX=r.tdeltaX,o.tdeltaY=r.tdeltaY,o.velocityX=0,o.velocityY=0;else if(i){if(o.clientX=i.clientX,o.clientY=i.clientY,o.pageX=i.pageX,o.pageY=i.pageY,o.screenX=i.screenX,o.screenY=i.screenY,r){o.deltaX=o.clientX-r.clientX,o.deltaY=o.clientY-r.clientY;var s=o.time-r.time;o.velocityX=o.deltaX/s,o.velocityY=o.deltaY/s;}n&&(o.tdeltaX=o.clientX-n.clientX,o.tdeltaY=o.clientY-n.clientY);}this._current=o,this._prev=r,o.type===v.start&&(this._start=this._current);}},t.prototype.clear=function(){this._current=null,this._prev=null,this._start=null;},t.prototype._getEventTypeByTouchSource=function(t){var e;switch(t.status){case d.ready:throw l;case d.start:e=v.start;break;case d.move:e=v.move;break;case d.end:e=v.end;}return e},t}();var b=function(){function t(){this._current=null,this._prev=null,this._start=null;}return Object.defineProperty(t.prototype,"current",{get:function(){return this._current},enumerable:!1,configurable:!0}),t.prototype.process=function(t){var e=t.event;if(e){var n=this._start,r=this._current,i={type:this._getEventTypeByMouseSource(t),clientX:0,clientY:0,pageX:0,pageY:0,screenX:0,screenY:0,deltaX:0,deltaY:0,tdeltaX:0,tdeltaY:0,velocityX:0,velocityY:0,time:t.event.timeStamp};if(n||i.type===v.start){if(i.type===v.end&&r)i.clientX=r.clientX,i.clientY=r.clientY,i.pageX=r.pageX,i.pageY=r.pageY,i.screenX=r.screenX,i.screenY=r.screenY,i.deltaX=0,i.deltaY=0,i.tdeltaX=r.tdeltaX,i.tdeltaY=r.tdeltaY,i.velocityX=0,i.velocityY=0;else {if(i.clientX=e.clientX,i.clientY=e.clientY,i.pageX=e.pageX,i.pageY=e.pageY,i.screenX=e.screenX,i.screenY=e.screenY,r){i.deltaX=i.clientX-r.clientX,i.deltaY=i.clientY-r.clientY;var o=i.time-r.time;i.velocityX=i.deltaX/o,i.velocityY=i.deltaY/o;}n&&(i.tdeltaX=i.clientX-n.clientX,i.tdeltaY=i.clientY-n.clientY);}this._current=i,this._prev=r,i.type===v.start&&(this._start=this._current);}else this.clear();}},t.prototype.clear=function(){this._current=null,this._prev=null,this._start=null;},t.prototype._getEventTypeByMouseSource=function(t){var e;switch(t.status){case s.ready:throw l;case s.start:e=v.start;break;case s.move:e=v.move;break;case s.end:e=v.end;}return e},t}(),g=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e._source=null,e._eventManager=null,e._disabled=!1,e._handleInput=function(t){if(e._eventManager){e._eventManager.process(t);var n=e._eventManager.current;n&&(e.emit("input",n),n.type===v.end&&e._eventManager.clear());}},e}return i(e,t),e.prototype.destroy=function(){var t;this._disabled=!1,null===(t=this._source)||void 0===t||t.destroy(),this._source=null;},e.prototype.enable=function(){return this._disabled=!1,this},e.prototype.disable=function(){return this._disabled=!0,this},e.prototype.bind=function(t){switch(this._source=t,this._source.init(),this._source.on("input",this._handleInput),this._source.id){case h:this._eventManager=new b;break;case f:this._eventManager=new m;}return this},e}(r$1);

    var SliderBindRequiredError = /** @class */ (function (_super) {
        __extends(SliderBindRequiredError, _super);
        function SliderBindRequiredError() {
            return _super.call(this, '[@kjojs/slider] element binding required!') || this;
        }
        return SliderBindRequiredError;
    }(Error));
    var sliderBindRequiredError = new SliderBindRequiredError();
    var SliderInvalidArgumentsError = /** @class */ (function (_super) {
        __extends(SliderInvalidArgumentsError, _super);
        function SliderInvalidArgumentsError() {
            return _super.call(this, '[@kjojs/slider] invalid arguments!') || this;
        }
        return SliderInvalidArgumentsError;
    }(Error));
    var sliderInvalidArgumentsError = new SliderInvalidArgumentsError();

    var ResizeObservable = /** @class */ (function () {
        function ResizeObservable(element) {
            var _this = this;
            this._observers = [];
            this._handleObserved = function (entries) {
                if (entries.length === 0) {
                    return;
                }
                var entry = entries[0];
                if (entry.target !== _this._dom.get(0)) {
                    return;
                }
                _this._trigger();
            };
            this._dom = s$1(element);
            this._rect = this._dom.rect();
            this._nativeObserver = new ResizeObserver(this._handleObserved);
            this._nativeObserver.observe(element);
        }
        ResizeObservable.prototype.observe = function (observer) {
            if (!this._nativeObserver) {
                this._nativeObserver = new ResizeObserver(this._handleObserved);
            }
            if (this._observers.indexOf(observer) < 0) {
                this._observers.push(observer);
            }
        };
        ResizeObservable.prototype.unobserve = function (observer) {
            if (observer) {
                var i = this._observers.indexOf(observer);
                if (i >= 0) {
                    this._observers.splice(i, 1);
                }
            }
            else {
                this._observers = [];
            }
        };
        ResizeObservable.prototype.destroy = function () {
            var _a;
            this._observers = [];
            (_a = this._nativeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
            this._nativeObserver = null;
        };
        ResizeObservable.prototype._trigger = function () {
            var rect = this._dom.rect();
            var isSame = rect.width === this._rect.width &&
                rect.height === this._rect.height &&
                rect.top === this._rect.top &&
                rect.left === this._rect.left;
            if (isSame) {
                return;
            }
            this._rect = rect;
            for (var i = 0; i < this._observers.length; i++) {
                this._observers[i](rect);
            }
        };
        return ResizeObservable;
    }());

    function checkTouchSupport() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var win = window;
        return 'ontouchstart' in win || (win.DocumentTouch && document instanceof win.DocumentTouch);
    }

    var SliderPlainCamera = /** @class */ (function (_super) {
        __extends(SliderPlainCamera, _super);
        function SliderPlainCamera(element, context, _panels) {
            var _this = _super.call(this, element, context) || this;
            _this._panels = _panels;
            _this._isAnimated = false;
            _this._cameraX = 0;
            _this._cameraWidth = 0;
            _this._handleInput = function (e) {
                switch (e.type) {
                    case v.start:
                    case v.move:
                        if (!_this._isBlocked) {
                            _this._direction = e.tdeltaX > 0 ? SliderDirection.RIGHT : SliderDirection.LEFT;
                            _this._move(e.deltaX);
                        }
                        break;
                    case v.end:
                        if (!_this._isBlocked) {
                            _this._move(e.deltaX);
                            _this._afterMoveEnd(e);
                        }
                        else if (!_this._isAnimated) {
                            _this._isBlocked = false;
                        }
                        break;
                }
            };
            _this._handleResize = function (cameraRect) {
                _this._resizeRects(cameraRect);
            };
            _this._recognizeRects(_this._dom.rect());
            _this._pan = new g()
                .bind(checkTouchSupport() ? new y(element) : new _(element))
                .on('input', _this._handleInput);
            _this._resizeObservable = _this._createResizeObservable(element);
            return _this;
        }
        Object.defineProperty(SliderPlainCamera.prototype, "pan", {
            get: function () {
                return this._pan;
            },
            enumerable: false,
            configurable: true
        });
        SliderPlainCamera.prototype.destroy = function () {
            var _a;
            (_a = this._resizeObservable) === null || _a === void 0 ? void 0 : _a.destroy();
            this._resizeObservable = null;
        };
        SliderPlainCamera.prototype.moveTo = function (index, animation) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this._isBlocked) {
                                return [2 /*return*/, true];
                            }
                            if (index < 0 || index >= this._panels.length) {
                                throw SliderInvalidArgumentsError;
                            }
                            this._context.index = index;
                            return [4 /*yield*/, this._syncWithIndex(animation)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, false];
                    }
                });
            });
        };
        SliderPlainCamera.prototype._recognizeRects = function (cameraRect) {
            this._cameraX = cameraRect.left;
            this._cameraWidth = cameraRect.width;
            var prevX = 0;
            var prevWidth = 0;
            for (var i = 0; i < this._panels.length; i++) {
                var panel = this._panels[i];
                var rect = panel.dom.rect();
                var x = rect.left, width = rect.width;
                var isFirst = i === 0;
                var isLast = i === this._panels.length - 1;
                var leftGap = isFirst ? x - this._cameraX : x - prevX - prevWidth - this._cameraX;
                var rightGap = isLast ? this._panels[0].leftGap : 0;
                panel.setWidth(width).setLeftGap(leftGap).setRightGap(rightGap);
                prevX = panel.x;
                prevWidth = panel.width;
            }
            console.log(this._panels);
        };
        SliderPlainCamera.prototype._resizeRects = function (cameraRect) {
            this._cameraWidth = cameraRect.width;
            for (var i = 0; i < this._panels.length; i++) {
                var panel = this._panels[i];
                var rect = panel.dom.rect();
                var width = rect.width;
                panel.setWidth(width);
            }
            var currentPanel = this._panels[this._context.index];
            var currentPanelX = currentPanel ? this._calculateStartX(currentPanel) : 0;
            this._render(currentPanelX);
        };
        SliderPlainCamera.prototype._createResizeObservable = function (element) {
            var observable = new ResizeObservable(element);
            observable.observe(this._handleResize);
            return observable;
        };
        SliderPlainCamera.prototype._getNextPanelByX = function () {
            var _this = this;
            var prevIndex = this._context.index;
            var candidatePanels = this._panels.filter(function (panel) {
                return _this._direction === SliderDirection.LEFT ? panel.index > prevIndex : panel.index < prevIndex;
            });
            if (candidatePanels.length === 0) {
                return this._panels[prevIndex] || null;
            }
            var targetI = -1;
            var distance = Infinity;
            for (var i = 0; i < candidatePanels.length; i++) {
                var panelX = candidatePanels[i].x;
                var candidateDistance = Math.abs(panelX - this._context.x);
                if (candidateDistance < distance) {
                    targetI = i;
                    distance = candidateDistance;
                }
            }
            if (targetI < 0) {
                return this._panels[prevIndex] || null;
            }
            return candidatePanels[targetI] || null;
        };
        SliderPlainCamera.prototype._getLastTreshold = function () {
            var treshold = [0, 0];
            if (this._panels.length === 0) {
                return treshold;
            }
            var startTreshold = typeof this._context.config.lastTreshold === 'number'
                ? this._context.config.lastTreshold
                : this._context.config.lastTreshold[0];
            treshold[0] = this._panels[0].x - startTreshold;
            var endTreshold = typeof this._context.config.lastTreshold === 'number'
                ? this._context.config.lastTreshold
                : this._context.config.lastTreshold[1];
            treshold[1] = this._panels[this._panels.length - 1].x + endTreshold;
            return treshold;
        };
        SliderPlainCamera.prototype._calculateStartX = function (panel) {
            var cameraWidth = this._cameraWidth;
            var panelWidth = panel.width;
            var alignCorrection = (cameraWidth - panelWidth) / 2;
            return panel.x - alignCorrection;
        };
        SliderPlainCamera.prototype._syncWithIndex = function (animation) {
            return __awaiter(this, void 0, void 0, function () {
                var x;
                return __generator(this, function (_a) {
                    x = this._calculateStartX(this._panels[this._context.index]);
                    if (animation) {
                        this._renderWithAnimation(x, animation);
                    }
                    else {
                        this._render(x);
                    }
                    return [2 /*return*/];
                });
            });
        };
        SliderPlainCamera.prototype._move = function (deltaX) {
            this._render(this._context.x - deltaX);
        };
        SliderPlainCamera.prototype._afterMoveEnd = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var targetPanel;
                return __generator(this, function (_a) {
                    switch (this._context.config.afterMoveEndStrategy) {
                        case SliderAfterMoveEnd.CRITICAL_POINT:
                            if (Math.abs(e.tdeltaX) > this._context.config.slideNextCriticalPoint) {
                                targetPanel = this._getNextPanelByX();
                                if (targetPanel) {
                                    this._context.index = targetPanel.index;
                                }
                            }
                            this._syncWithIndex(this._context.config.afterMoveEndAnimation);
                            break;
                        case SliderAfterMoveEnd.RESTORE:
                            break;
                    }
                    this._direction = SliderDirection.STOP;
                    return [2 /*return*/];
                });
            });
        };
        SliderPlainCamera.prototype._render = function (x) {
            var _a = this._getLastTreshold(), startTreshold = _a[0], endTreshold = _a[1];
            if (x >= startTreshold && x <= endTreshold) {
                this._context.x = x;
                this._dom.css('transform', "translate3d(".concat(this._context.x * -1, "px, 0, 0)"));
            }
        };
        SliderPlainCamera.prototype._renderWithAnimation = function (x, animation) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    if (this._context.x === x) {
                        return [2 /*return*/];
                    }
                    this._isAnimated = true;
                    this._isBlocked = true;
                    this._context.x = x;
                    return [2 /*return*/, this._dom
                            .transition('transform', "translate3d(".concat(x * -1, "px, 0, 0)"), {
                            duration: animation.duration,
                            timingFunction: animation.timingFunction,
                        })
                            .then(function () {
                            _this._isAnimated = false;
                            _this._isBlocked = false;
                        })];
                });
            });
        };
        return SliderPlainCamera;
    }(SliderCamera));

    var SliderPanel = /** @class */ (function () {
        function SliderPanel(element, _prev, _index, _context) {
            this._prev = _prev;
            this._index = _index;
            this._context = _context;
            this._gap = [0, 0];
            this._width = 0;
            this._dom = s$1(element);
        }
        Object.defineProperty(SliderPanel.prototype, "index", {
            get: function () {
                return this._index;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SliderPanel.prototype, "dom", {
            get: function () {
                return this._dom;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SliderPanel.prototype, "prev", {
            get: function () {
                return this._dom;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SliderPanel.prototype, "gap", {
            get: function () {
                return this._gap;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SliderPanel.prototype, "width", {
            get: function () {
                return this._width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SliderPanel.prototype, "leftGap", {
            get: function () {
                return this._gap[0];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SliderPanel.prototype, "rightGap", {
            get: function () {
                return this._gap[1];
            },
            enumerable: false,
            configurable: true
        });
        SliderPanel.prototype.setLeftGap = function (pxValue) {
            this._gap[0] = pxValue;
            return this;
        };
        SliderPanel.prototype.setRightGap = function (pxValue) {
            this._gap[1] = pxValue;
            return this;
        };
        return SliderPanel;
    }());

    var SliderPlainPanel = /** @class */ (function (_super) {
        __extends(SliderPlainPanel, _super);
        function SliderPlainPanel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(SliderPlainPanel.prototype, "x", {
            get: function () {
                if (this._prev) {
                    return this._prev.x + this._prev.width + this._gap[0];
                }
                return this._gap[0];
            },
            enumerable: false,
            configurable: true
        });
        SliderPlainPanel.prototype.setWidth = function (width) {
            this._width = width;
            return this;
        };
        return SliderPlainPanel;
    }(SliderPanel));

    var Slider = /** @class */ (function () {
        function Slider(element, option) {
            var cameraElement = element.firstElementChild;
            if (!cameraElement) {
                throw sliderBindRequiredError;
            }
            var panelElements = Array.prototype.slice.call(cameraElement.children);
            if (panelElements.length === 0) {
                throw sliderBindRequiredError;
            }
            s$1(element).css({
                'touch-action': 'none',
                'user-drag': 'none',
                '-webkit-user-drag': 'none',
                '-moz-user-drag': 'none',
            });
            this._context = getSliderContext(option);
            this._panels = this._createPanels(panelElements);
            this._camera = this._createCamera(cameraElement);
        }
        Object.defineProperty(Slider.prototype, "camera", {
            get: function () {
                return this._camera;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Slider.prototype, "panels", {
            get: function () {
                return this._panels;
            },
            enumerable: false,
            configurable: true
        });
        Slider.prototype.moveTo = function (index, option) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this._camera.moveTo(index, mergeSliderAnimation(this._context.config.afterMoveEndAnimation, option))];
                });
            });
        };
        Slider.prototype._createCamera = function (element) {
            var panels = this._panels;
            var isValidPanels = panels.map(function (panel) { return panel instanceof SliderPlainPanel; });
            if (!isValidPanels) {
                throw sliderInvalidArgumentsError;
            }
            return new SliderPlainCamera(element, this._context, panels);
        };
        Slider.prototype._createPanels = function (elements) {
            var panels = [];
            for (var i = 0; i < elements.length; i++) {
                panels[i] = new SliderPlainPanel(elements[i], panels[i - 1] || null, i, this._context);
            }
            return panels;
        };
        return Slider;
    }());

    function main() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                initBasicExample();
                initSideMarginExample();
                initCodeBoxes();
                return [2 /*return*/];
            });
        });
    }
    function initBasicExample() {
        var element = s$1('#slider_basic').get(0);
        if (!element) {
            return;
        }
        new Slider(element);
        s$1('#code_basic ._code[data-target="html"]').text("<div id=\"slider_basic\" class=\"slider\">\n  <ul class=\"camera\">\n    <li class=\"panel\">1</li>\n    <li class=\"panel\">2</li>\n    <li class=\"panel\">3</li>\n    <li class=\"panel\">4</li>\n    <li class=\"panel\">5</li>\n  </ul>\n</div>");
        s$1('#code_basic ._code[data-target="css"]').text(".slider {\n  overflow: hidden;\n}\n.camera {\n  white-space: nowrap;\n  font-size: 0;\n}\n.panel {\n  display: inline-block;\n  width: 100%;\n  height: 200px;\n  vertical-align: top;\n}");
        s$1('#code_basic ._code[data-target="js"]').text("import Slider from '@kjojs/slider';\n\nconst slider = new Slider(\n  document.getElementById('slider_basic'),\n);");
    }
    function initSideMarginExample() {
        var element = s$1('#slider_sidemargin').get(0);
        if (!element) {
            return;
        }
        new Slider(element);
    }
    function initCodeBoxes() {
        s$1('._btnCode').on('click', function (e) {
            var btnCode = s$1(e.target);
            var targetName = btnCode.data('target');
            var on = btnCode.hasClass('on');
            var codebox = btnCode.closest('._codebox');
            codebox.find('._btnCode').removeClass('on').addClass('off');
            codebox.find('._code').css('display', null);
            if (!on) {
                codebox.find("._code[data-target=\"".concat(targetName, "\"]")).css('display', 'block');
                codebox.find("._btnCode[data-target=\"".concat(targetName, "\"]")).removeClass('off').addClass('on');
            }
        });
    }
    main();

})();
