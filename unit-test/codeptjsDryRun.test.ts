import { execSync } from 'child_process';

describe('CodeceptJs dry-run check', () => {
  it('Should not return error code or throw an error', () => {
    expect(() => {
      execSync('codeceptjs dry-run', { stdio: 'ignore' });
    }).not.toThrow();
  });
});
