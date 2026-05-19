import { useEffect } from "react";
import { LandingLegalShell } from "./LandingLegalShell";

export default function DataDeletion() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LandingLegalShell>
      <div id="data-deletion" className="max-w-3xl mx-auto px-6 py-10 md:py-16">
        <h1 className="text-4xl font-bold mb-8">Data Deletion</h1>
        <p className="mb-4">
          To request deletion of your data, email{" "}
          <a href="mailto:contact@delirio.fit?subject=Data%20Deletion%20Request" className="text-blue-600 underline">
            contact@delirio.fit
          </a>{" "}
          with subject &ldquo;Data Deletion Request&rdquo;. We will confirm receipt within 7 days and complete deletion
          within 30 days.
        </p>
      </div>
    </LandingLegalShell>
  );
}
