import { test, expect } from '@playwright/test';

test.describe('Jornada de Checkout', () => {
  test('Deve completar o fluxo de checkout com sucesso', async ({ page, context }) => {
    // Navigate to the test route where Auth is mocked and Cart Modal is opened
    await page.goto('/test-e2e/checkout');

    // Dismiss cookie consent banner if present
    const acceptAllButton = page.getByRole('button', { name: 'Aceitar Todos' });
    try {
      await acceptAllButton.click({ timeout: 3000 });
    } catch {
      // Button not found or not clickable, continue with test
    }

    // 1. Validate we are in the Cart Modal with the mocked item
    await expect(page.getByRole('heading', { name: 'Meu Carrinho' })).toBeVisible();
    await expect(page.getByText('Escalada Tradicional')).toBeVisible();

    // Click to proceed to checkout
    await page.getByRole('button', { name: 'Finalizar Compra' }).click();

    // 2. Step 1: Participant Details
    await expect(page.getByRole('heading', { name: '📋 Dados dos Participantes' })).toBeVisible();

    // Fill the inputs (the inputs use the item ID, which is mock-item-1)
    await page.locator('input[id^="name-"]').fill('João da Silva');
    await page.locator('input[id^="age-"]').fill('30');
    await page.locator('select[id^="experience-"]').selectOption('beginner');
    await page.locator('input[id^="whatsapp-"]').fill('11999999999');

    // Check health declaration
    await page.locator('input[id^="health-"]').check();

    // Proceed to Step 2
    await page.getByRole('button', { name: 'Confirmar Dados e Continuar' }).click();

    // 3. Step 2: Climbing Details
    await expect(
      page.getByRole('heading', { name: '📅 Confirmação de Data e Detalhes' })
    ).toBeVisible();

    // Optional special requests
    await page
      .getByPlaceholder('Descreva qualquer solicitação especial')
      .fill('Nenhuma restrição.');

    // Proceed to Step 3
    await page.getByRole('button', { name: 'Prosseguir para Revisão' }).click();

    // 4. Step 3: Confirmation
    await expect(
      page.getByRole('heading', { name: '📱 Revisão e Envio ao WhatsApp' })
    ).toBeVisible();
    await expect(page.getByText('João da Silva', { exact: true })).toBeVisible();

    // Handle popup when clicking the final button
    const popupPromise = context.waitForEvent('page');

    // Click final button
    await page.getByRole('button', { name: 'Enviar para WhatsApp e Finalizar' }).click();

    // Await popup and verify URL
    const popup = await popupPromise;

    // Validate that it redirected to WhatsApp
    await expect(popup).toHaveURL(/api\.whatsapp\.com/);
  });
});
