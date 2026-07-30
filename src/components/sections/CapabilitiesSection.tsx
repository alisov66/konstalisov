"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import TabGroup, { type TabGroupTab } from "@/components/ui/TabGroup";
import {
  capabilities,
  defaultCapabilityId,
  getCapabilityById,
  type CapabilityId,
} from "@/data/capabilities";
import { tokens } from "@/styles/tokens";

const images = {
  msaFig1: "/capabilities/msa-fig-1.png",
  msaFig2: "/capabilities/msa-fig-2.png",
  msaFig3: "/capabilities/msa-fig-3.png",
  msaFig4: "/capabilities/msa-fig-4.png",
  msaFig5: "/capabilities/msa-fig-5.png",
  msaFig6: "/capabilities/msa-fig-6.png",
  dataMappingFig1: "/capabilities/data-mapping-1.png",
  dataMappingFig2: "/capabilities/data-mapping-2.png",
  dataMappingFig3: "/capabilities/data-mapping-3.png",
  dataMappingFig4: "/capabilities/data-mapping-4.png",
  dataMappingFig5: "/capabilities/data-mapping-5.png",
  dataMappingFig6: "/capabilities/data-mapping-6.png",
  dataMappingFig7: "/capabilities/data-mapping-7.png",
  headerArchitecture: "/capabilities/header-architecture.png",
  dialogHeader: "/capabilities/dialog-header.png",
  sheetHeader: "/capabilities/sheet-header.png",
  workspaceHeader: "/capabilities/workspace-header.png",
  hierarchy: "/capabilities/hierarchy.png",
  msaHeader: "/capabilities/msa-header.png",
  complexDecisions1: "/capabilities/complex-decisions-1.png",
  complexDecisions2: "/capabilities/complex-decisions-2.png",
  complexDecisions3: "/capabilities/complex-decisions-3.png",
  complexDecisions4: "/capabilities/complex-decisions-4.png",
  scalingPlatforma1: "/capabilities/scaling-platforma-1.png",
  scalingPlatforma2: "/capabilities/scaling-platforma-2.png",
  scalingPlatforma3: "/capabilities/scaling-platforma-3.png",
  scalingPlatforma4: "/capabilities/scaling-platforma-4.png",
  financialOps1: "/capabilities/financial-ops-1.png",
  financialOps2: "/capabilities/financial-ops-2.png",
  financialOps3: "/capabilities/financial-ops-3.png",
  financialOps4: "/capabilities/financial-ops-4.png",
  financialOps5: "/capabilities/financial-ops-5.png",
  financialOps6: "/capabilities/financial-ops-6.png",
  financialOps7: "/capabilities/financial-ops-7.png",
};

const tabs: TabGroupTab[] = capabilities.map((capability) => ({
  href: `/capabilities/${capability.id}`,
  id: capability.id,
  label: capability.label,
}));

const headerClearance = 136;

type StyleVars = CSSProperties & Record<`--${string}`, string | number>;

function typeStyle(token: {
  fontSize: string | number;
  lineHeight: string | number;
  fontWeight: string | number;
}) {
  return {
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    fontWeight: token.fontWeight,
  };
}

function Gap({ size }: { size: string }) {
  return <div aria-hidden style={{ height: size }} />;
}

function Paragraph({ children }: { children: ReactNode }) {
  return (
    <p
      className="max-w-full"
      style={{
        ...typeStyle(tokens.typography.article.paragraph),
        marginBottom: tokens.spacing.base[3],
      }}
    >
      {children}
    </p>
  );
}

function CopyBlock({ children }: { children: ReactNode }) {
  return <div className="[&_p:last-child]:mb-0">{children}</div>;
}

function List({ children }: { children: ReactNode }) {
  return (
    <ul
      className="list-disc"
      style={{
        ...typeStyle(tokens.typography.article.paragraph),
        marginBottom: tokens.spacing.base[3],
        paddingLeft: "30px",
      }}
    >
      {children}
    </ul>
  );
}

function ArticleImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const hasExplicitWidth = /\bw-(?:\[|full\b)/.test(className || "");

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={[
        "block object-contain",
        hasExplicitWidth ? "" : "w-full",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      src={src}
    />
  );
}

function H1({ children }: { children: ReactNode }) {
  return (
    <h3 style={typeStyle(tokens.typography.article.h1)}>
      {children}
    </h3>
  );
}

function H2({ children }: { children: ReactNode }) {
  return (
    <h4 style={typeStyle(tokens.typography.article.h2)}>
      {children}
    </h4>
  );
}

function H3({ children }: { children: ReactNode }) {
  return (
    <h5 style={typeStyle(tokens.typography.article.h3)}>
      {children}
    </h5>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <H2>{title}</H2>
      <Gap size={tokens.spacing.article.h2Gap} />
      {children}
    </section>
  );
}

function Subsection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <H3>{title}</H3>
      <Gap size={tokens.spacing.article.h3Gap} />
      {children}
    </section>
  );
}

function ArticleShell({ children }: { children: ReactNode }) {
  return (
    <article
      className="w-full"
      style={{ maxWidth: tokens.spacing.article.maxWidth }}
    >
      {children}
    </article>
  );
}

