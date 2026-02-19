import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const faqData: FAQSection[] = [
  {
    title: 'Booking',
    items: [
      {
        question: 'How do I book a flight?',
        answer: 'Search for your route on the homepage or Routes page, select your date, passengers, and submit a booking request. Payment is collected via Stripe and held in escrow until the flight is completed.',
      },
      {
        question: 'How does the payment process work?',
        answer: 'When you book, your payment is held securely via Stripe escrow. After the pilot confirms takeoff and landing (verified by GPS), 95% of the payment is released to the pilot and 5% goes to the platform. No funds are released until the flight is complete.',
      },
      {
        question: 'Can I book a group flight?',
        answer: 'Yes! Select the number of passengers when booking. For groups larger than 9, or for multi-aircraft charters, contact us directly at fly@juneauair.com for a custom quote.',
      },
      {
        question: 'How far in advance should I book?',
        answer: 'We recommend booking at least 48 hours in advance for the best availability and full cancellation flexibility. Same-day bookings are possible based on pilot availability and weather.',
      },
    ],
  },
  {
    title: 'Weather',
    items: [
      {
        question: 'What happens if weather cancels my flight?',
        answer: 'You receive a full flight credit valid for 1 year. No penalty, no fees. Weather cancellations are determined by real-time NOAA METAR/TAF data against our safety minimums.',
      },
      {
        question: 'Who decides if weather is safe for flying?',
        answer: 'Our automated system checks real-time conditions against minimums (1,000 ft ceiling, 3 SM visibility, 25 kt max wind). Even if the system shows GO, the pilot in command has final authority to cancel for safety.',
      },
      {
        question: 'How do I check current weather conditions?',
        answer: 'Visit our Weather Dashboard at /weather for live METAR/TAF data across all 18 destinations. You can also check route-specific weather for your departure and arrival airports.',
      },
    ],
  },
  {
    title: 'Safety',
    items: [
      {
        question: 'What are the pilot qualifications?',
        answer: 'All pilots have a minimum of 5,000 hours Alaska flying experience, valid FAA commercial or ATP certificate, current medical, IFR rating, and carry $1M+ liability insurance. Every pilot is background-checked and admin-approved.',
      },
      {
        question: 'What aircraft requirements exist?',
        answer: 'All aircraft must have current annual inspections, 100-hour Part 135 inspections, and pass our maintenance documentation review. Aircraft must carry ELT, survival gear, and GPS tracking.',
      },
      {
        question: 'Is there insurance coverage?',
        answer: 'Yes. All pilots carry minimum $1M per-seat liability insurance and $250K hull insurance. You will sign a waiver before boarding, but you are fully covered under the pilot\'s policy.',
      },
    ],
  },
  {
    title: 'For Pilots',
    items: [
      {
        question: 'How do I join as a pilot?',
        answer: 'Visit the Pilot Registration page and submit your application with FAA license, medical certificate, insurance documents, and W-9. After admin review, you\'ll be onboarded to Stripe Connect for payments.',
      },
      {
        question: 'How do payouts work?',
        answer: 'After a confirmed landing (GPS-verified with photo), 95% of the booking amount is transferred to your Stripe Connect account. Payouts to your bank typically arrive in 2-3 business days.',
      },
      {
        question: 'How does the rating system work?',
        answer: 'Customers rate their experience after each flight. Your rating is visible to future customers and helps build your reputation. Consistently low ratings may trigger a review.',
      },
    ],
  },
  {
    title: 'Pricing',
    items: [
      {
        question: 'How is pricing determined?',
        answer: 'Prices are based on aircraft type, route distance, and number of passengers. Base rates range from $250/hr (Super Cub) to $1,200/hr (King Air 350). A 5% platform fee is included in the displayed price.',
      },
      {
        question: 'Are deposits required?',
        answer: 'Full payment is collected at booking but held in escrow. You are not charged beyond what you book, and refund policies apply if you cancel.',
      },
      {
        question: 'Can I tip my pilot?',
        answer: 'Tips are appreciated but not required. You can tip in cash directly to your pilot after the flight.',
      },
    ],
  },
  {
    title: 'Luggage & Gear',
    items: [
      {
        question: 'What are the weight limits?',
        answer: 'Weight limits vary by aircraft. Cessna 206: ~800 lbs total payload. Beaver: ~1,000 lbs. Caravan: ~2,000 lbs. Your pilot will confirm limits when confirming the booking. Be honest about gear weight — it\'s a safety issue.',
      },
      {
        question: 'Can I bring fishing or hunting gear?',
        answer: 'Absolutely. Fishing rods, tackle, hunting rifles (unloaded, in cases), and camping gear are all standard bush flight cargo. Let us know what you\'re bringing when you book so we can match the right aircraft.',
      },
      {
        question: 'What about coolers and game meat?',
        answer: 'Coolers are common on return flights from fishing/hunting trips. Ensure coolers are sealed and within weight limits. Game meat must be properly stored.',
      },
    ],
  },
];

function AccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-800 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left hover:text-sky-400 transition-colors"
      >
        <span className="font-medium text-sm pr-4">{item.question}</span>
        {open ? <ChevronUp className="w-4 h-4 shrink-0 text-slate-400" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />}
      </button>
      {open && (
        <div className="pb-4 text-sm text-slate-400 leading-relaxed">
          {item.answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about booking bush flights with Juneau Air.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          {faqData.map((section) => (
            <div key={section.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4 text-sky-400">{section.title}</h2>
              <div>
                {section.items.map((item) => (
                  <AccordionItem key={item.question} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
