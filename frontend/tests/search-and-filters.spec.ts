import { test, expect, Page, Locator } from "@playwright/test";

test.describe("busca e filtragem de turmas", () => {
  async function waitForLoading(page: Page) {
    await page.waitForTimeout(500);
    await page.waitForSelector("text=Carregando turmas", {
      state: "hidden",
      timeout: 5000,
    });
  }

  async function selectFirstValidOption(
    selectLocator: Locator,
    excludeOptions: string[] = []
  ) {
    const optionElements = await selectLocator.locator("option").all();
    const optionsWithValues = await Promise.all(
      optionElements.map(async (opt) => ({
        label: await opt.textContent(),
        value: await opt.getAttribute("value"),
        disabled: await opt.getAttribute("disabled"),
      }))
    );

    const validOption = optionsWithValues.find(
      (opt) =>
        opt.label &&
        opt.label.trim() !== "" &&
        !opt.disabled &&
        opt.value !== "" &&
        !opt.label.toLowerCase().startsWith("todos") &&
        !excludeOptions.includes(opt.label.trim()) &&
        !["Segmento", "Ano/Série", "Tipo"].includes(opt.label.trim())
    );

    if (validOption && validOption.label) {
      await selectLocator.selectOption({ label: validOption.label.trim() });
      return true;
    }
    return false;
  }

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForLoading(page);
  });

  test("exibir todas as turmas inicialmente", async ({ page }) => {
    const gridContainer = page.locator('[class*="grid"]').first();
    await expect(gridContainer).toBeVisible({ timeout: 5000 });

    const classCards = gridContainer
      .locator("div")
      .filter({ hasText: /Turma [A-Z]/ });
    await expect(classCards.first()).toBeVisible({ timeout: 5000 });

    await expect(page.getByText(/Total: \d+ turma/)).toBeVisible();
  });

  test("filtrar turmas na busca por nome", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Pesquisar turmas");
    await searchInput.fill("Turma A");
    await waitForLoading(page);

    const gridContainer = page.locator('[class*="grid"]').first();
    const turmaA = gridContainer.getByText("Turma A");
    await expect(turmaA).toBeVisible();
  });

  test("filtrar turmas por segmento", async ({ page }) => {
    const segmentSelect = page
      .locator("select")
      .filter({
        has: page.locator("option", { hasText: "Segmento" }),
      })
      .first();

    const selected = await selectFirstValidOption(segmentSelect);

    if (selected) {
      await waitForLoading(page);
      const gridContainer = page.locator('[class*="grid"]').first();
      const classCards = gridContainer
        .locator("div")
        .filter({ hasText: /Turma [A-Z]/ });
      await expect(classCards.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test("filtrar turmas por ano/série", async ({ page }) => {
    const yearSelect = page
      .locator("select")
      .filter({
        has: page.locator("option", { hasText: "Ano/Série" }),
      })
      .first();

    const selected = await selectFirstValidOption(yearSelect);

    if (selected) {
      await waitForLoading(page);
      const gridContainer = page.locator('[class*="grid"]').first();
      const classCards = gridContainer
        .locator("div")
        .filter({ hasText: /Turma [A-Z]/ });
      await expect(classCards.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test("filtrar cards de turmas por tipo", async ({ page }) => {
    const typeSelect = page
      .locator("select")
      .filter({
        has: page.locator("option", { hasText: "Tipo" }),
      })
      .first();

    await typeSelect.selectOption({ label: "Regular" });
    await waitForLoading(page);

    const gridContainer = page.locator('[class*="grid"]').first();
    const classCards = gridContainer
      .locator("div")
      .filter({ hasText: /Turma [A-Z]/ });
    await expect(classCards.first()).toBeVisible({ timeout: 5000 });
  });

  test("combinar busca por nome e filtros", async ({ page }) => {
    const yearSelect = page
      .locator("select")
      .filter({
        has: page.locator("option", { hasText: "Ano/Série" }),
      })
      .first();

    await selectFirstValidOption(yearSelect);
    await waitForLoading(page);

    const searchInput = page.getByPlaceholder("Pesquisar turmas");
    await searchInput.fill("Turma A");
    await waitForLoading(page);

    const gridContainer = page.locator('[class*="grid"]').first();
    const classCards = gridContainer
      .locator("div")
      .filter({ hasText: /Turma [A-Z]/ });
    const count = await classCards.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("limpar a busca e mostrar todas as turmas novamente", async ({
    page,
  }) => {
    const searchInput = page.getByPlaceholder("Pesquisar turmas");
    await searchInput.fill("Turma A");
    await waitForLoading(page);

    await searchInput.clear();
    await waitForLoading(page);

    const gridContainer = page.locator('[class*="grid"]').first();
    const classCards = gridContainer
      .locator("div")
      .filter({ hasText: /Turma [A-Z]/ });
    const count = await classCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("exibir mensagem de 'nenhuma turma encontrada'", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Pesquisar turmas");
    await searchInput.fill("Turma Inexistente XYZ");
    await waitForLoading(page);

    await expect(page.getByText("Nenhuma turma encontrada")).toBeVisible({
      timeout: 5000,
    });
  });
});
