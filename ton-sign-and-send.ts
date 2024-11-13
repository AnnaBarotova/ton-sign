import { mnemonicToPrivateKey, sign} from "@ton/crypto";

import { Cell, beginCell, Address } from "@ton/core";
import {WalletContractV4, TonClient, WalletContractV5R1} from "@ton/ton";
import {signature} from "bitcoinjs-lib/src/script";

(async () => {

// Generate new key
  let keyPair = await mnemonicToPrivateKey(''.split(' '));


  const client = new TonClient({
    endpoint:
      ''
});
  const tx = 'b5ee9c724101040100520001217369676e7fffff1167344f340000000ea001020a0ec3c86d03020300000062627fb7aade8ad5ace3c67d82d6e7dc2cbc6e8b626e7169d580db1f3eb5cd5c7eca0608100000000000000000000000000064036127';

  const version: number = 5;

  const txCell = Cell.fromHex(tx);

  const signature = sign(txCell.hash(), keyPair.secretKey);

  let cell: Cell;
  if (version === 5) {
    cell = beginCell()
      .storeSlice(txCell.beginParse())
      .storeBuffer(signature)
      .endCell()
  } else {
    cell = beginCell()
      .storeBuffer(signature)
      .storeSlice(txCell.beginParse())
      .endCell()
  }

  console.log(await client.open(WalletContractV5R1.create({
    workchain: 0, publicKey: keyPair.publicKey
  })).send(
    cell
  ));

  console.log('transaction hash: ', cell.hash())

})()

