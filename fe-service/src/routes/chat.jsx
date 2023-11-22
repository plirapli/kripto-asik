/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import ChatBubble from '../components/chatBubble';
import ChatBubbleEncrypt from '../components/chatBubbleEncrypt';
import { useProfile } from '../hooks/profile';
import { getChats } from '../utils/chat';
import { socket } from '../socket';

export default function Chat() {
  const { profile } = useProfile();
  const initialState = { user: profile.id, msg: '', key: '' };
  const [isChecked, setIsChecked] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState(initialState);

  const handleCheckboxChange = () => {
    if (inputMessage.key) {
      setInputMessage((prev) => ({ ...prev, key: '' }));
    }
    setIsChecked(!isChecked);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    socket.emit('chat', { ...inputMessage, isEncrypt: isChecked });
    setInputMessage({ ...initialState });
  };

  useEffect(() => {
    getChats()
      .then((data) => setMessages([...data]))
      .catch((err) => console.log(err));

    // if (profile.id) {
    socket.connect();
    // }
    socket.on('chat', (data) => {
      setMessages((state) => [...state, { ...data }]);
    });

    return () => {
      socket.off('chat');
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <ul className='mt-3 flex-1 flex flex-col gap-3 overflow-y-auto no-scrollbar'>
        {messages.length > 0 &&
          messages.map((message) =>
            message.is_encrypt ? (
              <ChatBubbleEncrypt key={message.id} message={message} />
            ) : (
              <ChatBubble key={message.id} message={message} />
            )
          )}
      </ul>
      <div className='py-3'>
        <form onSubmit={submitHandler} className='flex flex-col gap-2'>
          <input
            onChange={(e) =>
              setInputMessage((prev) => ({ ...prev, msg: e.target.value }))
            }
            value={inputMessage.msg}
            className='form-input bg-white border border-black border-opacity-10'
            placeholder='Enter your chat'
            required
          />
          <div className='flex gap-2'>
            <label className='flex cursor-pointer select-none items-center'>
              <div className='relative'>
                <input
                  type='checkbox'
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className='sr-only'
                />
                <div
                  className={`block h-8 w-14 rounded-full transition-all ${
                    isChecked ? 'bg-green-200' : 'bg-red-200'
                  }`}
                ></div>
                <div
                  className={`absolute top-1 left-1 
                  ${isChecked && 'transform translate-x-full'} 
                  flex h-6 w-6 items-center justify-center rounded-full bg-white transition-all`}
                >
                  <span className={`${isChecked && 'hidden'} text-xs`}>❌</span>
                  <span className={`${!isChecked && 'hidden'} text-xs`}>
                    🔒
                  </span>
                </div>
              </div>
            </label>
            <input
              onChange={(e) =>
                setInputMessage((prev) => ({ ...prev, key: e.target.value }))
              }
              value={inputMessage.key}
              className={`form-input-white-sm border border-black border-opacity-10 ${
                !isChecked && 'hidden'
              }`}
              placeholder='Enter a secret passphrase'
              disabled={!isChecked ? true : false}
              required
            />
            <button className={`${!isChecked && 'w-full'} button-sm-black`}>
              <span className='w-full'>Send</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
