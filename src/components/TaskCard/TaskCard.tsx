import { ComponentType, useState } from 'react'
import { Card, Popconfirm, Tooltip } from 'antd'
import { Task } from '../../misc/types'
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  HistoryOutlined,
} from '@ant-design/icons'
import Meta from 'antd/es/card/Meta'
import { useAppDispatch } from '../../app/hooks'
import { deleteTask, updateTask } from '../../features/task/taskThunk'
import debounce from '../../misc/debounce'
import TaskFormModal from '../TaskFormModal/TaskFormModal'
import styles from './TaskCard.module.css'

const TaskCard: ComponentType<Task> = (props: Task) => {
  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = useState(false)

  const handleDeleteTask = () => {
    dispatch(deleteTask(props.id))
  }
  const handleToggleDoneTask = debounce(() => {
    dispatch(
      updateTask({
        id: props.id,
        title: props.title,
        description: props.description,
        completed: !props.completed,
      })
    )
  })
  const actions = [
    props.completed ? (
      <Tooltip placement="bottom" title="Mark as in progress" arrow>
        <HistoryOutlined key="inProgress" onClick={handleToggleDoneTask} />
      </Tooltip>
    ) : (
      <Tooltip placement="bottom" title="Mark as done" arrow>
        <CheckCircleOutlined
          key="done"
          className={styles['done-icon']}
          onClick={handleToggleDoneTask}
        />
      </Tooltip>
    ),
    <Tooltip placement="bottom" title="Edit task" arrow>
      <EditOutlined key="edit" onClick={() => setIsOpen(true)} />
    </Tooltip>,
    <Tooltip placement="bottom" title="Delete task" arrow>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={handleDeleteTask}
        okText="Yes"
        cancelText="No"
        okButtonProps={{ danger: true }}
        icon={
          <DeleteOutlined
            key="delete"
            className={styles['delete-confirm-icon']}
          />
        }
      >
        <DeleteOutlined key="delete" className={styles['delete-icon']} />
      </Popconfirm>
    </Tooltip>,
  ]
  return (
    <>
      <Card
        className={
          styles['task-card'] + `${props.completed ? ' completed' : ''}`
        }
        actions={actions}
      >
        <Meta
          title={props.title}
          description={props.description || <div style={{ height: 20 }}></div>}
        />
      </Card>
      <TaskFormModal
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        mode="Update"
        task={{ ...props }}
      />
    </>
  )
}
export default TaskCard