function ComplexWorkflowArticle() {
  const labelStyle = {
    ...typeStyle(tokens.typography.article.paragraph),
    fontWeight: tokens.typography.fontWeight.semibold,
  };

  return (
    <div className="flex flex-col">
      <ArticleShell>
        <H1>MSA workspace</H1>
        <Gap size={tokens.spacing.article.h1Gap} />

        <Section title="Context">
          <CopyBlock>
            <Paragraph>
              MSA Workspace is an analytical environment for exploring sequence
              alignments through multiple synchronized visualizations.
            </Paragraph>
            <Paragraph>
              Researchers use it to inspect sequence patterns, metadata
              relationships, diversity metrics, and evolutionary relationships
              while frequently switching focus throughout the analysis process.
            </Paragraph>
          </CopyBlock>
          <Gap size={tokens.spacing.article.mediaGap} />
          <ArticleImage
            alt="MSA workspace overview"
            className="aspect-[2428/1558]"
            src={images.msaFig1}
          />
        </Section>

        <Gap size={tokens.spacing.article.sectionGap} />

        <Section title="Insights">
          <CopyBlock>
            <Paragraph>
              The design was informed through customer discussions, product
              exploration sessions, and observation of real analysis workflows.
            </Paragraph>
            <Paragraph>Key themes included:</Paragraph>
            <List>
              <li>Different researchers focus on different aspects of the same dataset.</li>
              <li>Analytical priorities change throughout the investigation.</li>
              <li>Large alignments require both overview and detailed inspection modes.</li>
              <li>Important metadata must remain visible during navigation.</li>
            </List>
          </CopyBlock>
        </Section>

        <Gap size={tokens.spacing.article.sectionGap} />

        <Section title="Challenge">
          <CopyBlock>
            <Paragraph>
              Researchers use sequence alignments for different analytical goals,
              often within the same session. Some focus on sequence conservation
              and mutations. Others investigate metadata, diversity metrics, or
              evolutionary relationships.
            </Paragraph>
            <Paragraph>
              A single static layout could not efficiently support all workflows.
            </Paragraph>
            <Paragraph>
              The challenge was to design a workspace that could adapt to
              different research tasks while preserving context and avoiding
              unnecessary visual complexity.
            </Paragraph>
          </CopyBlock>
        </Section>

        <Gap size={tokens.spacing.article.sectionGap} />

        <Section title="Design principles">
          <CopyBlock>
            <Paragraph>
              Rather than creating separate tools for different analysis tasks, I
              focused on building a flexible workspace that adapts to the user’s
              objective.
            </Paragraph>
            <Paragraph>The design was guided by four principles:</Paragraph>
          </CopyBlock>
          <Gap size={tokens.spacing.article.subsectionGap} />
          <Subsection title="Adaptability">
            <Paragraph>
              The workspace should support different analytical goals without
              requiring separate interfaces.
            </Paragraph>
          </Subsection>
          <Gap size={tokens.spacing.article.subsectionGap} />
          <Subsection title="Progressive detail">
            <Paragraph>
              Users should be able to switch between overview and detailed
              inspection modes.
            </Paragraph>
          </Subsection>
          <Gap size={tokens.spacing.article.subsectionGap} />
          <Subsection title="Context preservation">
            <Paragraph>
              Important metadata should remain accessible while navigating large
              datasets.
            </Paragraph>
          </Subsection>
          <Gap size={tokens.spacing.article.subsectionGap} />
          <Subsection title="User control">
            <Paragraph>
              Researchers should be able to customize the workspace according to
              their investigation needs.
            </Paragraph>
          </Subsection>
        </Section>

        <Gap size={tokens.spacing.article.sectionGap} />

        <Section title="Key improvements">
          <Subsection title="One workspace, multiple analytical tasks">
            <CopyBlock>
              <Paragraph>
                Designed the workspace as a collection of independent analytical
                layers rather than a fixed visualization.
              </Paragraph>
              <Paragraph>Researchers can enable or disable:</Paragraph>
              <List>
                <li>Trees</li>
                <li>Metadata columns</li>
                <li>Heatmaps</li>
                <li>Consensus views</li>
                <li>Sequence logos</li>
              </List>
              <Paragraph>
                Depending on the analysis objective. This allows the same
                workspace to support different research workflows without
                requiring separate tools or layouts.
              </Paragraph>
            </CopyBlock>
          </Subsection>
          <Gap size={tokens.spacing.article.mediaGap} />
          <ArticleImage
            alt="MSA workspace analytical layers"
            className="aspect-[2428/1558]"
            src={images.msaFig2}
          />
          <Gap size={tokens.spacing.article.mediaGap} />
          <Gap size={tokens.spacing.article.subsectionGap} />

          <Subsection title="Progressive detail through density controls">
            <CopyBlock>
              <Paragraph>
                Sequence alignments often contain hundreds of rows and thousands
                of positions.
              </Paragraph>
              <Paragraph>
                Showing maximum detail at all times creates unnecessary visual
                noise and makes navigation more difficult.
              </Paragraph>
              <Paragraph>
                Introduced collapsible states for both the heatmap and alignment grid.
              </Paragraph>
              <Paragraph>Researchers can switch between:</Paragraph>
              <List>
                <li>Overview mode for pattern recognition.</li>
                <li>Detailed mode for sequence-level inspection.</li>
              </List>
            </CopyBlock>
          </Subsection>
          <Gap size={tokens.spacing.article.mediaGap} />
          <p style={labelStyle}>Heatmap</p>
          <Gap size={tokens.spacing.article.mediaToCaptionGap} />
          <ArticleImage
            alt="Expanded heatmap mode"
            className="aspect-[2428/1558]"
            src={images.msaFig3}
          />
          <Gap size={tokens.spacing.article.mediaToCaptionGap} />
          <List>
            <li>Expanded mode reveals labels and detailed values.</li>
          </List>
          <Gap size={tokens.spacing.article.mediaGap} />
          <ArticleImage
            alt="Collapsed heatmap mode"
            className="aspect-[2428/1558]"
            src={images.msaFig4}
          />
          <Gap size={tokens.spacing.article.mediaToCaptionGap} />
          <List>
            <li>Collapsed mode compresses cells into a fixed-width overview.</li>
          </List>
          <Gap size={tokens.spacing.article.mediaGap} />
          <p style={labelStyle}>Alignment grid</p>
          <Gap size={tokens.spacing.article.mediaToCaptionGap} />
          <ArticleImage
            alt="Expanded alignment grid mode"
            className="aspect-[2428/1558]"
            src={images.msaFig5}
          />
          <Gap size={tokens.spacing.article.mediaToCaptionGap} />
          <List>
            <li>Expanded mode supports detailed sequence inspection.</li>
          </List>
          <Gap size={tokens.spacing.article.mediaGap} />
          <ArticleImage
            alt="Collapsed alignment grid mode"
            className="aspect-[2424/1554]"
            src={images.msaFig6}
          />
          <Gap size={tokens.spacing.article.mediaToCaptionGap} />
          <List>
            <li>
              Collapsed mode removes sequence characters and displays alignment
              patterns at scale.
            </li>
          </List>
          <Gap size={tokens.spacing.article.subsectionGap} />

          <Subsection title="Persistent context during exploration">
            <Paragraph>
              Researchers frequently compare alignment patterns against metadata
              while navigating large datasets horizontally. Without persistent
              context, important metadata quickly disappears from view.
              Introduced pinnable metadata columns that remain visible while
              exploring the alignment. Researchers can maintain context without
              interrupting navigation.
            </Paragraph>
          </Subsection>
          <Gap size={tokens.spacing.article.mediaGap} />
          <ArticleImage
            alt="Pinned metadata columns"
            className="aspect-[2424/1554] opacity-20"
            src={images.msaFig6}
          />
          <Gap size={tokens.spacing.article.mediaToCaptionGap} />
          <List>
            <li>Pinned</li>
          </List>
          <Gap size={tokens.spacing.article.mediaGap} />
          <ArticleImage
            alt="Unpinned metadata columns"
            className="aspect-[2424/1554] opacity-20"
            src={images.msaFig6}
          />
          <Gap size={tokens.spacing.article.mediaToCaptionGap} />
          <List>
            <li>Unpinned</li>
          </List>
        </Section>

        <Gap size={tokens.spacing.article.sectionGap} />

        <Section title="My role">
          <Paragraph>
            Led the design of the MSA Workspace end-to-end, including workflow
            architecture, interaction design, information density strategies,
            component design, and developer documentation. Worked closely with
            engineering throughout implementation and validation.
          </Paragraph>
        </Section>

        <Gap size={tokens.spacing.article.sectionGap} />

        <Section title="Outcome">
          <Paragraph>
            Created a flexible analytical environment that supports multiple
            sequence analysis workflows while balancing information density,
            context preservation, and usability. The workspace adapts to
            different research goals without forcing researchers to switch
            between separate tools or interfaces.
          </Paragraph>
        </Section>
      </ArticleShell>

      <Gap size={tokens.spacing.article.chapterGap} />

      <ArticleShell>
        <H1>Data mapping</H1>
        <Gap size={tokens.spacing.article.h1Gap} />

        <Section title="Context">
          <Paragraph>
            Data Mapping controls what information appears on visualizations and
            how it is represented. Users connect metadata to chart variables
            before analysis can begin.
          </Paragraph>
          <Gap size={tokens.spacing.article.mediaGap} />
          <ArticleImage
            alt="Data mapping interface"
            className="aspect-[1368/1648] w-[450px] max-w-full"
            src={images.dataMappingFig1}
          />
        </Section>

        <Gap size={tokens.spacing.article.sectionGap} />

        <Section title="Insights">
          <CopyBlock>
            <Paragraph>
              The redesign was informed by recurring feedback collected through
              customer webinars, one-on-one discussions, and support requests.
            </Paragraph>
            <Paragraph>Key themes included:</Paragraph>
            <List>
              <li>Difficulty discovering relevant metadata.</li>
              <li>Uncertainty about variable compatibility.</li>
              <li>High effort required to configure visualizations.</li>
            </List>
          </CopyBlock>
        </Section>

        <Gap size={tokens.spacing.article.sectionGap} />

        <Section title="Challenge">
          <CopyBlock>
            <Paragraph>
              As the number of available metadata fields grew, finding the right
              variables and understanding compatibility rules became increasingly
              difficult.
            </Paragraph>
            <Paragraph>
              Rather than simplifying the workflow by removing functionality, I
              focused on making complexity easier to navigate. The redesign was
              guided by four principles: discoverability, guidance, clarity, and
              flexibility.
            </Paragraph>
          </CopyBlock>
        </Section>

        <Gap size={tokens.spacing.article.sectionGap} />

        <Section title="Key improvements">
          <Subsection title="Faster discovery">
            <CopyBlock>
              <Paragraph>
                Organized variables by biological meaning rather than presenting
                a flat list.
              </Paragraph>
              <Paragraph>Examples:</Paragraph>
              <List>
                <li>Sequence & Structure</li>
                <li>V(D)J Annotation</li>
                <li>SHM & Maturation</li>
                <li>Clustering & Diversity</li>
              </List>
            </CopyBlock>
          </Subsection>
          <Gap size={tokens.spacing.article.mediaGap} />
          <ArticleImage
            alt="Data mapping variables grouped by biological meaning"
            className="aspect-[1472/1624] w-[450px] max-w-full"
            src={images.dataMappingFig2}
          />
          <Gap size={tokens.spacing.article.mediaGap} />
          <Gap size={tokens.spacing.article.subsectionGap} />

          <Subsection title="Intelligent compatibility guidance">
            <Paragraph>
              Introduced bidirectional guidance between metadata variables and
              visualization targets.
            </Paragraph>
          </Subsection>
          <Gap size={tokens.spacing.article.mediaGap} />
          <ArticleImage
            alt="Compatible targets highlighted from a variable"
            className="aspect-[450/432.426] w-[450px] max-w-full"
            src={images.dataMappingFig3}
          />
          <Gap size={tokens.spacing.article.mediaToCaptionGap} />
          <List>
            <li>Hover a variable → compatible targets are highlighted.</li>
          </List>
          <Gap size={tokens.spacing.article.mediaGap} />
          <ArticleImage
            alt="Compatible variables highlighted from a target"
            className="aspect-[450/732.781] w-[450px] max-w-full"
            src={images.dataMappingFig4}
          />
          <Gap size={tokens.spacing.article.mediaToCaptionGap} />
          <List>
            <li>
              Select a target → compatible variables are highlighted as
              Recommended, Supported, or Forbidden.
            </li>
          </List>
          <Gap size={tokens.spacing.article.mediaGap} />
          <Gap size={tokens.spacing.article.subsectionGap} />

          <Subsection title="Suggested Variables">
            <Paragraph>
              Surfaced the most relevant variables to help users get started
              faster.
            </Paragraph>
          </Subsection>
          <Gap size={tokens.spacing.article.mediaGap} />
          <ArticleImage
            alt="Suggested variables"
            className="aspect-[450/473.547] w-[450px] max-w-full"
            src={images.dataMappingFig5}
          />
          <Gap size={tokens.spacing.article.mediaGap} />
          <Gap size={tokens.spacing.article.subsectionGap} />

          <Subsection title="More Explicit Actions">
            <Paragraph>
              Changed ambiguous drag-and-drop instructions into clearer guidance.
            </Paragraph>
          </Subsection>
          <Gap size={tokens.spacing.article.mediaGap} />
          <ArticleImage
            alt="More explicit data mapping actions"
            className="aspect-[450/83.721] w-[450px] max-w-full"
            src={images.dataMappingFig6}
          />
          <Gap size={tokens.spacing.article.mediaGap} />
          <Gap size={tokens.spacing.article.subsectionGap} />

          <Subsection title="Clear mental model">
            <CopyBlock>
              <Paragraph>
                Renamed technical labels to better reflect user goals.
              </Paragraph>
              <Paragraph>Before:</Paragraph>
              <List>
                <li>Data Mapping</li>
                <li>Chart Variables</li>
              </List>
              <Paragraph>After:</Paragraph>
              <List>
                <li>Variables</li>
                <li>Visual Mapping</li>
              </List>
            </CopyBlock>
          </Subsection>
          <Gap size={tokens.spacing.article.mediaGap} />
          <ArticleImage
            alt="Renamed data mapping labels"
            className="aspect-[450/183.482] w-[450px] max-w-full"
            src={images.dataMappingFig7}
          />
        </Section>

        <Gap size={tokens.spacing.article.sectionGap} />

        <Section title="My role">
          <Paragraph>
            Led the redesign end-to-end, from problem discovery and workflow
            architecture to interaction design, information architecture, and
            validation.
          </Paragraph>
        </Section>

        <Gap size={tokens.spacing.article.sectionGap} />

        <Section title="Outcome">
          <Paragraph>
            Transformed Data Mapping from a configuration-heavy interface into a
            guided workflow that helps researchers discover relevant metadata,
            understand compatibility rules, and build visualizations more
            efficiently.
          </Paragraph>
        </Section>
      </ArticleShell>
    </div>
  );
}

