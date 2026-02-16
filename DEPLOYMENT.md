# JuneauAir Deployment Guide

## 🚀 Production Deployment

### Prerequisites

1. **Supabase Project**
   - Create project at [supabase.com](https://supabase.com)
   - Note your project URL and anon key

2. **Stripe Account**
   - Enable Stripe Connect
   - Get publishable and secret keys
   - Configure webhook endpoints

3. **Domain**
   - JuneauAir.com (or your custom domain)
   - SSL certificate (auto with Vercel/Netlify)

---

## Step 1: Supabase Setup

### 1.1 Create Project
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref your-project-ref
```

### 1.2 Run Migrations
```bash
supabase db push
```

This creates all tables, indexes, RLS policies, and seeds initial locations.

### 1.3 Configure Storage Buckets

Create these buckets in Supabase Dashboard:
- `pilot-documents` - For licenses, medical certs, insurance
- `flight-photos` - For landing verification photos
- `waivers` - For signed waiver PDFs

Set public access on `flight-photos` only.

### 1.4 Set Up Auth

Enable email/password authentication:
- Dashboard → Authentication → Providers
- Enable Email provider
- Configure email templates (booking confirmations, etc.)

---

## Step 2: Stripe Connect Setup

### 2.1 Enable Stripe Connect
```bash
# In Stripe Dashboard:
# 1. Go to Connect → Settings
# 2. Enable Standard accounts
# 3. Set platform name: "JuneauAir"
# 4. Configure branding
```

### 2.2 Create Webhook Endpoint
```
Endpoint URL: https://your-domain.com/api/webhooks/stripe
Events to listen for:
- payment_intent.succeeded
- payment_intent.payment_failed
- account.updated
- transfer.created
```

### 2.3 Get API Keys
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## Step 3: Environment Variables

### 3.1 Create Production .env
```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# NOAA Weather API
VITE_NOAA_API_URL=https://aviationweather.gov/api/data

# Notifications (Backend)
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...

RESEND_API_KEY=re_...
FROM_EMAIL=notifications@juneauair.com
```

---

## Step 4: Deploy to Vercel

### 4.1 Install Vercel CLI
```bash
npm install -g vercel
```

### 4.2 Deploy
```bash
cd juneau-air
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: juneau-air
# - Framework: Vite
# - Build command: npm run build
# - Output directory: dist
```

### 4.3 Configure Environment Variables
```bash
# In Vercel Dashboard:
# Settings → Environment Variables
# Add all variables from .env
```

### 4.4 Set Up Custom Domain
```bash
# In Vercel Dashboard:
# Settings → Domains
# Add domain: juneauair.com
# Configure DNS records
```

---

## Step 5: Supabase Edge Functions (Backend)

Create serverless functions for payment processing:

### 5.1 Create Functions
```bash
supabase functions new create-payment-intent
supabase functions new release-payment
supabase functions new process-refund
supabase functions new create-connect-account
supabase functions new create-connect-link
```

### 5.2 Deploy Functions
```bash
supabase functions deploy create-payment-intent
supabase functions deploy release-payment
supabase functions deploy process-refund
supabase functions deploy create-connect-account
supabase functions deploy create-connect-link
```

### 5.3 Set Function Secrets
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_live_...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## Step 6: DNS Configuration

### 6.1 Point Domain to Vercel
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 6.2 Configure Email (for notifications)
```
Type: MX
Priority: 10
Value: smtp.resend.com

Type: TXT
Name: @
Value: "v=spf1 include:_spf.resend.com ~all"
```

---

## Step 7: Monitoring & Logging

### 7.1 Enable Supabase Logging
```bash
# In Supabase Dashboard:
# Logs → Enable all log types
# Set retention to 7 days minimum
```

### 7.2 Set Up Alerts
Configure alerts for:
- Failed payments
- Pilot no-shows
- GPS tracking failures
- Weather API downtime
- Storage quota warnings

### 7.3 Add Error Tracking (Optional)
```bash
npm install @sentry/react
```

Add Sentry initialization to `src/main.tsx`

---

## Step 8: Testing

### 8.1 Test Stripe in Sandbox
```bash
# Use test keys for initial deployment
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Test cards:
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002
- 3D Secure: 4000 0025 0000 3155

### 8.2 Test GPS Tracking
- Test on mobile device
- Verify location permissions
- Check GPS accuracy
- Test photo upload

### 8.3 Test Weather API
- Verify METAR/TAF parsing
- Test blocking logic
- Check all Alaska airports

---

## Step 9: Go Live Checklist

- [ ] Supabase migrations applied
- [ ] Storage buckets configured
- [ ] RLS policies enabled
- [ ] Stripe Connect enabled
- [ ] Webhook endpoint tested
- [ ] Environment variables set
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Email notifications working
- [ ] SMS notifications working (optional)
- [ ] GPS tracking tested
- [ ] Weather blocking verified
- [ ] Payment flow tested end-to-end
- [ ] Refund logic tested
- [ ] Admin dashboard accessible
- [ ] Legal pages complete (Terms, Privacy)
- [ ] Customer support system ready

---

## Step 10: Post-Launch

### 10.1 Monitor Key Metrics
- Bookings per day
- Average booking value
- Payment success rate
- Pilot approval rate
- Weather cancellation rate
- GPS tracking accuracy

### 10.2 Regular Maintenance
- Weekly: Review incident reports
- Monthly: Check pilot insurance expiry
- Monthly: Review payment disputes
- Quarterly: Update weather thresholds
- Yearly: Review legal compliance

---

## 🚨 Emergency Procedures

### Payment Failures
```bash
# Check Stripe logs
stripe logs tail

# Manually release payment
supabase functions invoke release-payment --body '{"bookingId":"..."}'
```

### GPS Tracking Issues
```bash
# Query flight tracking logs
supabase db query "SELECT * FROM flight_tracking WHERE booking_id = '...'"

# Check pilot location accuracy
# Verify photo upload succeeded
```

### Weather API Downtime
```bash
# Fallback: Manual admin approval
# Admin can override weather block
# Log manual approvals for audit
```

---

## 📞 Support Contacts

- **Supabase Support:** support@supabase.io
- **Stripe Support:** support@stripe.com
- **NOAA Weather API:** aviationweather.gov/contact

---

**Remember: Lives and money depend on this system. Monitor closely. Test thoroughly. Deploy carefully.**
