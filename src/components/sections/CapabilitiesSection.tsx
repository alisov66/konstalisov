"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { track } from "@vercel/analytics";

import ExploreMenu, {
  type ExploreMenuCapability,
} from "@/components/ui/ExploreMenu";
import {
  capabilities,
  defaultCapabilityId,
  getArticleById,
  getCapabilityById,
  type ArticleId,
  type CapabilityId,
} from "@/data/capabilities";
import { colors, spacing, typography } from "@/styles";

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
  unifyingHeadersFig7: "/capabilities/unifying-headers-7.png",
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
  portfolioFig1: "/capabilities/portfolio-fig-1.png",
  portfolioFig2: "/capabilities/portfolio-fig-2.png",
  portfolioFig3: "/capabilities/portfolio-fig-3.png",
  portfolioFig4: "/capabilities/portfolio-fig-4.png",
  portfolioFig5: "/capabilities/portfolio-fig-5.png",
  portfolioFig6: "/capabilities/portfolio-fig-6.png",
  portfolioFig7: "/capabilities/portfolio-fig-7.png",
  portfolioFig8: "/capabilities/portfolio-fig-8.png",
};

const menuCapabilities: ExploreMenuCapability[] = capabilities.map(
  (capability) => ({
    articles: capability.articles.map((article) => ({
      href: `/capabilities/${capability.id}/${article.id}`,
      id: article.id,
      label: article.label,
    })),
    href: `/capabilities/${capability.id}/${capability.defaultArticle}`,
    id: capability.id,
    label: capability.label,
  }),
);

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
        ...typeStyle(typography.article.body),
        marginBottom: spacing.base[3],
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
        ...typeStyle(typography.article.body),
        marginBottom: spacing.base[3],
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
    <h3 style={typeStyle(typography.article.h1)}>
      {children}
    </h3>
  );
}

function H2({ children }: { children: ReactNode }) {
  return (
    <h4 style={typeStyle(typography.article.h2)}>
      {children}
    </h4>
  );
}

function H3({ children }: { children: ReactNode }) {
  return (
    <h5 style={typeStyle(typography.article.h3)}>
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
      <Gap size={spacing.article.h2Gap} />
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
      <Gap size={spacing.article.h3Gap} />
      {children}
    </section>
  );
}

function ArticleShell({ children }: { children: ReactNode }) {
  return (
    <article
      className="w-full"
      style={{ maxWidth: spacing.article.maxWidth }}
    >
      {children}
    </article>
  );
}

function MsaWorkspaceArticle() {
  const labelStyle = {
    ...typeStyle(typography.article.body),
    fontWeight: typography.fontWeight.semibold,
  };

  return (
    <ArticleShell>
      <H1>Designing a workspace for complex sequence analysis</H1>
      <Gap size={spacing.article.h1Gap} />

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
          <Gap size={spacing.article.mediaGap} />
          <ArticleImage
            alt="MSA workspace overview"
            className="aspect-[2428/1558]"
            src={images.msaFig1}
          />
        </Section>

        <Gap size={spacing.article.sectionGap} />

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

        <Gap size={spacing.article.sectionGap} />

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

        <Gap size={spacing.article.sectionGap} />

        <Section title="Design principles">
          <CopyBlock>
            <Paragraph>
              Rather than creating separate tools for different analysis tasks, I
              focused on building a flexible workspace that adapts to the user’s
              objective.
            </Paragraph>
            <Paragraph>The design was guided by four principles:</Paragraph>
          </CopyBlock>
          <Gap size={spacing.article.subsectionGap} />
          <Subsection title="Adaptability">
            <Paragraph>
              The workspace should support different analytical goals without
              requiring separate interfaces.
            </Paragraph>
          </Subsection>
          <Gap size={spacing.article.subsectionGap} />
          <Subsection title="Progressive detail">
            <Paragraph>
              Users should be able to switch between overview and detailed
              inspection modes.
            </Paragraph>
          </Subsection>
          <Gap size={spacing.article.subsectionGap} />
          <Subsection title="Context preservation">
            <Paragraph>
              Important metadata should remain accessible while navigating large
              datasets.
            </Paragraph>
          </Subsection>
          <Gap size={spacing.article.subsectionGap} />
          <Subsection title="User control">
            <Paragraph>
              Researchers should be able to customize the workspace according to
              their investigation needs.
            </Paragraph>
          </Subsection>
        </Section>

        <Gap size={spacing.article.sectionGap} />

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
          <Gap size={spacing.article.mediaGap} />
          <ArticleImage
            alt="MSA workspace analytical layers"
            className="aspect-[2428/1558]"
            src={images.msaFig2}
          />
          <Gap size={spacing.article.mediaGap} />
          <Gap size={spacing.article.subsectionGap} />

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
          <Gap size={spacing.article.mediaGap} />
          <p style={labelStyle}>Heatmap</p>
          <Gap size={spacing.article.mediaToCaptionGap} />
          <ArticleImage
            alt="Expanded heatmap mode"
            className="aspect-[2428/1558]"
            src={images.msaFig3}
          />
          <Gap size={spacing.article.mediaToCaptionGap} />
          <List>
            <li>Expanded mode reveals labels and detailed values.</li>
          </List>
          <Gap size={spacing.article.mediaGap} />
          <ArticleImage
            alt="Collapsed heatmap mode"
            className="aspect-[2428/1558]"
            src={images.msaFig4}
          />
          <Gap size={spacing.article.mediaToCaptionGap} />
          <List>
            <li>Collapsed mode compresses cells into a fixed-width overview.</li>
          </List>
          <Gap size={spacing.article.mediaGap} />
          <p style={labelStyle}>Alignment grid</p>
          <Gap size={spacing.article.mediaToCaptionGap} />
          <ArticleImage
            alt="Expanded alignment grid mode"
            className="aspect-[2428/1558]"
            src={images.msaFig5}
          />
          <Gap size={spacing.article.mediaToCaptionGap} />
          <List>
            <li>Expanded mode supports detailed sequence inspection.</li>
          </List>
          <Gap size={spacing.article.mediaGap} />
          <ArticleImage
            alt="Collapsed alignment grid mode"
            className="aspect-[2424/1554]"
            src={images.msaFig6}
          />
          <Gap size={spacing.article.mediaToCaptionGap} />
          <List>
            <li>
              Collapsed mode removes sequence characters and displays alignment
              patterns at scale.
            </li>
          </List>
        </Section>

        <Gap size={spacing.article.sectionGap} />

        <Section title="My role">
          <Paragraph>
            Led the design of the MSA Workspace end-to-end, including workflow
            architecture, interaction design, information density strategies,
            component design, and developer documentation. Worked closely with
            engineering throughout implementation and validation.
          </Paragraph>
        </Section>

        <Gap size={spacing.article.sectionGap} />

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
  );
}

