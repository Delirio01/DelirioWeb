import { Link } from "react-router-dom";
import { Logo } from "./logo";
import irisDefault from "../images/emojis/Iris/Iris_default_1.png";
import reedDefault from "../images/emojis/Reed/Reed_default_1.png";

interface LandingSiteHeaderProps {
  isScrolled?: boolean;
  onFeaturesClick: () => void;
  onPersonalitiesClick: () => void;
  onSubscriptionClick: () => void;
}

export function LandingSiteHeader({
  isScrolled = false,
  onFeaturesClick,
  onPersonalitiesClick,
  onSubscriptionClick,
}: LandingSiteHeaderProps) {
  return (
    <header className={`landing-header ${isScrolled ? "landing-header--scrolled" : ""}`}>
      <div className="landing-container landing-header-inner">
        <Link className="landing-header-brand" to="/" aria-label="Delirio home">
          <Logo width="30" height="40" />
        </Link>

        <nav className="landing-header-nav" aria-label="Primary">
          <button type="button" onClick={onFeaturesClick}>
            Features
          </button>
          <button type="button" className="landing-header-nav-item--with-icon" onClick={onPersonalitiesClick}>
            <img src={irisDefault} alt="" aria-hidden="true" loading="eager" fetchPriority="high" decoding="async" />
            <span>Personalities</span>
            <img src={reedDefault} alt="" aria-hidden="true" loading="eager" fetchPriority="high" decoding="async" />
          </button>
          <button type="button" onClick={onSubscriptionClick}>
            Subscription
          </button>
        </nav>

        <div className="landing-header-spacer" aria-hidden="true" />
      </div>
    </header>
  );
}
