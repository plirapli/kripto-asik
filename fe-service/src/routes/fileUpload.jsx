import { useState } from 'react';
import { postImage } from '../utils/file';
import empty from '../assets/empty-files.png';

const FileUpload = () => {
  const [info, setInfo] = useState({});
  const [files, setFiles] = useState([]);
  const [encryptedResult, setEncryptedResult] = useState([]);
  const [isDragged, setIsDragged] = useState(false);

  // check if file is of type image and prepend the initialied
  // template to the target element
  async function addFile(file) {
    // Cek gambar atau bukan
    const isImage = file.type.match('image.*');

    if (isImage) {
      const objectURL = URL.createObjectURL(file);
      const id = objectURL;
      const size =
        file.size > 1024
          ? file.size > 1048576
            ? Math.round(file.size / 1048576) + 'mb'
            : Math.round(file.size / 1024) + 'kb'
          : file.size + 'b';

      setFiles((prev) => [
        ...prev,
        {
          name: file.name,
          image: file,
          id,
          size,
        },
      ]);
    } else {
      setInfo({
        status: 'Error',
        message: 'File bukan gambar 😠',
      });
    }
  }

  const deletePreviewHandler = (id) => {
    setFiles([...files.filter((file) => file.id != id)]);
  };

  // // click the hidden input of type file if the visible button is clicked
  // // and capture the selected files
  // const hidden = document.getElementById('hidden-input');
  // document.getElementById('button').onclick = () => hidden.click();
  // hidden.onchange = (e) => {
  //   for (const file of e.target.files) {
  //     addFile(gallery, file);
  //   }
  // };

  // use to check if a file is being dragged
  const hasFiles = ({ dataTransfer: { types = [] } }) =>
    types.indexOf('Files') > -1;

  // reset counter and append file to gallery when file is dropped
  function dropHandler(e) {
    e.preventDefault();

    for (const file of e.dataTransfer.files) {
      addFile(file);
      setIsDragged(false);
    }
  }

  // only react to actual files being dragged
  function dragEnterHandler(e) {
    e.preventDefault();
    if (!hasFiles(e)) {
      return;
    }
    !isDragged ? setIsDragged(true) : '';
  }

  function dragLeaveHandler(e) {
    isDragged ? setIsDragged(false) : '';
  }

  function dragOverHandler(e) {
    if (hasFiles(e)) {
      e.preventDefault();
    }
  }

  const submitHandler = () => {
    if (files.length > 0) {
      files.map((file) => {
        const imgFormData = new FormData();
        imgFormData.append('image', file.image);
        postImage(imgFormData)
          .then((res) => {
            const { status, message, data } = res;

            setFiles([]);
            setInfo({ status, message });
            setEncryptedResult((prev) => [...prev, { ...data }]);
          })
          .catch((err) => setInfo({ ...err }));
      });
    } else {
      setInfo({
        status: 'Error',
        message: 'Upload file dulu 😠',
      });
    }
  };

  return (
    <>
      <div className='mt-5'>
        <main className='container mx-auto max-w-screen-lg h-full'>
          {/* <!-- file upload modal --> */}
          <article aria-label='File Upload Modal' className='flex flex-col'>
            {/* <!-- overlay --> */}
            <div
              id='overlay'
              className={`
              w-full h-full absolute top-0 left-0 
              pointer-events-none z-50 rounded-md 
              flex flex-col items-center justify-center
              ${isDragged ? 'draggedover' : ''}
            `}
            >
              <i>
                <svg
                  className='fill-current w-12 h-12 mb-3 text-blue-700'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path d='M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z' />
                </svg>
              </i>
              <p className='text-lg text-blue-700'>Drop files to upload</p>
            </div>

            {/* <!-- scroll area --> */}
            <section className='h-full w-full flex flex-col'>
              <header
                onDrop={(e) => dropHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragEnter={(e) => dragEnterHandler(e)}
                className='z-10 border-dashed border-2 rounded-md border-black border-opacity-25 py-12 flex flex-col justify-center items-center'
              >
                <p className='mb-3 font-semibold text-gray-900 flex flex-wrap justify-center'>
                  <span>Drag and drop your</span>&nbsp;
                  <span>files anywhere or</span>
                </p>
                <input
                  id='hidden-input'
                  type='file'
                  multiple
                  // onChange={}
                  className='hidden'
                />
                <button
                  // onClick={() => setHiddenClicked((prev) => !prev)}
                  id='button'
                  className='mt-2 button-black'
                >
                  Upload a file
                </button>
              </header>

              <h1 className='pt-4 pb-3 font-semibold sm:text-lg text-gray-900'>
                Image to upload 📁
              </h1>

              <ul id='gallery' className='flex flex-1 gap-1.5 flex-wrap'>
                {files.length > 0 ? (
                  files.map((file) => (
                    <PreviewFile
                      key={file.id}
                      file={file}
                      deleteHandler={deletePreviewHandler}
                    />
                  ))
                ) : (
                  <li
                    id='empty'
                    className='h-full w-full text-center flex flex-col items-center justify-center'
                  >
                    <img className='mx-auto w-32' src={empty} alt='no data' />
                    <span className='text-small text-gray-500'>
                      No files selected
                    </span>
                  </li>
                )}
              </ul>
            </section>

            {/* <!-- sticky footer --> */}
            <footer className='mt-6'>
              <button
                onClick={submitHandler}
                id='submit'
                className='w-full button-black'
              >
                <span className='w-full'>Upload & Encrypt</span>
              </button>
            </footer>
            {info.message && (
              <div
                type='button'
                className={`mt-4 px-2.5 py-1.5 w-full text-sm rounded-md ${
                  info.status == 'Error'
                    ? 'text-red-600 bg-red-50 border border-red-600'
                    : 'text-green-600 bg-green-50 border border-green-600'
                }`}
              >
                {info.message}
              </div>
            )}
            <hr className='mt-5 mb-4' />
            {encryptedResult.length > 0 && (
              <>
                <h1 className='pb-3 font-semibold sm:text-lg text-gray-900'>
                  Encrypted Key File 🔑
                </h1>
                <div className='flex flex-col gap-2.5'>
                  {encryptedResult.map((result, i) => (
                    <div
                      key={i}
                      className='flex items-center px-2 py-2 bg-white shadow rounded-md'
                    >
                      <div className='pl-3 pr-4'>🔑</div>
                      <div className='w-full'>{result.filename}</div>
                      <a href={result.keyURL} className='button-sm-black'>
                        <span className='w-full'>Download</span>
                      </a>
                    </div>
                  ))}
                </div>
              </>
            )}
          </article>
        </main>
      </div>
    </>
  );
};

const PreviewFile = ({ file, deleteHandler }) => {
  return (
    <li className='block p-1 w-full sm:w-1/4 h-24'>
      <article
        tabIndex='0'
        className='bg-white hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline relative text-transparent hover:text-white shadow'
      >
        <img
          alt={file.name}
          src={file.id}
          className='img-preview w-full h-full sticky object-cover rounded-md bg-fixed'
        />

        <section className='flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3'>
          <h1 className='flex-1 font-medium'>{file.name}</h1>
          <div className='flex items-center'>
            <p className='size text-xs'>{file.size}</p>
            <button
              onClick={() => deleteHandler(file.id)}
              className='delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md'
            >
              <svg
                className='pointer-events-none fill-current w-4 h-4 ml-auto'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path
                  className='pointer-events-none'
                  d='M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z'
                />
              </svg>
            </button>
          </div>
        </section>
      </article>
    </li>
  );
};

export default FileUpload;
