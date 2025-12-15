document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const navLinks = document.querySelector('.nav-links');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const allNavLinks = document.querySelectorAll('.nav-links a');
    const projectDetailButtons = document.querySelectorAll('.project-detail-btn');
    const backToProjectsButtons = document.querySelectorAll('.back-to-projects-btn');
    const projectDetailSections = document.querySelectorAll('.project-detail-section');
    const projectsSection = document.getElementById('projects');

    // Sticky header and scroll spy for active nav link
    window.addEventListener('scroll', () => {
        // Sticky header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll spy
        let current = '';
        const sections = document.querySelectorAll('main section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight; // Adjust for fixed header
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // Mobile navigation toggle
    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburgerMenu.classList.toggle('open');
    });

    // Close mobile nav when a link is clicked
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburgerMenu.classList.remove('open');
        });
    });

    // Project Detail handling
    projectDetailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.project;
            const targetSection = document.getElementById(`${projectId}-details`);

            // Hide all detail sections first
            projectDetailSections.forEach(section => {
                section.classList.remove('active');
            });

            // Show the clicked project's detail section
            if (targetSection) {
                targetSection.classList.add('active');
                // Scroll smoothly to the project details section
                setTimeout(() => { // Small delay to allow display:block to apply
                    window.scrollTo({
                        top: targetSection.offsetTop - header.offsetHeight - 20, // Adjust for header and some padding
                        behavior: 'smooth'
                    });
                }, 100);
            }
        });
    });

    // Back to Projects button
    backToProjectsButtons.forEach(button => {
        button.addEventListener('click', () => {
            projectDetailSections.forEach(section => {
                section.classList.remove('active');
            });
            // Scroll smoothly back to the projects section
            window.scrollTo({
                top: projectsSection.offsetTop - header.offsetHeight - 20, // Adjust for header and some padding
                behavior: 'smooth'
            });
        });
    });

    // Smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - header.offsetHeight; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});