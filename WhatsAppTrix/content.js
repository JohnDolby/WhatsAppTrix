function removeQRCodeAndClickLogin() {
  const qrCodeCanvas = document.querySelector('canvas[aria-label="Scan this QR code to link a device!"]');

  if (qrCodeCanvas) {
    qrCodeCanvas.remove();
    console.log('QR code canvas removed.');

    setTimeout(() => {
      const loginButton = document.querySelector('div[role="button"][tabindex="0"]');
      if (loginButton) {
        loginButton.click();
        console.log('"Log in with phone number instead" button clicked.');
      } else {
        console.log('"Log in with phone number instead" button not found.');
      }
    }, 1500);
    return true;
  }
  return false;
}

const observer = new MutationObserver((mutationsList, observer) => {
  if (removeQRCodeAndClickLogin()) {
    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

removeQRCodeAndClickLogin(); 