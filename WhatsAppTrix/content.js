function findButtonByText(text) {
  const buttons = document.querySelectorAll('div[role="button"][tabindex="0"]');
  for (const button of buttons) {
    if (button.textContent.includes(text)) {
      return button;
    }
  }
  return null;
}

function removeQRCodeAndClickLogin() {
  const qrCodeCanvas = document.querySelector('canvas[aria-label="Scan this QR code to link a device!"]');

  if (qrCodeCanvas) {
    qrCodeCanvas.remove();
    console.log('QR code canvas removed.');

    setTimeout(() => {
      let loginButton = findButtonByText('Log in with phone number instead');
      if (loginButton) {
        loginButton.click();
        console.log('"Log in with phone number instead" button clicked.');
      } else {
        loginButton = findButtonByText('Log in with phone number');
        if (loginButton) {
          loginButton.click();
          console.log('"Log in with phone number" button clicked.');
        }
        else {
          console.log('"Log in with phone number" button not found.');
        }
      }
    }, 170); // 170 ms to wait for the country to be detected by whatsapp
  }
}

function avoidInvalidKeyStorkes(evtArg) {
    var evt = (document.all ? window.event : evtArg);
    var isIE = (document.all ? true : false);
    var KEYCODE = (document.all ? window.event.keyCode : evtArg.which);

    var element = (document.all ? window.event.srcElement : evtArg.target);
    var msg = "We have disabled this key: " + KEYCODE;

    if (KEYCODE == "112") {
        if (isIE) {
            document.onhelp = function() {
                return (false);
            };
            window.onhelp = function() {
                return (false);
            };
        }
        evt.returnValue = false;
        evt.keyCode = 0;
        window.status = msg;
        evt.preventDefault();
        evt.stopPropagation();
    }

    window.status = "Done";    
}    

const observer = new MutationObserver((mutationsList, observer) => {
  removeQRCodeAndClickLogin();
});

observer.observe(document.body, { childList: true, subtree: true });

if (window.document.addEventListener) {
    window.document.addEventListener("keydown", avoidInvalidKeyStorkes, false);
} else {
    window.document.attachEvent("onkeydown", avoidInvalidKeyStorkes);
    document.captureEvents(Event.KEYDOWN);
}

removeQRCodeAndClickLogin(); 
