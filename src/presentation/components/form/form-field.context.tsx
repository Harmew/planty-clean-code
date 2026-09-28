import React from "react";

import type { FormFieldContextValue } from "./types";

export const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

export function useFormField() {
  const context = React.useContext(FormFieldContext);

  if (!context) {
    throw new Error("useFormField must be used inside FormField");
  }

  return context;
}
