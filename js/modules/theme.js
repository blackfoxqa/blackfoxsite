
const toggleButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

const applyTheme = (isLightMode) => {
    document.body.classList.toggle("light-mode", isLightMode);
    themeIcon.src = isLightMode
        ? "assets/images/icon/sun.svg"
        : "assets/images/icon/moon.svg";
    themeIcon.alt = isLightMode ? "Sun icon" : "Moon icon";
};

const toggleTheme = () => {
    const isLightMode = document.body.classList.toggle("light-mode");
    localStorage.setItem("theme", isLightMode ? "light" : "dark");
    applyTheme(isLightMode);
};

const initializeTheme = () => {
    const isLightMode = localStorage.getItem("theme") === "light";
    applyTheme(isLightMode);
    toggleButton.addEventListener("click", toggleTheme);
};

export { initializeTheme };