function DesignSystemsArticle() {
  return (
    <ArticleShell>
      <H1>Scalable header architecture</H1>
      <Gap size={tokens.spacing.article.h1Gap} />

      <Section title="Context">
        <CopyBlock>
          <Paragraph>
            Platforma contains a growing collection of analytical tools,
            dialogs, side sheets, and full-screen workspaces.
          </Paragraph>
          <Paragraph>
            As new features were introduced, headers evolved independently.
            Similar interfaces used different hierarchy levels, layouts, and
            action placements.
          </Paragraph>
          <Paragraph>
            The development of the MSA Workspace introduced new requirements,
            including workspace controls, graph-building actions, and workspace
            collapse behavior that existing header patterns could not support
            consistently.
          </Paragraph>
        </CopyBlock>
      </Section>

      <Gap size={tokens.spacing.article.mediaGap} />
      <ArticleImage
        alt="Scalable header architecture"
        className="aspect-[1776/1760] w-[450px] max-w-full"
        src={images.headerArchitecture}
      />
      <Gap size={tokens.spacing.article.mediaGap} />
      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Insights">
        <CopyBlock>
          <Paragraph>Product exploration revealed two recurring problems:</Paragraph>
          <List>
            <li>Similar interfaces used different header structures and interaction patterns.</li>
            <li>New analytical workflows required increasingly sophisticated header behavior.</li>
          </List>
          <Paragraph>
            Without a shared system, every new feature risked introducing
            another custom variation.
          </Paragraph>
        </CopyBlock>
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Challenge">
        <CopyBlock>
          <Paragraph>
            Design a scalable header architecture that supports different
            interface contexts while remaining flexible enough for future
            analytical workflows.
          </Paragraph>
          <Paragraph>
            The solution needed to work across dialogs, side sheets, and complex
            workspaces without forcing all experiences into a single component.
          </Paragraph>
        </CopyBlock>
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Key improvements">
        <Subsection title="Header architecture instead of a single component">
          <Paragraph>
            Rather than creating a universal header component, I introduced a
            family of specialized patterns designed for different interface
            contexts.
          </Paragraph>
        </Subsection>
        <Gap size={tokens.spacing.article.mediaGap} />
        <Paragraph>Dialog header</Paragraph>
        <ArticleImage
          alt="Dialog header pattern"
          className="aspect-[2984/1904]"
          src={images.dialogHeader}
        />
        <Gap size={tokens.spacing.article.mediaGap} />
        <Paragraph>Sheet header</Paragraph>
        <ArticleImage
          alt="Sheet header pattern"
          className="aspect-[2984/1904]"
          src={images.sheetHeader}
        />
        <Gap size={tokens.spacing.article.mediaGap} />
        <Paragraph>Workspace header</Paragraph>
        <ArticleImage
          alt="Workspace header pattern"
          className="aspect-[2984/1904]"
          src={images.workspaceHeader}
        />

        <Gap size={tokens.spacing.article.mediaGap} />
        <Gap size={tokens.spacing.article.subsectionGap} />

        <Subsection title="Consistent hierarchy across the platform">
          <CopyBlock>
            <Paragraph>
              Defined a hierarchy model that communicates the scope of each
              interface context.
            </Paragraph>
            <Paragraph>
              Workspace Header uses H2 for analytical environments. Dialog
              Header also uses H2 for primary task contexts. Sheet Header uses
              H3 to signal a subordinate context within a workspace.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={tokens.spacing.article.mediaGap} />
        <ArticleImage
          alt="Header hierarchy model"
          className="aspect-[2790/902]"
          src={images.hierarchy}
        />

        <Gap size={tokens.spacing.article.mediaGap} />
        <Gap size={tokens.spacing.article.subsectionGap} />

        <Subsection title="Support for complex analytical workflows">
          <CopyBlock>
            <Paragraph>
              The MSA Workspace required functionality beyond traditional page
              headers.
            </Paragraph>
            <Paragraph>Examples include:</Paragraph>
            <List>
              <li>Workspace collapse controls</li>
              <li>Graph creation actions</li>
              <li>Analysis-specific controls</li>
              <li>Dynamic action groups</li>
            </List>
          </CopyBlock>
        </Subsection>
        <Gap size={tokens.spacing.article.mediaGap} />
        <ArticleImage
          alt="MSA header"
          className="aspect-[2560/460]"
          src={images.msaHeader}
        />
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Outcome">
        <CopyBlock>
          <Paragraph>
            Established a scalable header architecture that unified dialogs,
            side sheets, and analytical workspaces under a shared set of design
            principles.
          </Paragraph>
          <Paragraph>
            The system improved consistency, reduced design debt, simplified
            implementation, and created a foundation capable of supporting future
            analytical workflows.
          </Paragraph>
        </CopyBlock>
      </Section>
    </ArticleShell>
  );
}

