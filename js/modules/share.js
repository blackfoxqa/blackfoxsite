
import { generateQR } from './qr.js';
import { showToast } from './utils.js';
import { initializeClipboard } from './clipboard.js';

const overlay = document.getElementById("shareOverlay");
const popup = document.getElementById("sharePopup");
const qrContainer = document.getElementById("qrContainer");
const closeBtn = document.getElementById("closeSharePopup");
const copyBtn = document.getElementById("copyBtn");
const shareBtn = document.getElementById("shareBtn");
const downloadBtn = document.getElementById("downloadBtn");

let currentLink = "";

function handleShareClick(e) {
    e.preventDefault();
    currentLink = this.getAttribute("data-link");
    copyBtn.setAttribute("data-clipboard-text", currentLink);
    overlay.classList.remove("hidden");
    setTimeout(() => overlay.classList.add("active"), 10);
    generateQR(qrContainer, currentLink);
}

function closePopup() {
    overlay.classList.remove("active");
    setTimeout(() => {
        overlay.classList.add("hidden");
        qrContainer.classList.add("loading");
    }, 300);
}

const initializeShare = () => {
    document.querySelectorAll(".share-trigger").forEach((btn) => {
        btn.addEventListener("click", handleShareClick);
    });

    closeBtn.onclick = closePopup;

    overlay.onclick = (e) => {
        if (e.target === overlay) closePopup();
    };

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.classList.contains("active")) {
            closePopup();
        }
    });

    initializeClipboard(copyBtn);

    shareBtn.onclick = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Check this out!",
                    text: "I wanted to share this link with you",
                    url: currentLink,
                });
            } catch (err) {
                if (err.name !== "AbortError") {
                    showToast("Share failed", true);
                }
            }
        } else {
            showToast("Sharing not supported on this device", true);
        }
    };

    downloadBtn.onclick = () => {
        const canvas = qrContainer.querySelector("canvas");
        const img = qrContainer.querySelector("img");

        if (canvas) {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = `qr-code-${Date.now()}.png`;
            link.click();
            showToast("QR code downloaded!");
        } else if (img) {
            const link = document.createElement("a");
            link.href = img.src;
            link.download = `qr-code-${Date.now()}.png`;
            link.click();
            showToast("QR code downloaded!");
        } else {
            showToast("QR code not ready", true);
        }
    };
};

export { initializeShare };
