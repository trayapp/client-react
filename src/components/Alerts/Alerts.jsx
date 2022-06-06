import { useState, useEffect } from "react";

import classNames from "classnames";
import toast, { Toaster } from "react-hot-toast";
import {
  MdOutlineClose,
  MdInfoOutline,
  MdErrorOutline,
  MdCheckCircleOutline,
} from "react-icons/md";
// import { HiLightningBolt } from "react-icons/hi";
import { useSelector } from "react-redux";
import { alertSliceActions } from "../../context/actions";

import styles from "./Alerts.module.css";

const Alerts = () => {
  const { alerts } = useSelector((state) => state.notifications);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [show, setShow] = useState(false);
  const [clearPreviousAlerts, setClearPreviousAlerts] = useState(false);

  if (!clearPreviousAlerts) {
    alertSliceActions.clearAlerts(alerts);
    setClearPreviousAlerts(true);
  }

  useEffect(() => {
    if (alerts.length > 0) {
      toast.custom(
        (t) => (
          <div
            key={t.id}
            className={classNames([
              "flex items-center h-16 border relative bg-white border-gray-300 pr-4 w-full max-w-md shadow-lg hover:shadow-none transition-all duration-400",
              t.visible ? "bottom-0" : "-bottom-96",
              alert.type === "error"
                ? "text-red-500 border-red-300"
                : alert.type === "success"
                ? `text-emerald-500 border-emerald-300`
                : "",
            ])}
          >
            <div
              className={`${styles.iconWrapper} ${
                alert.type === "error"
                  ? `bg-red-500`
                  : alert.type === "success"
                  ? `bg-emerald-500`
                  : ""
              }`}
            >
              {alert.type === "error" ? (
                <MdErrorOutline />
              ) : alert.type === "success" ? (
                <MdCheckCircleOutline />
              ) : (
                <MdInfoOutline />
              )}
            </div>
            <div
              className={`${styles.contentWrapper} ${
                alert.type === "error"
                  ? `text-red-500`
                  : alert.type === "success"
                  ? `text-emerald-500`
                  : ""
              }`}
            >
              <p>{alert.message}</p>
            </div>
            <div
              className={styles.closeIcon}
              onClick={() => toast.dismiss(t.id)}
            >
              <MdOutlineClose />
            </div>
          </div>
        ),
        { position: "bottom-center", id: `-->${alerts.length - 1}<--` }
      );
      setAlert(alerts[alerts.length - 1]);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 18000);
    }
  }, [alert.message, alert.type, alerts]);
  return <>{show && <Toaster />}</>;
};

export default Alerts;
