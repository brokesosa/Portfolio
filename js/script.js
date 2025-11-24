
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


