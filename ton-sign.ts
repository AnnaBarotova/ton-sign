import { mnemonicToPrivateKey, sign} from "@ton/crypto";

import { Cell, beginCell, Address } from "@ton/core";
import { WalletContractV4, TonClient }  from "@ton/ton";
import {signature} from "bitcoinjs-lib/src/script";

(async () => {

// Generate new key
  let keyPair = await mnemonicToPrivateKey(''.split(' '));

  const tx = 'b5ee9c724101040100520001217369676e7fffff116734722c0000000fa001020a0ec3c86d03020300000062627fb7aade8ad5ace3c67d82d6e7dc2cbc6e8b626e7169d580db1f3eb5cd5c7eca06081000000000000000000000000000e0bd3453';

  console.log('public key: ', keyPair.publicKey.toString('hex'))

  console.log('unsigned transaction: ',  tx)

  const txCell = Cell.fromHex(tx);

  const signature = sign(txCell.hash(), keyPair.secretKey);

  console.log('signature: ', signature.toString('hex'))
})()

