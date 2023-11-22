import { useState } from 'react';
import { decrypChat } from '../utils/chat';

const ChatBubbleEncrypt = ({ message, decrypt }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [msgKey, setMsgKey] = useState('');
  const [msg, setMsg] = useState('');
  const [info, setInfo] = useState({});

  const decryptHandler = (e) => {
    e.preventDefault();
    decrypChat(message.id, { msgKey })
      .then((data) => {
        setMsg(data);
        setInfo({});
        setIsOpened(false);
      })
      .catch((err) => setInfo({ ...err }));
  };

  const closeHandler = () => {
    setMsgKey('');
    setInfo({});
    setIsOpened(false);
  };

  return (
    <div className='pl-3.5 pr-2.5 py-2.5 bg-white rounded-lg shadow'>
      <div className='text-sm font-bold'>{message.name}</div>
      <div className='flex gap-4 items-center'>
        <div className='text-black w-full text-sm sm:text-base'>
          {msg ? (
            <>{msg}</>
          ) : (
            <>
              🔐
              <span className='ml-1 text-black text-opacity-50'>
                This message is encrypted
              </span>
            </>
          )}
        </div>
        <button
          onClick={() => setIsOpened(true)}
          className={`button-sm-black ${(isOpened || msg) && 'hidden'}`}
        >
          Decrypt
        </button>
      </div>
      <form
        onSubmit={decryptHandler}
        className={`mt-2 flex gap-2 ${!isOpened && 'hidden'}`}
      >
        <input
          onChange={(e) => setMsgKey(e.target.value)}
          value={msgKey}
          className={`form-input-white-sm border border-black border-opacity-10`}
          placeholder='Enter a secret passphrase'
          required
        />
        <button type='button' onClick={closeHandler} className='button-sm-gray'>
          <span className='w-full'>Cancel</span>
        </button>
        <button type='submit' className='button-sm-black'>
          <span className='w-full'>Decrypt</span>
        </button>
      </form>
      {info.message && (
        <div
          className={`mt-2 px-2.5 py-1.5 w-full text-sm rounded-md ${
            info.status == 'Error'
              ? 'text-red-600 bg-red-50 border border-red-600'
              : 'text-green-600 bg-green-50 border border-green-600'
          }`}
        >
          {info.message}
        </div>
      )}
    </div>
  );
};

export default ChatBubbleEncrypt;
