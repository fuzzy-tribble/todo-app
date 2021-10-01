// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ToDo {
    struct Task {
        uint256 id;
        uint256 date;
        string content;
        string author;
        bool done;
        uint256 dateComplete;
    }

    uint256 lastTaskId;
    uint256[] taskIds;
    mapping(uint256 => Task) tasks;

    constructor() {
        lastTaskId = 0;
    }

    event TaskCreated(Task);
    event TaskStatusToggled(uint256 id, bool done, uint256 date);

    // Create task (content, author)
    function createTask(string memory _content, string memory _author) public {
        lastTaskId++;
        Task memory newTask = Task(
            lastTaskId,
            block.timestamp,
            _content,
            _author,
            false,
            0
        );
        taskIds.push(lastTaskId);
        tasks[lastTaskId] = newTask;
        emit TaskCreated(newTask);
    }

    // Get task
    function getTask(uint256 _id)
        public
        view
        taskExists(_id)
        returns (Task memory)
    {
        return tasks[_id];
    }

    // // THIS DOESN"T WORK FOR SOME REASON
    // function getTasks() external view returns (Task[] memory) {
    //     Task[] memory _tasks = new Task[](lastTaskId);
    //     for (uint256 i = 1; i <= lastTaskId; i++) {
    //         _tasks[i] = tasks[i];
    //     }
    //     return _tasks;
    // }

    function getTasks()
        external
        view
        returns (
            uint256[] memory,
            uint256[] memory,
            string[] memory,
            string[] memory,
            bool[] memory,
            uint256[] memory
        )
    {
        uint256[] memory ids = new uint256[](lastTaskId);
        uint256[] memory dates = new uint256[](lastTaskId);
        string[] memory contents = new string[](lastTaskId);
        string[] memory authors = new string[](lastTaskId);
        bool[] memory dones = new bool[](lastTaskId);
        uint256[] memory dateCompletes = new uint256[](lastTaskId);
        for (uint256 i = 0; i < lastTaskId; i++) {
            ids[i] = tasks[i].id;
            dates[i] = tasks[i].date;
            contents[i] = tasks[i].content;
            authors[i] = tasks[i].author;
            dones[i] = tasks[i].done;
            dateCompletes[i] = tasks[i].dateComplete;
        }
        return (ids, dates, contents, authors, dones, dateCompletes);
    }

    function getTaskIds() public view returns (uint256[] memory) {
        return taskIds;
    }

    function toggleDone(uint256 _id) external taskExists(_id) {
        Task storage task = tasks[_id];
        task.done = !task.done;
        task.dateComplete = task.done ? block.timestamp : 0;
        emit TaskStatusToggled(_id, task.done, task.dateComplete);
    }

    modifier taskExists(uint256 id) {
        if (tasks[id].id == 0) {
            revert();
        }
        _;
    }
}
