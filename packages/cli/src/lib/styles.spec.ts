import { join } from 'node:path';
import { toTokensUsePath } from './styles';

describe('toTokensUsePath', () => {
  it('resolves tokens from src/styles.scss into src/app/ui', () => {
    const cwd = join('C:', 'workspace', 'app');
    expect(toTokensUsePath(join(cwd, 'src', 'styles.scss'), join(cwd, 'src', 'app', 'ui'))).toBe(
      './app/ui/theme/tokens',
    );
  });

  it('resolves tokens from src/styles.scss into an Nx lib', () => {
    const cwd = join('C:', 'workspace', 'app');
    expect(toTokensUsePath(join(cwd, 'src', 'styles.scss'), join(cwd, 'libs', 'ui'))).toBe(
      '../libs/ui/theme/tokens',
    );
  });
});
