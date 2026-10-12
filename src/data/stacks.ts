export type CodeLevel = "none" | "some" | "comfortable";

export interface StackStep {
  id: string;
  role: string;
  /** Only shown when the visitor is at least this comfortable with code. */
  minLevel?: CodeLevel;
}

export interface StarterStack {
  id: string;
  goal: string;
  label: string;
  result: string;
  why: string;
  firstAction: string;
  tools: StackStep[];
}

export const CODE_LEVELS: { id: CodeLevel; label: string; hint: string }[] = [
  { id: "none", label: "No code, please", hint: "Show me the click-and-type tools." },
  { id: "some", label: "I can follow along", hint: "Light code is fine with a guide." },
  { id: "comfortable", label: "Bring on the code", hint: "Include the optional technical tools." },
];

const order: CodeLevel[] = ["none", "some", "comfortable"];
export const levelAllows = (level: CodeLevel, min?: CodeLevel) =>
  !min || order.indexOf(level) >= order.indexOf(min);

export const STARTER_STACKS: StarterStack[] = [
  { id: "plan", label: "Planning an idea", goal: "I have an idea, but I need a plan.", result: "A project outline with an audience, purpose, and next steps.", why: "Talk it out first, then write it down somewhere you can share and edit.", firstAction: "Tell ChatGPT who it’s for and what problem it solves, then paste the outline into a Google Doc.", tools: [{ id: "chatgpt", role: "Shape the idea and draft the plan in your voice." }, { id: "google-docs", role: "Hold the plan so you and others can edit it." }] },
  { id: "landing", label: "Building a landing page", goal: "I want a landing page.", result: "A page people can click through and give feedback on.", why: "Get the words right first, then turn the description into something visible.", firstAction: "Ask ChatGPT for a headline, three benefits, and a call to action, then describe that page in Lovable.", tools: [{ id: "chatgpt", role: "Write the headline, sections, and call to action." }, { id: "lovable", role: "Turn that description into a page you can click through." }] },
  { id: "visuals", label: "Creating business visuals", goal: "I need visuals for my business.", result: "A visual direction and branded assets.", why: "Collect the look before you make anything, so the designs stay consistent.", firstAction: "Save ten pins to one board, pick two colors from it, and make one Canva graphic with them.", tools: [{ id: "pinterest", role: "Gather references and spot the look you want." }, { id: "canva", role: "Make the actual graphics with your colors and fonts." }, { id: "krea", role: "Optional: try AI visuals when you need a fresh concept." }] },
  { id: "data", label: "Exploring data", goal: "I want to work with data.", result: "A cleaned sample dataset and a useful finding.", why: "Start with real sample data and a familiar spreadsheet; add code when the cleanup gets repetitive.", firstAction: "Download one Kaggle dataset, open it in Google Sheets, and write one question you want it to answer.", tools: [{ id: "kaggle", role: "Find a sample dataset to practice with." }, { id: "google-sheets", role: "Sort, filter, and look for a first finding." }, { id: "python", role: "Optional: clean the data with repeatable code.", minLevel: "some" }, { id: "colab", role: "Optional: run that Python without installing anything.", minLevel: "some" }] },
  { id: "automate", label: "Automating a repetitive task", goal: "I’m tired of doing this manually.", result: "One repeatable task turned into a workflow.", why: "Pick one task you repeat. If it lives in Google tools, script it; if it spans apps, connect them visually.", firstAction: "Write the task as steps (“when X happens, do Y”) and build just the first step.", tools: [{ id: "google-sheets", role: "Where the repeated work usually starts." }, { id: "apps-script", role: "Automate steps inside Google Workspace.", minLevel: "some" }, { id: "make", role: "Or connect apps visually without writing code." }] },
  { id: "app", label: "Building an app with accounts", goal: "I want an app with accounts.", result: "A prototype with stored data and sign-in, ready for testing.", why: "An app with accounts needs a front end, a backend that remembers things, and a home for the code.", firstAction: "List what a signed-in person can do in your app, then describe the first screen in Lovable.", tools: [{ id: "lovable", role: "Build the screens people click through." }, { id: "supabase", role: "Store the data and handle sign-in." }, { id: "github", role: "Keep the code and its history safe." }] },
  { id: "portfolio", label: "Showing a portfolio", goal: "I want to show what I built.", result: "The code, the story, and a way to find both.", why: "People need to see the work, hear the story, and find it from one place.", firstAction: "Write a README for one project, make a three-slide Pitch deck about it, and link both from Bio Sites.", tools: [{ id: "github", role: "Show the code and how it came together." }, { id: "pitch", role: "Tell the story: the problem, what you built, why it matters." }, { id: "bio-sites", role: "Give people one link to find everything." }] },
];
