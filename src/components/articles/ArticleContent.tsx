import type { ReactNode } from "react";
import type { ArticleId } from "@/data/capabilities";
import { colors, spacing, typography } from "@/styles";
import msaImages from "@/data/msa-images.json";
import dataMappingImages from "@/data/data-mapping-images.json";
import amlImages from "@/data/aml-images.json";
import massPayoutImages from "@/data/mass-payout-images.json";
import designToProductionImages from "@/data/design-to-production-images.json";
import unifyingHeadersImages from "@/data/unifying-headers-images.json";
import websiteRedesignImages from "@/data/website-redesign-images.json";


const images = {
  complexDecisions1: "/capabilities/complex-decisions-1.png",
  complexDecisions2: "/capabilities/complex-decisions-2.png",
  complexDecisions3: "/capabilities/complex-decisions-3.png",
  complexDecisions4: "/capabilities/complex-decisions-4.png",
};


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
    <h1 style={typeStyle(typography.article.h1)}>
      {children}
    </h1>
  );
}

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 style={typeStyle(typography.article.h2)}>
      {children}
    </h2>
  );
}

function H3({ children }: { children: ReactNode }) {
  return (
    <h3 style={typeStyle(typography.article.h3)}>
      {children}
    </h3>
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
  return (
    <ArticleShell>
      <H1>Unifying headers across Platforma’s workflows</H1>
      <Gap size={spacing.article.h1Gap} />

      <Paragraph>
        Platforma’s table blocks, charts, dialogs, and sheets had accumulated
        different header layouts and usage rules. With a new sequence-analysis
        workspace on the way, I initiated a redesign around a shared header
        component with variants for different contexts.
      </Paragraph>
      <Gap size={spacing.base[4]} />
      <ArticleSummary
        rows={[
          ["Product", "Platforma — biological data analysis software by MiLaboratories"],
          ["My role", "Sole product designer; initiated and led the redesign"],
          ["Scope", "Shared header component, context variants, behavior specifications, documentation, and implementation review"],
          ["Collaboration", "Engineers and stakeholders"],
          ["Timeline", "Approximately five days for the redesign and discussions, alongside other tasks"],
          ["Status", "Shipped across all blocks, workspaces, dialogs, and sheets; available to SDK developers"],
        ]}
      />
      <Gap size={spacing.article.sectionGap} />

      <Section title="Establishing a shared structure">
        <CopyBlock>
          <Paragraph>
            Existing headers differed in control placement, spacing, and padding.
            The upcoming multiple sequence alignment (MSA) workspace added another
            context to support. I proposed a shared component that internal teams
            and developers using Platforma’s SDK could reuse.
          </Paragraph>
          <Paragraph>
            I defined a consistent structure for titles, supporting information,
            and controls, with variants that adapted to each context. For blocks
            and fullscreen workspaces, the specification made those differences
            explicit: the workspace variant included a collapse action and
            adjusted spacing while retaining the shared structure.
          </Paragraph>
          <Paragraph>
            Configuration-based subtitles already existed in Platforma. I
            preserved their optional, user-editable behavior as part of the header
            specification.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          {...unifyingHeadersImages["1"]}
          alt="Separate Platforma header layouts unified into a shared component with block and workspace variants"
        />
        <Gap size={spacing.article.mediaGap} />
      </Section>
      <Gap size={spacing.article.sectionGap} />

      <Section title="Defining behavior when space is limited">
        <CopyBlock>
          <Paragraph>
            Block titles could be long, and the number of actions varied between
            tools. I worked through layout alternatives with engineering and
            documented how the header should allocate space.
          </Paragraph>
          <Paragraph>
            The title used the space available before the controls and truncated
            to one line when necessary. Controls fitted their content and could
            not be pushed out of the header row by a long title. In the compact
            layout, action buttons switched to icons without labels to preserve
            space. Optional subtitles also remained on one line.
          </Paragraph>
          <Paragraph>
            For block and workspace headers, the minimum width matched Platforma’s
            744px working-area minimum. Below that width, the surrounding container
            handled horizontal scrolling. This kept the header row’s height and
            control layout predictable, with scrolling as the trade-off on
            narrower views.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          {...unifyingHeadersImages["2"]}
          alt="Header title truncation and icon-only actions at the minimum 744px working-area width"
        />
        <Gap size={spacing.article.mediaGap} />
      </Section>
      <Gap size={spacing.article.sectionGap} />

      <Section title="Documenting, shipping, and reviewing">
        <CopyBlock>
          <Paragraph>
            I documented the component’s structure, variants, optional content,
            sizing, and overflow behavior in an implementation ticket. Engineers
            used it alongside direct discussions throughout development. I
            reviewed the implemented result and worked with them on corrections.
          </Paragraph>
          <Paragraph>
            The redesign shipped across all blocks, workspaces, dialogs, and
            sheets. Developers subsequently built working blocks without asking
            me for clarification about header usage — an encouraging practical
            signal, although I did not collect formal feedback or measure
            development speed.
          </Paragraph>
          <Paragraph>
            The delivered result was a shared header component with documented
            usage rules, adopted across Platforma and available to SDK developers.
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
      <H1>Redesigning Platforma’s website for different audiences</H1>
      <Gap size={spacing.article.h1Gap} />
      <CopyBlock>
        <Paragraph>
          Platforma had expanded into biological research workflows, developer
          tools, and enterprise deployment options, but its website still offered
          brief explanations of a much smaller product. The CEO initiated a
          redesign to support product evaluation and encourage demo and pilot
          conversations ahead of a marketing campaign.
        </Paragraph>
        <Paragraph>
          As the sole designer, I restructured the information, designed the pages
          and graphics, and built the website in Framer, taking the complete
          redesign through launch in approximately one month.
        </Paragraph>
      </CopyBlock>
      <Gap size={spacing.base[4]} />
      <ArticleSummary
        rows={[
          ["Product", "Platforma — biological data analysis software by MiLaboratories"],
          ["My role", "Sole designer; information architecture, page design, graphics, and Framer implementation"],
          ["Collaboration", "CEO, GTM lead, support team, and a front-end engineer for forms requiring backend connections"],
          ["Timeline", "Approximately one month for the redesign and build, timed to a marketing campaign"],
          ["Status", "Complete redesign shipped; followed by launch fixes and homepage experimentation"],
          ["Website", (
            <a
              key="platforma"
              href="https://platforma.bio/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--border-focus)]"
              style={{ color: colors.text.accent }}
            >
              platforma.bio
            </a>
          )],
        ]}
      />
      <Gap size={spacing.article.sectionGap} />

      <Section title="Giving each workflow room to explain its value">
        <CopyBlock>
          <Paragraph>
            Previously, solutions shared one page, with only two or three
            paragraphs describing each. That left little room to explain how
            Platforma supported tasks such as antibody discovery, immune research,
            and multi-omics analysis.
          </Paragraph>
          <Paragraph>
            I created a Solutions hub with a dedicated page for each workflow,
            combining detailed explanations with workflow examples. Discussions
            with the CEO, who regularly spoke with customers, alongside support
            and the GTM lead, informed the audience needs behind the structure.
          </Paragraph>
          <Paragraph>
            I also created an Application Notes page to bring together case
            studies, application notes, and technical notes. This gave visitors a
            dedicated place to explore practical examples and more detailed
            material.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Platforma Solutions hub, dedicated research workflow pages, and Application Notes"
          {...websiteRedesignImages["1"]}
        />
        <Gap size={spacing.article.mediaGap} />
      </Section>

      <Gap size={spacing.article.sectionGap} />

      <Section title="Separating scientific value from technical evaluation">
        <CopyBlock>
          <Paragraph>
            Scientists needed to understand the research workflows, while
            enterprise evaluators needed information about infrastructure,
            security, and deployment. Developers needed to understand how they
            could extend the product. Academic researchers also had a separate
            route to request access.
          </Paragraph>
          <Paragraph>
            Under Platform, I organized the technical information into three
            pages: Overview, Deployment, and SDK. Each addressed a different
            question: how the platform fits together, how an organization can run
            it, and how technical teams can build on it.
          </Paragraph>
          <Paragraph>
            I designed the page structures and all diagrams and illustrations to
            work alongside the explanations. The CEO defined the positioning,
            supplied the initial copy, and checked technical accuracy; we refined
            the text together during implementation.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          alt="Platforma Overview, Deployment, and SDK pages with explanatory diagrams"
          {...websiteRedesignImages["2"]}
        />
        <Gap size={spacing.article.mediaGap} />
      </Section>

      <Gap size={spacing.article.sectionGap} />

      <Section title="Building, launching, and refining">
        <CopyBlock>
          <Paragraph>
            I implemented the website in Framer, using ChatGPT to challenge my
            reasoning and help with development. A front-end engineer supported
            the forms that required backend connections. After launch, teammates
            reported issues such as broken links and images failing to load,
            which I corrected promptly.
          </Paragraph>
          <Paragraph>
            We then compared four homepage hero variants for an
            antibody-discovery audience, using different combinations of
            headlines, supporting copy, calls to action, and imagery. The team
            tracked engagement and onward navigation and retained the version
            judged to perform best.
          </Paragraph>
          <Paragraph>
            The CEO also relayed positive feedback from customer meetings,
            specifically about the website’s information structure. This provided
            qualitative support for the redesign; I do not have figures
            establishing its effect on demo or pilot requests.
          </Paragraph>
          <Paragraph>
            The delivered website brought workflow explanations, technical
            evaluation, and supporting resources into a shared structure, with
            routes for visitors to explore the product, request a demo, or apply
            for academic access.
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

function ArticleWorkflow({
  rows,
}: {
  rows: readonly (readonly [string, string])[];
}) {
  return (
    <ol className="list-none" style={typeStyle(typography.article.body)}>
      {rows.map(([step, detail], index) => (
        <li
          key={step}
          className="flex flex-wrap items-start gap-[var(--base-5)] py-[var(--base-3)]"
          style={{
            borderBottom:
              index < rows.length - 1
                ? `${colors.border.width.thin} solid ${colors.border.secondary}`
                : undefined,
          }}
        >
          <span
            className="min-w-0 flex-1"
            style={{
              ...typeStyle(typography.article.bodyStrong),
              color: colors.text.secondary,
            }}
          >
            {index + 1}. {step}
          </span>
          <p className="min-w-[240px] flex-1">{detail}</p>
        </li>
      ))}
    </ol>
  );
}

function DesignToProductionArticle() {
  return (
    <ArticleShell>
      <H1>Taking my portfolio from Figma to production with AI</H1>
      <Gap size={spacing.article.h1Gap} />

      <Paragraph>
        I designed and built this portfolio independently, taking it from the first
        element in Figma to a published website in approximately two months.
        ChatGPT and Codex supported the work; I owned the design, directed
        implementation, tested the result, and decided when changes were ready to
        ship. The project established a workflow for maintaining the design system
        across Figma and code and reviewing updates in a separate preview
        environment, Demo, before releasing them to production.
      </Paragraph>
      <Gap size={spacing.base[4]} />
      <ArticleSummary
        rows={[
          ["Product", "Personal portfolio · responsive website"],
          ["My role", "Sole designer and builder · design, implementation direction, QA, and release"],
          ["Team", "Built independently with ChatGPT and Codex; no other contributors"],
          ["Timeline", "Approximately 2 months from initial design to first published version"],
          ["Tools", "Figma, ChatGPT, Codex in VS Code, Next.js, Tailwind CSS, GitHub, Vercel"],
          ["Status", "Live · maintained through ongoing updates"],
        ]}
      />
      <Gap size={spacing.article.mediaGap} />
      <ArticleImage
        {...designToProductionImages["1"]}
        alt="The published portfolio displayed across desktop, tablet, and mobile"
      />
      <Gap size={spacing.article.mediaGap} />
      <Gap size={spacing.article.sectionGap} />

      <Section title="Carrying the design system into code">
        <CopyBlock>
          <Paragraph>
            I wanted a portfolio I could continue to develop as my work evolved.
            That meant bringing its design foundations and reusable components
            into the implementation, including typography, colors, spacing, and
            responsive behavior.
          </Paragraph>
          <Paragraph>
            One practical challenge was translating variable names between
            environments. Figma used slashes to organize variables into groups.
            I wanted to preserve that structure while giving the corresponding
            code tokens names appropriate to their environment. I implemented the
            mapping with Codex, and I subsequently updated variables and components
            while keeping the design system consistent across Figma and code.
          </Paragraph>
          <Paragraph>
            Updates are deliberate: when I change a design, I ask Codex to inspect
            the relevant screens, components, or variables and update their code
            counterparts. The project context identifies where those elements are
            stored. I review the resulting implementation before it reaches
            production.
          </Paragraph>
        </CopyBlock>
        <Gap size={spacing.article.mediaGap} />
        <ArticleImage
          {...designToProductionImages["2"]}
          alt="Matching Figma tokens and reusable ButtonPrimary components with their implementation in code"
        />
        <Gap size={spacing.article.mediaGap} />
      </Section>
      <Gap size={spacing.article.sectionGap} />

      <Section title="Reviewing changes from design to release">
        <Paragraph>
          ChatGPT supported reasoning and specification, while Codex worked in the
          codebase. I used the following workflow to keep design decisions,
          implementation review, and release approval under my control.
        </Paragraph>
        <Gap size={spacing.base[4]} />
        <ArticleWorkflow
          rows={[
            ["Update design", "Screens, components, variables"],
            ["Inspect changes", "Codex proposes updates"],
            ["Review scope", "I approve the update list"],
            ["Build on Demo", "Codex applies changes"],
            ["Test and refine", "I check visuals and behavior"],
            ["Ship to production", "I approve the release"],
          ]}
        />
        <Gap size={spacing.article.h2Gap} />
        <Paragraph>
          On Demo, I checked visual accuracy, sizes, interactive states, and links,
          supported by a dedicated QA chat using guidance I provided. When
          something needed improvement, I requested another iteration and tested
          it again before approving release.
        </Paragraph>
      </Section>
      <Gap size={spacing.article.sectionGap} />

      <Section title="Outcome">
        <CopyBlock>
          <Paragraph>
            The result is the live portfolio you are reading. I delivered its
            first version independently in approximately two months and have
            continued updating its variables, components, and content through
            the same workflow.
          </Paragraph>
          <Paragraph>
            The project gave me practical experience translating design decisions
            into a working website and maintaining it after release. AI extended
            what I could implement independently; defining the experience,
            evaluating the output, and deciding what to ship remained my
            responsibility.
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

export default function ArticleContent({ articleId }: { articleId: ArticleId }) {
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
