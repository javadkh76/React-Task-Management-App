import './App.css'
import { useEffect, useState } from 'react'
import { Button, FloatButton, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useAppSelector } from './app/hooks'
import { selectTask } from './features/task/taskSlice'
import Layout from './components/Layout/Layout'
import TasksList from './components/TasksList/TasksList'
import TaskFormModal from './components/TaskFormModal/TaskFormModal'
import { Simulate } from 'react-dom/test-utils'

function App() {
  const { status, msg, action } = useAppSelector(selectTask)
  const [isOpen, setIsOpen] = useState(false)
  const successMessages = {
    createTask: 'Task created ',
    updateTask: 'Task updated ',
    deleteTask: 'Task deleted ',
  }
  useEffect(() => {
    if (msg && action)
      if (status === 'failed' || (status === 'idle' && msg !== 'success')) {
        message.error(msg)
      } else if (status === 'idle' && action !== 'getTasks')
        message.success(successMessages[action] + 'successfully')
  }, [status])
  return (
    <Layout>
      <TasksList
        rightSideOption={
          <Button
            className="add-task-button"
            size="large"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsOpen(true)}
          >
            Add new task
          </Button>
        }
      />
      <TaskFormModal
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        mode="Create"
      />
      <FloatButton
        className="add-task-float-button"
        icon={<PlusOutlined />}
        tooltip={<div>Add new task</div>}
        onClick={() => setIsOpen(true)}
      />
    </Layout>
  )
}

export default App
