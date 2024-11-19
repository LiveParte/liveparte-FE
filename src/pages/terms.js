import PrivacyTermsLayout from "@/components/Layout/Privacy&TermsLayout";
import Link from "next/link";
import React, { useState } from "react";

export default function privacy() {
  return (
    <PrivacyTermsLayout>
      <div className="w-full">
        <div className="text-[45px] font-1 font-medium text-white mb-[40px]">
          Terms of Service
        </div>
        <div className="text-[14px] text-white font500">
          <div className=" text-[14px] font500 text-white mb-[10px]">
            The following are the terms of service (“Terms”) that govern the use
            of the LIVEPARTE websites and applications where these Terms appear
            (collectively, “Site”). Our Privacy Policy and any other policies,
            rules or guidelines that may be applicable to particular offers or
            features on the Site are also incorporated into these Terms. By
            creating an account, viewing content, making a purchase or otherwise
            visiting or using the Site and our services (“Services”), you
            expressly agree to these Terms, as we may update from time to time.
            Please note that while some of the events listed on the Site may
            appeal to children, the Site is not targeted at children under the
            age of 16, and they are not permitted to use the Site. If you use
            the Site, you affirm you are at least 16 years old.
          </div>
          <div>
            By visiting our websites and using the Services, you agree to the
            terms of this Privacy Policy, our Terms of Service, and Community
            Guidelines as they may be amended from time to time. Capitalized
            terms not defined herein are as defined in our Terms of Service.
          </div>

          <div className="mt-[40px]">
            <div className="text-[20px] font-1 font-medium text-white mb-[20px]">
              NOTICE REGARDING FUTURE CHANGES TO TERMS
            </div>
            <div className="mb-[10px]">
              We may make changes to these Terms at any time. Any changes we
              make will be effective immediately when we post a revised version
              of these Terms on the Site. The “Last Updated” date above will
              tell you when these Terms were last revised. By continuing to use
              this Site after that date, you agree to the changes. To the extent
              that these Terms differ from a prior version of the Terms which
              you previously agreed to, this version of the Terms supersedes and
              governs.
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[20px] font-1 font-medium text-white mb-[20px]">
              NOTICE REGARDING ARBITRATION AND CLASS ACTION WAIVER
            </div>
            <div className="mb-[10px]">
              The Terms contain an arbitration agreement and class action
              waiver. Specifically, you and we agree that any dispute or claim
              relating in any way to the Terms, your use of the Site, or
              products or services sold, distributed, issued, or serviced by us
              or through us, will be resolved by binding, individual
              arbitration, rather than in court. By agreeing to individual
              arbitration, you and we each waive any right to participate in a
              class action lawsuit or class-wide arbitration. This agreement and
              waiver, along with some limited exceptions, is explained in
              Section 16 below.{" "}
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Services
            </div>

            <div>
              <ul className="list-decimal px-4 m-0">
                <li className="mb-3">
                  General. LIVEPARTE provides a marketplace for artists, venues,
                  festival and merchants (collectively, “Event Producers”) to
                  offer live-streamed and pre-recorded entertainment events
                  (“Events”) and to sell tickets (“Tickets”) to those Events to
                  consumers (“Attendees”, collectively with Event Producers and
                  other Site visitors, “Users”). In this regard, LIVEPARTE acts
                  as an intermediary between Event Producers and Attendees and
                  not an agent or broker of Event Producers. We cannot guarantee
                  any number of Tickets that will be available to purchase for
                  an Event, the quality of the experience provided by an Event
                  Producer, or the conduct of any User. We may make changes to
                  the Services at any time, without notice to you. If you object
                  to the changes, your sole recourse is to stop using the Site.
                  Certain features of the Site may be subject to additional
                  terms.
                </li>
                <li>Event Producer Responsibilities.</li>
              </ul>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
                  <b className="font-semibold text-[16px]"> Tickets.</b>
                  You must accurately describe the experience in connection with
                  any Tickets you offer and, by offering a Ticket, you agree
                  that you will provide the experience described. If you fail to
                  provide such experience, you agree to indemnify us and
                  reimburse us for any refunds that we need to issue and damages
                  that we suffer due to your failure. If your Event is postponed
                  or rescheduled, you agree to provide the experience described
                  in the Ticket at such reasonable later date. In the event that
                  you do not provide the experience, we will not remit any
                  payments to you unless and until we are satisfied (in our
                  discretion) that Attendees will be issued replacement Tickets
                  or refunds. Unless you have a separate agreement with us, you
                  acknowledge and agree that all of your Events will be
                  accessible to Attendees who purchase an individual Ticket or a
                  subscription. You must also furnish a working contact and
                  support email address which will be displayed on your
                  LIVEPARTE page.
                </li>
                <li className="mb-3">
                  <b className="font-semibold text-[16px]">
                    Event Producer Content.
                  </b>{" "}
                  You are responsible for creating the images, words, graphics,
                  recordings and other content that are featured on your Event
                  Producer page, communicated to your Attendees through Event
                  Producer Communications (defined below), and performed and
                  displayed as part of an Event (collectively, the “Event
                  Producer Content”). You are solely responsible for securing
                  all third-party permissions, licenses and approvals that may
                  be required (e.g., from record labels, music publishers,
                  managers, agents, etc.) for all Event Producer Content you
                  make available on the Site, including without limitation to
                  perform, display, record and replay a streaming Event, where
                  applicable. You warrant and represent that, prior to providing
                  any Event Producer Content to the Site, you have all of the
                  foregoing permissions, licenses and approvals, and shall
                  indemnify, defend and hold LIVEPARTE and its affiliates
                  harmless from all claims in connection therewith.
                </li>
                <li className="mb-3">
                  <b className="font-semibold text-[16px]">
                    Event Producer Communications.
                  </b>
                  You are responsible for all marketing/exclusive content text
                  messages and/or emails featuring Event Producer Content in
                  connection with Tickets (collectively, “Event Producer
                  Communications”), including honoring any and all marketing
                  opt-out requests and other compliance with applicable laws. As
                  an Event Producer, you agree to indemnify, defend and hold us
                  harmless for any liability or loss incurred by us as a result
                  of the Event Producer Content or Event Producer
                  Communications. As an Attendee, you release us from all
                  liability in connection with any Event Producer Content and
                  Event Producer Communications.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Account Registration.
            </div>

            <div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
                  <b className="font-semibold text-[16px]"> General.</b>
                  You will not be required to register for an account in order
                  to browse the Site as a general User. However, Users will be
                  required to register for an Attendee account to use certain
                  features of the Site, such as purchasing a Ticket and viewing
                  Events, and for an Event Producer account to provide Events
                  through the Site and to offer Tickets to those Events. Event
                  Producers may also purchase Tickets from other Event
                  Producers, in which case the purchaser would be an “Attendee”
                  for purposes of that particular transaction.{" "}
                </li>
                <li className="mb-3">
                  <b className="font-semibold text-[16px]">
                    {" "}
                    Account Credentials.
                  </b>
                  By registering for an account, you agree that all information
                  provided is accurate and complete. Your account username may
                  not include the name of another person with the intent to
                  impersonate that person, or be offensive, vulgar or obscene.
                  Your account and your account username and password are
                  personal to you, and you may not transfer or sell access to
                  your account or use another User’s account without that User’s
                  permission. You will be responsible for the confidentiality
                  and use of your username and password, and for all activities
                  (including purchases) that are conducted through your account.
                  We will not be liable for any harm related to disclosure of
                  your username or password or the use by anyone else of your
                  username or password. You will immediately notify us in
                  writing if you discover any unauthorized use of your account
                  or other account-related security breach. We may require you
                  to change your username and/or password if we believe your
                  account is no longer secure or if we receive a complaint that
                  your username violates someone else’s rights. You will have no
                  ownership in your account or your username. We may refuse
                  registration, cancel an account or deny access to the Site for
                  any reason.{" "}
                </li>
                <li className="mb-3">
                  <b className="font-semibold text-[16px]">
                    {" "}
                    Event Producer Accounts.
                  </b>
                  An Event Producer may establish and manage its own account or
                  delegate permission to authorized individuals to do so on its
                  behalf, resulting in multiple User accounts associated with
                  one Event Producer account. In such case, Event Producer and
                  each authorized User are responsible for compliance with the
                  obligations of Event Producer hereunder in these Terms and our
                  Privacy Policy and the term “Event Producer” shall mean both
                  the individual Event Producer and all authorized Users
                  associated with its account. A particular User (such as a
                  business manager, public relations manager, or social media
                  manager) may be associated with more than one Event Producer
                  account, in which case that User is responsible for compliance
                  with the obligations of each Event Producer the User
                  represents.{" "}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Attendee Purchases and Terms of Sale.{" "}
            </div>

            <div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
                  <b className="font-semibold text-[16px]"> General.</b>
                  LIVEPARTE is an events-based ticketing platform for Event
                  Producers’ streaming Events. We do not control the services
                  advertised or provided by the Event Producer and do not manage
                  or fulfill the merchandise that an Event Producer might
                  include as part of an order. While we may collect information
                  from Attendees with respect to merchandise (such as shipping
                  and size information), the Event Producer is solely
                  responsible for fulfillment of the merchandise orders and
                  LIVEPARTE has no responsibility for the accuracy of any
                  information collected, the shipping or fulfillment of the
                  merchandise or with respect to the merchandise itself. We may
                  from time to time offer special promotional offers (“Offers”)
                  to Attendees. Offer eligibility is determined by us in our
                  sole discretion, and we reserve the right to revoke an Offer
                  and put your account on hold in the event that we determine
                  you are not eligible. The eligibility requirements and other
                  limitations and conditions will be disclosed when you sign-up
                  for the Offer or in other communications made available to
                  you.
                </li>
                <li className="mb-3">
                  <b className="font-semibold text-[16px]"> Pricing</b>
                  We sell Tickets on behalf of Event Producers, which means that
                  the price for each Ticket for an Event is determined by the
                  applicable Event Producer. Tickets are sold individually, and
                  we may also offer a monthly or annual subscription.
                  Subscriptions are all-access, subject to certain restrictions
                  set by us. Subscription features may include (i) the ability
                  to watch any eligible content without needing to purchase an
                  individual Ticket, (ii) access to special Events (subject to
                  an additional fee), (iii) the ability to add upcoming Events
                  to schedule for notifications and planning, (iv) personalized
                  recommendations, and (v) the ability to create
                  playlists. Monthly plans renew for 30-day periods and annual
                  plans renew for 1-year periods. We may also offer a free
                  subscription trial period. Unless you cancel your subscription
                  before the free period ends, once the free period ends, you
                  will be charged the applicable subscription price for the
                  subscription period that you selected when you created your
                  account. You must pay all fees (plus any taxes) during your
                  subscription period and any renewal periods. Your subscription
                  fees will be charged to the payment method that you will be
                  required to maintain in your account. We may adjust fees from
                  time to time and will attempt to notify you in advance of any
                  such fee changes prior to your next billing cycle. If you do
                  not wish to accept a fee change, you may terminate your
                  subscription by following the process in your account. If
                  you choose to purchase a subscription, to the extent permitted
                  by applicable law, your subscription will continue and
                  automatically renew until terminated. There will be no refunds
                  if you choose to terminate a subscription, however you will be
                  able to continue to view Events through the end of your
                  subscription term. In addition to our other termination rights
                  under these Terms, we shall have the right to discontinue
                  providing the subscription option to Users at any time in our
                  discretion without any liability to you or any third party
                  and, in such event, you may request a refund of any unused
                  pre-paid subscription fees as of the date we terminate the
                  subscription option.
                </li>
                <li className="mb-3">
                  <b className="font-semibold text-[16px]"> Fees and Taxes.</b>
                  All prices are charged in U.S. Dollars (unless otherwise
                  stated). Applicable taxes shall be separately assessed as
                  required by law at the time of checkout. If applicable,
                  currency exchange rates and foreign transaction fees are
                  generally determined and applied by your payment provider, and
                  you acknowledge and agree that we have no responsibility for
                  refunding or compensating you for amounts or expenses incurred
                  in connection with those fees. If the amount you pay for a
                  Ticket is incorrect (regardless of whether it is incorrect
                  because of an error in a price posted on the Site or otherwise
                  communicated to you), if you are able to order a Ticket before
                  its scheduled on-sale or presale date, or if you are able to
                  order a Ticket that was not supposed to have been released for
                  sale, then we will have the right to cancel that Ticket (or
                  the order for that Ticket) and refund to you the amount that
                  you paid. This will apply regardless of whether the error
                  occurred because of human error or a transactional malfunction
                  of the Site. If a refund is processed in error, or a refund
                  exceeds the original amount paid, we reserve the right to
                  recharge the original method of payment used at time of
                  purchase. Shipping and handling fees and taxes charged or
                  collected by us for merchandise made available for purchase by
                  an Event Producer will be added to your order and will appear
                  as a separate charge on your order confirmation and receipt.
                </li>
                <li className="mb-3">
                  <b className="font-semibold text-[16px]">
                    {" "}
                    Method of Payment.
                  </b>
                  You agree to pay all charges incurred by you at the amounts in
                  effect when such charges are incurred and agree that we and
                  any of our third-party payment processors are authorized to
                  immediately charge your credit card or other method of payment
                  used at the time of purchase. You agree to immediately notify
                  us of any change in your payment information. We reserve the
                  right at any time to change our billing methods. All
                  information that you provide to us or our third-party payment
                  processors must be accurate, current and complete. You will
                  not attempt to conceal your identity by using multiple
                  Internet Protocol addresses or email addresses, or by any
                  other means, to conduct transactions on the Site. You will not
                  hold us liable if you do not comply with laws related to your
                  transactions. We may provide law enforcement with information
                  you provide to us related to your transactions to assist in
                  any investigation or prosecution of you. We may cancel an
                  order or prevent you from making future orders for any reason,
                  including, without limitation: (i) if you attempt to use the
                  Site in breach of any applicable law or regulation, including
                  but not limited to the card network rules or regulations; (ii)
                  if you use the Site in breach of these Terms; (iii) if we
                  suspect fraudulent, unlawful or improper activity regarding a
                  payment; (iv) if we detect, in our sole discretion, that your
                  payments have excessive disputes, high reversal rates or
                  present a relatively high risk of losses; or (v) failure to
                  cooperate in an investigation or provide additional
                  information when requested.
                </li>
                <li className="mb-3">
                  <b className="font-semibold text-[16px]">
                    Billing Information Verification.
                  </b>
                  All information on accounts and orders must be valid and are
                  subject to verification. Orders are subject to credit card
                  approval and are processed only after the billing address
                  associated with your credit card and other billing information
                  have been verified. Orders that are placed, or attempted to be
                  placed, using an account with any information that is found to
                  be false, misleading, incorrect, or incomplete, or that cannot
                  be verified as belonging to the account holder, such as name,
                  address, email address, phone number, IP address, or other
                  account or billing information, are subject to cancelation, at
                  any time. If your order is canceled for any of the foregoing
                  reasons, we may sell your Tickets to another Attendee without
                  further notice. Occasionally, we receive incorrect billing or
                  credit card account information for a Ticket order that can
                  delay processing and delivery. In these cases, customer
                  service will attempt to contact you, using the information
                  provided at the time of purchase. If we are unable to reach
                  you after our initial attempt, we may cancel your order and
                  sell your Ticket to another Attendee without further notice.
                </li>
                <li className="mb-3">
                  <b className="font-semibold text-[16px]">
                    No Resale or Promotions.
                  </b>
                  We may provide you with an option to buy Tickets or a
                  subscription as a gift for someone else but the resale of
                  Tickets is expressly prohibited. In addition, Tickets may not
                  be used for advertising, promotions, contests or sweepstakes
                  unless formal written authorization is given by us.
                </li>
                <li className="mb-3">
                  <b className="font-semibold text-[16px]">
                    Postponed or Rescheduled Events.
                  </b>
                  If an Event is postponed or rescheduled, your Ticket is still
                  valid for the rescheduled Event date and we will not issue a
                  refund. If an Event Producer cancels an Event, we will issue
                  you a refund to the original method of payment used at time of
                  purchase (as outlined below) unless your Ticket was part of a
                  subscription, in which case you will not receive a refund. We
                  will communicate to Attendees any changes to Event times on
                  behalf of the Event Producer.
                </li>
                <li className="mb-3">
                  <b className="font-semibold text-[16px]">Refunds.</b>
                  All sales are final and Tickets are non-refundable except in
                  the limited circumstances where an Event is canceled. In our
                  sole discretion, we may issue you a refund for a
                  non-subscription Ticket due to a canceled Event and, in such
                  event, we will issue a refund of the Ticket face value paid.
                  If a refund is issued, it will be processed to the original
                  method of payment used at time of purchase. We cannot issue a
                  refund to a different credit or debit card. If your credit
                  card or debit card number has changed, but is for the same
                  account (e.g., a new card has been issued for the same
                  account), the refund will be processed to that account. You
                  agree that you will not attempt to evade, avoid, or circumvent
                  any refund prohibitions in any manner with regard to the
                  Ticket you purchased. Without limiting the foregoing, you will
                  not contact us to seek a refund or exchange from us when we
                  are prohibited from providing one by the Event Producer, and
                  you will not dispute or otherwise seek a “chargeback” from the
                  company whose credit card you used to purchase the Ticket from
                  the Site. Should you do so, your Tickets or subscription may
                  be canceled, and we may, in our sole discretion, refuse to
                  honor pending and future Ticket and subscription purchases
                  made from all credit card accounts or online accounts on which
                  such chargebacks have been made, and may prohibit all persons
                  in whose name the credit card accounts exist and any person
                  who accesses any associated online account or credit card or
                  who otherwise breaches this provision from using the Site.
                </li>
                <li className="mb-3">
                  <b className="font-semibold text-[16px]">Ticket Orders.</b>
                  Individual Tickets are sold on a first come first served basis
                  and while quantities last. Your Ticket or subscription order
                  is confirmed when we send you a confirmation, in the form of a
                  confirmation page or email. If you do not receive a
                  confirmation number after submitting payment information, or
                  if you experience an error message or service interruption
                  after submitting payment information, it is your
                  responsibility to confirm whether or not your order has been
                  placed. We will not be responsible for losses (monetary or
                  otherwise) if you fail to receive an order confirmation or if
                  a confirmation is not generated for an order.
                </li>
                <li className="mb-3">
                  <b className="font-semibold text-[16px]">
                    Ability to View an Event.
                  </b>
                  The ability to view a streaming Event may be limited depending
                  on your Internet provider, your device, and your browser type.
                  You are responsible for determining whether your Internet
                  speed, device, and browser can support a streaming Event and
                  LIVEPARTE strongly suggests that you test your Internet speed,
                  device, and browser before making a streaming ticket purchase.
                  LIVEPARTE is not liable for troubleshooting issues, Internet
                  loading, or capacity issues if these cause Attendees to miss
                  any part of an Event. LIVEPARTE does not assist with the
                  production of the Event, or any other part of the Event,
                  including merchandise included with a Ticket, the length of
                  the Event, and the ability to re-watch the Event. It is in the
                  Event Producer’s sole discretion whether to permit Attendees
                  to re-watch an Event after the original Event has taken place.
                  LIVEPARTE is not liable for any issues during an Event, and
                  only the Event Producer may approve refunds if any issues
                  arise. Attendees may not photograph, film, or otherwise record
                  Events and may not post any such photographs or recordings to
                  social media or make any such recording publicly available
                  without the Event Producer’s prior written permission in each
                  instance. If you violate these provisions, in addition to
                  seeking monetary damages against you, we and/or the Event
                  Producer may seek an injunction against you to take down such
                  recordings without posting a bond.
                </li>
                <li className="mb-3">
                  <b className="font-semibold text-[16px]">Donations.</b>
                </li>
              </ul>
              <ul className="list-decimal">
                <li className="mb-3">
                  <b className="font-semibold text-[16px]">General.</b>
                  LIVEPARTE offers Event Producers the option to implement a
                  donation feature with regard to a specific Event, Ticket, or
                  other service offering (the “Donation Services”). Charities
                  are selected by Event Producers in their sole discretion and
                  Event Producers are responsible for vetting all organizations
                  before utilizing the Donation Services. All information and
                  content provided by us relating to the Donation Services is
                  for informational purposes only, is not intended to provide
                  financial, legal, tax or other professional advice, and we do
                  not guarantee the accuracy, completeness, timeliness or
                  reliability of any such information or content. Before making
                  any decisions regarding any campaigns, charities, donations,
                  or any information or content relating to the Donation
                  Services, you should consult your financial, legal, tax or
                  other professional advisor as appropriate. You acknowledge
                  that all information and content accessed by you using the
                  Donation Services is at your own risk.
                </li>
                <li className="mb-3">
                  <b className="font-semibold text-[16px]">
                    For Event Producers.
                  </b>
                  LIVEPARTE has no control over your use of the Donation
                  Services and expressly disclaims all liability in this regard,
                  including without limitation for the outcome or success of any
                  campaign through the Donation Services, to the fullest extent
                  permitted by applicable law. We do not guarantee that the
                  Donation Services will obtain a certain amount of donations or
                  any donations at all. We do not endorse any charity, campaign,
                  Event Producer, or cause, and we make no guarantee, express or
                  implied, that any information provided through the Donation
                  Services is accurate. You must make the final determination as
                  to the value and appropriateness of soliciting any User,
                  campaign, or Event through the Donation Services. If you
                  choose to implement the Donation Services, you will indemnify,
                  defend, and hold us harmless from and against any and all
                  third-party claims arising from or relating to your use of the
                  Donation Services, including your choice of receiving
                  organization.
                </li>
                <li className="mb-3">
                  <b className="font-semibold text-[16px]">For Donors.</b>
                  LIVEPARTE has no control over the conduct of, or any
                  information provided by, an Event Producer with regard to the
                  Donation Services and expressly disclaims all liability in
                  this regard to the fullest extent permitted by applicable law.
                  All donations are made at your own risk. When you make a
                  donation through the Donation Services, it is your
                  responsibility to understand how your money will be used.
                  LIVEPARTE is not responsible for any offers, promises, rewards
                  or promotions made or offered through the Donation Services.
                  We do not and cannot verify the information that Event
                  Producers or receiving organizations supply, nor do we
                  represent or guarantee that the donations will be used in
                  accordance with any fundraising purpose prescribed by an Event
                  Producer or receiving organization or in accordance with
                  applicable laws. Notwithstanding the foregoing, we take
                  possible fraudulent activity and the misuse of funds raised
                  very seriously. If you have reason to believe that an Event
                  Producer or receiving organization is not raising or using the
                  funds for their stated purpose, please contact us at 
                  <Link
                    className="no-underline text-gray-500"
                    target="_blank"
                    href={"mailto:upport@liveparte.com"}
                  >
                    support@liveparte.com.
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Site Code of Conduct & Acceptable Use Policy.
            </div>

            <div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
                  You agree that you will comply with all applicable laws, rules
                  and regulations, and that you will not:
                </li>
                <li className="mb-3">
                  Restrict or inhibit any other person from using the Site.
                </li>
                <li className="mb-3">Use the Site for any unlawful purpose.</li>
                <li className="mb-3">
                  Express or imply that any statements you make are endorsed by
                  us, without our prior written consent.
                </li>
                <li className="mb-3">
                  Impersonate any person or entity, whether actual or
                  fictitious, including any employee or representative of our
                  company.
                </li>
                <li className="mb-3">
                  Submit (i) any content or information that is unlawful,
                  fraudulent, libelous, defamatory, or otherwise objectionable,
                  or infringes our or any third party’s intellectual property or
                  other rights; (ii) any non-public information about companies
                  without authorization; or (iii) any advertisements,
                  solicitations, chain letters, pyramid schemes, surveys,
                  contests, investment opportunities or other unsolicited
                  commercial communication.
                </li>
                <li className="mb-3">
                  Submit, or provide links to, any postings containing material
                  that could be considered harmful, obscene, pornographic,
                  sexually explicit, indecent, lewd, violent, abusive, profane,
                  insulting, threatening, harassing, hateful or otherwise
                  objectionable, includes the image or likeness of individuals
                  under 18 years of age, encourages or otherwise depicts or
                  glamorizes drug use (including alcohol and cigarettes),
                  characterizes violence as acceptable, glamorous or desirable,
                  or contains any personal contact information or other personal
                  information identifying any third party.
                </li>
                <li className="mb-3">
                  Submit, or provide links to, any postings containing material
                  that harasses, victimizes, degrades, or intimidates an
                  individual or group of individuals on the basis of religion,
                  race, ethnicity, sexual orientation, gender, age, or
                  disability.
                </li>
                <li className="mb-3">
                  Use the Site, the Services or the Content available through
                  the Site in any manner that could damage, disable, overburden
                  or impair the Site, the Services or the Content available
                  through the Site.
                </li>
                <li className="mb-3">
                  Use or assist another person to use any data mining, robots,
                  scraping or similar data or extraction methods.
                </li>
                <li className="mb-3">
                  Modify, copy or reproduce any and all portions of the Site,
                  the Services and/or the Content available through the Site,
                  violate or attempt to violate any security components, or
                  attempt to, or assist another person to, reverse-engineer,
                  decompile, disassemble, or otherwise tamper with any of the
                  security components for any reason whatsoever.
                </li>
                <li className="mb-3">
                  Order a number of Tickets for an Event that exceeds the stated
                  limit for that Event.
                </li>
                <li className="mb-3">
                  Use any password or code to participate in a presale or other
                  offer on the Site if you did not receive the password or code
                  from us or if you violate the terms of the presale or offer.
                </li>
                <li className="mb-3">
                  Use any area of the Site for commercial purposes, such as to
                  conduct sales of tickets, products or services (other than the
                  offering of Tickets by Event Producers as permitted herein).
                </li>
                <li className="mb-3">
                  LIVEPARTE may refuse access to the Site or our Services if we
                  believe a User has violated the Code of Conduct or any other
                  provision of these Terms in our sole and absolute discretion.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Ownership of Content and Grant of Conditional License to use the
              Site.
            </div>
            <ul className="list-disc px-4 m-0">
              <li className="mb-3">
                You agree that you will comply with all applicable laws, rules
                and regulations, and that you will not:
              </li>
              <li className="mb-3">
                Restrict or inhibit any other person from using the Site.
              </li>
              <li className="mb-3">Use the Site for any unlawful purpose.</li>
              <li className="mb-3">
                Express or imply that any statements you make are endorsed by
                us, without our prior written consent.
              </li>
              <li className="mb-3">
                Impersonate any person or entity, whether actual or fictitious,
                including any employee or representative of our company.
              </li>
              <li className="mb-3">
                Submit (i) any content or information that is unlawful,
                fraudulent, libelous, defamatory, or otherwise objectionable, or
                infringes our or any third party’s intellectual property or
                other rights; (ii) any non-public information about companies
                without authorization; or (iii) any advertisements,
                solicitations, chain letters, pyramid schemes, surveys,
                contests, investment opportunities or other unsolicited
                commercial communication.
              </li>
              <li className="mb-3">
                Submit, or provide links to, any postings containing material
                that could be considered harmful, obscene, pornographic,
                sexually explicit, indecent, lewd, violent, abusive, profane,
                insulting, threatening, harassing, hateful or otherwise
                objectionable, includes the image or likeness of individuals
                under 18 years of age, encourages or otherwise depicts or
                glamorizes drug use (including alcohol and cigarettes),
                characterizes violence as acceptable, glamorous or desirable, or
                contains any personal contact information or other personal
                information identifying any third party.
              </li>
              <li className="mb-3">
                Submit, or provide links to, any postings containing material
                that harasses, victimizes, degrades, or intimidates an
                individual or group of individuals on the basis of religion,
                race, ethnicity, sexual orientation, gender, age, or disability.
              </li>
              <li className="mb-3">
                Use the Site, the Services or the Content available through the
                Site in any manner that could damage, disable, overburden or
                impair the Site, the Services or the Content available through
                the Site.
              </li>
              <li className="mb-3">
                Use or assist another person to use any data mining, robots,
                scraping or similar data or extraction methods.
              </li>
              <li className="mb-3">
                Modify, copy or reproduce any and all portions of the Site, the
                Services and/or the Content available through the Site, violate
                or attempt to violate any security components, or attempt to, or
                assist another person to, reverse-engineer, decompile,
                disassemble, or otherwise tamper with any of the security
                components for any reason whatsoever.
              </li>
              <li className="mb-3">
                Order a number of Tickets for an Event that exceeds the stated
                limit for that Event.
              </li>
              <li className="mb-3">
                Use any password or code to participate in a presale or other
                offer on the Site if you did not receive the password or code
                from us or if you violate the terms of the presale or offer.
              </li>
              <li className="mb-3">
                Use any area of the Site for commercial purposes, such as to
                conduct sales of tickets, products or services (other than the
                offering of Tickets by Event Producers as permitted herein).
              </li>
              <li className="mb-3">
                LIVEPARTE may refuse access to the Site or our Services if we
                believe a User has violated the Code of Conduct or any other
                provision of these Terms in our sole and absolute discretion.
              </li>
              <li className="mb-3">
                The Site and all data, text, designs, pages, print screens,
                images, artwork, photographs, audio and video clips, and HTML
                code, source code, or software that reside or are viewable or
                otherwise discoverable on the Site, and all Tickets obtained
                from the Site, (collectively, the “Content”) are owned by us or
                our licensors. Our licensors include Event Producers with regard
                to the Event Producer Content that they own and license to
                LIVEPARTE for the purpose of displaying an Event to Attendees
                hereunder. Other than Event Producer Content, we own a copyright
                and, in some instances, patents and other intellectual property
                in the Site and Content. We may change the Content and features
                of the Site at any time.
              </li>
              <li className="mb-3">
                We grant Users a personal, limited, conditional, no-cost,
                non-exclusive, non-transferable, non-sublicensable revocable
                license subject to the limitations below to view this Site and
                the Content, and to use the Site as an Attendee and/or Event
                Producer as otherwise permitted herein only if, as a condition
                precedent, you agree that you will not:
              </li>
              <li className="mb-3">
                Submit any software or other materials that contain any viruses,
                worms, Trojan horses, defects, date bombs, time bombs or other
                items of a destructive nature.
              </li>
              <li className="mb-3">
                Manipulate identifiers, including by forging headers, in order
                to disguise the origin of any posting that you submit.
              </li>
              <li className="mb-3">
                Link to any portion of the Site other than the URL assigned to
                the home page of the Site.
              </li>
              <li className="mb-3">
               {` "Frame" or "mirror" any part of the Site.`}
              </li>
              <li className="mb-3">
                Modify, adapt, sub-license, translate, sell, reverse engineer,
                decompile or disassemble any portion of the Site or otherwise
                attempt to derive any source code or underlying ideas or
                algorithms of any part of the Content.
              </li>
              <li className="mb-3">
                Remove any copyright, trademark or other proprietary rights
                notices contained on the Site.
              </li>
              <li className="mb-3">
                Use any robot, spider, offline reader, site search/retrieval
                application or other manual or automatic device, tool, or
                process to retrieve, index, data mine or in any way reproduce or
                circumvent the navigational structure or presentation of the
                Content or the Site, including with respect to any CAPTCHA
                displayed on the Site. Operators of public search engines may
                use spiders to copy materials from the Site for the sole purpose
                of and solely to the extent necessary for creating publicly
                available searchable indices of the materials, but not caches or
                archives of such materials. We may revoke this exception at any
                time and require removal of archived materials gathered in the
                past.
              </li>
              <li className="mb-3">
                Use any automated software or computer system to search for,
                reserve, buy or otherwise obtain Tickets, discount codes,
                promotional codes, vouchers, gift cards or any other items
                available on the Site, including sending information from your
                computer to another computer where such software or system is
                active.
              </li>
              <li className="mb-3">
                Take any action that imposes or may impose (in our sole
                discretion) an unreasonable or disproportionately large load on
                our infrastructure.
              </li>
              <li className="mb-3">
                Access, reload or refresh transactional event pages, or make any
                other request to transactional servers, more than once during
                any three-second interval.
              </li>
              <li className="mb-3">
                Request more than 1,000 pages of the Site in any 24-hour period,
                whether alone or with a group of individuals.
              </li>
              <li className="mb-3">
                Make more than 800 reserve requests on the Site in any 24-hour
                period, whether alone or with a group of individuals.
              </li>
              <li className="mb-3">
                Reproduce, modify, display, publicly perform, distribute or
                create derivative works of the Site or the Content.
              </li>
              <li className="mb-3">
                Reproduce or scan Tickets in a format or medium different from
                that provided by the Site.
              </li>
              <li className="mb-3">
                Decode, decrypt, modify, or reverse engineer any Tickets or
                underlying algorithms or barcodes used on or in production of
                Tickets or the Site.
              </li>
              <li className="mb-3">
                Use the Site or the Content in an attempt to, or in conjunction
                with, any device, program or service designed to circumvent any
                technological measure that effectively controls access to, or
                the rights in, the Site and/or Content in any way including,
                without limitation, by manual or automatic device or process,
                for any purpose.
              </li>
              <li className="mb-3">
                This license is expressly conditioned on your preexisting
                agreement to comply with, and your actual compliance with, each
                of the provisions described in this Ownership of Content and
                Grant of Conditional License section. This license exists only
                so long as you strictly comply with each of the provisions
                described in this section. Any use of the Site or Content by you
                or anyone acting on your behalf that does not strictly comply
                with each and every provision in this section exceeds the scope
                of the license granted to you herein, constitutes unauthorized
                reproduction, display, or creation of unauthorized derivative
                versions of the Site and Content, and infringes our copyrights,
                trademarks, patents and other rights in the Site and Content.
                You will not acquire any ownership rights by using the Site or
                the Content.
              </li>
              <li className="mb-3">
                The registered and unregistered trademarks, logos and service
                marks displayed on the Site are owned by us or our licensors.
                You may not use our trademarks, logos and service marks in any
                way without our prior written permission.
              </li>
            </ul>
            <div></div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Chat and User Content.
            </div>
            <ul className="list-disc px-4 m-0">
              <li className="mb-3">
                We may host livestream Event Producer chats (“Chats”). We
                reserve the right to restrict or terminate your access to the
                Chats at any time, for any reason. If your access to a Chat has
                been restricted or terminated, you may not create a second
                account or register with a new name and/or email address in
                order to evade such restrictions or termination. Use of the Chat
                feature is at your own risk. We are not responsible for and
                disclaim all liability associated with any content posted by a
                User (“User Content”) or other third-party content that may be
                available in a Chat. All opinions and views expressed in a Chat
                are solely those of the posting User.
              </li>
              <li className="mb-3">
                Users may not post affiliate links, blogger codes, auction site
                postings, links to competitive ticketing and/or streaming
                platforms, links to other commercial websites, your own blog,
                social media accounts or any other commercial content. Be
                respectful in how you express your opinions. Personal attacks,
                harassment, and rude, insensitive, or offensive comments are
                prohibited whether they are directed at Artists, Fans, or
                LIVEPARTE staff. Chats are designed for bonding over common
                interests related to the Event. Comments related to your
                dissatisfaction with a purchase, assistance with an order, or
                other customer service related issues should be directed to
                Customer Service. Should you have a problem with a User or post,
                please take a screen shot and contact Customer Service. Be
                careful about sharing personal or private information through a
                Chat. Even if you’re posting through a username and not your
                real name, it can be easier than you think to find out someone’s
                real name and identity. Don’t post anything anonymously that you
                wouldn’t be comfortable sharing publicly. Respect another User’s
                request if the User prefers not to communicate with you. Do not
                request other Users to contact you outside of a Chat.
              </li>
              <li className="mb-3">
                As between you and us, you own all rights to your User Content.
                If you submit User Content to the Site, you grant us a
                worldwide, non-exclusive, transferable, sublicensable,
                royalty-free right and license to use, reproduce, modify, create
                derivative works of, distribute, publicly perform, display,
                archive and commercialize your User Content, in our sole
                discretion, in all formats and in all media channels now known
                or hereinafter discovered, without any compensation or
                acknowledgment to you or anyone else. This license will not
                affect your ownership in your User Content, including the right
                to grant additional licenses to your User Content, except if it
                conflicts with these Terms. We are not obligated to post,
                display or otherwise use any User Content, or to attribute your
                User Content to you. You will not make or authorize any claim
                against us that our use of your User Content infringes any of
                your rights. Statements, opinions and reviews posted by
                participants in a Chat may be inaccurate, offensive, obscene,
                threatening or harassing. We do not endorse and are not
                responsible for these posts. We will not be liable for any loss
                or harm caused by the post or your reliance on information
                obtained through the post.
              </li>
              <li className="mb-3">
                You will be responsible for your User Content and the
                consequences of posting it. By submitting User Content, you
                represent to us that (i) you own, or have the necessary
                permission to submit the User Content and to grant the licenses
                to us under this section, (ii) your User Content does not
                violate the Code of Conduct and Acceptable Use Policy contained
                in these Terms, and (iii) you have the written permission of
                every identifiable person in the User Content to use that
                person’s name and likeness in the manner contemplated by the
                Site and these Terms or, if the person is a minor, the written
                permission of the minor’s parent or legal guardian.
              </li>
              <li className="mb-3">
                You understand that User Content posted to Chats will be viewed
                by other Users, that you have no expectation of privacy with
                regard to such User Content, and that your ability to delete
                User Content after posting may be limited due to the nature of
                the Chat.
              </li>
              <li className="mb-3">
                We will have the right (but not the obligation) to monitor the
                Site, and the User Content, and to disclose any User Content and
                the circumstances surrounding its submission in order to operate
                the Site properly, or to protect ourselves, our sponsors and
                other Users, or to comply with legal obligations or governmental
                requests.
              </li>
              <li className="mb-3">
                If we are notified that your User Content does not comply with
                these Terms, we may investigate the allegation and may decide to
                remove your User Content and cancel your account. We may also
                hold you liable for any User Content that infringes the rights
                of a third party and require you to pay or reimburse us for any
                amounts we believe are necessary to resolve any complaint.
                Enforcement of these guidelines is in our sole and absolute
                discretion, and our failure to enforce them in certain instances
                does not constitute a waiver of our right to enforce them in
                other instances.
              </li>
              <li className="mb-3">
                If you use any review feature of the Site or provide us with any
                communications, comments, questions, suggestions, or other
                feedback relating to the Site or our Services (collectively,
                “Feedback”) your Feedback will be treated as non-confidential
                and non-proprietary and you grant to us the right to use such
                Feedback for any purpose whatsoever, including the development
                of new products and services, without any attribution or
                compensation to you.
              </li>
            </ul>
            <div></div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Claims of Copyright Infringement on the Site.
            </div>

            <div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
                  Under the Digital Millennium Copyright Act of 1998 (the
                  “DMCA”) if you believe in good faith that any content on the
                  Site infringes your copyright, you may send us a notice
                  requesting that the content be removed. The notice must
                  include: (a) your (or your agent’s) physical or electronic
                  signature; (b) identification of the copyrighted work on our
                  Site that is claimed to have been infringed (or a
                  representative list if multiple copyrighted works are included
                  in one notification); (c) identification of the content that
                  is claimed to be infringing or the subject of infringing
                  activity, including information reasonably sufficient to allow
                  us to locate the content on the Site; (d) your name, address,
                  telephone number and email address (if available); (e) a
                  statement that you have a good faith belief that use of the
                  content in the manner complained of is not authorized by you
                  or your agent or the law; and (f) a statement that the
                  information in the notification is accurate and, under penalty
                  of perjury, that you or your agent is authorized to act on
                  behalf of the copyright owner. If you believe in good faith
                  that a notice of copyright infringement has been wrongly filed
                  against you, you may send us a counter-notice. You may read
                  more information about the DMCA at{" "}
                  <a
                    className="no-underline text-gray-500"
                    href="http://www.copyright.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.copyright.gov
                  </a>
                  .
                </li>
                <li className="mb-3">
                  Notices and counter-notices should be sent to LIVEPARTE by
                  emailing{" "}
                  <a
                    className="no-underline text-gray-500"
                    href="mailto:support@liveparte.com"
                  >
                    support@liveparte.com
                  </a>
                  . There can be penalties for false claims under the DMCA. We
                  suggest that you consult your legal advisor before filing a
                  notice or counter-notice.
                </li>
                <li className="mb-3">
                  If you are found to be a repeat copyright infringer and we
                  receive multiple DMCA or other copyright infringement notices
                  regarding your User Content, you agree that we may take
                  actions to prevent future infringement, such as:
                </li>
                <li>Blocking your account from future content uploads.</li>
                  <li>Terminating your account and access to the Site.</li>
                  <li>Putting your email address on a banned list.</li>
                  <li>
                    Prohibiting you and anyone using your email address, IP
                    address, or other identifying information from reopening
                    your account or opening a new account.
                  </li>
              </ul>
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
            Termination.
            </div>

            <div>
            We reserve the right to modify, suspend, remove, discontinue, terminate or otherwise disable a User account or access to the Site at any time and for any reason, including for your violation of these Terms as determined in our sole and absolute discretion. Whether you are an Event Producer or an Attendee, if we terminate or suspend your account, you will have no further access to your account, or anything associated with it and the conditional license granted to you hereunder shall immediately cease. We will not have any liability to you for exercising such rights, including with regard to any deletion of Event Producer Content, Event Producer Communications, or other User Content. All provisions of these Terms which by their nature should survive, shall so survive the termination, including without limitation, ownership provisions, disclaimers of warranties, limitations of liability, and indemnities.
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
            Third Party Links.
            </div>

            <div>
            The Site may contain links to other websites that may not be owned or operated by us. The fact that we may link to those websites does not indicate any approval or endorsement of those websites. We have no control over those websites. We are not responsible for the content of those websites, or the privacy practices of those websites. We strongly encourage you to become familiar with the terms of use and practices of any linked website. Your use of such other websites is at your own risk and is subject to the terms of use and privacy policies of those websites. It is up to you to take precautions to ensure that whatever links you select or software you download (whether from the Site or other sites) is free of viruses, worms, Trojan horses, defects, date bombs, time bombs and other items of a destructive nature.
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
            Access from Outside Nigeria.
            </div>

            <div>
            We operate the Site from our offices in Nigeria. We do not represent that Content available on or through the Site is appropriate or available in other locations. We may limit the availability of the Site or any service or product described on the Site to any person or geographic area at any time. If you choose to access the Site from outside Nigeria, you do so at your own risk and you are responsible for following applicable local laws.
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
            Rules for Sweepstakes, Contests and Games.
            </div>

            <div>
            In addition to these Terms, sweepstakes, contests, games or other promotions (collectively, “Promotions”) made available through the Site may have specific rules that are different from these Terms. By participating in a Promotion, you will become subject to those rules. You should review the rules before you participate in a Promotion. Promotion rules will control over any conflict with these Terms, except in all instances the arbitration agreement and class action waiver set forth below will control and apply.
            </div>
          </div>
          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
            Violation of these Terms.
            </div>

            <div>
            We may investigate any violation of these Terms, including unauthorized use of the Site. We may provide law enforcement with information you provide to us related to your transactions to assist in any investigation or prosecution of you. We may take legal action that we feel is appropriate. You agree that monetary damages may not provide us a sufficient remedy and that we may pursue injunctive or other relief for your violation of these Terms. If we determine that you have violated these Terms or the law, are stalking a User or someone associated with LIVEPARTE, or otherwise interfering with activities associated with a Ticket, or for any other reason or for no reason, we may cancel your account, delete all your User Content and prevent you from accessing the Site at any time without notice to you. If that happens, you may no longer use the Site or any Content. You will still be bound by your obligations under these Terms. You agree that we will not be liable to you or any third party for termination of your access to the Site or to your account or any related information, and we will not be required to make the Site or your account or any related information available to you. We may also cancel any Tickets sold or offered through the Site. We may refuse to honor pending and future offers made from all accounts we believe may be associated with you or cancel a Ticket order associated with any person we believe to be acting with you or on your behalf or exercise any other remedy available to us.
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
            Disclaimer of Warranties.
            </div>

            <div>
            WE PROVIDE THE SITE AND THE CONTENT TO YOU “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND. WE TRY TO KEEP THE SITE UP, BUG-FREE AND SAFE, BUT YOU USE IT AT YOUR OWN RISK. TO THE FULLEST EXTENT PERMISSIBLE BY LAW, AND TO THE EXTENT THAT APPLICABLE LAW PERMITS THE DISCLAIMER OF EXPRESS OR IMPLIED WARRANTIES, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING ANY WARRANTY OF TITLE, NON-INFRINGEMENT, ACCURACY, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR WARRANTIES THAT MAY ARISE FROM COURSE OF DEALING OR COURSE OF PERFORMANCE OR USAGE OF TRADE. WE DO NOT GUARANTEE THAT THE SITE WILL ALWAYS BE SAFE, SECURE OR ERROR-FREE OR THAT THE SITE WILL ALWAYS FUNCTION WITHOUT DISRUPTIONS, DELAYS OR IMPERFECTIONS. WE DO NOT GUARANTEE THE QUALITY OR STANDARD OF ANY OF THE TICKETS OR OTHER GOODS AND SERVICES THAT WE MAY OFFER THROUGH THE SITE FROM TIME TO TIME. YOU ARE TAKING THE RISK THAT THE EVENT PRODUCERS MAY NOT PROVIDE THE LEVEL OF INTERACTION THAT YOU WERE ANTICIPATING OR THAT THE TICKET OR OTHER GOOD OR SERVICE PURCHASED DOES NOT MEET YOUR EXPECTATIONS. WE ARE NOT RESPONSIBLE FOR THE ACTIONS OR INFORMATION OF THIRD PARTIES, INCLUDING USERS, AND YOU RELEASE US FROM ANY CLAIMS AND DAMAGES, KNOWN AND UNKNOWN, ARISING OUT OF OR IN ANY WAY CONNECTED WITH ANY CLAIM YOU HAVE AGAINST ANY SUCH THIRD PARTIES. IF YOU ARE A CALIFORNIA RESIDENT, YOU WAIVE CALIFORNIA CIVIL CODE §1542, WHICH SAYS: A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS OR HER FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH IF KNOWN BY HIM OR HER MUST HAVE MATERIALLY AFFECTED HIS SETTLEMENT WITH THE DEBTOR.
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
            Limitation of Liability.
            </div>

            <div>
            <ul className="list-disc px-4 m-0">
    
    <li className="mb-3">
      IN NO EVENT WILL WE OR OUR AFFILIATE ENTITIES, SUPPLIERS, SERVICE PROVIDERS, ADVERTISERS AND SPONSORS, BE RESPONSIBLE OR LIABLE TO YOU OR ANYONE ELSE FOR, AND YOU HEREBY KNOWINGLY AND EXPRESSLY WAIVE ALL RIGHTS TO SEEK, DIRECT, INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES OF ANY TYPE OTHER THAN OUT OF POCKET EXPENSES, AND ANY RIGHTS TO HAVE DAMAGES MULTIPLIED OR OTHERWISE INCREASED, ARISING OUT OF OR IN CONNECTION WITH THE SITE, THE CONTENT, OR ANY TICKET PURCHASED THROUGH THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, AND REGARDLESS OF WHETHER THE CLAIM IS BASED UPON ANY CONTRACT, TORT, OR OTHER LEGAL OR EQUITABLE THEORY. WITHOUT LIMITING THE FOREGOING, YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT WE WILL HAVE NO LIABILITY OR RESPONSIBILITY WHATSOEVER FOR (a) ANY FAILURE OF ANOTHER USER OF THE SITE TO CONFORM TO THE CODE OF CONDUCT, (b) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, WHETHER ARISING IN CONTRACT OR IN TORT, RESULTING FROM YOUR ATTENDANCE AT A LIVE EVENT RELATING TO A PURCHASED TICKET OR SUBSCRIPTION OR ACCESS TO AND USE OF OUR SITE, (c) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (d) ANY BUGS, VIRUSES, WORMS, TROJAN HORSES, DEFECTS, DATE BOMBS, TIME BOMBS OR OTHER ITEMS OF A DESTRUCTIVE NATURE WHICH MAY BE TRANSMITTED TO OR THROUGH OUR SITE, (e) ANY ERRORS, MISTAKES, INACCURACIES OR OMISSIONS IN ANY CONTENT, OR (f) ANY LOST, STOLEN OR DAMAGED TICKETS, OR THE FAILURE OF AN EVENT PRODUCER TO HONOR A TICKET OR SUBSCRIPTION. YOUR SOLE AND EXCLUSIVE REMEDY FOR DISSATISFACTION WITH THE SITE IS TO STOP USING THE SITE. THE LIMITATIONS IN THIS SECTION WILL APPLY EVEN IF ANY LIMITED REMEDY FAILS OF ITS ESSENTIAL PURPOSE. THE ALLOCATION OF RISK BETWEEN US IS AN ESSENTIAL ELEMENT OF THE BASIS OF THE BARGAIN BETWEEN US.
    </li>
    <li className="mb-3">
      OUR AGGREGATE LIABILITY ARISING OUT OF THESE TERMS OR THE USE OF THE SITE WILL NOT EXCEED (I) THE GREATER OF ONE HUNDRED DOLLARS ($100) OR (A) IN THE CASE OF EVENT PRODUCERS, THE AMOUNT WE HAVE EARNED FROM YOUR USE OF THE SERVICES IN THE PAST TWELVE MONTHS, OR (B) IN THE CASE OF ATTENDEES, THE AMOUNT YOU HAVE PAID TO US FOR YOUR USE OF THE SERVICES IN THE PAST TWELVE MONTHS. IN NO EVENT WILL ATTORNEYS’ FEES BE AWARDED OR RECOVERABLE BY YOU. OUR LIABILITY WILL BE LIMITED UNDER THIS PARAGRAPH TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, AND THE PROVISIONS OF THIS PARAGRAPH WILL NOT APPLY TO THE EXTENT APPLICABLE LAW PERMITS THE RECOVERY OF DAMAGES, ATTORNEYS’ FEES OR COSTS OTHERWISE PROHIBITED UNDER THIS PARAGRAPH. THE PROVISIONS OF THIS PARAGRAPH THAT (A) PROHIBIT DAMAGES TO BE MULTIPLIED OR OTHERWISE INCREASED, (B) IMPOSE A DAMAGES LIMITATION OF THE GREATER OF ONE HUNDRED DOLLARS ($100) OR THE AMOUNT WE HAVE EARNED FROM YOUR USE AS AN EVENT PRODUCER OR THE AMOUNT YOU HAVE PAID US IN THE PAST TWELVE MONTHS AS AN ATTENDEE, AS THE CASE MAY BE, AND (C) PROHIBIT THE RECOVERY OF ATTORNEYS’ FEES AND COSTS, DO NOT APPLY IN CERTAIN STATES, INCLUDING WITHOUT LIMITATION NEW JERSEY, TO CLAIMS BROUGHT UNDER STATUTES PERMITTING SUCH RECOVERY.
    </li>
  </ul>
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
            Indemnification.
            </div>

            <div>
            If anyone brings a claim against us related to your use of the Site, your User Content, your Event Producer Content, your Event Producer Communications, your violation of these Terms, or your negligence or willful misconduct in connection with your use of the Site, you agree to indemnify, defend and hold us and our affiliated companies, suppliers, advertisers and sponsors, and each of our officers, directors, employees, and agents, harmless from and against any and all claims, damages, losses and expenses of any kind (including reasonable legal fees and costs). We reserve the right to take exclusive control and defense of any claim, and you will cooperate fully with us in asserting any available defenses.
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
            Disputes, including Mandatory Arbitration and Class Action Waiver.
                        </div>

            <div>
            <div>
  <ul className="list-disc px-4 m-0">

    <li className="mb-3">
      YOU AND WE EACH AGREE THAT, EXCEPT AS PROVIDED BELOW, ANY DISPUTE, CLAIM, OR CONTROVERSY RELATING IN ANY WAY TO THE TERMS, YOUR USE OF THE SITE, OR PRODUCTS OR SERVICES SOLD, DISTRIBUTED, ISSUED, OR SERVICED BY OR THROUGH US—IRRESPECTIVE OF WHEN THAT DISPUTE, CLAIM, OR CONTROVERSY AROSE—WILL BE RESOLVED SOLELY BY BINDING, INDIVIDUAL ARBITRATION AS SET FORTH IN THESE TERMS, RATHER THAN IN COURT. YOU AND WE THEREBY EACH AGREE TO WAIVE ANY RIGHT TO A JURY TRIAL AND AGREE THAT YOU AND WE MAY BRING CLAIMS AGAINST EACH OTHER ONLY IN AN INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
    </li>
    <li className="mb-3">
      Exceptions. The arbitration agreement and class action waiver set forth in this Section 16 shall be subject to these limited exceptions:
     
    </li>
    <li className="mb-3">You may assert claims in small claims court if your claims apply.</li>
        <li className="mb-3">If a claim involves the conditional license granted to you as described in the Ownership of Content and Grant of Conditional License section above, either of us may file a lawsuit in a federal or state court located within Los Angeles County, California, and we both consent to the jurisdiction of those courts for such purposes.</li>
        <li className="mb-3">In the event that the arbitration agreement in the Terms is for any reason held to be unenforceable, any litigation against us (except for small claims court actions) may be commenced only in a federal or state court located within The Federal Republic of Nigeria and you and we each consent to the jurisdiction of those courts for such purposes.</li>
        <li className="mb-3">You and we each retain the right to participate in class-wide settlement of claims.</li>
        <div >     
           <strong className="font-semibold text-[16px]">Informal Dispute Resolution</strong>. You and we each recognize and agree that good faith, informal efforts to resolve disputes often result in prompt, low-cost, and mutually beneficial outcomes. Therefore, you and we each agree that, before either of us may commence an arbitration or assert a claim in small claims court, you and we will engage in the following informal dispute resolution process:
        </div>
        <ul className="list-disc px-4 m-0">
        <li className="mb-3">The party seeking to initiate a claim in arbitration or small claims court (“claimant”) must give written notice to the other party (“respondent”). To notify us that you intend to initiate informal dispute resolution, you must send an email to LIVEPARTE, Inc. at legal@LIVEPARTE.com, providing: your full name; the email address and mailing address associated with your LIVEPARTE account; your counsel’s name and contact information, if you are represented by counsel; and a brief description of your claim(s) and the relief sought. To notify you that we intend to initiate informal dispute resolution, we will email you at the email address associated with your LIVEPARTE account and provide a brief description of our claim(s) and the relief sought, and our counsel’s name and contact information.</li>
        <li className="mb-3">You and we will then personally meet and confer, via teleconference or videoconference, in a good faith effort to informally resolve any claim covered by this mutual arbitration agreement. If either you or us is represented by counsel, that counsel may participate in the informal dispute resolution conference.</li>
        <li className="mb-3">All offers, promises, conduct, and statements made in the course of the informal dispute resolution process by any party, its agents, employees, and attorneys are confidential and not admissible for any purpose in any subsequent proceeding, provided that evidence that is otherwise admissible or discoverable shall not be rendered inadmissible or non-discoverable as a result of its use in the informal dispute resolution process.</li>
        <li className="mb-3">The informal dispute resolution conference shall occur within sixty (60) days of receipt of the written notice described above unless an extension is mutually agreed upon by you and us. If, after participating in that conference, you and we have been unable to resolve the dispute, the claimant may commence an arbitration or assert a claim in small claims court in accordance with this arbitration agreement.</li>
        <li className="mb-3">Any statute of limitations will be tolled while you and we engage in the informal dispute resolution process described in this section.</li>
      </ul>
  </ul>
</div>

<div>
  <span className="font-semibold text-[16px]">Governing Law; Interpretation and Enforcement.</span>
 The arbitration agreement in the Terms is governed by the Arbitration And Mediation Act (2023) ({`“AMA"`}), including its procedural provisions, in all respects. This means that the AMA governs, among other things, the interpretation and enforcement of this arbitration agreement and all of its provisions, including, without limitation, the class action waiver. State arbitration laws do not govern in any respect. Further, you and we each agree that the Terms evidence a transaction involving interstate commerce and will be governed by and construed in accordance with federal law to the fullest extent possible.
</div>

<div className="mt-8">
  <div className="mb-4">
    <span className="font-semibold text-lg">Arbitration Generally; Relief Available.</span> There is no judge in arbitration, and court review of an arbitration award is limited pursuant to the AMA. However, an arbitrator can award on an individual basis the same damages and relief as a court (including injunctive and declaratory relief or statutory damages) and must follow the Terms as a court would. For the avoidance of doubt, the arbitrator can award public injunctive relief if authorized by law and warranted by the individual claim(s).
  </div>

  <div className="mb-4">
    <span className="font-semibold text-lg">Attorneys’ Fees.</span> You are responsible for your own attorneys’ fees. We will not pay any attorneys’ fees unless ordered to do so by the arbitrator. For the avoidance of doubt, in cases where a statute gives you the right to recover attorneys’ fees if you prevail, the arbitrator may award attorneys’ fees pursuant to that statute.
  </div>

  <div className="mb-4">
    <span className="font-semibold text-lg">Delegation; Interpretation.</span> The arbitrator shall have exclusive authority to the extent permitted by law to resolve all disputes arising out of or relating to the interpretation, applicability, enforceability, or formation of this Agreement, including, but not limited to, any claim that all or any part of this Agreement is void or voidable; however, in the event of a dispute about which particular version of this Agreement you agreed to, a court will decide that specific question. This arbitration agreement is intended to be broadly interpreted and will survive termination of the Terms.
  </div>

  <div className="mb-4">
    <span className="font-semibold text-lg">Limited Right to Appeal.</span> As explained above, court review of the arbitrator’s decision is limited pursuant to the AMA; however, the Terms provide a limited right to appeal the arbitrator’s decision to a panel of arbitrators, as set forth in this sub-section. Specifically, in the event that the arbitrator awards injunctive relief against either you or us, the party against whom injunctive relief was awarded may – within 21 days of the arbitrator’s final decision – appeal that decision.
  </div>

  <div className="mb-4">
    <h3 className="font-semibold text-lg">Severability.</h3>
    If any part of the Terms is determined to be illegal, invalid, or unenforceable, you agree that: (a) that part shall nevertheless be enforced to the extent permissible in order to affect the intent of the Terms, and (b) the remaining parts shall be deemed valid and enforceable.
  </div>

  <div>
    <h3 className="font-semibold text-lg">Questions.</h3>
    If you have any questions, comments, or complaints regarding these Terms or the Site, please contact us at: <a href="mailto:support@liveparte.com" className="text-blue-500">support@liveparte.com</a>
  </div>
</div>
            </div>
          </div>

          {/*  */}
        </div>
      </div>
    </PrivacyTermsLayout>
  );
}
