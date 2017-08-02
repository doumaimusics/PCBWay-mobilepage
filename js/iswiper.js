(function(name, definition) {
  if (typeof define === 'function') {
    define(definition);
  } else {
    this[name] = definition();
  }
})('Swiper', function() {
  /**
   *
   * @param options
   * @constructor
   */
  function Swiper(options) {
    this.version = '1.0.2';
    this._default = {
      // 容器
      container: '.swiper',
      // 每页 className
      item: '.item',
      // 默认竖屏，可选横屏 horizontal
      direction: 'vertical',
      // 激活态 className
      activeClass: 'active',
      // 默认不无限首尾相连
      infinite: false,
      // 滑动切换距离阀值
      threshold: 30,
      // 切换动画时间
      duration: 600,
      // 自动切换，默认为 false，自动切换必须 infinite:true
      autoSwitch: false,
      // 切换间隔
      loopTime: 5000,
      // 缓动函数，默认为 linear，可传入 cubic-bezier()
      easing: "linear",
      // 进度条，默认没有进度条，可选 true 且需要加上进度条 html 代码
      progressBar:false
    };

    this._options = extend(this._default, options);
    this._start = {};
    this._move = {};
    this._end = {};
    this._prev = 0;
    this._current = 0;
    this._offset = 0;
    this._goto = -1;
    this._eventHandlers = {};
    this._lock = false;
    this._loopInterval = null;

    this.$container = document.querySelector(this._options.container);
    this.$items = this.$container.querySelectorAll(this._options.item);
    this.count = this.$items.length;

    if(this._options.progressBar){
      this.$progressBar = document.querySelector('.progress-bar');
      this.$progressItems = this.$progressBar.querySelectorAll('i');
    }

    this._width = this.$container.offsetWidth;
    this._height = this.$container.offsetHeight;
    this._loopWidth = this.count * this._width;
    this._loopHeight = this.count * this._height;


    this._copy();
    this._init();
    this._bind();
    this._marquee();
  }

  /**
   * copy first item for marquee loop
   *
   */
  Swiper.prototype._copy = function() {
    if (this._options.infinite === false) {
      return;
    }

    var me = this;
    var cloneNodeFirst = me.$items[0].cloneNode(true);
    var cloneNodeLast = me.$items[me.count-1].cloneNode(true);

    me.$container.appendChild(cloneNodeFirst);
    me.$container.insertBefore(cloneNodeLast, me.$items[0]);

    me.$container.style.left = '-' + this._width + 'px';

  };

  /**
   * marquee loop
   */
  Swiper.prototype._marquee = function() {
    if (this._options.autoSwitch === false) {
      return;
    }

    var me = this;
    var loopTime = me._options.loopTime;
    var nextIndex = -1;

    this._loopInterval = setInterval(function() {
      // 防止setInterval运行在后台而动画没有运行
      if(nextIndex > me.count){
        this._lock = 0;
        me._offset = 0;
        me._current = 0;
      }

      nextIndex = me._current + 1;

      me._show(nextIndex);
      me._prev = me._current++;
    }, loopTime);
  };

  /**
   * initial
   * @private
   */
  Swiper.prototype._init = function() {
    var me = this;
    var width = me._width;
    var height = me._height;
    var widthCount = me.count + 2;

    var w = width;
    var h = height * widthCount;

    if (me._options.direction === 'horizontal') {
      w = width * widthCount;
      h = height;
    }

    me.$container.style.width = w + 'px';
    me.$container.style.height = h + 'px';

    Array.prototype.forEach.call(me.$container.querySelectorAll(this._options.item), function($item, key) {
      $item.style.width = width + 'px';
      $item.style.height = height + 'px';
    });

    me._activate(0);
  };

  /**
   * bind event listener
   * @private
   */
  Swiper.prototype._bind = function() {
    var me = this;

    this.$container.addEventListener('touchstart', function(e) {
      if (me._lock) {
        return;
      }

      me._start.x = e.changedTouches[0].pageX;
      me._start.y = e.changedTouches[0].pageY;

      me.$container.style['-webkit-transition'] = 'none';
      me.$container.style.transition = 'none';

    }, false);

    this.$container.addEventListener('touchmove', function(e) {
      if (me._lock) {
        return;
      }

      me._move.x = e.changedTouches[0].pageX;
      me._move.y = e.changedTouches[0].pageY;

      var distance = me._move.y - me._start.y;
      var transform = 'translate3d(0, ' + (distance - me._offset) + 'px, 0)';

      if (me._options.direction === 'horizontal') {
        distance = me._move.x - me._start.x;
        transform = 'translate3d(' + (distance - me._offset) + 'px, 0, 0)';
      }

      me.$container.style['-webkit-transform'] = transform;
      me.$container.style.transform = transform;

      e.preventDefault();
    }, false);

    this.$container.addEventListener('touchend', function(e) {
      if (me._lock) {
        return;
      }

      me._end.x = e.changedTouches[0].pageX;
      me._end.y = e.changedTouches[0].pageY;

      var distance = me._end.y - me._start.y;
      if (me._options.direction === 'horizontal') {
        distance = me._end.x - me._start.x;
      }

      me._prev = me._current;

      if (distance > me._options.threshold) {
        // is infinite false or true
        if (me._options.infinite === false) {
          me._current = me._current === 0 ? 0 : --me._current;
        }else{
          me._current = me._current === 0 ? -1 : --me._current;
        }
      } else if (distance < -me._options.threshold) {
        // is infinite false or true
        if (me._options.infinite === false) {
          me._current = me._current < (me.count - 1) ? ++me._current : me._current;
        }else{
          me._current = me._current < (me.count - 1) ? ++me._current : me.count;
        }
      }

      me._show(me._current);
      e.preventDefault();
    }, false);

    this.$container.addEventListener('transitionEnd', function(e) {}, false);

    this.$container.addEventListener('webkitTransitionEnd', function(e) {
      isLoop(me._current, me);

      me._lock = !me._lock;

      if (e.target !== me.$container) {
        return false;
      }

      if (me._current != me._prev || me._goto > -1) {
        me._activate(me._current);
        var cb = me._eventHandlers.swiped || noop;
        cb.apply(me, [me._prev, me._current]);
        me._goto = -1;
      }
      e.preventDefault();
    }, false);
  };

  /**
   * show
   * @param index
   * @private
   */
  Swiper.prototype._show = function(index) {
    if (this._lock) {
      return;
    }

    this._lock = !this._lock;
    this._offset = index * this._height;

    var transform = 'translate3d(0, ' + (-1 * this._offset) + 'px, 0)';

    if (this._options.direction === 'horizontal') {
      this._offset = index * this._width;
      transform = 'translate3d(' + (-1 * this._offset) + 'px, 0, 0)';
    }

    var duration = this._options.duration + 'ms ' + this._options.easing;

    this.$container.style['-webkit-transition'] = duration;
    this.$container.style.transition = duration;
    this.$container.style['-webkit-transform'] = transform;
    this.$container.style.transform = transform;

  };

  /**
   * activate
   * @param index
   * @private
   */
  Swiper.prototype._activate = function(index) {
    var clazz = this._options.activeClass;

    Array.prototype.forEach.call(this.$items, function($item, key) {
      $item.classList.remove(clazz);
      if (index === key) {
        $item.classList.add(clazz);
      }
    });

    if(this._options.progressBar){
      Array.prototype.forEach.call(this.$progressItems, function($item, key) {
        $item.classList.remove(clazz);
        if (index === key) {
          $item.classList.add(clazz);
        }
      });
    }
  };

  /**
   * reset loop
   * @return {*}
   */
  Swiper.prototype.resetLoop = function(){
    clearInterval(this._loopInterval);

    var transform = 'translate3d(0, 0, 0)';
    var duration = '0ms';

    this._activate(0);

    this.$container.style['-webkit-transition'] = duration;
    this.$container.style.transition = duration;
    this.$container.style['-webkit-transform'] = transform;
    this.$container.style.transform = transform;

    this._prev = 0;
    this._current = 0;
    this._offset = 0;
    this._goto = -1;
    this._lock = false;
    this._loopInterval = null;

    this._marquee();
  }

  /**
   * goto x page
   */
  Swiper.prototype.go = function(index) {
    if (index < 0 || index > this.count - 1 || index === this._current) {
      return;
    }

    if (index === 0) {
      this._current = 0;
      this._prev = 0;
    } else {
      this._current = index;
      this._prev = index - 1;
    }

    this._goto = index;
    this._show(this._current);

    return this;
  };

  /**
   * show next page
   */
  Swiper.prototype.next = function() {
    if (this._current >= this.count - 1) {
      return;
    }
    this._prev = this._current;
    this._show(++this._current);
    return this;
  };

  /**
   *
   * @param {String} event
   * @param {Function} callback
   */
  Swiper.prototype.on = function(event, callback) {
    if (this._eventHandlers[event]) {
      throw new Error('event ' + event + ' is already register');
    }
    if (typeof callback !== 'function') {
      throw new Error('parameter callback must be a function');
    }

    this._eventHandlers[event] = callback;

    return this;
  };

  /**
   * simple `extend` method
   * @param target
   * @param source
   * @returns {*}
   */
  function extend(target, source) {
    for (var key in source) {
      target[key] = source[key];
    }

    return target;
  }

  /**
   * @param index
   * 支持正向无限循环
   */
  function isLoop(index, swiper) {
    if(!swiper._options.infinite){
      return;
    }

    var duration = '0ms';
    var transform = "";

    swiper.$container.style['-webkit-transition'] = duration;
    swiper.$container.style.transition = duration;

    // swiper most right
    if (index == swiper.count) {
      transform = 'translate3d(0, 0, 0)';

      if (swiper._options.direction === 'horizontal') {
        transform = 'translate3d(0, 0, 0)';
      }

      swiper.$container.style['-webkit-transform'] = transform;
      swiper.$container.style.transform = transform;

      swiper._offset = 0;
      swiper._current = 0;

    // swiper most left
    }else if(index == -1){
      var distance = (swiper.count - 1) * swiper._height;
      transform = 'translate3d(0, -'+ distance +'px, 0)';

      if (swiper._options.direction === 'horizontal') {
        distance = (swiper.count - 1) * swiper._width;
        transform = 'translate3d(-'+ distance +'px, 0, 0)';
      }

      swiper.$container.style['-webkit-transform'] = transform;
      swiper.$container.style.transform = transform;

      swiper._offset = distance;
      swiper._current = swiper.count - 1;
    }
  }

  /**
   * noop
   */
  function noop() {

  }

  /**
   * export
   */
  return Swiper;
});
