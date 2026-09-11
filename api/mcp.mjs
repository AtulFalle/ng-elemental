// packages/mcp/src/vercel-handler.ts
import { createMcpHandler } from "@modelcontextprotocol/server";

// packages/mcp/src/lib/server.ts
import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

// packages/cli/src/lib/add.ts
import { copyFileSync, existsSync as existsSync3, mkdirSync as mkdirSync2, readdirSync } from "node:fs";
import { join as join3 } from "node:path";

// packages/cli/src/lib/component-registry.ts
var REGISTRY_FORBIDDEN_FILENAME_PARTS = [
  ".stories.",
  ".story-host."
];
var COMPONENT_REGISTRY = [
  {
    name: "icon",
    assetGlobs: ["icon.{ts,scss}", "fontawesome.scss"],
    requiredBasenames: ["icon"],
    requiredFiles: ["fontawesome.scss"]
  },
  {
    name: "button",
    assetGlobs: ["button.{ts,html,scss}"],
    requiredBasenames: ["button"]
  },
  {
    name: "label",
    assetGlobs: ["label.{ts,html,scss}"],
    requiredBasenames: ["label"]
  },
  {
    name: "form-error",
    assetGlobs: ["form-error.{ts,html,scss}"],
    requiredBasenames: ["form-error"]
  },
  {
    name: "input",
    assetGlobs: ["input.{ts,html,scss}"],
    requiredBasenames: ["input"]
  },
  {
    name: "checkbox",
    assetGlobs: ["checkbox.{ts,html,scss}"],
    requiredBasenames: ["checkbox"]
  },
  {
    name: "slide-toggle",
    assetGlobs: ["slide-toggle.{ts,html,scss}"],
    requiredBasenames: ["slide-toggle"]
  },
  {
    name: "radio",
    assetGlobs: [
      "radio.{ts,html,scss}",
      "radio-group.{ts,html,scss}",
      "radio.token.ts"
    ],
    requiredBasenames: ["radio", "radio-group", "radio.token"]
  },
  {
    name: "select",
    assetGlobs: [
      "select.{ts,html,scss}",
      "select-item.{ts,html,scss}",
      "select-group.{ts,html,scss}",
      "select-value.ts",
      "select.token.ts"
    ],
    requiredBasenames: [
      "select",
      "select-item",
      "select-group",
      "select-value",
      "select.token"
    ]
  },
  {
    name: "chip",
    assetGlobs: ["chip.{ts,html,scss}"],
    requiredBasenames: ["chip"]
  },
  {
    name: "progress",
    assetGlobs: [
      "progress.{ts,html,scss}",
      "progress-circle.{ts,html,scss}",
      "progress-utils.ts"
    ],
    requiredBasenames: ["progress", "progress-circle", "progress-utils"]
  },
  {
    name: "slider",
    assetGlobs: ["slider.{ts,html,scss}", "slider-utils.ts"],
    requiredBasenames: ["slider", "slider-utils"]
  },
  {
    name: "carousel",
    assetGlobs: [
      "carousel.{ts,html,scss}",
      "carousel-slide.{ts,html,scss}",
      "carousel.token.ts",
      "carousel-utils.ts"
    ],
    requiredBasenames: [
      "carousel",
      "carousel-slide",
      "carousel.token",
      "carousel-utils"
    ]
  },
  {
    name: "avatar",
    assetGlobs: ["avatar.{ts,html,scss}"],
    requiredBasenames: ["avatar"]
  },
  {
    name: "card",
    assetGlobs: ["card.{ts,html,scss}"],
    requiredBasenames: ["card"]
  },
  {
    name: "container",
    assetGlobs: ["container.{ts,html,scss}"],
    requiredBasenames: ["container"]
  },
  {
    name: "stack",
    assetGlobs: ["stack.{ts,html,scss}"],
    requiredBasenames: ["stack"]
  },
  {
    name: "grid",
    assetGlobs: ["grid.{ts,html,scss}"],
    requiredBasenames: ["grid"]
  },
  {
    name: "aspect-ratio",
    assetGlobs: ["aspect-ratio.{ts,html,scss}"],
    requiredBasenames: ["aspect-ratio"]
  },
  {
    name: "scroll-area",
    assetGlobs: ["scroll-area.{ts,html,scss}"],
    requiredBasenames: ["scroll-area"]
  },
  {
    name: "separator",
    assetGlobs: ["separator.{ts,scss}"],
    requiredBasenames: ["separator"]
  },
  {
    name: "resizable",
    assetGlobs: [
      "resizable.{ts,html,scss}",
      "resizable-panel.{ts,html,scss}",
      "resizable-handle.{ts,html,scss}",
      "resizable.token.ts",
      "resizable-utils.ts"
    ],
    requiredBasenames: [
      "resizable",
      "resizable-panel",
      "resizable-handle",
      "resizable.token",
      "resizable-utils"
    ]
  },
  {
    name: "list",
    assetGlobs: [
      "list.{ts,html,scss}",
      "list-item.{ts,html,scss}",
      "list-item-def.ts",
      "list-virtual.ts"
    ],
    requiredBasenames: ["list", "list-item", "list-item-def", "list-virtual"]
  },
  {
    name: "tree",
    assetGlobs: [
      "tree.{ts,html,scss}",
      "tree-item.{ts,html,scss}",
      "tree-node-def.ts",
      "tree.token.ts",
      "tree-utils.ts",
      "tree-virtual.ts"
    ],
    requiredBasenames: [
      "tree",
      "tree-item",
      "tree-node-def",
      "tree.token",
      "tree-utils",
      "tree-virtual"
    ]
  },
  {
    name: "infinite-scroll",
    assetGlobs: ["infinite-scroll.ts"],
    requiredBasenames: ["infinite-scroll"]
  },
  {
    name: "attachment",
    assetGlobs: [
      "attachment.{ts,html,scss}",
      "attachment-media.{ts,html,scss}",
      "attachment-content.{ts,html,scss}",
      "attachment-title.{ts,html,scss}",
      "attachment-description.{ts,html,scss}",
      "attachment-actions.{ts,html,scss}",
      "attachment-action.{ts,html,scss}",
      "attachment-group.{ts,html,scss}",
      "attachment.token.ts"
    ],
    requiredBasenames: [
      "attachment",
      "attachment-media",
      "attachment-content",
      "attachment-title",
      "attachment-description",
      "attachment-actions",
      "attachment-action",
      "attachment-group",
      "attachment.token"
    ]
  },
  {
    name: "file-upload",
    assetGlobs: [
      "file-upload.{ts,html,scss}",
      "file-upload-utils.ts"
    ],
    requiredBasenames: ["file-upload", "file-upload-utils"]
  },
  {
    name: "table",
    assetGlobs: [
      "table.{ts,html,scss}",
      "table-column.ts",
      "table-header.ts",
      "table-cell-def.ts",
      "table-expand.ts",
      "table-virtual.ts",
      "table.token.ts"
    ],
    requiredBasenames: [
      "table",
      "table-column",
      "table-header",
      "table-cell-def",
      "table-expand",
      "table-virtual",
      "table.token"
    ]
  },
  {
    name: "pagination",
    assetGlobs: ["pagination.{ts,html,scss}", "pagination-utils.ts"],
    requiredBasenames: ["pagination", "pagination-utils"]
  },
  {
    name: "skeleton",
    assetGlobs: [
      "skeleton.{ts,html,scss}",
      "skeleton-cover.{ts,scss}",
      "skeleton-target.ts"
    ],
    requiredBasenames: ["skeleton", "skeleton-cover", "skeleton-target"]
  },
  {
    name: "breadcrumb",
    assetGlobs: [
      "breadcrumb.{ts,html,scss}",
      "breadcrumb-item.{ts,html,scss}"
    ],
    requiredBasenames: ["breadcrumb", "breadcrumb-item"]
  },
  {
    name: "tooltip",
    assetGlobs: ["tooltip.ts", "tooltip-bubble.{ts,html,scss}"],
    requiredBasenames: ["tooltip", "tooltip-bubble"]
  },
  {
    name: "menu",
    assetGlobs: [
      "menu.{ts,html,scss}",
      "menu-trigger.ts",
      "menu-panel.{ts,html,scss}",
      "menu-item.{ts,html,scss}",
      "menu-separator.ts",
      "menu-label.ts",
      "menu-position.ts",
      "menu.token.ts"
    ],
    requiredBasenames: [
      "menu",
      "menu-trigger",
      "menu-panel",
      "menu-item",
      "menu-separator",
      "menu-label",
      "menu-position",
      "menu.token"
    ]
  },
  {
    name: "menubar",
    sourceDir: "packages/ui/src/lib/menubar",
    assetGlobs: ["menubar.{ts,html,scss}"],
    requiredBasenames: ["menubar"]
  },
  {
    name: "popover",
    assetGlobs: [
      "popover.{ts,html,scss}",
      "popover-trigger.ts",
      "popover-panel.{ts,html,scss}",
      "popover-close.ts",
      "popover-position.ts",
      "popover.token.ts"
    ],
    requiredBasenames: [
      "popover",
      "popover-trigger",
      "popover-panel",
      "popover-close",
      "popover-position",
      "popover.token"
    ]
  },
  {
    name: "dialog",
    assetGlobs: [
      "dialog.{ts,html,scss}",
      "dialog-close.ts",
      "dialog.token.ts",
      "dialog-ref.ts",
      "dialog.service.ts",
      "dialog-outlet.ts"
    ],
    requiredBasenames: [
      "dialog",
      "dialog-close",
      "dialog.token",
      "dialog-ref",
      "dialog.service",
      "dialog-outlet"
    ]
  },
  {
    name: "alert",
    assetGlobs: ["alert.{ts,html,scss}"],
    requiredBasenames: ["alert"]
  },
  {
    name: "toast",
    assetGlobs: [
      "toast.{ts,html,scss}",
      "toaster.{ts,html,scss}",
      "toast.service.ts"
    ],
    requiredBasenames: ["toast", "toaster", "toast.service"]
  },
  {
    name: "empty-state",
    assetGlobs: ["empty-state.{ts,html,scss}"],
    requiredBasenames: ["empty-state"]
  },
  {
    name: "snackbar",
    assetGlobs: [
      "snackbar.{ts,html,scss}",
      "snackbar.service.ts",
      "snackbar-ref.ts"
    ],
    requiredBasenames: ["snackbar", "snackbar.service", "snackbar-ref"]
  },
  {
    name: "sheet",
    assetGlobs: [
      "sheet.{ts,html,scss}",
      "sheet-close.ts",
      "sheet.token.ts",
      "sheet-ref.ts",
      "sheet.service.ts",
      "sheet-outlet.ts"
    ],
    requiredBasenames: [
      "sheet",
      "sheet-close",
      "sheet.token",
      "sheet-ref",
      "sheet.service",
      "sheet-outlet"
    ]
  },
  {
    name: "drawer",
    assetGlobs: [
      "drawer.{ts,html,scss}",
      "drawer-close.ts",
      "drawer.token.ts",
      "drawer-ref.ts",
      "drawer.service.ts",
      "drawer-outlet.ts"
    ],
    requiredBasenames: [
      "drawer",
      "drawer-close",
      "drawer.token",
      "drawer-ref",
      "drawer.service",
      "drawer-outlet"
    ]
  },
  {
    name: "tabs",
    assetGlobs: [
      "tabs.{ts,html,scss}",
      "tab.{ts,html,scss}",
      "tab-content.ts",
      "tab-label.ts"
    ],
    requiredBasenames: ["tabs", "tab", "tab-content", "tab-label"]
  },
  {
    name: "stepper",
    assetGlobs: [
      "stepper.{ts,html,scss}",
      "step.{ts,html,scss}",
      "step-content.ts",
      "step-label.ts"
    ],
    requiredBasenames: ["stepper", "step", "step-content", "step-label"]
  },
  {
    name: "accordion",
    assetGlobs: [
      "accordion.{ts,html,scss}",
      "accordion-item.{ts,html,scss}",
      "accordion-title.ts",
      "accordion-subtitle.ts",
      "accordion-content.ts",
      "accordion.token.ts"
    ],
    requiredBasenames: [
      "accordion",
      "accordion-item",
      "accordion-title",
      "accordion-subtitle",
      "accordion-content",
      "accordion.token"
    ]
  },
  {
    name: "segmented-button",
    assetGlobs: [
      "segmented-button.{ts,html,scss}",
      "segmented-button-item.{ts,html,scss}",
      "segmented-button.token.ts"
    ],
    requiredBasenames: [
      "segmented-button",
      "segmented-button-item",
      "segmented-button.token"
    ]
  },
  {
    name: "datepicker",
    assetGlobs: [
      "date.ts",
      "calendar.{ts,html,scss}",
      "clock.{ts,html,scss}",
      "date-fields.{ts,html,scss}",
      "date-picker.{ts,html,scss}",
      "date-range-picker.{ts,html,scss}"
    ],
    requiredBasenames: [
      "date",
      "calendar",
      "clock",
      "date-fields",
      "date-picker",
      "date-range-picker"
    ]
  },
  {
    name: "theme",
    sourceDir: "packages/ui/src/lib/theme",
    assetGlobs: ["theme.ts", "theme.token.ts", "tokens.scss", "typography.scss"],
    requiredBasenames: ["theme", "theme.token"],
    requiredFiles: ["tokens.scss", "typography.scss"]
  }
];
var AVAILABLE_COMPONENTS = COMPONENT_REGISTRY.map(
  (entry) => entry.name
);
function isRegistryFilenameAllowed(filename) {
  return !REGISTRY_FORBIDDEN_FILENAME_PARTS.some((part) => filename.includes(part));
}

