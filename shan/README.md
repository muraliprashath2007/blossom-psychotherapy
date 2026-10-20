# Blossom Psychotherapy & Wellness Platform

A high-converting, responsive, production-ready website built with modern HTML5, Vanilla CSS3, JavaScript, and Three.js 3D animations for **Shaanthini Jayaprakash (Certified Psychotherapist & Wellness Counselor)**.

---

## 🚀 Quick Start / How to Run Locally

The website is running locally at:
```powershell
python -m http.server 3000 --directory d:\shan
```
Open **`http://localhost:3000`** in Chrome, Edge, or Brave.

---

## 🎨 New Features & Visual Highlights

1. **Official Blossom Psychotherapy Logo**:
   - Integrated the circular floral-brain emblem logo (`assets/images/logo.png`) in the header navbar, footer, booking confirmation modal, WhatsApp care desk, and browser tab favicon.
2. **Interactive 3D Three.js Hero Scene**:
   - Floating organic 3D Zen Torus Knot with crystalline wireframe cage and 240 luminous starlight particles.
   - Interactive mouse parallax tracking and ambient multi-color lighting.
3. **3 Unique Luxury Themes (Instant Theme Switcher)**:
   - 🌿 **Emerald Zen** (Default): Healing emerald green, sage, and champagne gold.
   - 🌙 **Midnight Calm**: Ultra-luxurious cyber-zen dark mode with glowing neon cyan/teal accents and glassmorphic cards.
   - 🌸 **Blossom Rose**: Warm sunset rose, blush, and ruby gold.
   - Persists in `localStorage` and smoothly updates 3D canvas colors in real time.
4. **Interactive 3D Card Tilt with Specular Glare**:
   - Dynamic perspective tilt on cards with realistic light reflections following cursor movement.
5. **Floating 3D Zen Breathing Guide**:
   - Bottom-right floating tool launching an interactive 4-4-4-4 Box Breathing modal with expanding/contracting 3D concentric rings.
6. **Strict Input Validation**:
   - **Name**: Strictly alphabets and spaces only (`[a-zA-Z\s]`), max 30 characters, real-time blocking of numbers and symbols, live `(0/30)` counter.
   - **Phone**: Strictly numeric digits (`0-9`), international country code dropdown selector (+91 India requires exactly 10 digits; other countries supported with custom code input).
7. **Preferred Language**:
   - Exclusively **Tamil** and **English**, prefilled into the WhatsApp dispatch message for Shaanthini.
8. **Direct WhatsApp Booking Dispatch**:
   - Submits appointment details directly to Shaanthini Jayaprakash's WhatsApp (`+91 97896 80259`).

---

## 👩‍⚕️ Practitioner Contact & Details

- **Practitioner**: Shaanthini Jayaprakash
- **Qualification**: Certified Psychotherapist & Wellness Counselor (M.Sc. Counseling Psychology)
- **Practice**: Blossom Psychotherapy & Wellness
- **WhatsApp / Phone**: `+91 97896 80259`
- **Email**: `blossomtherapy06@gmail.com`
- **Instagram**: `@blossom._.psychotherapy`
- **Session**: 45-min Confidential Session (Inquire for details)
- **Languages**: Tamil, English

---

## 🚀 How to Deploy & Publish to Production

### 1. Database Setup (Supabase)
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open the **SQL Editor**.
3. Copy and paste the entire contents of [`supabase-schema.sql`](supabase-schema.sql) and click **Run**.
4. All tables (`bookings`, `corporate_leads`, `assessments`), indexes, and RLS policies are now active.

### 2. Deploy Frontend to Vercel (Recommended - 1-Click & Free)
1. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Blossom Psychotherapy"
   git branch -M main
   git remote add origin https://github.com/<your-username>/blossom-psychotherapy.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository and click **Deploy**.
4. Your website will be live globally in ~30 seconds with automatic free SSL!

### 3. Deploy to Netlify (Alternative)
- Simply drag and drop the `d:\shan` folder directly into [app.netlify.com/drop](https://app.netlify.com/drop).
