const ChatBubble = ({ message }) => {
  return (
    <div className='px-3.5 py-2 bg-white rounded-lg shadow'>
      <div className='text-sm font-bold'>{message?.name}</div>
      <div className='text-black text-opacity-70 text-sm sm:text-base'>
        {message?.msg} {message?.isEncrypt}
      </div>
    </div>
  );
};

export default ChatBubble;
