import React from 'react'
import {
  AuditForm,
  AuditList,
  AuditProvider,
  SignOnForm,
  useA11yWatchContext,
} from "@a11ywatch/react-a11ywatch-js";

export const Audit = () => {
  const { account } = useA11yWatchContext();

  return account.authed ? (
    <AuditProvider>
      <AuditForm />
      <AuditList />
    </AuditProvider>
  ) : (
    <SignOnForm />
  );
};
