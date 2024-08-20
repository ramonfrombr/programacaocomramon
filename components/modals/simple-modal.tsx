"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";

interface ConfirmModalProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
}

export const SimpleModal = ({ children, trigger }: ConfirmModalProps) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="p-2">{children}</DialogContent>
    </Dialog>
  );
};
