import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: `Terms and conditions governing the use of the ${siteConfig.companyName} website.`,
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  const { companyName, contact } = siteConfig;
  return (
    <LegalPage title="Terms & Conditions" intro="The terms that apply when you use this website." path="/terms-and-conditions" lastUpdated="[DATE]">
      <p>
        These terms govern your use of the {companyName} website. By using the website you accept these terms. If you do not agree, please do not use the website.
      </p>

      <h2>1. About us</h2>
      <p>
        This website is operated by {companyName}. [Insert registered name, registration number, registered office and, where applicable, details of {siteConfig.regulatoryBody}{" "}
        membership or regulation.]
      </p>

      <h2>2. Information on this website</h2>
      <p>
        Content on this website, including articles in our resource centre, is provided for general information only. It is not professional advice and should not be relied on
        as such. Tax, accounting and legal rules vary by jurisdiction and change over time. You should obtain advice specific to your circumstances before acting.
      </p>

      <h2>3. Quotations and engagements</h2>
      <p>
        Quotations provided in response to website enquiries are estimates based on the information supplied. A client relationship is only formed when both parties sign an
        engagement letter setting out the scope of services, fees and terms of business. Submitting a form does not create a client relationship.
      </p>

      <h2>4. Use of the website</h2>
      <ul>
        <li>You must not use the website for any unlawful purpose or in a way that could damage, disable or impair it.</li>
        <li>You must not attempt to gain unauthorised access to the website, its server or any connected systems.</li>
        <li>You must not submit false information or information belonging to another person without authority.</li>
      </ul>

      <h2>5. Intellectual property</h2>
      <p>
        The content, design and graphics on this website are owned by or licensed to {companyName}. You may view and print pages for personal, non-commercial use, but may not
        reproduce or republish content without our written permission.
      </p>

      <h2>6. Third-party links and services</h2>
      <p>
        The website may link to third-party websites and services, including WhatsApp and social networks. We are not responsible for their content or privacy practices.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the extent permitted by law, {companyName} is not liable for any loss arising from reliance on general information published on this website. Nothing in these terms
        limits liability that cannot be limited by law. [Have this clause reviewed for your jurisdiction.]
      </p>

      <h2>8. Privacy</h2>
      <p>
        Our use of personal information is described in our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>9. Governing law</h2>
      <p>These terms are governed by the laws of [JURISDICTION], and the courts of [JURISDICTION] have jurisdiction over any disputes.</p>

      <h2>10. Contact</h2>
      <p>
        Questions about these terms can be sent to {contact.email}.
      </p>
    </LegalPage>
  );
}
