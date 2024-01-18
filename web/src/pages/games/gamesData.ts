export const games = {
  snake: {
    name: "Snake",
    url: "snake/index.html",
  },
  lightsOut: {
    name: "Lights Out",
    url: "lightsOut/index.html",
  },
  fruitCatcher: {
    name: "Fruit Catcher",
    url: "fruitCatcher/index.html",
  },
  plumber: {
    name: "Plumber",
    url: "plumber/index.html",
  },
} as const;

export const isGameKey = (name: string): name is keyof typeof games => {
  return Object.keys(games).includes(name);
};
