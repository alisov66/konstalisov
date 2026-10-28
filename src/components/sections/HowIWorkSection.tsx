import WorkflowCard from "@/components/ui/WorkflowCard";
import { workflowIntroduction, workflowSteps } from "@/data/workflow";
import { typography, typeStyle } from "@/styles";

export default function HowIWorkSection() {
  return (
    <section className="page-band" id="how-i-work" aria-labelledby="how-i-work-title">
      <div className="page-container">
        <div className="section-title">
          <h2 id="how-i-work-title" style={typeStyle(typography.heading.h2)}>How I work</h2>
          <p style={typeStyle(typography.body.m)}>{workflowIntroduction}</p>
        </div>
        <ol className="workflow-grid" role="list">
          {workflowSteps.map((step) => <WorkflowCard key={step.number} step={step} />)}
        </ol>
      </div>
    </section>
  );
}
