import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  ElAvatar,
  ElBadge,
  ElButton,
  ElCard,
  ElChip,
  ElFileUpload,
  ElIcon,
  ElInput,
  ElInputPrefix,
  ElList,
  ElListItem,
  ElStack,
  ElTab,
  ElTabContent,
  ElTabs,
  ElTooltip,
} from '@ng-elemental/ui';

@Component({
  selector: 'app-landing-demo-agent-thread',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ElCard,
    ElTabs,
    ElTab,
    ElTabContent,
    ElList,
    ElListItem,
    ElAvatar,
    ElBadge,
    ElInput,
    ElInputPrefix,
    ElIcon,
    ElButton,
    ElChip,
    ElStack,
    ElTooltip,
    ElFileUpload,
  ],
  template: `
    <el-card appearance="outlined">
      <div elCardHeader>
        <div class="landing-demo-title-row">
          <span class="landing-demo-title">Maya Chen</span>
          <el-badge content="Online" size="sm" color="success" variant="pill" />
        </div>
        <p class="landing-demo-desc">Support · Billing form follow-up</p>
      </div>
      <div elCardContent>
        <el-tabs [(value)]="tab" ariaLabel="Conversation">
          <el-tab value="chat" label="Chat">
            <ng-template elTabContent>
              <el-stack direction="column" gap="3">
                <el-list appearance="plain" size="sm" ariaLabel="Conversation messages">
                  <el-list-item>
                    <el-avatar elListLeading initials="YO" size="sm" alt="You" />
                    <span elListTitle>Can you add a date picker to the billing form?</span>
                    <span elListDescription>2m ago</span>
                  </el-list-item>
                  <el-list-item>
                    <el-avatar elListLeading icon="robot" size="sm" alt="Maya" />
                    <span elListTitle>
                      Installed datepicker via MCP. Single date or a range for invoices?
                    </span>
                    <span elListDescription>Just now</span>
                  </el-list-item>
                </el-list>
                <div class="landing-demo-chips">
                  <el-chip type="suggestion" (clicked)="draft.set('Use a single date')">
                    Single date
                  </el-chip>
                  <el-chip type="suggestion" (clicked)="draft.set('Use a date range')">
                    Date range
                  </el-chip>
                  <el-chip type="suggestion" (clicked)="draft.set('Show both pickers')">
                    Both
                  </el-chip>
                </div>
                <div class="landing-demo-composer">
                  <el-input
                    class="landing-demo-grow"
                    [(value)]="draft"
                    placeholder="Reply to Maya…"
                    size="sm"
                    ariaLabel="Message Maya"
                    inputId="landing-agent-input"
                  >
                    <el-icon elInputPrefix name="paperclip" size="sm" />
                  </el-input>
                  <el-button
                    variant="icon"
                    size="sm"
                    iconStart="paper-plane"
                    ariaLabel="Send message"
                    elTooltip="Send"
                  />
                </div>
              </el-stack>
            </ng-template>
          </el-tab>
          <el-tab value="files" label="Files">
            <ng-template elTabContent>
              <el-file-upload
                size="sm"
                [(files)]="files"
                accept=".pdf,.md,.png"
                [maxFiles]="4"
              >
                PDF, Markdown, or PNG
              </el-file-upload>
            </ng-template>
          </el-tab>
        </el-tabs>
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
export class LandingDemoAgentThread {
  protected readonly tab = signal('chat');
  protected readonly draft = signal('');
  protected readonly files = signal<File[]>([]);
}
