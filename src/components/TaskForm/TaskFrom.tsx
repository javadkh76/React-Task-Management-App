import { ComponentType, useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { Task } from '../../misc/types'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { createTask, updateTask } from '../../features/task/taskThunk'
import { useForm } from 'antd/es/form/Form'
import { selectTask } from '../../features/task/taskSlice'

const layout = {
  wrapperCol: { span: 24 },
}
type TaskFromProps = {
  task?: Task
  mode: 'Create' | 'Update'
}
const TaskFrom: ComponentType<TaskFromProps> = ({ task, mode }) => {
  const { msg, status, action } = useAppSelector(selectTask)
  const dispatch = useAppDispatch()
  const [form] = useForm()
  useEffect(() => {
    form.resetFields()
    form.setFields([
      { name: 'title', value: task?.title },
      { name: 'description', value: task?.description },
    ])
  }, [])
  useEffect(() => {
    form.resetFields()
  }, [msg === 'success', status === 'idle', action === 'createTask'])
  const onFinish = (values: Omit<Task, 'id'>) => {
    if (mode === 'Create') {
      dispatch(
        createTask({
          id: new Date().getTime() + Math.floor(Math.random() * 10), // generate unique integer id
          title: values.title,
          description: values.description,
          completed: false,
        })
      )
    } else if (task) {
      dispatch(
        updateTask({
          id: task.id,
          title: values.title,
          description: values.description,
          completed: task.completed,
        })
      )
    }
  }
  return (
    <Form {...layout} form={form} onFinish={onFinish}>
      <Form.Item
        name="title"
        rules={[{ required: true, message: 'Please enter a title' }]}
      >
        <Input placeholder="Task title" />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[
          {
            max: 300,
            message: 'Description length cannot be more than 300 characters',
          },
        ]}
      >
        <Input.TextArea placeholder="Task descritption" />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
        <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
          {mode}
        </Button>
      </Form.Item>
    </Form>
  )
}
export default TaskFrom
