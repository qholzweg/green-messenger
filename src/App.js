import './App.css';
import { useState } from 'react';
import { Login } from './components/login';
import { Phone } from './components/phone';
import { Chat } from './components/chat';
import { Icon } from '@iconify/react';

function App() {
  const [isLogged, setLogged] = useState(false);
  const [credentials, setCredentials] = useState({idInstance: '', apiTokenInstance: ''})
  const [phone, setPhone] = useState();
  const [isLoading, setLoading] = useState(false);

  const handleLogin = (form) => {
    setCredentials(form);
    setLogged(true);
  }

  const handlePhone = (chatId) => {
    setPhone(chatId);
  }

  return (
    <div className="App flex flex-col h-screen">
      <header className="App-header fixed top-0 left-0 w-full text-center bg-green-400 text-white py-8 mb-8">
        <h1 className="text-3xl font-bold">Green messenger</h1>
        {isLoading &&
          <div className='loading absolute top-4 right-4'><Icon icon="eos-icons:bubble-loading" width={24} /></div>
        }
      </header>
      <div className='content flex-grow flex items-center justify-center'>
        {!isLogged &&
          <Login onSubit={handleLogin} />
        }
        {isLogged && !phone &&
          <Phone onSubit={handlePhone} />
        }
        {isLogged && phone &&
          <Chat id={credentials.idInstance} token={credentials.apiTokenInstance} phone={phone} setLoading={setLoading} />
        }

      </div>
    </div>
  );
}

export default App;
