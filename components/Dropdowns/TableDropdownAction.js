import React, { useEffect } from "react";
import { createPopper } from "@popperjs/core";
import { addAdminRole,disableAccount,enableAccount } from "admin-functions/accounts";

const NotificationDropdown = ({ uid, setSuccess, setError }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  useEffect(() => {
    setSuccess(false);
    setError(false);
  }, []);
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const makeAdmin = async () => {
    setError(false);
    setSuccess(false);
    try {
      const setAdmin = await addAdminRole(uid);
      console.log(setAdmin);
      if (setAdmin.data.error) {
        setSuccess(false);
        setError(setAdmin.data.error);
      }
      if (setAdmin.data.message) {
        setSuccess(setAdmin.data.message);
        setError(false);
      }
    } catch (err) {
      setSuccess(false);
      setError(err.message);
    }
    closeDropdownPopover();
  };

  const makeAccountDisabled = async () => {
    setError(false);
    setSuccess(false);
    try {
      const account = await disableAccount(uid);
      console.log(account);
      if (account.data.error) {
        setSuccess(false);
        setError(account.data.error);
      }
      if (account.data.message) {
        setSuccess(account.data.message);
        setError(false);
      }
    } catch (err) {
      setSuccess(false);
      setError(err.message);
    }
    closeDropdownPopover();
  }

  const makeAccountEnabled = async () => {
    setError(false);
    setSuccess(false);
    try {
      const account = await enableAccount(uid);
      console.log(account);
      if (account.data.error) {
        setSuccess(false);
        setError(account.data.error);
      }
      if (account.data.message) {
        setSuccess(account.data.message);
        setError(false);
      }
    } catch (err) {
      setSuccess(false);
      setError(err.message);
    }
    closeDropdownPopover();
  }

  
  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={makeAdmin}
        >
          Set as Admin
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={makeAccountDisabled}
        >
          Disable Account
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={makeAccountEnabled}
        >
          Enable Account
        </a>
      </div>
    </>
  );
};

export default NotificationDropdown;
