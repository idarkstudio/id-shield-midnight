# ID Shield (Vehicles & Clinical Records)

Monorepo showcasing how to build a privacy‑preserving Midnight dApp that combines two personal data domains (vehicle insurance + basic clinical history) using zero‑knowledge circuits.

- Compact contract (`idshield-contract`) managing private on‑chain vehicle and clinical registries.
- CLI / tooling (`idshield-cli`) to spin up / exercise a Proof Server and test flows.
- React + Vite frontend (`frontend-vite-react`) integrating UI + Wallet.

> Goal: Provide a starter foundation for identity / compliance / health style apps that need selective disclosure across heterogeneous personal data domains.

---

## Monorepo Architecture

Workspace (see root `package.json`):

| Package               | Purpose                                  | Key Scripts                                              |
| --------------------- | ---------------------------------------- | -------------------------------------------------------- |
| `idshield-contract`   | Compact source & managed build artifacts | `npm run compact`, `npm run build`                       |
| `idshield-cli`        | Tooling, tests, proof server (Docker)    | `npm run run-proof-server-testnet`, `npm run standalone` |
| `frontend-vite-react` | Web application (React + Vite)           | `npm run dev`                                            |

Midnight dependencies: runtime, ledger, wallet, ZK providers (proof, indexer, private state, config).

---

## The `idshield.compact` Contract

Defines TWO logically separate private domains bound to the same cryptographic identity derived from a hidden `secretKey()` witness:

1. Vehicle Domain (insurance status & drive permission)
2. Clinical Domain (basic profile + medical consultations)

### Identity & Privacy Model

- `witness secretKey(): Bytes<32>`: User local secret (never disclosed).
- `publicKey(sk)`: Deterministically derives a public key via a domain‑separated persistent hash (`"person-domain"`).
- Each circuit computes `pk = disclose(publicKey(secretKey()))` and only reads/writes the caller’s records.
- Sensitive string data is wrapped as `Opaque<'string'>` and only disclosed back to the owner through view circuits.

### Data Structures & Enums

Vehicle:

- `enum InsuranceStatus { Unpaid, Paid }`
- `enum InsuranceType { FullCoverage, ThirdParty, CivilLiability }`
- `struct VehicleRecord { insuranceStatus, insuranceType, insurancePaidDate }`

Clinical:

- `enum Genre { Male, Female, Other }`
- `enum MedicalCoverage { SocialSecurity, Private, None }`
- `enum SpecialistType { General, Cardiologist, Dermatologist, Other }`
- `struct ClinicalRecord { genre, fullName (opaque), medicalCoverage }`
- `struct Consultation { professionalId, date, result, specialistType }`

Ledgers (persistent maps):

- `vehicleRegistry: Map<Bytes<32>, VehicleRecord>`
- `clinicalRegistry: Map<Bytes<32>, ClinicalRecord>`
- `consultations: Map<Bytes<32>, List<Consultation>>`

### Exported Circuits

| Circuit                                                         | Domain   | Description                                                                        |
| --------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------- |
| `registerVehicle(status, insType, paidDate)`                    | Vehicle  | Insert/update owner’s insurance record.                                            |
| `canDrive(currentTime)`                                         | Vehicle  | Asserts insurance is Paid; returns `true` if valid (extendable for time validity). |
| `viewVehicle()`                                                 | Vehicle  | Returns caller’s `VehicleRecord`.                                                  |
| `registerClinicalHistory(genre, fullName, medicalCoverage)`     | Clinical | Creates initial clinical profile.                                                  |
| `addConsultation(professionalId, date, result, specialistType)` | Clinical | pushFront a new medical consultation onto list.                                    |
| `viewClinicalHistory()`                                         | Clinical | Returns caller’s `ClinicalRecord`.                                                 |

Typical flow:

1. User initializes local secret (off‑contract) and invokes a circuit deriving `publicKey`.
2. Registers vehicle data and/or clinical history.
3. Adds consultations over time.
4. Uses `canDrive` as a compliance proof (e.g., roadside check) without revealing full record.
5. Retrieves own records with the `view*` circuits.

### Extension / Improvement Ideas

- Enforce insurance validity window: `insurancePaidDate + policyPeriod > currentTime`.
- Partial updates or logical revocation for consultations (currently append-only via pushFront semantics).
- Role-based access (doctor / auditor) permitting selective read circuits.
- Pagination or indexing for potentially large `consultations` list.
- Distinct domain separation hashes per registry for extra compartmentalization.

---

## Getting Started

### Requirements

- Node.js 18+
- npm 10+
- Docker (for testnet Proof Server)

### Install

```bash
npm install
```

### Dev (Testnet)

Launch remote proof server + frontend:

```bash
npm run start-app-testnet
```

### Frontend Only (undeployed instances / local mock)

```bash
npm run start-app-undeployed
```

### Compile Contract

Current `idshield-contract` script still targets the original `counter.compact`. To compile `idshield.compact`, adjust `idshield-contract/package.json`:

```jsonc
"scripts": {
	"compact": "compact compile +0.25.0 src/idshield.compact src/managed/idshield"
}
```

Then run:

```bash
cd idshield-contract
npm run compact
```

### Build TypeScript Artifacts

```bash
cd idshield-contract
npm run build
```

### Tests

`idshield-cli` holds existing (counter-oriented) tests. Add new test files under `idshield-cli/src/test` to exercise the new circuits.

Example placeholder:

```ts
// should assert canDrive after registering a Paid insurance
```

---

## Privacy Matrix

| Element                                                | Private (Never Disclosed) | Disclosed                | Notes                                                      |
| ------------------------------------------------------ | ------------------------- | ------------------------ | ---------------------------------------------------------- |
| `secretKey`                                            | Yes (witness)             | Never                    | Root identity secret.                                      |
| `publicKey(secretKey)`                                 | Derived                   | Yes (per circuit call)   | Index key into each ledger.                                |
| Opaque fields (`fullName`, `professionalId`, `result`) | Stored opaque             | Only to owner via view\* | Could add selective disclosure circuits for third parties. |
| Status / enums                                         | Stored clear              | Disclosed when viewing   | Could be abstracted behind proofs if needed.               |

---

## Current Limitations

- No third‑party authorized read (e.g., external doctor, traffic authority).
- `canDrive` ignores temporal validity; checks only status Paid.
- Consultation list unbounded; no deletion / revocation primitive.
- Frontend doesn’t yet surface all circuits (base template state).

---

## Suggested Roadmap

1. Insurance expiration logic (time window enforcement).
2. Selective proof circuit (e.g., “Insurance valid” without revealing type/date).
3. Multi‑key / role permission system (doctor, auditor, regulator).
4. Consultation pagination & indexing.
5. Frontend forms & dashboards for both domains.
6. Domain‑specific test suite (vehicle + clinical) replacing counter tests.

---

## License

Apache-2.0 (see per‑package files where applicable).

---

## References

- Midnight Network SDK & Compact Runtime
- ZK Proof Server tooling

---

Explore the contract at: `idshield-contract/src/idshield.compact`.

Contributions & improvements welcome.
