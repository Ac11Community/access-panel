import { A11yWatchProvider } from "@a11ywatch/react-a11ywatch-js";
import { Program } from './Program';

export const App  = () => {
  return (
    <A11yWatchProvider persist>
      <Program />
    </A11yWatchProvider>
  );
}
