import svgPaths from "./svg-i51uu4tyf";

function UiIconSearchLight({ className }: { className?: string }) {
  return (
    <div className={className || "overflow-clip relative size-[24px]"} data-name="UI icon/search/light">
      <div className="absolute inset-[8.33%_12.5%_12.5%_8.33%]" data-name="Union">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
          <path clipRule="evenodd" d={svgPaths.p31c158f0} fill="var(--fill-0, #35383F)" fillRule="evenodd" id="Union" />
        </svg>
      </div>
    </div>
  );
}
type FrameProps = {
  className?: string;
  property1?: "black" | "Variant3" | "white/outlined" | "black/outlined" | "White" | "Variant6";
};

export default function Frame({ className, property1 = "White" }: FrameProps) {
  if (property1 === "white/outlined") {
    return (
      <div className={className || "content-stretch flex items-center justify-center overflow-clip px-[40px] py-[20px] relative rounded-[60px]"} data-name="Property 1=white/outlined">
        <p className="[word-break:break-word] font-['Kanit:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-white tracking-[-0.3px] whitespace-nowrap">Home</p>
      </div>
    );
  }
  if (property1 === "Variant6") {
    return (
      <div className={className || "bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center overflow-clip px-[40px] py-[20px] relative rounded-[60px]"} data-name="Property 1=Variant6">
        <p className="[word-break:break-word] font-['Kanit:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-white tracking-[-0.3px] whitespace-nowrap">Home</p>
      </div>
    );
  }
  if (property1 === "black") {
    return (
      <button className={className || "bg-[#10110e] cursor-pointer relative rounded-[60px]"} data-name="Property 1=black">
        <div className="content-stretch flex items-center justify-center overflow-clip px-[40px] py-[20px] relative rounded-[inherit] size-full">
          <p className="[word-break:break-word] font-['Kanit:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[25.692px] text-left text-white tracking-[-0.3854px] whitespace-nowrap">Home</p>
        </div>
        <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[60px]" />
      </button>
    );
  }
  if (property1 === "black/outlined") {
    return (
      <div className={className || "relative rounded-[60px]"} data-name="Property 1=black/outlined">
        <div className="content-stretch flex items-center justify-center overflow-clip px-[40px] py-[20px] relative rounded-[inherit] size-full">
          <p className="[word-break:break-word] font-['Kanit:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0d0d0d] text-[25.692px] tracking-[-0.3854px] whitespace-nowrap">Home</p>
        </div>
        <div aria-hidden className="absolute border border-[#0d0d0d] border-solid inset-0 pointer-events-none rounded-[60px]" />
      </div>
    );
  }
  if (property1 === "Variant3") {
    return (
      <div className={className || "bg-[#10110e] relative rounded-[60px]"} data-name="Property 1=Variant3">
        <div className="content-stretch flex items-center justify-center overflow-clip px-[40px] py-[20px] relative rounded-[inherit] size-full">
          <UiIconSearchLight className="overflow-clip relative shrink-0 size-[24px]" />
        </div>
        <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[60px]" />
      </div>
    );
  }
  return (
    <button className={className || "bg-[#48c6ec] content-stretch cursor-pointer flex items-center justify-center overflow-clip px-[40px] py-[20px] relative rounded-[60px]"} data-name="Property 1=White">
      <p className="[word-break:break-word] font-['Kanit:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-left text-white tracking-[-0.3px] whitespace-nowrap">Home</p>
    </button>
  );
}