/* eslint-disable react/prop-types */
import ChatBubble from '../components/chatBubble';
import { getContact } from '../utils/contacts';

export default function Chat() {
  // const { contact } = getContact(params.username);

  const dummyContact = {
    username: 'tes',
    avatar: 'https://placekitten.com/g/200/200',
  };

  return (
    <>
      <ul className='mt-3 flex-1 flex flex-col gap-3 overflow-y-auto no-scrollbar'>
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
        <ChatBubble />
      </ul>
      <div className='py-3'>
        <form className='flex flex-col sm:flex-row gap-2'>
          <input
            className='form-input border border-black border-opacity-10'
            placeholder='Enter your chat'
            required
          />
          <div className='flex gap-2'>
            <select
              // onChange={(e) => handleChangeSearch(e, 'regency')}
              // value={searchData.regency}
              className='w-full sm:w-fit bg-black bg-opacity-10 rounded-md text-gray-900 text-sm focus:ring-0 focus:border-gray-300 block p-2.5'
            >
              <option className='capitalize'>Semua</option>
              <option className='capitalize'>Muhammad Rafli</option>
              <option className='capitalize'>Asfara</option>
            </select>
            <button className='button-black'>
              <span className='w-full'>Send</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
