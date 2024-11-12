import { mnemonicToPrivateKey, sign} from "@ton/crypto";

import { Cell, beginCell, Address } from "@ton/core";
import { WalletContractV4, TonClient }  from "@ton/ton";
import {signature} from "bitcoinjs-lib/src/script";

(async () => {

// Generate new key
  let keyPair = await mnemonicToPrivateKey(''.split(' '));


  const client = new TonClient({
    endpoint:
      ''
});
  const tx = '';

  const version: number = 4;

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

  console.log(await client.open(WalletContractV4.create({
    workchain: 0, publicKey: keyPair.publicKey
  })).send(
    cell
  ));

})()

