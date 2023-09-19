import { ComponentType } from 'react'
import { Modal, Spin } from 'antd'
import TaskFrom from '../TaskForm/TaskFrom'
import { useAppSelector } from '../../app/hooks'
import { selectTask } from '../../features/task/taskSlice'
import { Task } from '../../misc/types'

type TaskFormModalProps = {
  isOpen: boolean
  onCancel: Function
  mode: 'Create' | 'Update'
  task?: Task
}
const TaskFormModal: ComponentType<TaskFormModalProps> = ({
  isOpen,
  mode,
  onCancel,
  task,
}) => {
  const { status, action } = useAppSelector(selectTask)

  return (
    <>
      <Modal
        title={`${mode} Task`}
        open={isOpen}
        onCancel={() => onCancel()}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          {status === 'loading' &&
          (action === 'createTask' || action === 'updateTask') ? (
            <Spin />
          ) : null}
        </div>
        <TaskFrom mode={mode} task={task} />
      </Modal>
    </>
  )
}
export default TaskFormModal
