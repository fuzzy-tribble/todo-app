import { TaskType } from 'types/custom'

interface Props {
  task: TaskType
}

const Task = ({ task }: Props) => {

    return (
        <div>
        <h3>
          {task.content}{''}
        </h3>
        <p>{task.author}</p>
      </div>
    )
}

export default Task