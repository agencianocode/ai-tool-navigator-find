
import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display dashboard components', async ({ page }) => {
    await expect(page.getByText('Acciones Rápidas')).toBeVisible();
    await expect(page.getByText('Nueva Evaluación')).toBeVisible();
    await expect(page.getByText('Explorar Herramientas')).toBeVisible();
  });

  test('should navigate to questionnaire when clicking Nueva Evaluación', async ({ page }) => {
    await page.click('text=Nueva Evaluación');
    await expect(page).toHaveURL(/.*questionnaire.*/);
  });

  test('should navigate to tools when clicking Explorar Herramientas', async ({ page }) => {
    await page.click('text=Explorar Herramientas');
    await expect(page).toHaveURL(/.*tools.*/);
  });
});