// packages/cli/src/lib/catalog.ts
var FONT_AWESOME = "@fortawesome/fontawesome-free";
var COMPONENT_CATALOG = [
  {
    name: "icon",
    kind: "component",
    title: "Icon",
    description: "Font Awesome 6 icon by name. Use for chevrons, checks, close, and any glyph.",
    keywords: ["icon", "font awesome", "glyph", "chevron", "check", "close"],
    selectors: ["el-icon"],
    classNames: ["ElIcon"],
    usage: '<el-icon name="check" />',
    registryDependencies: [],
    npmDependencies: [FONT_AWESOME],
    docsPath: "/components/icon",
    category: "components"
  },
  {
    name: "button",
    kind: "component",
    title: "Button",
    description: "Action button with primary, secondary, and ghost variants plus optional icons.",
    keywords: ["button", "action", "cta", "submit"],
    selectors: ["el-button"],
    classNames: ["ElButton"],
    usage: '<el-button variant="primary" iconStart="plus">Add item</el-button>',
    registryDependencies: ["icon"],
    npmDependencies: [],
    docsPath: "/components/button",
    category: "components"
  },
  {
    name: "label",
    kind: "component",
    title: "Label",
    description: "Accessible form label. Pair with a control via htmlFor / inputId.",
    keywords: ["label", "form", "htmlFor"],
    selectors: ["el-label"],
    classNames: ["ElLabel"],
    usage: '<el-label htmlFor="email" variant="default">Email</el-label>',
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/label",
    category: "components"
  },
  {
    name: "form-error",
    kind: "component",
    title: "Form Error",
    description: "Presentational validation message for form fields.",
    keywords: ["error", "validation", "invalid", "form"],
    selectors: ["el-form-error"],
    classNames: ["ElFormError"],
    usage: `<el-label htmlFor="email" required>Email</el-label>
<el-input inputId="email" [(value)]="email" [error]="invalid" />
@if (invalid) {
  <el-form-error id="email-err">Email is required</el-form-error>
}`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/form-error",
    category: "components"
  },
  {
    name: "input",
    kind: "component",
    title: "Input",
    description: "Text field with types, prefix/suffix slots, error state, and optional mask.",
    keywords: ["input", "text field", "textbox", "email", "password"],
    selectors: ["el-input"],
    classNames: ["ElInput"],
    usage: '<el-input [(value)]="email" type="email" placeholder="you@example.com" inputId="email" />',
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/input",
    category: "components"
  },
  {
    name: "checkbox",
    kind: "component",
    title: "Checkbox",
    description: "Labeled checkbox with checked, indeterminate, and required states.",
    keywords: ["checkbox", "tick", "boolean", "agree"],
    selectors: ["el-checkbox"],
    classNames: ["ElCheckbox"],
    usage: `<el-checkbox [(checked)]="accepted" inputId="terms">
  Accept terms and conditions
</el-checkbox>`,
    registryDependencies: ["icon"],
    npmDependencies: [],
    docsPath: "/components/checkbox",
    category: "components"
  },
  {
    name: "slide-toggle",
    kind: "component",
    title: "Slide Toggle",
    description: "On/off switch with size, label position, and optional track/thumb icons.",
    keywords: ["switch", "toggle", "on off", "settings"],
    selectors: ["el-slide-toggle"],
    classNames: ["ElSlideToggle"],
    usage: `<el-slide-toggle [(checked)]="enabled" inputId="notifications">
  Notifications
</el-slide-toggle>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/slide-toggle",
    category: "components"
  },
  {
    name: "radio",
    kind: "component",
    title: "Radio",
    description: "Single-choice radio group with labeled options.",
    keywords: ["radio", "choice", "option group"],
    selectors: ["el-radio", "el-radio-group"],
    classNames: ["ElRadio", "ElRadioGroup"],
    usage: `<el-radio-group [(value)]="contact" ariaLabel="Contact method">
  <el-radio value="email" inputId="contact-email">Email</el-radio>
  <el-radio value="phone" inputId="contact-phone">Phone</el-radio>
</el-radio-group>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/radio",
    category: "components"
  },
  {
    name: "select",
    kind: "component",
    title: "Select",
    description: "Combobox with custom items, groups, and optional multi-select.",
    keywords: ["select", "dropdown", "combobox", "picker", "listbox"],
    selectors: ["el-select", "el-select-item", "el-select-group"],
    classNames: ["ElSelect", "ElSelectItem", "ElSelectGroup"],
    usage: `<el-select [(value)]="city" placeholder="Choose a city" ariaLabel="City">
  <el-select-item value="pune" label="Pune">Pune</el-select-item>
  <el-select-item value="mumbai" label="Mumbai">Mumbai</el-select-item>
</el-select>`,
    registryDependencies: ["icon"],
    npmDependencies: [],
    docsPath: "/components/select",
    category: "components"
  },
  {
    name: "chip",
    kind: "component",
    title: "Chip",
    description: "Assist, filter, and suggestion chips with optional color and icons.",
    keywords: ["chip", "tag", "filter", "badge"],
    selectors: ["el-chip"],
    classNames: ["ElChip"],
    usage: '<el-chip type="filter" [(selected)]="active">Filter</el-chip>',
    registryDependencies: ["icon"],
    npmDependencies: [],
    docsPath: "/components/chip",
    category: "components"
  },
  {
    name: "progress",
    kind: "component",
    title: "Progress",
    description: "Line and circle progress indicators with determinate and indeterminate modes.",
    keywords: ["progress", "spinner", "loading", "percent", "circle"],
    selectors: ["el-progress", "el-progress-circle"],
    classNames: ["ElProgress", "ElProgressCircle"],
    usage: `<el-progress [value]="42" showValue />
<el-progress-circle [value]="72" showValue />`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/progress",
    category: "components"
  },
  {
    name: "slider",
    kind: "component",
    title: "Slider",
    description: "Horizontal single or range value picker with step, ticks, and labels.",
    keywords: ["slider", "range", "volume", "input range"],
    selectors: ["el-slider"],
    classNames: ["ElSlider"],
    usage: `<el-slider [(value)]="volume" [min]="0" [max]="100" showValue />
<el-slider range [(start)]="minPrice" [(end)]="maxPrice" [step]="5" showTicks showValue />`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/slider",
    category: "components"
  },
  {
    name: "carousel",
    kind: "component",
    title: "Carousel",
    description: "Slide carousel with prev/next, dots, loop, autoplay, peek, and drag.",
    keywords: ["carousel", "slideshow", "gallery", "swiper"],
    selectors: ["el-carousel", "el-carousel-slide"],
    classNames: ["ElCarousel", "ElCarouselSlide"],
    usage: `<el-carousel [(index)]="i" loop ariaLabel="Screenshots">
  <el-carousel-slide>One</el-carousel-slide>
  <el-carousel-slide>Two</el-carousel-slide>
</el-carousel>`,
    registryDependencies: ["icon", "button"],
    npmDependencies: [],
    docsPath: "/components/carousel",
    category: "components"
  },
  {
    name: "avatar",
    kind: "component",
    title: "Avatar",
    description: "Circular image, initials, or icon mark for people and accounts.",
    keywords: ["avatar", "profile", "user", "initials", "photo"],
    selectors: ["el-avatar"],
    classNames: ["ElAvatar"],
    usage: `<el-avatar src="/avatar.jpg" alt="Jane Doe" />
<el-avatar initials="JD" alt="Jane Doe" />
<el-avatar icon="user" alt="Account" />`,
    registryDependencies: ["icon"],
    npmDependencies: [],
    docsPath: "/components/avatar",
    category: "components"
  },
  {
    name: "card",
    kind: "component",
    title: "Card",
    description: "Presentational card with media, header, content, and footer slots.",
    keywords: ["card", "panel", "tile", "surface"],
    selectors: ["el-card"],
    classNames: ["ElCard"],
    usage: `<el-card appearance="outlined">
  <div elCardHeader>Title</div>
  <div elCardContent>Body</div>
  <div elCardFooter>Actions</div>
</el-card>
<el-card size="compact">
  <el-icon elCardMedia name="file-lines" />
  <div elCardHeader>report.pdf</div>
  <div elCardContent>2.4 MB</div>
  <div elCardFooter>\u2026</div>
</el-card>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/card",
    category: "components"
  },
  {
    name: "container",
    kind: "component",
    title: "Container",
    description: "Centered layout container with a max width.",
    keywords: ["container", "layout", "page width", "wrapper"],
    selectors: ["el-container"],
    classNames: ["ElContainer"],
    usage: '<el-container size="lg">Page content</el-container>',
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/container",
    category: "layout"
  },
  {
    name: "stack",
    kind: "component",
    title: "Stack",
    description: "Vertical or horizontal stack with gap tokens.",
    keywords: ["stack", "flex", "layout", "column", "row", "gap"],
    selectors: ["el-stack"],
    classNames: ["ElStack"],
    usage: `<el-stack gap="4">
  <div>One</div>
  <div>Two</div>
</el-stack>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/stack",
    category: "layout"
  },
  {
    name: "grid",
    kind: "component",
    title: "Grid",
    description: "Responsive CSS grid with column and gap controls.",
    keywords: ["grid", "layout", "columns", "tiles"],
    selectors: ["el-grid"],
    classNames: ["ElGrid"],
    usage: `<el-grid [columns]="3" gap="4">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
</el-grid>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/grid",
    category: "layout"
  },
  {
    name: "aspect-ratio",
    kind: "component",
    title: "Aspect Ratio",
    description: "Locks child content to a width/height ratio.",
    keywords: ["aspect ratio", "16/9", "media", "layout"],
    selectors: ["el-aspect-ratio"],
    classNames: ["ElAspectRatio"],
    usage: `<el-aspect-ratio ratio="16/9">
  <img src="/cover.jpg" alt="" style="width: 100%; height: 100%; object-fit: cover" />
</el-aspect-ratio>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/aspect-ratio",
    category: "layout"
  },
  {
    name: "scroll-area",
    kind: "component",
    title: "Scroll Area",
    description: "Accessible scrollable region for overflow content.",
    keywords: ["scroll", "overflow", "panel"],
    selectors: ["el-scroll-area"],
    classNames: ["ElScrollArea"],
    usage: `<el-scroll-area ariaLabel="Notes" style="height: 12rem">
  Long content\u2026
</el-scroll-area>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/scroll-area",
    category: "layout"
  },
  {
    name: "separator",
    kind: "component",
    title: "Separator",
    description: "Horizontal or vertical rule for grouping content.",
    keywords: ["separator", "divider", "hr", "rule"],
    selectors: ["el-separator"],
    classNames: ["ElSeparator"],
    usage: `<el-separator />
<el-separator orientation="vertical" />`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/separator",
    category: "layout"
  },
  {
    name: "resizable",
    kind: "component",
    title: "Resizable",
    description: "Draggable accessible split panels.",
    keywords: ["resizable", "split", "pane", "layout", "handle"],
    selectors: ["el-resizable", "el-resizable-panel", "el-resizable-handle"],
    classNames: ["ElResizable", "ElResizablePanel", "ElResizableHandle"],
    usage: `<el-resizable>
  <el-resizable-panel [defaultSize]="30" [min]="15">A</el-resizable-panel>
  <el-resizable-handle />
  <el-resizable-panel [min]="20">B</el-resizable-panel>
</el-resizable>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/resizable",
    category: "layout"
  },
  {
    name: "list",
    kind: "component",
    title: "List",
    description: "Stacked rows with leading, title, description, and trailing slots. Optional virtual window.",
    keywords: ["list", "rows", "inbox", "virtual"],
    selectors: ["el-list", "el-list-item"],
    classNames: ["ElList", "ElListItem", "ElListItemDef"],
    usage: `<el-list ariaLabel="Inbox">
  <el-list-item>
    <el-avatar elListLeading initials="AL" alt="Ada Lovelace" />
    <span elListTitle>Ada Lovelace</span>
    <span elListDescription>Analytical Engine notes</span>
    <span elListTrailing>09:12</span>
  </el-list-item>
</el-list>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/list",
    category: "components"
  },
  {
    name: "tree",
    kind: "component",
    title: "Tree",
    description: "Hierarchical tree with expand, cascade checkboxes, slots, and optional virtual rows.",
    keywords: ["tree", "hierarchy", "files", "nested", "folder"],
    selectors: ["el-tree", "el-tree-item"],
    classNames: ["ElTree", "ElTreeItem", "ElTreeNodeDef"],
    usage: `<el-tree [(expanded)]="open" ariaLabel="Files">
  <el-tree-item value="docs" label="Documents">
    <el-icon elTreeLeading name="folder" />
    <el-tree-item value="resume" label="Resume.pdf" />
  </el-tree-item>
</el-tree>`,
    registryDependencies: ["icon", "checkbox", "button"],
    npmDependencies: [],
    docsPath: "/components/tree",
    category: "components"
  },
  {
    name: "infinite-scroll",
    kind: "directive",
    title: "Infinite Scroll",
    description: "Attribute directive that emits loadMore when the user scrolls near the end.",
    keywords: ["infinite", "scroll", "pagination", "load more", "lazy"],
    selectors: ["[elInfiniteScroll]"],
    classNames: ["ElInfiniteScroll"],
    usage: `<div
  elInfiniteScroll
  [disabled]="loading()"
  [complete]="done()"
  (loadMore)="loadPage()"
>
  <el-list>
    @for (item of items(); track item.id) {
      <el-list-item>{{ item.title }}</el-list-item>
    }
  </el-list>
</div>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/infinite-scroll",
    category: "components"
  },
  {
    name: "attachment",
    kind: "component",
    title: "Attachment",
    description: "File or image attachment card with upload states and actions.",
    keywords: ["attachment", "file card", "upload preview"],
    selectors: [
      "el-attachment",
      "el-attachment-media",
      "el-attachment-content",
      "el-attachment-title",
      "el-attachment-description",
      "el-attachment-actions",
      "el-attachment-action",
      "el-attachment-group"
    ],
    classNames: [
      "ElAttachment",
      "ElAttachmentMedia",
      "ElAttachmentContent",
      "ElAttachmentTitle",
      "ElAttachmentDescription",
      "ElAttachmentActions",
      "ElAttachmentAction",
      "ElAttachmentGroup"
    ],
    usage: `<el-attachment state="done">
  <el-attachment-media>
    <el-icon name="file-lines" />
  </el-attachment-media>
  <el-attachment-content>
    <el-attachment-title>sales-dashboard.pdf</el-attachment-title>
    <el-attachment-description>PDF \xB7 2.4 MB</el-attachment-description>
  </el-attachment-content>
  <el-attachment-actions>
    <el-attachment-action ariaLabel="Remove sales-dashboard.pdf" />
  </el-attachment-actions>
</el-attachment>`,
    registryDependencies: ["icon", "button"],
    npmDependencies: [],
    docsPath: "/components/attachment",
    category: "components"
  },
  {
    name: "file-upload",
    kind: "component",
    title: "File Upload",
    description: "Dropzone that accepts files and renders attachments automatically.",
    keywords: ["upload", "dropzone", "files", "drag drop"],
    selectors: ["el-file-upload"],
    classNames: ["ElFileUpload"],
    usage: `<el-file-upload [(files)]="files" multiple accept="image/*,.pdf">
  PNG, JPG, or PDF up to 5 MB
</el-file-upload>`,
    registryDependencies: ["attachment", "button", "icon", "form-error"],
    npmDependencies: [],
    docsPath: "/components/file-upload",
    category: "components"
  },
  {
    name: "table",
    kind: "component",
    title: "Table",
    description: "Data table with columns, sort, sticky header, expand rows, and optional virtualization.",
    keywords: ["table", "datagrid", "rows", "columns", "sort"],
    selectors: ["el-table", "el-table-column"],
    classNames: ["ElTable", "ElTableColumn", "ElTableHeader", "ElTableCell", "ElTableExpand"],
    usage: `<el-table [data]="users">
  <el-table-column name="name" label="Name" sortable />
  <el-table-column name="status" label="Status">
    <ng-template elTableCell let-user>
      <el-chip>{{ user.status }}</el-chip>
    </ng-template>
  </el-table-column>
</el-table>`,
    registryDependencies: ["icon"],
    npmDependencies: [],
    docsPath: "/components/table",
    category: "components"
  },
  {
    name: "pagination",
    kind: "component",
    title: "Pagination",
    description: "Page window with ellipsis and optional page-size select.",
    keywords: ["pagination", "pager", "pages"],
    selectors: ["el-pagination"],
    classNames: ["ElPagination"],
    usage: '<el-pagination [(page)]="page" [total]="100" [pageSize]="10" />',
    registryDependencies: ["icon", "button", "select"],
    npmDependencies: [],
    docsPath: "/components/pagination",
    category: "components"
  },
  {
    name: "skeleton",
    kind: "component",
    title: "Skeleton",
    description: "Text, circular, and rectangular placeholders, plus [elSkeleton] to cover a host.",
    keywords: ["skeleton", "placeholder", "loading", "shimmer"],
    selectors: ["el-skeleton", "[elSkeleton]"],
    classNames: ["ElSkeleton", "ElSkeletonDirective"],
    usage: `<el-skeleton [lines]="3" />
<button [elSkeleton]="loading">Save</button>
<input [elSkeleton]="loading" />`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/skeleton",
    category: "components"
  },
  {
    name: "breadcrumb",
    kind: "component",
    title: "Breadcrumb",
    description: "Navigation trail for the current page location.",
    keywords: ["breadcrumb", "navigation", "path", "crumbs"],
    selectors: ["el-breadcrumb", "el-breadcrumb-item"],
    classNames: ["ElBreadcrumb", "ElBreadcrumbItem"],
    usage: `<el-breadcrumb ariaLabel="Breadcrumb">
  <el-breadcrumb-item href="/">Home</el-breadcrumb-item>
  <el-breadcrumb-item href="/docs">Components</el-breadcrumb-item>
  <el-breadcrumb-item current>Chip</el-breadcrumb-item>
</el-breadcrumb>`,
    registryDependencies: ["icon"],
    npmDependencies: [],
    docsPath: "/components/breadcrumb",
    category: "components"
  },
  {
    name: "tooltip",
    kind: "directive",
    title: "Tooltip",
    description: "Hover and focus tooltip with an arrow toward the trigger.",
    keywords: ["tooltip", "hint", "hover", "title"],
    selectors: ["[elTooltip]"],
    classNames: ["ElTooltip"],
    usage: '<el-button elTooltip="Save file">Save</el-button>',
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/tooltip",
    category: "components"
  },
  {
    name: "menu",
    kind: "component",
    title: "Menu",
    description: "Dropdown menu with nested submenus and a click or context-menu trigger.",
    keywords: ["menu", "dropdown menu", "context menu", "actions"],
    selectors: ["el-menu", "el-menu-panel", "el-menu-item"],
    classNames: ["ElMenu", "ElMenuPanel", "ElMenuItem", "ElMenuTrigger"],
    usage: `<el-menu>
  <el-button elMenuTrigger>Actions</el-button>
  <el-menu-panel>
    <el-menu-item>Cut</el-menu-item>
    <el-menu-item>Copy</el-menu-item>
  </el-menu-panel>
</el-menu>`,
    registryDependencies: ["icon"],
    npmDependencies: [],
    docsPath: "/components/menu",
    category: "components"
  },
  {
    name: "menubar",
    kind: "component",
    title: "Menubar",
    description: "Application menu bar that hosts ElMenu children.",
    keywords: ["menubar", "application menu", "toolbar menu"],
    selectors: ["el-menubar"],
    classNames: ["ElMenubar"],
    usage: `<el-menubar ariaLabel="Application">
  <el-menu>
    <el-button elMenuTrigger variant="ghost" size="sm">File</el-button>
    <el-menu-panel>
      <el-menu-item>New</el-menu-item>
    </el-menu-panel>
  </el-menu>
</el-menubar>`,
    registryDependencies: ["menu", "icon", "button"],
    npmDependencies: [],
    docsPath: "/components/menubar",
    category: "components"
  },
  {
    name: "popover",
    kind: "component",
    title: "Popover",
    description: "Positioned overlay for arbitrary content.",
    keywords: ["popover", "overlay", "flyout", "panel"],
    selectors: ["el-popover", "el-popover-panel"],
    classNames: ["ElPopover", "ElPopoverPanel", "ElPopoverTrigger"],
    usage: `<el-popover>
  <el-button elPopoverTrigger>Details</el-button>
  <el-popover-panel>
    <span elPopoverTitle>Assignee</span>
    Ada Lovelace
  </el-popover-panel>
</el-popover>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/popover",
    category: "components"
  },
  {
    name: "dialog",
    kind: "component",
    title: "Dialog",
    description: "Native modal dialog with slots, or ElDialogService.open() for a custom component.",
    keywords: ["dialog", "modal", "overlay", "popup", "confirm", "service"],
    selectors: ["el-dialog"],
    classNames: ["ElDialog", "ElDialogClose", "ElDialogService"],
    usage: `<el-dialog [(open)]="open" title="Edit profile">
  <div elDialogContent>\u2026</div>
  <div elDialogFooter>
    <el-button elDialogClose variant="ghost">Cancel</el-button>
  </div>
</el-dialog>
this.dialog.open(EditUserDialog, { data: { userId: 1 }, title: 'Edit user' });`,
    registryDependencies: ["icon"],
    npmDependencies: [],
    docsPath: "/components/dialog",
    category: "components"
  },
  {
    name: "alert",
    kind: "component",
    title: "Alert",
    description: "Inline status banner with optional dismiss.",
    keywords: ["alert", "banner", "status", "inline message"],
    selectors: ["el-alert"],
    classNames: ["ElAlert"],
    usage: `<el-alert color="success" title="Saved" dismissible (dismissed)="show.set(false)">
  Your changes were written.
</el-alert>`,
    registryDependencies: ["icon"],
    npmDependencies: [],
    docsPath: "/components/alert",
    category: "components"
  },
  {
    name: "toast",
    kind: "component",
    title: "Toast",
    description: "Overlay notifications. Place el-toaster once in the shell and call ElToastService.show().",
    keywords: ["toast", "snackbar", "notification", "toaster", "service"],
    selectors: ["el-toast", "el-toaster"],
    classNames: ["ElToast", "ElToaster", "ElToastService"],
    usage: `import { ElToaster } from './ui/toast/toaster';
<el-toaster />
this.toast.show('Saved', { color: 'success' });`,
    registryDependencies: ["icon"],
    npmDependencies: [],
    docsPath: "/components/toast",
    category: "components"
  },
  {
    name: "empty-state",
    kind: "component",
    title: "Empty State",
    description: "Placeholder with icon, copy, and action slots when a view has no data.",
    keywords: ["empty", "blank", "placeholder", "no results", "zero state"],
    selectors: ["el-empty-state"],
    classNames: ["ElEmptyState"],
    usage: `<el-empty-state icon="folder-open" title="No projects" description="Create a project to get started.">
  <div elEmptyStateActions>
    <el-button>Create project</el-button>
  </div>
</el-empty-state>`,
    registryDependencies: ["icon"],
    npmDependencies: [],
    docsPath: "/components/empty-state",
    category: "components"
  },
  {
    name: "snackbar",
    kind: "component",
    title: "Snackbar",
    description: "Single action bar with optional projected bulk controls, or ElSnackbarService.open().",
    keywords: ["snackbar", "action bar", "undo", "bulk", "service"],
    selectors: ["el-snackbar"],
    classNames: ["ElSnackbar", "ElSnackbarService"],
    usage: `<el-snackbar [(open)]="open" message="File deleted" action="Undo" (actionClick)="undo()" />
this.snackbar.open('File deleted', { action: 'Undo', duration: 4000 });`,
    registryDependencies: ["icon"],
    npmDependencies: [],
    docsPath: "/components/snackbar",
    category: "components"
  },
  {
    name: "sheet",
    kind: "component",
    title: "Sheet",
    description: "Edge panel with slots, or ElSheetService.open() for a custom component.",
    keywords: ["sheet", "bottom sheet", "panel", "overlay", "service"],
    selectors: ["el-sheet"],
    classNames: ["ElSheet", "ElSheetClose", "ElSheetService"],
    usage: `<el-sheet [(open)]="open" title="Filters" side="bottom" size="md">
  <div elSheetContent>\u2026</div>
  <div elSheetFooter>
    <el-button elSheetClose variant="ghost">Cancel</el-button>
  </div>
</el-sheet>
this.sheet.open(EditFilters, { data: { userId: 1 }, title: 'Filters', side: 'bottom' });`,
    registryDependencies: ["icon"],
    npmDependencies: [],
    docsPath: "/components/sheet",
    category: "components"
  },
  {
    name: "drawer",
    kind: "component",
    title: "Drawer",
    description: "Side panel with slots, focus trap, and ElDrawerService.open() for a custom component.",
    keywords: ["drawer", "sidebar", "navigation", "panel", "overlay", "service"],
    selectors: ["el-drawer"],
    classNames: ["ElDrawer", "ElDrawerClose", "ElDrawerService"],
    usage: `<el-drawer [(open)]="open" title="Navigation" side="left" size="md">
  <div elDrawerContent>\u2026</div>
</el-drawer>
this.drawer.open(WorkspaceDrawer, { title: 'Navigation', side: 'left' });`,
    registryDependencies: ["icon"],
    npmDependencies: [],
    docsPath: "/components/drawer",
    category: "components"
  },
  {
    name: "tabs",
    kind: "component",
    title: "Tabs",
    description: "Tabbed panels with ng-template content and overflow chevrons.",
    keywords: ["tabs", "tabset", "panels"],
    selectors: ["el-tabs", "el-tab"],
    classNames: ["ElTabs", "ElTab", "ElTabContent", "ElTabLabel"],
    usage: `<el-tabs [(value)]="selected" ariaLabel="Account">
      <el-tab value="overview" label="Overview">
        <ng-template elTabContent>
          <p>Any HTML goes here.</p>
        </ng-template>
      </el-tab>
      <el-tab value="billing" label="Billing">
        <ng-template elTabContent>
          <p>Billing details.</p>
        </ng-template>
      </el-tab>
    </el-tabs>`,
    registryDependencies: ["icon"],
    npmDependencies: [],
    docsPath: "/components/tabs",
    category: "components"
  },
  {
    name: "stepper",
    kind: "component",
    title: "Stepper",
    description: "Multi-step flow with linear mode and next() / previous().",
    keywords: ["stepper", "wizard", "steps", "onboarding"],
    selectors: ["el-stepper", "el-step"],
    classNames: ["ElStepper", "ElStep", "ElStepContent", "ElStepLabel"],
    usage: `<el-stepper [(value)]="step" ariaLabel="Onboarding">
  <el-step value="account" label="Account">
    <ng-template elStepContent>
      <p>Account fields.</p>
    </ng-template>
  </el-step>
  <el-step value="plan" label="Plan">
    <ng-template elStepContent>
      <p>Plan fields.</p>
    </ng-template>
  </el-step>
</el-stepper>`,
    registryDependencies: ["icon"],
    npmDependencies: [],
    docsPath: "/components/stepper",
    category: "components"
  },
  {
    name: "accordion",
    kind: "component",
    title: "Accordion",
    description: "Expandable panels with single or multiple open items.",
    keywords: ["accordion", "collapse", "expand", "disclosure"],
    selectors: ["el-accordion", "el-accordion-item"],
    classNames: ["ElAccordion", "ElAccordionItem", "ElAccordionTitle", "ElAccordionSubtitle", "ElAccordionContent"],
    usage: `<el-accordion variant="single" [(value)]="open" ariaLabel="Order details">
  <el-accordion-item value="shipping" title="Shipping" subtitle="2\u20135 business days">
    <ng-template elAccordionContent>
      <p>Any HTML or components.</p>
    </ng-template>
  </el-accordion-item>
  <el-accordion-item value="billing" title="Billing">
    <ng-template elAccordionContent>
      <p>Billing details.</p>
    </ng-template>
  </el-accordion-item>
</el-accordion>`,
    registryDependencies: ["icon"],
    npmDependencies: [],
    docsPath: "/components/accordion",
    category: "components"
  },
  {
    name: "segmented-button",
    kind: "component",
    title: "Segmented Button",
    description: "Single-choice segmented control.",
    keywords: ["segmented", "toggle group", "segmented control", "view mode"],
    selectors: ["el-segmented-button", "el-segmented-button-item"],
    classNames: ["ElSegmentedButton", "ElSegmentedButtonItem"],
    usage: `<el-segmented-button [(value)]="view" ariaLabel="View mode">
  <el-segmented-button-item value="list">List</el-segmented-button-item>
  <el-segmented-button-item value="grid">Grid</el-segmented-button-item>
</el-segmented-button>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/components/segmented-button",
    category: "components"
  },
  {
    name: "datepicker",
    kind: "component",
    title: "Date Picker",
    description: "Date and date-range pickers with calendar, clock, and DD-MM-YYYY fields.",
    keywords: ["date", "datepicker", "calendar", "time", "range", "daterange"],
    selectors: ["el-date-picker", "el-date-range-picker"],
    classNames: ["ElDatePicker", "ElDateRangePicker"],
    usage: `<el-date-picker [(value)]="when" mode="date" />
<el-date-range-picker [(value)]="range" />`,
    registryDependencies: ["icon"],
    npmDependencies: [],
    docsPath: "/components/datepicker",
    category: "components"
  },
  {
    name: "theme",
    kind: "theme",
    title: "Theme",
    description: "Design tokens, ElThemeService, and provideElTheme() for light and dark mode.",
    keywords: ["theme", "tokens", "css variables", "dark mode", "brand"],
    selectors: [],
    classNames: ["ElThemeService"],
    usage: `// styles.scss \u2014 load Inter, then:
// @use './theme/tokens';
// @use './theme/typography';
// Edit BRAND in tokens.scss; use .el-text-h1 \u2026 .el-text-muted for prose
// app.config.ts \u2014 provideElTheme({ mode: 'light' })`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: "/theming",
    category: "theming"
  }
];
var CATALOG_BY_NAME = new Map(
  COMPONENT_CATALOG.map((entry) => [entry.name, entry])
);
function getCatalogEntry(name) {
  const entry = CATALOG_BY_NAME.get(name);
  if (!entry) {
    throw new Error(
      `Unknown component "${name}". Available: ${AVAILABLE_COMPONENTS.join(", ")}`
    );
  }
  return entry;
}
function listCatalog(query = {}) {
  return COMPONENT_CATALOG.filter((entry) => !query.kind || entry.kind === query.kind).map(
    (entry) => entry
  );
}
function searchCatalog(query, options = {}) {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return [];
  }
  return listCatalog(options).map((entry) => ({ entry, score: scoreCatalogEntry(entry, needle) })).filter((row) => row.score > 0).sort((a, b) => b.score - a.score || a.entry.name.localeCompare(b.entry.name)).map((row) => row.entry);
}
function scoreCatalogEntry(entry, query) {
  const name = entry.name.toLowerCase();
  const title = entry.title.toLowerCase();
  const description = entry.description.toLowerCase();
  const keywords = entry.keywords.map((keyword) => keyword.toLowerCase());
  const selectors = entry.selectors.map((selector) => selector.toLowerCase());
  const classNames = entry.classNames.map((className) => className.toLowerCase());
  if (name === query) {
    return 100;
  }
  if (keywords.includes(query)) {
    return 90;
  }
  if (name.startsWith(query) || name.includes(query)) {
    return 80;
  }
  if (title.includes(query)) {
    return 70;
  }
  if (keywords.some((keyword) => keyword.includes(query) || query.includes(keyword))) {
    return 65;
  }
  if (selectors.some((selector) => selector.includes(query))) {
    return 50;
  }
  if (classNames.some((className) => className.includes(query))) {
    return 45;
  }
  if (description.includes(query)) {
    return 30;
  }
  return 0;
}