function DocumentationCollaborationArticle() {
  return (
    <ArticleShell>
      <H1>Making complex product decisions understandable</H1>
      <Gap size={tokens.spacing.article.h1Gap} />

      <Section title="Context">
        <CopyBlock>
          <Paragraph>
            Platforma is used by scientists to explore and visualize complex
            biological data.
          </Paragraph>
          <Paragraph>
            The feature became a shared dependency for multiple visualization
            workflows, making consistency and implementation accuracy
            increasingly important.
          </Paragraph>
          <Paragraph>
            The Data Mapping experience evolved into a sophisticated system
            involving:
          </Paragraph>
          <List>
            <li>metadata grouping</li>
            <li>recommendation logic</li>
            <li>visualization constraints</li>
            <li>contextual guidance</li>
            <li>interaction patterns</li>
          </List>
          <Paragraph>
            As the feature grew, communicating design decisions became as
            important as designing the feature itself.
          </Paragraph>
          <Paragraph>
            Without clear documentation, implementation details, UX rationale,
            and system behavior could easily become inconsistent across teams.
          </Paragraph>
        </CopyBlock>
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Challenge">
        <CopyBlock>
          <Paragraph>
            Create documentation that allows designers and engineers to
            understand both user-facing behavior and the underlying system
            decisions.
          </Paragraph>
          <Paragraph>The documentation needed to:</Paragraph>
          <List>
            <li>communicate UX decisions clearly</li>
            <li>explain recommendation logic</li>
            <li>support developer implementation</li>
            <li>remain useful as the system evolves</li>
            <li>serve as a reference for future workflows</li>
          </List>
        </CopyBlock>
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Documentation principles">
        <Subsection title="Document decisions, not screens">
          <CopyBlock>
            <Paragraph>
              Rather than describing individual interface states, the
              documentation focuses on the underlying design decisions.
            </Paragraph>
            <Paragraph>Each section follows a consistent structure:</Paragraph>
            <List>
              <li>Problem</li>
              <li>What changed</li>
              <li>Why this improves UX</li>
            </List>
            <Paragraph>
              This makes the reasoning behind the solution easy to understand
              and revisit.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={tokens.spacing.article.mediaGap} />
        <ArticleImage
          alt="Documentation pages explaining product decisions"
          src={images.complexDecisions1}
        />
        <Gap size={tokens.spacing.article.mediaGap} />
        <Gap size={tokens.spacing.article.subsectionGap} />

        <Subsection title="Separate user value from implementation logic">
          <CopyBlock>
            <Paragraph>The documentation distinguishes between:</Paragraph>
            <List>
              <li>user-facing benefits</li>
              <li>implementation logic and system behavior</li>
            </List>
            <Paragraph>
              This separation allows stakeholders to understand the design
              intent while giving developers enough context to implement the
              solution correctly.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={tokens.spacing.article.mediaGap} />
        <ArticleImage
          alt="System logic documentation"
          className="aspect-[2514/1832]"
          src={images.complexDecisions2}
        />
        <Gap size={tokens.spacing.article.mediaGap} />
        <Gap size={tokens.spacing.article.subsectionGap} />

        <Subsection title="Explain complex behavior through progressive disclosure">
          <CopyBlock>
            <Paragraph>
              Instead of introducing all concepts at once, the documentation
              breaks interactions into small, understandable parts.
            </Paragraph>
            <Paragraph>
              The documentation introduces concepts incrementally, moving from
              simple interface improvements to advanced interaction and
              recommendation logic.
            </Paragraph>
            <Paragraph>
              Each concept is introduced independently before showing how it
              contributes to the overall experience.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={tokens.spacing.article.mediaGap} />
        <ArticleImage
          alt="Progressive disclosure documentation map"
          className="aspect-[1496/960]"
          src={images.complexDecisions3}
        />
        <Gap size={tokens.spacing.article.mediaGap} />
        <Gap size={tokens.spacing.article.subsectionGap} />

        <Subsection title="Turn feature decisions into platform knowledge">
          <Paragraph>
            The documentation captures reusable interaction patterns rather than
            feature-specific solutions. This allows future workflows to adopt
            proven approaches instead of reinventing behavior for each new
            application.
          </Paragraph>
        </Subsection>
        <Gap size={tokens.spacing.article.mediaGap} />
        <ArticleImage
          alt="Reusable platform knowledge examples"
          className="aspect-[2440/1024]"
          src={images.complexDecisions4}
        />
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Why it mattered">
        <List>
          <li>Used as a shared reference by Design and Engineering teams.</li>
          <li>Used as implementation reference.</li>
          <li>Captured UX rationale alongside specifications.</li>
          <li>Established documentation patterns for future workflows.</li>
        </List>
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="My role">
        <List>
          <li>
            Designed the Data Mapping experience, including information
            architecture, interaction patterns, and recommendation workflows.
          </li>
          <li>
            Defined a documentation framework that captures UX rationale,
            interaction behavior, and system logic separately.
          </li>
          <li>
            Created reusable documentation patterns for communicating complex
            product decisions across teams.
          </li>
          <li>
            Partnered with engineering to ensure design intent remained
            understandable throughout implementation.
          </li>
        </List>
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Outcome">
        <Paragraph>
          The project transformed feature documentation from a one-time
          specification into reusable product knowledge. The resulting framework
          helps teams understand not only what the interface does, but why it
          behaves that way, making future workflows easier to design, implement,
          and evolve.
        </Paragraph>
      </Section>
    </ArticleShell>
  );
}

