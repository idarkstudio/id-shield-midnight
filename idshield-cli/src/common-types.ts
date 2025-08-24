import { IdShield, type IdShieldPrivateState } from '@meshsdk/idshield-contract';
import type { ImpureCircuitId, MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { DeployedContract, FoundContract } from '@midnight-ntwrk/midnight-js-contracts';

export type IdShieldCircuits = ImpureCircuitId<IdShield.Contract<IdShieldPrivateState>>;

export const IdShieldPrivateStateId = 'idShieldPrivateState';

export type IdShieldProviders = MidnightProviders<
  IdShieldCircuits,
  typeof IdShieldPrivateStateId,
  IdShieldPrivateState
>;

export type IdShieldContract = IdShield.Contract<IdShieldPrivateState>;

export type DeployedIdShieldContract = DeployedContract<IdShieldContract> | FoundContract<IdShieldContract>;

export type UserAction = {
  increment: string | undefined;
};

// export type DerivedState = {
//   readonly round: IdShield.Ledger;
// };

// export const emptyState: DerivedState = {
//   round: 0n,
// };
