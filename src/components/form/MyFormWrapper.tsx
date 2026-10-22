/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface MyFormWrapperProps {
  onSubmit: (data: any) => void;
  className?: string;
  children: React.ReactNode;
  defaultValues?: any;
  resolver?: import("react-hook-form").Resolver<any, any>;
  setFormState?: (data: any) => void;
  resetOnSubmit?: boolean;
}

const MyFormWrapper = ({
  onSubmit,
  className,
  children,
  defaultValues,
  resolver,
  setFormState,
  resetOnSubmit = false,
}: MyFormWrapperProps) => {
  const methods = useForm({
    defaultValues,
    resolver,
  });
  const { handleSubmit, reset, control } = methods;

  // Watch the entire form state if external listener provided
  const formValues = useWatch({ control });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    if (setFormState) {
      setFormState(formValues);
    }
  }, [formValues, setFormState]);

  const submit = (data: any) => {
    onSubmit(data);
    if (resetOnSubmit) {
      reset();
    }
  };

  return (
    <FormProvider {...methods}>
      <form className={cn("w-full", className)} onSubmit={handleSubmit(submit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default MyFormWrapper;
