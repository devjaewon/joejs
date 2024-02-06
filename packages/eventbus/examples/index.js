
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = (self.location.protocol.startsWith('http') ? '' : 'http:') + '//' + (self.location.hostname || 'localhost') + ':3001/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
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

    var EventBus = /** @class */ (function () {
        function EventBus() {
            this._registry = {};
        }
        EventBus.prototype.on = function (eventName, eventHandler) {
            var _this = this;
            switch (typeof eventName) {
                case 'string': {
                    if (!eventHandler) {
                        throw new Error('[@kjojs/hands] argument eventHandler required!');
                    }
                    var name_1 = eventName;
                    this._registry[name_1] = this._registry[name_1] || [];
                    this._registry[name_1].push(eventHandler);
                    break;
                }
                case 'object': {
                    var spec = eventName;
                    Object.entries(spec).forEach(function (entry) {
                        var name = entry[0];
                        var handler = entry[1];
                        _this.on(name, handler);
                    });
                    break;
                }
            }
            return this;
        };
        EventBus.prototype.off = function (eventName, eventHandler) {
            if (!eventName) {
                this._registry = {};
                return this;
            }
            switch (typeof eventName) {
                case 'string': {
                    var name_2 = eventName;
                    if (!eventHandler) {
                        delete this._registry[name_2];
                    }
                    else if (this._registry[name_2]) {
                        var i = (this._registry[name_2] || []).indexOf(eventHandler);
                        if (i >= 0) {
                            if (this._registry[name_2].length === 1) {
                                delete this._registry[name_2];
                            }
                            else {
                                this._registry[name_2].splice(i, 1);
                            }
                        }
                    }
                    break;
                }
            }
            return this;
        };
        EventBus.prototype.emit = function (eventName, eventPayload) {
            var handlers = this._registry[eventName] || [];
            handlers.forEach(function (handler) {
                handler(eventPayload);
            });
        };
        return EventBus;
    }());

    /**
     * or
     *
     * type EventDefinition = {
     *   a: 1 | 2 | 3;
     *   b: 'p';
     * };
     */
    function main() {
        return __awaiter(this, void 0, void 0, function () {
            var eventBus;
            return __generator(this, function (_a) {
                eventBus = new EventBus().on({
                    a: console.log,
                    b: console.log,
                });
                eventBus.emit('a', 2);
                eventBus.emit('b', 'p');
                return [2 /*return*/];
            });
        });
    }
    main();

})();
//# sourceMappingURL=index.js.map
