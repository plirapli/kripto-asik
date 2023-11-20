export default function ErrorPage() {
  return (
    <div className='min-h-screen sm:p-6 flex sm:justify-center sm:items-center'>
      <div className='flex flex-col bg-gray-100 text-center'>
        <h1 className='text-2xl mb-2 text-black text-opacity-50'>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className='mt-2 font-bold text-lg'>404 Not Found 😢</p>
      </div>
    </div>
  );
}
