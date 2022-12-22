import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import CurrentAccountContext from "../../context/CurrentAccountProvider";
import { TxAllowListRole, useContract } from "../../hooks/useContract";
import ConnectWalletButton from "../Button/ConnectWalletButton";
import NavButton from "../Button/NavButton";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const [currentAccount] = useContext(CurrentAccountContext);
  const { txAllowList } = useContract({ currentAccount });
  const [isAdmin, setIsAdmin] = useState(false);

  const getAdminAddress = useCallback(async () => {
    if (!currentAccount) return;
    if (!txAllowList) return;
    try {
      const role = await txAllowList.readAllowList(currentAccount);
      if (role.toNumber() === TxAllowListRole.Admin) {
        setIsAdmin(true);
      }
    } catch (error) {
      alert(error);
    }
  }, [currentAccount, txAllowList]);

  useEffect(() => {
    getAdminAddress();
  }, [txAllowList, getAdminAddress]);

  return (
    <div>
      <header className="p-4 ">
        <nav className="xl:flex lg:flex md:flex justify-between mx-auto container items-center">
          <div className="xl:flex lg:flex md:flex items-center ">
            <div className="text-4xl"> AVAX Subnet </div>
            <div className="xl:flex lg:flex md:flex space-x-12 ml-8">
              <NavButton to="/" name="Home" />
              <NavButton to="/IssueBill" name="Issue Bill" />
              <NavButton to="/ViewBills" name="View Bills" />
              {isAdmin ? <NavButton to="/Admin" name="Admin" /> : <div></div>}
            </div>
          </div>
          <ConnectWalletButton />
        </nav>
      </header>
      <div>{children}</div>
    </div>
  );
}
