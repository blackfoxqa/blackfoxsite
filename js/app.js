
import { initializeTheme } from './modules/theme.js';
import { initializeShare } from './modules/share.js';
import { initializeNavigation } from './modules/navigation.js';
import { initializeServices } from './modules/pages.js';
import { initializeProjects } from './modules/pages.js';
import { initializeQuoteForm } from './modules/pages.js';

document.addEventListener("DOMContentLoaded", () => {
    initializeTheme();
    initializeShare();
    initializeNavigation();
    initializeServices();
    initializeProjects();
    initializeQuoteForm();
});
