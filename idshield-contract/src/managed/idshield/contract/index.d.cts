import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<T> = {
  secretKey(context: __compactRuntime.WitnessContext<Ledger, T>): [T, Uint8Array];
  getUserBloodType(context: __compactRuntime.WitnessContext<Ledger, T>): [T, number];
}

export type ImpureCircuits<T> = {
  registerVehicle(context: __compactRuntime.CircuitContext<T>,
                  status_0: number,
                  insType_0: number,
                  paidDate_0: bigint): __compactRuntime.CircuitResults<T, []>;
  canDrive(context: __compactRuntime.CircuitContext<T>, currentTime_0: bigint): __compactRuntime.CircuitResults<T, boolean>;
  viewVehicle(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, { insuranceStatus: number,
                                                                                                 insuranceType: number,
                                                                                                 insurancePaidDate: bigint
                                                                                               }>;
  registerClinicalHistory(context: __compactRuntime.CircuitContext<T>,
                          genre_0: number,
                          fullName_0: string,
                          medicalCoverage_0: number,
                          bloodType_0: number): __compactRuntime.CircuitResults<T, []>;
  addConsultation(context: __compactRuntime.CircuitContext<T>,
                  professionalId_0: string,
                  date_0: bigint,
                  result_0: string,
                  specialistType_0: number): __compactRuntime.CircuitResults<T, []>;
  viewClinicalHistory(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, { genre: number,
                                                                                                         fullName: string,
                                                                                                         medicalCoverage: number,
                                                                                                         bloodType: number
                                                                                                       }>;
  canDonate(context: __compactRuntime.CircuitContext<T>, target_0: number): __compactRuntime.CircuitResults<T, boolean>;
  canReceive(context: __compactRuntime.CircuitContext<T>, from_0: number): __compactRuntime.CircuitResults<T, boolean>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  registerVehicle(context: __compactRuntime.CircuitContext<T>,
                  status_0: number,
                  insType_0: number,
                  paidDate_0: bigint): __compactRuntime.CircuitResults<T, []>;
  canDrive(context: __compactRuntime.CircuitContext<T>, currentTime_0: bigint): __compactRuntime.CircuitResults<T, boolean>;
  viewVehicle(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, { insuranceStatus: number,
                                                                                                 insuranceType: number,
                                                                                                 insurancePaidDate: bigint
                                                                                               }>;
  registerClinicalHistory(context: __compactRuntime.CircuitContext<T>,
                          genre_0: number,
                          fullName_0: string,
                          medicalCoverage_0: number,
                          bloodType_0: number): __compactRuntime.CircuitResults<T, []>;
  addConsultation(context: __compactRuntime.CircuitContext<T>,
                  professionalId_0: string,
                  date_0: bigint,
                  result_0: string,
                  specialistType_0: number): __compactRuntime.CircuitResults<T, []>;
  viewClinicalHistory(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, { genre: number,
                                                                                                         fullName: string,
                                                                                                         medicalCoverage: number,
                                                                                                         bloodType: number
                                                                                                       }>;
  canDonate(context: __compactRuntime.CircuitContext<T>, target_0: number): __compactRuntime.CircuitResults<T, boolean>;
  canReceive(context: __compactRuntime.CircuitContext<T>, from_0: number): __compactRuntime.CircuitResults<T, boolean>;
}

export type Ledger = {
  vehicleRegistry: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): { insuranceStatus: number,
                                 insuranceType: number,
                                 insurancePaidDate: bigint
                               };
    [Symbol.iterator](): Iterator<[Uint8Array, { insuranceStatus: number, insuranceType: number, insurancePaidDate: bigint }]>
  };
  clinicalRegistry: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): { genre: number,
                                 fullName: string,
                                 medicalCoverage: number,
                                 bloodType: number
                               };
    [Symbol.iterator](): Iterator<[Uint8Array, { genre: number, fullName: string, medicalCoverage: number, bloodType: number }]>
  };
  consultations: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): {
      isEmpty(): boolean;
      length(): bigint;
      head(): { is_some: boolean,
                value: { professionalId: string,
                         date: bigint,
                         result: string,
                         specialistType: number
                       }
              };
      [Symbol.iterator](): Iterator<{ professionalId: string, date: bigint, result: string, specialistType: number }>
    }
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
