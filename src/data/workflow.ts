export type WorkflowStep = {
  number: string;
  title: string;
  description: string;
  artwork?: "understand" | "explore" | "prototype" | "patterns";
  link?: { label: string; href: string };
};

export const workflowIntroduction = "My approach adapts to the problem. I revisit these activities as research, testing, and implementation reveal something new.";

export const workflowSteps: readonly WorkflowStep[] = [
  {
    "number": "01",
    "title": "Understand the problem",
    "artwork": "understand",
    "description": "I explore user needs, business goals, and the product\u2019s domain through research and conversations. With the team, I separate evidence from assumptions and identify the questions we need to answer before deciding what to design."
  },
  {
    "number": "02",
    "title": "Structure the complexity",
    "artwork": "explore",
    "description": "I map journeys, workflows, and dependencies to make complex problems easier to discuss. Together with product managers and engineers, I clarify scope, constraints, and edge cases, and agree on which problems to address first.",
    "link": {
      "label": "See the data-mapping redesign \u2192",
      "href": "/case-studies/data-mapping"
    }
  },
  {
    "number": "03",
    "title": "Explore and challenge",
    "artwork": "prototype",
    "description": "I compare approaches and explain their trade-offs. I use AI to question assumptions, explore alternatives, and build working interfaces, checking the results against user needs, technical constraints, and the project\u2019s context.",
    "link": {
      "label": "How I built this portfolio with AI \u2192",
      "href": "/case-studies/portfolio-design-to-production"
    }
  },
  {
    "number": "04",
    "title": "Prototype and test",
    "description": "I turn ideas into prototypes and test them with users. I look for misunderstandings, friction, and missing states, then use what I learn to refine the flow, interactions, and details before implementation.",
    "link": {
      "label": "See how I tested the payment flow \u2192",
      "href": "/case-studies/mass-payout"
    }
  },
  {
    "number": "05",
    "title": "Build reusable patterns",
    "artwork": "patterns",
    "description": "I reuse and extend the design library with components, variants, and shared styles. I document behavior, states, and usage so designers and engineers can build consistent experiences and adapt them as the product grows."
  },
  {
    "number": "06",
    "title": "Support implementation",
    "description": "I work with engineers to resolve details, review the implemented experience, and adapt to technical constraints. After release, I use available feedback to identify problems, refine interactions, and decide what needs further improvement."
  }
];
