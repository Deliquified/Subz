/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
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
} from "../../../common";

export interface SubscriptionInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "authorizeOperator"
      | "authorizedAmountFor"
      | "balanceOf"
      | "batchCalls"
      | "chargeSubscribers"
      | "createTier"
      | "decimals"
      | "decreaseAllowance"
      | "getData"
      | "getDataBatch"
      | "getOperatorsOf"
      | "getTierDetails"
      | "increaseAllowance"
      | "isSubscribed"
      | "owner"
      | "protocolAddress"
      | "protocolFee"
      | "recipient"
      | "renounceOwnership"
      | "revokeOperator"
      | "setData"
      | "setDataBatch"
      | "stablecoin"
      | "subscribe"
      | "subscribers"
      | "subscriptionName"
      | "supportsInterface"
      | "tiers"
      | "tokenDecimals"
      | "totalSupply"
      | "totalTiers"
      | "transfer"
      | "transferBatch"
      | "transferOwnership"
      | "unsubscribe"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "DataChanged"
      | "OperatorAuthorizationChanged"
      | "OperatorRevoked"
      | "OwnershipTransferred"
      | "PaymentSent"
      | "Subscribed"
      | "SubscriptionTierCreated"
      | "SubscriptionTierDeactivated"
      | "SubscriptionTierUpdated"
      | "Transfer"
      | "Unsubscribed"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "authorizeOperator",
    values: [AddressLike, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "authorizedAmountFor",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "batchCalls",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "chargeSubscribers",
    values: [AddressLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "createTier",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "decreaseAllowance",
    values: [AddressLike, AddressLike, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "getData", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "getDataBatch",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getOperatorsOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getTierDetails",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseAllowance",
    values: [AddressLike, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isSubscribed",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "protocolAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "protocolFee",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "recipient", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "revokeOperator",
    values: [AddressLike, AddressLike, boolean, BytesLike]
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
    functionFragment: "stablecoin",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "subscribe",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "subscribers",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "subscriptionName",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "tiers", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "tokenDecimals",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalTiers",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [AddressLike, AddressLike, BigNumberish, boolean, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferBatch",
    values: [
      AddressLike[],
      AddressLike[],
      BigNumberish[],
      boolean[],
      BytesLike[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "unsubscribe",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "authorizeOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "authorizedAmountFor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "batchCalls", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "chargeSubscribers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createTier", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getData", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getDataBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOperatorsOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTierDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isSubscribed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "protocolAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "protocolFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "recipient", data: BytesLike): Result;
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
  decodeFunctionResult(functionFragment: "stablecoin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "subscribe", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "subscribers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "subscriptionName",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tiers", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokenDecimals",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "totalTiers", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unsubscribe",
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
    amount: BigNumberish,
    operatorNotificationData: BytesLike
  ];
  export type OutputTuple = [
    operator: string,
    tokenOwner: string,
    amount: bigint,
    operatorNotificationData: string
  ];
  export interface OutputObject {
    operator: string;
    tokenOwner: string;
    amount: bigint;
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
    notified: boolean,
    operatorNotificationData: BytesLike
  ];
  export type OutputTuple = [
    operator: string,
    tokenOwner: string,
    notified: boolean,
    operatorNotificationData: string
  ];
  export interface OutputObject {
    operator: string;
    tokenOwner: string;
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

export namespace PaymentSentEvent {
  export type InputTuple = [
    user: AddressLike,
    amount: BigNumberish,
    fee: BigNumberish
  ];
  export type OutputTuple = [user: string, amount: bigint, fee: bigint];
  export interface OutputObject {
    user: string;
    amount: bigint;
    fee: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SubscribedEvent {
  export type InputTuple = [
    user: AddressLike,
    tierId: BigNumberish,
    expiry: BigNumberish
  ];
  export type OutputTuple = [user: string, tierId: bigint, expiry: bigint];
  export interface OutputObject {
    user: string;
    tierId: bigint;
    expiry: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SubscriptionTierCreatedEvent {
  export type InputTuple = [
    tierId: BigNumberish,
    name: string,
    price: BigNumberish
  ];
  export type OutputTuple = [tierId: bigint, name: string, price: bigint];
  export interface OutputObject {
    tierId: bigint;
    name: string;
    price: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SubscriptionTierDeactivatedEvent {
  export type InputTuple = [tierId: BigNumberish];
  export type OutputTuple = [tierId: bigint];
  export interface OutputObject {
    tierId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SubscriptionTierUpdatedEvent {
  export type InputTuple = [
    tierId: BigNumberish,
    name: string,
    price: BigNumberish
  ];
  export type OutputTuple = [tierId: bigint, name: string, price: bigint];
  export interface OutputObject {
    tierId: bigint;
    name: string;
    price: bigint;
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
    amount: BigNumberish,
    force: boolean,
    data: BytesLike
  ];
  export type OutputTuple = [
    operator: string,
    from: string,
    to: string,
    amount: bigint,
    force: boolean,
    data: string
  ];
  export interface OutputObject {
    operator: string;
    from: string;
    to: string;
    amount: bigint;
    force: boolean;
    data: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnsubscribedEvent {
  export type InputTuple = [user: AddressLike];
  export type OutputTuple = [user: string];
  export interface OutputObject {
    user: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Subscription extends BaseContract {
  connect(runner?: ContractRunner | null): Subscription;
  waitForDeployment(): Promise<this>;

  interface: SubscriptionInterface;

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
      amount: BigNumberish,
      operatorNotificationData: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  authorizedAmountFor: TypedContractMethod<
    [operator: AddressLike, tokenOwner: AddressLike],
    [bigint],
    "view"
  >;

  balanceOf: TypedContractMethod<[tokenOwner: AddressLike], [bigint], "view">;

  batchCalls: TypedContractMethod<
    [data: BytesLike[]],
    [string[]],
    "nonpayable"
  >;

  chargeSubscribers: TypedContractMethod<
    [users: AddressLike[]],
    [void],
    "nonpayable"
  >;

  createTier: TypedContractMethod<
    [_name: string, _price: BigNumberish],
    [void],
    "nonpayable"
  >;

  decimals: TypedContractMethod<[], [bigint], "view">;

  decreaseAllowance: TypedContractMethod<
    [
      operator: AddressLike,
      tokenOwner: AddressLike,
      subtractedAmount: BigNumberish,
      operatorNotificationData: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  getData: TypedContractMethod<[dataKey: BytesLike], [string], "view">;

  getDataBatch: TypedContractMethod<
    [dataKeys: BytesLike[]],
    [string[]],
    "view"
  >;

  getOperatorsOf: TypedContractMethod<
    [tokenOwner: AddressLike],
    [string[]],
    "view"
  >;

  getTierDetails: TypedContractMethod<
    [_tierId: BigNumberish],
    [
      [string, bigint, boolean] & {
        name: string;
        price: bigint;
        isActive: boolean;
      }
    ],
    "view"
  >;

  increaseAllowance: TypedContractMethod<
    [
      operator: AddressLike,
      addedAmount: BigNumberish,
      operatorNotificationData: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  isSubscribed: TypedContractMethod<[user: AddressLike], [boolean], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  protocolAddress: TypedContractMethod<[], [string], "view">;

  protocolFee: TypedContractMethod<[], [bigint], "view">;

  recipient: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  revokeOperator: TypedContractMethod<
    [
      operator: AddressLike,
      tokenOwner: AddressLike,
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

  stablecoin: TypedContractMethod<[], [string], "view">;

  subscribe: TypedContractMethod<[_tierId: BigNumberish], [void], "nonpayable">;

  subscribers: TypedContractMethod<
    [arg0: AddressLike],
    [
      [boolean, bigint, bigint] & {
        isActive: boolean;
        expiry: bigint;
        tierId: bigint;
      }
    ],
    "view"
  >;

  subscriptionName: TypedContractMethod<[], [string], "view">;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  tiers: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, boolean] & {
        name: string;
        price: bigint;
        isActive: boolean;
      }
    ],
    "view"
  >;

  tokenDecimals: TypedContractMethod<[], [bigint], "view">;

  totalSupply: TypedContractMethod<[], [bigint], "view">;

  totalTiers: TypedContractMethod<[], [bigint], "view">;

  transfer: TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      amount: BigNumberish,
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
      amount: BigNumberish[],
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

  unsubscribe: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "authorizeOperator"
  ): TypedContractMethod<
    [
      operator: AddressLike,
      amount: BigNumberish,
      operatorNotificationData: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "authorizedAmountFor"
  ): TypedContractMethod<
    [operator: AddressLike, tokenOwner: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "balanceOf"
  ): TypedContractMethod<[tokenOwner: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "batchCalls"
  ): TypedContractMethod<[data: BytesLike[]], [string[]], "nonpayable">;
  getFunction(
    nameOrSignature: "chargeSubscribers"
  ): TypedContractMethod<[users: AddressLike[]], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "createTier"
  ): TypedContractMethod<
    [_name: string, _price: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "decimals"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "decreaseAllowance"
  ): TypedContractMethod<
    [
      operator: AddressLike,
      tokenOwner: AddressLike,
      subtractedAmount: BigNumberish,
      operatorNotificationData: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getData"
  ): TypedContractMethod<[dataKey: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "getDataBatch"
  ): TypedContractMethod<[dataKeys: BytesLike[]], [string[]], "view">;
  getFunction(
    nameOrSignature: "getOperatorsOf"
  ): TypedContractMethod<[tokenOwner: AddressLike], [string[]], "view">;
  getFunction(
    nameOrSignature: "getTierDetails"
  ): TypedContractMethod<
    [_tierId: BigNumberish],
    [
      [string, bigint, boolean] & {
        name: string;
        price: bigint;
        isActive: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "increaseAllowance"
  ): TypedContractMethod<
    [
      operator: AddressLike,
      addedAmount: BigNumberish,
      operatorNotificationData: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "isSubscribed"
  ): TypedContractMethod<[user: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "protocolAddress"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "protocolFee"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "recipient"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "revokeOperator"
  ): TypedContractMethod<
    [
      operator: AddressLike,
      tokenOwner: AddressLike,
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
    nameOrSignature: "stablecoin"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "subscribe"
  ): TypedContractMethod<[_tierId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "subscribers"
  ): TypedContractMethod<
    [arg0: AddressLike],
    [
      [boolean, bigint, bigint] & {
        isActive: boolean;
        expiry: bigint;
        tierId: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "subscriptionName"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "tiers"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, boolean] & {
        name: string;
        price: bigint;
        isActive: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "tokenDecimals"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "totalSupply"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "totalTiers"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transfer"
  ): TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      amount: BigNumberish,
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
      amount: BigNumberish[],
      force: boolean[],
      data: BytesLike[]
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "unsubscribe"
  ): TypedContractMethod<[], [void], "nonpayable">;

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
    key: "PaymentSent"
  ): TypedContractEvent<
    PaymentSentEvent.InputTuple,
    PaymentSentEvent.OutputTuple,
    PaymentSentEvent.OutputObject
  >;
  getEvent(
    key: "Subscribed"
  ): TypedContractEvent<
    SubscribedEvent.InputTuple,
    SubscribedEvent.OutputTuple,
    SubscribedEvent.OutputObject
  >;
  getEvent(
    key: "SubscriptionTierCreated"
  ): TypedContractEvent<
    SubscriptionTierCreatedEvent.InputTuple,
    SubscriptionTierCreatedEvent.OutputTuple,
    SubscriptionTierCreatedEvent.OutputObject
  >;
  getEvent(
    key: "SubscriptionTierDeactivated"
  ): TypedContractEvent<
    SubscriptionTierDeactivatedEvent.InputTuple,
    SubscriptionTierDeactivatedEvent.OutputTuple,
    SubscriptionTierDeactivatedEvent.OutputObject
  >;
  getEvent(
    key: "SubscriptionTierUpdated"
  ): TypedContractEvent<
    SubscriptionTierUpdatedEvent.InputTuple,
    SubscriptionTierUpdatedEvent.OutputTuple,
    SubscriptionTierUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "Transfer"
  ): TypedContractEvent<
    TransferEvent.InputTuple,
    TransferEvent.OutputTuple,
    TransferEvent.OutputObject
  >;
  getEvent(
    key: "Unsubscribed"
  ): TypedContractEvent<
    UnsubscribedEvent.InputTuple,
    UnsubscribedEvent.OutputTuple,
    UnsubscribedEvent.OutputObject
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

    "OperatorAuthorizationChanged(address,address,uint256,bytes)": TypedContractEvent<
      OperatorAuthorizationChangedEvent.InputTuple,
      OperatorAuthorizationChangedEvent.OutputTuple,
      OperatorAuthorizationChangedEvent.OutputObject
    >;
    OperatorAuthorizationChanged: TypedContractEvent<
      OperatorAuthorizationChangedEvent.InputTuple,
      OperatorAuthorizationChangedEvent.OutputTuple,
      OperatorAuthorizationChangedEvent.OutputObject
    >;

    "OperatorRevoked(address,address,bool,bytes)": TypedContractEvent<
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

    "PaymentSent(address,uint256,uint256)": TypedContractEvent<
      PaymentSentEvent.InputTuple,
      PaymentSentEvent.OutputTuple,
      PaymentSentEvent.OutputObject
    >;
    PaymentSent: TypedContractEvent<
      PaymentSentEvent.InputTuple,
      PaymentSentEvent.OutputTuple,
      PaymentSentEvent.OutputObject
    >;

    "Subscribed(address,uint256,uint256)": TypedContractEvent<
      SubscribedEvent.InputTuple,
      SubscribedEvent.OutputTuple,
      SubscribedEvent.OutputObject
    >;
    Subscribed: TypedContractEvent<
      SubscribedEvent.InputTuple,
      SubscribedEvent.OutputTuple,
      SubscribedEvent.OutputObject
    >;

    "SubscriptionTierCreated(uint256,string,uint256)": TypedContractEvent<
      SubscriptionTierCreatedEvent.InputTuple,
      SubscriptionTierCreatedEvent.OutputTuple,
      SubscriptionTierCreatedEvent.OutputObject
    >;
    SubscriptionTierCreated: TypedContractEvent<
      SubscriptionTierCreatedEvent.InputTuple,
      SubscriptionTierCreatedEvent.OutputTuple,
      SubscriptionTierCreatedEvent.OutputObject
    >;

    "SubscriptionTierDeactivated(uint256)": TypedContractEvent<
      SubscriptionTierDeactivatedEvent.InputTuple,
      SubscriptionTierDeactivatedEvent.OutputTuple,
      SubscriptionTierDeactivatedEvent.OutputObject
    >;
    SubscriptionTierDeactivated: TypedContractEvent<
      SubscriptionTierDeactivatedEvent.InputTuple,
      SubscriptionTierDeactivatedEvent.OutputTuple,
      SubscriptionTierDeactivatedEvent.OutputObject
    >;

    "SubscriptionTierUpdated(uint256,string,uint256)": TypedContractEvent<
      SubscriptionTierUpdatedEvent.InputTuple,
      SubscriptionTierUpdatedEvent.OutputTuple,
      SubscriptionTierUpdatedEvent.OutputObject
    >;
    SubscriptionTierUpdated: TypedContractEvent<
      SubscriptionTierUpdatedEvent.InputTuple,
      SubscriptionTierUpdatedEvent.OutputTuple,
      SubscriptionTierUpdatedEvent.OutputObject
    >;

    "Transfer(address,address,address,uint256,bool,bytes)": TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
    Transfer: TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;

    "Unsubscribed(address)": TypedContractEvent<
      UnsubscribedEvent.InputTuple,
      UnsubscribedEvent.OutputTuple,
      UnsubscribedEvent.OutputObject
    >;
    Unsubscribed: TypedContractEvent<
      UnsubscribedEvent.InputTuple,
      UnsubscribedEvent.OutputTuple,
      UnsubscribedEvent.OutputObject
    >;
  };
}
