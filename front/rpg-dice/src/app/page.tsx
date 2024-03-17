import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "./auth/signin/page";

export const metadata: Metadata = {
  title:
    "Entrar",
  description: "Tela de login",
};
//<DefaultLayout> em todas as outras telas 
export default function Home() {
  return (
    <>
        <SignIn />
    </>
  );
}
