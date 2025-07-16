// Site Configuration
const siteConfig = {
    // Personal Information
    name: "Your Name",
    title: "Creative Artist",
    tagline: "Bringing imagination to life through art",
    email: "your.email@example.com",
    
    // About Section
    about: {
        title: "About Me",
        paragraphs: [
            "I'm a passionate artist who believes in the power of visual storytelling. With over 5 years of experience in various mediums, I create art that speaks to the soul and challenges perspectives.",
            "My work spans across digital art, traditional painting, and mixed media. Each piece is carefully crafted to evoke emotion and spark conversation."
        ]
    },
    
    // Social Media Links
    socialLinks: {
        instagram: "https://instagram.com/yourusername",
        twitter: "https://twitter.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername",
        email: "mailto:your.email@example.com"
    },
    
    // Gallery Settings
    gallery: {
        itemsPerPage: 6,
        showYear: true,
        showMedium: true,
        defaultImage: "https://via.placeholder.com/300x250/667eea/ffffff?text=Artwork"
    },
    
    // Contact Form Settings
    contact: {
        title: "Get In Touch",
        subtitle: "Let's Create Something Amazing Together",
        description: "I'm always excited to work on new projects and collaborate with fellow creatives. Whether you're looking for custom artwork, commissions, or just want to say hello, I'd love to hear from you.",
        formAction: "", // Add your form handler URL here
        showSocialLinks: true
    },
    
    // Site Colors (CSS Custom Properties)
    colors: {
        primary: "#667eea",
        secondary: "#764ba2",
        accent: "#ff6b6b",
        text: "#333",
        background: "#f8f9fa"
    }
};

// Navigation Configuration
const navigationConfig = {
    items: [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Gallery", href: "#gallery" },
        { name: "Contact", href: "#contact" }
    ]
};

// Animation Settings
const animationConfig = {
    fadeInDuration: "0.8s",
    hoverTransition: "0.3s",
    scrollOffset: "-100px"
};

// Export configuration for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { siteConfig, navigationConfig, animationConfig };
}