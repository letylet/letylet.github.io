
export const translations = {
  it: {
    home: {
      role: "Game Developer (Videogiochi/AR/VR) - Frontend Developer",
      description: "Sviluppatrice con esperienza in Unity (Videogiochi, esperienze AR e VR) e frontend web. Sono appassionata di videogiochi e tecnologie immersive, credo nel loro potenziale nel risolvere problemi, trasmettere valori e insegnare. Il mio obiettivo è realizzare esperienze interattive che sorprendano, coinvolgano e ispirino.",
      cta: "Lista Progetti",
      immersiveBtn: "Esplorazione Interattiva",
      tooltips: {
        github: "Guarda il mio codice",
        linkedin: "Connettiamoci!",
        email: "Scrivimi una mail",
        projects: "Vedi lista completa dei progetti",
        immersive: "Un modo guidato e interattivo per conoscere i miei progetti e la mia visione",
        immersiveMobile: "Purtroppo non disponibile su mobile :("
      }
    },
    projects: {
      navHome: "Home",
      navPortfolio: "Portfolio",
      pageTitle: "I Miei Progetti",
      titleTooltip: "Cliccami per far brillare le idee",
      seeDetails: "Scopri di più",
      seeLess: "Vedi meno",
      detailsHeader: "Dettagli del progetto",
      visitWebsite: "Scopri di più",
      filterBy: "Filtra per tecnologia:",
      sortBy: "Ordina per:",
      sortNewest: "Più recenti",
      sortOldest: "Meno recenti",
      sortCategory: "Categoria",
      sortDefault: "Default",
      clearFilters: "Rimuovi filtri",
      noProjects: "Nessun progetto trovato con i filtri selezionati.",
      goToImmersive: "Vai all'esplorazione interattiva"
    },
    footer: {
      text: "© {year} Letizia Penné. Progettato con React & Tailwind."
    },
    immersive: {
      backToHub: "Torna alla home",
      hubTitle: "Scegli la stanza da esplorare",
      visitedCounter: "Stanze Esplorate: {count} / {total}",
      backButton: "Indietro",
      welcome: {
        step1: {
          title: "Benvenuto/a!",
          text: "Qui ti accompagnerò alla scoperta delle mie competenze e dei miei valori. \n Clicca sui pulsanti per visitare le 4 stanze tematiche.",
          button: "Come funziona?"
        },
        step2: {
          title: "Cosa troverai all'interno?",
          text: "Interagendo con gli oggetti scoprirai il progetto più significativo per me in quell’ambito, la mia vision e gli strumenti che utilizzo nel mio lavoro. \n Buona scoperta!",
          button: "Inizia l'esplorazione"
        }
      },
      rooms: {
        GAMES: "Videogiochi",
        IMMERSIVE: "Esperienze Immersive",
        WEB: "Sviluppo Web",
        EXTRA: "Extra"
      },
      objects: {
        // Games Room
        workstation: {
          label: "Workstation",
          mission: {
            problem: "",
            solution: 'Un applied game sviluppato nel contesto del <b>progetto Erasmus+ KA2 “Edugaming vs. Radicalisation: strategies for beginners”</b>. Un <b>platform in 2D</b> sviluppato in Unity, fruibile sia su browser desktop che mobile. Affronta il tema dei discorsi d’odio contro la comunità LGBTQ+.',
            resp: "Junior Unity Developer",
            results: "Da qui è nata la mia passione. Ho avuto modo di comprendere e partecipare alle fasi di <b>progettazione e sviluppo</b> di un applied game e imparare a sviluppare <b>meccaniche di gioco</b>, <b>animazioni</b>, <b>sistemi di dialogo</b>, <b>sistemi di particelle</b>, <b>localizzazione di testi per la gesione di diverse lingue</b> e molto altro"
          }
        },
        unityIcon: {
          label: "Unity",
          text: "<b>Unity</b> è l'engine che preferisco. \nHo lavorato anche con <b>GDevelop</b> e ho una conoscenza base di <b>Godot</b> e <b>Unreal Engine</b>"
        },
        unityIcon2: {
          label: "Unity",
          text: "<b>Unity</b> è l'engine che preferisco e con il quale ho realizzato tutte le esperienze immersive."
        },
        gamesPoster: {
          label: "I miei giochi",
          title: "La mia esperienza con i videogiochi è varia:",
          list: "• Umbrella+ (Applied 2D Game)\n• SeaRing (Indie Puzzle/Action 2D)\n• Mascaria (2D Card game) \n• Food Devils (Roguelike/Tattico 3D Game) \n• Snake Multiplayer (Arcade 2D Game)"
        },
        lamp: {
          label: "Lampada",
          text: "Ciò che mi affascina dei videogiochi è la capacità di <b>coinvolgere</b> gli utenti a 360 gradi, rendendoli un ottimo strumento per <b>stimolare emozioni</b>, <b>promuovere valori</b> e <b>diffondere contenuti</b>.",
        },
        // console: {
        //   label: "Retro Console",
        //   text: "Il primo videogioco che ho creato è stato Snake con la possibilità di giocare in due giocatori. Realizzato interamente in Java"
        // },
        // AR/VR Room
        mural: {
          label: "Murales",
          text: "Il mio primo progetto in questo ambito è stata un <b>app per smartphone/tablet che permette di interagire con dei murales tramite la realtà aumentata</b>."
        },
        // IMMERSIVEPoster: {
        //   label: "Progetti AR/VR",
        //   title: "Esperienze Immersive",
        //   list: "• Museo Bagatti Valsecchi (Guida AR Web)\n• Tesi Murales (App AR)\n• simulazione guida moto in VR (Simulazione in VR)\n• Esperienza interattiva in VR"
        // },
        museum: {
          label: "Museo",
          mission: {
            problem: "",
            solution: "<b>Una guida AR per il museo Bagatti Valsecchi</b>: inquadrando dei <b>marker</b> all'interno delle stanze, si possono visualizzare immagini di approfondimenti riguardo specifici oggetti e ascoltare l'audioguida.",
            resp: "Unity Developer",
            results: "Realizzare un'esperienza di realtà aumentata accessibile via web per un museo è stata per me una <b>sfida</b> esaltante."
          }
        },
        vrHeadset: {
          label: "Visore VR",
          text: "Ho sviluppato 2 esperienze in realtà virtuale: \n\n un <b>simulatore di guida di una Vespa</b> e un'<b>esperienza immersiva</b> in cui, tramite teletrasporto, l'utente può muoversi e interagire con alcuni elementi."
        },
        portal: {
          label: "Portale Magico",
          text: "Sono affascinata dalle esperienze immersive perché rendono l’utente protagonista, permettendo un’<b>interazione naturale</b> con elementi digitali. La <b>realtà aumentata</b> e la <b>realtà mista</b> hanno un grande potenziale dato che amplificano il mondo reale senza sostituirlo. La <b>realtà virtuale</b>, invece, permette di immergersi completamente in un ambiente digitale, rendendola particolarmente efficace per le simulazioni."
        },
        // Web Room
        screen: {
          label: "Questo Sito",
          mission: {
            problem: "",
            solution: "Un sito in cui cerco di raccontare me e ed il mio lavoro evidenziando <b>sia la mia parte logica e analitica sia quella creativa e innovativa</b>. Le tecnologie utilizzate sono React e Tailwind. Inizialmente ho utilizzato l'IA (<b>Google AI Studio</b>) per avere una base di partenza che ho poi ampliato, lavorando sul codice, aggiungendo nuove funzionalità e rifinendo la struttura",
            resp: "Progettazione, design e sviluppo dell'intero sito",
            results: "Questo progetto mi ha permesso di <b>sperimentarmi con l'intelligenza artificiale</b> e mettere alla prova le mie capacità di <b>progettazione di esperienze</b>."
          }
        },
        laptop: {
          label: "Laptop",
          text: "Ho lavorato come <b>Frontend Developer</b> presso Open Reply s.r.l. per quasi 3 anni. \n Ho collaborato alla realizzazione e mantenimento di grandi progetti, imparando a <b>lavorare in gruppo</b> e a rispettare le scadenze."
        },
        shelf: {
          label: "Libreria Tech",
          text: "Queste sono le <b>tecnologie</b> che ho usato per lo sviluppo web fin'ora. \n \nOgni strumento presenta potenzialità e carenze, <b>in ogni situazione cerco di scegliere il più adatto</b>."
        },
        blind: {
          label: "Accessibilità",
          text: "Ho sviluppato app per non vedenti. L'accessibilità non è un optional, è una priorità."
        },
        magnifyingGlass: {
          label: "Dettagli",
          text: "Sono molto attenta ai dettagli. \n Mi piace scrivere <b>codice pulito e mantenibile</b>."
        },
        // Misc Room
        robot: {
          label: "Robot 3D",
          text: " Lui è Flash, il robottino che ho realizzato con <b>Arduino</b>. Tramite sensori ad ultrasuoni è in grado di evitare ostacoli."
          // mission: {
          //   problem: "Creare un robot fisico che naviga autonomamente.",
          //   solution: "Robot basato su Arduino con sensori a ultrasuoni.",
          //   resp: "Assemblaggio hardware, programmazione C++ embedded.",
          //   results: "Rappresenta la mia capacità di problem solving, curiosità ad esplorare nuove tecnologie e creatività"
          // }
        },
        camera: {
          label: "Fotocamera",
          text: "<b>Fotografia</b> e <b>video editing</b> sono altre due mie passioni. All'università ho avuto modo di studiare strumenti di video editing, photo editing e anche modellazione 3D"
        },
        crossStitch: {
          label: "Punto Croce",
          text: "Mi piace unire le mie competenze creative e tecnologiche, per questo ho creato un <b>software in Python</b> che converte immagini in schemi per punto croce."
        },
        solarSystem: {
          label: "Esperienza immersiva in C++",
          text: "Il progetto universitario più <b>ambizioso</b> e divertente che ho realizzato è stato un'esperienza interattiva realizzata interamente con <b>C++ e OpenGL</b>, programmando il <b>Vertex shader</b> e il <b>fragment shader</b> tramite glsl. L'esperienza prevede la libera esplorazione di una stanza e il teletrasporto all'interno del sistema solare tramite portale animato."
        },
        tech: {
          label: "Tecnologie",
          text: "Altri <b>linguaggi di programmazione</b> e <b>programmi</b> che so utilizzare!"
        }
      },
      missionLabels: {
        problem: "Presentazione",
        solution: "Cos'è?",
        responsibilities: "Il mio ruolo",
        results: "Perché è il più significativo per me?"
      }
    }
  },
  en: {
    home: {
      role: "Game Developer (Videogames/AR/VR) - Frontend Developer",
      description: "Developer with experience in Unity and frontend web. I am passionate about videogames and immersive technologies, believing in their potential to solve problems, convey values, and teach. My goal is to create interactive experiences that surprise, engage, and inspire.",
      cta: "Explore Projects",
      immersiveBtn: "Interactive Exploration",
      tooltips: {
        github: "Check my code",
        linkedin: "Let's connect!",
        email: "Send me an email",
        projects: "Full Project List",
        immersive: "A guided, interactive way to explore my vision and projects",
        immersiveMobile: "Unfortunately not available on mobile. :("
      }
    },
    projects: {
      navHome: "Home",
      navPortfolio: "Portfolio",
      pageTitle: "My Projects",
      titleTooltip: "Click me to spark ideas",
      seeDetails: "See details",
      seeLess: "See less",
      detailsHeader: "Project Details",
      visitWebsite: "See more",
      filterBy: "Filter by technology:",
      sortBy: "Sort by:",
      sortNewest: "Newest",
      sortOldest: "Oldest",
      sortCategory: "Category",
      sortDefault: "Default",
      clearFilters: "Clear filters",
      noProjects: "No projects found with selected filters.",
      goToImmersive: "Go to interactive experience"
    },
    footer: {
      text: "© {year} Letizia Penné. Designed with React & Tailwind."
    },
    immersive: {
      backToHub: "Back to Home",
      hubTitle: "Choose a room to explore",
      visitedCounter: "Visited rooms: {count} / {total}",
      backButton: "Back",
      welcome: {
        step1: {
          title: "Welcome!",
          text: "Explore my skills through an interactive experience. Click the buttons to enter the themed rooms (Video Games, Web, AR/VR), and once inside, interact with the objects to discover content, projects, and insights.",
          button: "How it works?"
        },
        step2: {
          title: "Navigation Instructions",
          text: "In each room, you can explore the project that is most meaningful to me in that area by clicking on the central object. The other objects will let you discover additional projects, specific skills, or personal ideas.",
          button: "Start Exploring"
        }
      },
      rooms: {
        GAMES: "Videogames",
        IMMERSIVE: "Immersive Experiences",
        WEB: "Web Development",
        EXTRA: "Extra"
      },
      objects: {
        // Games Room
        workstation: {
          label: "Workstation",
          mission: {
            problem: "",
            solution: "An applied game developed within the context of the <b>Erasmus+ KA2 project “Edugaming vs. Radicalisation: strategies for beginners”</b>. A <b>2D platformer</b> developed in Unity, playable on both desktop and mobile browsers, focusing on the theme of hate speech against the LGBTQ+ community.",
            resp: "Junior Unity developer",
            results: "That's where my passion was born. I had the chance to understand and take part in the <b>design and development</b> phases of an applied game and learn how to develop <b>game mechanics</b>, <b>animations</b>, <b>dialogue systems</b>, <b>particle systems</b>, <b>text localization for managing different languages</b> and much more."
          }
        },
        unityIcon: {
          label: "Unity",
          text: "Unity is the engine I know best. I am also able to work with GDevelop and have basic knowledge of Godot and Unreal Engine."
        },
        unityIcon2: {
          label: "Unity",
          text: "Unity is the engine I know best.I used it to develop all the immersive experiences."
        },
        gamesPoster: {
          label: "Games",
          title: "I have worked on different kinds of videogames:",
          list: "• Umbrella+ (Serious Game, 2D, Platform)\n• SeaRing (Indie Puzzle/Action, 2D)\n• Food Devils (Roguelike/Tattic, 3D)\n• Bubbleship Escape (Global Game Jam 2025, Labirinth, 2D) \n• Mascaria (Global Game Jam 2026, Card Game, 2D)\n• Snake Multiplayer (Arcade, 2D)"
        },
        lamp: {
          label: "Lamp",
          text: "What I like about video games is their ability to actively <b>engage</b> people, making them an excellent tool for conveying emotions, values, and concepts. My favorite games are <b>Applied Games</b>.",
        },
        // console: {
        //   label: "Retro Console",
        //   text: "My passion started with classics. I recreated Snake in Java to understand game loop basics."
        // },
        // AR/VR Room
        mural: {
          label: "Murals",
          text: "My first project in this field was a <b>smartphone/tablet app that allows users to interact with murals through augmented reality</b>."
        },
        // IMMERSIVEPoster: {
        //   label: "AR/VR Projects",
        //   title: "Immersive Experiences",
        //   list: "• Bagatti Valsecchi Museum (Web AR Guide)\n• Murals Thesis (Vuforia)\n• VR Training (DIY Simulation)\n• Solar System VR (Educational)"
        // },
        museum: {
          label: "Museum",
          mission: {
            problem: "",
            solution: "<b>An AR guide for a museum</b>: By framing <b>markers</b> inside the rooms, users have the opportunity to view in-depth information about specific objects and listen to the audio guide.",
            resp: "Unity Developer",
            results: "It was <b>challenging</b> to create an augmented reality experience accessible via the web for a museum."
          }
        },
        vrHeadset: {
          label: "VR Headset",
          text: "I have developed 2 virtual reality experiences: a <b>Vespa driving simulator</b> and an <b>immersive experience</b> where the user can move via teleportation and interact with various elements."
        },
        portal: {
          label: "Magic Portal",
          text: "I am fascinated by immersive experiences because they place the user at the center, allowing for <b>natural interaction</b> with digital elements. <b>Augmented reality</b> and <b>mixed reality</b> have great potential: they amplify the real world without replacing it, adding layers of information and new ways of exploration. <b>Virtual reality</b>, on the other hand, allows for complete immersion in an environment and makes it easier to empathize, making it particularly effective for simulations, experiential learning, and interactive storytelling."
        },
        // Web Room
        screen: {
          label: "My Portfolio",
          mission: {
            problem: "",
            solution: "A website where I try to talk about myself and my work, seeking to highlight <b>both my logical and responsible side as well as my creative and innovative one</b>. The technologies used are: Next, React, and Tailwind. I initially used AI (<b>Google AI Studio</b>) to have a starting point and then worked on the code, adding missing features and refining the structure.",
            resp: "Design and development of the entire website.",
            results: "With this website, I tried to represent myself and <b>I took care of every single aspect (experience design, UI/UX, development)</b>. This project allowed me to <b>experiment with artificial intelligence</b> and put my <b>experience design</b> skills to the test."
          }
        },
        laptop: {
          label: "Laptop",
          text: "I worked as a <b>Frontend Developer</b> at Open Reply S.r.l. for almost three years. I contributed to the development and maintenance of large projects, learning how to <b>work in a team</b> and deliver my work within the established deadlines."
        },
        shelf: {
          label: "Tech Shelf",
          text: "These are the <b>technologies</b> I’ve used for web development so far. Each tool has its own strengths and limitations, so when I have the choice, I try to understand which one is <b>the most suitable for the situation</b>."
        },
        // blind: {
        //   label: "Accessibility",
        //   text: "I developed apps for the blind. Accessibility is not an option, it's a priority."
        // },
        magnifyingGlass: {
          label: "Details",
          text: "I am very attentive to detail. \nI enjoy writing <b>clean and maintainable code</b>."
        },
        // Misc Room
        robot: {
          label: "3D Robot",
          text: "In high school, I built an <b>Arduino robot</b> that could avoid obstacles using ultrasonic sensors."
        },
        camera: {
          label: "Camera",
          text: "<b>Photography</b> and <b>video editing</b> are two other passions of mine. At university, I had the opportunity to study video editing and photo editing tools, as well as 3D modeling."
        },
        crossStitch: {
          label: "Cross Stitch",
          text: "I love handcraft so I used my programming skills to create a Python software that converts images into cross-stitch patterns!"
        },
        solarSystem: {
          label: "Immersive experience with c++",
          text:"The most <b>ambitious</b> and fun university project I created was an interactive experience built entirely with <b>C++ and OpenGL</b>, programming the <b>Vertex shader</b> and <b>fragment shader</b> using GLSL. The experience features free exploration of a room and teleportation into the solar system via an animated portal."
        },
        tech: {
          label: "Technologies",
          text: "Other programming languages and programs I can use :)"
        }
      },
      missionLabels: {
        problem: "Problem",
        solution: "The project",
        responsibilities: "My role",
        results: "Why is it important for me"
      }
    }
  }
};
