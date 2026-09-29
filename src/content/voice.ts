import type { Locale } from "./biography";

export const voiceLocales: Locale[] = ["en-US", "pt-BR"];
export const isVoiceLocale = (value: string): value is Locale =>
  voiceLocales.includes(value as Locale);
export const voicePath = (locale: Locale, about = false) =>
  `/voice/${locale}/${about ? "about/" : ""}`;
type Translation = Record<Locale, string>;
export type VoiceSample = {
  id: string;
  title: Translation;
  context: Translation;
  category: "narration" | "character" | "commercial";
  src: string;
  mimeType: string;
  spokenLanguage: Translation;
  duration: string;
  transcript: Translation;
  credit?: Translation;
};
/** Add only audio you have permission to publish. UI language is not voice proficiency. */
export const voiceMaterial: {
  samples: VoiceSample[];
  languages: Translation[];
  setup: Translation | null;
  credits: { title: string; role: Translation; year: string; url?: string }[];
} = { samples: [], languages: [], setup: null, credits: [] };

const english = {
  brand: "Clopes / Voice",
  role: "Voice acting & narration",
  listen: "Listen",
  about: "About me",
  inquiries: "Inquiries",
  language: "Portfolio language",
  skip: "Skip to content",
  homeLink: "Personal hub",
  hero: "A voice for",
  heroEmphasis: "the telling.",
  intro:
    "Narration, character, and the work of finding a voice. I’m Clopes, a beginner voice actor taking classes and starting to audition.",
  listenHeading: "The listening room",
  sampleLabel: "Voice samples",
  emptyTitle: "No public voice samples yet.",
  emptyDescription:
    "There aren’t any public recordings here yet. Narration and character work will appear here when it’s ready to listen to.",
  narration: "Narration",
  character: "Character & dubbing",
  commercial: "Commercial & informational",
  preparing: "Not available yet",
  trainingLabel: "Behind the microphone",
  trainingTitle: "Learning by doing.",
  training:
    "I’ve been taking dubbing and voice acting classes since early 2026. The course also occasionally includes scenes focused entirely on narration.",
  auditions:
    "I’ve started submitting auditions, including an audiobook narration audition using an excerpt from Bloodbound Legacy, my unpublished book.",
  details: "For your production",
  languages: "Languages & accents",
  languagesEmpty: "Performance languages and accents haven’t been listed yet.",
  setup: "Recording setup",
  setupEmpty: "Recording details haven’t been added yet.",
  credits: "Credits",
  contactTitle: "Let’s talk about the voice you need.",
  contactBody:
    "For casting and narration inquiries, include the type of project, language, approximate length, intended use, and your timeline.",
  contactEmpty:
    "A public contact address hasn’t been added yet. If you received this portfolio directly from me, please reply through that conversation.",
  contactButton: "Email Clopes",
  transcript: "Read transcript",
  download: "Download audio",
  audioFallback: "Your browser doesn’t support this audio player.",
  metaTitle: "Clopes — Voice acting & narration",
  metaDescription:
    "Voice acting and narration by Clopes. A developing spoken-word portfolio, with training and audition context.",
  aboutMeta: "About Clopes — Voice acting & narration",
  footer: "A voice in progress.",
};
export type VoiceCopy = { [Key in keyof typeof english]: string };
export const voiceCopy: Record<Locale, VoiceCopy> = {
  "en-US": english,
  "pt-BR": {
    brand: "Clopes / Voz",
    role: "Dublagem, interpretação e narração",
    listen: "Ouça",
    about: "Sobre mim",
    inquiries: "Contato",
    language: "Idioma do portfólio",
    skip: "Pular para o conteúdo",
    homeLink: "Site pessoal",
    hero: "Uma voz para",
    heroEmphasis: "contar histórias.",
    intro:
      "Narração, personagens e a descoberta da própria voz. Sou Clopes, iniciante em interpretação de voz, fazendo aulas e começando a participar de testes.",
    listenHeading: "Espaço de escuta",
    sampleLabel: "Amostras de voz",
    emptyTitle: "Ainda não há amostras públicas de voz.",
    emptyDescription:
      "Ainda não há gravações públicas por aqui. As amostras de narração e de personagens vão aparecer neste espaço quando estiverem prontas.",
    narration: "Narração",
    character: "Personagens e dublagem",
    commercial: "Narração comercial e informativa",
    preparing: "Ainda não disponível",
    trainingLabel: "Por trás do microfone",
    trainingTitle: "Aprendendo na prática.",
    training:
      "Faço aulas de dublagem e interpretação de voz desde o início de 2026. O curso também inclui, de vez em quando, cenas dedicadas inteiramente à narração.",
    auditions:
      "Comecei a participar de testes, incluindo um de narração de audiolivro em que li um trecho de Bloodbound Legacy, meu livro ainda não publicado.",
    details: "Para a sua produção",
    languages: "Idiomas e sotaques",
    languagesEmpty:
      "Os idiomas e sotaques de atuação ainda não foram informados.",
    setup: "Estrutura de gravação",
    setupEmpty: "Os detalhes de gravação ainda não foram adicionados.",
    credits: "Trabalhos realizados",
    contactTitle: "Vamos conversar sobre a voz que você procura.",
    contactBody:
      "Para testes de elenco e projetos de narração, conte o tipo de projeto, o idioma, a duração aproximada, onde o áudio será usado e o prazo.",
    contactEmpty:
      "Ainda não há um e-mail público de contato. Se você recebeu este portfólio diretamente de mim, responda pela mesma conversa.",
    contactButton: "Enviar e-mail para Clopes",
    transcript: "Ler transcrição",
    download: "Baixar áudio",
    audioFallback:
      "Seu navegador não oferece suporte a este reprodutor de áudio.",
    metaTitle: "Clopes — Dublagem, interpretação e narração",
    metaDescription:
      "Dublagem, interpretação de voz e narração com Clopes. Um portfólio em construção, com informações sobre aulas e testes.",
    aboutMeta: "Sobre Clopes — Dublagem, interpretação e narração",
    footer: "Uma voz em construção.",
  },
};
