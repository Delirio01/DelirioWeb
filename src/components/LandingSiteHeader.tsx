import { Link } from "react-router-dom";
import { Logo } from "./logo";
import irisDefault from "../images/emojis/Iris/Iris_default_1.png";
import reedDefault from "../images/emojis/Reed/Reed_default_1.png";
import appStoreBadge from "../images/appleOfficialBadges/Mobile app store badge.svg";

interface LandingSiteHeaderProps {
  isScrolled?: boolean;
  isStripVisible?: boolean;
  onFeaturesClick: () => void;
  onPersonalitiesClick: () => void;
  onSubscriptionClick: () => void;
  downloadUrl?: string;
}

export function LandingSiteHeader({
  isScrolled = false,
  isStripVisible,
  onFeaturesClick,
  onPersonalitiesClick,
  onSubscriptionClick,
  downloadUrl = "https://apps.apple.com/us/search?term=delirio%20fit",
}: LandingSiteHeaderProps) {
  const shouldShowStrip = isStripVisible ?? isScrolled;

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
      <div
        className={`landing-header-download-strip ${shouldShowStrip ? "is-visible" : ""}`}
        role="region"
        aria-label="App download"
      >
        <div className="landing-container landing-header-download-inner">
          <p className="landing-header-download-copy">Download Delirio on the App Store</p>
          <a className="landing-header-download-cta" href={downloadUrl} target="_blank" rel="noreferrer">
            <img className="landing-header-badge" src={appStoreBadge} alt="Download on the App Store" />
          </a>
        </div>
      </div>
    </>
  );
}
