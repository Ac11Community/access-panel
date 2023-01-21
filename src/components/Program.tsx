import React from 'react'
import {
  SignOnForm,
  useA11yWatchContext,
} from "@a11ywatch/react-a11ywatch-js";
import { Audit } from './Audit'

export const CoreProgram = () => {
  const { account } = useA11yWatchContext();

  return account.authed ? (
    <Audit />
  ) : (
    <SignOnForm />
  );
};

// top level wrap app
export const Program = () => {
  return <CoreProgram />;
}
