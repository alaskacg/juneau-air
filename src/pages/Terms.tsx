export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-alaska-blue mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using JuneauAir.com ("Service"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
              <p className="text-gray-700">
                JuneauAir.com is a marketplace connecting customers with FAA-certified bush pilots in Southeast Alaska. 
                We facilitate booking, payment processing, and GPS tracking but do not operate aircraft or employ pilots.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Booking and Payment</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Base rate: $350 per passenger</li>
                <li>Platform retains 5% fee, 95% paid to pilot</li>
                <li>Payment held in escrow until landing confirmed</li>
                <li>Refunds subject to cancellation policy (see below)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cancellation Policy</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>48+ hours before flight:</strong> 100% refund</li>
                <li><strong>24-48 hours before flight:</strong> 50% refund (50% cancellation fee to pilot)</li>
                <li><strong>Less than 24 hours or no-show:</strong> No refund (80% to pilot, 20% to platform)</li>
                <li><strong>Weather cancellation:</strong> Flight credit valid for 1 year (no refund)</li>
                <li><strong>Pilot no-show:</strong> 100% refund + $100 credit</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Safety and Weather</h2>
              <p className="text-gray-700">
                Flights may be blocked or cancelled due to weather conditions including but not limited to: 
                ceiling below 1,000 feet, visibility below 3 miles, winds exceeding 25 knots, or severe weather alerts. 
                Final go/no-go decision rests with the pilot in command.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Liability and Insurance</h2>
              <p className="text-gray-700">
                All pilots are required to maintain minimum $1M liability insurance and $250K hull insurance. 
                JuneauAir.com is not liable for accidents, injuries, or damages occurring during flights. 
                Customers must sign a liability waiver before boarding.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Pilot Requirements</h2>
              <p className="text-gray-700">
                All pilots must be FAA certified, IFR rated, have 1,000+ hours Alaska flight time, 
                current medical certificate, and pass admin verification. Pilots operate as independent contractors.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. GPS Tracking</h2>
              <p className="text-gray-700">
                All flights are tracked via GPS for safety and payment verification. Pilots must record takeoff 
                and landing with photo proof. Location data is retained for safety audits and insurance claims.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Privacy</h2>
              <p className="text-gray-700">
                We collect personal information including name, email, phone, payment details, and GPS location. 
                Data is used solely for booking, payments, and safety. We do not sell your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Prohibited Activities</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Fraudulent bookings or payment information</li>
                <li>Harassment of pilots or staff</li>
                <li>Tampering with GPS tracking systems</li>
                <li>Illegal cargo or activities</li>
                <li>Booking under the influence of alcohol or drugs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Dispute Resolution</h2>
              <p className="text-gray-700">
                Disputes must be submitted in writing to support@juneauair.com within 7 days of the flight. 
                All disputes are subject to binding arbitration in Alaska.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. Continued use of the service 
                constitutes acceptance of updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact</h2>
              <p className="text-gray-700">
                Questions about these terms? Contact us at:<br />
                Email: legal@juneauair.com<br />
                Phone: (907) 555-AIR1<br />
                Address: Juneau, Alaska 99801
              </p>
            </section>

            <p className="text-sm text-gray-500 mt-8">
              Last updated: {new Date().toLocaleDateString()}<br />
              JuneauAir.com - Bush Charter Marketplace
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
