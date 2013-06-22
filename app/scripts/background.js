'use strict';
var fields;

var API = {
  LIST: 'https://www.googleapis.com/mirror/v1/timeline',
  INSERT: 'https://www.googleapis.com/mirror/v1/timeline'
};


var googleAuth = new OAuth2('google', {
  client_id: CONFIG.CLIENT_ID,
  client_secret: CONFIG.CLIENT_SECRET,
  api_scope: 'https://www.googleapis.com/auth/glass.timeline'
});

function sendCard(content, type, cb) {
  var card = {
    menuItems: [
      {
        action: "READ_ALOUD"
      }
    ],
    notification: {
      level: "DEFAULT"
    }
  };

  if (type === 'image' && content.length > 0) {
    card.html = '<article class="photo"><img src="' + content + '" width="100%" height="100%"><div class="photo-overlay"/></article>';
  } else if (type === 'text' && content.length > 0) {
    card.text = content;
  } else {
    card.text = 'Hello from Google Chrome!';
  }


  // Make an XHR that creates the task
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function (event) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        // good
      } else {
        // bad
      }

      if (cb) cb(event);
      //fields.className = 'animated bounceIn';
    }
  };

  xhr.open('POST', API.INSERT, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', 'OAuth ' + googleAuth.getAccessToken());

  xhr.send(JSON.stringify(card));
}


// A generic onclick callback function.
function genericOnClick(info, tab) {
  googleAuth.authorize(function () {
    if (info) {
      console.log(info);
      if (info.selectionText) {
        sendCard(info.selectionText, 'text');
      }
      else if (info.mediaType === 'image') {
        sendCard(info.srcUrl, 'image');
      }
    }
  });
}

// Create one test item for each context type.
var contexts = ["selection", "image"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "Send " + context + " to Google Glass";
  var id = chrome.contextMenus.create({"title": title, "contexts": [context], "onclick": genericOnClick});
}