function ProductDesignScaleArticle() {
  return (
    <ArticleShell>
      <H1>Scaling Platforma from startup website to enterprise product platform</H1>
      <Gap size={tokens.spacing.article.h1Gap} />
      <Paragraph>
        Platforma had grown from a startup product into a complex ecosystem of
        scientific workflows, deployment options, and developer tools. The
        website no longer reflected the scale of the platform or helped visitors
        understand how its components fit together.
      </Paragraph>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Context">
        <CopyBlock>
          <Paragraph>Platforma had evolved beyond its original positioning.</Paragraph>
          <Paragraph>
            The company was no longer an early-stage startup with a small set of
            capabilities. The platform had expanded into a comprehensive
            ecosystem including:
          </Paragraph>
          <List>
            <li>multiple scientific workflows</li>
            <li>deployment options</li>
            <li>SDK and extensibility</li>
            <li>enterprise infrastructure</li>
            <li>academic and commercial audiences</li>
          </List>
          <Paragraph>
            The existing website no longer reflected the maturity of the
            product.
          </Paragraph>
          <Paragraph>
            Information was difficult to navigate, product capabilities were
            fragmented across pages, and the overall experience did not
            communicate the scale of the platform.
          </Paragraph>
        </CopyBlock>
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Challenge">
        <CopyBlock>
          <Paragraph>Design the product ecosystem, not individual pages.</Paragraph>
          <Paragraph>
            The website was treated as a connected product ecosystem rather than
            a collection of marketing pages.
          </Paragraph>
          <Paragraph>Content was organized around:</Paragraph>
          <List>
            <li>Solutions</li>
            <li>Platform</li>
            <li>Resources</li>
            <li>Company</li>
          </List>
          <Paragraph>
            This structure helped visitors understand how individual
            capabilities relate to the broader platform.
          </Paragraph>
        </CopyBlock>
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Design principles">
        <Subsection title="Design the product ecosystem, not individual pages">
          <CopyBlock>
            <Paragraph>
              The website was treated as a connected product ecosystem rather
              than a collection of marketing pages.
            </Paragraph>
            <Paragraph>Content was organized around:</Paragraph>
            <List>
              <li>Solutions</li>
              <li>Platform</li>
              <li>Resources</li>
              <li>Company</li>
            </List>
            <Paragraph>
              This structure helped visitors understand how individual
              capabilities relate to the broader platform.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={tokens.spacing.article.mediaGap} />
        <ArticleImage
          alt="Platforma product ecosystem navigation model"
          className="aspect-[2916/672]"
          src={images.scalingPlatforma1}
        />
        <Gap size={tokens.spacing.article.mediaGap} />
        <Gap size={tokens.spacing.article.subsectionGap} />

        <Subsection title="Make complex technology understandable">
          <CopyBlock>
            <Paragraph>
              Platforma includes concepts that are unfamiliar to many visitors:
            </Paragraph>
            <List>
              <li>deployment architecture</li>
              <li>enterprise infrastructure</li>
              <li>SDK and extensibility</li>
              <li>scientific workflows</li>
            </List>
            <Paragraph>
              Rather than burying these concepts inside marketing content, the
              redesign introduced dedicated platform pages that explain how the
              system works and how its components relate to one another.
            </Paragraph>
            <Paragraph>
              This allows visitors to learn the system progressively and build a
              clearer mental model of how the platform works.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={tokens.spacing.article.mediaGap} />
        <ArticleImage
          alt="Platform overview explanation"
          className="aspect-[2760/1350]"
          src={images.scalingPlatforma2}
        />
        <Gap size={tokens.spacing.article.mediaToCaptionGap} />
        <List>
          <li>
            The Platform Overview page transformed a complex technical
            architecture into a simple mental model built around infrastructure,
            user experience, and extensibility.
          </li>
        </List>
        <Gap size={tokens.spacing.article.mediaGap} />
        <Gap size={tokens.spacing.article.subsectionGap} />

        <Subsection title="Organize content around user goals">
          <CopyBlock>
            <Paragraph>Visitors arrive with different intentions.</Paragraph>
            <Paragraph>The website needed to support:</Paragraph>
            <List>
              <li>scientists evaluating solutions</li>
              <li>technical users exploring platform capabilities</li>
              <li>enterprise buyers assessing deployment options</li>
              <li>academic users requesting access</li>
            </List>
            <Paragraph>
              Information architecture was designed around visitor intent rather
              than internal company structure, helping different audiences
              quickly reach the content most relevant to them.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={tokens.spacing.article.mediaGap} />
        <ArticleImage
          alt="Platforma visitor intent map"
          className="aspect-[1560/816]"
          src={images.scalingPlatforma3}
        />
        <Gap size={tokens.spacing.article.mediaGap} />
        <Gap size={tokens.spacing.article.subsectionGap} />

        <Subsection title="Build trust through transparency">
          <CopyBlock>
            <Paragraph>
              Enterprise customers need confidence before engaging with a
              platform.
            </Paragraph>
            <Paragraph>The redesign introduced dedicated pages explaining:</Paragraph>
            <List>
              <li>deployment models</li>
              <li>infrastructure options</li>
              <li>security considerations</li>
              <li>platform architecture</li>
              <li>open ecosystem principles</li>
            </List>
            <Paragraph>
              Rather than hiding these topics inside marketing content, the
              redesign made them visible and understandable.
            </Paragraph>
            <Paragraph>
              This reduced ambiguity and helped visitors evaluate whether
              Platforma could fit their technical and organizational
              requirements.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={tokens.spacing.article.mediaGap} />
        <ArticleImage
          alt="Platforma deployment and trust pages"
          className="aspect-[2762/1792]"
          src={images.scalingPlatforma4}
        />
        <Gap size={tokens.spacing.article.mediaToCaptionGap} />
        <List>
          <li>
            Dedicated platform and deployment pages made infrastructure,
            deployment options, and operational requirements transparent,
            helping enterprise teams evaluate Platforma with confidence.
          </li>
        </List>
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Why it mattered">
        <List>
          <li>
            Unified a fragmented product ecosystem into a coherent platform
            story.
          </li>
          <li>
            Reduced the gap between scientific workflows, platform capabilities,
            and deployment infrastructure.
          </li>
          <li>Made enterprise requirements visible and understandable.</li>
          <li>
            Created a scalable information architecture capable of supporting
            future solutions and platform growth.
          </li>
        </List>
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="My role">
        <List>
          <li>
            Led the redesign of Platforma’s website from information
            architecture through final UI design.
          </li>
          <li>
            Defined the platform information architecture, navigation model, and
            page hierarchy.
          </li>
          <li>
            Designed key product communication pages including Platform
            Overview, Deployment, SDK, Solutions, and Resources.
          </li>
          <li>
            Established a scalable structure capable of supporting future
            products, workflows, and platform growth.
          </li>
          <li>
            Collaborated with leadership, marketing, and engineering teams to
            align product messaging with business goals.
          </li>
        </List>
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Outcome">
        <CopyBlock>
          <Paragraph>
            The redesign transformed Platforma’s website from a collection of
            product pages into a structured platform ecosystem.
          </Paragraph>
          <Paragraph>The new information architecture:</Paragraph>
          <List>
            <li>
              connected scientific workflows, platform capabilities, and
              deployment infrastructure into a coherent story
            </li>
            <li>
              made technical and enterprise concepts easier to discover and
              understand
            </li>
            <li>
              created dedicated entry points for scientists, technical users,
              enterprise buyers, and academic researchers
            </li>
            <li>
              established a scalable foundation capable of supporting future
              solutions and platform growth
            </li>
          </List>
          <Paragraph>
            The result was a website that communicates Platforma as a unified
            product ecosystem rather than a collection of individual features,
            creating a foundation that can scale alongside the product itself.
          </Paragraph>
        </CopyBlock>
      </Section>
    </ArticleShell>
  );
}

