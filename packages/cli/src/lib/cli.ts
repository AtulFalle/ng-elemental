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
    initCommand({
      cwd: process.cwd(),
      yes: rest.includes('--yes'),
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

function printUsage(): void {
  console.log(`ng-elemental — copy Angular components into your app

Usage:
  npx @ng-elemental/cli init [--yes]
  npx @ng-elemental/cli add <component> [--force]

Commands:
  init          Create elemental.json and the components directory
  add button            Copy the Button component into your project
  add label             Copy the Label component into your project
  add form-error        Copy the Form Error component into your project
  add input             Copy the Input component into your project
  add checkbox          Copy the Checkbox component into your project
  add slide-toggle      Copy the Slide Toggle component into your project
  add radio             Copy the Radio component into your project
  add select            Copy the Select component into your project
  add segmented-button  Copy the Segmented Button component into your project
  add datepicker        Copy the Date Picker and Date Range Picker into your project
  add progress          Copy the Progress (line + circle) components into your project
  add avatar            Copy the Avatar component into your project
  add card              Copy the Card component into your project
  add attachment        Copy the Attachment component into your project
  add file-upload       Copy the File Upload component into your project
`);
}
