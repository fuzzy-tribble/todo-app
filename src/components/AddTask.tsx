import { useState } from 'react'

interface Props {}

const AddTask = ({}: Props ) => {

    const [content, setContent] = useState('')
    const [date, setDate] = useState('')
    const [author, setAuthor] = useState('')

    const handleSumbit = () => {
        console.log('submit clicked')
    }

    return (
        <form onSubmit={handleSumbit}>
        <div>
            <label>Task</label>
            <input
            type='text'
            placeholder='Add Task'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            />
        </div>
        <div>
            <label>Day & Time</label>
            <input
            type='text'
            placeholder='Add Day & Time'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />
        </div>

        <input type='submit' value='Save Task' className='btn btn-block' />
        </form>
    )
}

export default AddTask