function MobileExperiencesArticle() {
  return (
    <ArticleShell>
      <H1>Simplifying Financial Operations for Active TRON Users</H1>
      <Gap size={tokens.spacing.article.h1Gap} />

      <Section title="Context">
        <CopyBlock>
          <Paragraph>
            TR.ENERGY Wallet was designed for active participants of the TRON
            ecosystem who manage high transaction volumes and substantial crypto
            assets.
          </Paragraph>
          <Paragraph>
            Unlike traditional wallets focused primarily on storing and
            transferring funds, these users face additional operational
            challenges:
          </Paragraph>
          <List>
            <li>minimizing transaction costs;</li>
            <li>evaluating transaction risk;</li>
            <li>protecting wallet reputation;</li>
            <li>managing idle capital.</li>
          </List>
          <Paragraph>
            Most of these workflows are typically spread across multiple tools
            and services. Users often rely on separate applications for resource
            management, compliance checks, staking, and portfolio operations.
          </Paragraph>
          <Paragraph>
            The goal was to bring these workflows into a single mobile
            experience while keeping complex blockchain concepts understandable
            and actionable.
          </Paragraph>
        </CopyBlock>
        <Gap size={tokens.spacing.article.mediaGap} />
        <ArticleImage
          alt="TR.ENERGY wallet overview"
          className="aspect-[3344/1784]"
          src={images.financialOps1}
        />
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Challenge">
        <CopyBlock>
          <Paragraph>
            TRON provides powerful mechanisms for reducing transaction costs and
            managing assets, but many of them require users to understand
            technical concepts such as Energy, staking, and wallet reputation.
          </Paragraph>
          <Paragraph>
            As the product evolved, the challenge shifted beyond building a
            wallet.
          </Paragraph>
          <Paragraph>The challenge became:</Paragraph>
          <Paragraph>
            How might we help users manage costs, risks, and capital without
            forcing them to become blockchain experts?
          </Paragraph>
          <Paragraph>
            To answer this challenge, the product focused on three operational
            areas:
          </Paragraph>
          <List>
            <li>transaction cost optimization;</li>
            <li>risk management;</li>
            <li>capital efficiency.</li>
          </List>
        </CopyBlock>
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Key insights">
        <ArticleImage
          alt="Key insights for active TRON users"
          className="aspect-[2556/824]"
          src={images.financialOps2}
        />
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Design principles">
        <Subsection title="Make invisible information visible">
          <Paragraph>
            Surface critical blockchain information directly where decisions
            happen.
          </Paragraph>
        </Subsection>
        <Gap size={tokens.spacing.article.subsectionGap} />
        <Subsection title="Support proactive risk managment">
          <Paragraph>
            Help users identify and isolate risk before it affects primary
            assets.
          </Paragraph>
        </Subsection>
        <Gap size={tokens.spacing.article.subsectionGap} />
        <Subsection title="Keep operational workflows connected">
          <Paragraph>
            Reduce dependence on external services and fragmented experiences.
          </Paragraph>
        </Subsection>
        <Gap size={tokens.spacing.article.subsectionGap} />
        <Subsection title="Preserve context during frequent actions">
          <Paragraph>
            Allow users to complete common actions without losing sight of their
            current portfolio state.
          </Paragraph>
        </Subsection>
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Surface transaction costs before they become a problem">
        <Subsection title="Problem">
          <CopyBlock>
            <Paragraph>
              TRON transactions consume network resources known as Energy.
            </Paragraph>
            <Paragraph>
              Without sufficient Energy, users must spend TRX to cover
              transaction fees. For users making frequent USDT transfers,
              inefficient resource management can significantly increase
              operational costs.
            </Paragraph>
            <Paragraph>
              At the same time, Energy is a blockchain-specific concept that
              many users do not fully understand.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={tokens.spacing.article.mediaGap} />
        <ArticleImage
          alt="Energy availability in wallet"
          className="aspect-[450/474.468] w-[450px] max-w-full"
          src={images.financialOps3}
        />
        <Gap size={tokens.spacing.article.mediaGap} />
        <Gap size={tokens.spacing.article.subsectionGap} />
        <Subsection title="Solution">
          <CopyBlock>
            <Paragraph>
              Energy availability was surfaced directly within the portfolio
              experience alongside token balances.
            </Paragraph>
            <Paragraph>Users can immediately understand:</Paragraph>
            <List>
              <li>available Energy;</li>
              <li>estimated transaction capacity;</li>
              <li>resource consumption status.</li>
            </List>
            <Paragraph>
              The wallet also provides an integrated Energy purchase workflow,
              allowing users to acquire additional resources without leaving the
              application.
            </Paragraph>
            <Paragraph>
              Instead of navigating through external services or advanced
              blockchain settings, users can resolve transaction resource issues
              directly within the context of their assets.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={tokens.spacing.article.subsectionGap} />
        <Subsection title="Outcome">
          <Paragraph>
            The wallet transforms a complex blockchain mechanism into an
            actionable operational tool, helping users reduce transaction costs
            while maintaining a streamlined workflow.
          </Paragraph>
        </Subsection>
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Turn compliance data into actionable decisions">
        <Subsection title="Problem">
          <CopyBlock>
            <Paragraph>
              For active crypto users, asset value is only part of the equation.
            </Paragraph>
            <Paragraph>
              The reputation of incoming funds can affect future transactions,
              compliance requirements, and wallet credibility.
            </Paragraph>
            <Paragraph>
              Users receiving transfers from unknown sources need a way to
              evaluate risk before integrating assets into their primary
              holdings.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={tokens.spacing.article.subsectionGap} />
        <Subsection title="Solution">
          <Paragraph>
            The wallet introduces a proactive risk-management workflow.
          </Paragraph>
        </Subsection>
        <Gap size={tokens.spacing.article.mediaGap} />
        <ArticleImage
          alt="Risk-management workflow"
          className="aspect-[3344/1784]"
          src={images.financialOps4}
        />
        <Gap size={tokens.spacing.article.mediaGap} />
        <Gap size={tokens.spacing.article.subsectionGap} />
        <Subsection title="AML verification">
          <CopyBlock>
            <Paragraph>Users can perform compliance checks on:</Paragraph>
            <List>
              <li>their own wallets;</li>
              <li>existing assets;</li>
              <li>external wallet addresses.</li>
            </List>
            <Paragraph>
              This allows users to evaluate risk before accepting incoming
              funds.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={tokens.spacing.article.subsectionGap} />
        <Subsection title="Risk visibility">
          <CopyBlock>
            <Paragraph>
              AML results are surfaced directly within asset cards using clear
              visual indicators and risk scores.
            </Paragraph>
            <Paragraph>
              Users can identify potential issues without opening detailed
              reports.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={tokens.spacing.article.mediaGap} />
        <ArticleImage
          alt="Risk visibility in asset cards"
          className="aspect-[2518/1784]"
          src={images.financialOps5}
        />
        <Gap size={tokens.spacing.article.mediaGap} />
        <Gap size={tokens.spacing.article.subsectionGap} />
        <Subsection title="Transfer wallets">
          <CopyBlock>
            <Paragraph>
              To further reduce risk exposure, the wallet supports multiple
              accounts.
            </Paragraph>
            <Paragraph>
              A dedicated transfer wallet can be used to receive and verify
              incoming funds before moving them into primary holdings.
            </Paragraph>
            <Paragraph>
              This allows users to isolate potentially risky transactions while
              keeping trusted assets separated.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={tokens.spacing.article.subsectionGap} />
        <Subsection title="Outcome">
          <Paragraph>
            By combining AML verification with dedicated transfer wallets, the
            product supports a complete risk-management workflow-from evaluating
            external addresses before a transfer to safely integrating verified
            assets into long-term holdings.
          </Paragraph>
        </Subsection>
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Increase capital efficiency within the ecosystem">
        <ArticleImage
          alt="Staking within TR.ENERGY wallet"
          className="aspect-[450/287.664] w-[450px] max-w-full"
          src={images.financialOps6}
        />
        <Gap size={tokens.spacing.article.mediaGap} />
        <Gap size={tokens.spacing.article.subsectionGap} />
        <Subsection title="Problem">
          <CopyBlock>
            <Paragraph>
              Many users maintain significant TRX balances to support
              transaction-heavy operations and reduce transaction costs through
              Energy purchases.
            </Paragraph>
            <Paragraph>
              As a result, substantial amounts of capital often remain idle
              between transactions.
            </Paragraph>
            <Paragraph>
              At the same time, users who want to generate yield are often
              forced to move assets to external staking platforms, introducing
              additional complexity and fragmenting their financial workflows.
            </Paragraph>
            <Paragraph>
              The wallet needed a way to help users utilize idle capital without
              leaving the TR.ENERGY ecosystem.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={tokens.spacing.article.subsectionGap} />
        <Subsection title="Solution">
          <CopyBlock>
            <Paragraph>
              Staking capabilities were integrated directly into the wallet
              experience.
            </Paragraph>
            <Paragraph>Users can:</Paragraph>
            <List>
              <li>create staking positions;</li>
              <li>monitor active stakes;</li>
              <li>review earnings;</li>
              <li>unstake assets;</li>
              <li>enable automatic reward reinvestment.</li>
            </List>
            <Paragraph>
              Rather than forcing users to move funds across multiple platforms,
              the wallet allows them to manage both operational activity and
              capital utilization within a single ecosystem.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={tokens.spacing.article.subsectionGap} />
        <Subsection title="Outcome">
          <Paragraph>
            The wallet evolves beyond transaction management and becomes a
            broader asset-management platform, helping users generate additional
            value from assets already held within the product.
          </Paragraph>
        </Subsection>
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Creating a consistent interaction model">
        <Paragraph>
          As the number of operational workflows increased, a unified
          interaction pattern became necessary.
        </Paragraph>
        <Gap size={tokens.spacing.article.mediaGap} />
        <ArticleImage
          alt="Bottom sheet interaction model"
          className="aspect-[2518/1784]"
          src={images.financialOps7}
        />
        <Gap size={tokens.spacing.article.mediaGap} />
        <Gap size={tokens.spacing.article.subsectionGap} />
        <Subsection title="Problem">
          <CopyBlock>
            <Paragraph>
              As the product expanded, users needed access to an increasing
              number of contextual actions, settings, and supporting workflows.
            </Paragraph>
            <Paragraph>
              Traditional navigation patterns would require frequent screen
              transitions and increase interaction cost.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={tokens.spacing.article.subsectionGap} />
        <Subsection title="Solution">
          <CopyBlock>
            <Paragraph>
              A reusable Bottom Sheet interaction model was introduced across
              the application.
            </Paragraph>
            <Paragraph>The pattern is used for:</Paragraph>
            <List>
              <li>Energy purchases;</li>
              <li>account management;</li>
              <li>currency preferences;</li>
              <li>contextual settings;</li>
              <li>lightweight operational workflows.</li>
            </List>
            <Paragraph>
              This allows users to complete common actions without losing
              visibility of their current portfolio state.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={tokens.spacing.article.subsectionGap} />
        <Subsection title="Outcome">
          <Paragraph>
            The Bottom Sheet system became a consistent interaction foundation
            across the product, reducing navigation overhead while maintaining
            workflow continuity.
          </Paragraph>
        </Subsection>
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="My role">
        <CopyBlock>
          <Paragraph>
            As the Product Designer, I was responsible for designing key wallet
            experiences across the product, including Energy management, AML
            verification workflows, staking functionality, multi-account
            management, and the reusable interaction patterns used throughout
            the application.
          </Paragraph>
          <Paragraph>
            My work focused on translating complex blockchain concepts into
            understandable mobile workflows, helping users manage transaction
            costs, evaluate risk, and utilize capital without requiring deep
            technical knowledge of the TRON ecosystem.
          </Paragraph>
        </CopyBlock>
      </Section>

      <Gap size={tokens.spacing.article.sectionGap} />

      <Section title="Outcome">
        <CopyBlock>
          <Paragraph>
            TR.ENERGY evolved beyond a traditional crypto wallet into a
            financial operations platform for active TRON users.
          </Paragraph>
          <Paragraph>The product helps users:</Paragraph>
          <List>
            <li>optimize transaction costs through Energy management;</li>
            <li>assess and mitigate asset reputation risks;</li>
            <li>separate trusted and untrusted transaction flows;</li>
            <li>generate value from idle capital through staking;</li>
            <li>manage complex workflows without leaving the mobile experience.</li>
          </List>
          <Paragraph>
            By focusing on costs, risks, and capital efficiency, the wallet
            supports the operational realities of high-volume TRON participants
            while keeping advanced blockchain concepts accessible through a
            mobile-first experience.
          </Paragraph>
        </CopyBlock>
      </Section>
    </ArticleShell>
  );
}

