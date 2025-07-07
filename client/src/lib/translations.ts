// Language translations for Arc Labs website
export type Language = 'en' | 'fr' | 'rw';

export interface Translation {
  // Navigation
  nav: {
    home: string;
    about: string;
    services: string;
    packages: string;
    portfolio: string;
    contact: string;
    search: string;
    newsletter: string;
  };
  
  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    scrollDown: string;
  };
  
  // Services Section
  services: {
    title: string;
    subtitle: string;
    items: {
      webDev: {
        title: string;
        description: string;
      };
      mobileApp: {
        title: string;
        description: string;
      };
      ecommerce: {
        title: string;
        description: string;
      };
      consulting: {
        title: string;
        description: string;
      };
      maintenance: {
        title: string;
        description: string;
      };
      analytics: {
        title: string;
        description: string;
      };
    };
  };
  
  // Packages Section
  packages: {
    title: string;
    subtitle: string;
    items: {
      starter: {
        title: string;
        description: string;
        price: string;
        features: string[];
      };
      professional: {
        title: string;
        description: string;
        price: string;
        features: string[];
      };
      enterprise: {
        title: string;
        description: string;
        price: string;
        features: string[];
      };
    };
    popular: string;
    getStarted: string;
  };
  
  // Portfolio Section
  portfolio: {
    title: string;
    subtitle: string;
    viewAll: string;
    categories: {
      all: string;
      ecommerce: string;
      analytics: string;
      healthcare: string;
      fintech: string;
      education: string;
      realEstate: string;
      foodBeverage: string;
      travel: string;
      gaming: string;
    };
  };
  
  // Why Us Section
  whyUs: {
    title: string;
    subtitle: string;
    items: {
      experience: {
        title: string;
        description: string;
      };
      quality: {
        title: string;
        description: string;
      };
      support: {
        title: string;
        description: string;
      };
      innovation: {
        title: string;
        description: string;
      };
    };
  };
  
  // Contact Section
  contact: {
    title: string;
    subtitle: string;
    form: {
      firstName: string;
      lastName: string;
      email: string;
      company: string;
      projectType: string;
      projectDetails: string;
      submit: string;
      submitting: string;
    };
    info: {
      address: string;
      phone: string;
      email: string;
      hours: string;
    };
  };
  
  // Footer
  footer: {
    company: string;
    quickLinks: string;
    services: string;
    newsletter: string;
    rights: string;
    newsletterPlaceholder: string;
    subscribe: string;
  };
  
  // Common
  common: {
    loading: string;
    error: string;
    tryAgain: string;
    close: string;
    viewDetails: string;
    learnMore: string;
    readMore: string;
    getQuote: string;
  };
}

