export interface Contributor {
  id: string;
  name: string;
  merged: number;
  links: string[];
}

export const contributors: Contributor[] = [
  {
    id: "1",
    name: "Kavaljeet Singh",
    merged: 3,
    links: ["https://github.com/wiki-club-tech-uu/project/pull/101"],
  },
  {
    id: "2",
    name: "Moh. Shadab",
    merged: 3,
    links: ["https://github.com/wiki-club-tech-uu/project/pull/98"],
  },
  {
    id: "3",
    name: "Pushpit Saluja",
    merged: 2,
    links: ["https://github.com/wiki-club-tech-uu/project/pull/88"],
  },
  {
    id: "4",
    name: "Hemant Ojha",
    merged: 2,
    links: ["https://github.com/wiki-club-tech-uu/project/pull/77"],
  },
  {
    id: "5",
    name: "Vratej Diwedi",
    merged: 1,
    links: ["https://github.com/wiki-club-tech-uu/project/pull/66"],
  },
  {
    id: "6",
    name: "Vaishnavi Mishra",
    merged: 1,
    links: ["https://github.com/wiki-club-tech-uu/project/pull/55"],
  },
  {
    id: "7",
    name: "Shresth Srivastava",
    merged: 1,
    links: ["https://github.com/wiki-club-tech-uu/project/pull/49"],
  },
  {
    id: "8",
    name: "Rehan Khan",
    merged: 1,
    links: ["https://github.com/wiki-club-tech-uu/project/pull/43"],
  },
  {
    id: "9",
    name: "Shrey Jaiswal",
    merged: 1,
    links: ["https://github.com/wiki-club-tech-uu/project/pull/37"],
  },
  {
    id: "10",
    name: "Tejash Yadav",
    merged: 1,
    links: ["https://github.com/wiki-club-tech-uu/project/pull/31"],
  },
];
