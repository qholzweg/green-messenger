import { useEffect, useState } from "react"
import { useForm } from "../hooks/useForm"
import { Icon } from '@iconify/react';
import { Api } from "../service/api"
import { Message } from "./message"

export const Chat = ({ id, token, phone, setLoading }) => {
  const { form, handleChange, setValue } = useForm({ message: '' });
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(false);
  const api = new Api(id, token, phone);

  const toggleError = () => {
    setError(true);
    setTimeout(() => setError(false), 4000);
  }

  //adds new message to state
  const addMessage = (message) => {
    setMessages((messages) => [...messages, message]);
  }

  //finds the message by id and chges it's status
  const changeStatus = (_id, _status) => {
    setMessages((messages) => messages.map((message) => message.idMessage === _id ?
      { ...message, _status: _status } :
      message))
  }

  //create new outgoing message object
  const constructOutgoing = (_id, text) => {
    return {
      "idMessage": _id,
      "outgoing": true,
      "_status": "inProgress",
      "timestamp": Date.now(),
      "messageData": {
        "typeMessage": "textMessage",
        "textMessageData": {
          "textMessage": text
        }
      }
    }
  }

  // on message send adds new message and reset input value
  const onSend = (e) => {
    e.preventDefault();
    api.send(form.message)
      .then((_id) => {
        if (!_id) {
          toggleError();
          return;
        }
        addMessage(constructOutgoing(_id, form.message));
        setTimeout(() => setValue({ message: '' }), 100);
      })
      .catch(() => toggleError());
  }

  useEffect(() => {
    //on component mount sets interval that check new notifications, if new incoming adds it, if outgoing message status changes updating its state
    const interval = setInterval(() => {
      setLoading(true);
      api.recieveLoop(
        (message) => addMessage(message),
        (_id, _status) => changeStatus(_id, _status),
        () => setLoading(false)
      )
    }, 7000);
    return () => clearInterval(interval);
  }, [setLoading])


  return (
    <div className="chat flex flex-col h-full w-full pt-28 pb-20">
      <div className="messages flex-grow flex flex-col items-start gap-4 px-4">
        {messages && messages.map((message, i) =>
          <Message message={message} key={i} />
        )}
      </div>
      <div className="sendForm fixed bottom-0 left-0 w-screen bg-gray-50 py-4 px-4">
        <form onSubmit={onSend} className="flex flex-row gap-2">
          <input type="text" name="message" placeholder="Сообщение" value={form.message} onChange={handleChange} className="flex-grow px-3 py-2 border border-slate-300 rounded-full" />
          <button type="submit" className="px-3 py-2 text-green-400 rounded-full"><Icon icon="material-symbols:send-rounded" width="32" /></button>
        </form>
        {error &&
          <p className="error text-red-600">Something went wrong!</p>
        }
      </div>
    </div>
  )
}