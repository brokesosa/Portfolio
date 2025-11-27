function startAnimation() {
            const image = document.getElementById('animatedImage');
            
            
            image.style.animation = 'moveRightToLeft 6s forwards';
            
            
            setTimeout(() => {
                image.style.animation = 'none';
                
                void image.offsetWidth;
                
                
                setTimeout(startAnimation, 10000);
            }, 6000); 
        }


        window.addEventListener('load', () => {
            setTimeout(startAnimation, 2000);
        });