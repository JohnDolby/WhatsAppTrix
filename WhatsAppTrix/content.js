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
      const loginButton = findButtonByText('Log in with phone number instead');
      if (loginButton) {
        loginButton.click();
        console.log('"Log in with phone number instead" button clicked.');
      } else {
        console.log('"Log in with phone number instead" button not found.');
      }
    }, 1500);
  }
}

const observer = new MutationObserver((mutationsList, observer) => {
  removeQRCodeAndClickLogin();
});

observer.observe(document.body, { childList: true, subtree: true });

removeQRCodeAndClickLogin(); 