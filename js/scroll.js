	//首页顶部滑动消失封装
/*
 * Scroll-up-bar plugin v0.0.1
 * https://github.com/eduardomb/scroll-up-bar
*/
(function($) {
  'use strict';
  $.fn.scrollupbar = function() {
    var $window = $(window),
        $document = $('.m-cente'),
        $topbar = this,
        topbarHeight = $topbar.outerHeight(),
        lastY = 0, 
        revealing = false, 
    $window.scroll(function() {
      var y = $window.scrollTop();

    
      if (timeout) {
        clearTimeout(timeout);
      }

      // Ignore elastic scrolling.
      if (y < 0 || y > ($document.height() - $window.height())) {
        return;
      }

      if (y < lastY) { // Scrolling up
        // The first scroll up places the bar right above the top frame.
        if (!revealing) {
          revealing = true;

          if (y > topbarHeight) {
            $topbar.css('top', y - topbarHeight);
          }
        }

        // Scrolls up bigger than the bar's height fixes the bar on top.
        if (parseInt($topbar.css('top')) > y) {
          $topbar.css({
            'position': 'fixed',
            'top': 0
          });
        }

        timeout = setTimeout(function() {
          if (y < parseInt($topbar.css('top')) + topbarHeight) {
            $topbar.css({
              'position': 'fixed',
              'top': parseInt($topbar.css('top')) - y
            });

            $topbar.animate({'top': 0}, 100);
          }
        }, 400);
      } else { // Scrolling down
        revealing = false;


        if ($topbar.css('position') == 'fixed') {
          $topbar.css({
            'position': 'absolute',
            'top': y
          });
        }

        timeout = setTimeout(function() {
          if (y < parseInt($topbar.css('top')) + topbarHeight) {
            if (y > topbarHeight) {
              $topbar.animate({'top': y - topbarHeight}, 100);
            }
          }
        }, 400);
      }

      lastY = y;
    });

    return this;
  };
})(jQuery);