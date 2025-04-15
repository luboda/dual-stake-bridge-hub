import { useState, useCallback, useEffect } from "react";

// Toast types
export type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

type ToastActionType = {
  altText: string;
  onClick: () => void;
  children: React.ReactNode;
};

type ToastOptions = {
  title?: string;
  description?: string;
  action?: ToastActionType;
  variant?: "default" | "destructive";
  duration?: number;
};

// Create a unique ID for each toast
const createToastId = () => {
  return Math.random().toString(36).substring(2, 9);
};

const DEFAULT_TOAST_DURATION = 5000; // 5 seconds

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  // Remove a toast by ID
  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  // Add a new toast
  const addToast = useCallback((options: ToastOptions) => {
    const id = createToastId();
    const toast = { id, ...options };
    setToasts((prevToasts) => [...prevToasts, toast]);

    // Auto-dismiss toast after duration
    const duration = options.duration || DEFAULT_TOAST_DURATION;
    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  }, [removeToast]);

  // Toast function for external use
  const toast = useCallback(
    (options: ToastOptions) => {
      return addToast(options);
    },
    [addToast]
  );

  return {
    toasts,
    toast,
    removeToast,
  };
}

// Export a standalone toast function
export const toast = (options: ToastOptions) => {
  // This is a placeholder for the actual implementation
  // In a real app, this would use a context or event system
  console.log("Toast:", options);
};
