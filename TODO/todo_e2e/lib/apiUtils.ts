import { APIResponse, request } from "@playwright/test"
import { taskDataForCreation, taskDataForUpation } from "../constants.ts/const"

type Task = {
  _id: string;
  task: string;
  done: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

const getApiRequestContext = async()=>{
    return request.newContext({
        baseURL: "http://localhost:5000",
        extraHTTPHeaders:{
            'Content-Type': 'application/json'
        }
    })
}
//post request
export const createRequestForTask = async()=>{
    const apiContext = await getApiRequestContext();
    const response = await apiContext.post('/add',{data:taskDataForCreation})
    return response;
}
//get request
export const getRequestForTask = async()=>{
    const apiContext = await getApiRequestContext();
    const response = await apiContext.get('/get');
    return response
}

//put request
export const putRequestForTask = async(id:string)=>{
    const apiContext = await getApiRequestContext();
    const response = await apiContext.put(`/update/${id}`,{data:taskDataForUpation})
    return response;
}

//delete request
export const deleteRequestForTask = async(id:string)=>{
    const apiContext = await getApiRequestContext();
    const response = await apiContext.delete(`/delete/${id}`)
    return response;
}

export async function getTaskIdByName(
  response: APIResponse,
  taskName: string
): Promise<string>{
  const data: Task[] = await response.json();   // parse JSON safely
  return data.find(task => task.task === taskName)?._id;
}