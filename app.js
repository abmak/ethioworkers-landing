document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = menuToggle.querySelector('i');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle icon
            if (navMenu.classList.contains('active')) {
                menuIcon.className = 'fa-solid fa-xmark';
            } else {
                menuIcon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu when clicking a nav link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuIcon.className = 'fa-solid fa-bars';
            });
        });
    }

    // 2. Statistics Counter Animation
    const statsSection = document.getElementById('stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const duration = 2000; // 2 seconds
            const stepTime = Math.abs(Math.floor(duration / target));
            let current = 0;

            const increment = target > 500 ? Math.ceil(target / 100) : 1;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target.toLocaleString() + (stat.textContent.includes('%') || stat.getAttribute('data-target') === '98' ? '%' : '');
                    clearInterval(timer);
                } else {
                    stat.textContent = current.toLocaleString();
                }
            }, Math.max(stepTime, 10));
        });
    };

    // Intersection Observer for stats
    if (statsSection && statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animateStats();
                    animated = true;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // 3. CTA Form Submission Handler
    const ctaForm = document.getElementById('cta-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('form-submit-btn');

    if (ctaForm) {
        ctaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // UI Feedback during submission
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

            const userType = document.getElementById('user-type').value;
            const email = document.getElementById('email').value;

            // Simulate API request
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Join the Waitlist';

                if (email) {
                    formMessage.className = 'form-message success';
                    formMessage.innerHTML = `<i class="fa-solid fa-circle-check"></i> Success! We've sent an invitation confirmation to <strong>${email}</strong>.`;
                    ctaForm.reset();
                } else {
                    formMessage.className = 'form-message error';
                    formMessage.textContent = 'Please enter a valid email address.';
                }
                formMessage.classList.remove('hidden');

                // Auto hide message after 6 seconds
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                }, 6000);

            }, 1500);
        });
    }

    // 4. Subtle Page Scroll Header Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.75rem 0';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = 'none';
        }
    });
});
