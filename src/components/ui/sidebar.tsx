
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContextType | null>(null);

export const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const toggle = React.useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, ...props }, ref) => {
    const { isOpen } = useSidebar();
    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r bg-card/70 backdrop-blur-xl transition-all duration-300 dark:border-neutral-800",
          isOpen ? "w-64" : "w-16",
          className
        )}
        {...props}
      />
    );
  }
);
Sidebar.displayName = "Sidebar";

export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { toggle, isOpen } = useSidebar();
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn(
        "absolute left-4 top-4 z-50 h-8 w-8 rounded-full",
        className
      )}
      onClick={toggle}
      {...props}
    >
      {isOpen ? (
        <X className="h-4 w-4" />
      ) : (
        <Menu className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle Menu</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-1 flex-col overflow-hidden", className)}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen } = useSidebar();
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-14 items-center border-b px-4",
        isOpen ? "justify-between" : "justify-center",
        className
      )}
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader";

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center border-t p-4", className)}
      {...props}
    />
  );
});
SidebarFooter.displayName = "SidebarFooter";

export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1 px-2 py-2", className)}
      {...props}
    />
  );
});
SidebarGroup.displayName = "SidebarGroup";

export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen } = useSidebar();
  if (!isOpen) return null;
  return (
    <div
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground",
        className
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
});
SidebarGroupContent.displayName = "SidebarGroupContent";

export const SidebarMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
});
SidebarMenu.displayName = "SidebarMenu";

export const SidebarMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
});
SidebarMenuItem.displayName = "SidebarMenuItem";

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
  }
>(({ className, asChild = false, ...props }, ref) => {
  const { isOpen } = useSidebar();
  const Comp = asChild ? React.Fragment : "button";
  return (
    <Comp
      ref={ref}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        isOpen ? "justify-start" : "justify-center",
        className
      )}
      {...(asChild ? {} : props)}
    >
      {asChild ? props.children : null}
    </Comp>
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";
