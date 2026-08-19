import {
  AVAILABLE_COMPONENTS,
  type AvailableComponent,
} from './component-registry';

export type ComponentKind = 'component' | 'directive' | 'service' | 'theme';
export type ComponentCategory = 'layout' | 'components' | 'theming';

export interface CatalogEntry {
  readonly name: AvailableComponent;
  readonly kind: ComponentKind;
  readonly title: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly selectors: readonly string[];
  readonly classNames: readonly string[];
  readonly usage: string;
  readonly registryDependencies: readonly AvailableComponent[];
  readonly npmDependencies: readonly string[];
  readonly docsPath: string;
  readonly category: ComponentCategory;
}

export interface CatalogQuery {
  readonly kind?: ComponentKind;
}

const FONT_AWESOME = '@fortawesome/fontawesome-free';

export const COMPONENT_CATALOG: readonly CatalogEntry[] = [
  {
    name: 'icon',
    kind: 'component',
    title: 'Icon',
    description: 'Font Awesome 6 icon by name. Use for chevrons, checks, close, and any glyph.',
    keywords: ['icon', 'font awesome', 'glyph', 'chevron', 'check', 'close'],
    selectors: ['el-icon'],
    classNames: ['ElIcon'],
    usage: '<el-icon name="check" />',
    registryDependencies: [],
    npmDependencies: [FONT_AWESOME],
    docsPath: '/components/icon',
    category: 'components',
  },
  {
    name: 'button',
    kind: 'component',
    title: 'Button',
    description: 'Action button with primary, secondary, and ghost variants plus optional icons.',
    keywords: ['button', 'action', 'cta', 'submit'],
    selectors: ['el-button'],
    classNames: ['ElButton'],
    usage: '<el-button variant="primary" iconStart="plus">Add item</el-button>',
    registryDependencies: ['icon'],
    npmDependencies: [],
    docsPath: '/components/button',
    category: 'components',
  },
  {
    name: 'label',
    kind: 'component',
    title: 'Label',
    description: 'Accessible form label. Pair with a control via htmlFor / inputId.',
    keywords: ['label', 'form', 'htmlFor'],
    selectors: ['el-label'],
    classNames: ['ElLabel'],
    usage: '<el-label htmlFor="email" variant="default">Email</el-label>',
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/components/label',
    category: 'components',
  },
  {
    name: 'form-error',
    kind: 'component',
    title: 'Form Error',
    description: 'Presentational validation message for form fields.',
    keywords: ['error', 'validation', 'invalid', 'form'],
    selectors: ['el-form-error'],
    classNames: ['ElFormError'],
    usage: `<el-label htmlFor="email" required>Email</el-label>
<el-input inputId="email" [(value)]="email" [error]="invalid" />
@if (invalid) {
  <el-form-error id="email-err">Email is required</el-form-error>
}`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/components/form-error',
    category: 'components',
  },
  {
    name: 'input',
    kind: 'component',
    title: 'Input',
    description: 'Text field with types, prefix/suffix slots, error state, and optional mask.',
    keywords: ['input', 'text field', 'textbox', 'email', 'password'],
    selectors: ['el-input'],
    classNames: ['ElInput'],
    usage:
      '<el-input [(value)]="email" type="email" placeholder="you@example.com" inputId="email" />',
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/components/input',
    category: 'components',
  },
  {
    name: 'checkbox',
    kind: 'component',
    title: 'Checkbox',
    description: 'Labeled checkbox with checked, indeterminate, and required states.',
    keywords: ['checkbox', 'tick', 'boolean', 'agree'],
    selectors: ['el-checkbox'],
    classNames: ['ElCheckbox'],
    usage: `<el-checkbox [(checked)]="accepted" inputId="terms">
  Accept terms and conditions
</el-checkbox>`,
    registryDependencies: ['icon'],
    npmDependencies: [],
    docsPath: '/components/checkbox',
    category: 'components',
  },
  {
    name: 'slide-toggle',
    kind: 'component',
    title: 'Slide Toggle',
    description: 'On/off switch with size, label position, and optional track/thumb icons.',
    keywords: ['switch', 'toggle', 'on off', 'settings'],
    selectors: ['el-slide-toggle'],
    classNames: ['ElSlideToggle'],
    usage: `<el-slide-toggle [(checked)]="enabled" inputId="notifications">
  Notifications
</el-slide-toggle>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/components/slide-toggle',
    category: 'components',
  },
  {
    name: 'radio',
    kind: 'component',
    title: 'Radio',
    description: 'Single-choice radio group with labeled options.',
    keywords: ['radio', 'choice', 'option group'],
    selectors: ['el-radio', 'el-radio-group'],
    classNames: ['ElRadio', 'ElRadioGroup'],
    usage: `<el-radio-group [(value)]="contact" ariaLabel="Contact method">
  <el-radio value="email" inputId="contact-email">Email</el-radio>
  <el-radio value="phone" inputId="contact-phone">Phone</el-radio>
</el-radio-group>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/components/radio',
    category: 'components',
  },
  {
    name: 'select',
    kind: 'component',
    title: 'Select',
    description: 'Combobox with custom items, groups, and optional multi-select.',
    keywords: ['select', 'dropdown', 'combobox', 'picker', 'listbox'],
    selectors: ['el-select', 'el-select-item', 'el-select-group'],
    classNames: ['ElSelect', 'ElSelectItem', 'ElSelectGroup'],
    usage: `<el-select [(value)]="city" placeholder="Choose a city" ariaLabel="City">
  <el-select-item value="pune" label="Pune">Pune</el-select-item>
  <el-select-item value="mumbai" label="Mumbai">Mumbai</el-select-item>
</el-select>`,
    registryDependencies: ['icon'],
    npmDependencies: [],
    docsPath: '/components/select',
    category: 'components',
  },
  {
    name: 'chip',
    kind: 'component',
    title: 'Chip',
    description: 'Assist, filter, and suggestion chips with optional color and icons.',
    keywords: ['chip', 'tag', 'filter', 'badge'],
    selectors: ['el-chip'],
    classNames: ['ElChip'],
    usage: '<el-chip type="filter" [(selected)]="active">Filter</el-chip>',
    registryDependencies: ['icon'],
    npmDependencies: [],
    docsPath: '/components/chip',
    category: 'components',
  },
  {
    name: 'progress',
    kind: 'component',
    title: 'Progress',
    description: 'Line and circle progress indicators with determinate and indeterminate modes.',
    keywords: ['progress', 'spinner', 'loading', 'percent', 'circle'],
    selectors: ['el-progress', 'el-progress-circle'],
    classNames: ['ElProgress', 'ElProgressCircle'],
    usage: `<el-progress [value]="42" showValue />
<el-progress-circle [value]="72" showValue />`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/components/progress',
    category: 'components',
  },
  {
    name: 'slider',
    kind: 'component',
    title: 'Slider',
    description: 'Horizontal single or range value picker with step, ticks, and labels.',
    keywords: ['slider', 'range', 'volume', 'input range'],
    selectors: ['el-slider'],
    classNames: ['ElSlider'],
    usage: `<el-slider [(value)]="volume" [min]="0" [max]="100" showValue />
<el-slider range [(start)]="minPrice" [(end)]="maxPrice" [step]="5" showTicks showValue />`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/components/slider',
    category: 'components',
  },
  {
    name: 'carousel',
    kind: 'component',
    title: 'Carousel',
    description: 'Slide carousel with prev/next, dots, loop, autoplay, peek, and drag.',
    keywords: ['carousel', 'slideshow', 'gallery', 'swiper'],
    selectors: ['el-carousel', 'el-carousel-slide'],
    classNames: ['ElCarousel', 'ElCarouselSlide'],
    usage: `<el-carousel [(index)]="i" loop ariaLabel="Screenshots">
  <el-carousel-slide>One</el-carousel-slide>
  <el-carousel-slide>Two</el-carousel-slide>
</el-carousel>`,
    registryDependencies: ['icon', 'button'],
    npmDependencies: [],
    docsPath: '/components/carousel',
    category: 'components',
  },
  {
    name: 'avatar',
    kind: 'component',
    title: 'Avatar',
    description: 'Circular image, initials, or icon mark for people and accounts.',
    keywords: ['avatar', 'profile', 'user', 'initials', 'photo'],
    selectors: ['el-avatar'],
    classNames: ['ElAvatar'],
    usage: `<el-avatar src="/avatar.jpg" alt="Jane Doe" />
<el-avatar initials="JD" alt="Jane Doe" />
<el-avatar icon="user" alt="Account" />`,
    registryDependencies: ['icon'],
    npmDependencies: [],
    docsPath: '/components/avatar',
    category: 'components',
  },
  {
    name: 'card',
    kind: 'component',
    title: 'Card',
    description: 'Presentational card with media, header, content, and footer slots.',
    keywords: ['card', 'panel', 'tile', 'surface'],
    selectors: ['el-card'],
    classNames: ['ElCard'],
    usage: `<el-card appearance="outlined">
  <div elCardHeader>Title</div>
  <div elCardContent>Body</div>
  <div elCardFooter>Actions</div>
</el-card>
<el-card size="compact">
  <el-icon elCardMedia name="file-lines" />
  <div elCardHeader>report.pdf</div>
  <div elCardContent>2.4 MB</div>
  <div elCardFooter>…</div>
</el-card>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/components/card',
    category: 'components',
  },
  {
    name: 'container',
    kind: 'component',
    title: 'Container',
    description: 'Centered layout container with a max width.',
    keywords: ['container', 'layout', 'page width', 'wrapper'],
    selectors: ['el-container'],
    classNames: ['ElContainer'],
    usage: '<el-container size="lg">Page content</el-container>',
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/components/container',
    category: 'layout',
  },
  {
    name: 'stack',
    kind: 'component',
    title: 'Stack',
    description: 'Vertical or horizontal stack with gap tokens.',
    keywords: ['stack', 'flex', 'layout', 'column', 'row', 'gap'],
    selectors: ['el-stack'],
    classNames: ['ElStack'],
    usage: `<el-stack gap="4">
  <div>One</div>
  <div>Two</div>
</el-stack>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/components/stack',
    category: 'layout',
  },
  {
    name: 'grid',
    kind: 'component',
    title: 'Grid',
    description: 'Responsive CSS grid with column and gap controls.',
    keywords: ['grid', 'layout', 'columns', 'tiles'],
    selectors: ['el-grid'],
    classNames: ['ElGrid'],
    usage: `<el-grid [columns]="3" gap="4">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
</el-grid>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/components/grid',
    category: 'layout',
  },
  {
    name: 'aspect-ratio',
    kind: 'component',
    title: 'Aspect Ratio',
    description: 'Locks child content to a width/height ratio.',
    keywords: ['aspect ratio', '16/9', 'media', 'layout'],
    selectors: ['el-aspect-ratio'],
    classNames: ['ElAspectRatio'],
    usage: `<el-aspect-ratio ratio="16/9">
  <img src="/cover.jpg" alt="" style="width: 100%; height: 100%; object-fit: cover" />
</el-aspect-ratio>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/components/aspect-ratio',
    category: 'layout',
  },
  {
    name: 'scroll-area',
    kind: 'component',
    title: 'Scroll Area',
    description: 'Accessible scrollable region for overflow content.',
    keywords: ['scroll', 'overflow', 'panel'],
    selectors: ['el-scroll-area'],
    classNames: ['ElScrollArea'],
    usage: `<el-scroll-area ariaLabel="Notes" style="height: 12rem">
  Long content…
</el-scroll-area>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/components/scroll-area',
    category: 'layout',
  },
  {
    name: 'separator',
    kind: 'component',
    title: 'Separator',
    description: 'Horizontal or vertical rule for grouping content.',
    keywords: ['separator', 'divider', 'hr', 'rule'],
    selectors: ['el-separator'],
    classNames: ['ElSeparator'],
    usage: `<el-separator />
<el-separator orientation="vertical" />`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/components/separator',
    category: 'layout',
  },
  {
    name: 'resizable',
    kind: 'component',
    title: 'Resizable',
    description: 'Draggable accessible split panels.',
    keywords: ['resizable', 'split', 'pane', 'layout', 'handle'],
    selectors: ['el-resizable', 'el-resizable-panel', 'el-resizable-handle'],
    classNames: ['ElResizable', 'ElResizablePanel', 'ElResizableHandle'],
    usage: `<el-resizable>
  <el-resizable-panel [defaultSize]="30" [min]="15">A</el-resizable-panel>
  <el-resizable-handle />
  <el-resizable-panel [min]="20">B</el-resizable-panel>
</el-resizable>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/components/resizable',
    category: 'layout',
  },
  {
    name: 'list',
    kind: 'component',
    title: 'List',
    description: 'Stacked rows with leading, title, description, and trailing slots. Optional virtual window.',
    keywords: ['list', 'rows', 'inbox', 'virtual'],
    selectors: ['el-list', 'el-list-item'],
    classNames: ['ElList', 'ElListItem', 'ElListItemDef'],
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
    docsPath: '/components/list',
    category: 'components',
  },
  {
    name: 'tree',
    kind: 'component',
    title: 'Tree',
    description: 'Hierarchical tree with expand, cascade checkboxes, slots, and optional virtual rows.',
    keywords: ['tree', 'hierarchy', 'files', 'nested', 'folder'],
    selectors: ['el-tree', 'el-tree-item'],
    classNames: ['ElTree', 'ElTreeItem', 'ElTreeNodeDef'],
    usage: `<el-tree [(expanded)]="open" ariaLabel="Files">
  <el-tree-item value="docs" label="Documents">
    <el-icon elTreeLeading name="folder" />
    <el-tree-item value="resume" label="Resume.pdf" />
  </el-tree-item>
</el-tree>`,
    registryDependencies: ['icon', 'checkbox', 'button'],
    npmDependencies: [],
    docsPath: '/components/tree',
    category: 'components',
  },
  {
    name: 'infinite-scroll',
    kind: 'directive',
    title: 'Infinite Scroll',
    description: 'Attribute directive that emits loadMore when the user scrolls near the end.',
    keywords: ['infinite', 'scroll', 'pagination', 'load more', 'lazy'],
    selectors: ['[elInfiniteScroll]'],
    classNames: ['ElInfiniteScroll'],
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
    docsPath: '/components/infinite-scroll',
    category: 'components',
  },
  {
    name: 'attachment',
    kind: 'component',
    title: 'Attachment',
    description: 'File or image attachment card with upload states and actions.',
    keywords: ['attachment', 'file card', 'upload preview'],
    selectors: [
      'el-attachment',
      'el-attachment-media',
      'el-attachment-content',
      'el-attachment-title',
      'el-attachment-description',
      'el-attachment-actions',
      'el-attachment-action',
      'el-attachment-group',
    ],
    classNames: [
      'ElAttachment',
      'ElAttachmentMedia',
      'ElAttachmentContent',
      'ElAttachmentTitle',
      'ElAttachmentDescription',
      'ElAttachmentActions',
      'ElAttachmentAction',
      'ElAttachmentGroup',
    ],
    usage: `<el-attachment state="done">
  <el-attachment-media>
    <el-icon name="file-lines" />
  </el-attachment-media>
  <el-attachment-content>
    <el-attachment-title>sales-dashboard.pdf</el-attachment-title>
    <el-attachment-description>PDF · 2.4 MB</el-attachment-description>
  </el-attachment-content>
  <el-attachment-actions>
    <el-attachment-action ariaLabel="Remove sales-dashboard.pdf" />
  </el-attachment-actions>
</el-attachment>`,
    registryDependencies: ['icon', 'button'],
    npmDependencies: [],
    docsPath: '/components/attachment',
    category: 'components',
  },
  {
    name: 'file-upload',
    kind: 'component',
    title: 'File Upload',
    description: 'Dropzone that accepts files and renders attachments automatically.',
    keywords: ['upload', 'dropzone', 'files', 'drag drop'],
    selectors: ['el-file-upload'],
    classNames: ['ElFileUpload'],
    usage: `<el-file-upload [(files)]="files" multiple accept="image/*,.pdf">
  PNG, JPG, or PDF up to 5 MB
</el-file-upload>`,
    registryDependencies: ['attachment', 'button', 'icon', 'form-error'],
    npmDependencies: [],
    docsPath: '/components/file-upload',
    category: 'components',
  },
  {
    name: 'table',
    kind: 'component',
    title: 'Table',
    description: 'Data table with columns, sort, sticky header, expand rows, and optional virtualization.',
    keywords: ['table', 'datagrid', 'rows', 'columns', 'sort'],
    selectors: ['el-table', 'el-table-column'],
    classNames: ['ElTable', 'ElTableColumn', 'ElTableHeader', 'ElTableCell', 'ElTableExpand'],
    usage: `<el-table [data]="users">
  <el-table-column name="name" label="Name" sortable />
  <el-table-column name="status" label="Status">
    <ng-template elTableCell let-user>
      <el-chip>{{ user.status }}</el-chip>
    </ng-template>
  </el-table-column>
</el-table>`,
    registryDependencies: ['icon'],
    npmDependencies: [],
    docsPath: '/components/table',
    category: 'components',
  },
  {
    name: 'pagination',
    kind: 'component',
    title: 'Pagination',
    description: 'Page window with ellipsis and optional page-size select.',
    keywords: ['pagination', 'pager', 'pages'],
    selectors: ['el-pagination'],
    classNames: ['ElPagination'],
    usage: '<el-pagination [(page)]="page" [total]="100" [pageSize]="10" />',
    registryDependencies: ['icon', 'button', 'select'],
    npmDependencies: [],
    docsPath: '/components/pagination',
    category: 'components',
  },
  {
    name: 'skeleton',
    kind: 'component',
    title: 'Skeleton',
    description: 'Text, circular, and rectangular placeholders, plus [elSkeleton] to cover a host.',
    keywords: ['skeleton', 'placeholder', 'loading', 'shimmer'],
    selectors: ['el-skeleton', '[elSkeleton]'],
    classNames: ['ElSkeleton', 'ElSkeletonDirective'],
    usage: `<el-skeleton [lines]="3" />
<button [elSkeleton]="loading">Save</button>
<input [elSkeleton]="loading" />`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/components/skeleton',
    category: 'components',
  },
  {
    name: 'breadcrumb',
    kind: 'component',
    title: 'Breadcrumb',
    description: 'Navigation trail for the current page location.',
    keywords: ['breadcrumb', 'navigation', 'path', 'crumbs'],
    selectors: ['el-breadcrumb', 'el-breadcrumb-item'],
    classNames: ['ElBreadcrumb', 'ElBreadcrumbItem'],
    usage: `<el-breadcrumb ariaLabel="Breadcrumb">
  <el-breadcrumb-item href="/">Home</el-breadcrumb-item>
  <el-breadcrumb-item href="/docs">Components</el-breadcrumb-item>
  <el-breadcrumb-item current>Chip</el-breadcrumb-item>
</el-breadcrumb>`,
    registryDependencies: ['icon'],
    npmDependencies: [],
    docsPath: '/components/breadcrumb',
    category: 'components',
  },
  {
    name: 'tooltip',
    kind: 'directive',
    title: 'Tooltip',
    description: 'Hover and focus tooltip with an arrow toward the trigger.',
    keywords: ['tooltip', 'hint', 'hover', 'title'],
    selectors: ['[elTooltip]'],
    classNames: ['ElTooltip'],
    usage: '<el-button elTooltip="Save file">Save</el-button>',
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/components/tooltip',
    category: 'components',
  },
  {
    name: 'menu',
    kind: 'component',
    title: 'Menu',
    description: 'Dropdown menu with nested submenus and a click or context-menu trigger.',
    keywords: ['menu', 'dropdown menu', 'context menu', 'actions'],
    selectors: ['el-menu', 'el-menu-panel', 'el-menu-item'],
    classNames: ['ElMenu', 'ElMenuPanel', 'ElMenuItem', 'ElMenuTrigger'],
    usage: `<el-menu>
  <el-button elMenuTrigger>Actions</el-button>
  <el-menu-panel>
    <el-menu-item>Cut</el-menu-item>
    <el-menu-item>Copy</el-menu-item>
  </el-menu-panel>
</el-menu>`,
    registryDependencies: ['icon'],
    npmDependencies: [],
    docsPath: '/components/menu',
    category: 'components',
  },
  {
    name: 'menubar',
    kind: 'component',
    title: 'Menubar',
    description: 'Application menu bar that hosts ElMenu children.',
    keywords: ['menubar', 'application menu', 'toolbar menu'],
    selectors: ['el-menubar'],
    classNames: ['ElMenubar'],
    usage: `<el-menubar ariaLabel="Application">
  <el-menu>
    <el-button elMenuTrigger variant="ghost" size="sm">File</el-button>
    <el-menu-panel>
      <el-menu-item>New</el-menu-item>
    </el-menu-panel>
  </el-menu>
</el-menubar>`,
    registryDependencies: ['menu', 'icon', 'button'],
    npmDependencies: [],
    docsPath: '/components/menubar',
    category: 'components',
  },
  {
    name: 'popover',
    kind: 'component',
    title: 'Popover',
    description: 'Positioned overlay for arbitrary content.',
    keywords: ['popover', 'overlay', 'flyout', 'panel'],
    selectors: ['el-popover', 'el-popover-panel'],
    classNames: ['ElPopover', 'ElPopoverPanel', 'ElPopoverTrigger'],
    usage: `<el-popover>
  <el-button elPopoverTrigger>Details</el-button>
  <el-popover-panel>
    <span elPopoverTitle>Assignee</span>
    Ada Lovelace
  </el-popover-panel>
</el-popover>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/components/popover',
    category: 'components',
  },
  {
    name: 'dialog',
    kind: 'component',
    title: 'Dialog',
    description: 'Native modal dialog with slots, or ElDialogService.open() for a custom component.',
    keywords: ['dialog', 'modal', 'overlay', 'popup', 'confirm', 'service'],
    selectors: ['el-dialog'],
    classNames: ['ElDialog', 'ElDialogClose', 'ElDialogService'],
    usage: `<el-dialog [(open)]="open" title="Edit profile">
  <div elDialogContent>…</div>
  <div elDialogFooter>
    <el-button elDialogClose variant="ghost">Cancel</el-button>
  </div>
</el-dialog>
this.dialog.open(EditUserDialog, { data: { userId: 1 }, title: 'Edit user' });`,
    registryDependencies: ['icon'],
    npmDependencies: [],
    docsPath: '/components/dialog',
    category: 'components',
  },
  {
    name: 'alert',
    kind: 'component',
    title: 'Alert',
    description: 'Inline status banner with optional dismiss.',
    keywords: ['alert', 'banner', 'status', 'inline message'],
    selectors: ['el-alert'],
    classNames: ['ElAlert'],
    usage: `<el-alert color="success" title="Saved" dismissible (dismissed)="show.set(false)">
  Your changes were written.
</el-alert>`,
    registryDependencies: ['icon'],
    npmDependencies: [],
    docsPath: '/components/alert',
    category: 'components',
  },
  {
    name: 'toast',
    kind: 'component',
    title: 'Toast',
    description: 'Overlay notifications. Place el-toaster once in the shell and call ElToastService.show().',
    keywords: ['toast', 'snackbar', 'notification', 'toaster', 'service'],
    selectors: ['el-toast', 'el-toaster'],
    classNames: ['ElToast', 'ElToaster', 'ElToastService'],
    usage: `import { ElToaster } from './ui/toast/toaster';
<el-toaster />
this.toast.show('Saved', { color: 'success' });`,
    registryDependencies: ['icon'],
    npmDependencies: [],
    docsPath: '/components/toast',
    category: 'components',
  },
  {
    name: 'empty-state',
    kind: 'component',
    title: 'Empty State',
    description: 'Placeholder with icon, copy, and action slots when a view has no data.',
    keywords: ['empty', 'blank', 'placeholder', 'no results', 'zero state'],
    selectors: ['el-empty-state'],
    classNames: ['ElEmptyState'],
    usage: `<el-empty-state icon="folder-open" title="No projects" description="Create a project to get started.">
  <div elEmptyStateActions>
    <el-button>Create project</el-button>
  </div>
</el-empty-state>`,
    registryDependencies: ['icon'],
    npmDependencies: [],
    docsPath: '/components/empty-state',
    category: 'components',
  },
  {
    name: 'snackbar',
    kind: 'component',
    title: 'Snackbar',
    description: 'Single action bar with optional projected bulk controls, or ElSnackbarService.open().',
    keywords: ['snackbar', 'action bar', 'undo', 'bulk', 'service'],
    selectors: ['el-snackbar'],
    classNames: ['ElSnackbar', 'ElSnackbarService'],
    usage: `<el-snackbar [(open)]="open" message="File deleted" action="Undo" (actionClick)="undo()" />
this.snackbar.open('File deleted', { action: 'Undo', duration: 4000 });`,
    registryDependencies: ['icon'],
    npmDependencies: [],
    docsPath: '/components/snackbar',
    category: 'components',
  },
  {
    name: 'sheet',
    kind: 'component',
    title: 'Sheet',
    description: 'Edge panel with slots, or ElSheetService.open() for a custom component.',
    keywords: ['sheet', 'bottom sheet', 'panel', 'overlay', 'service'],
    selectors: ['el-sheet'],
    classNames: ['ElSheet', 'ElSheetClose', 'ElSheetService'],
    usage: `<el-sheet [(open)]="open" title="Filters" side="bottom" size="md">
  <div elSheetContent>…</div>
  <div elSheetFooter>
    <el-button elSheetClose variant="ghost">Cancel</el-button>
  </div>
</el-sheet>
this.sheet.open(EditFilters, { data: { userId: 1 }, title: 'Filters', side: 'bottom' });`,
    registryDependencies: ['icon'],
    npmDependencies: [],
    docsPath: '/components/sheet',
    category: 'components',
  },
  {
    name: 'drawer',
    kind: 'component',
    title: 'Drawer',
    description: 'Side panel with slots, focus trap, and ElDrawerService.open() for a custom component.',
    keywords: ['drawer', 'sidebar', 'navigation', 'panel', 'overlay', 'service'],
    selectors: ['el-drawer'],
    classNames: ['ElDrawer', 'ElDrawerClose', 'ElDrawerService'],
    usage: `<el-drawer [(open)]="open" title="Navigation" side="left" size="md">
  <div elDrawerContent>…</div>
</el-drawer>
this.drawer.open(WorkspaceDrawer, { title: 'Navigation', side: 'left' });`,
    registryDependencies: ['icon'],
    npmDependencies: [],
    docsPath: '/components/drawer',
    category: 'components',
  },
  {
    name: 'tabs',
    kind: 'component',
    title: 'Tabs',
    description: 'Tabbed panels with ng-template content and overflow chevrons.',
    keywords: ['tabs', 'tabset', 'panels'],
    selectors: ['el-tabs', 'el-tab'],
    classNames: ['ElTabs', 'ElTab', 'ElTabContent', 'ElTabLabel'],
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
    registryDependencies: ['icon'],
    npmDependencies: [],
    docsPath: '/components/tabs',
    category: 'components',
  },
  {
    name: 'stepper',
    kind: 'component',
    title: 'Stepper',
    description: 'Multi-step flow with linear mode and next() / previous().',
    keywords: ['stepper', 'wizard', 'steps', 'onboarding'],
    selectors: ['el-stepper', 'el-step'],
    classNames: ['ElStepper', 'ElStep', 'ElStepContent', 'ElStepLabel'],
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
    registryDependencies: ['icon'],
    npmDependencies: [],
    docsPath: '/components/stepper',
    category: 'components',
  },
  {
    name: 'accordion',
    kind: 'component',
    title: 'Accordion',
    description: 'Expandable panels with single or multiple open items.',
    keywords: ['accordion', 'collapse', 'expand', 'disclosure'],
    selectors: ['el-accordion', 'el-accordion-item'],
    classNames: ['ElAccordion', 'ElAccordionItem', 'ElAccordionTitle', 'ElAccordionSubtitle', 'ElAccordionContent'],
    usage: `<el-accordion variant="single" [(value)]="open" ariaLabel="Order details">
  <el-accordion-item value="shipping" title="Shipping" subtitle="2–5 business days">
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
    registryDependencies: ['icon'],
    npmDependencies: [],
    docsPath: '/components/accordion',
    category: 'components',
  },
  {
    name: 'segmented-button',
    kind: 'component',
    title: 'Segmented Button',
    description: 'Single-choice segmented control.',
    keywords: ['segmented', 'toggle group', 'segmented control', 'view mode'],
    selectors: ['el-segmented-button', 'el-segmented-button-item'],
    classNames: ['ElSegmentedButton', 'ElSegmentedButtonItem'],
    usage: `<el-segmented-button [(value)]="view" ariaLabel="View mode">
  <el-segmented-button-item value="list">List</el-segmented-button-item>
  <el-segmented-button-item value="grid">Grid</el-segmented-button-item>
</el-segmented-button>`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/components/segmented-button',
    category: 'components',
  },
  {
    name: 'datepicker',
    kind: 'component',
    title: 'Date Picker',
    description: 'Date and date-range pickers with calendar, clock, and DD-MM-YYYY fields.',
    keywords: ['date', 'datepicker', 'calendar', 'time', 'range', 'daterange'],
    selectors: ['el-date-picker', 'el-date-range-picker'],
    classNames: ['ElDatePicker', 'ElDateRangePicker'],
    usage: `<el-date-picker [(value)]="when" mode="date" />
<el-date-range-picker [(value)]="range" />`,
    registryDependencies: ['icon'],
    npmDependencies: [],
    docsPath: '/components/datepicker',
    category: 'components',
  },
  {
    name: 'theme',
    kind: 'theme',
    title: 'Theme',
    description: 'Design tokens, ElThemeService, and provideElTheme() for light and dark mode.',
    keywords: ['theme', 'tokens', 'css variables', 'dark mode', 'brand'],
    selectors: [],
    classNames: ['ElThemeService'],
    usage: `// styles.scss — @use './theme/tokens';
// Open tokens.scss and edit the BRAND block (--el-color-primary, …)
// Point --el-font-sans / --el-font-mono at your brand typeface
// app.config.ts — provideElTheme({ mode: 'light' })`,
    registryDependencies: [],
    npmDependencies: [],
    docsPath: '/theming',
    category: 'theming',
  },
] as const satisfies readonly CatalogEntry[];

