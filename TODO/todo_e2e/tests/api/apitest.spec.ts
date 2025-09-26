import test, { expect } from "@playwright/test";
import { createRequestForTask, deleteRequestForTask, getRequestForTask, getTaskIdByName, putRequestForTask } from "../../lib/apiUtils";
import { taskDataForCreation } from "../../constants.ts/const";

test.describe.serial("Task creation updation and deletion",()=>{
    let id:string;
    test("Creat a task using post request",async ()=>{
        const response = await createRequestForTask();
        expect(response.status()).toBe(200);
    })
     test("Get task request",async ()=>{
        const response = await getRequestForTask();
        expect(response.status()).toBe(200)
        id= await getTaskIdByName(response,taskDataForCreation['task'])
    })
    test("Update a task using put request",async ()=>{
        const response = await putRequestForTask(id) ;
        expect(response.status()).toBe(200);
    })
    test("delete a task using delete request",async ()=>{
        const response = await deleteRequestForTask(id) ;
        expect(response.status()).toBe(200);
    })

})