// Translations for dynamic portfolio data (Profile & Projects)
// Keeps portfolio.json lightweight and untouched for AI context / low token consumption.

export const EN_PROFILE_OVERRIDES = {
  title: "Full-Stack Developer — BSc Software Engineering, ESP-Antsirabe",
  bio: "I design and deploy complete web & mobile applications, robust backend systems, and integrated AI features.",
  about: {
    title: "About me",
    paragraphs: [
      "A final-year Software Engineering student at ESP-Antsirabe, I build high-performance web and mobile applications, giving equal attention to backend robustness and interface quality.",
      "My approach starts with a design phase (UML, relational schema) to ensure scalable architectures. This foundation allows me to deliver clean REST APIs, mastered data management, and smooth user-facing applications."
    ]
  },
  skills: {
    competences: [
      {
        title: "Design & Modelling",
        detail: "UML modelling (use cases, sequences, classes, activities) for complex systems."
      },
      {
        title: "Software Architecture",
        detail: "Clean Architecture, modular NestJS systems, Turborepo monorepo, strict layer separation."
      },
      {
        title: "Data & Geospatial",
        detail: "Advanced relational schemas, PostGIS spatial queries, Redis caching, Prisma ORM."
      },
      {
        title: "AI & LLM Integration",
        detail: "RAG pipelines, language model orchestration, n8n automation workflows."
      }
    ]
  }
};

