import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

const socketio = io.connect("http://localhost:5000");

const Chat = () => {
  const [state, setState] = useState([]);
  const { search } = useLocation();
  const [params, setParams] = useState(null);
  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);

    socketio.emit("join", searchParams);

    return () => {};
  }, [search]);

  useEffect(() => {
    socketio.on("message", ({ data }) => {
      setState((_state) => [..._state, data]);
    });
  }, []);

  console.log(state);

  return <div>chat</div>;
};

export default Chat;
