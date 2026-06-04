import { test, expect } from '@playwright/test';

test.describe('Chat Functionality', () => {
  test('O usuário consegue abrir o chat, digitar uma mensagem e enviá-la', async ({ page }) => {
    // 1. Navegar até a página inicial
    await page.goto('/');

    // 2. Localizar o botão flutuante do chat e clicar
    // Encontramos o botão verificando quem tem o SVG (ícone) do lucide-react
    const chatButton = page
      .locator('button', { has: page.locator('svg.lucide-message-circle') })
      .first();
    await expect(chatButton).toBeVisible();
    await chatButton.click();

    // 3. Verificar se a janela do chat abriu corretamente
    await expect(page.getByText('Atendimento', { exact: false })).toBeVisible();

    // 4. Digitar uma mensagem no input
    const input = page.getByPlaceholder('Digite sua mensagem...');
    await expect(input).toBeVisible();
    await input.fill('Olá, gostaria de saber mais sobre escalada E2E!');

    // 5. Enviar a mensagem clicando no botão de submit
    const sendButton = page.locator('button[type="submit"]');
    await sendButton.click();

    // 6. Validar se a mensagem enviada aparece na tela no balão do usuário
    await expect(page.getByText('Olá, gostaria de saber mais sobre escalada E2E!')).toBeVisible();

    // 7. Esperar que a resposta (ou erro do Rate Limit) retorne do servidor
    // A resposta deve aparecer num balão cinza-claro.
    await expect(page.locator('.bg-white.text-gray-800').last()).toBeVisible({ timeout: 10000 });
  });
});