function DataMappingArticle() {
  return (
    <ArticleShell>
      <H1>Transforming complex data mapping into a guided workflow</H1>
      <Gap size={spacing.article.h1Gap} />

        <Section title="Context">
          <Paragraph>
            Data Mapping controls what information appears on visualizations and
            how it is represented. Users connect metadata to chart variables
            before analysis can begin.
          </Paragraph>
          <Gap size={spacing.article.mediaGap} />
          <ArticleImage
            alt="Data mapping interface"
            className="aspect-[1368/1648] w-[450px] max-w-full"
            src={images.dataMappingFig1}
          />
        </Section>

        <Gap size={spacing.article.sectionGap} />

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

        <Gap size={spacing.article.sectionGap} />

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

        <Gap size={spacing.article.sectionGap} />

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
          <Gap size={spacing.article.mediaGap} />
          <ArticleImage
            alt="Data mapping variables grouped by biological meaning"
            className="aspect-[1472/1624] w-[450px] max-w-full"
            src={images.dataMappingFig2}
          />
          <Gap size={spacing.article.mediaGap} />
          <Gap size={spacing.article.subsectionGap} />

          <Subsection title="Intelligent compatibility guidance">
            <Paragraph>
              Introduced bidirectional guidance between metadata variables and
              visualization targets.
            </Paragraph>
          </Subsection>
          <Gap size={spacing.article.mediaGap} />
          <ArticleImage
            alt="Compatible targets highlighted from a variable"
            className="aspect-[450/432.426] w-[450px] max-w-full"
            src={images.dataMappingFig3}
          />
          <Gap size={spacing.article.mediaToCaptionGap} />
          <List>
            <li>Hover a variable → compatible targets are highlighted.</li>
          </List>
          <Gap size={spacing.article.mediaGap} />
          <ArticleImage
            alt="Compatible variables highlighted from a target"
            className="aspect-[450/732.781] w-[450px] max-w-full"
            src={images.dataMappingFig4}
          />
          <Gap size={spacing.article.mediaToCaptionGap} />
          <List>
            <li>
              Select a target → compatible variables are highlighted as
              Recommended, Supported, or Forbidden.
            </li>
          </List>
          <Gap size={spacing.article.mediaGap} />
          <Gap size={spacing.article.subsectionGap} />

          <Subsection title="Suggested Variables">
            <Paragraph>
              Surfaced the most relevant variables to help users get started
              faster.
            </Paragraph>
          </Subsection>
          <Gap size={spacing.article.mediaGap} />
          <ArticleImage
            alt="Suggested variables"
            className="aspect-[450/473.547] w-[450px] max-w-full"
            src={images.dataMappingFig5}
          />
          <Gap size={spacing.article.mediaGap} />
          <Gap size={spacing.article.subsectionGap} />

          <Subsection title="More Explicit Actions">
            <Paragraph>
              Changed ambiguous drag-and-drop instructions into clearer guidance.
            </Paragraph>
          </Subsection>
          <Gap size={spacing.article.mediaGap} />
          <ArticleImage
            alt="More explicit data mapping actions"
            className="aspect-[450/83.721] w-[450px] max-w-full"
            src={images.dataMappingFig6}
          />
          <Gap size={spacing.article.mediaGap} />
          <Gap size={spacing.article.subsectionGap} />

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
          <Gap size={spacing.article.mediaGap} />
          <ArticleImage
            alt="Renamed data mapping labels"
            className="aspect-[450/183.482] w-[450px] max-w-full"
            src={images.dataMappingFig7}
          />
        </Section>

        <Gap size={spacing.article.sectionGap} />

        <Section title="My role">
          <Paragraph>
            Led the redesign end-to-end, from problem discovery and workflow
            architecture to interaction design, information architecture, and
            validation.
          </Paragraph>
        </Section>

        <Gap size={spacing.article.sectionGap} />

        <Section title="Outcome">
          <Paragraph>
            Transformed Data Mapping from a configuration-heavy interface into a
            guided workflow that helps researchers discover relevant metadata,
            understand compatibility rules, and build visualizations more
            efficiently.
          </Paragraph>
        </Section>
    </ArticleShell>
  );
}

