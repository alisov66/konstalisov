"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { track } from "@vercel/analytics";
import msaImages from "@/data/msa-images.json";
import dataMappingImages from "@/data/data-mapping-images.json";
import amlImages from "@/data/aml-images.json";
import massPayoutImages from "@/data/mass-payout-images.json";

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
  width,
  height,
  srcSet,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  srcSet?: string;
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
      width={width}
      height={height}
      srcSet={srcSet}
      sizes={
        srcSet
          ? "auto, (max-width: 767px) calc(100vw - 32px), (max-width: 899px) calc(100vw - 80px), 820px"
          : undefined
      }
      loading={srcSet ? "lazy" : undefined}
      decoding={srcSet ? "async" : undefined}
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

function ArticleSummary({
  rows,
}: {
  rows: readonly (readonly [string, ReactNode])[];
}) {
  return (
    <dl style={typeStyle(typography.article.body)}>
      {rows.map(([label, value], index) => (
        <div
          key={label}
          className="flex flex-col gap-[var(--base-1)] py-[var(--base-3)] md:flex-row md:flex-wrap md:gap-[var(--base-5)]"
          style={{
            borderBottom:
              index < rows.length - 1
                ? `${colors.border.width.thin} solid ${colors.border.secondary}`
                : undefined,
          }}
        >
          <dt
            className="shrink-0 md:w-[180px]"
            style={{
              ...typeStyle(typography.article.bodyStrong),
              color: colors.text.secondary,
            }}
          >
            {label}
          </dt>
          <dd className="min-w-0 md:min-w-[240px] md:flex-1">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ArticleComparisonTable({
  label,
  headers,
  rows,
}: {
  label: string;
  headers: readonly [string, string, string];
  rows: readonly (readonly [string, string, string])[];
}) {
  const rowClassName =
    "grid grid-cols-3 gap-[var(--base-5)] py-[var(--base-3)] md:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)] md:gap-[var(--base-10)]";

  return (
    <table
      aria-label={label}
      role="table"
      className="block w-full text-left"
      style={typeStyle(typography.article.body)}
    >
      <thead role="rowgroup" className="block">
        <tr
          role="row"
          className={rowClassName}
          style={{ borderBottom: `${colors.border.width.thin} solid ${colors.border.primary}` }}
        >
          {headers.map((header) => (
            <th
              key={header}
              role="columnheader"
              scope="col"
              className="min-w-0 text-left [overflow-wrap:anywhere]"
              style={typeStyle(typography.article.bodyStrong)}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody role="rowgroup" className="block">
        {rows.map((row, index) => (
          <tr
            key={row[0]}
            role="row"
            className={rowClassName}
            style={{
              borderBottom: index < rows.length - 1
                ? `${colors.border.width.thin} solid ${colors.border.secondary}`
                : undefined,
            }}
          >
            {row.map((cell, column) => (
              <td key={headers[column]} role="cell" className="min-w-0 [overflow-wrap:anywhere]">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function MsaWorkspaceArticle() {
  return (
    <ArticleShell>
      <H1>Designing a flexible workspace for sequence analysis</H1>
      <Gap size={spacing.article.h1Gap} />
      <CopyBlock>
        <Paragraph>
          I designed Platforma’s multiple sequence alignment (MSA) workspace
          from scratch. The challenge was to fit sequence detail and supporting
          visualizations into limited screen space while accommodating different
          scientific tasks. I created configurable layouts, then used feedback
          to design compact alignment and heatmap views. The workspace was
          implemented and released.
        </Paragraph>
      </CopyBlock>
      <Gap size={spacing.base[4]} />
      <ArticleSummary
        rows={[
          ["Product", "Platforma, MiLaboratories"],
          [
            "My role",
            "Workspace and interaction design, components, documentation, and engineering collaboration",
          ],
          ["Scope", "New sequence-analysis workspace"],
          ["Design", "Approximately four weeks of dedicated work"],
          ["Delivery", "Workspace released to users"],
        ]}
      />
      <Gap size={spacing.article.mediaGap} />
      <ArticleImage
        {...msaImages["1"]}
        alt="MSA workspace with annotated sequence labels and sequence alignment"
      />
      <Gap size={spacing.article.sectionGap} />
      <Gap size={spacing.article.sectionGap} />

      <Section title="Bringing visual sequence comparison into Platforma">
        <CopyBlock>
          <Paragraph>
            Platforma already offered table views for analyzing sequences, but
            users needed a dedicated workspace for more detailed visual
            comparison. They could also use MSA tools in other software. The CEO
            initiated the project to bring this capability into Platforma.
          </Paragraph>
          <Paragraph>
            MSA arranges biological sequences so researchers can compare
            corresponding positions. For example, a scientist reviewing antibody
            candidates can inspect where their sequences differ and use a tree
            to explore relationships between them. This helps them examine
            diversity within the candidate set.
          </Paragraph>
          <Paragraph>
            These tasks required different visual priorities: reading individual
            sequence characters, seeing broader patterns, or examining related
            information alongside the alignment.
          </Paragraph>
        </CopyBlock>
      </Section>
      <Gap size={spacing.article.sectionGap} />

      <Section title="Keeping scientific conventions familiar">
        <CopyBlock>
          <Paragraph>
            The CEO demonstrated real workflows and explained the required
            functionality. I also reviewed five or six competing MSA tools to
            understand established ways of presenting alignments, heatmaps,
            trees, consensus views, and sequence logos.
          </Paragraph>
          <Paragraph>
            Scientists defined which information needed to be compared; I
            decided how to arrange and navigate it. I kept familiar scientific
            representations and focused my design work on layout, visibility,
            and information density. I reused Platforma’s design-system
            components and created new components where needed.
          </Paragraph>
        </CopyBlock>
      </Section>
      <Gap size={spacing.article.sectionGap} />

      <Section title="Choosing the views relevant to the task">
        <CopyBlock>
          <Paragraph>
            Showing every analytical view at once would leave less space for the
            information relevant to the current task. I designed controls that
            let researchers show or hide individual views—including trees,
            metadata columns, heatmaps, consensus views, and sequence logos—as
            their focus changed.
          </Paragraph>
          <Paragraph>
            This let researchers adjust the workspace around the information
            they needed to compare. Label columns could also be pinned to keep
            reference information visible during navigation.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          {...msaImages["2"]}
          alt="MSA workspace displaying a tree, label columns, heatmap, and alignment together"
        />
        <Gap size={spacing.article.mediaGap} />
        <figure>
          <ArticleImage
            {...msaImages["3"]}
            alt="Widget configuration controls for analytical views"
          />
          <Gap size={spacing.article.mediaToCaptionGap} />
          <figcaption
            className="[&_ul]:mb-0"
            style={{ color: colors.text.secondary }}
          >
            <List>
              <li>
                Choose which analytical views to display for the current task.
              </li>
            </List>
          </figcaption>
        </figure>
        <Gap size={spacing.article.mediaGap} />
      </Section>
      <Gap size={spacing.article.sectionGap} />

      <Section title="Changing information density after user feedback">
        <CopyBlock>
          <Paragraph>
            User feedback revealed a limitation: with large datasets, the
            heatmap and alignment became too wide to view comfortably together.
            Showing or hiding a view did not address the need to compare both at
            once.
          </Paragraph>
          <Paragraph>
            I designed expanded and collapsed states for each view. Expanded MSA
            displayed individual sequence characters and could show the
            consensus and sequence logo. Collapsing MSA hid the characters and
            those three supporting views, retaining a compact color-pattern
            overview. The heatmap similarly offered detailed and compressed
            states.
          </Paragraph>
          <Paragraph>
            This gave researchers a way to devote more space to one view while
            keeping an overview of the other. The tradeoff was between readable
            detail and visible coverage: compact views supported scanning
            patterns, while expanded views supported closer inspection.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <figure>
          <ArticleImage
            {...msaImages["4"]}
            alt="Expanded sequence alignment beside a compact heatmap"
          />
          <Gap size={spacing.article.mediaToCaptionGap} />
          <figcaption
            className="[&_ul]:mb-0"
            style={{ color: colors.text.secondary }}
          >
            <List>
              <li>
                Individual sequence characters and supporting views are visible;
                the compact heatmap leaves more room for sequence inspection.
              </li>
            </List>
          </figcaption>
        </figure>
        <Gap size={spacing.article.mediaGap} />
        <figure>
          <ArticleImage
            {...msaImages["5"]}
            alt="Compact sequence alignment beside an expanded heatmap"
          />
          <Gap size={spacing.article.mediaToCaptionGap} />
          <figcaption
            className="[&_ul]:mb-0"
            style={{ color: colors.text.secondary }}
          >
            <List>
              <li>
                Sequence characters, consensus, and sequence logo are hidden,
                leaving a compact pattern overview beside the expanded heatmap.
              </li>
            </List>
          </figcaption>
        </figure>
        <Gap size={spacing.article.mediaGap} />
      </Section>
      <Gap size={spacing.article.sectionGap} />

      <Section title="Reviewing tasks and supporting implementation">
        <CopyBlock>
          <Paragraph>
            I reviewed the design by working through documented biological tasks
            with step-by-step instructions. This let me check the workspace
            against the activities it needed to support.
          </Paragraph>
          <Paragraph>
            After the CEO approved the design, I wrote documentation and walked
            engineering through the behavior. We reviewed the design together,
            and I stayed closely involved during implementation to clarify
            interactions and answer questions.
          </Paragraph>
        </CopyBlock>
      </Section>
      <Gap size={spacing.article.sectionGap} />

      <Section title="What shipped">
        <CopyBlock>
          <Paragraph>
            The team implemented and released the MSA workspace, adding
            dedicated visual sequence comparison alongside Platforma’s table
            views. I owned the interface design from the initial layout through
            component creation, documentation, and engineering collaboration.
          </Paragraph>
          <Paragraph>
            The project brought the screen-space problem into focus: researchers
            needed control over both which views were visible and how much
            detail each view displayed. The resulting design addressed those
            needs through visibility controls and compact views.
          </Paragraph>
        </CopyBlock>
      </Section>
    </ArticleShell>
  );
}

function DataMappingArticle() {
  return (
    <ArticleShell>
      <H1>Making scientific data mapping easier to configure</H1>
      <Gap size={spacing.article.h1Gap} />
      <CopyBlock>
        <Paragraph>
          Researchers using Platforma struggled to find relevant metadata and
          understand where they could use it in a visualization. After reviewing
          recordings of user meetings, I proposed and designed a shared mapping
          interface that grouped variables by biological meaning and showed
          compatibility before dragging began.
        </Paragraph>
      </CopyBlock>
      <Gap size={spacing.article.sectionGap} />
      <ArticleSummary
        rows={[
          ["Product", "Platforma, MiLaboratories"],
          ["My role", "Product Designer responsible for the interaction model, UI, and implementation review"],
          ["Scope", "Shared data-mapping interface across visualization blocks"],
          ["Design", "Approximately 2–3 weeks alongside other work."],
          ["Delivery", "Metadata grouping and compatibility highlighting shipped in the next release"],
        ]}
      />
      <Gap size={spacing.article.mediaGap} />
      <Gap size={spacing.article.mediaGap} />
      <Gap size={spacing.article.sectionGap} />

      <Section title="Helping researchers choose what a visualization shows">
        <CopyBlock>
          <Paragraph>
            Platforma helps scientists analyze biological data through connected
            analytical applications called blocks. Its data-mapping interface
            lets them assign variables to visualization controls such as color,
            size, highlighting, and grouping.
          </Paragraph>
          <Paragraph>
            The same interface appeared across all visualization blocks, although
            the available metadata and controls varied. Researchers needed to
            find the information relevant to their question and understand where
            it could be applied.
          </Paragraph>
        </CopyBlock>
      </Section>
      <Gap size={spacing.article.sectionGap} />

      <Section title="Two problems in the existing experience">
        <CopyBlock>
          <Paragraph>
            I reviewed recordings of user meetings and saw researchers struggle
            with a large, unsorted metadata list. Finding the right variable
            required scanning through options without a meaningful structure.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.sectionGap} />
        <ArticleImage
          {...dataMappingImages["1"]}
          alt="Original data-mapping interface with an unsorted metadata list and delayed compatibility feedback"
        />
        <Gap size={spacing.article.mediaGap} />
        <CopyBlock>
          <Paragraph>
            Compatibility was also difficult to anticipate. Incompatible inputs
            became disabled only after a user began dragging a variable. The
            interface provided feedback, but users had to initiate an action to
            discover its restrictions.
          </Paragraph>
          <Paragraph>
            I raised these observations with the CEO and internal
            bioinformaticians. We agreed to prioritize metadata discovery and
            compatibility because both affected multiple visualization workflows.
          </Paragraph>
        </CopyBlock>
      </Section>
      <Gap size={spacing.article.sectionGap} />

      <Section title="Organizing variables by biological meaning">
        <CopyBlock>
          <Paragraph>
            I designed a grouped metadata list to give researchers a more
            structured way to browse. Categories included Sequence &amp; Structure,
            V(D)J Annotation, SHM &amp; Maturation, and Clustering &amp; Diversity.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          {...dataMappingImages["2"]}
          alt="Before and after: metadata organized into biologically meaningful groups"
        />
        <Gap size={spacing.article.mediaGap} />
        <CopyBlock>
          <Paragraph>
            I worked with the CTO on how biologically meaningful groups would be
            formed through Platforma’s underlying algorithms. Engineers explained
            the existing compatibility rules, and we reviewed the proposed
            interface behavior together.
          </Paragraph>
        </CopyBlock>
      </Section>
      <Gap size={spacing.article.sectionGap} />

      <section>
        <H2>Showing compatibility before users commit to an action</H2>
        <Gap size={spacing.base[4]} />
        <CopyBlock>
          <Paragraph>
            I introduced guidance in both directions. Hovering over a variable
            highlighted compatible visualization targets. Selecting a target
            showed which variables were recommended, supported, or forbidden for it.
          </Paragraph>
          <Paragraph>
            This supported two starting points: a researcher could begin with the
            variable they wanted to explore, or with the visualization property
            they wanted to configure.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          {...dataMappingImages["3"]}
          alt="Variable and visualization-target compatibility guidance in both directions"
        />
      </section>
      <Gap size={spacing.article.mediaGap} />
      <Gap size={spacing.article.sectionGap} />

      <Section title="Revising the model after scientist feedback">
        <CopyBlock>
          <Paragraph>
            My initial proposal highlighted recommended mappings and disabled all
            others. Feedback from internal scientists showed that this was too
            restrictive: a mapping could be technically valid without being useful
            for the current analytical goal. I revised the model to keep those
            choices available and distinguish three states:
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.h2Gap} />
        <ArticleSummary
          rows={[
            ["Recommended", "Highlighted as appropriate for the current analytical goal."],
            ["Supported", "Technically valid and still selectable, although generally unhelpful for the current analytical goal."],
            ["Forbidden", "Unavailable because the attachment was technically unsupported."],
          ]}
        />
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          {...dataMappingImages["4"]}
          alt="Revised mapping model showing recommended, supported, and forbidden states"
        />
      </Section>
      <Gap size={spacing.article.mediaGap} />
      <Gap size={spacing.article.sectionGap} />

      <Section title="A proposed next step: contextual suggestions">
        <CopyBlock>
          <Paragraph>
            I also proposed a Suggested metadata group that would surface relevant
            variables based on the blocks in a project and their configuration.
            This extension remained planned when I left and was not part of the
            shipped redesign.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          {...dataMappingImages["5"]}
          alt="Proposed Suggested metadata group, marked as not shipped"
        />
      </Section>
      <Gap size={spacing.article.mediaGap} />
      <Gap size={spacing.article.sectionGap} />

      <Section title="Delivery and observed results">
        <CopyBlock>
          <Paragraph>
            Metadata grouping and compatibility highlighting shipped in the next
            release. I reviewed the implementation and worked with engineers on
            interaction corrections.
          </Paragraph>
          <Paragraph>
            In sessions presenting the redesign to users who had struggled with
            the previous version, I observed less hesitation during configuration.
            Customers described the experience as easier and faster, while
            feedback from colleagues and support records indicated fewer
            mapping-related complaints.
          </Paragraph>
          <Paragraph>
            These were encouraging signals from guided sessions and support
            feedback; task completion time was not measured. To evaluate the
            improvement more rigorously, I would measure completion time and task
            success for representative mapping tasks.
          </Paragraph>
        </CopyBlock>
      </Section>
      <Gap size={spacing.article.sectionGap} />
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
      <H1>Designing a scalable application architecture for complex workflows</H1>
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
      <H1>Bringing AML risk checks into the wallet overview</H1>
      <Gap size={spacing.article.h1Gap} />
      <CopyBlock>
        <Paragraph>
          TR.ENERGY users had to open a separate AML tab to check address risk.
          I brought the latest result onto asset cards, distinguishing unchecked,
          current, and outdated reports. After release, stakeholders reported
          increased use of paid checks. Feedback also revealed different needs:
          frequent users welcomed the summary, while some less frequent users
          found it added clutter. I designed a global visibility setting in response.
        </Paragraph>
      </CopyBlock>
      <Gap size={spacing.base[4]} />
      <ArticleSummary
        rows={[
          ["Product", "TR.ENERGY Wallet · mobile app"],
          ["My role", "Sole Product Designer · interaction design through implementation support"],
          ["Team", "PM, stakeholders, frontend engineers"],
          ["Design", "Approximately 3 weeks, alongside other tasks"],
          ["Project duration", "Approximately 2 months, including delivery and the feedback-driven update"],
          ["Status", "Shipped"],
        ]}
      />
      <Gap size={spacing.article.mediaGap} />
      <ArticleImage
        {...amlImages["1"]}
        alt="AML risk summary integrated into a TR.ENERGY wallet asset card"
      />
      <Gap size={spacing.article.mediaGap} />
      <Gap size={spacing.article.sectionGap} />

      <Section title="Bringing the latest result closer to the task">
        <CopyBlock>
          <Paragraph>
            TR.ENERGY served a mix of users, including crypto professionals making
            frequent transactions and managing substantial funds. The app already
            offered anti-money-laundering (AML) address checks and detailed reports
            through a dedicated tab. Users selected an address there to run a
            check or inspect an earlier report.
          </Paragraph>
          <Paragraph>
            Key users and stakeholders asked to see AML status on the wallet’s
            main screen. I explored how to bring the latest result onto each asset
            card while keeping the card compact. Each card represented one address
            and displayed its own risk score.
          </Paragraph>
          <Paragraph>
            The aim was to make the result easier to find and the next action
            easier to understand. Because checks were paid, encouraging use of the
            existing checking service was also a business consideration.
          </Paragraph>
        </CopyBlock>
      </Section>
      <Gap size={spacing.article.sectionGap} />

      <Section title="Separating risk from report freshness">
        <CopyBlock>
          <Paragraph>
            A score alone could not explain whether an address had never been
            checked or whether its previous result needed updating. I combined a
            percentage and risk bar with an action that changed according to the
            report state.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.base[4]} />
        <ArticleComparisonTable
          label="AML report states and asset-card actions"
          headers={["Report state", "Asset-card display", "Action"]}
          rows={[
            ["Not checked", "No score and an empty bar", "Check starts the checking workflow."],
            ["Current report", "Risk percentage and a colored bar", "View report opens the latest detailed report."],
            ["Outdated result", "Previous percentage remains visible, with the score and bar shown in gray", "Check again starts a new check."],
          ]}
        />
        <Gap size={spacing.article.h2Gap} />
        <CopyBlock>
          <Paragraph>
            For current reports, green, yellow, and red bars represented low,
            medium, and high risk. When a result became outdated, the interface
            retained the previous score but removed its risk color and changed
            the action to “Check again.”
          </Paragraph>
          <Paragraph>
            Reports became outdated after a time interval or new transactions.
            Stakeholders defined the time-based rule; I proposed treating new
            transactions as a reason to refresh the result. The score itself was
            not continuously recalculated: obtaining an updated result required
            another check.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          {...amlImages["2"]}
          alt="Unchecked, current, and outdated AML report states with their corresponding actions"
        />
        <Gap size={spacing.article.mediaGap} />
        <CopyBlock>
          <Paragraph>
            The limited space shaped the design. I explored several layouts and
            selected one with stakeholders that kept the summary within the asset
            card. Changing the action label gave each report state a corresponding
            next step without adding a separate set of controls.
          </Paragraph>
        </CopyBlock>
      </Section>
      <Gap size={spacing.article.sectionGap} />

      <Section title="Connecting the summary to checks and reports">
        <CopyBlock>
          <Paragraph>
            I adapted the checking flow I had designed earlier. Starting from an
            asset card opened a sheet listing the available addresses, with that
            card’s address already selected. The “Check for $1” button displayed
            the cost before users committed to the check.
          </Paragraph>
          <Paragraph>
            After confirmation, the sheet closed and users moved to the reports
            page in the AML tab, where a new entry showed that the check was
            processing. When it completed, the entry displayed the resulting risk
            percentage and level. Tapping it opened the detailed report. Users who
            had left that screen received an in-app or push notification,
            depending on whether they were still using the app.
          </Paragraph>
          <Paragraph>
            The detailed report provided explanations and risk breakdowns beyond
            the compact card summary. Earlier reports remained available in the
            AML tab, including reports whose scores were marked as outdated on the
            asset card.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          {...amlImages["3"]}
          alt="AML checking workflow from address selection and paid confirmation to report details"
        />
      </Section>
      <Gap size={spacing.article.mediaGap} />
      <Gap size={spacing.article.sectionGap} />

      <Section title="Making the summary optional after launch">
        <CopyBlock>
          <Paragraph>
            The first release showed the AML summary on asset cards by default.
            Users who had requested it responded positively, but another group
            reported that the additional information made the interface feel
            heavier. These users made fewer transactions or did not need AML
            information in their everyday wallet view.
          </Paragraph>
          <Paragraph>
            I initially heard this feedback through the PM and support team, then
            read the user messages shared in our project chat. I proposed a global
            setting to control whether AML information appeared on asset cards.
          </Paragraph>
          <Paragraph>
            The update kept AML visible by default and allowed users to hide the
            section across all cards through Settings. This gave users a way to
            adjust the wallet overview to their needs while keeping reports
            accessible through the dedicated AML tab.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          {...amlImages["4"]}
          alt="Global Settings toggle showing wallet asset cards with AML information hidden and visible"
        />
      </Section>
      <Gap size={spacing.article.mediaGap} />
      <Gap size={spacing.article.sectionGap} />

      <Section title="Implementation and feedback">
        <CopyBlock>
          <Paragraph>
            I worked with frontend engineers through implementation, refining
            risk-bar animation, transitions, localized button labels, and
            component states. I also designed error states for connection issues
            and insufficient funds.
          </Paragraph>
          <Paragraph>
            After the initial release, stakeholders reported more Check-button
            taps and completed paid checks. I do not have analytics to quantify
            the increase or isolate the design’s contribution. After the
            visibility update, I personally read positive feedback shared by
            support: users welcomed the option to hide AML information.
            Comprehension and task completion were not measured.
          </Paragraph>
          <Paragraph>
            The project highlighted a trade-off: information valuable to frequent
            users can add clutter for others. Making the summary optional let users
            adapt the wallet overview to their needs.
          </Paragraph>
        </CopyBlock>
      </Section>
    </ArticleShell>
  );
}

function MassPayoutArticle() {
  return (
    <ArticleShell>
      <H1>Designing mass payouts for mobile crypto teams</H1>
      <Gap size={spacing.article.h1Gap} />
      <CopyBlock>
        <Paragraph>
          Crypto Office users paid team members and external partners through
          individual crypto transfers. I proposed and designed a mobile
          batch-payment workflow covering recipient preparation, funding, review,
          and recovery from errors. After launch, I proposed spreadsheet import
          in response to user feedback; the update received positive responses
          from users who had struggled to copy their payout lists.
        </Paragraph>
      </CopyBlock>
      <Gap size={spacing.base[4]} />
      <ArticleSummary
        rows={[
          ["Product", "Crypto Office · Telegram Mini App"],
          ["My role", "Sole Product Designer · end-to-end design"],
          ["Team", "PM, frontend and backend engineers, CTO"],
          [
            "Design",
            <>
              Initial release: approximately 1–2 weeks
              <br />
              Import update: approximately 1 week
            </>,
          ],
          ["Status", "Shipped"],
        ]}
      />
      <Gap size={spacing.article.mediaGap} />
      <ArticleImage
        {...massPayoutImages["1"]}
        alt="Mass payout workflow from recipient preparation to review and completion"
      />
      <Gap size={spacing.article.mediaGap} />
      <Gap size={spacing.article.sectionGap} />

      <Section title="From individual transfers to a batch workflow">
        <CopyBlock>
          <Paragraph>
            Saved contacts made wallet addresses easier to reuse, but users still
            had to configure each payment separately. Stakeholders discussed my
            mass payout proposal with some of our largest users, and we agreed
            to develop it.
          </Paragraph>
          <Paragraph>
            The design challenge was to make a large payout manageable on a small
            screen: users needed to assemble recipients, choose funding sources,
            correct problems, and inspect the financial details before sending.
          </Paragraph>
        </CopyBlock>
      </Section>
      <Gap size={spacing.article.sectionGap} />

      <Section title="Preparing a batch without losing context">
        <CopyBlock>
          <Paragraph>
            Payout preparation involved several supporting decisions, including
            selecting wallets, choosing a currency, and reusing recipient lists.
            I considered separate screens for these settings, but chose contextual
            bottom sheets so users could make a selection and return directly to
            the payout they were preparing.
          </Paragraph>
          <Paragraph>
            The first release supported typing or pasting addresses and amounts,
            as well as saving recipient lists for reuse. Saved lists could be
            edited and updated or saved as a new list, supporting recurring
            payments without rebuilding the recipient data each time.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          {...massPayoutImages["2"]}
          alt="Contextual bottom sheets for payout settings and source-wallet selection"
        />
        <Gap size={spacing.article.mediaGap} />
        <CopyBlock>
          <Paragraph>
            Long wallet addresses competed with payment amounts for limited
            horizontal space. I shortened addresses in the recipient list to a
            beginning-and-ending format, such as{" "}
            <strong style={{ fontWeight: typography.fontWeight.semibold }}>xxxxx…xxxxx</strong>
            , so the address and amount could fit on one line. This kept the list
            compact enough to scan on mobile. When the input field was active,
            addresses expanded to show their full values.
          </Paragraph>
          <Paragraph>
            Teams could also fund a payout from multiple wallets. Engineering
            defined the intermediate payout-wallet mechanism, which collected
            funds before distribution. I designed how users selected source
            wallets and reviewed their combined amount, making that funding
            structure understandable in the interface.
          </Paragraph>
        </CopyBlock>
      </Section>
      <Gap size={spacing.article.sectionGap} />

      <Section title="Recovering without rebuilding the payout">
        <CopyBlock>
          <Paragraph>
            The recipient list kept validation within the preparation flow.
            Invalid addresses, incorrect or missing amounts, and addresses
            incompatible with the selected network were highlighted for
            correction. Empty rows were ignored, so unused spreadsheet rows did
            not create unnecessary errors.
          </Paragraph>
          <Paragraph>
            Insufficient funds required a different response. A user could
            discover the balance problem after already preparing a substantial
            recipient list.
          </Paragraph>
          <Paragraph>
            My initial design offered only a top-up action. After discussing
            interrupted workflows with the PM, I added the option to save the
            payout as a draft. The revised design supported two paths:
          </Paragraph>
          <List>
            <li>
              <strong style={{ fontWeight: typography.fontWeight.semibold }}>Funds can be added now</strong>
              : top up and continue the prepared payout.
            </li>
            <li>
              <strong style={{ fontWeight: typography.fontWeight.semibold }}>Funds are unavailable for now</strong>
              : save a draft and return to it later.
            </li>
          </List>
          <Paragraph>
            This change treated a funding problem as a possible pause in the
            task, rather than assuming the user could resolve it immediately.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          {...massPayoutImages["3"]}
          alt="Insufficient-funds recovery with options to top up or save the payout as a draft"
        />
      </Section>
      <Gap size={spacing.article.mediaGap} />
      <Gap size={spacing.article.sectionGap} />

      <Section title="Reviewing the payout before sending">
        <CopyBlock>
          <Paragraph>
            Before confirmation, users could review the selected currency,
            source wallets, intermediate payout wallet, recipient addresses and
            amounts, total payout amount, and commission in one place. Tapping
            “All” in the “Amounts and receiving addresses” section opened the list
            of full addresses and their corresponding amounts.
          </Paragraph>
          <Paragraph>
            After confirmation, the interface showed that the payout had been
            created and that blockchain processing was still underway. Transfer
            history contained both confirmed and unsuccessful payouts, giving
            users a place to inspect results after processing.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          {...massPayoutImages["4"]}
          alt="Payout review, blockchain processing, and transfer-history results"
        />
      </Section>
      <Gap size={spacing.article.mediaGap} />
      <Gap size={spacing.article.sectionGap} />

      <Section title="Testing and implementation">
        <CopyBlock>
          <Paragraph>
            I reviewed the prototype with the PM and primary stakeholders using
            actual payout lists. Our company, APD, paid salaries in crypto, so
            these internal testers had direct experience with the task.
          </Paragraph>
          <Paragraph>
            During implementation, I worked closely with frontend and backend
            engineers, answered behavior questions, and checked implemented
            error states. I also refined icons and components and added states
            as implementation exposed details that needed clarification.
          </Paragraph>
        </CopyBlock>
      </Section>
      <Gap size={spacing.article.sectionGap} />

      <Section title="Adapting recipient entry after launch">
        <CopyBlock>
          <Paragraph>
            After the first release, the support team shared feedback from
            approximately 15 frequent users working in teams of 50–100 members.
            I also read their messages myself. They maintained payout lists of
            roughly 50–100 addresses and amounts in spreadsheets, and found
            copying that data into the payout input inconvenient.
          </Paragraph>
          <Paragraph>
            Saved lists supported reuse within Crypto Office, but these users
            were already maintaining their payment data elsewhere. I proposed
            spreadsheet import so they could bring that existing data into the
            payout workflow.
          </Paragraph>
          <Paragraph>
            The follow-up release added XLSX upload and import through a Google
            Sheets link. I spent approximately one week designing this update,
            building on the existing recipient-entry flow.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          {...massPayoutImages["5"]}
          alt="Spreadsheet import through XLSX upload or a Google Sheets link"
        />
      </Section>
      <Gap size={spacing.article.mediaGap} />
      <Gap size={spacing.article.sectionGap} />

      <Section title="Delivery and feedback">
        <CopyBlock>
          <Paragraph>
            Mass payout shipped to all users after internal testing. It replaced
            the need to configure each payment individually, and the subsequent
            import update supported users who maintained their payout data in
            spreadsheets.
          </Paragraph>
          <Paragraph>
            After the import update, I personally read positive messages from
            users who had reported difficulty copying their payout lists, also
            reflected in support-team summaries. This feedback was qualitative;
            completion time and error rates were not measured. A next evaluation
            would compare preparation time and successful list entry for
            50–100-recipient payouts using manual entry and spreadsheet import.
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

function PortfolioDesignSystemArticle() {
  return (
    <ArticleShell>
      <H1>Building a scalable design system from scratch</H1>
      <Gap size={spacing.article.h1Gap} />
      <Section title="Context">
        <CopyBlock>
          <Paragraph>
            When I started designing this portfolio, it was still relatively
            small.
          </Paragraph>
          <Paragraph>
            That made it tempting to design individual pages first and formalize
            the system later.
          </Paragraph>
          <Paragraph>
            Instead, I treated the website as a product from the beginning and
            established shared foundations before the number of pages, articles,
            and interaction patterns started growing.
          </Paragraph>
          <Paragraph>
            The goal was not to create a large design system for its own sake.
            It was to build the smallest system the product actually needed,
            while making sure it could expand without becoming inconsistent or
            requiring structural rework.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          src="/capabilities/portfolio-design-system-1.png"
          alt="Portfolio design foundations, typography, color variables, and reusable components in Figma"
          className="aspect-[4096/3010]"
        />
        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.sectionGap} />
      </Section>
      <Section title="Challenge">
        <CopyBlock>
          <Paragraph>
            A portfolio seems simple at first: a few pages, navigation, text,
            images, and calls to action.
          </Paragraph>
          <Paragraph>But the product quickly grew to include:</Paragraph>
          <List>
            <li>multiple page and content types;</li>
            <li>long-form case studies;</li>
            <li>nested article navigation;</li>
            <li>responsive layouts;</li>
            <li>reusable media and interaction patterns;</li>
            <li>and, later, multiple articles within the same capability.</li>
          </List>
          <Paragraph>
            Without a shared system, every new page could introduce slightly
            different spacing, typography, responsive behavior, or component
            logic.
          </Paragraph>
          <Paragraph>
            The challenge was to create enough structure to keep the product
            coherent while avoiding a system that was more complicated than the
            website itself.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.sectionGap} />
      </Section>
      <Section title="Design principles">
        <Subsection title="Start with foundations, not pages">
          <CopyBlock>
            <Paragraph>
              Before treating individual screens as finished designs, I defined
              the foundations that would be reused throughout the product.
            </Paragraph>
            <Paragraph>These included:</Paragraph>
            <List>
              <li>typography hierarchy;</li>
              <li>color roles;</li>
              <li>spacing;</li>
              <li>layout behavior;</li>
              <li>responsive rules;</li>
              <li>and reusable visual patterns.</li>
            </List>
            <Paragraph>
              This meant that individual pages were built from shared decisions
              rather than recreating those decisions locally.
            </Paragraph>
            <Paragraph>
              As the portfolio expanded, the same foundations could support new
              content without changing the visual language.
            </Paragraph>
          </CopyBlock>
          <Gap size={spacing.article.subsectionGap} />
        </Subsection>
        <Subsection title="Turn repeated decisions into reusable components">
          <CopyBlock>
            <Paragraph>
              Not every repeated object needed to become a component
              immediately.
            </Paragraph>
            <Paragraph>
              I created reusable components when a pattern had:
            </Paragraph>
            <List>
              <li>a clear recurring purpose;</li>
              <li>multiple instances;</li>
              <li>meaningful states or variants;</li>
              <li>
                or behavior that needed to stay consistent across the product.
              </li>
            </List>
            <Paragraph>
              This included patterns such as navigation, buttons, capability
              tabs, article structures, media containers, and shared content
              elements.
            </Paragraph>
            <Paragraph>
              The goal was not maximum componentization. It was to remove
              unnecessary one-off decisions.
            </Paragraph>
          </CopyBlock>
          <Gap size={spacing.article.mediaGap} />
          <ArticleImage
            src="/capabilities/portfolio-design-system-2.png"
            alt="Reusable portfolio components and their instances across page layouts"
            className="aspect-[3452/2864]"
          />
          <Gap size={spacing.article.mediaGap} />
          <Gap size={spacing.article.subsectionGap} />
        </Subsection>
        <Subsection title="Keep the system lean">
          <CopyBlock>
            <Paragraph>
              A scalable design system does not need to predict every future
              requirement.
            </Paragraph>
            <Paragraph>I deliberately avoided creating:</Paragraph>
            <List>
              <li>variants with no current use;</li>
              <li>components for unique content;</li>
              <li>
                abstract structures only because they might become useful later;
              </li>
              <li>
                or additional layers of hierarchy that did not solve an existing
                problem.
              </li>
            </List>
            <Paragraph>
              New patterns were added when the product demonstrated a real need
              for them.
            </Paragraph>
            <Paragraph>
              This kept the system understandable while leaving clear places for
              future extension.
            </Paragraph>
          </CopyBlock>
          <Gap size={spacing.article.h3Gap} />
          <p style={typeStyle(typography.article.bodyStrong)}>
            Scalable does not mean large. It means the system can grow without
            becoming inconsistent or requiring structural rework.
          </p>
          <Gap size={spacing.article.subsectionGap} />
        </Subsection>
        <Subsection title="Design responsive behavior as part of the component">
          <CopyBlock>
            <Paragraph>
              Responsive design was not treated as a separate mobile version of
              the website.
            </Paragraph>
            <Paragraph>
              Components and layouts were designed with rules for how they
              should behave as available space changed.
            </Paragraph>
            <Paragraph>Depending on the pattern, this could mean:</Paragraph>
            <List>
              <li>changing layout direction;</li>
              <li>reducing or rebalancing spacing;</li>
              <li>adapting typography;</li>
              <li>restructuring navigation;</li>
              <li>or changing how content and media are arranged.</li>
            </List>
            <Paragraph>
              This allowed the same underlying system to support different
              screen sizes rather than maintaining parallel desktop and mobile
              designs.
            </Paragraph>
          </CopyBlock>
          <Gap size={spacing.article.mediaGap} />
          <ArticleImage
            src="/capabilities/portfolio-design-system-3.png"
            alt="Responsive portfolio navigation and content layouts across screen sizes"
            className="aspect-[2710/1617]"
          />
          <Gap size={spacing.article.mediaGap} />
          <Gap size={spacing.article.subsectionGap} />
        </Subsection>
      </Section>
      <Section title="Connect Figma and production">
        <CopyBlock>
          <Paragraph>
            A design system only becomes useful when its logic survives
            implementation.
          </Paragraph>
          <Paragraph>
            Because I also built the portfolio through an AI-assisted
            development workflow, I could carry the same concepts from Figma
            into the production codebase.
          </Paragraph>
          <Paragraph>The system was reflected in:</Paragraph>
          <List>
            <li>reusable interface components;</li>
            <li>shared styles and tokens;</li>
            <li>consistent responsive behavior;</li>
            <li>and common patterns used across pages and articles.</li>
          </List>
          <Paragraph>
            I used ChatGPT and Codex as part of the implementation workflow
            while remaining responsible for the system structure, design
            decisions, and final design-to-code consistency.
          </Paragraph>
          <Paragraph>
            The goal was not literal one-to-one duplication between Figma and
            code. It was to maintain the same underlying rules across both.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          src="/capabilities/portfolio-design-system-4.png"
          alt="Shared design-system rules connecting Figma components with production code"
          className="aspect-[2872/2164]"
        />
        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.sectionGap} />
      </Section>
      <Section title="Design for extension">
        <CopyBlock>
          <Paragraph>
            The strongest test of the system came after the original website was
            already built.
          </Paragraph>
          <Paragraph>The portfolio continued to grow:</Paragraph>
          <List>
            <li>capability content expanded;</li>
            <li>individual articles received their own routes;</li>
            <li>capabilities gained multiple articles;</li>
            <li>article-level metadata was introduced;</li>
            <li>the Explore navigation evolved to support nested content;</li>
            <li>new case studies were added.</li>
          </List>
          <Paragraph>
            These additions required new content and some new patterns, but they
            did not require rebuilding the product foundations.
          </Paragraph>
          <Paragraph>
            That was the practical test of scalability: the system could absorb
            new requirements without losing consistency or forcing a redesign of
            everything that already existed.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          src="/capabilities/portfolio-design-system-5.png"
          alt="Explore navigation evolving from capability tabs to nested article navigation"
          className="aspect-[2128/1644]"
        />
        <Gap size={spacing.article.mediaGap} />
        <Gap size={spacing.article.sectionGap} />
      </Section>
      <Section title="What I chose not to systematize">
        <CopyBlock>
          <Paragraph>A useful design system also needs boundaries.</Paragraph>
          <Paragraph>
            Some elements were intentionally left local when:
          </Paragraph>
          <List>
            <li>they appeared only once;</li>
            <li>their behavior was tightly coupled to specific content;</li>
            <li>abstraction would make them harder to work with;</li>
            <li>or there was no evidence that they would be reused.</li>
          </List>
          <Paragraph>
            This helped avoid turning the design system into an inventory of
            every object on the website.
          </Paragraph>
          <Paragraph>
            Instead, the system focused on decisions that benefited from
            consistency.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.sectionGap} />
      </Section>
      <Section title="My role">
        <CopyBlock>
          <Paragraph>
            I designed the portfolio and its design system from scratch.
          </Paragraph>
          <Paragraph>My ownership included:</Paragraph>
          <List>
            <li>defining visual and layout foundations;</li>
            <li>establishing Figma variables and reusable patterns;</li>
            <li>designing component architecture and variants;</li>
            <li>defining responsive behavior;</li>
            <li>evolving the system as new content requirements appeared;</li>
            <li>carrying design-system logic into implementation;</li>
            <li>reviewing design-to-code consistency;</li>
            <li>and maintaining the system as the live product expanded.</li>
          </List>
        </CopyBlock>
        <Gap size={spacing.article.sectionGap} />
      </Section>
      <Section title="Outcome">
        <CopyBlock>
          <Paragraph>
            The resulting system is intentionally small, but complete for the
            needs of the product today.
          </Paragraph>
          <Paragraph>It provides:</Paragraph>
          <List>
            <li>consistent foundations across the website;</li>
            <li>reusable components instead of repeated one-off decisions;</li>
            <li>shared responsive behavior;</li>
            <li>a common structure across capability and article pages;</li>
            <li>clear correspondence between design and implementation;</li>
            <li>
              and room for new content and patterns without rebuilding the
              system.
            </li>
          </List>
          <Paragraph>
            Most importantly, the portfolio has already grown beyond its initial
            scope while continuing to use the same underlying foundations.
          </Paragraph>
          <Paragraph>
            The system demonstrates its value not through the number of
            components it contains, but through its ability to keep the product
            coherent as it evolves.
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
  if (articleId === "portfolio-design-system") {
    return <PortfolioDesignSystemArticle />;
  }

  if (articleId === "mass-payout") {
    return <MassPayoutArticle />;
  }

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
