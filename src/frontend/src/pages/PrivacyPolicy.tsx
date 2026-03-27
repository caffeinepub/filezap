export default function PrivacyPolicy() {
  document.title = "Privacy Policy — BoltTools.app";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <article className="prose prose-invert prose-sm max-w-none">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground text-sm">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <p>
          BoltTools.app is committed to protecting your privacy. This policy
          explains how we handle information when you use our tools.
        </p>

        <h2>File Processing</h2>
        <p>
          <strong>All file processing happens locally in your browser.</strong>{" "}
          We do not upload, store, or transmit your files to any server. When
          you use any of our PDF or image tools, your files are loaded into your
          browser's memory (RAM), processed using WebAssembly and JavaScript,
          and the result is made available for download — entirely on your
          device. No file data ever leaves your computer or phone.
        </p>
        <p>
          This is a technical guarantee, not just a promise: our infrastructure
          has no file upload endpoints. It is architecturally impossible for
          your files to be stored on our servers.
        </p>

        <h2>Cookies &amp; Advertising</h2>
        <p>
          BoltTools.app uses Google AdSense to display advertisements. Google
          AdSense uses cookies — including the DoubleClick cookie — to serve ads
          based on your prior visits to this website or other websites. These
          cookies are managed by Google, not by BoltTools.app.
        </p>
        <p>
          You may opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google's Ads Settings
          </a>
          , or by visiting{" "}
          <a
            href="http://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer"
          >
            aboutads.info
          </a>
          . You can also opt out of third-party vendor cookies for personalized
          advertising at{" "}
          <a
            href="http://www.networkadvertising.org/managing/opt_out.asp"
            target="_blank"
            rel="noopener noreferrer"
          >
            networkadvertising.org
          </a>
          .
        </p>
        <p>
          For more information about how Google uses data from sites that use
          Google services, visit{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google's Privacy &amp; Terms
          </a>
          .
        </p>

        <h2>Analytics</h2>
        <p>
          We collect basic, anonymized usage data — such as which tools are
          used, how many files are processed per hour, and which pages are
          visited. This data contains no personally identifiable information and
          no file content. It is used solely to understand how the platform is
          used and to improve the tools.
        </p>

        <h2>Data We Collect</h2>
        <ul>
          <li>
            <strong>Server logs:</strong> Standard web server logs may contain
            your IP address, browser type, operating system, and pages visited.
            These logs are retained for up to 30 days for security and abuse
            prevention purposes.
          </li>
          <li>
            <strong>localStorage:</strong> We store small pieces of data in your
            browser's localStorage (e.g., which tools you last used, recent
            merge history) to improve your experience. This data never leaves
            your device.
          </li>
          <li>
            <strong>No file content:</strong> We never collect, store, or
            transmit any part of the files you process.
          </li>
        </ul>

        <h2>Your Rights (GDPR / CCPA)</h2>
        <p>
          If you are located in the European Union or California, you have
          specific rights regarding your personal data:
        </p>
        <ul>
          <li>The right to access data we hold about you</li>
          <li>The right to request deletion of your data</li>
          <li>The right to object to data processing</li>
          <li>The right to data portability</li>
        </ul>
        <p>
          Since we collect minimal data and no file content, there is very
          little personal data associated with your use of BoltTools.app. To
          exercise any of these rights, contact us at the email below.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          BoltTools.app is not directed at children under 13. We do not
          knowingly collect personal information from children.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Changes will be
          posted on this page with an updated date. Continued use of the service
          after changes constitutes acceptance of the updated policy.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy-related questions or requests, contact us at:{" "}
          <a href="mailto:privacy@bolttools.app">privacy@bolttools.app</a>
        </p>
      </article>
    </div>
  );
}