function EmptyArticle({ label }: { label: string }) {
  return (
    <ArticleShell>
      <div className="flex min-h-[520px] items-center justify-center text-center">
        <div>
          <H1>{label}</H1>
          <Gap size={tokens.spacing.article.h2Gap} />
          <p
            style={{
              ...typeStyle(tokens.typography.article.paragraph),
              color: tokens.colors.text.secondary,
            }}
          >
            Article content is coming soon.
          </p>
        </div>
      </div>
    </ArticleShell>
  );
}

function ActiveArticle({ value }: { value: string }) {
  if (value === "complex-workflow-design") {
    return <ComplexWorkflowArticle />;
  }

  if (value === "design-systems") {
    return <DesignSystemsArticle />;
  }

  if (value === "documentation-collaboration") {
    return <DocumentationCollaborationArticle />;
  }

  if (value === "product-design-at-scale") {
    return <ProductDesignScaleArticle />;
  }

  if (value === "mobile-experiences") {
    return <MobileExperiencesArticle />;
  }

  const label = tabs.find((tab) => tab.id === value)?.label || "Article";
  return <EmptyArticle label={label} />;
}

export interface CapabilitiesSectionProps {
  scrollToArticleOnMount?: boolean;
  showIntroduction?: boolean;
  value?: CapabilityId;
}

