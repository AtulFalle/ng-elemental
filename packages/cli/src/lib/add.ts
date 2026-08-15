import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  AVAILABLE_COMPONENTS,
  isRegistryFilenameAllowed,
  type AvailableComponent,
} from './component-registry';
import { readConfig } from './config';
import { getComponentRegistryDir } from './registry';

export { AVAILABLE_COMPONENTS, type AvailableComponent } from './component-registry';

const COMPONENT_EXAMPLES: Record<
  AvailableComponent,
  { className: string; usage: string }
> = {
  icon: {
    className: 'ElIcon',
    usage: '<el-icon name="check" />',
  },
  button: {
    className: 'ElButton',
    usage: '<el-button variant="primary" iconStart="plus">Add item</el-button>',
  },
  label: {
    className: 'ElLabel',
    usage: '<el-label htmlFor="email" variant="default">Email</el-label>',
  },
  'form-error': {
    className: 'ElFormError',
    usage: `<el-label htmlFor="email" required>Email</el-label>
<el-input inputId="email" [(value)]="email" [error]="invalid" />
@if (invalid) {
  <el-form-error id="email-err">Email is required</el-form-error>
}`,
  },
  input: {
    className: 'ElInput',
    usage:
      '<el-input [(value)]="email" type="email" placeholder="you@example.com" inputId="email" />',
  },
  checkbox: {
    className: 'ElCheckbox',
    usage: `<el-checkbox [(checked)]="accepted" inputId="terms">
  Accept terms and conditions
</el-checkbox>`,
  },
  'slide-toggle': {
    className: 'ElSlideToggle',
    usage: `<el-slide-toggle [(checked)]="enabled" inputId="notifications">
  Notifications
</el-slide-toggle>`,
  },
  radio: {
    className: 'ElRadio, ElRadioGroup',
    usage: `<el-radio-group [(value)]="contact" ariaLabel="Contact method">
  <el-radio value="email" inputId="contact-email">Email</el-radio>
  <el-radio value="phone" inputId="contact-phone">Phone</el-radio>
</el-radio-group>`,
  },
  select: {
    className: 'ElSelect, ElSelectItem',
    usage: `<el-select [(value)]="city" placeholder="Choose a city" ariaLabel="City">
  <el-select-item value="pune" label="Pune">Pune</el-select-item>
  <el-select-item value="mumbai" label="Mumbai">Mumbai</el-select-item>
</el-select>`,
  },
  chip: {
    className: 'ElChip',
    usage: `<el-chip type="filter" [(selected)]="active">Filter</el-chip>`,
  },
  progress: {
    className: 'ElProgress, ElProgressCircle',
    usage: `<el-progress [value]="42" showValue />
<el-progress-circle [value]="72" showValue />`,
  },
  slider: {
    className: 'ElSlider',
    usage: `<el-slider [(value)]="volume" [min]="0" [max]="100" showValue />
<el-slider range [(start)]="minPrice" [(end)]="maxPrice" [step]="5" showTicks showValue />`,
  },
  avatar: {
    className: 'ElAvatar',
    usage: `<el-avatar src="/avatar.jpg" alt="Jane Doe" />
<el-avatar initials="JD" alt="Jane Doe" />
<el-avatar icon="user" alt="Account" />`,
  },
  card: {
    className: 'ElCard',
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
  },
  attachment: {
    className:
      'ElAttachment, ElAttachmentMedia, ElAttachmentContent, ElAttachmentTitle, ElAttachmentDescription, ElAttachmentActions, ElAttachmentAction, ElAttachmentGroup',
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
  },
  'file-upload': {
    className: 'ElFileUpload',
    usage: `<el-file-upload [(files)]="files" multiple accept="image/*,.pdf">
  PNG, JPG, or PDF up to 5 MB
</el-file-upload>`,
  },

  'segmented-button': {
    className: 'ElSegmentedButton, ElSegmentedButtonItem',
    usage: `<el-segmented-button [(value)]="view" ariaLabel="View mode">
  <el-segmented-button-item value="list">List</el-segmented-button-item>
  <el-segmented-button-item value="grid">Grid</el-segmented-button-item>
</el-segmented-button>`,
  },
  datepicker: {
    className: 'ElDatePicker, ElDateRangePicker',
    usage: `<el-date-picker [(value)]="when" mode="date" />
<el-date-range-picker [(value)]="range" />`,
  },
  theme: {
    className: 'ElThemeService',
    usage: `// styles.scss — @use './theme/tokens';
// Open tokens.scss and edit the BRAND block (--el-color-primary, …)
// app.config.ts — provideElTheme({ mode: 'light' })`,
  },
};

export interface AddOptions {
  cwd: string;
  name: string;
  force?: boolean;
}

export function addCommand(options: AddOptions): void {
  const { cwd, name, force } = options;
  if (!AVAILABLE_COMPONENTS.includes(name as AvailableComponent)) {
    throw new Error(
      `Unknown component "${name}". Available: ${AVAILABLE_COMPONENTS.join(', ')}`,
    );
  }

  const config = readConfig(cwd);
  const destDir = join(cwd, config.componentsDir, name);
  if (existsSync(destDir) && !force) {
    throw new Error(
      `${config.componentsDir}/${name} already exists. Use --force to overwrite.`,
    );
  }

  const srcDir = getComponentRegistryDir(name);
  if (!existsSync(srcDir)) {
    throw new Error(
      `Registry is missing component "${name}". Rebuild or reinstall @ng-elemental/cli.`,
    );
  }

  copyComponentFiles(srcDir, destDir);

  const importPath = toAppImportPath(config.componentsDir, name);
  const example = COMPONENT_EXAMPLES[name as AvailableComponent];
  console.log(`Added ${name} to ${config.componentsDir}/${name}`);
  console.log('');
  console.log('Import it in your component:');
  console.log('');
  console.log(`  import { ${example.className} } from '${importPath}';`);
  console.log('');
  console.log('Then use:');
  console.log('');
  console.log(`  ${example.usage}`);
}

function copyComponentFiles(srcDir: string, destDir: string): void {
  mkdirSync(destDir, { recursive: true });
  for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
    if (!entry.isFile() || !isRegistryFilenameAllowed(entry.name)) {
      continue;
    }
    copyFileSync(join(srcDir, entry.name), join(destDir, entry.name));
  }
}

function toAppImportPath(componentsDir: string, componentName: string): string {
  const normalized = componentsDir.replace(/\\/g, '/').replace(/^src\/app\/?/, '');
  const relative = normalized
    ? `${normalized}/${componentName}/${componentName}`
    : `${componentName}/${componentName}`;
  return `./${relative}`;
}
