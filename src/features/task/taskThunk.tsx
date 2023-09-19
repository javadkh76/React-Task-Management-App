import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Task } from '../../misc/types'
const API_URL = import.meta.env.VITE_API_URL

export const getTasks = createAsyncThunk('task/getTasks', async () => {
  const response = await axios.get(`${API_URL}/api/tasks`, {})
  return response.data
})
export const createTask = createAsyncThunk(
  'task/createTask',
  async (task: Task) => {
    const response = await axios.post(`${API_URL}/api/tasks`, task)
    return response.data
  }
)
export const updateTask = createAsyncThunk(
  'task/updateTask',
  async (task: Task) => {
    const response = await axios.put(`${API_URL}/api/tasks/${task.id}`, task)
    return response.data
  }
)
export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (id: number) => {
    const response = await axios.delete(`${API_URL}/api/tasks/${id}`)
    return response.data
  }
)
