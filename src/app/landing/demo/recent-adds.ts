import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  ElCard,
  ElChip,
  ElPagination,
  ElSegmentedButton,
  ElSegmentedButtonItem,
  ElStack,
  ElTable,
  ElTableCell,
  ElTableColumn,
} from '@ng-elemental/ui';

interface Deployment {
  id: string;
  service: string;
  env: string;
  status: string;
  when: string;
}

@Component({
  selector: 'app-landing-demo-recent-adds',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ElCard,
    ElTable,
    ElTableColumn,
    ElTableCell,
    ElChip,
    ElPagination,
    ElSegmentedButton,
    ElSegmentedButtonItem,
    ElStack,
  ],
  template: `
    <el-card appearance="outlined">
      <div elCardHeader>
        <div class="landing-demo-title-row">
          <span class="landing-demo-title">Deployments</span>
          <el-chip type="assist" color="success" appearance="filled">3 live</el-chip>
        </div>
        <p class="landing-demo-desc">Latest Northwind previews and production ships.</p>
      </div>
      <div elCardContent>
        <el-stack direction="column" gap="3">
          <el-segmented-button
            [value]="env()"
            (valueChange)="onEnvChange($event)"
            size="sm"
            ariaLabel="Environment filter"
          >
            <el-segmented-button-item value="all">All</el-segmented-button-item>
            <el-segmented-button-item value="Production">Prod</el-segmented-button-item>
            <el-segmented-button-item value="Preview">Preview</el-segmented-button-item>
          </el-segmented-button>
          <el-table [data]="pageRows()" size="sm" ariaLabel="Recent deployments">
            <el-table-column name="service" label="Service" />
            <el-table-column name="status" label="Status">
              <ng-template elTableCell let-row>
                <el-chip type="assist" [color]="statusColor(row)">
                  {{ statusLabel(row) }}
                </el-chip>
              </ng-template>
            </el-table-column>
            <el-table-column name="when" label="When" />
          </el-table>
          <div class="landing-demo-pager">
            <el-pagination
              [(page)]="page"
              [total]="filtered().length"
              [pageSize]="3"
              size="sm"
              [showFirstLast]="false"
              [siblingCount]="0"
              ariaLabel="Deployment pages"
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
      min-width: 0;
    }
  `,
})
export class LandingDemoRecentAdds {
  protected readonly env = signal('all');
  protected readonly page = signal(1);

  protected onEnvChange(env: string): void {
    this.env.set(env);
    this.page.set(1);
  }

  private readonly rows: readonly Deployment[] = [
    { id: '1', service: 'docs', env: 'Production', status: 'Live', when: '2m ago' },
    { id: '2', service: 'mcp', env: 'Production', status: 'Live', when: '1h ago' },
    { id: '3', service: 'billing', env: 'Preview', status: 'Building', when: '3h ago' },
    { id: '4', service: 'cli', env: 'Preview', status: 'Live', when: 'Yesterday' },
    { id: '5', service: 'theme', env: 'Production', status: 'Live', when: 'Mon' },
    { id: '6', service: 'table', env: 'Preview', status: 'Failed', when: 'Sun' },
  ];

  protected readonly filtered = computed(() => {
    const env = this.env();
    return env === 'all' ? this.rows : this.rows.filter((row) => row.env === env);
  });

  protected readonly pageRows = computed(() => {
    const start = (this.page() - 1) * 3;
    return this.filtered().slice(start, start + 3);
  });

  protected statusLabel(row: object): string {
    return this.statusOf(row);
  }

  protected statusColor(row: object): 'success' | 'warning' | 'error' | 'neutral' {
    const status = this.statusOf(row);
    if (status === 'Live') {
      return 'success';
    }
    if (status === 'Building') {
      return 'warning';
    }
    if (status === 'Failed') {
      return 'error';
    }
    return 'neutral';
  }

  private statusOf(row: object): string {
    if ('status' in row && typeof row.status === 'string') {
      return row.status;
    }
    return '';
  }
}
