import { Suspense } from "react";
import LoginContent from "../_components/LoginContent";
import GlobalLoading from "@/components/ui/global-loading";

export default function LoginPage() {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <LoginContent />
    </Suspense>
  );
}