// packages/cli/src/lib/config.ts
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
var CONFIG_FILENAME = "elemental.json";
var DEFAULT_COMPONENTS_DIR = "src/app/ui";
function isAngularProject(cwd) {
  const packageJsonPath = join(cwd, "package.json");
  if (existsSync(packageJsonPath)) {
    try {
      const pkg = JSON.parse(readFileSync(packageJsonPath, "utf8"));
      if (pkg.dependencies?.["@angular/core"] || pkg.devDependencies?.["@angular/core"]) {
        return true;
      }
    } catch {
    }
  }
  return existsSync(join(cwd, "angular.json")) || existsSync(join(cwd, "project.json"));
}
function readConfig(cwd) {
  const configPath = join(cwd, CONFIG_FILENAME);
  if (!existsSync(configPath)) {
    throw new Error(
      `No ${CONFIG_FILENAME} found. Run \`npx @ng-elemental/cli init\` first.`
    );
  }
  const parsed = JSON.parse(readFileSync(configPath, "utf8"));
  if (!parsed.componentsDir || typeof parsed.componentsDir !== "string") {
    throw new Error(
      `${CONFIG_FILENAME} is invalid. Expected a string "componentsDir" field.`
    );
  }
  return { componentsDir: parsed.componentsDir };
}
function writeConfig(cwd, config) {
  writeFileSync(
    join(cwd, CONFIG_FILENAME),
    `${JSON.stringify(config, null, 2)}
`,
    "utf8"
  );
}
function ensureComponentsDir(cwd, componentsDir) {
  mkdirSync(join(cwd, componentsDir), { recursive: true });
}

