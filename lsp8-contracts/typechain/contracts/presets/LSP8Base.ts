/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface LSP8BaseInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "authorizeOperator"
      | "balanceOf"
      | "batchCalls"
      | "getData"
      | "getDataBatch"
      | "getDataBatchForTokenIds"
      | "getDataForTokenId"
      | "getOperatorsOf"
      | "isOperatorFor"
      | "owner"
      | "renounceOwnership"
      | "revokeOperator"
      | "setData"
      | "setDataBatch"
      | "setDataBatchForTokenIds"
      | "setDataForTokenId"
      | "supportsInterface"
      | "tokenIdsOf"
      | "tokenOwnerOf"
      | "totalSupply"
      | "transfer"
      | "transferBatch"
      | "transferOwnership"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "DataChanged"
      | "OperatorAuthorizationChanged"
      | "OperatorRevoked"
      | "OwnershipTransferred"
      | "TokenIdDataChanged"
      | "Transfer"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "authorizeOperator",
    values: [AddressLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "batchCalls",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(functionFragment: "getData", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "getDataBatch",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getDataBatchForTokenIds",
    values: [BytesLike[], BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getDataForTokenId",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getOperatorsOf",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isOperatorFor",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "revokeOperator",
    values: [AddressLike, BytesLike, boolean, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setData",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setDataBatch",
    values: [BytesLike[], BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setDataBatchForTokenIds",
    values: [BytesLike[], BytesLike[], BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setDataForTokenId",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenIdsOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenOwnerOf",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [AddressLike, AddressLike, BytesLike, boolean, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferBatch",
    values: [AddressLike[], AddressLike[], BytesLike[], boolean[], BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "authorizeOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "batchCalls", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getData", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getDataBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDataBatchForTokenIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDataForTokenId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOperatorsOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isOperatorFor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokeOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setData", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setDataBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDataBatchForTokenIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDataForTokenId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenIdsOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokenOwnerOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
}

export namespace DataChangedEvent {
  export type InputTuple = [dataKey: BytesLike, dataValue: BytesLike];
  export type OutputTuple = [dataKey: string, dataValue: string];
  export interface OutputObject {
    dataKey: string;
    dataValue: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OperatorAuthorizationChangedEvent {
  export type InputTuple = [
    operator: AddressLike,
    tokenOwner: AddressLike,
    tokenId: BytesLike,
    operatorNotificationData: BytesLike
  ];
  export type OutputTuple = [
    operator: string,
    tokenOwner: string,
    tokenId: string,
    operatorNotificationData: string
  ];
  export interface OutputObject {
    operator: string;
    tokenOwner: string;
    tokenId: string;
    operatorNotificationData: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OperatorRevokedEvent {
  export type InputTuple = [
    operator: AddressLike,
    tokenOwner: AddressLike,
    tokenId: BytesLike,
    notified: boolean,
    operatorNotificationData: BytesLike
  ];
  export type OutputTuple = [
    operator: string,
    tokenOwner: string,
    tokenId: string,
    notified: boolean,
    operatorNotificationData: string
  ];
  export interface OutputObject {
    operator: string;
    tokenOwner: string;
    tokenId: string;
    notified: boolean;
    operatorNotificationData: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TokenIdDataChangedEvent {
  export type InputTuple = [
    tokenId: BytesLike,
    dataKey: BytesLike,
    dataValue: BytesLike
  ];
  export type OutputTuple = [
    tokenId: string,
    dataKey: string,
    dataValue: string
  ];
  export interface OutputObject {
    tokenId: string;
    dataKey: string;
    dataValue: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferEvent {
  export type InputTuple = [
    operator: AddressLike,
    from: AddressLike,
    to: AddressLike,
    tokenId: BytesLike,
    force: boolean,
    data: BytesLike
  ];
  export type OutputTuple = [
    operator: string,
    from: string,
    to: string,
    tokenId: string,
    force: boolean,
    data: string
  ];
  export interface OutputObject {
    operator: string;
    from: string;
    to: string;
    tokenId: string;
    force: boolean;
    data: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface LSP8Base extends BaseContract {
  connect(runner?: ContractRunner | null): LSP8Base;
  waitForDeployment(): Promise<this>;

  interface: LSP8BaseInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  authorizeOperator: TypedContractMethod<
    [
      operator: AddressLike,
      tokenId: BytesLike,
      operatorNotificationData: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  balanceOf: TypedContractMethod<[tokenOwner: AddressLike], [bigint], "view">;

  batchCalls: TypedContractMethod<
    [data: BytesLike[]],
    [string[]],
    "nonpayable"
  >;

  getData: TypedContractMethod<[dataKey: BytesLike], [string], "view">;

  getDataBatch: TypedContractMethod<
    [dataKeys: BytesLike[]],
    [string[]],
    "view"
  >;

  getDataBatchForTokenIds: TypedContractMethod<
    [tokenIds: BytesLike[], dataKeys: BytesLike[]],
    [string[]],
    "view"
  >;

  getDataForTokenId: TypedContractMethod<
    [tokenId: BytesLike, dataKey: BytesLike],
    [string],
    "view"
  >;

  getOperatorsOf: TypedContractMethod<[tokenId: BytesLike], [string[]], "view">;

  isOperatorFor: TypedContractMethod<
    [operator: AddressLike, tokenId: BytesLike],
    [boolean],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  revokeOperator: TypedContractMethod<
    [
      operator: AddressLike,
      tokenId: BytesLike,
      notify: boolean,
      operatorNotificationData: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  setData: TypedContractMethod<
    [dataKey: BytesLike, dataValue: BytesLike],
    [void],
    "payable"
  >;

  setDataBatch: TypedContractMethod<
    [dataKeys: BytesLike[], dataValues: BytesLike[]],
    [void],
    "payable"
  >;

  setDataBatchForTokenIds: TypedContractMethod<
    [tokenIds: BytesLike[], dataKeys: BytesLike[], dataValues: BytesLike[]],
    [void],
    "nonpayable"
  >;

  setDataForTokenId: TypedContractMethod<
    [tokenId: BytesLike, dataKey: BytesLike, dataValue: BytesLike],
    [void],
    "nonpayable"
  >;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  tokenIdsOf: TypedContractMethod<
    [tokenOwner: AddressLike],
    [string[]],
    "view"
  >;

  tokenOwnerOf: TypedContractMethod<[tokenId: BytesLike], [string], "view">;

  totalSupply: TypedContractMethod<[], [bigint], "view">;

  transfer: TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      tokenId: BytesLike,
      force: boolean,
      data: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  transferBatch: TypedContractMethod<
    [
      from: AddressLike[],
      to: AddressLike[],
      tokenId: BytesLike[],
      force: boolean[],
      data: BytesLike[]
    ],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "authorizeOperator"
  ): TypedContractMethod<
    [
      operator: AddressLike,
      tokenId: BytesLike,
      operatorNotificationData: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "balanceOf"
  ): TypedContractMethod<[tokenOwner: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "batchCalls"
  ): TypedContractMethod<[data: BytesLike[]], [string[]], "nonpayable">;
  getFunction(
    nameOrSignature: "getData"
  ): TypedContractMethod<[dataKey: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "getDataBatch"
  ): TypedContractMethod<[dataKeys: BytesLike[]], [string[]], "view">;
  getFunction(
    nameOrSignature: "getDataBatchForTokenIds"
  ): TypedContractMethod<
    [tokenIds: BytesLike[], dataKeys: BytesLike[]],
    [string[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getDataForTokenId"
  ): TypedContractMethod<
    [tokenId: BytesLike, dataKey: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "getOperatorsOf"
  ): TypedContractMethod<[tokenId: BytesLike], [string[]], "view">;
  getFunction(
    nameOrSignature: "isOperatorFor"
  ): TypedContractMethod<
    [operator: AddressLike, tokenId: BytesLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "revokeOperator"
  ): TypedContractMethod<
    [
      operator: AddressLike,
      tokenId: BytesLike,
      notify: boolean,
      operatorNotificationData: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setData"
  ): TypedContractMethod<
    [dataKey: BytesLike, dataValue: BytesLike],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "setDataBatch"
  ): TypedContractMethod<
    [dataKeys: BytesLike[], dataValues: BytesLike[]],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "setDataBatchForTokenIds"
  ): TypedContractMethod<
    [tokenIds: BytesLike[], dataKeys: BytesLike[], dataValues: BytesLike[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setDataForTokenId"
  ): TypedContractMethod<
    [tokenId: BytesLike, dataKey: BytesLike, dataValue: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "tokenIdsOf"
  ): TypedContractMethod<[tokenOwner: AddressLike], [string[]], "view">;
  getFunction(
    nameOrSignature: "tokenOwnerOf"
  ): TypedContractMethod<[tokenId: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "totalSupply"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transfer"
  ): TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      tokenId: BytesLike,
      force: boolean,
      data: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferBatch"
  ): TypedContractMethod<
    [
      from: AddressLike[],
      to: AddressLike[],
      tokenId: BytesLike[],
      force: boolean[],
      data: BytesLike[]
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "DataChanged"
  ): TypedContractEvent<
    DataChangedEvent.InputTuple,
    DataChangedEvent.OutputTuple,
    DataChangedEvent.OutputObject
  >;
  getEvent(
    key: "OperatorAuthorizationChanged"
  ): TypedContractEvent<
    OperatorAuthorizationChangedEvent.InputTuple,
    OperatorAuthorizationChangedEvent.OutputTuple,
    OperatorAuthorizationChangedEvent.OutputObject
  >;
  getEvent(
    key: "OperatorRevoked"
  ): TypedContractEvent<
    OperatorRevokedEvent.InputTuple,
    OperatorRevokedEvent.OutputTuple,
    OperatorRevokedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "TokenIdDataChanged"
  ): TypedContractEvent<
    TokenIdDataChangedEvent.InputTuple,
    TokenIdDataChangedEvent.OutputTuple,
    TokenIdDataChangedEvent.OutputObject
  >;
  getEvent(
    key: "Transfer"
  ): TypedContractEvent<
    TransferEvent.InputTuple,
    TransferEvent.OutputTuple,
    TransferEvent.OutputObject
  >;

  filters: {
    "DataChanged(bytes32,bytes)": TypedContractEvent<
      DataChangedEvent.InputTuple,
      DataChangedEvent.OutputTuple,
      DataChangedEvent.OutputObject
    >;
    DataChanged: TypedContractEvent<
      DataChangedEvent.InputTuple,
      DataChangedEvent.OutputTuple,
      DataChangedEvent.OutputObject
    >;

    "OperatorAuthorizationChanged(address,address,bytes32,bytes)": TypedContractEvent<
      OperatorAuthorizationChangedEvent.InputTuple,
      OperatorAuthorizationChangedEvent.OutputTuple,
      OperatorAuthorizationChangedEvent.OutputObject
    >;
    OperatorAuthorizationChanged: TypedContractEvent<
      OperatorAuthorizationChangedEvent.InputTuple,
      OperatorAuthorizationChangedEvent.OutputTuple,
      OperatorAuthorizationChangedEvent.OutputObject
    >;

    "OperatorRevoked(address,address,bytes32,bool,bytes)": TypedContractEvent<
      OperatorRevokedEvent.InputTuple,
      OperatorRevokedEvent.OutputTuple,
      OperatorRevokedEvent.OutputObject
    >;
    OperatorRevoked: TypedContractEvent<
      OperatorRevokedEvent.InputTuple,
      OperatorRevokedEvent.OutputTuple,
      OperatorRevokedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "TokenIdDataChanged(bytes32,bytes32,bytes)": TypedContractEvent<
      TokenIdDataChangedEvent.InputTuple,
      TokenIdDataChangedEvent.OutputTuple,
      TokenIdDataChangedEvent.OutputObject
    >;
    TokenIdDataChanged: TypedContractEvent<
      TokenIdDataChangedEvent.InputTuple,
      TokenIdDataChangedEvent.OutputTuple,
      TokenIdDataChangedEvent.OutputObject
    >;

    "Transfer(address,address,address,bytes32,bool,bytes)": TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
    Transfer: TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
  };
}
