'use strict';

function submitCard() {
  var fields = document.getElementById("fields");
  var msg = document.getElementById('cardMsg').value;
  var bg = chrome.extension.getBackgroundPage();

  bg.googleAuth.authorize(function() {

    fields.className = 'animated bounceOut';
    document.getElementById('cardMsg').value = '';
    bg.sendCard(msg, 'text', function () {
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
