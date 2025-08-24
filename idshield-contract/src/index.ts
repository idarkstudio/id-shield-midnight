import type {
  Contract as ContractType,
  Witnesses
} from "./managed/idshield/contract/index.cjs";

import ContractModule from "./managed/idshield/contract/index.cjs";

export * as IdShield from "./managed/idshield/contract/index.cjs";
export * from "./witnesses";

export const ledger = ContractModule.ledger;
export const pureCircuits = ContractModule.pureCircuits;

export type Contract<T, W extends Witnesses<T> = Witnesses<T>> = ContractType<
  T,
  W
>;
export type Ledger = ContractModule.Ledger;
