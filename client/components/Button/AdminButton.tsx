import { useCallback, useContext, useEffect, useState } from "react";
import CurrentAccountContext from "../../context/CurrentAccountProvider";
import { TxAllowListRole, useContract } from "../../hooks/useContract";
import NavButton from "./NavButton";

export default function AdminButton() {
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

  if (isAdmin) {
    return <NavButton to="/Admin" name="Admin" />;
  }

  return <div></div>;
}