// packages/cli/src/lib/registry.ts
import { existsSync as existsSync2 } from "node:fs";
import { dirname, join as join2 } from "node:path";
import { fileURLToPath } from "node:url";
function getRegistryRoot() {
  const here = registryDir();
  const bundled = join2(here, "registry");
  if (existsSync2(bundled)) {
    return bundled;
  }
  const fromBuiltCli = join2(here, "../../../../dist/packages/cli/registry");
  if (existsSync2(fromBuiltCli)) {
    return fromBuiltCli;
  }
  return bundled;
}
function getComponentRegistryDir(name) {
  return join2(getRegistryRoot(), name);
}
function registryDir() {
  try {
    const dir = eval("__dirname");
    if (typeof dir === "string" && dir.length > 0) {
      return dir;
    }
  } catch {
  }
  return dirname(fileURLToPath(import.meta.url));
}

// packages/cli/src/lib/add.ts
function copyRegistryComponent(cwd, name, options = {}) {
  const config = readConfig(cwd);
  const destDir = join3(cwd, config.componentsDir, name);
  if (existsSync3(destDir)) {
    if (options.skipIfExists) {
      return false;
    }
    if (!options.force) {
      throw new Error(
        `${config.componentsDir}/${name} already exists. Use --force to overwrite.`
      );
    }
  }
  const srcDir = getComponentRegistryDir(name);
  if (!existsSync3(srcDir)) {
    throw new Error(
      `Registry is missing component "${name}". Rebuild or reinstall @ng-elemental/cli.`
    );
  }
  copyComponentFiles(srcDir, destDir);
  return true;
}
function copyComponentFiles(srcDir, destDir) {
  mkdirSync2(destDir, { recursive: true });
  for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
    if (!entry.isFile() || !isRegistryFilenameAllowed(entry.name)) {
      continue;
    }
    copyFileSync(join3(srcDir, entry.name), join3(destDir, entry.name));
  }
}
function toAppImportPath(componentsDir, componentName) {
  const normalized = componentsDir.replace(/\\/g, "/").replace(/^src\/app\/?/, "");
  const relative2 = normalized ? `${normalized}/${componentName}/${componentName}` : `${componentName}/${componentName}`;
  return `./${relative2}`;
}