export function CapabilitiesIntroduction() {
  return (
    <section className="flex w-full flex-col items-start bg-[var(--bg-beige)] px-[var(--padding-side)] pb-[var(--base-30)] pt-[var(--base-40)]">
      <div className="flex w-full max-w-[820px] flex-col items-start gap-[var(--base-6)]">
        <h1
          className="w-full text-[var(--text-primary)]"
          style={typeStyle(tokens.typography.heading.h1)}
        >
          Capabilities
        </h1>
        <p
          className="w-full text-[var(--text-primary)]"
          style={typeStyle(tokens.typography.body.medium)}
        >
          Explore the core areas of my product design practice. Each capability
          brings together one or more case studies that demonstrate how I
          approach complex product challenges — from expert workflows and
          scalable design systems to enterprise platforms and mobile
          experiences.
        </p>
      </div>
    </section>
  );
}

export default function CapabilitiesSection({
  scrollToArticleOnMount = false,
  showIntroduction = true,
  value = defaultCapabilityId,
}: CapabilitiesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const articleRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);
  const ignoreScrollUntilRef = useRef(0);
  const mobileMenuTopRef = useRef(headerClearance);
  const [mobileMenuTop, setMobileMenuTop] = useState(headerClearance);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(true);
  const currentValue = getCapabilityById(value)?.id || defaultCapabilityId;

  const sectionStyle: StyleVars = {
    "--capabilities-column-gap": "100px",
    "--capabilities-menu-width": "277px",
    "--capabilities-mobile-menu-top": `${mobileMenuTop}px`,
  };

  const scrollArticleToStart = useCallback(() => {
    const article = articleRef.current;

    if (!article) {
      return;
    }

    const html = document.documentElement;
    const top =
      article.getBoundingClientRect().top + window.scrollY - headerClearance;

    setMobileMenuVisible(true);
    ignoreScrollUntilRef.current = performance.now() + 300;
    lastScrollYRef.current = top;
    html.classList.add("no-smooth-scroll");
    window.scrollTo({ top, left: 0, behavior: "auto" });
    requestAnimationFrame(() => {
      html.classList.remove("no-smooth-scroll");
    });
  }, []);

  useEffect(() => {
    if (!scrollToArticleOnMount) {
      return;
    }

    const frame = requestAnimationFrame(scrollArticleToStart);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [scrollArticleToStart, scrollToArticleOnMount]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    let frame = 0;

    const updateMenuTop = () => {
      const headerNav = document.querySelector<HTMLElement>(
        "[data-navigation-header] nav",
      );
      const rootStyles = window.getComputedStyle(document.documentElement);
      const menuTopPadding =
        parseFloat(rootStyles.getPropertyValue("--base-10")) || 40;
      const nextMenuTop = Math.max(
        Math.ceil(headerNav?.getBoundingClientRect().bottom || headerClearance) -
          menuTopPadding,
        0,
      );

      if (nextMenuTop === mobileMenuTopRef.current) {
        return;
      }

      mobileMenuTopRef.current = nextMenuTop;
      setMobileMenuTop(nextMenuTop);
    };

    const updateVisibility = () => {
      frame = 0;
      updateMenuTop();

      if (!media.matches) {
        setMobileMenuVisible(true);
        lastScrollYRef.current = window.scrollY;
        return;
      }

      const nextScrollY = Math.max(window.scrollY, 0);
      const scrollDelta = nextScrollY - lastScrollYRef.current;
      const menuTop =
        (sectionRef.current?.getBoundingClientRect().top || 0) +
        window.scrollY;
      const stickyStart = Math.max(menuTop - mobileMenuTopRef.current, 0);
      const nextMenuPinned = nextScrollY >= stickyStart;

      if (performance.now() < ignoreScrollUntilRef.current) {
        setMobileMenuVisible(true);
        lastScrollYRef.current = nextScrollY;
        return;
      }

      if (!nextMenuPinned || nextScrollY <= 0) {
        setMobileMenuVisible(true);
      } else if (scrollDelta > 4) {
        setMobileMenuVisible(false);
      } else if (scrollDelta < -4) {
        setMobileMenuVisible(true);
      }

      lastScrollYRef.current = nextScrollY;
    };

    const scheduleUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    media.addEventListener("change", scheduleUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      media.removeEventListener("change", scheduleUpdate);
    };
  }, []);

  function handleValueChange() {
    scrollArticleToStart();
  }

  return (
    <>
      {showIntroduction ? <CapabilitiesIntroduction /> : null}
      <section
        id="work"
        className="flex w-full flex-col items-start gap-[var(--base-10)] bg-[var(--bg-beige)] px-[var(--padding-side)] lg:flex-row lg:gap-[var(--capabilities-column-gap)]"
        ref={sectionRef}
        style={sectionStyle}
      >
        <div
          className={[
            "sticky top-[var(--capabilities-mobile-menu-top)] z-40 flex w-full shrink-0 flex-col items-start gap-[var(--base-5)] bg-[var(--bg-beige)] pb-[var(--base-5)] pt-[var(--base-10)] transition-transform duration-[150ms] ease-in lg:top-[88px] lg:z-auto lg:w-[var(--capabilities-menu-width)] lg:translate-y-0 lg:pb-0",
            mobileMenuVisible ? "translate-y-0" : "-translate-y-full",
          ].join(" ")}
          ref={menuRef}
        >
          <h2
            className="text-center text-[var(--text-accent)]"
            style={typeStyle(tokens.typography.heading.h4)}
          >
            Explore
          </h2>
          <TabGroup
            className="flex-wrap items-start"
            onValueChange={handleValueChange}
            tabs={tabs}
            value={currentValue}
          />
        </div>

        <div
          ref={articleRef}
          className="flex min-w-0 flex-1 scroll-mt-[var(--base-10)] flex-col items-start pt-[var(--base-10)]"
        >
          <ActiveArticle value={currentValue} />
        </div>
      </section>
    </>
  );
}
