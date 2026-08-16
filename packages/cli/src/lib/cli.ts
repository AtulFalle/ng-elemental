import { parseArgs } from 'node:util';
import { addCommand } from './add';
import { initCommand } from './init';

export async function run(argv: string[]): Promise<void> {
  const [command, ...rest] = argv;

  if (!command || command === '-h' || command === '--help') {
    printUsage();
    if (!command) {
      throw new Error('Missing command. Use --help to see available commands.');
    }
    return;
  }

  if (command === 'init') {
    const flags = parseInitArgv(rest);
    await initCommand({
      cwd: process.cwd(),
      ...flags,
    });
    return;
  }

  if (command === 'add') {
    const name = rest.find((arg) => !arg.startsWith('-'));
    if (!name) {
      throw new Error('Usage: ng-elemental add <component>');
    }
    addCommand({
      cwd: process.cwd(),
      name,
      force: rest.includes('--force'),
    });
    return;
  }

  throw new Error(`Unknown command "${command}". Use --help to see available commands.`);
}

export function parseInitArgv(args: string[]): {
  yes: boolean;
  path?: string;
  skipTheme: boolean;
  styles?: string;
} {
  const { values } = parseArgs({
    args,
    options: {
      yes: { type: 'boolean', default: false },
      path: { type: 'string' },
      'skip-theme': { type: 'boolean', default: false },
      styles: { type: 'string' },
    },
    strict: true,
    allowPositionals: false,
  });

  return {
    yes: Boolean(values.yes),
    path: values.path,
    skipTheme: Boolean(values['skip-theme']),
    styles: values.styles,
  };
}

function printUsage(): void {
  console.log(`ng-elemental — copy Angular components into your app

Usage:
  npx @ng-elemental/cli init [--yes] [--path <dir>] [--skip-theme]
  npx @ng-elemental/cli add <component> [--force]

Commands:
  init          Create elemental.json, prompt for the components path, and install theme tokens
  add theme             Copy design tokens (installed automatically by init)
  add button            Copy the Button component into your project
  add label             Copy the Label component into your project
  add form-error        Copy the Form Error component into your project
  add input             Copy the Input component into your project
  add checkbox          Copy the Checkbox component into your project
  add slide-toggle      Copy the Slide Toggle component into your project
  add radio             Copy the Radio component into your project
  add select            Copy the Select component into your project
  add tabs              Copy the Tabs component into your project
  add accordion         Copy the Accordion component into your project
  add segmented-button  Copy the Segmented Button component into your project
  add datepicker        Copy the Date Picker and Date Range Picker into your project
  add progress          Copy the Progress (line + circle) components into your project
  add slider            Copy the Slider component into your project
  add avatar            Copy the Avatar component into your project
  add card              Copy the Card component into your project
  add list              Copy the List and List Item components into your project
  add infinite-scroll   Copy the Infinite Scroll directive into your project
  add attachment        Copy the Attachment component into your project
  add file-upload       Copy the File Upload component into your project
  add table             Copy the Table component into your project
  add pagination        Copy the Pagination component into your project
  add skeleton          Copy the Skeleton placeholders and host directive into your project
  add breadcrumb        Copy the Breadcrumb component into your project
  add tooltip           Copy the Tooltip directive into your project
  add alert             Copy the Alert banner component into your project
  add toast             Copy the Toast, Toaster, and toast service into your project
`);
}
