 /**
 * 数字跳动
 * @param target
 * @param startVal
 * @param endVal
 * @param decimals
 * @param duration
 * @param options
 * @constructor
 */
export default function CountUp(target, startVal, endVal, decimals, duration, options) {
    var lastTime = 0;
    var vendors = ['webkit', 'moz', 'ms', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame =
        window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }

    var self = this;
    self.version = function () { return '1.8.5'; };

    function formatNumber(num) {
      num = num.toFixed(self.decimals);
      num += '';
      var x, x1, x2, rgx;
      x = num.split('.');
      x1 = x[0];
      x2 = x.length > 1 ? self.options.decimal + x[1] : '';
      rgx = /(\d+)(\d{3})/;
      if (self.options.useGrouping) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + self.options.separator + '$2');
        }
      }
      return self.options.prefix + x1 + x2 + self.options.suffix;
    }
    // Robert Penner's easeOutExpo
    function easeOutExpo(t, b, c, d) {
      return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
    }
    function ensureNumber(n) {
      return (typeof n === 'number' && !isNaN(n));
    }

    // default options
    self.options = {
      useEasing: true, // toggle easing
      useGrouping: true, // 1,000,000 vs 1000000
      separator: ',', // character to use as a separator
      decimal: '.', // character to use as a decimal
      easingFn: easeOutExpo, // optional custom easing function, default is Robert Penner's easeOutExpo
      formattingFn: formatNumber, // optional custom formatting function, default is formatNumber above
      prefix: '', // optional text before the result
      suffix: '' // optional text after the result
    };

    // extend default options with passed options object
    if (options && typeof options === 'object') {
      for (var key in self.options) {
        if (options.hasOwnProperty(key) && options[key] !== null) {
          self.options[key] = options[key];
        }
      }
    }

    if (self.options.separator === '') self.options.useGrouping = false;

    self.initialize = function() {
      if (self.initialized) return true;
      self.d = (typeof target === 'string') ? document.getElementById(target) : target;
      if (!self.d) {
        console.error('[CountUp] target is null or undefined', self.d);
        return false;
      }
      self.startVal = Number(startVal);
      self.endVal = Number(endVal);
      // error checks
      if (ensureNumber(self.startVal) && ensureNumber(self.endVal)) {
        self.decimals = Math.max(0, decimals || 0);
        self.dec = Math.pow(10, self.decimals);
        self.duration = Number(duration) * 1000 || 2000;
        self.countDown = (self.startVal > self.endVal);
        self.frameVal = self.startVal;
        self.initialized = true;
        return true;
      }
      else {
        console.error('[CountUp] startVal or endVal is not a number', self.startVal, self.endVal);
        return false;
      }
    };

    // Print value to target
    self.printValue = function(value) {
      var result = self.options.formattingFn(value);

      if (self.d.tagName === 'INPUT') {
        this.d.value = result;
      }
      else if (self.d.tagName === 'text' || self.d.tagName === 'tspan') {
        this.d.textContent = result;
      }
      else {
        this.d.innerHTML = result;
      }
    };

    self.count = function(timestamp) {

      if (!self.startTime) { self.startTime = timestamp; }

      self.timestamp = timestamp;
      var progress = timestamp - self.startTime;
      self.remaining = self.duration - progress;

      // to ease or not to ease
      if (self.options.useEasing) {
        if (self.countDown) {
          self.frameVal = self.startVal - self.options.easingFn(progress, 0, self.startVal - self.endVal, self.duration);
        } else {
          self.frameVal = self.options.easingFn(progress, self.startVal, self.endVal - self.startVal, self.duration);
        }
      } else {
        if (self.countDown) {
          self.frameVal = self.startVal - ((self.startVal - self.endVal) * (progress / self.duration));
        } else {
          self.frameVal = self.startVal + (self.endVal - self.startVal) * (progress / self.duration);
        }
      }

      // don't go past endVal since progress can exceed duration in the last frame
      if (self.countDown) {
        self.frameVal = (self.frameVal < self.endVal) ? self.endVal : self.frameVal;
      } else {
        self.frameVal = (self.frameVal > self.endVal) ? self.endVal : self.frameVal;
      }

      // decimal
      self.frameVal = Math.round(self.frameVal*self.dec)/self.dec;

      // format and print value
      self.printValue(self.frameVal);

      // whether to continue
      if (progress < self.duration) {
        self.rAF = requestAnimationFrame(self.count);
      } else {
        if (self.callback) self.callback();
      }
    };
    // start your animation
    self.start = function(callback) {
      if (!self.initialize()) return;
      self.callback = callback;
      self.rAF = requestAnimationFrame(self.count);
    };
    // toggles pause/resume animation
    self.pauseResume = function() {
      if (!self.paused) {
        self.paused = true;
        cancelAnimationFrame(self.rAF);
      } else {
        self.paused = false;
        delete self.startTime;
        self.duration = self.remaining;
        self.startVal = self.frameVal;
        requestAnimationFrame(self.count);
      }
    };
    // reset to startVal so animation can be run again
    self.reset = function() {
      self.paused = false;
      delete self.startTime;
      self.initialized = false;
      if (self.initialize()) {
        cancelAnimationFrame(self.rAF);
        self.printValue(self.startVal);
      }
    };
    // pass a new endVal and start animation
    self.update = function (newEndVal) {
      if (!self.initialize()) return;
      newEndVal = Number(newEndVal);
      if (!ensureNumber(newEndVal)) {
        console.error('[CountUp] update() - new endVal is not a number', newEndVal);
        return;
      }
      if (newEndVal === self.frameVal) return;
      cancelAnimationFrame(self.rAF);
      self.paused = false;
      delete self.startTime;
      self.startVal = self.frameVal;
      self.endVal = newEndVal;
      self.countDown = (self.startVal > self.endVal);
      self.rAF = requestAnimationFrame(self.count);
    };

    // format startVal on initialization
    if (self.initialize()) self.printValue(self.startVal);
  };

