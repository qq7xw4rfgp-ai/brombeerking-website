document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menü Toggle
    const mobileBtn = document.getElementById('mobile-btn');
    const navLinks = document.getElementById('nav-links');
    const navItems = navLinks.querySelectorAll('.nav-item');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileBtn.textContent = '☰';
        });
    });

    // 2. Sticky Header Effekt
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animationen
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        root: null, threshold: 0.1, rootMargin: "0px 0px -50px 0px"
    });
    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Scroll Spy: Navigation Links aktiv schalten
    const sections = document.querySelectorAll("section[id]");
    
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 250)) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(a => {
            if (a.getAttribute("href").startsWith("#")) {
                a.classList.remove("active");
                if (a.getAttribute("href") === `#${current}`) {
                    a.classList.add("active");
                }
            }
        });
    });

    // 5. Kontakt Modal Pop-Up
    const contactModal = document.getElementById('contact-modal');
    const modalClose = document.getElementById('modal-close');
    const contactTriggers = document.querySelectorAll('a[href$="#kontakt"]');

    if (contactModal) {
        contactTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault(); // Verhindert das Scrollen
                contactModal.classList.add('active');
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', () => { contactModal.classList.remove('active'); });
        }
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) { contactModal.classList.remove('active'); }
        });
    }
});