// packages/cli/src/lib/init.ts
import { existsSync as existsSync5 } from "node:fs";
import { join as join5 } from "node:path";

// packages/cli/src/lib/prompt.ts
import { createInterface } from "node:readline/promises";
function isInteractive(yes) {
  return Boolean(process.stdin.isTTY) && !yes;
}
async function promptText(question, defaultValue, interactive) {
  if (!interactive) {
    return defaultValue;
  }
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = await rl.question(`${question} (${defaultValue}): `);
    return answer.trim() || defaultValue;
  } finally {
    rl.close();
  }
}
async function promptYesNo(question, defaultYes, interactive) {
  if (!interactive) {
    return defaultYes;
  }
  const hint = defaultYes ? "Y/n" : "y/N";
  const answer = await promptText(`${question} [${hint}]`, defaultYes ? "y" : "n", true);
  const normalized = answer.trim().toLowerCase();
  if (normalized === "y" || normalized === "yes") {
    return true;
  }
  if (normalized === "n" || normalized === "no") {
    return false;
  }
  return defaultYes;
}

// packages/cli/src/lib/styles.ts
import { existsSync as existsSync4, readFileSync as readFileSync2, writeFileSync as writeFileSync2 } from "node:fs";
import { dirname as dirname2, join as join4, relative } from "node:path";
var STYLES_SNIPPET_MARKER = "theme/tokens";
function detectStylesPath(cwd) {
  const candidates = ["src/styles.scss", "src/styles.css"];
  for (const candidate of candidates) {
    if (existsSync4(join4(cwd, candidate))) {
      return candidate;
    }
  }
  return detectStylesFromProjectConfig(cwd);
}
function detectStylesFromProjectConfig(cwd) {
  for (const file of ["angular.json", "project.json"]) {
    const full = join4(cwd, file);
    if (!existsSync4(full)) {
      continue;
    }
    try {
      const parsed = JSON.parse(readFileSync2(full, "utf8"));
      const styles = findStylesArray(parsed);
      const first = styles?.find((entry) => typeof entry === "string");
      if (typeof first === "string" && existsSync4(join4(cwd, first))) {
        return first;
      }
    } catch {
    }
  }
  return void 0;
}
function findStylesArray(value) {
  if (!value || typeof value !== "object") {
    return void 0;
  }
  const record = value;
  if (Array.isArray(record["styles"])) {
    return record["styles"];
  }
  for (const nested of Object.values(record)) {
    const found = findStylesArray(nested);
    if (found) {
      return found;
    }
  }
  return void 0;
}
function toTokensUsePath(stylesFileAbs, componentsDirAbs) {
  const to = join4(componentsDirAbs, "theme", "tokens");
  let rel = relative(dirname2(stylesFileAbs), to).replace(/\\/g, "/");
  if (!rel.startsWith(".")) {
    rel = `./${rel}`;
  }
  return rel;
}
function buildStylesSnippet(usePath) {
  const typographyPath = usePath.replace(/tokens$/, "typography");
  return `
@use '${usePath}';
@use '${typographyPath}';

// Load Inter (link tag, Google Fonts, or @fontsource/inter) so --el-font-sans resolves.
// Text utilities: .el-text-h1 \u2026 .el-text-muted, .el-text-blockquote, .el-text-inline-code
`;
}
function patchStylesFile(cwd, stylesRelativePath, componentsDir) {
  const stylesAbs = join4(cwd, stylesRelativePath);
  if (!existsSync4(stylesAbs)) {
    return false;
  }
  const existing = readFileSync2(stylesAbs, "utf8");
  if (existing.includes(STYLES_SNIPPET_MARKER)) {
    return false;
  }
  const usePath = toTokensUsePath(stylesAbs, join4(cwd, componentsDir));
  writeFileSync2(stylesAbs, `${existing.trimEnd()}
${buildStylesSnippet(usePath)}`, "utf8");
  return true;
}

