import type { ReactNode } from "react";
import AppLayout from "../layouts/AppLayout";

interface RouteWrapperProps {
  children: ReactNode;
  title: string;
}

const RouteWrapper = ({ children, title }: RouteWrapperProps) => {
  return <AppLayout pageTitle={title}>{children}</AppLayout>;
};

export default RouteWrapper;
