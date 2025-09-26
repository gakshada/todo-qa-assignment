import test, { expect } from "@playwright/test";
import AddTask from "../pages/addtask.page";
import DeleteTask from "../pages/DeletePageTask.page";
import {
  noTaskFoundMessage,
  taskName,
  todoListHeading,
} from "../constants.ts/const";

let addTask: AddTask;
let deleteTask: DeleteTask;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("http://localhost:3000");
  addTask = new AddTask(page);
  deleteTask = new DeleteTask(page);
  expect(addTask.todoListHeading).toHaveText(todoListHeading);
});

test.describe.serial("Creation and Deletion of task", () => {
  test("Create a task and validate that created task appear on UI", async ({}) => {
    await addTask.addNewTask(taskName);
    expect(await addTask.getAddedTask(taskName)).toBeTruthy();
  });

  test("Delete a task and validate that deleted task disappear on UI", async ({}) => {
    await deleteTask.clickDeleteTaskIcon(taskName);
    expect(deleteTask.noTaskMessage).toHaveText(noTaskFoundMessage);
  });

  test("Verify message when no task exist on UI",async()=>{
    //clean up all the available task
    expect(deleteTask.noTaskMessage).toHaveText(noTaskFoundMessage);
  })
});
