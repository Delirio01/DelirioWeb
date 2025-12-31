function Group() {
  return (
    <div className="absolute contents h-[72.207px] left-[143px] top-[13px] w-[71.212px]">
      <div className="absolute flex items-center justify-center left-[175.18px] size-[27.679px] top-[25.71px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
        <div className="flex-none rotate-[201.302deg]">
          <div className="relative size-[21.374px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.3743 21.3743">
              <circle cx="10.6872" cy="10.6872" fill="var(--fill-0, black)" id="Ellipse 425" r="8.18715" stroke="var(--stroke-0, black)" strokeWidth="5" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[181.09px] size-[16.816px] top-[51.03px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
        <div className="flex-none rotate-[201.302deg]">
          <div className="relative size-[12.986px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.9857 12.9857">
              <circle cx="6.49287" cy="6.49287" fill="var(--fill-0, black)" id="Ellipse 427" r="3.99287" stroke="var(--stroke-0, black)" strokeWidth="5" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[159.58px] size-[16.733px] top-[30.07px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
        <div className="flex-none rotate-[201.302deg]">
          <div className="relative size-[12.922px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.9218 12.9218">
              <circle cx="6.46088" cy="6.46088" fill="var(--fill-0, black)" id="Ellipse 428" r="3.96088" stroke="var(--stroke-0, black)" strokeWidth="5" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[153.72px] size-[29.735px] top-[42.8px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "150" } as React.CSSProperties}>
        <div className="flex-none rotate-[201.302deg]">
          <div className="relative size-[22.962px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.9618 22.9618">
              <circle cx="11.4809" cy="11.4809" fill="var(--fill-0, black)" id="Ellipse 426" r="8.98088" stroke="var(--stroke-0, black)" strokeWidth="5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute backdrop-blur-[5px] backdrop-filter bg-[rgba(255,255,255,0.5)] h-[96px] left-0 top-0 w-[1420px]" />
      <Group />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents font-['Inter:Medium',sans-serif] font-medium leading-[normal] left-[242px] not-italic text-[16px] text-[rgba(0,0,0,0.75)] text-center text-nowrap top-[40px]">
      <p className="absolute left-[272.5px] top-[40px] translate-x-[-50%]">Product</p>
      <p className="absolute left-[374px] top-[40px] translate-x-[-50%]">Contact</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[1183px] top-[18px]">
      <div className="absolute bg-black h-[44px] left-[1183px] rounded-[10px] top-[18px] w-[162px]" />
      <div className="absolute font-['Big_Caslon:Medium',sans-serif] h-[20px] leading-[normal] left-[1263.5px] not-italic text-[16px] text-center text-white top-[30px] translate-x-[-50%] w-[121px]">
        <p className="mb-0">Joint our waitlist</p>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Header">
      <Group2 />
      <Group1 />
      <Group3 />
    </div>
  );
}

function Section() {
  return (
    <div className="bg-white h-[4268px] overflow-clip relative shrink-0 w-full" data-name="Section1">
      <Header />
    </div>
  );
}

export default function DelirioPrivacy() {
  return (
    <div className="bg-[rgba(255,255,255,0)] relative size-full" data-name="delirio/privacy">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start p-[10px] relative size-full">
          <Section />
        </div>
      </div>
    </div>
  );
}