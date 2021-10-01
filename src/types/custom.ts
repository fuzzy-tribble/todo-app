import { BigNumber } from "@ethersproject/bignumber";

export type TaskType = {
    id: BigNumber,
    content: string,
    author: string,
    done: boolean,
    dateComplete: BigNumber,
    date: BigNumber
}