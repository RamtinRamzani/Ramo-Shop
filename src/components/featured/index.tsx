import {
  FeaturedSvg1,
  FeaturedSvg2,
  FeaturedSvg3,
  FeaturedSvg4,
  FeaturedSvg5,
  FeaturedSvg6,
} from "../../assets/Svg";
import MainContainer from "../../ui/MainContainer";
import { useMarqueeAnimation } from "../../hooks/useMarqueeAnimation ";
import { Fragment } from "react/jsx-runtime";

export default function Featured() {
  const { containerRef } = useMarqueeAnimation();

  return (
    <section>
      <MainContainer className="overflow-hidden">
        <div className="relative flex items-center">
          {/* Sliding Wrapper */}
          <div ref={containerRef} className="flex gap-6">
            {[...Array(2)].map((_, index) => (
              <Fragment key={index}>
                <div className="shrink-0">
                  <FeaturedSvg1 />
                </div>
                <div className="shrink-0">
                  <FeaturedSvg2 />
                </div>
                <div className="shrink-0">
                  <FeaturedSvg3 />
                </div>
                <div className="shrink-0">
                  <FeaturedSvg4 />
                </div>
                <div className="shrink-0">
                  <FeaturedSvg5 />
                </div>
                <div className="shrink-0">
                  <FeaturedSvg6 />
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
