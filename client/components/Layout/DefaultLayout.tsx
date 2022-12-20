import Link from "next/link";
import { ReactNode } from "react";
import ConnectWalletButton from "../Button/ConnectWalletButton";
import NavButton from "../Button/NavButton";

type Props = {
  children: ReactNode;
};

// connectWalletはボタンを別で実装する。
// 振る舞いと

export default function DefaultLayout({ children }: Props) {
  return (
    <div>
      <header className="bg-gradient-to-r from-sky-500 to-indigo-500 p-4">
        <nav className="flex justify-between mx-auto container items-center">
          <div className="flex">
            <div className="text-4xl"> Title </div>
            <div className="space-x-12 font-bold mx-8 pt-4">
              <NavButton to="/" name="Home" />
              <NavButton to="/" name="Issue Bill" />
              <NavButton to="/" name="View Bills" />
            </div>
          </div>
          <ConnectWalletButton />
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
