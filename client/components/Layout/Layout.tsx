import { ReactNode } from "react";
import ConnectWalletButton from "../Button/ConnectWalletButton";
import NavButton from "../Button/NavButton";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <header className="p-4 ">
        <nav className="flex justify-between mx-auto container items-center ">
          <div className="xl:flex">
            <div className="text-4xl"> AVAX Subnet </div>
            <div className="space-x-12 font-bold mx-8 pt-2">
              <NavButton to="/" name="Home" />
              <NavButton to="/IssueBill" name="Issue Bill" />
              <NavButton to="/ViewBills" name="View Bills" />
              <NavButton to="/Admin" name="Admin" />
            </div>
          </div>
          <ConnectWalletButton />
        </nav>
      </header>
      <div>{children}</div>
    </div>
  );
}
