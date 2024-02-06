
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':3001/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

  var r=function(){function r(){this._registry={};}return r.prototype.on=function(r,t,e){var i=this;switch(typeof r){case"string":if(!t)throw new Error("[@kjojs/hands] argument eventHandler required!");var n=r,s=t;this._registry[n]=this._registry[n]||[],this._registry[n].push({life:null!=e?e:-1,handler:s});break;case"object":if(!r)throw new Error("[@kjojs/hands] argument eventSpecification required!");var h=r;Object.entries(h).forEach((function(r){var t=r[0],e=r[1];i.on(t,e);}));}return this},r.prototype.once=function(r,t){var e=this;switch(typeof r){case"string":if(!t)throw new Error("[@kjojs/hands] argument eventHandler required!");var i=r,n=t;this.on(i,n,1);break;case"object":var s=r;Object.entries(s).forEach((function(r){var t=r[0],i=r[1];e.on(t,i,1);}));}return this},r.prototype.off=function(r,t){if(!r)return this._registry={},this;if("string"==typeof r){var e=r;if(t){if(this._registry[e]){var i=(this._registry[e]||[]).findIndex((function(r){return r.handler===t}));i>=0&&(1===this._registry[e].length?delete this._registry[e]:this._registry[e].splice(i,1));}}else delete this._registry[e];}return this},r.prototype.emit=function(r,t){for(var e=[],i=this._registry[r]||[],n=0;n<i.length;n++){var s=i[n];s.life>0&&s.life--,s.handler(t),0!==s.life&&e.push(s);}e.length>0?this._registry[r]=e:delete this._registry[r];},r.prototype.has=function(r,t){if(!r)return Object.keys(this._registry).length>0;var e=r,i=!!this._registry[e]&&this._registry[e].length>0;return t?!!i&&this._registry[e].findIndex((function(r){return r.handler===t}))>=0:i},r}();

  /**
   * @typedef {import('./index').IDom}
   * @param {HTMLElement | Array<HTMLElement> | string} element
   */
  function IDom(elements) {
    this._el = this._initElements(elements);
    this._evbus = new r();
    this._evmap = {};
  }

  IDom.prototype._initElements = function (elements) {
    switch (typeof elements) {
      case 'string': {
        return Array.prototype.slice.call(document.querySelectorAll(elements));
      }
      case 'object': {
        if (Array.isArray(elements) && (elements.length === 0 || elements.every(element => element instanceof Element))) {
          return elements;
        }
        if (elements instanceof Element) {
          return [elements];
        }
        break;
      }
    }

    throw new Error('[@kjojs/idom] invalid elements');
  };

  IDom.prototype.transition = function (cssPropery, cssValue, option) {
    const duration = option?.duration ?? 300;
    const timingFunction = option?.timingFunction ?? 'ease';
    const durationValue = `${duration / 1000}s`;
    const transitionValue = `${cssPropery} ${durationValue} ${timingFunction}`;

    return new Promise(resolve => {
      let isFinish = false;
      let timer = null;
      const finish = () => {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        if (!isFinish) {
          this.off('transitionend', finish);
          this.css('transition', null);
          isFinish = true;
          resolve();
        }
      };

      this.once('transitionend', finish);
      this.css('transition', transitionValue);
      timer = setTimeout(finish, duration + 20);
      requestAnimationFrame(() => {
        this.css(cssPropery, cssValue);
      });
    });
  };

  IDom.prototype.attr = function (attrMapOrAttrName, attrValue) {
    switch (typeof attrMapOrAttrName) {
      case 'string': {
        switch (attrValue) {
          case undefined:
            return this._getAttrValue(attrMapOrAttrName);
          case null:
            this._removeAttrValue(attrMapOrAttrName);
            break;
          default:
            this._setAttrValue(attrMapOrAttrName, attrValue);
            break;
        }
        break;
      }
      case 'object': {
        if (attrMapOrAttrName === null) {
          return this;
        }
        Object.entries(attrMapOrAttrName).forEach(([attrName, attrValue]) => {
          this.attr(attrName, attrValue);
        });
        break;
      }
    }

    return this;
  };

  IDom.prototype.data = function (dataMapOrDataKey, dataValue, opt) {
    switch (typeof dataMapOrDataKey) {
      case 'string': {
        switch (dataValue) {
          case undefined:
            return this._getDataValue(dataMapOrDataKey, opt);
          case null:
            this._removeDataValue(dataMapOrDataKey);
            break;
          default:
            this._setDataValue(dataMapOrDataKey, dataValue);
            break;
        }
        break;
      }
      case 'object': {
        if (dataMapOrDataKey === null) {
          return this;
        }
        Object.entries(dataMapOrDataKey).forEach(([attrName, attrValue]) => {
          this.data(attrName, attrValue);
        });
        break;
      }
    }

    return this;
  };

  IDom.prototype._getAttrValue = function (attrName) {
    if (this.isEmpty()) {
      return null;
    }

    return this._el[0].getAttribute(attrName) || null;
  };

  IDom.prototype._removeAttrValue = function (attrName) {
    this.each(element => element.removeAttribute(attrName));
  };

  IDom.prototype._setAttrValue = function (attrName, attrValue) {
    this.each(element => element.setAttribute(attrName, attrValue));
  };

  IDom.prototype._getDataValue = function (dataKey, opt) {
    if (this.isEmpty()) {
      return null;
    }

    const value = this._el[0].dataset[dataKey] || null;
    if (!value || (opt && opt.noTypeConversion)) {
      return value;
    }

    switch (value) {
      case 'true':
        return true;
      case 'false':
        return false;
    }

    const numValue = parseFloat(value);
    if (Number.isNaN(numValue)) {
      return value;
    }

    return numValue;
  };

  IDom.prototype._removeDataValue = function (dataKey) {
    this.each(element => {
      delete element.dataset[dataKey];
    });
  };

  IDom.prototype._setDataValue = function (dataKey, dataValue) {
    this.each(element => {
      element.dataset[dataKey] = dataValue.toString();
    });
  };

  IDom.prototype.on = function (eventName, eventHandler, life) {
    switch (typeof eventName) {
      case 'string': {
        this._checkAndAttachEventHandler(eventName);
        break;
      }
      case 'object': {
        if (eventName) {
          Object.keys(eventName).forEach(name => this._checkAndAttachEventHandler(name));
        }
        break;
      }
    }
    this._evbus.on(eventName, eventHandler, life);

    return this;
  };

  IDom.prototype.once = function (eventName, eventHandler) {
    this.on(eventName, eventHandler, 1);

    return this;
  };

  IDom.prototype.off = function (eventName, eventHandler) {
    this._evbus.off(eventName, eventHandler);
    if (!eventName) {
      this._clearEventHandler();
    } else {
      this._checkAndDetachEventHandler(eventName);
    }

    return this;
  };

  IDom.prototype._checkAndAttachEventHandler = function (eventName) {
    if (!this._evbus.has(eventName)) {
      const handler = this._handleEvent(eventName);

      this.each(element => element.addEventListener(eventName, handler));
      this._evmap[eventName] = handler;
    }
  };

  IDom.prototype._checkAndDetachEventHandler = function (eventName) {
    if (!this._evbus.has(eventName)) {
      const handler = this._evmap[eventName];

      this.each(element => element.removeEventListener(eventName, handler));
    }
  };

  IDom.prototype._clearEventHandler = function () {
    Object.keys(this._evmap).forEach(eventName => {
      const handler = this._evmap[eventName];

      if (handler) {
        this.each(element => element.removeEventListener(eventName, handler));
      }
    });
  };

  IDom.prototype._handleEvent = function (eventName) {
    return e => {
      this._evbus.emit(eventName, e);
    };
  };

  IDom.prototype.css = function (cssMapOrCssProperty, cssValue) {
    switch (typeof cssMapOrCssProperty) {
      case 'string': {
        switch (cssValue) {
          case undefined:
            return this._getCssValue(cssMapOrCssProperty);
          case null:
            this._removeCssValue(cssMapOrCssProperty);
            break;
          default:
            this._setCssValue(cssMapOrCssProperty, cssValue);
            break;
        }
        break;
      }
      case 'object': {
        if (cssMapOrCssProperty === null) {
          return this;
        }
        Object.entries(cssMapOrCssProperty).forEach(([cssPropery, cssValue]) => {
          this.css(cssPropery, cssValue);
        });
        break;
      }
    }

    return this;
  };

  IDom.prototype._getCssValue = function (cssKey) {
    if (this.isEmpty()) {
      return null;
    }

    return this._el[0].style.getPropertyValue(cssKey) || null;
  };

  IDom.prototype._removeCssValue = function (cssKey) {
    this.each(element => element.style.removeProperty(cssKey));
  };

  IDom.prototype._setCssValue = function (cssKey, cssValue) {
    this.each(element => element.style.setProperty(cssKey, cssValue));
  };

  IDom.prototype.get = function (index) {
    return this._el[index] || null;
  };

  IDom.prototype.find = function (selector) {
    const newElements = [];

    this.each(element => {
      element.querySelectorAll(selector).forEach(element => {
        newElements.push(element);
      });
    });

    return new IDom(newElements);
  };

  IDom.prototype.first = function () {
    return new IDom(this.isEmpty() ? [] : [this._el[0]]);
  };

  IDom.prototype.last = function () {
    return new IDom(this.isEmpty() ? [] : [this._el[this._el.length - 1]]);
  };

  IDom.prototype.rect = function () {
    if (this.isEmpty()) {
      return {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
      };
    }

    const domRect = this._el[0].getBoundingClientRect();
    const width = domRect.width;
    const height = domRect.height;
    const left = domRect.left ?? domRect.x;
    const top = domRect.top ?? domRect.y;
    const right = left + width;
    const bottom = top + height;

    return {
      top,
      right,
      bottom,
      left,
      width,
      height,
    };
  };

  IDom.prototype.html = function (html) {
    switch (typeof html) {
      case 'undefined': {
        let result = '';
        this.each(element => {
          result += element.innerHTML;
        });

        return result;
      }
      case 'string': {
        this.each(element => {
          element.innerHTML = html;
        });
        break;
      }
    }

    return this;
  };

  IDom.prototype.text = function (text) {
    switch (typeof text) {
      case 'undefined': {
        let result = '';
        this.each(element => {
          result += element.innerText;
        });

        return result;
      }
      case 'string': {
        this.each(element => {
          element.innerText = text;
        });
        break;
      }
    }

    return this;
  };

  IDom.prototype.each = function (callback) {
    this._el.forEach(callback);
  };

  IDom.prototype.isEmpty = function () {
    return this._el.length === 0;
  };

  function idom (element) {
    return new IDom(element);
  }

  async function main() {
    const $target = idom('.target');

    $target
      .css({
        width: '100px',
        height: '100px',
        'background-color': 'black',
      })
      .attr('role', 'main')
      .data('role', $target.attr('role'))
      .on('click', () => {
        console.log('clicked..!');
      });

    const $child = $target.find('.child');

    console.log($child);
    console.log($child.first());
    console.log($child.last());

    idom('.target2').html('<div>3</div>');
    idom('.target3').text('<div>3</div>');

    setTimeout(() => {
      $target.transition('transform', 'translateX(100px)', {
        duration: 2000,
        timingFunction: 'ease-in-out',
      });
    }, 1000);
  }

  main();

})();
