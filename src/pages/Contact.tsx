import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Phone, Mail, Clock, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Questions about booking, weather, or becoming a pilot? We're here to help.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-4">Get in Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-sky-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Phone</p>
                      <a href="tel:+15103455439" className="text-sm text-slate-400 hover:text-white transition">(510) 345-5439</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-sky-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">General Inquiries</p>
                      <a href="mailto:fly@juneauair.com" className="text-sm text-slate-400 hover:text-white transition">fly@juneauair.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">For Pilots</p>
                      <a href="mailto:pilot@juneauair.com" className="text-sm text-slate-400 hover:text-white transition">pilot@juneauair.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-sky-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Office Hours</p>
                      <p className="text-sm text-slate-400">Mon–Sun 6AM–9PM AKST</p>
                      <p className="text-xs text-slate-500">Aviation never sleeps</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-sky-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Location</p>
                      <p className="text-sm text-slate-400">Juneau, Alaska</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-800 rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-2 text-red-400">Emergency (Active Flights)</h2>
                <p className="text-sm text-slate-400 mb-2">For emergencies during an active flight:</p>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li>• Call <strong>911</strong></li>
                  <li>• Alaska State Troopers Dispatch</li>
                  <li>• USCG Juneau: <a href="tel:+19074632000" className="text-sky-400 hover:underline">(907) 463-2000</a></li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Send a Message</h2>
              {submitted ? (
                <div className="bg-emerald-900/20 border border-emerald-800 rounded-xl p-6 text-center">
                  <Send className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                  <p className="font-semibold text-emerald-400">Message sent!</p>
                  <p className="text-sm text-slate-400 mt-1">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500"
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="booking">Booking Question</option>
                      <option value="weather">Weather / Cancellation</option>
                      <option value="pilot">Pilot Inquiry</option>
                      <option value="custom">Custom Charter Quote</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500 resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-500 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
