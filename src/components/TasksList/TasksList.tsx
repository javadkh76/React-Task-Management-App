import { Col, Divider, Pagination, Row, Spin } from 'antd'
import { ComponentType, ReactNode, useEffect, useState } from 'react'
import TaskCard from '../TaskCard/TaskCard'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectTask } from '../../features/task/taskSlice'
import { getTasks } from '../../features/task/taskThunk'
import { Fade } from 'react-awesome-reveal'
import TasksListOptions from './TasksListOptions'
import debounce from '../../misc/debounce'
import { Task } from '../../misc/types'

type SortByTypes = 'newest' | 'oldest'
type FilterByType = 'all' | 'done' | 'undone'
const TasksList: ComponentType<{ rightSideOption: ReactNode }> = (props) => {
  const { data: tasks, status, action } = useAppSelector(selectTask)
  const dispatch = useAppDispatch()

  const [tasksList, setTasksList] = useState(tasks)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')
  const [filteredBy, setFilteredBy] = useState<'all' | 'done' | 'undone'>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(getTasks())
  }, [])
  useEffect(() => {
    const newTasksList = preparedTasksList(tasks, sortBy, filteredBy, search)
    setTasksList(newTasksList)
    setCurrentPage(1)
  }, [sortBy, filteredBy, search, tasks])
  const handleSort = (value: SortByTypes) => {
    setSortBy(value)
  }
  const handleFilter = (value: FilterByType) => {
    setFilteredBy(value)
  }
  const handleSearch = debounce((value: string) => setSearch(value), 400)
  const preparedTasksList = (
    tasks: [] | Task[],
    sortBy: SortByTypes,
    filteredBy: FilterByType,
    search?: string
  ) => {
    let outputTasks = structuredClone(tasks)
    if (search) {
      // Make search case in-sensitive
      const regex = new RegExp(`${search}`, 'i')
      outputTasks = outputTasks.filter(
        (task) => regex.test(task.title) || regex.test(task.description)
      )
    }
    // Filter tasks by completed status
    if (filteredBy === 'done')
      outputTasks = outputTasks.filter((task) => task.completed)
    if (filteredBy === 'undone')
      outputTasks = outputTasks.filter((task) => !task.completed)
    // Sort tasks by date
    if (sortBy === 'newest') {
      outputTasks.reverse()
    }
    return outputTasks
  }
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col md={20} sm={24}>
          <TasksListOptions
            handleSort={handleSort}
            handleFilter={handleFilter}
            handleSearch={handleSearch}
          />
        </Col>
        <Col md={4} sm={24}>
          {props.rightSideOption}
        </Col>
        <Divider style={{ margin: '0px 0px 10px 0px' }} />
        {action === 'getTasks' && status === 'loading' ? (
          <Col span={24} style={{ textAlign: 'center' }}>
            <Spin />
          </Col>
        ) : (
          tasksList
            .slice((currentPage - 1) * 12, currentPage * 12)
            .map((task) => (
              <Col lg={8} md={12} sm={24} xs={24} key={task.id}>
                <Fade triggerOnce style={{ height: '100%' }}>
                  <TaskCard {...task} />
                </Fade>
              </Col>
            ))
        )}
        {!tasksList.length ? 'There is nothing to show.' : null}
        <Col span={24} style={{ textAlign: 'center' }}>
          <Pagination
            hideOnSinglePage={true}
            showSizeChanger={false}
            pageSize={12}
            defaultCurrent={1}
            current={currentPage}
            total={tasksList.length}
            onChange={(page) => setCurrentPage(page)}
          />
        </Col>
      </Row>
    </>
  )
}
export default TasksList