// packages/cli/src/lib/init.ts
async function initCommand(options) {
  const { cwd, quiet } = options;
  const log = (...args) => {
    if (!quiet) {
      console.log(...args);
    }
  };
  if (!isAngularProject(cwd)) {
    throw new Error(
      "This does not look like an Angular project. Expected @angular/core in package.json, or angular.json / project.json."
    );
  }
  const interactive = isInteractive(options.yes) && !quiet;
  const configPath = join5(cwd, CONFIG_FILENAME);
  const existing = existsSync5(configPath) ? readConfig(cwd) : void 0;
  const componentsDir = existing?.componentsDir ?? options.path ?? await promptText(
    "Components directory (where El* source will be copied)",
    DEFAULT_COMPONENTS_DIR,
    interactive
  );
  const createdConfig = !existing;
  if (!existing) {
    writeConfig(cwd, { componentsDir });
    ensureComponentsDir(cwd, componentsDir);
    log(`Created ${CONFIG_FILENAME}`);
    log(`Components directory: ${componentsDir}`);
  } else {
    ensureComponentsDir(cwd, existing.componentsDir);
    log(`${CONFIG_FILENAME} already exists. Components directory: ${existing.componentsDir}`);
  }
  const installTheme = options.skipTheme ? false : await promptYesNo("Install theme tokens now? (recommended)", true, interactive);
  if (!installTheme) {
    log("Skipped theme. Run `npx @ng-elemental/cli add theme` later to copy tokens.");
    return {
      componentsDir,
      createdConfig,
      themeInstalled: existsSync5(join5(cwd, componentsDir, "theme")),
      stylesPatched: false
    };
  }
  const copied = copyRegistryComponent(cwd, "theme", { skipIfExists: true });
  if (copied) {
    log(`Added theme to ${componentsDir}/theme`);
  } else {
    log(`Theme already installed at ${componentsDir}/theme`);
  }
  const detected = options.styles ?? detectStylesPath(cwd);
  const stylesPath = options.styles ?? (detected ? await promptText("Global stylesheet to import tokens", detected, interactive) : void 0);
  let stylesPatched = false;
  if (stylesPath && existsSync5(join5(cwd, stylesPath))) {
    stylesPatched = patchStylesFile(cwd, stylesPath, componentsDir);
    if (stylesPatched) {
      log(`Updated ${stylesPath} with theme tokens`);
    }
  } else {
    printStylesSnippet(cwd, componentsDir, log);
  }
  printThemeNextSteps(componentsDir, log);
  return {
    componentsDir,
    createdConfig,
    themeInstalled: true,
    stylesPath,
    stylesPatched
  };
}
function printStylesSnippet(cwd, componentsDir, log) {
  const usePath = toTokensUsePath(join5(cwd, "src/styles.scss"), join5(cwd, componentsDir));
  log("No global stylesheet found. Add this to your styles file (for example src/styles.scss):");
  log(buildStylesSnippet(usePath));
}
function printThemeNextSteps(componentsDir, log) {
  log("");
  log("Next steps:");
  log(`  1. Edit the BRAND block in ${componentsDir}/theme/tokens.scss`);
  log("  2. Optional dark mode: provideElTheme({ mode: 'light' }) in app.config.ts");
  log("  3. Add components: npx @ng-elemental/cli add button");
}

