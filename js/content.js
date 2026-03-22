/**
 * ============================================================
 *  DIAS 350 — CENTRAL CONTENT CONFIGURATION
 *  Edit this file to update ALL text, images, and project data.
 * ============================================================
 */

const CONFIG = {

  // ── PROJECT INFO ──────────────────────────────────────────
  PROJECT_NAME: "DIAS 350",
  PROJECT_FULL_NAME: "DIAS 350 Residence",
  ADDRESS: "Rua de Carlos Malheiro Dias 350, Porto, Portugal",
  NEIGHBORHOOD: "Bonfim, Porto",

  // ── CONTACT ───────────────────────────────────────────────
  CONTACT_EMAIL: "ido@city-service.com",
  CONTACT_PHONE: "+351 932 513 125",
  WHATSAPP_NUMBER: "+351932513125",  // no spaces for WhatsApp URL

  // ── PROJECT DATA ──────────────────────────────────────────
  DELIVERY_DATE: "May 2027",
  NUMBER_OF_UNITS: "6",
  FLOORS: "3",
  APARTMENT_MIX: "T1, T2, T3",
  PROJECT_TYPE_EN: "Residential redevelopment",
  PROJECT_TYPE_PT: "Reabilitação residencial",

  // ── GOOGLE MAPS ───────────────────────────────────────────
  // Replace this URL with your actual Google Maps embed URL.
  // Go to Google Maps → share → Embed a map → copy the src URL.
  GOOGLE_MAPS_EMBED_URL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.9!2d-8.6!3d41.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRua+de+Carlos+Malheiro+Dias+350%2C+Porto!5e0!3m2!1sen!2spt!4v1600000000000",

  // ── TEAM ──────────────────────────────────────────────────
  // Replace photo paths with real photos in assets/images/
  TEAM_MEMBERS: [
    {
      name: "ALBE TOP BONFIM LDA",
      role_en: "Developer",
      role_pt: "Promotor",
      bio_en: "Boutique property development company focused on urban regeneration projects in Porto.",
      bio_pt: "Empresa boutique de promoção imobiliária focada em projetos de regeneração urbana no Porto.",
      photo: "assets/images/team-developer.jpg"
    },
    {
      name: "Alberto Simoes",
      role_en: "Architect",
      role_pt: "Arquiteto",
      bio_en: "Experienced architect specializing in the rehabilitation and transformation of urban heritage buildings.",
      bio_pt: "Arquiteto experiente especializado na reabilitação e transformação de edifícios urbanos de valor patrimonial.",
      photo: "assets/images/team-architect.jpg"
    },
    {
      name: "Gil Aldor",
      role_en: "Project Manager",
      role_pt: "Gestor de Projeto",
      bio_en: "Overseeing all phases of the project from planning through delivery, ensuring quality and schedule.",
      bio_pt: "Supervisionando todas as fases do projeto desde o planeamento até à entrega, garantindo qualidade e prazo.",
      photo: "assets/images/team-pm.jpg"
    },
    {
      name: "Gil Aldor",
      role_en: "Commercial Contact",
      role_pt: "Contacto Comercial",
      bio_en: "Available for all commercial enquiries, investor relations, and partnership discussions.",
      bio_pt: "Disponível para todos os pedidos comerciais, relações com investidores e discussões de parceria.",
      photo: "assets/images/team-commercial.jpg"
    }
  ],

  // ── GALLERY IMAGES ────────────────────────────────────────
  // Replace these filenames with your actual photo files.
  // Place photos in the assets/images/ folder.
  GALLERY_IMAGES: [
    { file: "assets/images/facade.jpg",         caption_en: "Existing façade",    caption_pt: "Fachada existente" },
    { file: "assets/images/entrance.jpg",        caption_en: "Entrance",           caption_pt: "Entrada" },
    { file: "assets/images/interior-1.jpg",      caption_en: "Interior condition", caption_pt: "Estado interior" },
    { file: "assets/images/street-view.jpg",     caption_en: "Street view",        caption_pt: "Vista da rua" },
    { file: "assets/images/interior-2.jpg",      caption_en: "Building details",   caption_pt: "Detalhes do edifício" },
    { file: "assets/images/neighborhood.jpg",    caption_en: "Surrounding area",   caption_pt: "Zona envolvente" },
    { file: "assets/images/existing-building-1.jpg", caption_en: "Side elevation",  caption_pt: "Elevação lateral" },
    { file: "assets/images/existing-building-2.jpg", caption_en: "Rear view",       caption_pt: "Vista traseira" }
  ],

  // ── HERO IMAGE ────────────────────────────────────────────
  // Replace with your main hero image
  HERO_IMAGE: "assets/images/hero.jpg"

};

