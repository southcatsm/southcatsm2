
function Color(){
	const hexChars = '0123456789ABCDEF';
	let color = '';
	for (let i = 0; i < 6; i++) {
		color += hexChars[Math.floor(Math.random() * 16)];
	}
	return `#${color}`;
}
class StarEffect {
    constructor(x, y) {
        this.stars = [];
        for(let i=0; i<6; i++) {
            const star = document.createElement('div');
            star.innerHTML = '✦';
            Object.assign(star.style, {
                left: x + 'px',
                top: y + 'px',
                position: 'fixed',
                color: Color(),
                pointerEvents: 'none',
                fontSize: '18px',
                opacity: 1
            });
            document.body.appendChild(star);
            
            const angle = (i * 60) + Math.random()*30;
            this.stars.push({
                element: star,
                angle: angle * Math.PI/180
            });
        }
        this.animate();
    }

    animate() {
        const start = Date.now();
        const animateFrame = () => {
            const timePassed = Date.now() - start;
            this.stars.forEach((s, i) => {
                const progress = timePassed / 800;
                const distance = progress * 80;
                s.element.style.transform = 
                    `translate(
                        ${Math.cos(s.angle)*distance}px,
                        ${Math.sin(s.angle)*distance}px
                    ) rotate(${progress*360}deg)`;
                s.element.style.opacity = 1 - progress;
            });
            
            if(timePassed < 800) {
                requestAnimationFrame(animateFrame);
            } else {
                this.stars.forEach(s => s.element.remove());
            }
        };
        requestAnimationFrame(animateFrame);
    }
}

document.addEventListener('click', (e) => {
    new StarEffect(e.clientX, e.clientY);
});