export function bindNumber(data, config){
  if($('#temp_number').length == 0){
    $(document.body).append('<div id="temp_number" style="display:none;">1</div>');
  }
  if($('#temp_leftter' + config.id).length == 0){
    $(document.body).append('<div id="temp_leftter'  + config.id + '" style="opacity:0; width:auto; display:inline-block; height:auto; position:fixed; bottom:0;">1</div>');
  }
  if($('#temp_pointer' + config.id).length == 0){
    $(document.body).append('<div id="temp_pointer'  + config.id + '" style="opacity:0; width:auto; display:inline-block; height:auto; position:fixed; bottom:0;">.</div>');
  }
  $('#temp_leftter' + config.id).css({
    'font-size': config.size.replace('px', '') + 'px'
  });
  $('#temp_pointer' + config.id).css({
    'font-size': config.size.replace('px', '') + 'px'
  });
  var numbers = [];
  var els = $('#' + (config.id || '')).find('a[' + (config.attr || 'num') + ']');

  if(data && (typeof data == 'object')){
    for(var attr in data){
      if(data.hasOwnProperty(attr)){
        els.each(function(){
          var self = $(this);
          self.css({
            'font-size': config.size.replace('px', '') + 'px'
          })
          __setNumber(self, attr, data);
        });
        __define(data, attr);
      }
    }
  }

  function __setNumber(obj, attr, data){
    if(obj.attr((config.attr || 'num')) == attr){
      var number = new CountUp('temp_number', 0, (data[attr] || 0), config.decimals, config.duration, {
        useEasing : true,
        useGrouping : true,
        separator : config.separator || '',
        decimal : '.',
        //suffix: config.unit ? data[config.unit] : ''
      });
      number.d = obj[0];
      number.d.style.width = __setFontSize(data[attr], number.d) + 'px'
      number._attr = attr;
      number.start();
      numbers.push({
        attr: attr,
        value: number
      })
    }
  }
  function __setFontSize(value, obj){
    var width = 0;
    var padding = parseInt(obj.style.paddingLeft || 0) + parseInt(obj.style.paddingRight || 0);
    if(String(value).indexOf('.') > -1){
      width = parseFloat($('#temp_leftter' + config.id).css('width')) * ((String((value || 0).toFixed(config.decimals || 0)).length - 1)) + parseFloat($('#temp_pointer' + config.id).css('width'));
    }else{
      console.log(config.id)
      width = parseFloat($('#temp_leftter' + config.id).css('width')) * (String((value || 0).toFixed(config.decimals || 0)).length)
    }
    return width + padding;
  }
  function __define(obj, attr){
    Object.defineProperty(obj, attr, {
      get: function(){
        return obj[attr] || 0;
      },
      set: function(val){
        var number = __getNumber(attr);
        number.d.style.width = __setFontSize(val, number.d) + 'px';
        number && number.update(val)
      }
    });
  }

  function __getNumber(attr){
    var rs = null;
    numbers && numbers.forEach(function(ele){
      if(ele.attr == attr){
        rs = ele.value;
      }
    });
    return rs;
  }
}
