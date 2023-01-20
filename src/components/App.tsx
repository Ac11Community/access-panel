import { A11yWatchProvider, setAPIURL } from "@a11ywatch/react-a11ywatch-js";
import { Program } from './Program';

export const App  = () => {
  setAPIURL(import.meta.env.NEXT_PUBLIC_A11YWATCH_API || import.meta.env.PUBLIC_API || "http://localhost:3280");

  return (
    <A11yWatchProvider persist>
      <Program />
    </A11yWatchProvider>
  );
}
