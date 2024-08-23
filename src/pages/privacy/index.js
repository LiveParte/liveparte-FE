import Footer from "@/components/Common/Footer";
import NoAuth from "@/components/Layout/NoAuth";
import PrivacyTermsLayout from "@/components/Layout/Privacy&TermsLayout";
import Image from "next/image";
import React, { useState } from "react";
import { TableBodyData, TableHeader } from "../../components/modules/Privacy/_data/Data";

export default function privacy() {
  // const [selectTab, setSelectTab] = useState("privacy");
  return (
    <PrivacyTermsLayout>
      <div className="w-full">
        <div className="text-[45px] font-1 font-medium text-white mb-[40px]">
          Privacy Policy
        </div>
        <div className="text-[14px] text-white font500">
          <div className=" text-[14px] font500 text-white mb-[10px]">
            Liveparte (“we,” “us” or “Liveparte”) cares about protecting the
            privacy of our “Attendees,” “Event Producers,” and other visitors
            (collectively, our “Users” or “you”) who use our websites, products
            or services (collectively, the “Services”). This privacy policy
            (“Privacy Policy”) provides details about how we collect, share and
            use the information collected through the use our Services as a data
            controller.
          </div>
          <div>
            By visiting our websites and using the Services, you agree to the
            terms of this Privacy Policy, our Terms of Service, and Community
            Guidelines as they may be amended from time to time. Capitalized
            terms not defined herein are as defined in our Terms of Service.
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Information We Collect
            </div>
            <div className="mb-[10px]">
              The information we collect from you depends on whether you are
              merely browsing our website as a general User or whether you
              choose to register for an Attendee and/or Event Producer account.
              In the course of your use of the Services, we obtain the following
              information about you as described below.
            </div>
            <div>
              <div className="font500 text-[18px] mb-2">
                a. Signing Up for Services as an Attendee and/or Event Producer
              </div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
                  To create an Attendee account with Liveparte, you must provide
                  a name, phone number, working email address and create a
                  password for your Attendee account. You may also choose to add
                  a username and avatar to your Profile. We collect this
                  information to perform our commercial contract with you and if
                  you choose to receive marketing communications, on the basis
                  of your consent. This information is not shared with Event
                  Producers unless you make a purchase.
                </li>
                <li className="mb-3">
                  To make an Attendee purchase from an Event Producer, you must
                  also provide your shipping address and email address in case
                  Liveparte or your Event Producer needs to contact you about
                  your purchase. We and your Event Producer will use this
                  information to perform our respective commercial contracts
                  with you and if you choose to receive marketing
                  communications, on the basis of your consent. Liveparte will
                  also collect your payment card information to fulfill your
                  purchase. However, payment card information is processed by a
                  third-party payment processor. We do not store your payment
                  card information in complete form within our systems and we do
                  not share it with your Event Producer in any form.
                </li>
                <li className="mb-3">
                  To create an Event Producer account with Liveparte, you must
                  provide a working email address (so we can communicate with
                  you about the account), create a password for the account,
                  provide your bank account details (so we can pay you any
                  amounts due under Section 5 of the Terms of Service) and
                  provide a photograph and/or logo for the account branding. We
                  collect all of this information to perform our commercial
                  contract with you.
                </li>
              </ul>
            </div>

            <div>
              <div className="font500 text-[18px] mb-2">
                b. Use of Services, Website Visits and Support
              </div>
              <div className="mb-2">
                We use cookies, web beacons, local storage objects, pixels and
                other technologies that operate on the Services. These
                technologies may collect technical data relating to your online
                activity on our website with respect to our Services, including
                the following:
              </div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">IP address;</li>
                <li className="mb-3">browser type and version;</li>
                <li className="mb-3">geographic location;</li>
                <li className="mb-3">
                  the time, date, and length of time you use our Services;
                </li>
                <li className="mb-3">
                  ages you view, including the time spent on each page and
                  clicks on each page;
                </li>
                <li className="mb-3">
                  how you got to our Services (i.e., referring URL) and any
                  links you click on to leave our Services;
                </li>
                <li className="mb-3">
                  when you update your information, communicate with us, or
                  order new Services;
                </li>
                <li className="mb-3">
                  metadata about your use and your contacts’ use of our Services
                  and your emails you send (including clicks and opens); and
                </li>
                <li className="mb-3">other interactions with our Services.</li>
                <div>
                  You can adjust the permissions within your browser or device
                  operating system. However, if you set your browser to disable
                  certain technologies, such as cookies, some features of the
                  Services may not function properly.
                </div>
              </ul>
            </div>
          </div>
          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              How We Use Your Information
            </div>
            <div className="mb-[10px]">
              We have a legitimate interest in running a successful and
              efficient business and in providing you with Services and useful
              content, and we use the information we collect, both on its own
              and combined with any other information we collect about you, for
              the following purposes:
            </div>
            <div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
                  To provide the requested Services to you, and if you are an
                  Attendee, to facilitate the provision of requested services by
                  your Event Producer;
                </li>
                <li className="mb-3">To provide you with useful content;</li>
                <li className="mb-3">
                  To ensure the proper functioning of our Services;
                </li>
                <li className="mb-3">To offer and improve our Services;</li>
                <li className="mb-3">
                  To provide you with requested information or technical
                  support;
                </li>
                <li className="mb-3">
                  To facilitate your movement through our website or your use of
                  our Services;
                </li>
                <li className="mb-3">
                  To do a better job of advertising and marketing our Services
                  (our use of your information to do this is performed with your
                  consent where required by applicable law);
                </li>
                <li className="mb-3">
                  To diagnose problems with our servers or our Services;
                </li>
                <li className="mb-3">
                  In connection with our security and compliance programs,
                  including to prevent, detect, and take action against fraud or
                  misuse of our Services, to establish, defend or protect our
                  legal rights or interests, and to comply with our financial or
                  legal obligations;
                </li>
                <li className="mb-3">To administer our websites;</li>
                <li className="mb-3">To communicate with you;</li>
                <li className="mb-3">
                  To assist us in offering you a personalized experience or
                  otherwise tailor our Services to you; and
                </li>
                <li className="mb-3">
                  As otherwise described in this privacy policy.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Sharing of Information
            </div>
            <div className="mb-[10px]">
              We may share certain personal information as further described
              below.
            </div>
            <div className="mb-4">
              <div className="font500 text-[18px] mb-2">
                a. Sharing Attendee Information with Event Producers
              </div>
              <div className="mb-2">
                When an Attendee purchases a Ticket from an Event Producer, we
                must share your name, shipping address, and email address in
                order for your Event Producer to:
              </div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
                  assist you in using our products and services,
                </li>
                <li className="mb-3">
                  contact you with offers, services or products that may be of
                  interest to you (on the basis of consent, where such is
                  required by applicable law), and
                </li>
                <li className="mb-3">
                  provide you with their products or services.{" "}
                </li>
              </ul>

              <div className="mb-3">
                Event Producers are independent controllers of your information.
                However, they are prohibited by this Policy and our Terms of
                Service from using Attendee contact information for any purpose
                beyond those set forth above without the Attendee’s consent.
              </div>
            </div>

            <div className="mb-4">
              <div className="font500 text-[18px] mb-2">
                b. Sharing with Third Party Service Providers and Vendors
              </div>
              <div className="mb-2">
                We engage third parties so that they can assist us in servicing
                you with things such as customer service, payment processing,
                email, information technology services, and information storage
                services, with the understanding that such third parties will
                use any personal information that is shared for their limited
                purposes as a service provider and in accordance with our
                Privacy Policy.
              </div>
            </div>
            <div className="mb-4">
              <div className="font500 text-[18px] mb-2">
                c. Corporate Reorganizations
              </div>
              <div className="mb-2">
                If we are involved in a merger, acquisition, a sale of all or a
                substantial portion of our assets, or other similar sale
                transaction, your information will be transferred as part of
                that transaction. We will notify you by email and/or a prominent
                notice on our website of any such transfer and any choices you
                may have regarding your information.{" "}
              </div>
            </div>

            <div className="mb-4">
              <div className="font500 text-[18px] mb-2">
                d. Legal Process and Protection from Harm
              </div>
              <div className="mb-2">
                Lastly, if legally required to do so, or if we have a good faith
                belief that such disclosure is reasonably necessary, we may
                disclose your personal information to courts of law, law
                enforcement authorities and other relevant third parties, (i) to
                conduct an investigation, (ii) to respond to a third party or
                law enforcement subpoena or court order, or (iii) to bring legal
                action, prevent harm to others or pursue other relief, in each
                aforementioned case when you or a third party are or may be:
              </div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
                  violating our terms and conditions of use;
                </li>
                <li className="mb-3">
                  causing injury or other harm to, or otherwise violating the
                  property or other legal rights, of us, other users, or third
                  parties; or
                </li>
                <li className="mb-3">
                  violating federal, state, local, or other applicable law.{" "}
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="font500 text-[18px] mb-2">
                e. Non-Personal Information
              </div>
              <div className="mb-2">
                We may share aggregate, anonymized, or deidentified information
                about Users with other entities for marketing, advertising,
                research or similar purposes.
              </div>
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Security
            </div>
            <div className="mb-[10px]">
              The transmission of information via the internet or email is not
              completely secure. Although we have implemented reasonable
              precautions to protect your personal information, we cannot
              guarantee the security of your information transmitted through the
              Services or over email; any transmission is at your own risk. Once
              we have received your information, we will take appropriate
              technical and organizational measures to safeguard your personal
              information against loss, theft and unauthorized use, access or
              modification.
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Choice
            </div>
            <div className="mb-[10px]">
              We do not collect, use, or disclose your personal information in
              any ways or for any purposes that are materially different from
              those set forth herein. If we wish to do so in the future, we will
              obtain your consent first, and offer you the choice to opt-out of
              such collection, use, or disclosure. You may choose whether you
              wish to receive marketing/exclusive content communications through
              emails from your Event Producer through the Liveparte platform at
              the time you purchase a ticket or in your account settings. You
              can unsubscribe from these messages at any time by clicking the
              unsubscribe link within the email. You may also choose to
              subscribe to Liveparte marketing messages, which you can also
              unsubscribe from at any time.
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Tracking Technologies
            </div>
            <div className="mb-[10px]">
              We and our third-party service providers, including Facebook, use
              cookies, web beacons, local storage objects, pixels, session
              replay/screen capture, and other similar technologies to collect
              technical data as described in Section 1 above. We, or our service
              providers on our behalf, may combine this information with other
              personal information we collect from you.
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="font500 text-[18px] mb-2">
              a. Disabling Cookies. 
            </div>
            <div className="mb-[10px]"></div>
            Most web browsers automatically accept cookies. However, you may
            edit your browser options to block them in the future. The “Help”
            function within most browsers will tell you how to prevent your
            computer from accepting new cookies, how to be notified when you
            receive a new cookie, or how to disable cookies altogether. Users of
            the Services who disable cookies will be able to browse certain
            areas of the website, but some features may not function.
          </div>

          <div className="mt-[40px]">
            <div className="font500 text-[18px] mb-2">
              b. Third Party Analytics.  
            </div>
            <div className="mb-[10px]"></div>
            We use automated devices and applications, such as Google Analytics,
            to evaluate usage of our Site, and to the extent permitted, our App.
            We also may use other analytic means to evaluate our Services. We
            use these tools to help us improve our Service performance and user
            experiences. These entities may use cookies and other tracking
            technologies, such as web beacons or local storage objects (LSOs),
            to perform their services. To learn more about Google’s privacy
            practices, please review Google’s Privacy Policy. You can
            also download the Google Analytics Opt-out Browser Add-on to prevent
            your data from being used by Google Analytics.
          </div>

          <div className="mt-[40px]">
            <div className="font500 text-[18px] mb-2">c. Do-Not-Track.  </div>
            <div className="mb-[10px]"></div>
            Currently, our systems do not recognize browser “do-not-track”
            requests. You may, however, disable certain tracking as discussed in
            this section (e.g., by disabling cookies). You also may opt out of
            targeted advertising by following the instructions in the Third
            Party Ad Network section below.
          </div>

          <div className="mt-[40px]">
            <div className="font500 text-[18px] mb-2">
              d. Third-Party Ad Networks.  
            </div>
            <div className="mb-[10px]"></div>
            Advertisers may also use technologies like cookies and web beacons
            to enable them to recognize your computer each time they send you an
            advertisement even when you are visiting another site. As a result,
            the advertiser would have the ability to deliver targeted
            advertisements that they believe would be of most interest to you.
            We do not have access to or control of the cookies that may be
            placed on your computer by third-party advertisers.
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Retention of Personal Information
            </div>
            <div className="mb-[10px]">
              We may retain your information in our active systems as long as
              needed to meet the purposes for which it was collected or to
              fulfill the other purposes outlined herein. The duration for which
              we store your personal information depends on the purpose for
              which the information is being used.
            </div>
          </div>
          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Your Rights
            </div>
            <div className="mb-[10px]">
              Certain laws, such as the European Union’s General Data Protection
              Regulation 2016/679, or GDPR, grant individuals specific rights in
              relation to their personal information. Such rights may include a
              right of access, rectification, restriction of, or objection to,
              processing of your personal data (including processing for direct
              marketing), withdrawal of consent (where consent was our basis for
              processing), and portability to another controller and
              deletion/erasure. Some of these rights are subject to limitations
              set forth in the applicable law.
            </div>
          </div>

          {/*  */}
          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Your California Privacy Rights.
            </div>
            <div className="mb-[10px]">
              California Consumer Privacy Act. If you are a California resident,
              you have specific privacy rights governed by the California
              Consumer Privacy Act (CCPA). These rights include:
            </div>
            <div className="mb-4">
              {/* <div className="font500 text-[18px] mb-2">
                a. Sharing Attendee Information with Event Producers
              </div> */}
              <div className="mb-2">
                Disclosure. You have the right to request a report showing the
                personal information collected, shared, and sold about you in
                the past 12 months.
              </div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
                  Opt-Out. You have the right to opt-out to the sale of your
                  personal information to third parties.
                </li>
                <li className="mb-3">
                  Deletion. You have the right to request that we delete any
                  personal information collected from you.
                </li>
                <li className="mb-3">
                  Non-Discrimination. We shall not discriminate against you
                  based on your exercise of any of the above rights.
                </li>
              </ul>
              <div className="mb-2">
                You may submit a request to enact any of the above rights by
                clicking here to submit a request. You may also submit your
                request by mailing a letter to the address at the bottom of this
                policy. Please be sure to include your full name, email address,
                and which type of request you are making in your letter.{" "}
              </div>
              <div className="mb-2">
                To verify your identity, we may collect information such as your
                full name and email address. This information will be compared
                to our existing records to verify the identity of the individual
                submitting the request. We may also require you to confirm your
                request via an automated email message before responding to your
                CCPA rights request. Depending on the sensitivity of the
                information requested and the type of request, we may require
                additional information to verify your identity before
                responding. We will respond to your request within 45 days if
                possible and required under the law.
              </div>

              <div className="font500 text-[18px] mb-2">
                Personal Information Collected on California Residents:
              </div>
              <ul className="list-disc px-4 m-3">
                <li className="mb-3">Names and Aliases</li>
                <li className="mb-3">Physical Address</li>
                <li className="mb-3">Phone Number</li>
                <li className="mb-3">E-Mail Address</li>
                <li className="mb-3">IP Address</li>
                <li className="mb-3">Unique Identifiers</li>
                <li className="mb-3">Interactions with Customer Service</li>
                <li className="mb-3">
                  Information about transactions made on our services
                </li>
                <li className="mb-3">Fan Preferences and Attributes</li>
                <li className="mb-3">
                  Cookies/Web Beacons - We use tracking tools like browser
                  cookies and web beacons.
                </li>
                <li className="mb-3">Device Attributes</li>
                {/* <li className="mb-3"></li> */}
              </ul>

              <div>
                Personal Information Disclosed for a Business Purpose or Sold
                About California Residents:
              </div>

             <div className="overflow-x-scroll block w-full">
             <table>
                <tr className="border">
                  {TableHeader?.map((item, i) => (
                    <th
                      key={i}
                      className="border w-[200px] pl-3 py-2 text-start "
                    >
                      {item}
                    </th>
                  ))}
                </tr>
                {TableBodyData?.map((item, i) => (
                  <tr key={i}>
                    {item?.map((itemI, i) => (
                      <td  key={i} className="border pl-3 py-2 text-start">
                        {itemI}
                      </td>
                    ))}
                  </tr>
                ))}
              </table>
             </div>

              <div className="mb-4"></div>

              <div className="mb-3">
                Event Producers are independent controllers of your information.
                However, they are prohibited by this Policy and our Terms of
                Service from using Attendee contact information for any purpose
                beyond those set forth above without the Attendee’s consent.
              </div>
            </div>

            <div className="mb-4">
              <div className="font500 text-[18px] mb-2">
                b. Sharing with Third Party Service Providers and Vendors
              </div>
              <div className="mb-2">
                We engage third parties so that they can assist us in servicing
                you with things such as customer service, payment processing,
                email, information technology services, and information storage
                services, with the understanding that such third parties will
                use any personal information that is shared for their limited
                purposes as a service provider and in accordance with our
                Privacy Policy.
              </div>
            </div>
            <div className="mb-4">
              <div className="font500 text-[18px] mb-2">
                c. Corporate Reorganizations
              </div>
              <div className="mb-2">
                If we are involved in a merger, acquisition, a sale of all or a
                substantial portion of our assets, or other similar sale
                transaction, your information will be transferred as part of
                that transaction. We will notify you by email and/or a prominent
                notice on our website of any such transfer and any choices you
                may have regarding your information.{" "}
              </div>
            </div>

            <div className="mb-4">
              <div className="font500 text-[18px] mb-2">
                d. Legal Process and Protection from Harm
              </div>
              <div className="mb-2">
                Lastly, if legally required to do so, or if we have a good faith
                belief that such disclosure is reasonably necessary, we may
                disclose your personal information to courts of law, law
                enforcement authorities and other relevant third parties, (i) to
                conduct an investigation, (ii) to respond to a third party or
                law enforcement subpoena or court order, or (iii) to bring legal
                action, prevent harm to others or pursue other relief, in each
                aforementioned case when you or a third party are or may be:
              </div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
                  violating our terms and conditions of use;
                </li>
                <li className="mb-3">
                  causing injury or other harm to, or otherwise violating the
                  property or other legal rights, of us, other users, or third
                  parties; or
                </li>
                <li className="mb-3">
                  violating federal, state, local, or other applicable law.{" "}
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="font500 text-[18px] mb-2">
                e. Non-Personal Information
              </div>
              <div className="mb-2">
                We may share aggregate, anonymized, or deidentified information
                about Users with other entities for marketing, advertising,
                research or similar purposes.
              </div>
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Third Party Links and Information Collection and Use by Our Users
            </div>
            <div className="mb-[10px]">
              Some of our Services provide links to other websites. Because we
              do not control the information policies or practices of these
              third-party sites, you should review their privacy policies to
              learn about how they collect and use personal information.
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Children
            </div>
            <div className="mb-[10px]">
              Our Services are not directed to minors and we do not knowingly
              collect personal information from children under 13. If a parent
              or guardian of a child under the age of 13 becomes aware that his
              or her child has provided us with personal information without
              such parent or guardian’s consent, he or she should contact us and
              we will delete such information from our files.
            </div>
          </div>
          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              International Data Transfers
            </div>
            <div className="mb-[10px]">
              This website is hosted in, and our Services are provided from, the
              United States. In order for us to provide the contracted Services
              to you, it is necessary that your personal information is
              transferred to, and stored at/processed in the United States. We
              may also engage service providers or business partners located in
              other countries who may receive your information in accordance
              with this Privacy Policy and applicable law. Those countries may
              offer less privacy protection than your country of residence, and
              in certain instances your personal information may be accessible
              by foreign courts, law enforcement authorities and national
              security authorities in those countries. For transfers of personal
              information from the European Economic Area, we rely on the
              commitments set forth in the European Commission’s model contracts
              for the transfer of personal data to third countries (i.e., the
              standard contractual clauses).
            </div>
          </div>
          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Miscellaneous
            </div>
            <div className="mb-[10px]">
              California residents may request certain information regarding our
              disclosure of personal information about you to third parties for
              their own direct marketing purposes. However, we do not currently
              disclose personal information to third parties for their direct
              marketing purposes.
            </div>
          </div>
          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Contact Us
            </div>
            <div className="mb-[10px]">
              If you have any questions about this privacy policy or the
              practices described herein, you may contact Liveparte sending an
              email to support@liveparte.com and if we cannot resolve your
              question or complaint to your satisfaction, you have the right to
              file a complaint with the competent data protection Supervisory
              Authority in your jurisdiction.
            </div>
          </div>
          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Notification of Change
            </div>
            <div className="mb-[10px]">
              We reserve the right to update or modify this Privacy Policy at
              any time, so please review it frequently. We will notify Users of
              such changes by posting the updated Privacy Policy to this page
              and any changes will be effective immediately upon posting. Under
              certain circumstances we may also elect to notify you of such
              changes by email, or by means of a notice on www.Liveparte.com
              prior to the change becoming effective. In all cases, your
              continued use of any Services constitutes acceptance to any such
              changes.
            </div>
          </div>
        </div>
      </div>
    </PrivacyTermsLayout>
  );
}
