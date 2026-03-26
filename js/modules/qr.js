
let qrCode = null;

function generateQR(qrContainer, link) {
  if (qrCode) {
    qrCode.clear();
    qrCode = null;
  }

  qrContainer.innerHTML =
    '<div style="color: rgba(0, 0, 0, 0.4);" class="loading">Generating QR Code...</div>';

  setTimeout(() => {
    qrContainer.innerHTML = "";
    qrContainer.classList.remove("loading");

    qrCode = new QRCode(qrContainer, {
      text: link,
      width: 180,
      height: 180,
      colorDark: "rgba(0, 0, 0, 0.9)",
      colorLight: "rgba(255, 255, 255, 0.9)",
      correctLevel: QRCode.CorrectLevel.H,
    });
  }, 500);
}

export { generateQR };
