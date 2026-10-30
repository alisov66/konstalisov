import ButtonPrimary from "@/components/ui/ButtonPrimary";
import ButtonSecondary from "@/components/ui/ButtonSecondary";
import ButtonContact from "@/components/ui/ButtonContact";
import InteractiveDotGrid from "@/components/ui/InteractiveDotGrid";
import CaseStudyGrid from "./CaseStudyGrid";
import { coreCaseStudies } from "@/data/case-studies";
import { emailHref, linkedInHref } from "@/data/contact";
import images from "@/data/case-study-images.json";
import { typography, typeStyle } from "@/styles";

export function HomeHero() {
  return (
    <section className="home-hero">
      <InteractiveDotGrid variant="hero" />
      <div className="page-container home-hero__content">
        <div className="home-hero__text">
          <h1 style={typeStyle(typography.heading.h1)}>Designing clarity<br />in complex systems</h1>
          <p style={typeStyle(typography.body.m)}>I take projects from understanding user needs through design to implementation, working closely with product and engineering teams.</p>
        </div>
        <div className="home-hero__actions" data-dot-grid-absorb>
          <ButtonPrimary href="/case-studies">Case studies</ButtonPrimary>
          <ButtonSecondary href="/cv">CV</ButtonSecondary>
        </div>
      </div>
    </section>
  );
}

export function MyWorkSection() {
  return (
    <section className="page-band" id="work" aria-labelledby="my-work-title">
      <div className="page-container">
        <div className="section-title">
          <h2 id="my-work-title" style={typeStyle(typography.heading.h2)}>Selected case studies</h2>
          <p style={typeStyle(typography.body.m)}>Four projects exploring the problems, decisions,<br className="desktop-break" /> and iterations behind the finished product.</p>
        </div>
        <CaseStudyGrid studies={coreCaseStudies} variant="featured" />
        <div className="section-actions"><ButtonPrimary href="/case-studies" className="w-full">View all case studies →</ButtonPrimary></div>
      </div>
    </section>
  );
}

export function HomeAboutSection() {
  return (
    <section className="page-band" id="about" aria-labelledby="about-title">
      <div className="page-container">
        <div className="section-title"><h2 id="about-title" style={typeStyle(typography.heading.h2)}>About me</h2></div>
        <div className="home-about">
          <div className="home-about__photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img {...images["home-about-portrait"]} alt="Konstantin Alisov" loading="lazy" decoding="async" sizes="(max-width: 767px) calc(100vw - 72px), (max-width: 1439px) calc((100vw - 80px) / 3 - 56px), (max-width: 1728px) calc((100vw - 240px) / 3 - 80px), 416px" />
          </div>
          <div className="home-about__content">
            <div className="home-about__text">
              <h3 style={typeStyle(typography.heading.h3)}>I enjoy figuring out<br />how complicated things work</h3>
              <div style={typeStyle(typography.body.m)}>
                <p>I’m Konstantin, a product designer based in Bilbao, Spain, with 9+ years of experience across web and mobile products.</p>
                <p>As the sole designer in product teams, I’ve worked closely with product managers and engineers to shape workflows, build reusable design systems, and carry decisions through implementation. I pay particular attention to interaction details, edge cases, and improvements informed by user feedback.</p>
                <p>I also build independently. I designed and developed this portfolio with ChatGPT and Codex, directing implementation, testing the result, and managing releases.</p>
              </div>
            </div>
            <div className="home-about__actions">
              <ButtonPrimary href="/cv">View CV</ButtonPrimary>
              <ButtonSecondary href="/case-studies/portfolio-design-to-production">How I built this portfolio</ButtonSecondary>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GetInTouchSection() {
  return (
    <section className="page-band home-contact" id="contact" aria-labelledby="contact-title">
      <div className="page-container">
        <div className="section-title"><h2 id="contact-title" style={typeStyle(typography.heading.h2)}>Get in touch</h2></div>
        <div className="home-contact__actions">
          <ButtonContact href={emailHref}>Email me</ButtonContact>
          <ButtonContact href={linkedInHref} target="_blank" rel="noopener noreferrer">LinkedIn</ButtonContact>
        </div>
      </div>
    </section>
  );
}
