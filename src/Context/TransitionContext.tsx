import React, { createContext, useContext, useRef, useEffect } from "react";
import { useRouter } from "next/router";

interface TransitionContextType {
  previousRoute: string | null;
  transitionDirection: number;
  setPreviousRoute: (route: string) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined
);

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const previousRouteRef = useRef<string | null>(null);
  const transitionDirectionRef = useRef<number>(1);

  const routeOrder = ["/", "/livetv", "/liveshows", "/mylist"];

  useEffect(() => {
    const currentRoute = router.pathname;
    const previousRoute = previousRouteRef.current;

    if (previousRoute) {
      const currentIndex = routeOrder.indexOf(currentRoute);
      const previousIndex = routeOrder.indexOf(previousRoute);

      if (currentIndex !== -1 && previousIndex !== -1) {
        transitionDirectionRef.current = currentIndex > previousIndex ? 1 : -1;
      }
    }

    previousRouteRef.current = currentRoute;
  }, [router.pathname]);

  const setPreviousRoute = (route: string) => {
    previousRouteRef.current = route;
  };

  return (
    <TransitionContext.Provider
      value={{
        previousRoute: previousRouteRef.current,
        transitionDirection: transitionDirectionRef.current,
        setPreviousRoute,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}
