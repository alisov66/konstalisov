import ButtonPrimary from "@/components/ui/ButtonPrimary";
import ButtonSecondary from "@/components/ui/ButtonSecondary";
import { typography, typeStyle } from "@/styles";
import "./not-found.css";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="page-container not-found__panel">
        <div className="not-found__description">
          <p style={typeStyle(typography.heading.h4)}>Something went wrong</p>
        </div>
        <div className="not-found__title">
          <h1>404</h1>
        </div>
        <div className="not-found__actions">
          <ButtonPrimary href="/">Go to main page</ButtonPrimary>
          <ButtonSecondary href="/case-studies">View case studies</ButtonSecondary>
        </div>
      </div>
    </main>
  );
}
