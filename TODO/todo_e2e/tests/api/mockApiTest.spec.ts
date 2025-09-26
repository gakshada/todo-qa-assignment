import { test, expect } from "@playwright/test";
import { getMockTaskIdByName, mockCreateTask, mockDeleteTask, mockGetTasks, mockUpdateTask } from "../../lib/mockApiUtils";

test.describe("Mocked Task API Tests", () => {

  test.skip("Create Task", async ({ page }) => {
    await mockCreateTask(page, { task: "Mock Task Create" });

    // Directly verify the task in memory
    const taskId = getMockTaskIdByName("Mock Task Create");
    expect(taskId).toBeTruthy();
    console.log("Created Task ID:", taskId);
  });

  test("Get Tasks", async ({ page }) => {
    await mockGetTasks(page);

    const taskId = getMockTaskIdByName("Mock Task 1");
    expect(taskId).toBeTruthy();
    console.log("Fetched Task ID:", taskId);
  });

  test("Update Task", async ({ page }) => {
    const taskId = getMockTaskIdByName("Mock Task 1");
    expect(taskId).toBeTruthy();

    await mockUpdateTask(page, taskId!, { done: true });

    const updatedTask = getMockTaskIdByName("Mock Task 1");
    expect(updatedTask).toBeTruthy();
    console.log("Updated Task ID:", taskId);
  });

  test.skip("Delete Task", async ({ page }) => {
    const taskId = getMockTaskIdByName("Mock Task 2");
    expect(taskId).toBeTruthy();

    await mockDeleteTask(page, taskId!);

    const deletedTaskId = getMockTaskIdByName("Mock Task 2");
    expect(deletedTaskId).toBeUndefined();
    console.log("Deleted Task ID:", taskId);
  });

});
