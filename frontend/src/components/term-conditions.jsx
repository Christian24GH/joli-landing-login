import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="text-sm text-muted-foreground mt-4 px-2 text-center">
      By logging in, you agree to our{" "}
      <a
        href="/terms"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        Terms and Conditions
      </a>{" "}
      and{" "}
      <a
        href="/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        Privacy Policy
      </a>
      . Please make sure to read and understand them before accessing your
      account.
    </div>
  );
}
