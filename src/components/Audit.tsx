import {
  AuditList,
  AuditProvider,
  FormDialog,
  SignOnForm,
  useA11yWatchContext,
} from "@a11ywatch/react-a11ywatch-js";

export const Audit = () => {
  const { account } = useA11yWatchContext();

  return account.authed ? (
    <AuditProvider multi>
        <FormDialog 
          buttonTitle="Run Audit" 
          subTitle="Add a url to analyze below." 
          submitTitle="Submit" 
          viewConfigs={{ disabled: {lighthouse: true }}}
        />
        <div className={"bg-white dark:bg-black"}>
          <AuditList />
        </div>
    </AuditProvider>
  ) : (
    <SignOnForm />
  );
};
