export interface TaskState {
  data: Task[] | []
  status: 'idle' | 'loading' | 'failed'
  msg?: string
  action?: 'getTasks' | 'createTask' | 'updateTask' | 'deleteTask'
}
export type Task = {
  id: number
  title: string
  description: string
  completed: boolean
}
