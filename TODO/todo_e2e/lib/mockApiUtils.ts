import { Page } from "@playwright/test";

export type Task = {
  _id: string;
  task: string;
  done: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

// In-memory mock task data
export let mockTasks: Task[] = [
  { _id: "1", task: "Mock Task 1", done: false },
  { _id: "2", task: "Mock Task 2", done: true },
];

// ===== MOCK CREATE =====
export const mockCreateTask = async (page: Page, taskData: Partial<Task>) => {
  await page.route("**/add", async route => {
    const newTask: Task = {
      _id: String(Date.now()),
      task: taskData.task || "Mock Created Task",
      done: taskData.done ?? false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
    };
    mockTasks.push(newTask);

    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify(newTask),
    });
  });
};

// ===== MOCK GET =====
export const mockGetTasks = async (page: Page) => {
  await page.route("**/get", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockTasks),
    });
  });
};

// ===== MOCK UPDATE =====
export const mockUpdateTask = async (page: Page, id: string, taskData: Partial<Task>) => {
  await page.route(`**/update/${id}`, async route => {
    const task = mockTasks.find(t => t._id === id);
    if (task) {
      Object.assign(task, taskData, { updatedAt: new Date().toISOString() });
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(task),
      });
    } else {
      await route.fulfill({ status: 404, body: "Task not found" });
    }
  });
};

// ===== MOCK DELETE =====
export const mockDeleteTask = async (page: Page, id: string) => {
  await page.route(`**/delete/${id}`, async route => {
    mockTasks = mockTasks.filter(t => t._id !== id);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ message: "Deleted successfully" }),
    });
  });
};

// ===== HELPER =====
export const getMockTaskIdByName = (taskName: string): string | undefined => {
  return mockTasks.find(t => t.task === taskName)?._id;
};
