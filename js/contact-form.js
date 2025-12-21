// contact-form.js
import { db, collection, addDoc, serverTimestamp } from './firebase-config.js';

export function initContactForm() {
    const contactForm = document.querySelector('.contact-form');

    if (!contactForm) return; // Si le formulaire n'existe pas sur la page

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        // Récupération des valeurs
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        try {
            // Check if Firebase is properly configured
            if (!db) {
                throw new Error('Firebase is not configured. Please set up the required environment variables.');
            }

            // Animation de chargement
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            // Sauvegarde dans Firestore
            await addDoc(collection(db, "contacts"), {
                name: name,
                email: email,
                subject: subject,
                message: message,
                timestamp: serverTimestamp(),
                read: false,
                ip: await getClientIP()
            });

            // Succès
            showNotification('Message envoyé avec succès ! Je vous répondrai rapidement.', 'success');
            this.reset();

        } catch (error) {
            console.error("Erreur d'envoi:", error);
            showNotification('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Fonction pour obtenir l'IP du client
async function getClientIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        return 'unknown';
    }
}

// Fonction de notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    notification.querySelector('button').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove après 5 secondes
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Ajouter le CSS pour l'animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);