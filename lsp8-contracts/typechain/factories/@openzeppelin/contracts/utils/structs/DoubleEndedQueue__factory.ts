/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type {
  DoubleEndedQueue,
  DoubleEndedQueueInterface,
} from "../../../../../@openzeppelin/contracts/utils/structs/DoubleEndedQueue";

const _abi = [
  {
    inputs: [],
    name: "Empty",
    type: "error",
  },
  {
    inputs: [],
    name: "OutOfBounds",
    type: "error",
  },
] as const;

const _bytecode =
  "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220d4947d07ff27bb9983f5e53956ad04c88843adbbed76b279a816a4ac1b4b059364736f6c63430008110033";

type DoubleEndedQueueConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DoubleEndedQueueConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DoubleEndedQueue__factory extends ContractFactory {
  constructor(...args: DoubleEndedQueueConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      DoubleEndedQueue & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): DoubleEndedQueue__factory {
    return super.connect(runner) as DoubleEndedQueue__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DoubleEndedQueueInterface {
    return new Interface(_abi) as DoubleEndedQueueInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): DoubleEndedQueue {
    return new Contract(address, _abi, runner) as unknown as DoubleEndedQueue;
  }
}
