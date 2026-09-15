import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  ElAutocomplete,
  ElAutocompleteItem,
  ElButton,
  ElCard,
  ElDatePicker,
  ElLabel,
  ElRadio,
  ElRadioGroup,
  ElStack,
} from '@ng-elemental/ui';

@Component({
  selector: 'app-landing-demo-empty-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ElCard,
    ElAutocomplete,
    ElAutocompleteItem,
    ElDatePicker,
    ElLabel,
    ElRadio,
    ElRadioGroup,
    ElButton,
    ElStack,
  ],
  template: `
    <el-card appearance="outlined">
      <div elCardHeader>
        <span class="landing-demo-title">Book a walkthrough</span>
        <p class="landing-demo-desc">30 minutes with Maya on the billing form.</p>
      </div>
      <div elCardContent>
        <el-stack direction="column" gap="4">
          <div class="landing-demo-field">
            <el-label htmlFor="landing-walkthrough-who">With</el-label>
            <el-autocomplete
              [(value)]="attendee"
              size="sm"
              placeholder="Search teammates"
              inputId="landing-walkthrough-who"
              ariaLabel="Teammate"
            >
              <el-autocomplete-item value="maya" label="Maya Chen">
                Maya Chen · Support
              </el-autocomplete-item>
              <el-autocomplete-item value="ada" label="Ada Lovelace">
                Ada Lovelace · Design
              </el-autocomplete-item>
              <el-autocomplete-item value="linus" label="Linus Torvalds">
                Linus Torvalds · Platform
              </el-autocomplete-item>
            </el-autocomplete>
          </div>
          <div class="landing-demo-field">
            <el-label>Date</el-label>
            <el-date-picker
              [(value)]="when"
              mode="date"
              size="sm"
              placeholder="Pick a day"
              ariaLabel="Walkthrough date"
            />
          </div>
          <div class="landing-demo-field">
            <el-label>Length</el-label>
            <el-radio-group
              [(value)]="duration"
              direction="horizontal"
              ariaLabel="Walkthrough length"
            >
              <el-radio value="30" inputId="landing-walkthrough-30">30 min</el-radio>
              <el-radio value="60" inputId="landing-walkthrough-60">60 min</el-radio>
            </el-radio-group>
          </div>
        </el-stack>
      </div>
      <div elCardFooter>
        <el-button variant="ghost" size="sm">Cancel</el-button>
        <el-button variant="primary" size="sm" iconStart="calendar-check">Book</el-button>
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
export class LandingDemoEmptyAlert {
  protected readonly attendee = signal('maya');
  protected readonly when = signal<Date | null>(new Date(2026, 8, 18));
  protected readonly duration = signal('30');
}
