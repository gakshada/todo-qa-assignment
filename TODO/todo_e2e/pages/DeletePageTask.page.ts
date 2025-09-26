import { Locator, Page } from "@playwright/test";
import { noTaskFoundMessage } from "../constants.ts/const";
class DeleteTask {
  readonly page: Page;
  readonly noTaskMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.noTaskMessage = page.locator(".task", { hasText: noTaskFoundMessage });
  }

  async clickDeleteTaskIcon(taskName: string) {
    await this.page
      .locator(".task", { hasText: taskName })
      .locator("div")
      .nth(1)
      .locator("svg")
      .nth(1)
      .click();
  }
}

export default DeleteTask;
