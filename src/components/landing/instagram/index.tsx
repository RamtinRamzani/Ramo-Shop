import MainContainer from "../../../ui/MainContainer";

export default function Instagram() {
  return (
    <MainContainer className="flex flex-col items-center pb-10 ~mt-16/24">
      <div className="flex flex-col items-center mb-10">
        <span className="mb-2 text-xs font-semibold text-neutral-05 dark:text-grey-300">
          NEWSFEED
        </span>
        <h3 className="mb-4 text-5xl font-semibold">Instagram</h3>
        <span className="mb-2 ~text-sm/lg text-neutral-05 text-center dark:text-grey-400">
          Follow us on social media for more discount & promotions
        </span>
        <span className="text-neutral-04">@3legant_official</span>
      </div>
      <div className="flex flex-col w-full gap-8 sm:flex-row">
        <img
          className="h-full sm:w-1/3 md:w-1/4"
          src="/images/instagram1.png"
        />
        <img
          className="h-full sm:w-1/3 md:w-1/4"
          src="/images/instagram2.png"
        />
        <img
          className="hidden w-1/3 h-full sm:block md:w-1/4"
          src="/images/instagram3.png"
        />
        <img
          className="hidden w-1/4 h-full md:block"
          src="/images/instagram4.png"
        />
      </div>
    </MainContainer>
  );
}
