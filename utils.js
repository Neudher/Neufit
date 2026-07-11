class Utils {
    static formatDate(date) {
        return new Date(date).toLocaleDateString('pt-BR');
    }
    static calculateIMC(weight, height) {
        return (weight / (height * height)).toFixed(2);
    }
    static getIMCCategory(imc) {
        imc = parseFloat(imc);
        if (imc < 18.5) return 'Abaixo do peso';
        if (imc < 25) return 'Peso normal';
        if (imc < 30) return 'Sobrepeso';
        return 'Obesidade';
    }
    static showAlert(message, type = 'success') {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `<span>${message}</span>`;
        document.body.appendChild(alert);
        setTimeout(() => alert.remove(), 3000);
    }
}

class NotificationManager {
    static requestPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }
    static sendNotification(title, options) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, { icon: 'icon-192.png', ...options });
        }
    }
}