// ── BILINGUAL CONTENT ─────────────────────────────────────────────────────────
// All page text, organized by section and language.
// Edit here to update any text on the site.

const CONTENT = {

  en: {
    // Navigation
    nav: {
      home: "Home",
      project: "Project",
      location: "Location",
      gallery: "Gallery",
      team: "Team",
      contact: "Contact"
    },

    // Hero
    hero: {
      headline: "A new residential vision in Porto",
      subtitle: "A boutique redevelopment project in one of Porto's most authentic and desirable urban locations.",
      cta_primary: "Request details",
      cta_secondary: "View location"
    },

    // About
    about: {
      section_label: "The Project",
      title: "DIAS 350 Residence",
      description: "DIAS 350 Residence is a boutique urban redevelopment project in Porto, designed to combine the character of an existing building with a renewed residential concept for modern city living. The project is intended to offer a high-quality living experience in a central location with strong long-term appeal.",
      stats_label_type: "Project type",
      stats_label_units: "Residential units",
      stats_label_floors: "Floors",
      stats_label_mix: "Apartment mix",
      stats_label_delivery: "Estimated delivery",
      features: [
        { icon: "📍", title: "Prime Porto location" },
        { icon: "🏛", title: "Boutique scale" },
        { icon: "🔨", title: "Renovated urban character" },
        { icon: "📈", title: "Long-term value potential" }
      ]
    },

    // Location
    location: {
      section_label: "Location",
      title: "In the heart of Bonfim",
      description: "Located in the Bonfim area, the project benefits from one of Porto's most vibrant and established urban neighborhoods, known for its culture, walkability, local commerce, cafés, galleries, and convenient access to the city center.",
      highlights: [
        { icon: "🚶", text: "Excellent walkability" },
        { icon: "🚌", text: "Close to public transport" },
        { icon: "☕", text: "Near cafés and restaurants" },
        { icon: "🏙", text: "Central Porto access" },
        { icon: "🏘", text: "Authentic neighborhood atmosphere" }
      ]
    },

    // Gallery
    gallery: {
      section_label: "Gallery",
      title: "Existing Building",
      subtitle: "A first look at the property before transformation."
    },

    // Highlights
    highlights: {
      section_label: "Why DIAS 350",
      title: "Project Highlights",
      cards: [
        { icon: "📍", title: "Central Porto location",         text: "Situated in one of Porto's most sought-after and well-connected urban districts." },
        { icon: "🔄", title: "Urban regeneration opportunity", text: "Contributing to the revitalization of an established city neighborhood with real character." },
        { icon: "🏡", title: "Boutique residential concept",   text: "Just 6 units across 3 floors — designed for intimacy, quality, and distinctiveness." },
        { icon: "🏛", title: "Elegant architectural potential",text: "The existing structure offers a compelling foundation for a refined architectural intervention." },
        { icon: "📊", title: "Attractive long-term positioning",text: "Porto's residential market continues to show resilience and strong demand fundamentals." }
      ]
    },

    // Team
    team: {
      section_label: "Our Team",
      title: "The People Behind the Project"
    },

    // Contact
    contact: {
      section_label: "Contact",
      title: "Get in touch",
      description: "For project information, partnership opportunities, or sales inquiries, please leave your details and we will get back to you.",
      form: {
        name: "Full name",
        email: "Email",
        phone: "Phone",
        message: "Message",
        submit: "Send message",
        success: "Thank you. We will be in touch shortly.",
        error: "Please fill in all required fields."
      },
      disclaimer: "This website is for preliminary marketing purposes only. All information is subject to change."
    },

    // Footer
    footer: {
      tagline: "Porto, Portugal",
      disclaimer: "Images, descriptions, and plans are for illustrative purposes only.",
      copyright: "© 2025 DIAS 350. All rights reserved."
    }
  },

  pt: {
    // Navigation
    nav: {
      home: "Início",
      project: "Projeto",
      location: "Localização",
      gallery: "Galeria",
      team: "Equipa",
      contact: "Contacto"
    },

    // Hero
    hero: {
      headline: "Uma nova visão residencial no Porto",
      subtitle: "Um projeto boutique de reabilitação numa das zonas urbanas mais autênticas e procuradas do Porto.",
      cta_primary: "Pedir detalhes",
      cta_secondary: "Ver localização"
    },

    // About
    about: {
      section_label: "O Projeto",
      title: "DIAS 350 Residence",
      description: "DIAS 350 Residence é um projeto boutique de reabilitação urbana no Porto, concebido para combinar o caráter de um edifício existente com um conceito residencial renovado para a vida urbana contemporânea. O projeto pretende oferecer uma experiência habitacional de elevada qualidade numa localização central com forte atratividade de longo prazo.",
      stats_label_type: "Tipo de projeto",
      stats_label_units: "Unidades residenciais",
      stats_label_floors: "Pisos",
      stats_label_mix: "Tipologias",
      stats_label_delivery: "Entrega prevista",
      features: [
        { icon: "📍", title: "Localização privilegiada no Porto" },
        { icon: "🏛", title: "Escala boutique" },
        { icon: "🔨", title: "Caráter urbano reabilitado" },
        { icon: "📈", title: "Potencial de valorização a longo prazo" }
      ]
    },

    // Location
    location: {
      section_label: "Localização",
      title: "No coração do Bonfim",
      description: "Localizado na zona de Bonfim, o projeto beneficia de um dos bairros urbanos mais vibrantes e consolidados do Porto, conhecido pela sua cultura, acessibilidade pedonal, comércio local, cafés, galerias e ligação conveniente ao centro da cidade.",
      highlights: [
        { icon: "🚶", text: "Excelente acessibilidade pedonal" },
        { icon: "🚌", text: "Perto de transportes públicos" },
        { icon: "☕", text: "Próximo de cafés e restaurantes" },
        { icon: "🏙", text: "Acesso central ao Porto" },
        { icon: "🏘", text: "Ambiente autêntico de bairro" }
      ]
    },

    // Gallery
    gallery: {
      section_label: "Galeria",
      title: "Edifício Existente",
      subtitle: "Uma primeira visão do imóvel antes da transformação."
    },

    // Highlights
    highlights: {
      section_label: "Porquê DIAS 350",
      title: "Destaques do Projeto",
      cards: [
        { icon: "📍", title: "Localização central no Porto",         text: "Situado num dos bairros urbanos mais procurados e bem conectados do Porto." },
        { icon: "🔄", title: "Oportunidade de regeneração urbana",   text: "Contribuindo para a revitalização de um bairro urbano consolidado com caráter genuíno." },
        { icon: "🏡", title: "Conceito residencial boutique",        text: "Apenas 6 unidades em 3 pisos — concebidas para intimidade, qualidade e distinção." },
        { icon: "🏛", title: "Potencial arquitetónico elegante",     text: "A estrutura existente oferece uma base interessante para uma intervenção arquitetónica refinada." },
        { icon: "📊", title: "Posicionamento atrativo a longo prazo",text: "O mercado residencial do Porto continua a demonstrar resiliência e fundamentos sólidos de procura." }
      ]
    },

    // Team
    team: {
      section_label: "A Nossa Equipa",
      title: "As Pessoas por Detrás do Projeto"
    },

    // Contact
    contact: {
      section_label: "Contacto",
      title: "Entre em contacto",
      description: "Para informações sobre o projeto, oportunidades de parceria ou pedidos comerciais, deixe os seus dados e entraremos em contacto.",
      form: {
        name: "Nome completo",
        email: "Email",
        phone: "Telefone",
        message: "Mensagem",
        submit: "Enviar mensagem",
        success: "Obrigado. Entraremos em contacto brevemente.",
        error: "Por favor preencha todos os campos obrigatórios."
      },
      disclaimer: "Este website destina-se apenas a fins preliminares de divulgação. Toda a informação está sujeita a alteração."
    },

    // Footer
    footer: {
      tagline: "Porto, Portugal",
      disclaimer: "As imagens, descrições e plantas são meramente ilustrativas.",
      copyright: "© 2025 DIAS 350. Todos os direitos reservados."
    }
  }

};