function DesignSystemsArticle() {
  const labelStyle = {
    ...typeStyle(typography.article.body),
    fontWeight: typography.fontWeight.semibold,
  };

  return (
    <ArticleShell>
      <H1>Designing a scalable application shell for complex workflows</H1>
      <Gap size={spacing.article.h1Gap} />

      <Section title="Context">
        <CopyBlock>
          <Paragraph>
            Platforma contains dialogs, side sheets, and analytical workspaces
            used across multiple applications.
          </Paragraph>
          <Paragraph>
            As the platform evolved, header patterns diverged. Similar
            interfaces used different hierarchy levels, layouts, and action
            placement rules.
          </Paragraph>
          <Paragraph>
            At the same time, new analytical tools such as the MSA Workspace
            introduced requirements that existing patterns could not support.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Scalable header architecture"
          className="aspect-[1776/1760] w-[450px] max-w-full"
          src={images.headerArchitecture}
        />
      </Section>

      <Gap size={spacing.article.sectionGap} />

      <Section title="Challenge">
        <Paragraph>
          Create a reusable header architecture that supports dialogs, side
          sheets, and complex analytical workspaces while maintaining consistency
          and enabling future applications to build on the same foundation.
        </Paragraph>
      </Section>

      <Gap size={spacing.article.sectionGap} />

      <Section title="Design principles">
        <CopyBlock>
          <Paragraph>
            Rather than creating one universal header, I focused on building a
            family of related patterns that share common rules while adapting to
            different contexts.
          </Paragraph>
          <Paragraph>The system was guided by three principles:</Paragraph>
          <List>
            <li>
              Consistency — users should recognize actions and navigation
              everywhere.
            </li>
            <li>
              Context awareness — dialogs, sheets, and workspaces require
              different levels of interaction.
            </li>
            <li>
              Scalability — future workflows should extend existing patterns
              instead of introducing new ones.
            </li>
          </List>
        </CopyBlock>
      </Section>

      <Gap size={spacing.article.sectionGap} />

      <Section title="Key improvements">
        <Subsection title="Header architecture instead of a single component">
          <Paragraph>
            Rather than creating a universal header component, I introduced a
            family of specialized patterns designed for different interface
            contexts.
          </Paragraph>
        </Subsection>
        <Gap size={spacing.article.mediaGap} />
        <p style={labelStyle}>Dialog header</p>
        <Gap size={spacing.article.mediaToCaptionGap} />
        <ArticleImage
          alt="Dialog header pattern"
          className="aspect-[2984/1904]"
          src={images.dialogHeader}
        />
        <Gap size={spacing.article.mediaToCaptionGap} />
        <List>
          <li>
            Optimized for focused, short-lived workflows with a clear primary
            task and close action.
          </li>
        </List>
        <Gap size={spacing.article.mediaGap} />
        <p style={labelStyle}>Sheet header</p>
        <Gap size={spacing.article.mediaToCaptionGap} />
        <ArticleImage
          alt="Sheet header pattern"
          className="aspect-[2984/1904]"
          src={images.sheetHeader}
        />
        <Gap size={spacing.article.mediaToCaptionGap} />
        <List>
          <li>
            Supports contextual editing while preserving visibility of the
            underlying workspace.
          </li>
        </List>
        <Gap size={spacing.article.mediaGap} />
        <p style={labelStyle}>Workspace header</p>
        <Gap size={spacing.article.mediaToCaptionGap} />
        <ArticleImage
          alt="Workspace header pattern"
          className="aspect-[2984/1904]"
          src={images.workspaceHeader}
        />
        <Gap size={spacing.article.mediaToCaptionGap} />
        <List>
          <li>
            Accommodates navigation, actions, controls, and workspace-specific
            tools within complex analytical environments.
          </li>
        </List>

        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.subsectionGap} />

        <Subsection title="Consistent hierarchy across the platform">
          <CopyBlock>
            <Paragraph>
              Established hierarchy levels that communicate the scope and
              importance of each interface context.
            </Paragraph>
            <List>
              <li>
                Workspace Header → <strong>H2</strong>, establishing the primary
                hierarchy level for analytical environments.
              </li>
              <li>
                Dialog Header → <strong>H2</strong>, representing a primary task
                context.
              </li>
              <li>
                Sheet Header → <strong>H3</strong>, indicating a subordinate
                context within a workspace.
              </li>
            </List>
          </CopyBlock>
        </Subsection>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Header hierarchy model"
          className="aspect-[2790/902]"
          src={images.hierarchy}
        />

        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.subsectionGap} />

        <Subsection title="Predictable action placement">
          <CopyBlock>
            <Paragraph>
              Defined a structured header layout that organizes actions
              according to their role and importance.
            </Paragraph>
            <Paragraph>The pattern includes:</Paragraph>
            <List>
              <li>Title area</li>
              <li>Primary actions</li>
              <li>Action groups</li>
              <li>Workspace controls</li>
              <li>Responsive wrapping behavior</li>
            </List>
            <Paragraph>
              This reduced implementation ambiguity, improved consistency across
              applications, and ensured actions remain predictable regardless of
              context.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Predictable header action placement"
          className="aspect-[2560/460]"
          src={images.msaHeader}
        />

        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.subsectionGap} />

        <Subsection title="Extensible architecture for future workflows">
          <CopyBlock>
            <Paragraph>
              Established hierarchy, action placement, and interaction patterns
              created a reusable foundation for future analytical workflows.
            </Paragraph>
            <Paragraph>
              This reduced design debt, improved consistency, and accelerated
              the delivery of new product capabilities.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Extensible header architecture"
          className="aspect-[2560/460]"
          src={images.unifyingHeadersFig7}
        />
        <Gap size={spacing.article.mediaToCaptionGap} />
        <List>
          <li>
            A common header foundation scales from simple dialogs to complex
            analytical workspaces.
          </li>
        </List>
      </Section>

      <Gap size={spacing.article.sectionGap} />

      <Section title="Implementation">
        <List>
          <li>Defined component architecture</li>
          <li>Documented usage rules</li>
          <li>Established hierarchy guidelines</li>
          <li>Defined action placement rules</li>
          <li>Supported responsive behavior</li>
          <li>Worked with developers on implementation</li>
        </List>
      </Section>

      <Gap size={spacing.article.sectionGap} />

      <Section title="My role">
        <List>
          <li>Research and problem definition</li>
          <li>Header architecture design</li>
          <li>Component specification</li>
          <li>Responsive behavior</li>
          <li>Documentation and implementation guidelines</li>
          <li>Developer collaboration</li>
        </List>
      </Section>

      <Gap size={spacing.article.sectionGap} />

      <Section title="Outcome">
        <List>
          <li>Unified header patterns across dialogs, sheets, and workspaces</li>
          <li>Reduced need for one-off header solutions</li>
          <li>Established reusable hierarchy and action placement rules</li>
          <li>
            Enabled future analytical applications to build on a shared
            architecture
          </li>
        </List>
      </Section>
    </ArticleShell>
  );
}

