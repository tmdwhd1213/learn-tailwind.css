import useUser from "@/libs/client/useUser";
import { useRouter } from "next/router";

export default function CheckedLogin() {
  const router = useRouter();
  const publicPath = "enter";
  useUser(router.pathname === `/${publicPath}` ? publicPath : undefined);

  return null;
}
