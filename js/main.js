document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '5px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)';
        }
    });

    // 汉堡菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // 点击导航链接关闭菜单
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 动画效果 - 元素进入视口时添加动画
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.timeline-item, .achievement-card, .philosophy-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // 初始化动画元素样式
    document.querySelectorAll('.timeline-item, .achievement-card, .philosophy-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // 监听滚动事件以触发动画
    window.addEventListener('scroll', animateOnScroll);
    // 初始加载时也检查一次
    animateOnScroll();

    // 处理雷军图片加载失败的情况
    const leiJunImage = document.getElementById('lei-jun-image');
    if (leiJunImage) {
        leiJunImage.onerror = function() {
            // 如果图片加载失败，设置一个备用图片或显示一个占位符
            this.src = 'https://via.placeholder.com/400x500?text=雷军照片';
            // 也可以添加一个提示
            const aboutSection = document.querySelector('.about-image');
            if (aboutSection) {
                const notice = document.createElement('p');
                notice.textContent = '图片暂未加载，请稍后再试';
                notice.style.textAlign = 'center';
                notice.style.marginTop = '10px';
                notice.style.fontSize = '0.9rem';
                notice.style.color = '#999';
                aboutSection.appendChild(notice);
            }
        };
    }
});
