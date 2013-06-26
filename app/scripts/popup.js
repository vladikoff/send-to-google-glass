'use strict';

function startsWithHttp(s) {
  return s.indexOf('http') == 0;
}

function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0;
}

function endsWith(s, suffix) {
  return s.indexOf(suffix, s.length - suffix.length) !== -1;
}

function submitCard() {
  var fields = document.getElementById("fields");
  var msg = document.getElementById('cardMsg').value;
  var bg = chrome.extension.getBackgroundPage();

  var msgType = 'text';
  if (startsWithHttp(msg) && !hasWhiteSpace(msg) && ( endsWith(msg,'.jpg') || endsWith(msg,'.gif') || endsWith(msg,'.png') ) ) {
    msgType = 'image';
  }

  bg.googleAuth.authorize(function() {

    fields.className = 'animated bounceOut';
    document.getElementById('cardMsg').value = '';

    bg.sendCard(msg, msgType, function () {
      fields.className = 'animated bounceIn';
    });
  });
}

/**
 * Event listener, content is loaded
 */
document.addEventListener('DOMContentLoaded', function () {
  /**
   * Pressing send, communicate with the background page.
   */

  window.addEventListener("keydown", function(event) {
    if (event.keyCode == 13) {
      submitCard();
    }
  }, false);

  document.getElementById("send").addEventListener('click', submitCard);

  /**
   * Get help, opens github
   */
  document.getElementById("help").addEventListener('click', function () {
    window.open('https://github.com/vladikoff/send-to-google-glass');
  });
});