// packages/mcp/src/lib/actions.ts
import { existsSync as existsSync7, readdirSync as readdirSync2, readFileSync as readFileSync4 } from "node:fs";
import { join as join7 } from "node:path";

// packages/mcp/src/lib/guidelines.ts
import { existsSync as existsSync6, readFileSync as readFileSync3 } from "node:fs";
import { join as join6 } from "node:path";

// packages/mcp/src/lib/module-dir.ts
import { dirname as dirname3 } from "node:path";
import { fileURLToPath as fileURLToPath2 } from "node:url";
function moduleDir(importMetaUrl) {
  const cjsDir = readCjsDirname();
  if (cjsDir) {
    return cjsDir;
  }
  if (typeof importMetaUrl === "string" && importMetaUrl.length > 0) {
    return dirname3(fileURLToPath2(importMetaUrl));
  }
  throw new Error("Cannot resolve module directory");
}
function readCjsDirname() {
  try {
    const dir = eval("__dirname");
    return typeof dir === "string" && dir.length > 0 ? dir : void 0;
  } catch {
    return void 0;
  }
}

// packages/mcp/src/lib/guidelines.ts
var SERVER_INSTRUCTIONS = "Use NgElemental MCP for El* widgets. Call get_guidelines first, then search_components or get_component for metadata. Use get_component_source and get_component_examples to understand implementation details. Use install_components to get CLI commands for the user to run \u2014 never copy-paste files manually. Do not invent parallel CSS or SVG widgets. Never import from @ng-elemental/ui in a consumer app.";
var GET_GUIDELINES_DESCRIPTION = "Call this before adding or implementing NgElemental UI. Returns design rules and the page-integration playbook.";
function loadGuidelines() {
  return readFileSync3(guidelinesPath(), "utf8");
}
function guidelinesPath() {
  const here = moduleDir(import.meta.url);
  const candidates = [
    join6(here, "guidelines.md"),
    join6(here, "src/lib/guidelines.md"),
    join6(here, "../src/lib/guidelines.md"),
    join6(here, "../../src/lib/guidelines.md"),
    join6(process.cwd(), "packages/mcp/src/lib/guidelines.md")
  ];
  for (const candidate of candidates) {
    if (existsSync6(candidate)) {
      return candidate;
    }
  }
  throw new Error(`NgElemental guidelines.md not found (looked next to ${here})`);
}

