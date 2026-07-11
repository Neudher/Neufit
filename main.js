document.addEventListener('DOMContentLoaded', () => {
    app = new NeuFitApp();
    console.log('✅ Neufit carregado!');
});
window.addEventListener('focus', () => { if (app) app.loadPage(app.currentPage); });