import styles from "./DefaultLayout.module.css";
import Link from "next/link";
import CurrentAccountContext from "../../context/CurrentAccountProvider";
import { useContext, ReactNode } from "react";

type Props = {
  children: ReactNode;
  home?: boolean;
};

//TODO: <Head>などはページ単位での設定が推奨。indexで設定して他のページではどうなるのか確認。<Head>や<footer>の使い方はinit時のものを参照。

export default function DefaultLayout({ children, home }: Props) {
  const [currentAccount, connectWallet] = useContext(CurrentAccountContext);

  return (
    <div>
      <div className={styles.navBar}>
        <div className={styles.rightHeader}>
          <div className={styles.appName}> Asset Tokenization </div>
        </div>
        {currentAccount == undefined ? (
          <div className={styles.connectBtn} onClick={connectWallet}>
            {" "}
            Connect to wallet{" "}
          </div>
        ) : (
          <div className={styles.connected}>
            {" "}
            {"Connected to " + currentAccount}{" "}
          </div>
        )}
      </div>
      <div>{children}</div>
      {!home && (
        <Link href="/">
          <div className={styles.backToHome}>Back to home</div>
        </Link>
      )}
    </div>
  );
}