function DocumentationCollaborationArticle() {
  return (
    <ArticleShell>
      <H1>Making complex product decisions understandable</H1>
      <Gap size={spacing.article.h1Gap} />

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

      <Gap size={spacing.article.sectionGap} />

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

      <Gap size={spacing.article.sectionGap} />

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
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Documentation pages explaining product decisions"
          src={images.complexDecisions1}
        />
        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.subsectionGap} />

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
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="System logic documentation"
          className="aspect-[2514/1832]"
          src={images.complexDecisions2}
        />
        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.subsectionGap} />

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
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Progressive disclosure documentation map"
          className="aspect-[1496/960]"
          src={images.complexDecisions3}
        />
        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.subsectionGap} />

        <Subsection title="Turn feature decisions into platform knowledge">
          <Paragraph>
            The documentation captures reusable interaction patterns rather than
            feature-specific solutions. This allows future workflows to adopt
            proven approaches instead of reinventing behavior for each new
            application.
          </Paragraph>
        </Subsection>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Reusable platform knowledge examples"
          className="aspect-[2440/1024]"
          src={images.complexDecisions4}
        />
      </Section>

      <Gap size={spacing.article.sectionGap} />

      <Section title="Why it mattered">
        <List>
          <li>Used as a shared reference by Design and Engineering teams.</li>
          <li>Used as implementation reference.</li>
          <li>Captured UX rationale alongside specifications.</li>
          <li>Established documentation patterns for future workflows.</li>
        </List>
      </Section>

      <Gap size={spacing.article.sectionGap} />

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

      <Gap size={spacing.article.sectionGap} />

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
      <Gap size={spacing.article.h1Gap} />
      <Paragraph>
        Platforma had grown from a startup product into a complex ecosystem of
        scientific workflows, deployment options, and developer tools. The
        website no longer reflected the scale of the platform or helped visitors
        understand how its components fit together.
      </Paragraph>

      <Gap size={spacing.article.sectionGap} />

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

      <Gap size={spacing.article.sectionGap} />

      <Section title="Challenge">
        <CopyBlock>
          <Paragraph>
            Platforma had grown into a broad ecosystem of scientific workflows,
            platform capabilities, deployment options, developer tools, and
            resources — but the website did not communicate how these pieces
            connected.
          </Paragraph>
          <Paragraph>
            The challenge was to create an information architecture that could
            represent the product as one coherent platform while remaining
            understandable to audiences with different goals and levels of
            technical expertise.
          </Paragraph>
        </CopyBlock>
      </Section>

      <Gap size={spacing.article.sectionGap} />

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
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Platforma product ecosystem navigation model"
          className="aspect-[2916/672]"
          src={images.scalingPlatforma1}
        />
        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.subsectionGap} />

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
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Platform overview explanation"
          className="aspect-[2760/1350]"
          src={images.scalingPlatforma2}
        />
        <Gap size={spacing.article.mediaToCaptionGap} />
        <List>
          <li>
            The Platform Overview page transformed a complex technical
            architecture into a simple mental model built around infrastructure,
            user experience, and extensibility.
          </li>
        </List>
        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.subsectionGap} />

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
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Platforma visitor intent map"
          className="aspect-[1560/816]"
          src={images.scalingPlatforma3}
        />
        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.subsectionGap} />

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
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Platforma deployment and trust pages"
          className="aspect-[2762/1792]"
          src={images.scalingPlatforma4}
        />
        <Gap size={spacing.article.mediaToCaptionGap} />
        <List>
          <li>
            Dedicated platform and deployment pages made infrastructure,
            deployment options, and operational requirements transparent,
            helping enterprise teams evaluate Platforma with confidence.
          </li>
        </List>
      </Section>

      <Gap size={spacing.article.sectionGap} />

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

      <Gap size={spacing.article.sectionGap} />

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

      <Gap size={spacing.article.sectionGap} />

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
      <H1>Simplifying complex financial operations for blockchain users</H1>
      <Gap size={spacing.article.h1Gap} />

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
            <li>minimizing transaction costs.</li>
            <li>evaluating transaction risk.</li>
            <li>protecting wallet reputation.</li>
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
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="TR.ENERGY wallet overview"
          className="aspect-[3344/1784]"
          src={images.financialOps1}
        />
      </Section>

      <Gap size={spacing.article.sectionGap} />

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
            <li>transaction cost optimization.</li>
            <li>risk management.</li>
            <li>capital efficiency.</li>
          </List>
        </CopyBlock>
      </Section>

      <Gap size={spacing.article.sectionGap} />

      <Section title="Key insights">
        <ArticleImage
          alt="Key insights for active TRON users"
          className="aspect-[2556/824]"
          src={images.financialOps2}
        />
      </Section>

      <Gap size={spacing.article.sectionGap} />

      <Section title="Design principles">
        <Subsection title="Make invisible information visible">
          <Paragraph>
            Surface critical blockchain information directly where decisions
            happen.
          </Paragraph>
        </Subsection>
        <Gap size={spacing.article.subsectionGap} />
        <Subsection title="Support proactive risk management">
          <Paragraph>
            Help users identify and isolate risk before it affects primary
            assets.
          </Paragraph>
        </Subsection>
        <Gap size={spacing.article.subsectionGap} />
        <Subsection title="Keep operational workflows connected">
          <Paragraph>
            Reduce dependence on external services and fragmented experiences.
          </Paragraph>
        </Subsection>
        <Gap size={spacing.article.subsectionGap} />
        <Subsection title="Preserve context during frequent actions">
          <Paragraph>
            Allow users to complete common actions without losing sight of their
            current portfolio state.
          </Paragraph>
        </Subsection>
      </Section>

      <Gap size={spacing.article.sectionGap} />

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
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Energy availability in wallet"
          className="aspect-[450/474.468] w-[450px] max-w-full"
          src={images.financialOps3}
        />
        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.subsectionGap} />
        <Subsection title="Solution">
          <CopyBlock>
            <Paragraph>
              Energy availability was surfaced directly within the portfolio
              experience alongside token balances.
            </Paragraph>
            <Paragraph>Users can immediately understand:</Paragraph>
            <List>
              <li>available Energy.</li>
              <li>estimated transaction capacity.</li>
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
        <Gap size={spacing.article.subsectionGap} />
        <Subsection title="Outcome">
          <Paragraph>
            The wallet transforms a complex blockchain mechanism into an
            actionable operational tool, helping users reduce transaction costs
            while maintaining a streamlined workflow.
          </Paragraph>
        </Subsection>
      </Section>

      <Gap size={spacing.article.sectionGap} />

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
        <Gap size={spacing.article.subsectionGap} />
        <Subsection title="Solution">
          <Paragraph>
            The wallet introduces a proactive risk-management workflow.
          </Paragraph>
        </Subsection>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Risk-management workflow"
          className="aspect-[3344/1784]"
          src={images.financialOps4}
        />
        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.subsectionGap} />
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
        <Gap size={spacing.article.subsectionGap} />
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
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Risk visibility in asset cards"
          className="aspect-[2518/1784]"
          src={images.financialOps5}
        />
        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.subsectionGap} />
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
        <Gap size={spacing.article.subsectionGap} />
        <Subsection title="Outcome">
          <Paragraph>
            By combining AML verification with dedicated transfer wallets, the
            product supports a complete risk-management workflow—from evaluating
            external addresses before a transfer to safely integrating verified
            assets into long-term holdings.
          </Paragraph>
        </Subsection>
      </Section>

      <Gap size={spacing.article.sectionGap} />

      <Section title="Increase capital efficiency within the ecosystem">
        <ArticleImage
          alt="Staking within TR.ENERGY wallet"
          className="aspect-[450/287.664] w-[450px] max-w-full"
          src={images.financialOps6}
        />
        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.subsectionGap} />
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
        <Gap size={spacing.article.subsectionGap} />
        <Subsection title="Solution">
          <CopyBlock>
            <Paragraph>
              Staking capabilities were integrated directly into the wallet
              experience.
            </Paragraph>
            <Paragraph>Users can:</Paragraph>
            <List>
              <li>create staking positions.</li>
              <li>monitor active stakes.</li>
              <li>review earnings.</li>
              <li>unstake assets.</li>
              <li>enable automatic reward reinvestment.</li>
            </List>
            <Paragraph>
              Rather than forcing users to move funds across multiple platforms,
              the wallet allows them to manage both operational activity and
              capital utilization within a single ecosystem.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={spacing.article.subsectionGap} />
        <Subsection title="Outcome">
          <Paragraph>
            The wallet evolves beyond transaction management and becomes a
            broader asset-management platform, helping users generate additional
            value from assets already held within the product.
          </Paragraph>
        </Subsection>
      </Section>

      <Gap size={spacing.article.sectionGap} />

      <Section title="Creating a consistent interaction model">
        <Paragraph>
          As the number of operational workflows increased, a unified
          interaction pattern became necessary.
        </Paragraph>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Bottom sheet interaction model"
          className="aspect-[2518/1784]"
          src={images.financialOps7}
        />
        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.subsectionGap} />
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
        <Gap size={spacing.article.subsectionGap} />
        <Subsection title="Solution">
          <CopyBlock>
            <Paragraph>
              A reusable Bottom Sheet interaction model was introduced across
              the application.
            </Paragraph>
            <Paragraph>The pattern is used for:</Paragraph>
            <List>
              <li>Energy purchases.</li>
              <li>account management.</li>
              <li>currency preferences.</li>
              <li>contextual settings.</li>
              <li>lightweight operational workflows.</li>
            </List>
            <Paragraph>
              This allows users to complete common actions without losing
              visibility of their current portfolio state.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={spacing.article.subsectionGap} />
        <Subsection title="Outcome">
          <Paragraph>
            The Bottom Sheet system became a consistent interaction foundation
            across the product, reducing navigation overhead while maintaining
            workflow continuity.
          </Paragraph>
        </Subsection>
      </Section>

      <Gap size={spacing.article.sectionGap} />

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

      <Gap size={spacing.article.sectionGap} />

      <Section title="Outcome">
        <CopyBlock>
          <Paragraph>
            TR.ENERGY evolved beyond a traditional crypto wallet into a
            financial operations platform for active TRON users.
          </Paragraph>
          <Paragraph>The product helps users:</Paragraph>
          <List>
            <li>optimize transaction costs through Energy management.</li>
            <li>assess and mitigate asset reputation risks.</li>
            <li>separate trusted and untrusted transaction flows.</li>
            <li>generate value from idle capital through staking.</li>
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

