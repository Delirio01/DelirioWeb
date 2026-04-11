import { useEffect, useState, type ReactNode } from "react";
import { LandingSiteFooter } from "./LandingSiteFooter";
import { LandingSiteHeader } from "./LandingSiteHeader";
import "../styles/landing-redesign.css";

function goToHomeSection(sectionId: string) {
  if (window.location.pathname === "/") {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    return;
  }

  window.location.href = `/#${sectionId}`;
}

export function LandingLegalShell({
  children,
}: {
  children: ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="landing-shell">
      <LandingSiteHeader
        isScrolled={isScrolled}
        isStripVisible={false}
        showDownloadStrip={false}
        onFeaturesClick={() => goToHomeSection("features")}
        onPersonalitiesClick={() => goToHomeSection("form-feedback")}
        onSubscriptionClick={() => goToHomeSection("subscription")}
        downloadUrl="https://apps.apple.com/us/search?term=delirio%20fit"
      />

      <main className="landing-main">
        <div className="landing-container" style={{ paddingTop: "44px", paddingBottom: "112px" }}>
          {children}
        </div>
      </main>

      <LandingSiteFooter />
    </div>
  );
}
