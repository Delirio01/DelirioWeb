import { Link } from "react-router-dom";
import { Logo } from "./logo";
import InstaIcon from "../imports/InstaIcon";
import TikTokIcon from "../imports/TikTokIcon";
import XIcon from "../imports/XIcon";

export function LandingSiteFooter() {
  return (
    <footer id="footer" className="landing-footer">
      <div className="landing-container landing-footer-panel">
        <div className="landing-footer-top">
          <div className="landing-footer-brand-block">
            <div className="landing-footer-brand">
              <Logo color="white" width="34" height="46" />
            </div>
            <p className="landing-footer-tagline">A new way of shipping personal training for all</p>
            <div className="landing-footer-socials">
              <a href="https://x.com/Delirio1_" target="_blank" rel="noreferrer" aria-label="X">
                <XIcon color="white" />
              </a>
              <a href="https://www.instagram.com/delirio__official/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <InstaIcon color="white" />
              </a>
              <a href="https://www.tiktok.com/@delirio__official" target="_blank" rel="noreferrer" aria-label="TikTok">
                <TikTokIcon color="white" />
              </a>
            </div>
          </div>

          <div className="landing-footer-contact">
            <h2>Contact</h2>
            <a href="mailto:Delirio.0fficial0@gmail.com">Delirio.0fficial0@gmail.com</a>
            <a href="https://calendly.com/amiralsad/rush-advice" target="_blank" rel="noreferrer">
              Schedule Calendly meet
            </a>
          </div>
        </div>

        <div className="landing-footer-divider" />

        <div className="landing-footer-bottom">
          <p>&copy; 2026 Delirio</p>
          <div className="landing-footer-legal">
            <Link to="/terms">Terms of Services</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
