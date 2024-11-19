import PrivacyTermsLayout from "@/components/Layout/Privacy&TermsLayout";
import Link from "next/link";
import React, { useState } from "react";

export default function privacy() {
  return (
    <PrivacyTermsLayout>
      <div className="w-full">
        <div className="text-[45px] font-1 font-medium text-white mb-[40px]">
          Purchase Policy
        </div>
        <div className="text-[14px] text-white font500">
          <div className=" text-[14px] font500 text-white mb-[10px]">
            Liveparte (“Liveparte”, “we”, “us”, “our”) is a product of Ketail
            Technologies Inc, a company registered under Delaware state laws.
            The purpose of this policy is to outline the terms and conditions
            for purchasing event tickets on Liveparte. This policy ensures a
            transparent, fair, and consistent approach to ticket sales and
            purchases. LIVEPARTE is a ticket based video streaming platform for
            Event Producers’ streaming Events. We do not control the services
            advertised or provided by the Event Producer and do not manage or
            fulfill the merchandise that an Event Producer might include as part
            of an order. While we may collect information from Attendees with
            respect to merchandise (such as shipping and size information), the
            Event Producer is solely responsible for fulfillment of the
            merchandise orders and LIVEPARTE has no responsibility for the
            accuracy of any information collected, the shipping or fulfillment
            of the merchandise or with respect to the merchandise itself. We may
            from time to time offer special promotional offers (“Offers”) to
            Attendees. Offer eligibility is determined by us in our sole
            discretion, and we reserve the right to revoke an Offer and put your
            account on hold in the event that we determine you are not eligible.
            The eligibility requirements and other limitations and conditions
            will be disclosed when you sign-up for the Offer or in other
            communications made available to you
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Purchase Conditions
            </div>

            <div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
                  <b className="font-semibold text-[16px]">Eligibility: </b>
                  Tickets can only be purchased by individuals who are 18 years
                  or older.
                </li>
                <li className="mb-3">
                  <b className="font-semibold text-[16px]">Ticket Limits: </b>
                  Liveparte reserves the right to limit the number of tickets an
                  individual can purchase for a specific event to ensure fair
                  access to all customers.
                </li>
                <li className="mb-3">
                  <b className="font-semibold text-[16px]"> Pricing: </b>
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
                  recommendations, and (v) the ability to create playlists.
                  Monthly plans renew for 30-day periods and annual plans renew
                  for 1-year periods. We may also offer a free subscription
                  trial period. Unless you cancel your subscription before the
                  free period ends, once the free period ends, you will be
                  charged the applicable subscription price for the subscription
                  period that you selected when you created your account. You
                  must pay all fees (plus any taxes) during your subscription
                  period and any renewal periods. Your subscription fees will be
                  charged to the payment method that you will be required to
                  maintain in your account. We may adjust fees from time to time
                  and will attempt to notify you in advance of any such fee
                  changes prior to your next billing cycle. If you do not wish
                  to accept a fee change, you may terminate your subscription by
                  following the process in your account. If you choose to
                  purchase a subscription, to the extent permitted by applicable
                  law, your subscription will continue and automatically renew
                  until terminated. There will be no refunds if you choose to
                  terminate a subscription, however you will be able to continue
                  to view Events through the end of your subscription term. In
                  addition to our other termination rights under these Terms, we
                  shall have the right to discontinue providing the subscription
                  option to Users at any time in our discretion without any
                  liability to you or any third party and, in such event, you
                  may request a refund of any unused prepaid subscription fees
                  as of the date we terminate the subscription option.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Fees and Taxes.
            </div>

            <div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
                  {/* <b className="font-semibold text-[16px]"> General.</b> */}
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
              </ul>
            </div>
          </div>
          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Method of Payment.
            </div>

            <div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
                  {/* <b className="font-semibold text-[16px]"> General.</b> */}
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
                  information when requested.{" "}
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Billing Information Verification.{" "}
            </div>

            <div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
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
              </ul>
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              No Resale or Promotions.
            </div>

            <div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
                  We may provide you with an option to buy Tickets or a
                  subscription as a gift for someone else but the resale of
                  Tickets is expressly prohibited. In addition, Tickets may not
                  be used for advertising, promotions, contests or sweepstakes
                  unless formal written authorization is given by us.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Postponed or Rescheduled Events.{" "}
            </div>
            If an Event is postponed or rescheduled, your Ticket is still valid
            for the rescheduled Event date and we will not issue a refund. If an
            Event Producer cancels an Event, we will issue you a refund to the
            original method of payment used at time of purchase (as outlined
            below) unless your Ticket was part of a subscription, in which case
            you will not receive a refund. We will communicate to Attendees any
            changes to Event times on behalf of the Event Producer.
            <div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
                  {/* <b className="font-semibold text-[16px]"> General.</b> */}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Refunds.{" "}
            </div>

            <div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
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
                  {/* <b className="font-semibold text-[16px]"> General.</b> */}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Ticket Orders.{" "}
            </div>

            <div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
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
              </ul>
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Ability to View an Event.{" "}
            </div>

            <div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
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
              </ul>
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              QUERIES, COMPLAINTS AND DISPUTE RESOLUTION
            </div>

            <div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
                  If we need to contact you, we will use your Ticketmaster
                  account contact details (or the contact details you provided
                  at the time of purchase, if you did not purchase online). It
                  is your responsibility to inform us immediately of any changes
                  to your contact details, whether before or after receipt of
                  Items. In particular, please ensure that you provide us with a
                  valid email address as this is our preferred method of
                  contacting you. You should also be aware that your email
                  mailbox settings may treat our emails as junk, so remember to
                  check your junk and/or spam folders.
                  <br />
                  <br />
                  If you have any queries or complaints regarding your purchase,
                  please contact us at{" "}
                  <Link href="mailto:legal@liveparte.com">
                    {" "}
                    legal@liveparte.com
                  </Link>{" "}
                  quoting any order reference numbers.
                  <br />
                  <br />
                  Your query or complaint shall be acknowledged by us as soon as
                  possible and in any event, within five business days of
                  receipt.
                  <br />
                  <br />
                  We may need to contact one or more Event Partners for more
                  information before responding to your query or complaint.
                  <br />
                  <br />
                  If any dispute arises, we shall use our reasonable endeavours
                  to consult or negotiate in good faith and attempt to reach a
                  just and equitable settlement satisfactory to you, us and any
                  relevant Event Partner. Please note, some complaints can take
                  as much as 28 days to resolve.
                  {/* <b className="font-semibold text-[16px]"> General.</b> */}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Governing Law
            </div>

            <div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
                  This policy and any disputes arising from ticket purchases
                  through Liveparte will be governed by and construed in
                  accordance with the laws of the Federal Republic of Nigeria.
                  {/* <b className="font-semibold text-[16px]"> General.</b> */}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-[40px]">
            <div className="text-[25px] font-1 font-medium text-white mb-[20px]">
              Policy Changes:{" "}
            </div>

            <div>
              <ul className="list-disc px-4 m-0">
                <li className="mb-3">
                  Liveparte reserves the right to amend this policy at any time.
                  Changes will be effective immediately upon posting on the
                  Liveparte website.
                  {/* <b className="font-semibold text-[16px]"> General.</b> */}
                </li>
              </ul>
            </div>
          </div>

          {/*  */}
        </div>
      </div>
    </PrivacyTermsLayout>
  );
}
