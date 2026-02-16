import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '../../services/supabase';
import { createConnectAccount, getConnectAccountLink } from '../../services/stripeConnect';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

export default function PilotRegister() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    licenseNumber: '',
    medicalExpiry: '',
    alaskaHours: '',
    aircraftTailNumber: '',
    insuranceLiability: '',
    insuranceHull: '',
  });

  const [files, setFiles] = useState<{
    license: File | null;
    medical: File | null;
    insurance: File | null;
    w9: File | null;
  }>({
    license: null,
    medical: null,
    insurance: null,
    w9: null,
  });

  const registerPilot = useMutation({
    mutationFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error('Not authenticated');

      const uploadFile = async (file: File, bucket: string, path: string) => {
        const { error } = await supabase.storage.from(bucket).upload(path, file);
        if (error) throw error;
        const { data } = supabase.storage.from(bucket).getPublicUrl(path);
        return data.publicUrl;
      };

      const licenseUrl = files.license 
        ? await uploadFile(files.license, 'pilot-documents', `${session.session.user.id}/license.pdf`)
        : null;
      
      const medicalUrl = files.medical
        ? await uploadFile(files.medical, 'pilot-documents', `${session.session.user.id}/medical.pdf`)
        : null;
      
      const insuranceUrl = files.insurance
        ? await uploadFile(files.insurance, 'pilot-documents', `${session.session.user.id}/insurance.pdf`)
        : null;
      
      const w9Url = files.w9
        ? await uploadFile(files.w9, 'pilot-documents', `${session.session.user.id}/w9.pdf`)
        : null;

      const stripeAccountId = await createConnectAccount(
        session.session.user.id,
        session.session.user.email!
      );

      const { error } = await supabase.from('pilots').insert({
        user_id: session.session.user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        license_number: formData.licenseNumber,
        medical_expiry: formData.medicalExpiry,
        ifr_certified: true,
        alaska_hours: parseInt(formData.alaskaHours),
        aircraft_tail_number: formData.aircraftTailNumber,
        insurance_liability: parseInt(formData.insuranceLiability),
        insurance_hull: parseInt(formData.insuranceHull),
        license_pdf_url: licenseUrl,
        medical_pdf_url: medicalUrl,
        insurance_pdf_url: insuranceUrl,
        w9_pdf_url: w9Url,
        stripe_connect_account_id: stripeAccountId,
        approved: false,
      });

      if (error) throw error;

      const onboardingLink = await getConnectAccountLink(stripeAccountId);
      window.location.href = onboardingLink;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerPilot.mutate();
  };

  const handleFileChange = (field: keyof typeof files, file: File | null) => {
    setFiles(prev => ({ ...prev, [field]: file }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-4xl font-bold text-alaska-blue mb-2">Become a JuneauAir Pilot</h1>
            <p className="text-gray-600 mb-8">Join our marketplace and earn 95% of every flight</p>

            <div className="bg-blue-50 border-l-4 border-alaska-blue p-4 mb-8">
              <h3 className="font-semibold text-alaska-blue mb-2">Requirements:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• FAA current license</li>
                <li>• IFR rated</li>
                <li>• 1,000+ hours Alaska time</li>
                <li>• $1M+ liability insurance</li>
                <li>• $250K+ hull insurance</li>
                <li>• Valid medical certificate</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-alaska-blue focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-alaska-blue focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">FAA License Number</label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-alaska-blue focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Medical Expiry</label>
                  <input
                    type="date"
                    value={formData.medicalExpiry}
                    onChange={(e) => setFormData({ ...formData, medicalExpiry: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-alaska-blue focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Alaska Hours</label>
                  <input
                    type="number"
                    min="1000"
                    value={formData.alaskaHours}
                    onChange={(e) => setFormData({ ...formData, alaskaHours: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-alaska-blue focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Aircraft Tail Number</label>
                <input
                  type="text"
                  value={formData.aircraftTailNumber}
                  onChange={(e) => setFormData({ ...formData, aircraftTailNumber: e.target.value })}
                  placeholder="N12345"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-alaska-blue focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Liability Insurance ($)</label>
                  <input
                    type="number"
                    min="1000000"
                    value={formData.insuranceLiability}
                    onChange={(e) => setFormData({ ...formData, insuranceLiability: e.target.value })}
                    placeholder="1000000"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-alaska-blue focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Hull Insurance ($)</label>
                  <input
                    type="number"
                    min="250000"
                    value={formData.insuranceHull}
                    onChange={(e) => setFormData({ ...formData, insuranceHull: e.target.value })}
                    placeholder="250000"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-alaska-blue focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="border-t-2 border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Required Documents
                </h3>

                <div className="space-y-4">
                  {(['license', 'medical', 'insurance', 'w9'] as const).map((field) => (
                    <div key={field}>
                      <label className="block text-gray-700 font-medium mb-2 capitalize">
                        {field === 'w9' ? 'W-9 Form' : `${field} Document`}
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(field, e.target.files?.[0] || null)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
                        required
                      />
                      {files[field] && (
                        <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          {files[field]!.name}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={registerPilot.isPending}
                className="w-full bg-alaska-blue text-white py-5 px-8 rounded-xl text-xl font-bold hover:bg-alaska-blue/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
              >
                {registerPilot.isPending ? 'Submitting...' : 'Submit Application'}
              </button>

              {registerPilot.isSuccess && (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <p className="text-green-700 font-semibold">Application submitted!</p>
                  <p className="text-sm text-green-600 mt-1">Redirecting to Stripe Connect...</p>
                </div>
              )}

              {registerPilot.isError && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-semibold">Application failed</span>
                  </div>
                  <p className="text-sm text-red-600 mt-1">
                    {(registerPilot.error as Error)?.message}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
