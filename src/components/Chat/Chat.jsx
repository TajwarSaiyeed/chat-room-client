import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import styles from "../../styles/Chat.module.css";
import EmojiPicker from "emoji-picker-react";
import icon from "../../images/emoji.svg";
import Messages from "../Messages/Messages";

const socketio = io.connect("http://localhost:5000");

const Chat = () => {
  const [state, setState] = useState([]);
  const { search } = useLocation();
  const [params, setParams] = useState({ name: "", room: "" });
  const [message, setMessage] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [users, setUsers] = useState(0);
  const navigate = useNavigate();

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

  useEffect(() => {
    socketio.on("room", ({ data: { users } }) => {
      setUsers(users.length);
    });
  }, []);

  const leftRoom = () => {
    socketio.emit("leftRoom", { params });
    navigate("/");
  };

  const handleChange = ({ target: { value } }) => setMessage(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;

    socketio.emit("sendMessage", { message, params });

    setMessage("");
  };

  const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>{params.room}</div>
        <div className={styles.users}>{users} users in this room</div>
        <button className={styles.left} onClick={leftRoom}>
          Left the room
        </button>
      </div>

      <div className={styles.messages}>
        <Messages messages={state} name={params.name} />
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <input
            type="text"
            name="message"
            placeholder="What do you want to say?"
            value={message}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.emoji}>
          <img src={icon} alt="" onClick={() => setOpen(!isOpen)} />

          {isOpen && (
            <div className={styles.emojies}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        <div className={styles.button}>
          <input type="submit" onSubmit={handleSubmit} value="Send a message" />
        </div>
      </form>
    </div>
  );
};

export default Chat;
