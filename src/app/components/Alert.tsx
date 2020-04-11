import React from 'react';

export type AlertProps = {
  text?: string;
  children?: React.ReactNode;
  theme?: string;
}

function getAlertThemeClasses(theme?: string): string {
  const baseAlertClasses = 'alert alert-white';
  switch (theme) {
    case 'primary': return `${ baseAlertClasses } text-primary border-primary`
    case 'danger': return `${ baseAlertClasses } text-danger border-danger`;
    default: return 'alert alert-white';
  }
}

function Alert(props: AlertProps) {
  return <div className={getAlertThemeClasses(props.theme)} role="alert">
    {props.children == null ? props.text : props.children}
  </div>
}

export default Alert;