import { Locator, Page } from "@playwright/test";
import { todoListHeading } from "../constants.ts/const";
class addTask {
  readonly todoListHeading: Locator;
  readonly addBtn: Locator;
  readonly inputTaskLocator: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.todoListHeading = page.getByRole("heading", { name: todoListHeading });
    this.addBtn = page.getByRole("button", { name: "ADD" });
    this.inputTaskLocator = page.locator(
      '//input[@placeholder="Enter a task"]',
    );
  }

  async clickAddBtn() {
    await this.addBtn.click();
  }

  async addNewTask(taskName: string) {
    this.inputTaskLocator.fill(taskName);
    await this.clickAddBtn();
  }

  async getAddedTask(taskName: string) {
    return this.page.locator(`//div[@class="task"]/div/p[text()=${taskName}]`);
  }
}

export default addTask;
