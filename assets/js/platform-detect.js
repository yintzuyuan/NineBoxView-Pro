/**
 * Platform Detection for NineBoxView Pro
 * Detects macOS and adds appropriate class to enable CSS-based show/hide
 */
(function() {
  'use strict';

  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
                navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;

  if (!isMac) {
    document.documentElement.classList.add('platform-non-mac');
  }
})();
