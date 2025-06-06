
import { test } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test.describe('Performance Tests', () => {
  test('should meet lighthouse performance standards', async ({ page, browserName }) => {
    // Skip webkit for lighthouse tests
    test.skip(browserName === 'webkit', 'Lighthouse tests not supported on webkit');
    
    await page.goto('/');
    
    await playAudit({
      page,
      thresholds: {
        performance: 80,
        accessibility: 90,
        'best-practices': 80,
        seo: 80,
      },
      port: 9222,
    });
  });
});
