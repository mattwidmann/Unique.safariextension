safari.application.addEventListener('command', function (event) {
  if (event.command !== 'unique') return;

  closeDuplicateTabs();
}, false);

var closeDuplicateTabs = function() {
  // hash table of URLs
  var urls = {};
  var windowIndex = 0;
  var tabsClosed = 0;
  safari.application.browserWindows.forEach(function(window) {
    var tabIndex = 0;
    window.tabs.forEach(function(tab) {
      if (urls[tab.url]) {
        console.log('closing tab for "' + tab.url + '" in window ' + windowIndex + ' at original position ' + tabIndex);
        tabsClosed++;
        tab.close();
      } else urls[tab.url] = true;
      tabIndex++;
    });
    windowIndex++;
  });

  console.log('closed ' + tabsClosed + ' tabs');
};

