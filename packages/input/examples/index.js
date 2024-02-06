
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':3001/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
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

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

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

    var HandsBindRequiredError = /** @class */ (function (_super) {
        __extends(HandsBindRequiredError, _super);
        function HandsBindRequiredError() {
            return _super.call(this, '[Hands.js] element binding required!') || this;
        }
        return HandsBindRequiredError;
    }(Error));
    new HandsBindRequiredError();
    var HandsUnknownError = /** @class */ (function (_super) {
        __extends(HandsUnknownError, _super);
        function HandsUnknownError() {
            return _super.call(this, '[Hands.js] unknown error!') || this;
        }
        return HandsUnknownError;
    }(Error));
    var handsUnknownError = new HandsUnknownError();

    var r=function(){function r(){this._registry={};}return r.prototype.on=function(r,t,e){var i=this;switch(typeof r){case"string":if(!t)throw new Error("[@kjojs/hands] argument eventHandler required!");var n=r,s=t;this._registry[n]=this._registry[n]||[],this._registry[n].push({life:null!=e?e:-1,handler:s});break;case"object":if(!r)throw new Error("[@kjojs/hands] argument eventSpecification required!");var h=r;Object.entries(h).forEach((function(r){var t=r[0],e=r[1];i.on(t,e);}));}return this},r.prototype.once=function(r,t){var e=this;switch(typeof r){case"string":if(!t)throw new Error("[@kjojs/hands] argument eventHandler required!");var i=r,n=t;this.on(i,n,1);break;case"object":var s=r;Object.entries(s).forEach((function(r){var t=r[0],i=r[1];e.on(t,i,1);}));}return this},r.prototype.off=function(r,t){if(!r)return this._registry={},this;if("string"==typeof r){var e=r;if(t){if(this._registry[e]){var i=(this._registry[e]||[]).findIndex((function(r){return r.handler===t}));i>=0&&(1===this._registry[e].length?delete this._registry[e]:this._registry[e].splice(i,1));}}else delete this._registry[e];}return this},r.prototype.emit=function(r,t){for(var e=[],i=this._registry[r]||[],n=0;n<i.length;n++){var s=i[n];s.life>0&&s.life--,s.handler(t),0!==s.life&&e.push(s);}e.length>0?this._registry[r]=e:delete this._registry[r];},r.prototype.has=function(r,t){if(!r)return Object.keys(this._registry).length>0;var e=r,i=!!this._registry[e]&&this._registry[e].length>0;return t?!!i&&this._registry[e].findIndex((function(r){return r.handler===t}))>=0:i},r}();

    function e(e){this._elements=this._initElements(e),this._eventBus=new r,this._eventMap={};}function n(t){return new e(t)}e.prototype._initElements=function(t){switch(typeof t){case"string":return Array.prototype.slice.call(document.querySelectorAll(t));case"object":if(Array.isArray()&&t.every((t=>t instanceof Element)))return t;if(t instanceof Element)return [t]}throw new Error("[@kjojs/idom] invalid elements")},e.prototype.attr=function(t,e){switch(typeof t){case"string":switch(e){case void 0:return this._getAttrValue(t);case null:this._removeAttrValue(t);break;default:this._setAttrValue(t,e);}break;case"object":if(null===t)return this;Object.entries(t).forEach((([t,e])=>{this.attr(t,e);}));}return this},e.prototype.data=function(t,e,n){switch(typeof t){case"string":switch(e){case void 0:return this._getDataValue(t,n);case null:this._removeDataValue(t);break;default:this._setDataValue(t,e);}break;case"object":if(null===t)return this;Object.entries(t).forEach((([t,e])=>{this.data(t,e);}));}return this},e.prototype._getAttrValue=function(t){return this.isEmpty()?null:this._elements[0].getAttribute(t)||null},e.prototype._removeAttrValue=function(t){this.each((e=>e.removeAttribute(t)));},e.prototype._setAttrValue=function(t,e){this.each((n=>n.setAttribute(t,e)));},e.prototype._getDataValue=function(t,e){if(this.isEmpty())return null;const n=this._elements[0].dataset[t]||null;if(!n||e&&e.noTypeConversion)return n;switch(n){case"true":return !0;case"false":return !1}const s=parseFloat(n);return Number.isNaN(s)?n:s},e.prototype._removeDataValue=function(t){this.each((e=>{delete e.dataset[t];}));},e.prototype._setDataValue=function(t,e){this.each((n=>{n.dataset[t]=e.toString();}));},e.prototype.on=function(t,e,n){switch(typeof t){case"string":this._checkAndAttachEventHandler(t);break;case"object":t&&Object.keys(t).forEach((t=>this._checkAndAttachEventHandler(t)));}return this._eventBus.on(t,e,n),this},e.prototype.once=function(t,e){return this.on(t,e,1),this},e.prototype.off=function(t,e){return this._eventBus.off(t,e),t?this._checkAndDetachEventHandler(t):this._clearEventHandler(),this},e.prototype._checkAndAttachEventHandler=function(t){if(!this._eventBus.has(t)){const e=this._handleEvent(t);this.each((n=>n.addEventListener(t,e))),this._eventMap[t]=e;}},e.prototype._checkAndDetachEventHandler=function(t){if(!this._eventBus.has(t)){const e=this._eventMap[t];this.each((n=>n.removeEventListener(t,e)));}},e.prototype._clearEventHandler=function(){Object.keys(this._eventMap).forEach((t=>{const e=this._eventMap[t];e&&this.each((n=>n.removeEventListener(t,e)));}));},e.prototype._handleEvent=function(t){return e=>{this._eventBus.emit(t,e);}},e.prototype.css=function(t,e){switch(typeof t){case"string":switch(e){case void 0:return this._getCssValue(t);case null:this._removeCssValue(t);break;default:this._setCssValue(t,e);}break;case"object":if(null===t)return this;Object.entries(t).forEach((([t,e])=>{this.css(t,e);}));}return this},e.prototype._getCssValue=function(t){return this.isEmpty()?null:this._elements[0].style.getPropertyValue(t)||null},e.prototype._removeCssValue=function(t){this.each((e=>e.style.removeProperty(t)));},e.prototype._setCssValue=function(t,e){this.each((n=>n.style.setProperty(t,e)));},e.prototype.each=function(t){this._elements.forEach(t);},e.prototype.isEmpty=function(){return 0===this._elements.length};

    var HandsSource = /** @class */ (function (_super) {
        __extends(HandsSource, _super);
        function HandsSource(element, opt) {
            var _this = _super.call(this) || this;
            _this.opt = opt;
            _this._isSubscribed = false;
            _this._dom = n(element);
            return _this;
        }
        Object.defineProperty(HandsSource.prototype, "dom", {
            get: function () {
                return this._dom;
            },
            enumerable: false,
            configurable: true
        });
        HandsSource.prototype.destroy = function () {
            this._dom.off();
            this.off();
        };
        return HandsSource;
    }(r));

    var TouchSourceStatus;
    (function (TouchSourceStatus) {
        TouchSourceStatus[TouchSourceStatus["ready"] = 0] = "ready";
        TouchSourceStatus[TouchSourceStatus["start"] = 1] = "start";
        TouchSourceStatus[TouchSourceStatus["move"] = 2] = "move";
        TouchSourceStatus[TouchSourceStatus["end"] = 3] = "end";
    })(TouchSourceStatus || (TouchSourceStatus = {}));
    var TouchSource = /** @class */ (function (_super) {
        __extends(TouchSource, _super);
        function TouchSource() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._status = TouchSourceStatus.ready;
            _this._event = null;
            _this._handleTouchStart = function (e) {
                _this._status = TouchSourceStatus.start;
                _this._event = e;
                _this.emit('input', _this);
            };
            _this._handleTouchMove = function (e) {
                _this._status = TouchSourceStatus.move;
                _this._event = e;
                _this.emit('input', _this);
            };
            _this._handleTouchEnd = function (e) {
                _this._status = TouchSourceStatus.end;
                _this._event = e;
                _this.emit('input', _this);
                _this._clear();
            };
            _this._handleTouchCancel = function (e) {
                _this._status = TouchSourceStatus.end;
                _this._event = e;
                _this.emit('input', _this);
                _this._clear();
            };
            return _this;
        }
        TouchSource.prototype.init = function () {
            var _a;
            console.log(this.dom);
            this.dom.css(__assign({ 'touch-action': 'pan-x pan-y', 'user-drag': 'none', '-webkit-user-drag': 'none', '-moz-user-drag': 'none' }, (((_a = this.opt) === null || _a === void 0 ? void 0 : _a.cssStyles) || {})));
            this._subscribeNativeEvents();
        };
        Object.defineProperty(TouchSource.prototype, "status", {
            get: function () {
                return this._status;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TouchSource.prototype, "event", {
            get: function () {
                return this._event;
            },
            enumerable: false,
            configurable: true
        });
        TouchSource.prototype._subscribeNativeEvents = function () {
            if (this._isSubscribed) {
                return;
            }
            this.dom.on('touchstart', this._handleTouchStart);
            this.dom.on('touchmove', this._handleTouchMove);
            this.dom.on('touchend', this._handleTouchEnd);
            this.dom.on('touchcancel', this._handleTouchCancel);
            this._isSubscribed = true;
        };
        TouchSource.prototype._clear = function () {
            this._status = TouchSourceStatus.ready;
            this._event = null;
        };
        return TouchSource;
    }(HandsSource));

    var PanEventType;
    (function (PanEventType) {
        PanEventType["start"] = "start";
        PanEventType["move"] = "move";
        PanEventType["end"] = "end";
    })(PanEventType || (PanEventType = {}));

    var PanEventManagerByTouch = /** @class */ (function () {
        function PanEventManagerByTouch() {
            this._current = null;
            this._prev = null;
            this._start = null;
        }
        Object.defineProperty(PanEventManagerByTouch.prototype, "current", {
            get: function () {
                return this._current;
            },
            enumerable: false,
            configurable: true
        });
        PanEventManagerByTouch.prototype.process = function (touchSource) {
            var touchEvent = touchSource.event;
            if (!touchEvent) {
                return;
            }
            var touch = _getFirstTouch(touchEvent);
            var panEvent = {
                type: this._getEventTypeByTouchSource(touchSource),
                clientX: 0,
                clientY: 0,
                pageX: 0,
                pageY: 0,
                screenX: 0,
                screenY: 0,
                deltaX: 0,
                deltaY: 0,
                tdeltaX: 0,
                tdeltaY: 0,
                velocityX: 0,
                velocityY: 0,
                time: touchEvent.timeStamp,
            };
            if (touch) {
                panEvent.clientX = touch.clientX;
                panEvent.clientY = touch.clientY;
                panEvent.pageX = touch.pageX;
                panEvent.pageY = touch.pageY;
                panEvent.screenX = touch.screenX;
                panEvent.screenY = touch.screenY;
                if (this._prev) {
                    panEvent.deltaX = touch.screenX - this._prev.screenX;
                    panEvent.deltaY = touch.screenY - this._prev.screenY;
                    var timeDiff = panEvent.time - this._prev.time;
                    panEvent.velocityX = panEvent.deltaX / timeDiff;
                    panEvent.velocityY = panEvent.deltaY / timeDiff;
                }
                if (this._start) {
                    panEvent.tdeltaX = touch.screenX - this._start.screenX;
                    panEvent.tdeltaY = touch.screenY - this._start.screenY;
                }
            }
            this._prev = this._current;
            this._current = panEvent;
            if (panEvent.type === PanEventType.start) {
                this._start = this._current;
            }
        };
        PanEventManagerByTouch.prototype.clear = function () {
            this._current = null;
            this._prev = null;
            this._start = null;
        };
        PanEventManagerByTouch.prototype._getEventTypeByTouchSource = function (source) {
            var eventType;
            switch (source.status) {
                case TouchSourceStatus.ready:
                    throw handsUnknownError;
                case TouchSourceStatus.start:
                    eventType = PanEventType.start;
                    break;
                case TouchSourceStatus.move:
                    eventType = PanEventType.move;
                    break;
                case TouchSourceStatus.end:
                    eventType = PanEventType.end;
                    break;
            }
            return eventType;
        };
        return PanEventManagerByTouch;
    }());
    function _getFirstTouch(e) {
        var _a;
        var isTouch = ((_a = e === null || e === void 0 ? void 0 : e.targetTouches.length) !== null && _a !== void 0 ? _a : 0) > 0;
        if (isTouch) {
            return e.targetTouches[0];
        }
        return null;
    }

    var Pan = /** @class */ (function (_super) {
        __extends(Pan, _super);
        function Pan() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._source = null;
            _this._eventManager = null;
            _this._disabled = false;
            _this._handleInput = function (source) {
                if (!_this._eventManager) {
                    return;
                }
                _this._eventManager.process(source);
                var event = _this._eventManager.current;
                if (event) {
                    _this.emit('input', event);
                    if (event.type === PanEventType.end) {
                        _this._eventManager.clear();
                    }
                }
            };
            return _this;
        }
        Pan.prototype.destroy = function () {
            var _a;
            this._disabled = false;
            (_a = this._source) === null || _a === void 0 ? void 0 : _a.destroy();
            this._source = null;
        };
        Pan.prototype.enable = function () {
            this._disabled = false;
            return this;
        };
        Pan.prototype.disable = function () {
            this._disabled = true;
            return this;
        };
        Pan.prototype.bind = function (source) {
            this._source = source;
            this._source.init();
            this._source.on('input', this._handleInput);
            if (source instanceof TouchSource) {
                this._eventManager = new PanEventManagerByTouch();
            }
            return this;
        };
        return Pan;
    }(r));

    function main() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                init();
                return [2 /*return*/];
            });
        });
    }
    function init() {
        var element = document.getElementById('target');
        var source = element ? new TouchSource(element) : null;
        if (source) {
            new Pan().bind(source).on('input', function (e) {
                console.log(e);
            });
        }
    }
    main();

})();
