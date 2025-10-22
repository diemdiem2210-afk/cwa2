import { test, expect } from '@playwright/test';

test.describe('TabsGenerator', () => {
  
  test.beforeEach(async ({ page }) => {

    await page.route('**/api/tabs', (route) => {
      const method = route.request().method();
      
      if (method === 'GET') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([{ id: 1, title: 'Tab 1', content: 'This is Tab 1 content' }])
        });
      } else if (method === 'POST') {
        const postData = route.request().postDataJSON();
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ ...postData, id: Date.now() })
        });
      } else if (method === 'DELETE' || method === 'PUT') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true })
        });
      }
    });
    

    await page.goto('http://localhost:3000');
  });

  test('Add a new tab and update its content', async ({ page }) => {
    // Wait for first tab input to appear
    const firstTabInput = page.locator('input').first();
    await expect(firstTabInput).toBeVisible();

    // Click add tab button
    await page.getByRole('button', { name: /➕/ }).click();

    // Expect second tab to exist
    const secondTabInput = page.locator('input').nth(1);
    await expect(secondTabInput).toBeVisible();

    // Click second tab
    await secondTabInput.click();

    // Type content into textarea
    const textarea = page.locator('textarea');
    await textarea.fill('This is new tab content');

    // Verify content
    await expect(textarea).toHaveValue('This is new tab content');
  });

  test('Delete a tab and verify tab count', async ({ page }) => {
    // Wait for initial load to complete
    await page.waitForLoadState('networkidle');
    
    // Verify initial tab exists
    const firstTab = page.locator('input').first();
    await expect(firstTab).toBeVisible();

    // Add TWO tabs to ensure we have 3 total
    await page.locator('button').filter({ hasText: '➕' }).click();
    await page.waitForTimeout(300);
    await page.locator('button').filter({ hasText: '➕' }).click();
    await page.waitForTimeout(300);
    
    // Verify we have 3 tabs
    await expect(page.locator('input')).toHaveCount(3);

    // Click the third tab
    const thirdTabInput = page.locator('input').nth(2);
    await thirdTabInput.click();
    await page.waitForTimeout(200);

    // Delete the third tab
    await page.locator('button').filter({ hasText: '➖' }).click();
    await page.waitForTimeout(300);
    
    // Verify we now have 2 tabs
    await expect(page.locator('input')).toHaveCount(2);
    
    // Verify the Generate HTML5 button is still visible (proving UI is responsive)
    const generateButton = page.locator('button').filter({ hasText: 'Generate HTML5' });
    await expect(generateButton).toBeVisible();
  });

});