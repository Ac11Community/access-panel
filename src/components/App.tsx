import { FC } from 'react'
import { A11yWatchProvider, setAPIURL } from "@a11ywatch/react-a11ywatch-js";
import { Program } from './Program';

type Application = {
  apiUrl?: string; // the API instance endpoint
}

export const App: FC<Application>  = ({ apiUrl }) => {
  setAPIURL(apiUrl || "http://localhost:3280");

  return (
    <div className='py-4'>
      <A11yWatchProvider persist>
        <Program />
      </A11yWatchProvider>
    </div>
  );
}
