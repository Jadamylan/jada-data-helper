/** Central site configuration. Leave a link empty ("") to hide it. */
export const SITE = {
  title: "Jada’s Build Stack",
  tagline: "From idea to “I built that.”",
  curator: "Jada Mylan Smith",
  reviewedOn: "October 2026",
  links: {
    github: "",
    instagram: "",
    website: "",
  },
};

export interface ExampleProject {
  id: string;
  name: string;
  image: string;
  alt: string;
  tools: string[];
  result: string;
  link?: string;
}

/** Add your own project screenshots here. The examples section stays hidden while this is empty. */
export const EXAMPLES: ExampleProject[] = [];
