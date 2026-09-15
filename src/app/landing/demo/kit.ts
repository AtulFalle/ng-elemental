import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  ElAvatar,
  ElButton,
  ElCard,
  ElChip,
  ElInput,
  ElList,
  ElListItem,
  ElMenu,
  ElMenuItem,
  ElMenuPanel,
  ElMenuSeparator,
  ElMenuTrigger,
  ElSelect,
  ElSelectItem,
  ElSeparator,
  ElStack,
  ElTooltip,
} from '@ng-elemental/ui';

@Component({
  selector: 'app-landing-demo-kit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ElCard,
    ElAvatar,
    ElChip,
    ElButton,
    ElList,
    ElListItem,
    ElMenu,
    ElMenuPanel,
    ElMenuItem,
    ElMenuSeparator,
    ElMenuTrigger,
    ElInput,
    ElSelect,
    ElSelectItem,
    ElSeparator,
    ElStack,
    ElTooltip,
  ],
  template: `
    <el-card appearance="outlined">
      <div elCardHeader>
        <div class="landing-demo-title-row">
          <span class="landing-demo-title">Share “Q3 roadmap”</span>
          <el-chip type="assist" color="info">Can edit</el-chip>
        </div>
        <p class="landing-demo-desc">Anyone at Northwind with the link can comment.</p>
      </div>
      <div elCardContent>
        <el-stack direction="column" gap="4">
          <el-list appearance="plain" size="sm" ariaLabel="People with access">
            <el-list-item>
              <el-avatar elListLeading initials="AL" size="sm" alt="Ada Lovelace" />
              <span elListTitle>Ada Lovelace</span>
              <span elListDescription>Owner · ada@northwind.dev</span>
              <el-chip elListTrailing type="assist" appearance="filled">Owner</el-chip>
            </el-list-item>
            <el-list-item>
              <el-avatar elListLeading initials="MC" size="sm" alt="Maya Chen" />
              <span elListTitle>Maya Chen</span>
              <span elListDescription>maya@northwind.dev</span>
              <div elListTrailing class="landing-demo-trailing">
                <el-chip type="assist">Editor</el-chip>
                <el-menu>
                  <el-button
                    elMenuTrigger
                    variant="icon"
                    size="sm"
                    iconStart="ellipsis"
                    ariaLabel="Maya Chen access actions"
                  />
                  <el-menu-panel>
                    <el-menu-item icon="eye">Make viewer</el-menu-item>
                    <el-menu-item icon="pen">Keep editor</el-menu-item>
                    <el-menu-separator />
                    <el-menu-item variant="danger" icon="user-minus">Remove</el-menu-item>
                  </el-menu-panel>
                </el-menu>
              </div>
            </el-list-item>
          </el-list>
          <el-separator />
          <el-stack direction="column" gap="3">
            <el-input
              [(value)]="inviteEmail"
              type="email"
              placeholder="Add people by email"
              size="sm"
              inputId="landing-share-email"
              ariaLabel="Invite email"
            />
            <el-stack direction="row" gap="2" align="center">
              <el-select
                class="landing-demo-role"
                [(value)]="inviteRole"
                size="sm"
                ariaLabel="Invite role"
              >
                <el-select-item value="editor" label="Editor">Editor</el-select-item>
                <el-select-item value="viewer" label="Viewer">Viewer</el-select-item>
              </el-select>
              <el-button variant="primary" size="sm">Invite</el-button>
            </el-stack>
          </el-stack>
        </el-stack>
      </div>
      <div elCardFooter>
        <el-button
          variant="outline"
          size="sm"
          iconStart="link"
          elTooltip="Copy share link"
        >
          Copy link
        </el-button>
      </div>
    </el-card>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }

    .landing-demo-role {
      width: auto;
      flex: 1 1 auto;
      min-width: 0;
    }

    .landing-demo-trailing {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  `,
})
export class LandingDemoKit {
  protected readonly inviteEmail = signal('');
  protected readonly inviteRole = signal('editor');
}
