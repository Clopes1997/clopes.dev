/** The single biography for every About page. Keep translations factually aligned. */
export const biography = {
  "en-US": {
    heading: "About me",
    name: "Clopes",
    avatarAlt:
      "Illustrated avatar of Clopes against a teal circuit-pattern background",
    introduction:
      "Hi, I’m Clopes. I make things with code, words, stories, and my voice.",
    paragraphs: [
      "I’m a software developer. Code lets me build interactive things and solve problems; writing gives me another way to create. I’m currently working on Bloodbound Legacy, an unpublished fiction book.",
      "I’ve been taking dubbing and voice acting classes since early 2026. I’m still a beginner, and I’ve started submitting auditions, including an audiobook narration audition using an excerpt from my own book. I also sing and have performed live.",
      "As a side note, I’m a tabletop RPG Dungeon Master. It’s a hobby and a way to tell stories collaboratively. I don’t have any published DM work.",
      "These interests give me different ways to make things and tell stories. Sometimes I’m at a keyboard. Sometimes I’m at a microphone. Sometimes I’m finding out what happens next with a table of players.",
    ],
  },
  "pt-BR": {
    heading: "Sobre mim",
    name: "Clopes",
    avatarAlt:
      "Avatar ilustrado de Clopes com um fundo azul-petróleo e desenhos de circuitos",
    introduction:
      "Oi, eu sou Clopes. Crio coisas com código, palavras, histórias e a minha voz.",
    paragraphs: [
      "Trabalho com desenvolvimento de software. Com código, posso criar coisas interativas e resolver problemas; a escrita é outra forma de criar. Atualmente, estou escrevendo Bloodbound Legacy, um livro de ficção ainda não publicado.",
      "Faço aulas de dublagem e interpretação de voz desde o início de 2026. Ainda sou iniciante e comecei a participar de testes para trabalhos de voz, incluindo um teste de narração de audiolivro em que li um trecho do meu próprio livro. Também canto e já me apresentei ao vivo.",
      "Como um interesse à parte, também mestro RPG de mesa. É um hobby e uma forma de contar histórias em conjunto. Não tenho trabalhos publicados como mestre.",
      "Esses interesses me dão diferentes maneiras de criar e contar histórias. Às vezes, estou diante de um teclado. Outras, de um microfone. E, às vezes, descubro o que acontece a seguir junto com uma mesa de jogadores.",
    ],
  },
} as const;
export type Locale = keyof typeof biography;
