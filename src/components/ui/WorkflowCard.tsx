import type { WorkflowStep } from "@/data/workflow";
import { typography, typeStyle } from "@/styles";
import TextLink from "./TextLink";

export default function WorkflowCard({ step }: { step: WorkflowStep }) {
  return (
    <li className="workflow-card">
      <span className="workflow-card__number" aria-hidden="true" style={typeStyle(typography.heading.h5)}>{step.number}</span>
      <div className="workflow-card__text">
        <h3 style={typeStyle(typography.heading.h4)}>{step.title}</h3>
        <p style={typeStyle(typography.body.m)}>{step.description}</p>
        {step.link && <TextLink href={step.link.href}>{step.link.label}</TextLink>}
      </div>
    </li>
  );
}