export const EN_PROJECT_OVERRIDES = {
  "soalink": {
    category: "Final Year Project — Bachelor's Degree",
    summary: "SoaLink is a digital health platform designed for Madagascar, intelligently directing patients to the healthcare facilities best suited to their situation. It combines an AI-powered medical triage engine, geospatial proximity search, appointment booking from the map, and real-time messaging.",
    architecture: "Modular NestJS backend with a Prisma schema of 26 tables including PostGIS support. AES-256-CBC encryption for sensitive data. Redis caching for sessions and frequent results. File storage via Supabase Storage (S3) with signed URLs. Real-time messaging via Socket.IO with a custom IoAdapter. Two doctor scheduling modes: SLOT (fixed time windows) and QUOTA (number of consultations per period).",
    features: "Key features of SoaLink: (1) 2-pass AI medical search engine — intent detection (symptoms, preference, or combined) then targeted search with up to 2 clarifying questions. (2) PostGIS geospatial facility search filtered by proximity, specialty, urgency. (3) Appointment booking directly from the app. (4) Real-time messaging with voice recording and file upload. (5) Map display of facilities via MapLibre.",
    challenges: "Major technical challenges on SoaLink: (1) 2-call LLM pipeline — intent classification then targeted action with integrated PostGIS search. (2) Real-time sync between doctor scheduling type and geospatial display on the patient side. (3) Flutter Web race condition on voice messaging (long-press vs tap). (4) Contact name resolution across several distinct user types.",
    role: "On SoaLink, Mirado was the sole developer: complete UML design (use cases, sequences, activities, classes for 5 roles), Merise modelling, NestJS backend development, Flutter mobile/web development in Clean Architecture, LLM integration, deployment. Project defended and validated for the Bachelor's degree."
  },
  "geotrano": {
    category: "ESPA Open Day Project / Web Application",
    summary: "GeoTrano is a web-based geolocation platform for real estate listings in Madagascar. It stands out with an innovative GPS anti-fraud system for property photo validation, a freemium model with identity verification (national ID), and PostGIS spatial queries for proximity search.",
    architecture: "Turborepo monorepo architecture with NestJS/TypeScript backend and React 19 frontend. PostgreSQL/PostGIS database with Prisma ORM. Frontend state management via Zustand + React Query. Real-time notifications via WebSocket.",
    features: "Key features of GeoTrano: (1) GPS anti-fraud — 30-minute ephemeral token, cross-device QR Code (desktop → mobile), getUserMedia camera access, GPS validation within ±500m of the listing for each photo. (2) Mandatory national ID verification before publishing. (3) PostGIS geospatial proximity search. (4) Real-time notifications. (5) Freemium model.",
    challenges: "Main challenge of GeoTrano: the GPS anti-fraud system. The backend generates a secure token with a 30-minute lifespan. A QR Code is displayed on desktop; scanning it opens the camera directly on mobile via getUserMedia. For each photo taken, GPS coordinates are compared server-side with the apartment's coordinates (±500m margin).",
    role: "On GeoTrano, Mirado developed the end-to-end GPS anti-fraud system, the full notifications system, and the freemium model. Team project for the ESPA Open Day."
  },
  "auto-soutitrage": {
    category: "Multimedia / AI Project",
    summary: "An application for automatic generation of customised subtitles and vocal track isolation for audio and video files. 100% local AI processing using WhisperX for transcription and Demucs for audio separation, all powered by a Flutter interface.",
    architecture: "FastAPI backend orchestrating an async multimedia pipeline: (1) Voice separation via Demucs. (2) Word-level transcription and time alignment via WhisperX with CUDA acceleration. (3) Video processing and subtitle embedding via FFmpeg. (4) Cross-platform Flutter client interface.",
    features: "Key features: (1) Highly customisable subtitle generation (styles, fonts, colours, animations and SRT/VTT exports) for videos and audio. (2) Vocal track isolation and cleaning. (3) Ultra-precise word-level temporal synchronisation.",
    challenges: "Main challenge: optimising GPU (CUDA) acceleration and VRAM management when chaining heavy AI models (Demucs + WhisperX) with FFmpeg video rendering. Required structuring an efficient async pipeline to process large media files without memory saturation or UI blocking.",
    role: "On this project, Mirado designed and developed the entire AI pipeline under FastAPI, GPU CUDA processing optimisation, and the Flutter interface. Solo project."
  },
  "fanorona-9": {
    category: "Learning side project",
    summary: "A digital adaptation of Fanoron-tsivy, the traditional Malagasy strategy game, playable in two-player or against an AI. Implements complete 9x9 board capture rules and an AI engine based on a decision tree. Algorithmic project in React Native / Expo."
  },
  "smart-http-server": {
    category: "Learning side project",
    summary: "Native Python HTTP server with a styled interface, multipart/form-data handling for uploads, streaming and dynamic search. A utility tool and Python networking exercise."
  },
  "morpion-game": {
    category: "Learning side project",
    summary: "Classic Tic-Tac-Toe game in Flutter/Dart. A learning project for game logic and Flutter widget state management."
  }
};

/**
 * Returns localized profile object based on current language
 */
export function getLocalizedProfile(profile, lang) {
  if (!profile || lang !== 'en') return profile;
  return {
    ...profile,
    title: EN_PROFILE_OVERRIDES.title || profile.title,
    bio: EN_PROFILE_OVERRIDES.bio || profile.bio,
    about: {
      ...profile.about,
      title: EN_PROFILE_OVERRIDES.about.title,
      paragraphs: EN_PROFILE_OVERRIDES.about.paragraphs,
    },
    skills: {
      ...profile.skills,
      competences: EN_PROFILE_OVERRIDES.skills.competences,
    }
  };
}

/**
 * Returns localized projects list based on current language
 */
export function getLocalizedProjects(projects, lang) {
  if (!projects || lang !== 'en') return projects;
  return projects.map((p) => {
    const override = EN_PROJECT_OVERRIDES[p.id];
    if (!override) return p;
    return {
      ...p,
      category: override.category || p.category,
      details: {
        ...p.details,
        summary: override.summary || p.details?.summary,
        architecture: override.architecture || p.details?.architecture,
        features: override.features || p.details?.features,
        challenges: override.challenges || p.details?.challenges,
        role: override.role || p.details?.role,
      }
    };
  });
}
