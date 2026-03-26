
import { showToast, fallbackCopyTextToClipboard } from './utils.js';

const initializeClipboard = (copyBtn) => {
    copyBtn.addEventListener('click', () => {
        const textToCopy = copyBtn.getAttribute('data-clipboard-text');
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast("Link copied to clipboard!");
                copyBtn.style.transform = "scale(0.95)";
                setTimeout(() => {
                    copyBtn.style.transform = "";
                }, 150);
            }).catch(err => {
                fallbackCopyTextToClipboard(textToCopy);
            });
        } else {
            fallbackCopyTextToClipboard(textToCopy);
        }
    });
};

export { initializeClipboard };