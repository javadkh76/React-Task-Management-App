import { ComponentType } from 'react'
import { Divider, Select } from 'antd'
import Search from 'antd/es/input/Search'

type TasksListOptions = {
  handleSort: Function
  handleFilter: Function
  handleSearch: Function
}
const TasksListOptions: ComponentType<TasksListOptions> = ({
  handleSort,
  handleFilter,
  handleSearch,
}) => {
  return (
    <>
      <Select
        defaultValue="newest"
        onChange={(value) => handleSort(value)}
        options={[
          { value: 'newest', label: 'Sort by newest' },
          { value: 'oldest', label: 'Sort by oldest' },
        ]}
        size="large"
      />
      <Divider type="vertical" />
      <Select
        defaultValue="all"
        onChange={(value) => handleFilter(value)}
        options={[
          { value: 'all', label: 'All task' },
          { value: 'done', label: 'Done task' },
          { value: 'undone', label: 'Undone task' },
        ]}
        size="large"
      />
      <Divider type="vertical" />
      <Search
        style={{ maxWidth: '260px' }}
        placeholder="input search text"
        onSearch={(value) => handleSearch(value)}
        onChange={(value) => handleSearch(value.target.value)}
        allowClear
        size="large"
      />
    </>
  )
}
export default TasksListOptions