// packages/mcp/src/lib/actions.ts
function resolveCwd(cwd) {
  return cwd ?? process.cwd();
}
function compactCatalog(entry) {
  return {
    name: entry.name,
    title: entry.title,
    kind: entry.kind,
    description: entry.description,
    keywords: [...entry.keywords],
    selectors: [...entry.selectors],
    classNames: [...entry.classNames],
    docsPath: entry.docsPath,
    category: entry.category
  };
}
function searchComponents(query, kind) {
  return searchCatalog(query, { kind });
}
function listComponents(kind) {
  return listCatalog({ kind });
}
function formatWireIn(entry, importPath) {
  const classList = entry.classNames.join(", ");
  const lines = [
    "## Wire it in",
    "",
    `import { ${classList} } from '${importPath}';`,
    "",
    `@Component({`,
    `  imports: [${classList}],`,
    `})`,
    "",
    entry.usage
  ];
  if (entry.registryDependencies.length > 0) {
    lines.push("", `alsoAdd: ${entry.registryDependencies.join(", ")}`);
  }
  if (entry.npmDependencies.length > 0) {
    lines.push(`npmDependencies: ${entry.npmDependencies.join(", ")}`);
  }
  lines.push("", "Follow NgElemental Design Guidelines (call get_guidelines).");
  return lines.join("\n");
}
function describeComponent(name, cwd) {
  const entry = getCatalogEntry(name);
  const config = tryReadConfig(cwd);
  const importPath = toAppImportPath(config?.componentsDir ?? "src/app/ui", entry.name);
  const payload = {
    ...compactCatalog(entry),
    usage: entry.usage,
    registryDependencies: [...entry.registryDependencies],
    npmDependencies: [...entry.npmDependencies],
    importPath,
    componentsDir: config?.componentsDir ?? "src/app/ui"
  };
  return `${JSON.stringify(payload, null, 2)}

${formatWireIn(entry, importPath)}`;
}
function getInstallInstructions(names, cwd) {
  if (names.length === 0) {
    throw new Error("Provide at least one component name.");
  }
  const config = tryReadConfig(cwd);
  const allDeps = collectRegistryDependencies(names);
  const npmDeps = /* @__PURE__ */ new Set();
  for (const name of [...names, ...allDeps]) {
    const entry = getCatalogEntry(name);
    for (const dep of entry.npmDependencies) {
      npmDeps.add(dep);
    }
  }
  const lines = [
    "## Installation Commands",
    "",
    "Ask the user to run the following commands in their terminal:",
    ""
  ];
  if (!config) {
    lines.push("```bash", "# Initialize NgElemental (creates elemental.json)", "npx @ng-elemental/cli init", "```", "");
  }
  lines.push("```bash", `# Add component${names.length > 1 ? "s" : ""}`, `npx @ng-elemental/cli add ${names.join(" ")}`, "```");
  if (npmDeps.size > 0) {
    lines.push("", "```bash", "# Install required npm dependencies", `npm install ${[...npmDeps].join(" ")}`, "```");
  }
  lines.push("", "## After installation", "");
  for (const name of names) {
    const entry = getCatalogEntry(name);
    const importPath = toAppImportPath(config?.componentsDir ?? "src/app/ui", entry.name);
    lines.push(formatWireIn(entry, importPath), "");
  }
  lines.push("> **Important**: Do NOT copy-paste component source files manually. Always use the CLI to ensure dependencies and configuration are handled correctly.");
  return lines.join("\n");
}
function resolveUiSourceDir(name) {
  const here = moduleDir(import.meta.url);
  const candidates = [
    join7(here, "ui-source", name),
    join7(here, "../ui-source", name),
    join7(here, "../../../../packages/ui/src/lib", name),
    join7(process.cwd(), "packages/ui/src/lib", name)
  ];
  for (const dir2 of candidates) {
    if (existsSync7(dir2)) return dir2;
  }
  return null;
}
function getComponentSource(name) {
  const entry = getCatalogEntry(name);
  const sourceDir = resolveUiSourceDir(name);
  if (!sourceDir) {
    return `Source files for "${name}" are not available in the MCP server context. Use get_component for metadata and usage instead.`;
  }
  const files = readdirSync2(sourceDir).filter(
    (f) => /\.(ts|html|scss)$/.test(f) && !f.includes(".spec.") && !f.includes(".stories.")
  );
  const sections = [`# ${entry.title} \u2014 Source Code
`];
  for (const file of files.sort()) {
    const content = readFileSync4(join7(sourceDir, file), "utf8");
    const ext = file.split(".").pop() ?? "";
    sections.push(`## ${file}

\`\`\`${ext}
${content}
\`\`\`
`);
  }
  return sections.join("\n");
}
function getComponentExamples(name) {
  const entry = getCatalogEntry(name);
  const sourceDir = resolveUiSourceDir(name);
  if (!sourceDir) {
    return `Examples for "${name}" are not available. Use the usage field from get_component instead.`;
  }
  const storyFiles = readdirSync2(sourceDir).filter((f) => f.includes(".stories."));
  if (storyFiles.length === 0) {
    return `# ${entry.title} \u2014 Examples

No Storybook stories found. Basic usage:

\`\`\`html
${entry.usage}
\`\`\``;
  }
  const sections = [`# ${entry.title} \u2014 Examples (Storybook Stories)
`];
  for (const file of storyFiles) {
    const content = readFileSync4(join7(sourceDir, file), "utf8");
    sections.push(`## ${file}

\`\`\`typescript
${content}
\`\`\`
`);
  }
  return sections.join("\n");
}
function guidelinesText() {
  return loadGuidelines();
}
function tryReadConfig(cwd) {
  try {
    return readConfig(cwd);
  } catch {
    return void 0;
  }
}
function collectRegistryDependencies(names) {
  const extras = /* @__PURE__ */ new Set();
  const visit = (name) => {
    for (const dep of getCatalogEntry(name).registryDependencies) {
      if (!names.includes(dep) && !extras.has(dep)) {
        extras.add(dep);
        visit(dep);
      }
    }
  };
  for (const name of names) {
    visit(name);
  }
  return [...extras];
}

// packages/mcp/src/lib/init-project.ts
async function initProject(options) {
  const result = await initCommand({
    cwd: options.cwd,
    yes: true,
    path: options.path,
    skipTheme: options.skipTheme,
    quiet: true
  });
  return JSON.stringify(result, null, 2);
}

// packages/mcp/src/lib/package-info.ts
import { existsSync as existsSync8, readFileSync as readFileSync5 } from "node:fs";
import { join as join8 } from "node:path";
function mcpPackageVersion() {
  const here = moduleDir(import.meta.url);
  const candidates = [
    join8(here, "package.json"),
    join8(here, "../package.json"),
    join8(here, "../../package.json"),
    join8(process.cwd(), "packages/mcp/package.json")
  ];
  for (const candidate of candidates) {
    if (!existsSync8(candidate)) {
      continue;
    }
    try {
      const pkg = JSON.parse(readFileSync5(candidate, "utf8"));
      if (pkg.name === "@ng-elemental/mcp" && typeof pkg.version === "string" && pkg.version.length > 0) {
        return pkg.version;
      }
    } catch {
    }
  }
  throw new Error(`Could not resolve @ng-elemental/mcp version (looked next to ${here})`);
}

// packages/mcp/src/lib/server.ts
var KIND = z.enum(["component", "directive", "service", "theme"]).optional();
function createNgElementalServer() {
  const server = new McpServer(
    { name: "ng-elemental", version: mcpPackageVersion() },
    { instructions: SERVER_INSTRUCTIONS }
  );
  server.registerTool(
    "get_guidelines",
    {
      title: "NgElemental guidelines",
      description: GET_GUIDELINES_DESCRIPTION,
      inputSchema: z.object({})
    },
    () => textResult(guidelinesText())
  );
  server.registerTool(
    "search_components",
    {
      title: "Search components",
      description: "Search NgElemental components by name, keyword, or intent (e.g. dropdown, modal, snackbar). Default entry point.",
      inputSchema: z.object({
        query: z.string().describe("Search query such as dropdown, modal, or button"),
        kind: KIND.describe("Optional kind filter")
      })
    },
    ({ query, kind }) => {
      const matches = searchComponents(query, kind);
      if (matches.length === 0) {
        return textResult(`No components match "${query}". Try a different query or call list_components.`);
      }
      return textResult(JSON.stringify(matches.map(compactCatalog), null, 2));
    }
  );
  server.registerTool(
    "list_components",
    {
      title: "List components",
      description: "List NgElemental copy-paste components. Optionally filter by kind.",
      inputSchema: z.object({
        kind: KIND.describe("Optional kind filter")
      })
    },
    ({ kind }) => textResult(JSON.stringify(listComponents(kind).map(compactCatalog), null, 2))
  );
  server.registerTool(
    "get_component",
    {
      title: "Get component",
      description: "Get metadata, usage, registry/npm dependencies, import path, and a wire-in checklist for one component.",
      inputSchema: z.object({
        name: z.string().describe("Catalog name such as button or dialog"),
        cwd: z.string().optional().describe("Project root. Defaults to process.cwd()")
      })
    },
    ({ name, cwd }) => textResult(describeComponent(name, resolveCwd(cwd)))
  );
  server.registerTool(
    "install_components",
    {
      title: "Install components",
      description: "Get CLI commands the user should run to install one or more NgElemental components. Does NOT run the commands \u2014 present them to the user. Includes registry and npm dependencies.",
      inputSchema: z.object({
        names: z.array(z.string()).min(1).describe("Catalog names to install"),
        cwd: z.string().optional().describe("Project root. Defaults to process.cwd()")
      })
    },
    ({ names, cwd }) => textResult(getInstallInstructions(names, resolveCwd(cwd)))
  );
  server.registerTool(
    "get_component_source",
    {
      title: "Get component source",
      description: "Get the full source code (TypeScript, HTML, SCSS) of a component. Use this to understand the component API, inputs, outputs, and implementation details before using it.",
      inputSchema: z.object({
        name: z.string().describe("Catalog name such as button or dialog")
      })
    },
    ({ name }) => textResult(getComponentSource(name))
  );
  server.registerTool(
    "get_component_examples",
    {
      title: "Get component examples",
      description: "Get Storybook stories for a component showing real usage patterns, variants, and configurations. Helps the agent implement the component correctly.",
      inputSchema: z.object({
        name: z.string().describe("Catalog name such as button or dialog")
      })
    },
    ({ name }) => textResult(getComponentExamples(name))
  );
  server.registerTool(
    "init_project",
    {
      title: "Init project",
      description: "Create elemental.json and optionally install theme tokens. Non-interactive. Call if elemental.json is missing.",
      inputSchema: z.object({
        path: z.string().optional().describe("Components directory, default src/app/ui"),
        skipTheme: z.boolean().optional(),
        cwd: z.string().optional().describe("Project root. Defaults to process.cwd()")
      })
    },
    async ({ path, skipTheme, cwd }) => textResult(await initProject({ cwd: resolveCwd(cwd), path, skipTheme }))
  );
  server.registerResource(
    "guidelines",
    "ng-elemental://guidelines",
    {
      title: "NgElemental Design Guidelines",
      mimeType: "text/markdown"
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: guidelinesText()
        }
      ]
    })
  );
  return server;
}
function textResult(text) {
  return { content: [{ type: "text", text }] };
}

// packages/mcp/src/vercel-handler.ts
var mcp = createMcpHandler(
  () => createNgElementalServer(),
  { legacy: "stateless" }
);
var vercel_handler_default = {
  fetch(request) {
    if (request.method === "OPTIONS") {
      return Promise.resolve(new Response(null, { status: 204 }));
    }
    return mcp.fetch(request);
  }
};
export {
  vercel_handler_default as default
};
