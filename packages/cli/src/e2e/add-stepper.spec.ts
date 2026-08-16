import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add stepper e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElStepper', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'stepper');

      const stepperTs = await readFile(
        componentUiPath(tmp, 'stepper', 'stepper.ts'),
        'utf8',
      );
      expect(stepperTs).toContain("selector: 'el-stepper'");
      expect(stepperTs).toContain('export class ElStepper');
      expect(stepperTs).toContain('export { ElStep, ElStepContent, ElStepLabel }');
      expect(stepperTs).toContain('ElIcon');

      const stepTs = await readFile(
        componentUiPath(tmp, 'stepper', 'step.ts'),
        'utf8',
      );
      expect(stepTs).toContain("selector: 'el-step'");
      expect(stepTs).toContain('export class ElStep');

      const contentTs = await readFile(
        componentUiPath(tmp, 'stepper', 'step-content.ts'),
        'utf8',
      );
      expect(contentTs).toContain('ng-template[elStepContent]');

      const labelTs = await readFile(
        componentUiPath(tmp, 'stepper', 'step-label.ts'),
        'utf8',
      );
      expect(labelTs).toContain('ng-template[elStepLabel]');

      const stepperHtml = await readFile(
        componentUiPath(tmp, 'stepper', 'stepper.html'),
        'utf8',
      );
      expect(stepperHtml).toContain('el-stepper__list');
      expect(stepperHtml).toContain('ngTemplateOutlet');
      expect(stepperHtml).toContain('<ng-content');
      expect(stepperHtml).toContain('el-stepper__connector');

      const stepperScss = await readFile(
        componentUiPath(tmp, 'stepper', 'stepper.scss'),
        'utf8',
      );
      expect(stepperScss).toContain('.el-stepper');
      expect(stepperScss).toContain('--el-color-primary');

      expect(
        existsSync(componentUiPath(tmp, 'stepper', 'stepper.stories.ts')),
      ).toBe(false);
    });
  });
});