function DesignToProductionArticle() {
  return (
    <ArticleShell>
      <H1>From design system to production with AI-assisted development</H1>
      <Gap size={spacing.article.h1Gap} />

      <Section title="Context">
        <CopyBlock>
          <Paragraph>
            I wanted my portfolio to do more than present finished work. I
            treated it as a product I could take from information architecture
            and visual design through implementation and production.
          </Paragraph>
          <Paragraph>
            Instead of using a website builder or handing the design to a
            developer, I built it with Figma, Next.js, Tailwind CSS, GitHub,
            Vercel, ChatGPT, and Codex in VS Code.
          </Paragraph>
          <Paragraph>
            The goal was not to become a frontend engineer, but to understand how
            design decisions translate into implementation, keep design and code
            aligned, and explore how AI-assisted development could extend what I
            could ship independently.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Portfolio homepage in Figma and production"
          className="aspect-[3594/1916]"
          src={images.portfolioFig1}
        />
      </Section>

      <Gap size={spacing.article.sectionGap} />

      <Section title="Insights">
        <CopyBlock>
          <Paragraph>
            Building the portfolio exposed several recurring gaps between design
            and implementation.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.subsectionGap} />
        <Subsection title="Design systems should survive implementation">
          <CopyBlock>
            <Paragraph>
              A system can be carefully structured in Figma while the production
              interface gradually diverges from it.
            </Paragraph>
            <Paragraph>
              Its real value appears when the same foundations, components, and
              rules are maintained across both environments.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={spacing.article.subsectionGap} />
        <Subsection title="Implementation knowledge improves design decisions">
          <Paragraph>
            Understanding component structure, responsive behavior, tokens, and
            technical constraints helped me design solutions that were more
            realistic to build and maintain.
          </Paragraph>
        </Subsection>
        <Gap size={spacing.article.subsectionGap} />
        <Subsection title="AI changes how far a designer can take an idea">
          <Paragraph>
            AI-assisted development allowed me to participate much deeper in
            implementation while keeping design intent and product judgment under
            my control.
          </Paragraph>
        </Subsection>
      </Section>

      <Gap size={spacing.article.sectionGap} />

      <Section title="Challenge">
        <CopyBlock>
          <Paragraph>
            Create a portfolio in which design and implementation remained part
            of the same system.
          </Paragraph>
          <Paragraph>That meant:</Paragraph>
          <List>
            <li>
              translating the Figma design system into reusable code
              foundations;
            </li>
            <li>
              keeping typography, spacing, colors, grids, and responsive
              behavior consistent across environments;
            </li>
            <li>
              building reusable components instead of one-off page
              implementations;
            </li>
            <li>using AI without losing control over design intent;</li>
            <li>supporting safe iteration before production;</li>
            <li>and shipping the result as a real production website.</li>
          </List>
          <Paragraph>
            The goal was not to reproduce Figma in code, but to preserve design
            decisions all the way to production.
          </Paragraph>
        </CopyBlock>
      </Section>

      <Gap size={spacing.article.sectionGap} />

      <Section title="Design principles">
        <Subsection title="One system, two environments">
          <CopyBlock>
            <Paragraph>
              Figma and code should express the same design logic.
            </Paragraph>
            <Paragraph>
              Variables in Figma became tokens in code, and reusable Figma
              components were mirrored by reusable interface components wherever
              practical.
            </Paragraph>
            <Paragraph>
              The implementation was treated as another representation of the
              design system rather than a separate artifact.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Design system variables shared between Figma and code"
          className="aspect-square"
          src={images.portfolioFig2}
        />
        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.subsectionGap} />

        <Subsection title="Keep intent and judgment in the loop">
          <CopyBlock>
            <Paragraph>
              AI worked best when design intent, interaction behavior,
              constraints, and expected outcomes were explicit.
            </Paragraph>
            <Paragraph>
              Before implementation, I worked through the problem, structure,
              and trade-offs, then used ChatGPT and Codex to extend execution
              rather than replace understanding.
            </Paragraph>
            <Paragraph>
              I reviewed both behavior and code, iterating until the result
              matched the intended experience.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="AI-assisted design and development workflow"
          className="aspect-[2840/944]"
          src={images.portfolioFig3}
        />
        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.subsectionGap} />

        <Subsection title="Treat production as part of the design process">
          <CopyBlock>
            <Paragraph>
              A feature was not finished when it looked correct locally.
            </Paragraph>
            <Paragraph>
              It also needed to work responsively, survive deployment, preserve
              links and metadata, and behave correctly in production.
            </Paragraph>
            <Paragraph>
              Staging, QA, and production became part of the same iterative loop
              as design.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Production deployment workflow"
          className="aspect-[3401/2932]"
          src={images.portfolioFig4}
        />
      </Section>

      <Gap size={spacing.article.sectionGap} />

      <Section title="Key improvements">
        <Subsection title="Build a shared design system across Figma and code">
          <CopyBlock>
            <Paragraph>
              The portfolio began with a structured design system in Figma.
            </Paragraph>
            <Paragraph>
              Typography, spacing, colors, radii, grids, and responsive modes
              were defined as variables rather than repeated values, then
              represented in code through shared tokens and reusable foundations.
            </Paragraph>
            <Paragraph>
              This made design-to-code consistency something that could be
              maintained rather than manually checked on every screen.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Shared typography, spacing, and color tokens"
          className="aspect-[1636/744]"
          src={images.portfolioFig5}
        />
        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.subsectionGap} />

        <Subsection title="Translate components rather than screenshots">
          <CopyBlock>
            <Paragraph>
              The implementation was built around reusable components instead of
              reproducing individual frames.
            </Paragraph>
            <Paragraph>
              Navigation, capability tabs, article layouts, buttons, and other
              recurring patterns were treated as systems with states and
              responsive behavior.
            </Paragraph>
            <Paragraph>
              When a component already existed in Figma, Codex could inspect it
              as implementation context, helping preserve the relationship
              between the designed component and the production version.
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Reusable component translation from Figma to code"
          className="aspect-[2872/2164]"
          src={images.portfolioFig6}
        />
        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.subsectionGap} />

        <Subsection title="Create an AI-assisted design-to-development workflow">
          <Paragraph>
            The workflow developed into a repeatable loop:
          </Paragraph>
        </Subsection>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Repeatable AI-assisted product workflow"
          className="aspect-[2680/2416]"
          src={images.portfolioFig7}
        />
        <Gap size={spacing.article.mediaGap} />
        <CopyBlock>
          <Paragraph>
            ChatGPT supported reasoning and specification, Figma remained the
            source of design intent, Codex worked directly in the codebase
            through VS Code, and GitHub and Vercel supported versioning and
            deployment.
          </Paragraph>
          <Paragraph>
            The important part was not any individual AI tool, but maintaining
            human control over intent while delegating parts of execution.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.subsectionGap} />

        <Subsection title="Build a production workflow for safe, responsive shipping">
          <CopyBlock>
            <Paragraph>
              Once the portfolio moved beyond an experiment, changes were tested
              locally and through deployment previews before reaching
              production.
            </Paragraph>
            <Paragraph>
              This made it possible to validate responsive behavior, navigation,
              links, downloadable assets, metadata, Open Graph previews, and
              domain configuration without using the live site as the testing
              environment.
            </Paragraph>
            <Paragraph>
              Responsive behavior was also treated as a system: shared
              breakpoints and design-system modes controlled how typography,
              spacing, layout, and content density adapted across viewport
              sizes.
            </Paragraph>
            <Paragraph>
              <strong>
                Once changes reached production, the live site became another
                source of design feedback. Reviewing real pages and sharing
                contexts led to further refinements, turning the process into a
                continuous loop:
              </strong>
            </Paragraph>
            <Paragraph>
              <strong>Design → Build → Ship → Observe → Refine</strong>
            </Paragraph>
          </CopyBlock>
        </Subsection>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Production previews and deployment workflow"
          className="aspect-[4096/1789]"
          src={images.portfolioFig8}
        />
      </Section>

      <Gap size={spacing.article.sectionGap} />

      <Section title="My role">
        <CopyBlock>
          <Paragraph>
            I owned the portfolio end to end: information architecture, visual
            design, design system, implementation direction, QA, and production
            release.
          </Paragraph>
          <Paragraph>
            I used ChatGPT for product reasoning and specification, Codex in VS
            Code for implementation, and GitHub and Vercel for versioning,
            previews, and deployment.
          </Paragraph>
          <Paragraph>
            My role remained that of a Product Designer, but with greater
            ownership over how design decisions were translated into the final
            product.
          </Paragraph>
        </CopyBlock>
      </Section>

      <Gap size={spacing.article.sectionGap} />

      <Section title="Outcome">
        <CopyBlock>
          <Paragraph>
            The result is the production portfolio you are using now, built from
            the same design system defined in Figma and maintained through
            reusable code foundations.
          </Paragraph>
          <Paragraph>
            The project gave me a repeatable workflow for taking ideas from
            design intent through implementation, validation, and production.
          </Paragraph>
          <Paragraph>
            It also changed how I work: implementation awareness and AI-assisted
            development now help me prototype further, communicate more
            precisely with engineers, and take greater responsibility for what
            ultimately ships.
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
          <Gap size={spacing.article.h2Gap} />
          <p
            style={{
              ...typeStyle(typography.article.body),
              color: colors.text.secondary,
            }}
          >
            Article content is coming soon.
          </p>
        </div>
      </div>
    </ArticleShell>
  );
}

