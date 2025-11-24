
document.addEventListener('DOMContentLoaded', function() {
    const plume = document.getElementById('plume');
    const plume2 = document.getElementById('plume2');
    const creativite = document.getElementById('creativite'); 
    const inventaireSlot = document.querySelector('.inventaire-slot');
    const inventaireSlot2 = document.querySelector('.inventaire-slot2');
    
    if (plume && creativite) {
        plume.addEventListener('click', function(e) {
            e.preventDefault();
            

            creativite.style.display = 'none';
            inventaireSlot.style.display = 'flex';
            plume2.style.display = 'block';
        });
        
    }
     if (plume2) {
        plume2.addEventListener('click', function(e) {
            e.preventDefault();
            

            plume2.style.display = 'none';
            inventaireSlot.style.display = 'none';
            inventaireSlot2.style.display = 'block';
        });
     }
    
});


