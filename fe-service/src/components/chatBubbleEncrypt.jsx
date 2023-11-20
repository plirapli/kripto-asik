const ChatBubbleEncrypt = ({ message, decrypt }) => {
  return (
    <div className='pl-3.5 pr-2.5 py-2.5 bg-white rounded-lg shadow'>
      <div className='text-sm font-bold'>{message.name}</div>
      <div className='flex gap-4 mt-2 items-center'>
        <div className='text-black w-full text-sm sm:text-base'>
          🔐
          <span className='ml-1 text-black text-opacity-50'>
            This message is encrypted
          </span>
        </div>
        <button onClick={() => decrypt(message)} className='button-sm-black'>
          Decrypt
        </button>
      </div>
    </div>
  );
};

export default ChatBubbleEncrypt;
