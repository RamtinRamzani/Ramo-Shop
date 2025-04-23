import { Input } from "@heroui/react";
import MainContainer from "../../ui/MainContainer";
import Info from "./Info";
import JoinNewsLetter from "./JoinNewsLetter";
import Ramo from "./Ramo";
import Page from "./Page";

export default function Footer() {
  return (
    <footer>
      <div className="relative">
        {/* Light mode image */}
        <img
          src="/images/hero-02.png"
          className="w-full h-80 dark:hidden"
          alt="sofa"
        />
        {/* Dark mode image */}
        <img
          src="/images/hero-02B.jpg"
          className="w-full h-80 hidden dark:block"
          alt="sofa"
        />
        <div className="absolute translate-x-1/2 top-1/4 right-1/2">
          <h3 className="~text-2xl/4xl min-w-64 text-center font-semibold text-neutral-07 dark:text-grey-200">
            Join Our Newsletter
          </h3>
          <p className="~mt-2/4 ~text-sm/base text-center text-neutral-05 dark:text-grey-400">
            Sign up for deals, new products and promotions
          </p>
          <Input
            label="Email Address"
            type="text"
            id="name"
            variant="underlined"
            size="sm"
            className="~mt-2/6 placeholder:text-sm ~w-32/72 mx-auto"
          />
        </div>
      </div>
      <div className="bg-neutral-07">
        <MainContainer className="bg-neutral-07 flex flex-col justify-center max-sm:text-center sm:grid sm:gap-16 gap-8 grid-cols-2 sm:grid-cols-[2fr_1fr_1fr_2fr] ~pt-8/20 pb-10 text-neutral-04 ~text-xs/lg">
          <Ramo />
          <Page />
          <Info />
          <JoinNewsLetter />
        </MainContainer>
      </div>
    </footer>
  );
}
