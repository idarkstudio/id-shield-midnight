'use strict';
const __compactRuntime = require('@midnight-ntwrk/compact-runtime');
const expectedRuntimeVersionString = '0.8.1';
const expectedRuntimeVersion = expectedRuntimeVersionString.split('-')[0].split('.').map(Number);
const actualRuntimeVersion = __compactRuntime.versionString.split('-')[0].split('.').map(Number);
if (expectedRuntimeVersion[0] != actualRuntimeVersion[0]
     || (actualRuntimeVersion[0] == 0 && expectedRuntimeVersion[1] != actualRuntimeVersion[1])
     || expectedRuntimeVersion[1] > actualRuntimeVersion[1]
     || (expectedRuntimeVersion[1] == actualRuntimeVersion[1] && expectedRuntimeVersion[2] > actualRuntimeVersion[2]))
   throw new __compactRuntime.CompactError(`Version mismatch: compiled code expects ${expectedRuntimeVersionString}, runtime is ${__compactRuntime.versionString}`);
{ const MAX_FIELD = 52435875175126190479447740508185965837690552500527637822603658699938581184512n;
  if (__compactRuntime.MAX_FIELD !== MAX_FIELD)
     throw new __compactRuntime.CompactError(`compiler thinks maximum field value is ${MAX_FIELD}; run time thinks it is ${__compactRuntime.MAX_FIELD}`)
}

const _descriptor_0 = new __compactRuntime.CompactTypeEnum(7, 1);

const _descriptor_1 = new __compactRuntime.CompactTypeBoolean();

const _descriptor_2 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_3 = new __compactRuntime.CompactTypeOpaqueString();

const _descriptor_4 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_5 = new __compactRuntime.CompactTypeEnum(3, 1);

class _Consultation_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_4.alignment().concat(_descriptor_3.alignment().concat(_descriptor_5.alignment())));
  }
  fromValue(value_0) {
    return {
      professionalId: _descriptor_3.fromValue(value_0),
      date: _descriptor_4.fromValue(value_0),
      result: _descriptor_3.fromValue(value_0),
      specialistType: _descriptor_5.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.professionalId).concat(_descriptor_4.toValue(value_0.date).concat(_descriptor_3.toValue(value_0.result).concat(_descriptor_5.toValue(value_0.specialistType))));
  }
}

const _descriptor_6 = new _Consultation_0();

const _descriptor_7 = new __compactRuntime.CompactTypeEnum(2, 1);

const _descriptor_8 = new __compactRuntime.CompactTypeEnum(2, 1);

class _ClinicalRecord_0 {
  alignment() {
    return _descriptor_7.alignment().concat(_descriptor_3.alignment().concat(_descriptor_8.alignment().concat(_descriptor_0.alignment())));
  }
  fromValue(value_0) {
    return {
      genre: _descriptor_7.fromValue(value_0),
      fullName: _descriptor_3.fromValue(value_0),
      medicalCoverage: _descriptor_8.fromValue(value_0),
      bloodType: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_7.toValue(value_0.genre).concat(_descriptor_3.toValue(value_0.fullName).concat(_descriptor_8.toValue(value_0.medicalCoverage).concat(_descriptor_0.toValue(value_0.bloodType))));
  }
}

const _descriptor_9 = new _ClinicalRecord_0();

const _descriptor_10 = new __compactRuntime.CompactTypeEnum(1, 1);

const _descriptor_11 = new __compactRuntime.CompactTypeEnum(2, 1);

class _VehicleRecord_0 {
  alignment() {
    return _descriptor_10.alignment().concat(_descriptor_11.alignment().concat(_descriptor_4.alignment()));
  }
  fromValue(value_0) {
    return {
      insuranceStatus: _descriptor_10.fromValue(value_0),
      insuranceType: _descriptor_11.fromValue(value_0),
      insurancePaidDate: _descriptor_4.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_10.toValue(value_0.insuranceStatus).concat(_descriptor_11.toValue(value_0.insuranceType).concat(_descriptor_4.toValue(value_0.insurancePaidDate)));
  }
}

const _descriptor_12 = new _VehicleRecord_0();

const _descriptor_13 = new __compactRuntime.CompactTypeVector(2, _descriptor_2);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_2.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.bytes);
  }
}

const _descriptor_14 = new _ContractAddress_0();

class _Maybe_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_6.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_1.fromValue(value_0),
      value: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.is_some).concat(_descriptor_6.toValue(value_0.value));
  }
}