function ActiveArticle({ articleId }: { articleId: ArticleId }) {
  if (articleId === "msa-workspace") {
    return <MsaWorkspaceArticle />;
  }

  if (articleId === "data-mapping") {
    return <DataMappingArticle />;
  }

  if (articleId === "scalable-header-architecture") {
    return <DesignSystemsArticle />;
  }

  if (articleId === "complex-product-decisions") {
    return <DocumentationCollaborationArticle />;
  }

  if (articleId === "platforma-product-platform") {
    return <ProductDesignScaleArticle />;
  }

  if (articleId === "tron-financial-operations") {
    return <MobileExperiencesArticle />;
  }

  if (articleId === "portfolio-design-to-production") {
    return <DesignToProductionArticle />;
  }

  return <EmptyArticle label="Article" />;
}

export interface CapabilitiesSectionProps {
  articleId?: ArticleId;
  scrollToArticleOnMount?: boolean;
  showIntroduction?: boolean;
  trackCapabilitiesView?: boolean;
  value?: CapabilityId;
}

export function CapabilitiesIntroduction() {
  return (
    <section className="flex w-full flex-col items-start bg-[var(--bg-beige)] px-[var(--padding-side)] pb-[var(--base-10)] pt-[112px] min-[768px]:pt-[var(--base-32)]">
      <div className="flex w-full max-w-[820px] flex-col items-start gap-[var(--base-6)]">
        <h1
          className="w-full text-[var(--text-accent)]"
          style={typeStyle(typography.heading.h1)}
        >
          Capabilities
        </h1>
        <p
          className="w-full text-[var(--text-primary)]"
          style={typeStyle(typography.body.m)}
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
  articleId,
  scrollToArticleOnMount = false,
  showIntroduction = true,
  trackCapabilitiesView = false,
  value = defaultCapabilityId,
}: CapabilitiesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const articleRef = useRef<HTMLDivElement>(null);
  const exploreMenuRef = useRef<HTMLDivElement>(null);
  const selectedCapability =
    getCapabilityById(value) || getCapabilityById(defaultCapabilityId)!;
  const currentValue = selectedCapability.id;
  const currentArticle =
    (articleId && getArticleById(selectedCapability, articleId)) ||
    getArticleById(selectedCapability, selectedCapability.defaultArticle)!;

  const sectionStyle: StyleVars = {
    "--capabilities-column-gap": "100px",
    "--capabilities-article-min-width": "var(--article-max-width)",
    "--capabilities-menu-width": "277px",
  };

  const scrollArticleToStart = useCallback(() => {
    const article = articleRef.current;

    if (!article) {
      return;
    }

    const html = document.documentElement;
    const exploreMenu = exploreMenuRef.current;
    const stackedMenuClearance =
      exploreMenu && window.innerWidth < 1280 ? exploreMenu.offsetHeight : 0;
    const top =
      article.getBoundingClientRect().top +
      window.scrollY -
      headerClearance -
      stackedMenuClearance;

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
  }, [
    currentArticle.id,
    currentValue,
    scrollArticleToStart,
    scrollToArticleOnMount,
  ]);

  useEffect(() => {
    if (trackCapabilitiesView) {
      sendGAEvent("event", "capabilities_view");
    }
  }, [trackCapabilitiesView]);

  function handleCapabilityValueChange(nextValue: string) {
    const selectedCapability = getCapabilityById(nextValue);

    if (selectedCapability) {
      sendGAEvent("event", "capability_click", {
        capability_name: selectedCapability.id.replaceAll("-", "_"),
      });
    }

    if (selectedCapability && selectedCapability.id !== currentValue) {
      track("case_study_view", { project: selectedCapability.label });
    }

    scrollArticleToStart();
  }

  function handleArticleValueChange(nextValue: string) {
    if (nextValue !== currentArticle.id) {
      track("case_study_view", { project: nextValue });
    }

    scrollArticleToStart();
  }

  return (
    <>
      {showIntroduction ? <CapabilitiesIntroduction /> : null}
      <section
        id="work"
        className="mb-[var(--base-20)] flex w-full flex-col items-start gap-0 bg-[var(--bg-beige)] px-[var(--padding-side)] min-[1280px]:flex-row min-[1280px]:gap-[var(--capabilities-column-gap)]"
        ref={sectionRef}
        style={sectionStyle}
      >
        <ExploreMenu
          articleValue={currentArticle.id}
          capabilities={menuCapabilities}
          capabilityValue={currentValue}
          onArticleValueChange={handleArticleValueChange}
          onCapabilityValueChange={handleCapabilityValueChange}
          ref={exploreMenuRef}
        />

        <div
          ref={articleRef}
          className="flex min-w-0 flex-1 scroll-mt-[var(--base-10)] flex-col items-start pt-[var(--base-5)] min-[1280px]:min-w-[var(--capabilities-article-min-width)] min-[1280px]:pt-[var(--base-10)]"
        >
          <ActiveArticle articleId={currentArticle.id} />
        </div>
      </section>
    </>
  );
}