const CATALOG_BY_NAME = new Map<AvailableComponent, CatalogEntry>(
  COMPONENT_CATALOG.map((entry) => [entry.name, entry]),
);

export function getCatalogEntry(name: string): CatalogEntry {
  const entry = CATALOG_BY_NAME.get(name as AvailableComponent);
  if (!entry) {
    throw new Error(
      `Unknown component "${name}". Available: ${AVAILABLE_COMPONENTS.join(', ')}`,
    );
  }
  return entry;
}

export function listCatalog(query: CatalogQuery = {}): CatalogEntry[] {
  return COMPONENT_CATALOG.filter((entry) => !query.kind || entry.kind === query.kind).map(
    (entry) => entry,
  );
}

export function searchCatalog(
  query: string,
  options: CatalogQuery = {},
): CatalogEntry[] {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return [];
  }

  return listCatalog(options)
    .map((entry) => ({ entry, score: scoreCatalogEntry(entry, needle) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.name.localeCompare(b.entry.name))
    .map((row) => row.entry);
}

export function formatCatalogList(entries: readonly CatalogEntry[]): string {
  if (entries.length === 0) {
    return 'No components found.';
  }
  const nameWidth = Math.max(...entries.map((entry) => entry.name.length));
  const titleWidth = Math.max(...entries.map((entry) => entry.title.length));
  const kindWidth = Math.max(...entries.map((entry) => entry.kind.length));
  return entries
    .map(
      (entry) =>
        `${entry.name.padEnd(nameWidth)}  ${entry.title.padEnd(titleWidth)}  ${entry.kind.padEnd(kindWidth)}  ${entry.description}`,
    )
    .join('\n');
}

function scoreCatalogEntry(entry: CatalogEntry, query: string): number {
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
