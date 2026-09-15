import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  ElCard,
  ElLabel,
  ElSegmentedButton,
  ElSegmentedButtonItem,
  ElSlider,
  ElStack,
} from '@ng-elemental/ui';

@Component({
  selector: 'app-landing-demo-density',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ElCard, ElSlider, ElLabel, ElSegmentedButton, ElSegmentedButtonItem, ElStack],
  template: `
    <el-card appearance="outlined">
      <div elCardHeader>
        <span class="landing-demo-title">Export image</span>
        <p class="landing-demo-desc">Hero art for the Northwind changelog.</p>
      </div>
      <div elCardContent>
        <el-stack direction="column" gap="5">
          <div class="landing-demo-field">
            <el-label>Format</el-label>
            <el-segmented-button [(value)]="format" size="sm" ariaLabel="Export format">
              <el-segmented-button-item value="png">PNG</el-segmented-button-item>
              <el-segmented-button-item value="jpg">JPG</el-segmented-button-item>
              <el-segmented-button-item value="webp">WebP</el-segmented-button-item>
            </el-segmented-button>
          </div>
          <div class="landing-demo-field">
            <el-label>Quality</el-label>
            <el-slider
              [(value)]="quality"
              [min]="40"
              [max]="100"
              [step]="1"
              showValue
              ariaLabel="Export quality"
            />
          </div>
          <div class="landing-demo-field">
            <el-label>Max width</el-label>
            <el-slider
              [(value)]="width"
              [min]="640"
              [max]="1920"
              [step]="80"
              showValue
              ariaLabel="Maximum width in pixels"
            />
          </div>
        </el-stack>
      </div>
    </el-card>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }
  `,
})
export class LandingDemoDensity {
  protected readonly format = signal('png');
  protected readonly quality = signal(82);
  protected readonly width = signal(1440);
}
