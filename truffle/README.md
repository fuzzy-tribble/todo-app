# ToDo List Tutorial Notes

## Truffle Commands

Start `truffle develop`, migrate, then create contract instance

```
truffle migrate
ToDo.deployed().then((i) => inst = i);
inst
```

Test a few functions like `createTask` and `getTasks`

```
inst.createTask("mytask", "jane doe")
inst.getTask(1)
```

```
inst.getTasks()
```

---

## Tech Stack Notes

### Truffle vs Hardhat

TODO - write me

#### `web3` vs `web3-react`

### `ethers.js` vs `web3.js`

`ethers.js` is smaller and well tested, maintained, documented, etc. ... Use `Waffle.js` (a framework for creating smart contracts with ethers.js)

Src: https://medium.com/l4-media/announcing-ethers-js-a-web3-alternative-6f134fdd06f3
