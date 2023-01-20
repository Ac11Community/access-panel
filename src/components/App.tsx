import { A11yWatchProvider, setAPIURL } from "@a11ywatch/react-a11ywatch-js";
import { Program } from './Program';

setAPIURL(import.meta.env.NEXT_PUBLIC_A11YWATCH_API || import.meta.env.API || "http://localhost:3280");

export const App  = () => {
  return (
    <A11yWatchProvider persist>
      <Program />
    </A11yWatchProvider>
  );
}
