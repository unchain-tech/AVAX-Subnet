export const sameAddresses = (address1: string, address2: string) => {
  // ブロックチェーンと接続する各APIの仕様によってアドレスを大文字で扱うものと小文字で扱うものがありますがその違いはアドレス値としては同じものです。
  // その違いを吸収するために, アドレスをそれぞれ小文字にしてから比較します。
  return address1.toLocaleLowerCase() === address2.toLocaleLowerCase();
};
