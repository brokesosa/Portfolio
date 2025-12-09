/**
 * Onglet animé en bas de page
 * Gère l'expansion et la rétraction avec des animations fluides
 */

document.addEventListener('DOMContentLoaded', function() {
    const slidingTab = document.getElementById('slidingTab');
    const tabHeader = document.querySelector('.tab-header');
    
    let isExpanded = false;
    let expandTimeout;
    let collapseTimeout;
    
    // Délais pour les animations
    const HOVER_DELAY = 150;      // Délai avant expansion au survol
    const COLLAPSE_DELAY = 300;   // Délai avant rétraction quand on quitte
    
    /**
     * Gère l'entrée de la souris sur l'onglet
     */
    function handleMouseEnter() {
        // Annuler tout timeout de rétraction
        clearTimeout(collapseTimeout);
        
        if (!isExpanded) {
            // Attendre un peu avant d'étendre (pour éviter les expansions accidentelles)
            expandTimeout = setTimeout(() => {
                expandTab();
            }, HOVER_DELAY);
        }
    }
    
    /**
     * Gère la sortie de la souris de l'onglet
     */
    function handleMouseLeave() {
        // Annuler tout timeout d'expansion
        clearTimeout(expandTimeout);
        
        if (isExpanded) {
            // Attendre un peu avant de rétracter
            collapseTimeout = setTimeout(() => {
                collapseTab();
            }, COLLAPSE_DELAY);
        }
    }
    
    /**
     * Étend l'onglet
     */
    function expandTab() {
        slidingTab.classList.add('expanded');
        isExpanded = true;
        
        // Empêcher le scroll du body quand l'onglet est ouvert
        document.body.style.overflow = 'hidden';
        
        console.log('✨ Onglet ouvert');
    }
    
    /**
     * Rétracte l'onglet
     */
    function collapseTab() {
        slidingTab.classList.remove('expanded');
        isExpanded = false;
        
        // Restaurer le scroll du body
        document.body.style.overflow = 'hidden'; // Reste hidden selon le style original
        
        console.log('✨ Onglet fermé');
    }
    
    /**
     * Bascule l'état de l'onglet (utile pour les clics)
     */
    function toggleTab() {
        if (isExpanded) {
            collapseTab();
        } else {
            expandTab();
        }
    }
    
    // Ajouter les écouteurs d'événements
    slidingTab.addEventListener('mouseenter', handleMouseEnter);
    slidingTab.addEventListener('mouseleave', handleMouseLeave);
    
    // Permettre de fermer en cliquant sur l'en-tête quand c'est ouvert
    tabHeader.addEventListener('click', () => {
        if (isExpanded) {
            clearTimeout(collapseTimeout);
            collapseTab();
        }
    });
    
    // ========================================
    // SUPPORT TACTILE (pour mobiles/tablettes)
    // ========================================
    
    let touchStartY = 0;
    let touchStartTime = 0;
    
    slidingTab.addEventListener('touchstart', function(event) {
        touchStartY = event.touches[0].clientY;
        touchStartTime = Date.now();
    }, false);
    
    slidingTab.addEventListener('touchmove', function(event) {
        // Laisser le scroll se faire normalement
    }, false);
    
    slidingTab.addEventListener('touchend', function(event) {
        const touchEndY = event.changedTouches[0].clientY;
        const touchDuration = Date.now() - touchStartTime;
        const touchDistance = touchStartY - touchEndY;
        
        // Si le swipe est assez rapide et vers le haut, ouvrir
        if (touchDistance > 50 && touchDuration < 500) {
            expandTab();
        }
        // Si le swipe est vers le bas et qu'on est ouvert, fermer
        else if (touchDistance < -50 && touchDuration < 500 && isExpanded) {
            collapseTab();
        }
    }, false);
    
    // ========================================
    // GESTION DE LA POSITION LORS DU REDIMENSIONNEMENT
    // ========================================
    
    window.addEventListener('resize', function() {
        // S'assurer que l'onglet reste au bon endroit
        if (isExpanded) {
            slidingTab.style.height = '100vh';
        }
    });
    
    // ========================================
    // API PUBLIQUE (pour contrôler l'onglet de l'extérieur)
    // ========================================
    
    window.slidingTabAPI = {
        open: expandTab,
        close: collapseTab,
        toggle: toggleTab,
        isOpen: () => isExpanded,
        setBackgroundImage: function(imageUrl) {
            const bgElement = document.querySelector('.tab-background');
            if (bgElement) {
                bgElement.style.backgroundImage = `url('${imageUrl}')`;
                console.log('📷 Image de fond mise à jour');
            }
        },
        setTitle: function(title) {
            const titleElement = document.querySelector('.tab-inner-content h2');
            if (titleElement) {
                titleElement.textContent = title;
            }
        },
        setDescription: function(description) {
            const descElement = document.querySelector('.tab-inner-content p');
            if (descElement) {
                descElement.textContent = description;
            }
        }
    };
    
});
