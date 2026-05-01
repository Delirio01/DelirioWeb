import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SmartBanner } from "smartbanner-tsx";
import { Logo } from "./logo";
import irisDefault from "../images/emojis/Iris/Iris_default_1.png";
import reedDefault from "../images/emojis/Reed/Reed_default_1.png";
import "smartbanner-tsx/dist/style.css";

const TESTFLIGHT_DOWNLOAD_URL = import.meta.env.VITE_TESTFLIGHT_URL || "https://testflight.apple.com/";
const SMART_BANNER_META = {
  ios: "delirio-smart-banner-ios-app",
  android: "delirio-smart-banner-android-app",
};

function clearSmartBannerClosedCookie() {
  document.cookie = "smartbanner-closed=; Max-Age=0; path=/";
}

interface LandingSiteHeaderProps {
  isScrolled?: boolean;
  isStripVisible?: boolean;
  showDownloadStrip?: boolean;
  onFeaturesClick: () => void;
  onPersonalitiesClick: () => void;
  onSubscriptionClick: () => void;
  downloadUrl?: string;
}

export function LandingSiteHeader({
  isScrolled = false,
  isStripVisible,
  showDownloadStrip = true,
  onFeaturesClick,
  onPersonalitiesClick,
  onSubscriptionClick,
  downloadUrl = TESTFLIGHT_DOWNLOAD_URL,
}: LandingSiteHeaderProps) {
  const shouldShowStrip = isStripVisible ?? isScrolled;
  const [isSmartBannerReady, setIsSmartBannerReady] = useState(false);
  const smartBannerUrls = {
    ios: downloadUrl,
    android: downloadUrl,
  };

  useEffect(() => {
    clearSmartBannerClosedCookie();
    setIsSmartBannerReady(true);
  }, []);

  return (
    <>
      <header className={`landing-header ${isScrolled ? "landing-header--scrolled" : ""}`}>
        <div className="landing-container landing-header-inner">
          <Link className="landing-header-brand" to="/" aria-label="Delirio home">
            <Logo width="30" height="40" />
          </Link>

          <nav className="landing-header-nav" aria-label="Primary">
            <button type="button" onClick={onFeaturesClick}>
              Personal Trainers
            </button>
            <button type="button" className="landing-header-nav-item--with-icon" onClick={onPersonalitiesClick}>
              <img src={irisDefault} alt="" aria-hidden="true" loading="eager" fetchPriority="high" decoding="async" />
              <span>Realtime-Feedback</span>
              <img src={reedDefault} alt="" aria-hidden="true" loading="eager" fetchPriority="high" decoding="async" />
            </button>
            <button type="button" onClick={onSubscriptionClick}>
              Subscription
            </button>
          </nav>

          <div className="landing-header-spacer" aria-hidden="true" />
        </div>
      </header>
      {showDownloadStrip ? (
        <div
          className={`landing-header-download-strip ${shouldShowStrip ? "is-visible" : ""}`}
          role="region"
          aria-label="TestFlight beta download"
        >
          <div className="landing-container landing-header-download-inner">
            {isSmartBannerReady ? (
              <SmartBanner
                title="Delirio"
                author="Ready to download on TestFlight"
                translations={{
                  button: "Download",
                  price_ios: "Beta access",
                  store_ios: "TestFlight",
                }}
                meta={SMART_BANNER_META}
                url={smartBannerUrls}
                force={import.meta.env.DEV ? "ios" : undefined}
                placement="bottom"
                withPortal={false}
                disableHtmlMargin
                ignoreIosVersion
                daysHidden={0}
                onClose={clearSmartBannerClosedCookie}
                className="landing-testflight-smartbanner"
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
