import React, { useState, useEffect } from "react";
import { setNotify } from "../services/notificationService";

export default function ErrorPopup() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setNotify(setMessage);
  }, []);

  if (!message) return null;

  return (
      <div style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 20px",
        background: "red",
        color: "white",
        borderRadius: "5px"
      }}>
        {message}
        <button onClick={() => setMessage(null)} style={{marginLeft: "10px"}}>✖</button>
      </div>
  );
}
