import './App.css';
import { ethers, utils } from "ethers"
import { useState, useEffect } from 'react';
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts'
import ToDoJson from 'contracts/ToDo.json'
import Tasks from './components/Tasks'
import { rpc } from './config'
import { TaskType } from 'types/custom';
import AddTask from 'components/AddTask';

const addr: string = ToDoJson.networks['5777'].address
const abi = ToDoJson.abi

function App() {
  const [accounts, setAccounts] = useState([''])
  const [tasks, setTasks] = useState<Array<TaskType>>()
  
  const provider: JsonRpcProvider = new ethers.providers.JsonRpcProvider(rpc);
  const signer: JsonRpcSigner = provider.getSigner()
  const contract: Contract = new ethers.Contract(addr, abi, provider)
  const contractWithSigner = contract.connect(signer)
  
  console.log(`Provider: ${JSON.stringify(provider)}`)
  console.log(`Signer: ${JSON.stringify(signer)}`)

  useEffect(() => {
    const getAccounts = async () => {
      const accountsFromBc: string[] = await provider.listAccounts()
      setAccounts(accountsFromBc)
    }

    const getTasks = async () => {
      const tasksFromBc: TaskType[] = await contract.getTasks()
      setTasks(tasksFromBc)
    }

    getAccounts()
    getTasks()
  }, [])

  // TODO - write contract data
  const addTask = async () => {
    const receipt = await contractWithSigner.createTask('wipe my ass', 'sally jones')
    console.log(receipt)
  }

  // TODO - listen for createTask events
  // const TaskCreatedFilter = {
  //   address: addr,
  //   topics: [
  //     utils.id("TaskCreated(Task)")
  //   ]
  // }
  // provider.on(TaskCreatedFilter, (res) => {
  //     console.log("EVENT RESULT: ", res)
  //     // setTasks()
  // })

  // TODO - add wallet connection option?

  return (
    <div className="App">
      <h1>ToDo List App</h1>

      <button>Connect Wallet</button>
      
      <h2>Network info</h2>
      {accounts.map((account, index) => (
        <li key={index}>{account}</li>
      ))}

      {tasks ? (<Tasks tasks={tasks} />) : 'No Tasks to display'}

      <button onClick={addTask}>Test Add Task</button>

      <AddTask />
    </div>
  );
}

export default App;
