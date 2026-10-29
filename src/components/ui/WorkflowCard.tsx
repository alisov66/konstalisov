import type { WorkflowStep } from "@/data/workflow";
import { typography, typeStyle } from "@/styles";
import TextLink from "./TextLink";

export default function WorkflowCard({ step }: { step: WorkflowStep }) {
  return (
    <li className="workflow-card">
      <h3 style={typeStyle(typography.heading.h5)}>{step.title}</h3>
      <p style={typeStyle(typography.body.s)}>{step.description}</p>
      {step.link && <TextLink href={step.link.href}>{step.link.label}</TextLink>}
    </li>
  );
}
