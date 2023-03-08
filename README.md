# Scroll zkEVM Messenger L2->L1 Example

> Send a message from L2 Scroll zkEVM testnet to L1 Goerli.

## Example

There's two contracts; `L2Contract.sol` and `L1Contract.sol`

The L2 contract has a method `sendGreetingMessageToL1` that sends a message form L2 to L1 contract to set a greeting message on L1 contract.
It sends the encoded calldata to execute `setGreeting` on L1 which can only be called if the message was sent by the L2 contract.

### Files

- [`L2Contract.sol`](./contracts/L2Contract.sol)
- [`L1Contract.sol`](./contracts/L1Contract.sol)
- [`deployL2.js`](./script/deployL2.js)
- [`deployL1.js`](./scripts/deployL1.js)
- [`sendL2ToL1Message.js`](./scripts/sendL2ToL1Message.js)
- [`getGreetingOnL1.js`](./scripts/getGreetingOnL1.js)

## Install

```sh
git clone https://github.com/miguelmota/scroll-messenger-l2-to-l1-example.git
cd scroll-messenger-l2-to-l1-example
npm install
```

### Set Signer

Create `.env`

```sh
PRIVATE_KEY=123...
```

Make sure private key has funds on both Scroll zkEVM testnet and Goerli.

### Compile Contracts

```sh
npx hardhat compile
```

### Deploy L2 Contract

Command

```sh
npx hardhat run --network scroll scripts/deployL2.js
```

Output

```sh
L2Contract deployed to: 0x32EdD9E855F92C6Db51B86D5d004C6E7d11018a1
```

### Deploy L1 Contract

Command

```sh
L2_CONTRACT=0x32EdD9E855F92C6Db51B86D5d004C6E7d11018a1 \
npx hardhat run --network goerli scripts/deployL1.js
```

Output

```sh
L1Contract deployed to: 0xc99668601516205D2305383c96134814b1f2CC11
```

### Send L2->L1 Message

Command (replace env vars with your values)

```sh
GREETING="hello world" \
L2_CONTRACT=0x32EdD9E855F92C6Db51B86D5d004C6E7d11018a1 \
L1_CONTRACT=0xc99668601516205D2305383c96134814b1f2CC11 \
npx hardhat run --network scroll scripts/sendL2ToL1Message.js
```

Output

```sh
sent tx hash 0x6ad8593e5aaf05496de0585f4e5dba9940c6268a1006df8160af6d5b1aa94210
https://blockscout.scroll.io/tx/0x6ad8593e5aaf05496de0585f4e5dba9940c6268a1006df8160af6d5b1aa94210
```

### Get Greeting on L1

Command (Note: it can take a few minutes to hours after sending from L2 to see updated state on L1)

```sh
L1_CONTRACT=0xc99668601516205D2305383c96134814b1f2CC11 \
npx hardhat run --network goerli scripts/getGreetingOnL1.js
```

Output

```sh
greeting: hello world
```

## License

[MIT](./LICENSE) @ [Miguel Mota](https://github.com/miguelmota)
