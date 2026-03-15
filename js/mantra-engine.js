/**
 * Mantra Engine - Hiệu ứng tâm linh cho Narthang Heritage
 * Xử lý: Mani Pillar (Trụ kinh luân) và Lotus Click (Hoa sen khai nở)
 * Tối ưu: Tránh tạo trùng lặp với HTML đã có sẵn
 */

class MantraEngine {
    constructor() {
        this.initLotusEffect();
        this.initManiPillars();
    }

    // 1. Hiệu ứng Hoa Sen khi chạm (Lotus Touch) - Hiệu ứng Glow mờ ảo
    initLotusEffect() {
        const createLotus = (e) => {
            const x = e.clientX || (e.touches ? e.touches[0].clientX : 0);
            const y = e.clientY || (e.touches ? e.touches[0].clientY : 0);

            if (!x || !y) return;

            const lotus = document.createElement('div');
            lotus.className = 'lotus-touch-effect';
            
            Object.assign(lotus.style, {
                position: 'fixed',
                pointerEvents: 'none',
                zIndex: '10001',
                width: '60px',
                height: '60px',
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
                backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Lotus_flower_icon.svg/1200px-Lotus_flower_icon.svg.png')",
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                filter: 'sepia(1) saturate(5) hue-rotate(-50deg) drop-shadow(0 0 10px rgba(197, 160, 89, 0.5))',
                opacity: '0.8',
                animation: 'lotusFade 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
            });

            document.body.appendChild(lotus);
            setTimeout(() => lotus.remove(), 1800);
        };

        if (!document.getElementById('mantra-styles')) {
            const style = document.createElement('style');
            style.id = 'mantra-styles';
            style.innerHTML = `
                @keyframes lotusFade {
                    0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 0; }
                    20% { opacity: 0.8; }
                    100% { transform: translate(-50%, -50%) scale(2.5) rotate(90deg); opacity: 0; filter: sepia(1) saturate(2) hue-rotate(-50deg) blur(5px); }
                }
            `;
            document.head.appendChild(style);
        }

        window.addEventListener('mousedown', createLotus);
    }

    // 2. Xử lý trụ Kinh luân (Mani Pillars) - Chỉ tạo nếu HTML chưa có
    initManiPillars() {
        // Kiểm tra xem trang web đã có sẵn Pillar trong HTML chưa (dựa vào class .mantra-pillar)
        if (document.querySelector('.mantra-pillar')) {
            console.log('Mantra Engine: Pillars already present in HTML. Skipping auto-generation.');
            return; 
        }

        const leftPillar = document.createElement('div');
        const rightPillar = document.createElement('div');
        leftPillar.className = 'mantra-pillar pillar-left-auto';
        rightPillar.className = 'mantra-pillar pillar-right-auto';
        
        const pillarCSS = {
            position: 'fixed',
            top: '0',
            width: '40px',
            height: '100vh',
            zIndex: '100',
            background: 'linear-gradient(to right, transparent, rgba(197, 160, 89, 0.03), transparent)',
            pointerEvents: 'none',
            overflow: 'hidden',
        };

        Object.assign(leftPillar.style, pillarCSS, { left: '0', borderRight: '1px solid rgba(197, 160, 89, 0.1)' });
        Object.assign(rightPillar.style, pillarCSS, { right: '0', borderLeft: '1px solid rgba(197, 160, 89, 0.1)' });

        const content = document.createElement('div');
        content.className = 'pillar-content-auto';
        const maniText = "OM MANI PADME HUM • ཨོཾ་མ་ཎི་པདྨེ་ཧཱུྃ། • ";
        content.textContent = maniText.repeat(40);

        Object.assign(content.style, {
            writingMode: 'vertical-rl',
            whiteSpace: 'nowrap',
            fontFamily: "'Playfair Display', serif",
            fontSize: '14px',
            fontWeight: '900',
            color: '#c5a059',
            letterSpacing: '8px',
            textShadow: '0 0 10px rgba(197, 160, 89, 0.4)',
            position: 'absolute',
            top: '0',
            animation: 'maniScrollAuto 60s linear infinite'
        });

        // Thêm keyframe animation nếu chưa có
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes maniScrollAuto {
                0% { transform: translateY(0); }
                100% { transform: translateY(-50%); }
            }
        `;
        document.head.appendChild(style);

        leftPillar.appendChild(content.cloneNode(true));
        rightPillar.appendChild(content.cloneNode(true));

        document.body.appendChild(leftPillar);
        document.body.appendChild(rightPillar);
    }
}

// Khởi tạo Mantra Engine
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new MantraEngine());
} else {
    new MantraEngine();
}
