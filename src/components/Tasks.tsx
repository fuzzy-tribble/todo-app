import React from 'react'
import Task from './Task'
import { TaskType } from 'types/custom'

interface Props {
    tasks: TaskType[]
}

const Tasks = ({ tasks }: Props) => {
    return (
        <div>
            <h2>ToDo Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id.toNumber()}><Task task={task} /></li>
                ))}
            </ul>  
        </div>
    )
}

export default Tasks
