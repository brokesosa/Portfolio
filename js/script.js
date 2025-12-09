
const slots = [
    document.getElementById('code'),
    document.getElementById('code2'),
    document.getElementById('code3'),
    document.getElementById('code4')
];

const icons = [
    document.getElementById('a'),
    document.getElementById('b'),
    document.getElementById('c'),
    document.getElementById('d')
];

icons.forEach((icon, i) => {
    icon.addEventListener('click', function(event) {
        event.stopPropagation();
        slots.forEach((slot, j) => {
            slot.style.display = (i === j)
                ? (slot.style.display === 'block' ? 'none' : 'block')
                : 'none';
        });
    });
});


const mobileBtn = document.getElementById('mobileDropdownBtn');
const mobileList = document.getElementById('mobileDropdownList');
if (mobileBtn && mobileList) {
    mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
        mobileBtn.setAttribute('aria-expanded', String(!expanded));
        mobileList.hidden = expanded; 
    });

    mobileList.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', (e) => {
            const idx = Number(li.dataset.index);
            slots.forEach((slot, j) => {
                slot.style.display = (j === idx) ? 'block' : 'none';
            });
            
            mobileList.hidden = true;
            mobileBtn.setAttribute('aria-expanded', 'false');
        });
    });

   
    document.addEventListener('click', (e) => {
        const drop = document.getElementById('mobileDropdown');
        if (drop && !drop.contains(e.target)) {
            mobileList.hidden = true;
            mobileBtn.setAttribute('aria-expanded', 'false');
        }
    });
}


