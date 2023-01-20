import { A11yWatchProvider, setAPIURL } from "@a11ywatch/react-a11ywatch-js";
import { Program } from './Program';

// todo: replace with prod url
setAPIURL(import.meta.env.API || "http://localhost:3280");

export const App  = () => {
  return (
    <A11yWatchProvider persist>
      <Program />
    </A11yWatchProvider>
  );
}