const _descriptor_15 = new _Maybe_0();

const _descriptor_16 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

const _descriptor_17 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.secretKey) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named secretKey');
    }
    if (typeof(witnesses_0.getUserBloodType) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named getUserBloodType');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      registerVehicle: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`registerVehicle: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const status_0 = args_1[1];
        const insType_0 = args_1[2];
        const paidDate_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('registerVehicle',
                                      'argument 1 (as invoked from Typescript)',
                                      'idshield.compact line 52 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(status_0) === 'number' && status_0 >= 0 && status_0 <= 1)) {
          __compactRuntime.type_error('registerVehicle',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'idshield.compact line 52 char 1',
                                      'Enum<InsuranceStatus, Unpaid, Paid>',
                                      status_0)
        }
        if (!(typeof(insType_0) === 'number' && insType_0 >= 0 && insType_0 <= 2)) {
          __compactRuntime.type_error('registerVehicle',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'idshield.compact line 52 char 1',
                                      'Enum<InsuranceType, FullCoverage, ThirdParty, CivilLiability>',
                                      insType_0)
        }
        if (!(typeof(paidDate_0) === 'bigint' && paidDate_0 >= 0n && paidDate_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('registerVehicle',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'idshield.compact line 52 char 1',
                                      'Uint<0..18446744073709551615>',
                                      paidDate_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_10.toValue(status_0).concat(_descriptor_11.toValue(insType_0).concat(_descriptor_4.toValue(paidDate_0))),
            alignment: _descriptor_10.alignment().concat(_descriptor_11.alignment().concat(_descriptor_4.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._registerVehicle_0(context,
                                                 partialProofData,
                                                 status_0,
                                                 insType_0,
                                                 paidDate_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      canDrive: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`canDrive: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const currentTime_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('canDrive',
                                      'argument 1 (as invoked from Typescript)',
                                      'idshield.compact line 65 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(currentTime_0) === 'bigint' && currentTime_0 >= 0n && currentTime_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('canDrive',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'idshield.compact line 65 char 1',
                                      'Uint<0..18446744073709551615>',
                                      currentTime_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_4.toValue(currentTime_0),
            alignment: _descriptor_4.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._canDrive_0(context,
                                          partialProofData,
                                          currentTime_0);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      viewVehicle: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`viewVehicle: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('viewVehicle',
                                      'argument 1 (as invoked from Typescript)',
                                      'idshield.compact line 74 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._viewVehicle_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_12.toValue(result_0), alignment: _descriptor_12.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      registerClinicalHistory: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime.CompactError(`registerClinicalHistory: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const genre_0 = args_1[1];
        const fullName_0 = args_1[2];
        const medicalCoverage_0 = args_1[3];
        const bloodType_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('registerClinicalHistory',
                                      'argument 1 (as invoked from Typescript)',
                                      'idshield.compact line 81 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(genre_0) === 'number' && genre_0 >= 0 && genre_0 <= 2)) {
          __compactRuntime.type_error('registerClinicalHistory',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'idshield.compact line 81 char 1',
                                      'Enum<Genre, Male, Female, Other>',
                                      genre_0)
        }
        if (!(typeof(medicalCoverage_0) === 'number' && medicalCoverage_0 >= 0 && medicalCoverage_0 <= 2)) {
          __compactRuntime.type_error('registerClinicalHistory',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'idshield.compact line 81 char 1',
                                      'Enum<MedicalCoverage, SocialSecurity, Private, None>',
                                      medicalCoverage_0)
        }
        if (!(typeof(bloodType_0) === 'number' && bloodType_0 >= 0 && bloodType_0 <= 7)) {
          __compactRuntime.type_error('registerClinicalHistory',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'idshield.compact line 81 char 1',
                                      'Enum<BloodType, A_Pos, A_Neg, B_Pos, B_Neg, AB_Pos, AB_Neg, O_Pos, O_Neg>',
                                      bloodType_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_7.toValue(genre_0).concat(_descriptor_3.toValue(fullName_0).concat(_descriptor_8.toValue(medicalCoverage_0).concat(_descriptor_0.toValue(bloodType_0)))),
            alignment: _descriptor_7.alignment().concat(_descriptor_3.alignment().concat(_descriptor_8.alignment().concat(_descriptor_0.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._registerClinicalHistory_0(context,
                                                         partialProofData,
                                                         genre_0,
                                                         fullName_0,
                                                         medicalCoverage_0,
                                                         bloodType_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      addConsultation: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime.CompactError(`addConsultation: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const professionalId_0 = args_1[1];
        const date_0 = args_1[2];
        const result_1 = args_1[3];
        const specialistType_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('addConsultation',
                                      'argument 1 (as invoked from Typescript)',
                                      'idshield.compact line 96 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(date_0) === 'bigint' && date_0 >= 0n && date_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('addConsultation',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'idshield.compact line 96 char 1',
                                      'Uint<0..18446744073709551615>',
                                      date_0)
        }
        if (!(typeof(specialistType_0) === 'number' && specialistType_0 >= 0 && specialistType_0 <= 3)) {
          __compactRuntime.type_error('addConsultation',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'idshield.compact line 96 char 1',
                                      'Enum<SpecialistType, General, Cardiologist, Dermatologist, Other>',
                                      specialistType_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(professionalId_0).concat(_descriptor_4.toValue(date_0).concat(_descriptor_3.toValue(result_1).concat(_descriptor_5.toValue(specialistType_0)))),
            alignment: _descriptor_3.alignment().concat(_descriptor_4.alignment().concat(_descriptor_3.alignment().concat(_descriptor_5.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._addConsultation_0(context,
                                                 partialProofData,
                                                 professionalId_0,
                                                 date_0,
                                                 result_1,
                                                 specialistType_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      viewClinicalHistory: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`viewClinicalHistory: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('viewClinicalHistory',
                                      'argument 1 (as invoked from Typescript)',
                                      'idshield.compact line 112 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._viewClinicalHistory_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_9.toValue(result_0), alignment: _descriptor_9.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      canDonate: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`canDonate: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const target_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('canDonate',
                                      'argument 1 (as invoked from Typescript)',
                                      'idshield.compact line 117 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(target_0) === 'number' && target_0 >= 0 && target_0 <= 7)) {
          __compactRuntime.type_error('canDonate',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'idshield.compact line 117 char 1',
                                      'Enum<BloodType, A_Pos, A_Neg, B_Pos, B_Neg, AB_Pos, AB_Neg, O_Pos, O_Neg>',
                                      target_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(target_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._canDonate_0(context, partialProofData, target_0);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      canReceive: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`canReceive: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const from_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('canReceive',
                                      'argument 1 (as invoked from Typescript)',
                                      'idshield.compact line 122 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(from_0) === 'number' && from_0 >= 0 && from_0 <= 7)) {
          __compactRuntime.type_error('canReceive',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'idshield.compact line 122 char 1',
                                      'Enum<BloodType, A_Pos, A_Neg, B_Pos, B_Neg, AB_Pos, AB_Neg, O_Pos, O_Neg>',
                                      from_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(from_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._canReceive_0(context, partialProofData, from_0);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      }
    };
    this.impureCircuits = {
      registerVehicle: this.circuits.registerVehicle,
      canDrive: this.circuits.canDrive,
      viewVehicle: this.circuits.viewVehicle,
      registerClinicalHistory: this.circuits.registerClinicalHistory,
      addConsultation: this.circuits.addConsultation,
      viewClinicalHistory: this.circuits.viewClinicalHistory,
      canDonate: this.circuits.canDonate,
      canReceive: this.circuits.canReceive
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = stateValue_0;
    state_0.setOperation('registerVehicle', new __compactRuntime.ContractOperation());
    state_0.setOperation('canDrive', new __compactRuntime.ContractOperation());
    state_0.setOperation('viewVehicle', new __compactRuntime.ContractOperation());
    state_0.setOperation('registerClinicalHistory', new __compactRuntime.ContractOperation());
    state_0.setOperation('addConsultation', new __compactRuntime.ContractOperation());
    state_0.setOperation('viewClinicalHistory', new __compactRuntime.ContractOperation());
    state_0.setOperation('canDonate', new __compactRuntime.ContractOperation());
    state_0.setOperation('canReceive', new __compactRuntime.ContractOperation());
    const context = {
      originalState: state_0,
      currentPrivateState: constructorContext_0.initialPrivateState,
      currentZswapLocalState: constructorContext_0.initialZswapLocalState,
      transactionContext: new __compactRuntime.QueryContext(state_0.data, __compactRuntime.dummyContractAddress())
    };
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(0n),
                                                                            alignment: _descriptor_16.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(1n),
                                                                            alignment: _descriptor_16.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(2n),
                                                                            alignment: _descriptor_16.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    state_0.data = context.transactionContext.state;
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_13, value_0);
    return result_0;
  }
  _secretKey_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.secretKey(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.type_error('secretKey',
                                  'return value',
                                  'idshield.compact line 41 char 1',
                                  'Bytes<32>',
                                  result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_2.toValue(result_0),
      alignment: _descriptor_2.alignment()
    });
    return result_0;
  }
  _getUserBloodType_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.getUserBloodType(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'number' && result_0 >= 0 && result_0 <= 7)) {
      __compactRuntime.type_error('getUserBloodType',
                                  'return value',
                                  'idshield.compact line 43 char 1',
                                  'Enum<BloodType, A_Pos, A_Neg, B_Pos, B_Neg, AB_Pos, AB_Neg, O_Pos, O_Neg>',
                                  result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _publicKey_0(sk_0) {
    return this._persistentHash_0([new Uint8Array([112, 101, 114, 115, 111, 110, 45, 100, 111, 109, 97, 105, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   sk_0]);
  }
  _registerVehicle_0(context, partialProofData, status_0, insType_0, paidDate_0)
  {
    const pk_0 = this._publicKey_0(this._secretKey_0(context, partialProofData));
    const tmp_0 = { insuranceStatus: status_0,
                    insuranceType: insType_0,
                    insurancePaidDate: paidDate_0 };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_16.toValue(0n),
                                                alignment: _descriptor_16.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(pk_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(tmp_0),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _canDrive_0(context, partialProofData, currentTime_0) {
    const pk_0 = this._publicKey_0(this._secretKey_0(context, partialProofData));
    const record_0 = _descriptor_12.fromValue(Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { dup: { n: 0 } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_16.toValue(0n),
                                                                                          alignment: _descriptor_16.alignment() } }] } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_2.toValue(pk_0),
                                                                                          alignment: _descriptor_2.alignment() } }] } },
                                                               { popeq: { cached: false,
                                                                          result: undefined } }]).value);
    __compactRuntime.assert(record_0.insuranceStatus === 1, 'Insurance not paid');
    return true;
  }
  _viewVehicle_0(context, partialProofData) {
    const pk_0 = this._publicKey_0(this._secretKey_0(context, partialProofData));
    return _descriptor_12.fromValue(Contract._query(context,
                                                    partialProofData,
                                                    [
                                                     { dup: { n: 0 } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_16.toValue(0n),
                                                                                alignment: _descriptor_16.alignment() } }] } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_2.toValue(pk_0),
                                                                                alignment: _descriptor_2.alignment() } }] } },
                                                     { popeq: { cached: false,
                                                                result: undefined } }]).value);
  }
  _registerClinicalHistory_0(context,
                             partialProofData,
                             genre_0,
                             fullName_0,
                             medicalCoverage_0,
                             bloodType_0)
  {
    const pk_0 = this._publicKey_0(this._secretKey_0(context, partialProofData));
    const tmp_0 = { genre: genre_0,
                    fullName: fullName_0,
                    medicalCoverage: medicalCoverage_0,
                    bloodType: bloodType_0 };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_16.toValue(1n),
                                                alignment: _descriptor_16.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(pk_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(tmp_0),
                                                                            alignment: _descriptor_9.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _addConsultation_0(context,
                     partialProofData,
                     professionalId_0,
                     date_0,
                     result_0,
                     specialistType_0)
  {
    const pk_0 = this._publicKey_0(this._secretKey_0(context, partialProofData));
    const tmp_0 = { professionalId: professionalId_0,
                    date: date_0,
                    result: result_0,
                    specialistType: specialistType_0 };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_16.toValue(2n),
                                                alignment: _descriptor_16.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_2.toValue(pk_0),
                                                alignment: _descriptor_2.alignment() } }] } },
                     { dup: { n: 0 } },
                     { idx: { cached: false,
                              pushPath: false,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_16.toValue(2n),
                                                alignment: _descriptor_16.alignment() } }] } },
                     { addi: { immediate: 1 } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newArray()
                                        .arrayPush(__compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_0),
                                                                                         alignment: _descriptor_6.alignment() })).arrayPush(__compactRuntime.StateValue.newNull()).arrayPush(__compactRuntime.StateValue.newNull())
                                        .encode() } },
                     { swap: { n: 0 } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(2n),
                                                                            alignment: _descriptor_16.alignment() }).encode() } },
                     { swap: { n: 0 } },
                     { ins: { cached: true, n: 1 } },
                     { swap: { n: 0 } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(1n),
                                                                            alignment: _descriptor_16.alignment() }).encode() } },
                     { swap: { n: 0 } },
                     { ins: { cached: true, n: 3 } }]);
    return [];
  }
  _viewClinicalHistory_0(context, partialProofData) {
    const pk_0 = this._publicKey_0(this._secretKey_0(context, partialProofData));
    return _descriptor_9.fromValue(Contract._query(context,
                                                   partialProofData,
                                                   [
                                                    { dup: { n: 0 } },
                                                    { idx: { cached: false,
                                                             pushPath: false,
                                                             path: [
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_16.toValue(1n),
                                                                               alignment: _descriptor_16.alignment() } }] } },
                                                    { idx: { cached: false,
                                                             pushPath: false,
                                                             path: [
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_2.toValue(pk_0),
                                                                               alignment: _descriptor_2.alignment() } }] } },
                                                    { popeq: { cached: false,
                                                               result: undefined } }]).value);
  }
  _canDonate_0(context, partialProofData, target_0) {
    const userType_0 = this._getUserBloodType_0(context, partialProofData);
    return this._isCompatibleDonor_0(userType_0, target_0);
  }
  _canReceive_0(context, partialProofData, from_0) {
    const userType_0 = this._getUserBloodType_0(context, partialProofData);
    return this._isCompatibleDonor_0(from_0, userType_0);
  }
  _isCompatibleDonor_0(donor_0, recipient_0) {
    if (donor_0 === 7) {
      return true;
    } else {
      if (donor_0 === 6) {
        if (recipient_0 === 6 || recipient_0 === 0 || recipient_0 === 2
            ||
            recipient_0 === 4)
        {
          return true;
        } else {
          return false;
        }
      } else {
        if (donor_0 === 1) {
          if (recipient_0 === 1 || recipient_0 === 0 || recipient_0 === 5
              ||
              recipient_0 === 4)
          {
            return true;
          } else {
            return false;
          }
        } else {
          if (donor_0 === 0) {
            if (recipient_0 === 0 || recipient_0 === 4) {
              return true;
            } else {
              return false;
            }
          } else {
            if (donor_0 === 3) {
              if (recipient_0 === 3 || recipient_0 === 2 || recipient_0 === 5
                  ||
                  recipient_0 === 4)
              {
                return true;
              } else {
                return false;
              }
            } else {
              if (donor_0 === 2) {
                if (recipient_0 === 2 || recipient_0 === 4) {
                  return true;
                } else {
                  return false;
                }
              } else {
                if (donor_0 === 5) {
                  if (recipient_0 === 5 || recipient_0 === 4) {
                    return true;
                  } else {
                    return false;
                  }
                } else {
                  if (donor_0 === 4) {
                    if (recipient_0 === 4) {
                      return true;
                    } else {
                      return false;
                    }
                  } else {
                    return false;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  static _query(context, partialProofData, prog) {
    var res;
    try {
      res = context.transactionContext.query(prog, __compactRuntime.CostModel.dummyCostModel());
    } catch (err) {
      throw new __compactRuntime.CompactError(err.toString());
    }
    context.transactionContext = res.context;
    var reads = res.events.filter((e) => e.tag === 'read');
    var i = 0;
    partialProofData.publicTranscript = partialProofData.publicTranscript.concat(prog.map((op) => {
      if(typeof(op) === 'object' && 'popeq' in op) {
        return { popeq: {
          ...op.popeq,
          result: reads[i++].content,
        } };
      } else {
        return op;
      }
    }));
    if(res.events.length == 1 && res.events[0].tag === 'read') {
      return res.events[0].content;
    } else {
      return res.events;
    }
  }
}
function ledger(state) {
  const context = {
    originalState: state,
    transactionContext: new __compactRuntime.QueryContext(state, __compactRuntime.dummyContractAddress())
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    vehicleRegistry: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_16.toValue(0n),
                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                                                               alignment: _descriptor_4.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_16.toValue(0n),
                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'idshield.compact line 8 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_16.toValue(0n),
                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(key_0),
                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'idshield.compact line 8 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_12.fromValue(Contract._query(context,
                                                        partialProofData,
                                                        [
                                                         { dup: { n: 0 } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_16.toValue(0n),
                                                                                    alignment: _descriptor_16.alignment() } }] } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_2.toValue(key_0),
                                                                                    alignment: _descriptor_2.alignment() } }] } },
                                                         { popeq: { cached: false,
                                                                    result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_2.fromValue(key.value),      _descriptor_12.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    clinicalRegistry: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_16.toValue(1n),
                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                                                               alignment: _descriptor_4.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_16.toValue(1n),
                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'idshield.compact line 22 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_16.toValue(1n),
                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(key_0),
                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'idshield.compact line 22 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_9.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_16.toValue(1n),
                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_2.toValue(key_0),
                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_2.fromValue(key.value),      _descriptor_9.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    consultations: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_16.toValue(2n),
                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                                                               alignment: _descriptor_4.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_16.toValue(2n),
                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'idshield.compact line 23 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_16.toValue(2n),
                                                                                   alignment: _descriptor_16.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(key_0),
                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'idshield.compact line 23 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        if (state.asArray()[2].asMap().get({ value: _descriptor_2.toValue(key_0),
                                             alignment: _descriptor_2.alignment() }) === undefined) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_1.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_16.toValue(2n),
                                                                                       alignment: _descriptor_16.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_2.toValue(key_0),
                                                                                       alignment: _descriptor_2.alignment() } }] } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_16.toValue(1n),
                                                                                       alignment: _descriptor_16.alignment() } }] } },
                                                            'type',
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(1n),
                                                                                                                   alignment: _descriptor_16.alignment() }).encode() } },
                                                            'eq',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          length(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`length: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_4.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_16.toValue(2n),
                                                                                       alignment: _descriptor_16.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_2.toValue(key_0),
                                                                                       alignment: _descriptor_2.alignment() } }] } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_16.toValue(2n),
                                                                                       alignment: _descriptor_16.alignment() } }] } },
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          head(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`head: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_15.fromValue(Contract._query(context,
                                                            partialProofData,
                                                            [
                                                             { dup: { n: 0 } },
                                                             { idx: { cached: false,
                                                                      pushPath: false,
                                                                      path: [
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_16.toValue(2n),
                                                                                        alignment: _descriptor_16.alignment() } },
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_2.toValue(key_0),
                                                                                        alignment: _descriptor_2.alignment() } }] } },
                                                             { idx: { cached: false,
                                                                      pushPath: false,
                                                                      path: [
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_16.toValue(0n),
                                                                                        alignment: _descriptor_16.alignment() } }] } },
                                                             { dup: { n: 0 } },
                                                             'type',
                                                             { push: { storage: false,
                                                                       value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(1n),
                                                                                                                    alignment: _descriptor_16.alignment() }).encode() } },
                                                             'eq',
                                                             { branch: { skip: 4 } },
                                                             { push: { storage: false,
                                                                       value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(1n),
                                                                                                                    alignment: _descriptor_16.alignment() }).encode() } },
                                                             { swap: { n: 0 } },
                                                             { concat: { cached: false,
                                                                         n: (2+Number(__compactRuntime.maxAlignedSize(
                                                                                 _descriptor_6
                                                                                 .alignment()
                                                                               ))) } },
                                                             { jmp: { skip: 2 } },
                                                             'pop',
                                                             { push: { storage: false,
                                                                       value: __compactRuntime.StateValue.newCell(__compactRuntime.alignedConcat(
                                                                                                                    { value: _descriptor_16.toValue(0n),
                                                                                                                      alignment: _descriptor_16.alignment() },
                                                                                                                    { value: _descriptor_6.toValue({ professionalId: '', date: 0n, result: '', specialistType: 0 }),
                                                                                                                      alignment: _descriptor_6.alignment() }
                                                                                                                  )).encode() } },
                                                             { popeq: { cached: true,
                                                                        result: undefined } }]).value);
          },
          [Symbol.iterator](...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            }
            const self_0 = state.asArray()[2].asMap().get({ value: _descriptor_2.toValue(key_0),
                                                            alignment: _descriptor_2.alignment() });
            return (() => {  var iter = { curr: self_0 };  iter.next = () => {    const arr = iter.curr.asArray();    const head = arr[0];    if(head.type() == "null") {      return { done: true };    } else {      iter.curr = arr[1];      return { value: _descriptor_6.fromValue(head.asCell().value), done: false };    }  };  return iter;})();
          }
        }
      }
    }
  };
}
const _emptyContext = {
  originalState: new __compactRuntime.ContractState(),
  transactionContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  secretKey: (...args) => undefined, getUserBloodType: (...args) => undefined
});
const pureCircuits = {};
const contractReferenceLocations = { tag: 'publicLedgerArray', indices: { } };
exports.Contract = Contract;
exports.ledger = ledger;
exports.pureCircuits = pureCircuits;
exports.contractReferenceLocations = contractReferenceLocations;
//# sourceMappingURL=index.cjs.map