export const translations: Record<Language, Translation> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      packages: "Packages", 
      portfolio: "Portfolio",
      contact: "Contact",
      search: "Search",
      newsletter: "Newsletter"
    },
    hero: {
      title: "Crafting Digital Experiences That Transcend Ordinary",
      subtitle: "We transform your boldest visions into extraordinary digital realities through cutting-edge technology and unparalleled creativity.",
      cta: "Begin Your Journey",
      scrollDown: "Scroll to discover"
    },
    services: {
      title: "Our Services",
      subtitle: "Comprehensive digital solutions tailored to your unique needs",
      items: {
        webDev: {
          title: "Web Development",
          description: "Custom websites and web applications built with cutting-edge technologies"
        },
        mobileApp: {
          title: "Mobile Apps",
          description: "Native and cross-platform mobile applications for iOS and Android"
        },
        ecommerce: {
          title: "E-commerce Solutions",
          description: "Complete online stores with payment processing and inventory management"
        },
        consulting: {
          title: "Digital Consulting",
          description: "Strategic guidance to optimize your digital presence and operations"
        },
        maintenance: {
          title: "Support & Maintenance",
          description: "Ongoing technical support and regular updates for your digital assets"
        },
        analytics: {
          title: "Analytics & Insights",
          description: "Data-driven insights to improve performance and user experience"
        }
      }
    },
    packages: {
      title: "Our Packages",
      subtitle: "Choose the perfect solution for your business needs",
      items: {
        starter: {
          title: "Starter Package",
          description: "Perfect for small businesses and startups looking to establish their digital presence",
          price: "$1,200 - $2,500",
          features: [
            "Professional Website Design",
            "Mobile Responsive Layout",
            "Basic SEO Optimization",
            "Contact Form Integration",
            "3 Months Support"
          ]
        },
        professional: {
          title: "Professional Package",
          description: "Comprehensive solution for growing businesses that need advanced features",
          price: "$3,000 - $6,000",
          features: [
            "Advanced Web Application",
            "Custom Admin Dashboard",
            "Payment Gateway Integration",
            "Advanced SEO & Analytics",
            "6 Months Support & Updates"
          ]
        },
        enterprise: {
          title: "Enterprise Package",
          description: "Full-scale digital transformation for large organizations",
          price: "$7,000 - $12,000",
          features: [
            "Enterprise-Level Architecture",
            "Multi-Platform Development",
            "Advanced Security Features",
            "Custom Integrations",
            "12 Months Premium Support"
          ]
        }
      },
      popular: "Most Popular",
      getStarted: "Get Started"
    },
    portfolio: {
      title: "Portfolio Showcase",
      subtitle: "Discover our latest digital masterpieces",
      viewAll: "Explore All Impossibilities",
      categories: {
        all: "All Projects",
        ecommerce: "E-commerce",
        analytics: "Analytics",
        healthcare: "Healthcare", 
        fintech: "Fintech",
        education: "Education",
        realEstate: "Real Estate",
        foodBeverage: "Food & Beverage",
        travel: "Travel & Tourism",
        gaming: "Gaming & Entertainment"
      }
    },
    whyUs: {
      title: "Why Choose Arc Labs",
      subtitle: "Discover what sets us apart in the digital landscape",
      items: {
        experience: {
          title: "Proven Expertise",
          description: "Years of experience delivering exceptional digital solutions"
        },
        quality: {
          title: "Premium Quality",
          description: "Uncompromising standards ensuring excellence in every project"
        },
        support: {
          title: "24/7 Support", 
          description: "Round-the-clock assistance to keep your business running smoothly"
        },
        innovation: {
          title: "Cutting-Edge Innovation",
          description: "Latest technologies and methodologies for competitive advantage"
        }
      }
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Ready to transform your digital presence? Let's discuss your project.",
      form: {
        firstName: "First Name",
        lastName: "Last Name", 
        email: "Email Address",
        company: "Company (Optional)",
        projectType: "Project Type",
        projectDetails: "Tell us about your project",
        submit: "Send Message",
        submitting: "Sending..."
      },
      info: {
        address: "Kigali, Rwanda",
        phone: "+250 798 516 334",
        email: "lucienshungofficial@gmail.com",
        hours: "Mon - Fri: 9:00 AM - 6:00 PM"
      }
    },
    footer: {
      company: "Arc Labs",
      quickLinks: "Quick Links",
      services: "Services", 
      newsletter: "Newsletter",
      rights: "All rights reserved.",
      newsletterPlaceholder: "Enter your email",
      subscribe: "Subscribe"
    },
    common: {
      loading: "Loading...",
      error: "Something went wrong",
      tryAgain: "Try Again",
      close: "Close",
      viewDetails: "View Details",
      learnMore: "Learn More",
      readMore: "Read More",
      getQuote: "Get Quote"
    }
  },
  
  fr: {
    nav: {
      home: "Accueil",
      about: "À Propos",
      services: "Services",
      packages: "Forfaits",
      portfolio: "Portfolio",
      contact: "Contact",
      search: "Rechercher",
      newsletter: "Newsletter"
    },
    hero: {
      title: "Créer des Expériences Numériques qui Transcendent l'Ordinaire",
      subtitle: "Nous transformons vos visions les plus audacieuses en réalités numériques extraordinaires grâce à une technologie de pointe et une créativité inégalée.",
      cta: "Commencez Votre Voyage",
      scrollDown: "Faites défiler pour découvrir"
    },
    services: {
      title: "Nos Services",
      subtitle: "Solutions numériques complètes adaptées à vos besoins uniques",
      items: {
        webDev: {
          title: "Développement Web",
          description: "Sites web personnalisés et applications web construits avec des technologies de pointe"
        },
        mobileApp: {
          title: "Applications Mobiles",
          description: "Applications mobiles natives et multiplateformes pour iOS et Android"
        },
        ecommerce: {
          title: "Solutions E-commerce",
          description: "Boutiques en ligne complètes avec traitement des paiements et gestion des stocks"
        },
        consulting: {
          title: "Conseil Numérique",
          description: "Guidance stratégique pour optimiser votre présence et opérations numériques"
        },
        maintenance: {
          title: "Support & Maintenance",
          description: "Support technique continu et mises à jour régulières pour vos actifs numériques"
        },
        analytics: {
          title: "Analyses & Insights",
          description: "Insights basés sur les données pour améliorer les performances et l'expérience utilisateur"
        }
      }
    },
    packages: {
      title: "Nos Forfaits",
      subtitle: "Choisissez la solution parfaite pour les besoins de votre entreprise",
      items: {
        starter: {
          title: "Forfait Débutant",
          description: "Parfait pour les petites entreprises et startups cherchant à établir leur présence numérique",
          price: "1 200 $ - 2 500 $",
          features: [
            "Design de Site Web Professionnel",
            "Mise en Page Responsive Mobile",
            "Optimisation SEO de Base",
            "Intégration Formulaire de Contact",
            "3 Mois de Support"
          ]
        },
        professional: {
          title: "Forfait Professionnel",
          description: "Solution complète pour les entreprises en croissance nécessitant des fonctionnalités avancées",
          price: "3 000 $ - 6 000 $",
          features: [
            "Application Web Avancée",
            "Tableau de Bord Admin Personnalisé",
            "Intégration Passerelle de Paiement",
            "SEO & Analytics Avancés",
            "6 Mois Support & Mises à Jour"
          ]
        },
        enterprise: {
          title: "Forfait Entreprise",
          description: "Transformation numérique complète pour les grandes organisations",
          price: "7 000 $ - 12 000 $",
          features: [
            "Architecture Niveau Entreprise",
            "Développement Multi-Plateforme",
            "Fonctionnalités de Sécurité Avancées",
            "Intégrations Personnalisées",
            "12 Mois Support Premium"
          ]
        }
      },
      popular: "Le Plus Populaire",
      getStarted: "Commencer"
    },
    portfolio: {
      title: "Vitrine Portfolio",
      subtitle: "Découvrez nos derniers chefs-d'œuvre numériques",
      viewAll: "Explorer Toutes les Impossibilités",
      categories: {
        all: "Tous les Projets",
        ecommerce: "E-commerce",
        analytics: "Analyses",
        healthcare: "Santé",
        fintech: "Fintech",
        education: "Éducation",
        realEstate: "Immobilier",
        foodBeverage: "Alimentation & Boissons",
        travel: "Voyage & Tourisme",
        gaming: "Jeux & Divertissement"
      }
    },
    whyUs: {
      title: "Pourquoi Choisir Arc Labs",
      subtitle: "Découvrez ce qui nous distingue dans le paysage numérique",
      items: {
        experience: {
          title: "Expertise Prouvée",
          description: "Des années d'expérience dans la livraison de solutions numériques exceptionnelles"
        },
        quality: {
          title: "Qualité Premium",
          description: "Standards sans compromis garantissant l'excellence dans chaque projet"
        },
        support: {
          title: "Support 24/7",
          description: "Assistance 24h/24 pour maintenir votre entreprise en fonctionnement"
        },
        innovation: {
          title: "Innovation de Pointe",
          description: "Dernières technologies et méthodologies pour un avantage concurrentiel"
        }
      }
    },
    contact: {
      title: "Contactez-Nous",
      subtitle: "Prêt à transformer votre présence numérique ? Discutons de votre projet.",
      form: {
        firstName: "Prénom",
        lastName: "Nom de Famille",
        email: "Adresse Email",
        company: "Entreprise (Optionnel)",
        projectType: "Type de Projet",
        projectDetails: "Parlez-nous de votre projet",
        submit: "Envoyer le Message",
        submitting: "Envoi en cours..."
      },
      info: {
        address: "Kigali, Rwanda",
        phone: "+250 798 516 334",
        email: "lucienshungofficial@gmail.com",
        hours: "Lun - Ven: 9h00 - 18h00"
      }
    },
    footer: {
      company: "Arc Labs",
      quickLinks: "Liens Rapides",
      services: "Services",
      newsletter: "Newsletter",
      rights: "Tous droits réservés.",
      newsletterPlaceholder: "Entrez votre email",
      subscribe: "S'abonner"
    },
    common: {
      loading: "Chargement...",
      error: "Quelque chose s'est mal passé",
      tryAgain: "Réessayer",
      close: "Fermer",
      viewDetails: "Voir les Détails",
      learnMore: "En Savoir Plus",
      readMore: "Lire Plus",
      getQuote: "Obtenir un Devis"
    }
  },
  
  rw: {
    nav: {
      home: "Ahabanza",
      about: "Aho Turi",
      services: "Serivisi",
      packages: "Amapaki",
      portfolio: "Portfolio",
      contact: "Twandikire",
      search: "Shakisha",
      newsletter: "Newsletter"
    },
    hero: {
      title: "Gukora Ibintu bya Digitale Birambuye Ibisanzwe",
      subtitle: "Tuhindura ibitekerezo byawe bikomeye mu byo ukora mu buryo bwa digitale bwitangaza dukoresheje ikoranabuhanga rigezweho n'ubugeni budasanzwe.",
      cta: "Tangira Urugendo Rwawe",
      scrollDown: "Kugira ngo umenye byinshi"
    },
    services: {
      title: "Serivisi Zacu",
      subtitle: "Ibisubizo bya digitale byuzuye bikwiye ibikenewe byawe byihariye",
      items: {
        webDev: {
          title: "Gutegura Website",
          description: "Website n'application za web zihariye zubakwa n'ikoranabuhanga rigezweho"
        },
        mobileApp: {
          title: "Application za Telefoni",
          description: "Application za telefoni za iOS na Android"
        },
        ecommerce: {
          title: "Ibisubizo bya E-commerce",
          description: "Amaduka yuzuye ya interineti hamwe no kwishyura no gucunga ibicuruzwa"
        },
        consulting: {
          title: "Inama za Digitale",
          description: "Ubuyobozi bw'ingamba zo kunoza ubwo ugaragara mu kazi ka digitale"
        },
        maintenance: {
          title: "Gufasha no Kubungabunga",
          description: "Gufasha mu bya tekiniki bikomeje n'ivugurura rihoraho ry'ibintu byawe bya digitale"
        },
        analytics: {
          title: "Analytics n'Ubushishozi",
          description: "Ubushishozi bushingiye ku makuru kugira ngo hakorwe iyongera ry'imikorere n'ubunararibonye bw'abakoresha"
        }
      }
    },
    packages: {
      title: "Amapaki Yacu",
      subtitle: "Hitamo igisubizo cyiza cy'ibikenewe by'ubucuruzi bwawe",
      items: {
        starter: {
          title: "Paketi ya Mbere",
          description: "Byiza ku bucuruzi bucye na startup zishaka gushyiraho ubwo bagaragara mu kazi ka digitale",
          price: "$1,200 - $2,500",
          features: [
            "Igishushanyo cy'Urubuga rw'Umwuga",
            "Igishushanyo cyitabira Telefoni",
            "Kunoza SEO y'Ibanze",
            "Kwinjiza Ifishi y'Itumanaho",
            "Gufasha Amezi 3"
          ]
        },
        professional: {
          title: "Paketi y'Umwuga",
          description: "Igisubizo cyuzuye ku bucuruzi bukura bukeneye ibintu byateye imbere",
          price: "$3,000 - $6,000",
          features: [
            "Application ya Web Yateye Imbere",
            "Dashboard y'Umuyobozi Yihariye",
            "Kwinjiza Gateway y'Ubwishyu",
            "SEO & Analytics Byateye Imbere",
            "Amezi 6 Gufasha & Kuvugurura"
          ]
        },
        enterprise: {
          title: "Paketi y'Ubucuruzi",
          description: "Guhindura digitale byuzuye ku mashyirahamwe manini",
          price: "$7,000 - $12,000",
          features: [
            "Imyubakire y'Urwego rw'Ubucuruzi",
            "Iterambere ry'Urubuga Runyuranye",
            "Ibintu by'Umutekano Byateye Imbere",
            "Kwinjiza Byihariye",
            "Amezi 12 Gufasha Premium"
          ]
        }
      },
      popular: "Bikunzwe Cyane",
      getStarted: "Tangira"
    },
    portfolio: {
      title: "Werekana Portfolio",
      subtitle: "Menya ibihangano byacu bya digitale bya vuba",
      viewAll: "Shakisha Ibintu Byose Bitashoboka",
      categories: {
        all: "Imishinga Yose",
        ecommerce: "E-commerce",
        analytics: "Analytics",
        healthcare: "Ubuzima",
        fintech: "Fintech",
        education: "Uburezi",
        realEstate: "Imitungo Itimukanwa",
        foodBeverage: "Ibiryo & Ibinyobwa",
        travel: "Urugendo & Ubukerarugendo",
        gaming: "Imikino & Imyidagaduro"
      }
    },
    whyUs: {
      title: "Kuki Uhitamo Arc Labs",
      subtitle: "Menya icyo kitandukanya mu kazi ka digitale",
      items: {
        experience: {
          title: "Ubuhanga Bwemewe",
          description: "Imyaka y'ubunararibonye mu gutanga ibisubizo bya digitale bidasanzwe"
        },
        quality: {
          title: "Ubunyangamugayo bwa Premium",
          description: "Ibipimo bidahwitse bireba neza neza mu mushinga wese"
        },
        support: {
          title: "Gufasha 24/7",
          description: "Gufasha igihe cyose kugira ngo ubucuruzi bwawe bukomeze gukora neza"
        },
        innovation: {
          title: "Udushya Dukomeye",
          description: "Ikoranabuhanga rigezweho n'uburyo bwo gukora kugira ngo ugire inyungu mu marushanwa"
        }
      }
    },
    contact: {
      title: "Tubabarire",
      subtitle: "Witeguye guhindura ubwo ugaragara mu kazi ka digitale? Reka tuganire ku mushinga wawe.",
      form: {
        firstName: "Izina ry'Imbere",
        lastName: "Izina ry'Umuryango",
        email: "Aderesi ya Email",
        company: "Isosiyete (Itegerejwe)",
        projectType: "Ubwoko bw'Umushinga",
        projectDetails: "Tubwire ku mushinga wawe",
        submit: "Kohereza Ubutumwa",
        submitting: "Biri mu kohereza..."
      },
      info: {
        address: "Kigali, Rwanda",
        phone: "+250 798 516 334",
        email: "lucienshungofficial@gmail.com",
        hours: "Kwa - Kwa: 9:00 AM - 6:00 PM"
      }
    },
    footer: {
      company: "Arc Labs",
      quickLinks: "Ihuza Ryihuse",
      services: "Serivisi",
      newsletter: "Newsletter",
      rights: "Uburenganzira bwose burabitswe.",
      newsletterPlaceholder: "Injiza email yawe",
      subscribe: "Iyandikishe"
    },
    common: {
      loading: "Biri mu gupakurura...",
      error: "Hari icyari kibi cyabaye",
      tryAgain: "Ongera Ugerageze",
      close: "Funga",
      viewDetails: "Reba Ibisobanuro",
      learnMore: "Menya Byinshi",
      readMore: "Soma Byinshi",
      getQuote: "Bona Igiciro"
    }
  }
};