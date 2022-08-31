import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/ui/Sidebar';

//import { db, ref, storage, FirebaseContext, getDownloadURL, uploadBytes, uploadBytesResumable } from './firebase';

import { Menu } from './pages/Menu';
import { NewSaucer } from './pages/NewSaucer';
import { Orders } from './pages/Orders';

function App() {
  return (
    <div className='md:flex min-h-screen'>
      <Sidebar />

      <div className='md:w-3/5 xl:w-4/5 p-6'>
        <Routes>
          <Route path='/' element={<Orders />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/new-saucer' element={<NewSaucer />} />
        </Routes>
      </div>

    </div>

    // <FirebaseContext.Provider
    //   value={{
    //     db,
    //     ref,
    //     storage,
    //     getDownloadURL,
    //     uploadBytes,
    //     uploadBytesResumable
    //   }}
    // >
    //   <div className='md:flex min-h-screen'>
    //     <Sidebar />

    //     <div className='md:w-3/5 xl:w-4/5 p-6'>
    //       <Routes>
    //         <Route path='/' element={<Orders />} />
    //         <Route path='/menu' element={<Menu />} />
    //         <Route path='/new-saucer' element={<NewSaucer />} />
    //       </Routes>
    //     </div>

    //   </div>
    // </FirebaseContext.Provider>
  );
}

export default App;
