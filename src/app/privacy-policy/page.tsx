import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { formattedAddress } from "@/lib/config-utils";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.companyName} collects, uses, stores and protects personal information submitted through this website.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const { companyName, contact } = siteConfig;
  return (
    <LegalPage title="Privacy Policy" intro="How we collect, use and protect your personal information." path="/privacy-policy" lastUpdated="[DATE]">
      <p>
        {companyName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your privacy and handling your personal information securely and
        confidentially. This policy explains what information we collect through this website, how we use it and the choices you have.
      </p>

      <h2>1. Who we are</h2>
      <p>
        {companyName} is the data controller responsible for personal information collected through this website. Our office is at {formattedAddress()}. You can contact us at{" "}
        {contact.email} or {contact.phone}.
      </p>

      <h2>2. Information we collect</h2>
      <p>We only collect the information needed to respond to your enquiry. Depending on the form you use, this may include:</p>
      <ul>
        <li>Contact details — name, email address, phone number and company name.</li>
        <li>Business information — business type, industry, location, broad turnover range and number of employees.</li>
        <li>Enquiry details — the services you are interested in, preferred contact method and time, and any message you choose to send.</li>
        <li>Technical information — such as browser type and pages visited, collected through server logs to keep the site secure and working.</li>
      </ul>
      <p>
        Our website forms do not ask for bank details, passwords, tax identification numbers or other sensitive financial information. Please do not include such information in
        form messages.
      </p>

      <h2>3. How we use your information</h2>
      <ul>
        <li>To respond to enquiries, quotation requests, consultation bookings and callback requests.</li>
        <li>To prepare quotations and, if you become a client, to provide our services.</li>
        <li>To keep our website secure and prevent spam or misuse.</li>
        <li>To meet our legal, regulatory and professional obligations.</li>
      </ul>
      <p>[State the lawful bases you rely on, e.g. consent, steps prior to entering a contract, legitimate interests and legal obligations, as required in your jurisdiction.]</p>

      <h2>4. WhatsApp</h2>
      <p>
        If you choose to contact us via WhatsApp, the message is sent through WhatsApp, which is operated by a third party under its own privacy policy. When you use the
        &ldquo;Send via WhatsApp&rdquo; option on our quote form, your details are placed into a WhatsApp message on your own device — nothing is sent until you press send.
      </p>

      <h2>5. Sharing your information</h2>
      <p>
        We do not sell your personal information. We share it only with trusted service providers who help us operate our business (for example, email, hosting and practice
        management systems), under appropriate confidentiality and data-protection terms, or where required by law or professional regulation.
      </p>

      <h2>6. Data security</h2>
      <p>
        We use appropriate technical and organisational measures to protect personal information, including encrypted connections (HTTPS), access controls and secure
        systems. No method of transmission over the internet is completely secure, but we work to protect your information.
      </p>

      <h2>7. How long we keep information</h2>
      <p>[Describe retention periods for enquiries that do not become client engagements, and for client records in line with professional and legal requirements.]</p>

      <h2>8. Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct or delete your personal information, to object to or restrict certain processing, and to
        withdraw consent. To exercise these rights, contact us at {contact.email}. You may also have the right to complain to your local data-protection authority.
      </p>

      <h2>9. Cookies</h2>
      <p>
        This website uses only the cookies and storage strictly necessary for it to function. [If you add analytics or marketing tools, update this section and implement a
        consent mechanism where required.]
      </p>

      <h2>10. Changes to this policy</h2>
      <p>We may update this policy from time to time. The &ldquo;last updated&rdquo; date above shows when it was last revised.</p>
    </LegalPage>
  );
}
