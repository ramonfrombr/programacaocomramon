"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import React from "react";

interface ConfirmModalProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
}

export const SimpleModal = ({ children, trigger }: ConfirmModalProps) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="p-1">{children}</DialogContent>
    </Dialog>
  );
};
