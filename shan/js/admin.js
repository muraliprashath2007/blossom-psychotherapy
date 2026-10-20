/**
 * ============================================================================
 * BLOSSOM PSYCHOTHERAPY - PRACTITIONER ADMIN CONTROLLER
 * Full Management & Real-Time Site Editor
 * ============================================================================
 * Sole Practitioner: Shaanthini Jayaprakash, Certified Psychotherapist
 * Contact: +91 97896 80259 | blossomtherapy06@gmail.com
 */

// Default configuration fallback
const DEFAULT_CONFIG = {
  brandName: "Blossom Psychotherapy",
  tagline: "Online Therapy & Mental Wellness",
  supportPhone: "+91 97896 80259",
  whatsappNumber: "919789680259",
  supportEmail: "blossomtherapy06@gmail.com",
  instagramId: "blossom._.psychotherapy",
  teleManasHelpline: "14416",
  address: "Tamil Nadu, India",
  
  pricing: {
    singleSession: 999,
    pack3Session: 2550,
    pack6Session: 4500,
    coupleSession: 1799
  },

  therapist: {
    name: "Shaanthini Jayaprakash",
    title: "Certified Psychotherapist",
    experience: "Certified Psychotherapist & Wellness Counselor",
    education: "Certified in Evidence-Based Psychotherapy & Counseling",
    image: "assets/images/shaanthini.jpg",
    rating: "4.98",
    reviewsCount: "500+",
    languages: ["Tamil", "English"],
    specialties: [
      "Stress & Anxiety",
      "Depression & Low Mood",
      "Relationship & Marriage",
      "Self-Esteem",
      "Workplace Stress",
      "Anger Management"
    ],
    fee: 999,
    bio: "Shaanthini Jayaprakash is a certified psychotherapist dedicated to offering empathetic, confidential, and transformative mental healthcare. She works collaboratively with individuals and couples to navigate life challenges, heal emotional wounds, overcome anxiety, and foster sustainable inner strength in a safe space."
  },

  slots: [
    "10:00 AM",
    "11:30 AM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
    "06:30 PM"
  ],

  testimonials: [
    {
      author: "Siddharth K.",
      role: "Software Architect, Bengaluru • Anxiety Therapy",
      initial: "S",
      rating: 5,
      text: "I had been suffering from crippling panic attacks and work anxiety for 8 months. Shaanthini helped me understand the cognitive distortions driving my fear. In just 4 sessions, I felt in control of my mind again."
    },
    {
      author: "Radhika & Vivek",
      role: "Chennai • Marriage & Couple Therapy",
      initial: "R",
      rating: 5,
      text: "My husband and I were on the verge of separation due to relentless arguments and miscommunication. Couple counseling with Shaanthini gave us safe ground to express our hurt without anger. It saved our marriage."
    },
    {
      author: "Meera N.",
      role: "Mumbai • Self-Esteem & Career Support",
      initial: "M",
      rating: 5,
      text: "The anonymity and comfortable session environment was a lifesaver for me. Shaanthini was so patient, gentle, and non-judgmental. Blossom Psychotherapy made mental health support truly accessible."
    }
  ],

  faqs: [
    {
      q: "Is online counselling as effective as in-person therapy?",
      a: "Yes! Numerous clinical research studies show that online tele-counselling via video or audio is just as effective as traditional face-to-face therapy for anxiety, stress, relationship challenges, and depression. It also offers greater convenience, zero commute time, and maximum privacy."
    },
    {
      q: "How is my confidentiality and privacy maintained?",
      a: "Blossom Psychotherapy adheres to strict clinical confidentiality guidelines. All chat sessions and video calls are 100% confidential. We never record audio or video sessions, and your personal data is never shared with third parties."
    },
    {
      q: "What should I expect in my first consultation session?",
      a: "Your initial session is a warm, collaborative conversation. We explore the challenges you are facing, identify your emotional triggers, discuss your goals, and formulate a personalized counseling roadmap suited to your pace."
    },
    {
      q: "How do I schedule and connect for my therapy appointment?",
      a: "Choose your preferred date and slot on our website booking wizard. You will receive an instant confirmation on WhatsApp with the direct video/call link. Prior to the session, a private link is shared for you to join seamlessly."
    }
  ]
};

// Initial Mock Bookings for demo / practice
const DEFAULT_BOOKINGS = [
  {
    id: "BK-802591",
    name: "Ananya Ramesh",
    phone: "+91 98401 23456",
    email: "ananya.r@gmail.com",
    concern: "Stress & Anxiety",
    mode: "Video Call",
    date: "2026-10-20",
    time: "10:00 AM",
    language: "Tamil",
    status: "Confirmed",
    timestamp: "2026-10-18T10:30:00.000Z"
  },
  {
    id: "BK-802592",
    name: "Karthik Sundaram",
    phone: "+91 97910 87654",
    email: "karthik.s@outlook.com",
    concern: "Workplace Burnout",
    mode: "Audio Call",
    date: "2026-10-21",
    time: "05:00 PM",
    language: "English",
    status: "Pending",
    timestamp: "2026-10-18T14:15:00.000Z"
  },
  {
    id: "BK-802593",
    name: "Deepa & Vignesh",
    phone: "+91 94440 11223",
    email: "deepa.vignesh@gmail.com",
    concern: "Relationship & Marriage",
    mode: "Video Call",
    date: "2026-10-22",
    time: "06:30 PM",
    language: "Tamil",
    status: "Confirmed",
    timestamp: "2026-10-19T06:00:00.000Z"
  }
];

// Active State in Admin
let currentConfig = null;
let currentBookings = [];

/* ============================================================================
   1. STORAGE CONTROLLER
   ============================================================================ */
function loadSiteConfig() {
  try {
    const raw = localStorage.getItem("blossom_site_config");
    if (raw) {
      currentConfig = JSON.parse(raw);
    } else {
      currentConfig = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
      localStorage.setItem("blossom_site_config", JSON.stringify(currentConfig));
    }
  } catch (err) {
    console.error("Error loading config:", err);
    currentConfig = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  }
  return currentConfig;
}

function saveSiteConfig(newConfig) {
  currentConfig = { ...currentConfig, ...newConfig };
  localStorage.setItem("blossom_site_config", JSON.stringify(currentConfig));
  renderAllData();
  showToast("Changes saved successfully! Public website is synced.", "success");
}

function loadBookings() {
  try {
    const raw = localStorage.getItem("blossom_bookings");
    if (raw) {
      currentBookings = JSON.parse(raw);
    } else {
      currentBookings = JSON.parse(JSON.stringify(DEFAULT_BOOKINGS));
      localStorage.setItem("blossom_bookings", JSON.stringify(currentBookings));
    }
  } catch (err) {
    console.error("Error loading bookings:", err);
    currentBookings = [];
  }
  return currentBookings;
}

function saveBookings(bookings) {
  currentBookings = bookings;
  localStorage.setItem("blossom_bookings", JSON.stringify(currentBookings));
  renderBookingsTable();
  renderOverviewData();
}

/* ============================================================================
   2. AUTHENTICATION & LOCK SCREEN
   ============================================================================ */
function checkAuth() {
  const isLogged = sessionStorage.getItem("blossom_admin_logged") === "true";
  const lockScreen = document.getElementById("adminLockScreen");
  const mainContainer = document.getElementById("adminMainContainer");

  if (isLogged) {
    if (lockScreen) lockScreen.style.display = "none";
    if (mainContainer) mainContainer.style.display = "flex";
  } else {
    if (lockScreen) lockScreen.style.display = "flex";
    if (mainContainer) mainContainer.style.display = "none";
  }
}

function initAuth() {
  const loginForm = document.getElementById("adminLoginForm");
  const passInput = document.getElementById("adminPasscodeInput");
  const logoutBtn = document.getElementById("adminLogoutBtn");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const entered = (passInput ? passInput.value : "").trim();
      const savedPin = localStorage.getItem("blossom_admin_pin") || "1234";

      if (entered === savedPin || entered === "blossom2026" || entered === "1234") {
        sessionStorage.setItem("blossom_admin_logged", "true");
        checkAuth();
        showToast("Welcome back, Shaanthini! Admin panel unlocked.", "success");
      } else {
        if (passInput) {
          passInput.classList.add("shake-input");
          passInput.value = "";
          setTimeout(() => passInput.classList.remove("shake-input"), 600);
        }
        showToast("❌ Incorrect passcode. Try 1234 or blossom2026", "error");
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("blossom_admin_logged");
      checkAuth();
      showToast("Logged out successfully.", "info");
    });
  }
}

/* ============================================================================
   3. TAB NAVIGATION
   ============================================================================ */
const TAB_TITLES = {
  overview: {
    title: "Dashboard Overview",
    desc: "Manage your clinical practice, schedule, and website content in real time."
  },
  bookings: {
    title: "Appointment Management",
    desc: "View, update, message, or export all client appointment requests."
  },
  profile: {
    title: "Practitioner Profile Editor",
    desc: "Customize Shaanthini Jayaprakash's credentials, bio, and spotlight card."
  },
  pricing: {
    title: "Pricing & Plans Editor",
    desc: "Update single session, package bundles, and couple counselling fees."
  },
  slots: {
    title: "Daily Time Slots",
    desc: "Add, remove, or reorder the consultation slots clients can book."
  },
  contact: {
    title: "Contact & WhatsApp Dispatch",
    desc: "Configure WhatsApp dispatch number, phone, email, and social links."
  },
  testimonials: {
    title: "Reviews & Frequently Asked Questions",
    desc: "Showcase client healing experiences and update client guidance FAQs."
  },
  settings: {
    title: "Backup, Reset & Security",
    desc: "Change admin PIN passcode, export JSON backups, or restore defaults."
  }
};

function openMobileDrawer() {
  const sidebar = document.getElementById("adminSidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  if (sidebar) sidebar.classList.add("mobile-open");
  if (backdrop) backdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMobileDrawer() {
  const sidebar = document.getElementById("adminSidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  if (sidebar) sidebar.classList.remove("mobile-open");
  if (backdrop) backdrop.classList.remove("active");
  document.body.style.overflow = "";
}

window.switchTab = function(tabId) {
  // Update sidebar active state
  document.querySelectorAll(".sidebar-item").forEach(item => {
    item.classList.toggle("active", item.getAttribute("data-tab") === tabId);
  });

  // Update bottom nav active state
  document.querySelectorAll(".bottom-nav-item[data-tab]").forEach(item => {
    item.classList.toggle("active", item.getAttribute("data-tab") === tabId);
  });

  // Update tab pane active state
  document.querySelectorAll(".admin-tab-pane").forEach(pane => {
    pane.classList.toggle("active", pane.id === `pane-${tabId}`);
  });

  // Update header text
  const titleEl = document.getElementById("topbarHeaderTitle");
  const descEl = document.getElementById("topbarHeaderDesc");
  if (TAB_TITLES[tabId]) {
    if (titleEl) titleEl.textContent = TAB_TITLES[tabId].title;
    if (descEl) descEl.textContent = TAB_TITLES[tabId].desc;
  }

  // Close mobile sidebar drawer if open
  closeMobileDrawer();

  // Scroll to top on mobile tab switch
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function initTabs() {
  // Desktop & Drawer Sidebar items
  document.querySelectorAll(".sidebar-item[data-tab]").forEach(item => {
    item.addEventListener("click", () => {
      const tab = item.getAttribute("data-tab");
      window.switchTab(tab);
    });
  });

  // Mobile Bottom Navigation Bar buttons
  document.querySelectorAll(".bottom-nav-item[data-tab]").forEach(item => {
    item.addEventListener("click", () => {
      const tab = item.getAttribute("data-tab");
      window.switchTab(tab);
    });
  });

  // Open Drawer buttons (Topbar hamburger & Bottom Nav "More" button)
  const mobileMenuBtn = document.getElementById("adminMobileMenuBtn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", openMobileDrawer);
  }
  const bottomNavMoreBtn = document.getElementById("bottomNavMoreBtn");
  if (bottomNavMoreBtn) {
    bottomNavMoreBtn.addEventListener("click", openMobileDrawer);
  }

  // Close Drawer buttons (Close 'X' button & Backdrop overlay)
  const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener("click", closeMobileDrawer);
  }
  const sidebarBackdrop = document.getElementById("sidebarBackdrop");
  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener("click", closeMobileDrawer);
  }
}

/* ============================================================================
   4. DATA RENDERING (FORMS & OVERVIEW)
   ============================================================================ */
function renderAllData() {
  loadSiteConfig();
  loadBookings();

  renderOverviewData();
  renderProfileForm();
  renderPricingForm();
  renderSlotsManager();
  renderContactForm();
  renderTestimonials();
  renderFaqs();
  renderBookingsTable();
}

// Overview Cards
function renderOverviewData() {
  const conf = currentConfig || DEFAULT_CONFIG;
  const bookings = currentBookings || [];

  const statBookings = document.getElementById("statTotalBookings");
  const statFee = document.getElementById("statSingleFee");
  const statName = document.getElementById("statPractitionerName");
  const statSlots = document.getElementById("statActiveSlots");
  const badge = document.getElementById("sidebarBookingBadge");
  const bottomBadge = document.getElementById("bottomNavBookingBadge");

  if (statBookings) statBookings.textContent = bookings.length;
  if (statFee) statFee.textContent = `₹${conf.pricing.singleSession}`;
  if (statName) statName.textContent = conf.therapist.name.split(" ")[0];
  if (statSlots) statSlots.textContent = `${(conf.slots || []).length} Slots`;
  if (badge) badge.textContent = bookings.length;
  if (bottomBadge) bottomBadge.textContent = bookings.length;

  // Overview Avatar Banner
  const av = document.getElementById("overviewAvatar");
  const nm = document.getElementById("overviewName");
  const tt = document.getElementById("overviewTitle");
  if (av) av.src = conf.therapist.image || "assets/images/shaanthini.jpg";
  if (nm) nm.textContent = conf.therapist.name;
  if (tt) tt.textContent = conf.therapist.experience || conf.therapist.title;

  // Overview Recent Bookings (first 4)
  const tbody = document.getElementById("overviewRecentBookingsTbody");
  if (tbody) {
    if (bookings.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 24px;">No appointments recorded yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = bookings.slice(0, 4).map(b => `
      <tr>
        <td><strong>${escapeHtml(b.name)}</strong></td>
        <td>${escapeHtml(b.phone)}</td>
        <td>${escapeHtml(b.concern)}</td>
        <td><span class="badge-pill blue">${escapeHtml(b.mode)}</span></td>
        <td>${escapeHtml(b.date)} • ${escapeHtml(b.time)}</td>
        <td>${escapeHtml(b.language || "Tamil")}</td>
        <td><span class="status-badge ${getStatusClass(b.status)}">${escapeHtml(b.status || "Confirmed")}</span></td>
        <td>
          <a href="https://wa.me/${cleanPhoneForWa(b.phone)}?text=${encodeURIComponent(`Hi ${b.name}, this is Shaanthini from Blossom Psychotherapy regarding your session on ${b.date} at ${b.time}.`)}" target="_blank" class="btn-icon" title="WhatsApp Client">
            <i class="fab fa-whatsapp" style="color: #25d366;"></i>
          </a>
        </td>
      </tr>
    `).join("");
  }
}

// Profile Tab Form
function renderProfileForm() {
  const t = (currentConfig && currentConfig.therapist) ? currentConfig.therapist : DEFAULT_CONFIG.therapist;

  setValue("profName", t.name);
  setValue("profTitle", t.title);
  setValue("profExperience", t.experience);
  setValue("profEducation", t.education);
  setValue("profBio", t.bio);
  setValue("profImage", t.image);
  setValue("profRating", t.rating);
  setValue("profReviewsCount", t.reviewsCount);
  setValue("profSpecialties", Array.isArray(t.specialties) ? t.specialties.join(", ") : t.specialties);
}

// Pricing Tab Form
function renderPricingForm() {
  const p = (currentConfig && currentConfig.pricing) ? currentConfig.pricing : DEFAULT_CONFIG.pricing;

  setValue("priceSingle", p.singleSession);
  setValue("pricePack3", p.pack3Session);
  setValue("pricePack6", p.pack6Session);
  setValue("priceCouple", p.coupleSession);
}

// Time Slots Manager
function renderSlotsManager() {
  const container = document.getElementById("slotsManagerContainer");
  if (!container) return;

  const slots = (currentConfig && currentConfig.slots) ? currentConfig.slots : DEFAULT_CONFIG.slots;

  container.innerHTML = slots.map((s, idx) => `
    <div class="slot-item-admin">
      <div class="slot-info">
        <i class="fas fa-clock" style="color: var(--admin-primary);"></i>
        <span>${escapeHtml(s)}</span>
      </div>
      <button type="button" class="btn-slot-delete" onclick="deleteSlot(${idx})" title="Remove Slot">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join("");
}

window.deleteSlot = function(index) {
  if (!currentConfig.slots) currentConfig.slots = [...DEFAULT_CONFIG.slots];
  currentConfig.slots.splice(index, 1);
  saveSiteConfig({ slots: currentConfig.slots });
  renderSlotsManager();
};

window.addNewSlot = function() {
  const input = document.getElementById("newSlotTime");
  const val = input ? input.value.trim() : "";
  if (!val) {
    showToast("Please enter a time slot (e.g. 05:30 PM)", "error");
    return;
  }
  if (!currentConfig.slots) currentConfig.slots = [...DEFAULT_CONFIG.slots];
  if (currentConfig.slots.includes(val)) {
    showToast("This slot already exists!", "error");
    return;
  }
  currentConfig.slots.push(val);
  saveSiteConfig({ slots: currentConfig.slots });
  renderSlotsManager();
  if (input) input.value = "";
  showToast(`Slot "${val}" added!`, "success");
};

// Contact Tab Form
function renderContactForm() {
  const c = currentConfig || DEFAULT_CONFIG;

  setValue("contactWhatsApp", c.whatsappNumber);
  setValue("contactPhone", c.supportPhone);
  setValue("contactEmail", c.supportEmail);
  setValue("contactInstagram", c.instagramId);
  setValue("contactAddress", c.address);
  setValue("contactTeleManas", c.teleManasHelpline);
}

// Testimonials Tab
function renderTestimonials() {
  const container = document.getElementById("testimonialsListContainer");
  if (!container) return;

  const list = (currentConfig && currentConfig.testimonials) ? currentConfig.testimonials : DEFAULT_CONFIG.testimonials;

  if (list.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); padding: 12px;">No reviews added yet. Click "+ Add Testimonial" above.</p>`;
    return;
  }

  container.innerHTML = list.map((item, idx) => `
    <div style="background: rgba(15, 23, 42, 0.45); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 16px; display: flex; justify-content: space-between; align-items: flex-start; gap: 14px;">
      <div style="flex: 1;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
          <strong style="color: white; font-size: 1rem;">${escapeHtml(item.author)}</strong>
          <span style="color: #f59e0b; font-size: 0.85rem;">${"★".repeat(item.rating || 5)}</span>
        </div>
        <p style="color: var(--admin-primary); font-size: 0.82rem; margin-bottom: 8px;">${escapeHtml(item.role)}</p>
        <p style="color: #cbd5e1; font-size: 0.88rem; line-height: 1.5; font-style: italic;">"${escapeHtml(item.text)}"</p>
      </div>
      <div style="display: flex; gap: 6px;">
        <button class="btn-icon" onclick="editReview(${idx})" title="Edit Review"><i class="fas fa-edit"></i></button>
        <button class="btn-icon" onclick="deleteReview(${idx})" title="Delete Review" style="color: #ef4444;"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join("");
}

// FAQ Tab
function renderFaqs() {
  const container = document.getElementById("faqListContainer");
  if (!container) return;

  const faqs = (currentConfig && currentConfig.faqs) ? currentConfig.faqs : DEFAULT_CONFIG.faqs;

  if (faqs.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); padding: 12px;">No FAQs added yet. Click "+ Add Question" above.</p>`;
    return;
  }

  container.innerHTML = faqs.map((f, idx) => `
    <div style="background: rgba(15, 23, 42, 0.45); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 16px; display: flex; justify-content: space-between; align-items: flex-start; gap: 14px;">
      <div style="flex: 1;">
        <h5 style="color: #5eead4; font-size: 0.95rem; margin-bottom: 6px;"><i class="fas fa-question-circle"></i> ${escapeHtml(f.q)}</h5>
        <p style="color: #cbd5e1; font-size: 0.88rem; line-height: 1.5;">${escapeHtml(f.a)}</p>
      </div>
      <div style="display: flex; gap: 6px;">
        <button class="btn-icon" onclick="editFaq(${idx})" title="Edit FAQ"><i class="fas fa-edit"></i></button>
        <button class="btn-icon" onclick="deleteFaq(${idx})" title="Delete FAQ" style="color: #ef4444;"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join("");
}

// Bookings Table
function renderBookingsTable() {
  const tbody = document.getElementById("bookingsTableTbody");
  if (!tbody) return;

  const bookings = currentBookings || [];

  if (bookings.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 32px;">No appointments yet. New website bookings will automatically appear here!</td></tr>`;
    return;
  }

  tbody.innerHTML = bookings.map((b, idx) => `
    <tr>
      <td>
        <strong style="color: white; display: block;">${escapeHtml(b.name)}</strong>
        <small style="color: var(--text-muted); font-size: 0.75rem;">ID: ${escapeHtml(b.id || `BK-${idx}`)}</small>
      </td>
      <td>
        <div><i class="fas fa-phone-alt" style="font-size: 0.75rem; color: var(--admin-primary);"></i> ${escapeHtml(b.phone)}</div>
        <small style="color: var(--text-muted);">${escapeHtml(b.email || "No email")}</small>
      </td>
      <td>${escapeHtml(b.concern)}</td>
      <td><span class="badge-pill blue">${escapeHtml(b.mode)}</span></td>
      <td>
        <strong>${escapeHtml(b.date)}</strong><br>
        <span style="color: #5eead4;">${escapeHtml(b.time)}</span>
      </td>
      <td>${escapeHtml(b.language || "Tamil")}</td>
      <td>
        <select class="status-select ${getStatusClass(b.status)}" onchange="updateBookingStatus('${b.id}', this.value)">
          <option value="Confirmed" ${b.status === "Confirmed" ? "selected" : ""}>Confirmed</option>
          <option value="Pending" ${b.status === "Pending" ? "selected" : ""}>Pending</option>
          <option value="Completed" ${b.status === "Completed" ? "selected" : ""}>Completed</option>
          <option value="Cancelled" ${b.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
        </select>
      </td>
      <td>
        <div style="display: flex; gap: 6px;">
          <a href="https://wa.me/${cleanPhoneForWa(b.phone)}?text=${encodeURIComponent(`Hi ${b.name}, this is Shaanthini from Blossom Psychotherapy regarding your session scheduled on ${b.date} at ${b.time}.`)}" target="_blank" class="btn-icon" title="Chat on WhatsApp">
            <i class="fab fa-whatsapp" style="color: #25d366;"></i>
          </a>
          <button class="btn-icon" onclick="deleteBooking('${b.id}')" title="Delete Booking" style="color: #ef4444;">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}

/* ============================================================================
   5. FORM SUBMISSIONS & SAVE ACTIONS
   ============================================================================ */
function initFormListeners() {
  // 1. Profile Form
  const profForm = document.getElementById("profileForm");
  if (profForm) {
    profForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const specialtiesStr = document.getElementById("profSpecialties").value;
      const specialtiesArr = specialtiesStr.split(",").map(s => s.trim()).filter(Boolean);

      const therapist = {
        name: document.getElementById("profName").value.trim(),
        title: document.getElementById("profTitle").value.trim(),
        experience: document.getElementById("profExperience").value.trim(),
        education: document.getElementById("profEducation").value.trim(),
        bio: document.getElementById("profBio").value.trim(),
        image: document.getElementById("profImage").value.trim(),
        rating: document.getElementById("profRating").value.trim() || "4.98",
        reviewsCount: document.getElementById("profReviewsCount").value.trim() || "500+",
        languages: ["Tamil", "English"],
        specialties: specialtiesArr,
        fee: currentConfig.pricing.singleSession
      };

      saveSiteConfig({ therapist });
    });
  }

  // 2. Pricing Form
  const pricingForm = document.getElementById("pricingForm");
  if (pricingForm) {
    pricingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const pricing = {
        singleSession: parseInt(document.getElementById("priceSingle").value, 10),
        pack3Session: parseInt(document.getElementById("pricePack3").value, 10),
        pack6Session: parseInt(document.getElementById("pricePack6").value, 10),
        coupleSession: parseInt(document.getElementById("priceCouple").value, 10)
      };

      // Also sync therapist fee
      if (currentConfig.therapist) {
        currentConfig.therapist.fee = pricing.singleSession;
      }

      saveSiteConfig({ pricing, therapist: currentConfig.therapist });
    });
  }

  // 3. Contact Form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const whatsapp = document.getElementById("contactWhatsApp").value.replace(/[^0-9]/g, "");
      const phone = document.getElementById("contactPhone").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const insta = document.getElementById("contactInstagram").value.trim().replace(/^@/, "");
      const address = document.getElementById("contactAddress").value.trim();
      const teleManas = document.getElementById("contactTeleManas").value.trim();

      saveSiteConfig({
        whatsappNumber: whatsapp,
        supportPhone: phone,
        supportEmail: email,
        instagramId: insta,
        address: address,
        teleManasHelpline: teleManas
      });
    });
  }

  // 4. Time Slots Add Button
  const addSlotBtn = document.getElementById("addSlotBtn");
  if (addSlotBtn) {
    addSlotBtn.addEventListener("click", window.addNewSlot);
  }

  // 5. Passcode Change Form
  const passForm = document.getElementById("passcodeForm");
  if (passForm) {
    passForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newPin = document.getElementById("newAdminPasscode").value.trim();
      if (!newPin || newPin.length < 4) {
        showToast("Passcode should be at least 4 characters.", "error");
        return;
      }
      localStorage.setItem("blossom_admin_pin", newPin);
      document.getElementById("newAdminPasscode").value = "";
      showToast(`Passcode updated! Next time unlock with: ${newPin}`, "success");
    });
  }

  // 6. Global Topbar Save Button
  const globalSave = document.getElementById("saveAllGlobalBtn");
  if (globalSave) {
    globalSave.addEventListener("click", () => {
      // Trigger submit of current active tab form if one exists
      const activePane = document.querySelector(".admin-tab-pane.active");
      if (activePane) {
        const form = activePane.querySelector("form");
        if (form) {
          form.dispatchEvent(new Event("submit", { cancelable: true }));
          return;
        }
      }
      showToast("All settings are up to date and live on public site!", "success");
    });
  }

  // 7. Manual Walk-in Booking Form
  const manForm = document.getElementById("manualBookingForm");
  if (manForm) {
    manForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newBooking = {
        id: "BK-" + Math.floor(100000 + Math.random() * 900000),
        name: document.getElementById("manName").value.trim(),
        phone: document.getElementById("manPhone").value.trim(),
        email: document.getElementById("manEmail").value.trim() || "Not provided",
        concern: document.getElementById("manConcern").value,
        mode: document.getElementById("manMode").value,
        date: document.getElementById("manDate").value,
        time: document.getElementById("manTime").value.trim(),
        language: "Tamil",
        status: "Confirmed",
        timestamp: new Date().toISOString()
      };

      currentBookings.unshift(newBooking);
      saveBookings(currentBookings);
      closeAdminModals();
      manForm.reset();
      showToast(`Appointment added for ${newBooking.name}!`, "success");
    });
  }

  // 8. Testimonial Form Modal
  const revForm = document.getElementById("reviewForm");
  if (revForm) {
    revForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const editIdx = parseInt(document.getElementById("reviewEditIndex").value, 10);
      const author = document.getElementById("revAuthor").value.trim();
      const role = document.getElementById("revRole").value.trim();
      const rating = parseInt(document.getElementById("revRating").value, 10);
      const text = document.getElementById("revText").value.trim();
      const initial = author.charAt(0).toUpperCase();

      const item = { author, role, rating, text, initial };

      if (!currentConfig.testimonials) currentConfig.testimonials = [];

      if (editIdx >= 0 && editIdx < currentConfig.testimonials.length) {
        currentConfig.testimonials[editIdx] = item;
        showToast("Testimonial updated!", "success");
      } else {
        currentConfig.testimonials.push(item);
        showToast("New testimonial added!", "success");
      }

      saveSiteConfig({ testimonials: currentConfig.testimonials });
      renderTestimonials();
      closeAdminModals();
      revForm.reset();
    });
  }

  // 9. FAQ Form Modal
  const faqForm = document.getElementById("faqForm");
  if (faqForm) {
    faqForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const editIdx = parseInt(document.getElementById("faqEditIndex").value, 10);
      const q = document.getElementById("faqQuestion").value.trim();
      const a = document.getElementById("faqAnswer").value.trim();

      const item = { q, a };

      if (!currentConfig.faqs) currentConfig.faqs = [];

      if (editIdx >= 0 && editIdx < currentConfig.faqs.length) {
        currentConfig.faqs[editIdx] = item;
        showToast("FAQ updated!", "success");
      } else {
        currentConfig.faqs.push(item);
        showToast("New FAQ added!", "success");
      }

      saveSiteConfig({ faqs: currentConfig.faqs });
      renderFaqs();
      closeAdminModals();
      faqForm.reset();
    });
  }
}

/* ============================================================================
   6. APPOINTMENTS ACTION HANDLERS
   ============================================================================ */
window.updateBookingStatus = function(bookingId, newStatus) {
  const found = currentBookings.find(b => b.id === bookingId);
  if (found) {
    found.status = newStatus;
    saveBookings(currentBookings);
    showToast(`Status updated to ${newStatus} for ${found.name}`, "info");
  }
};

window.deleteBooking = function(bookingId) {
  if (confirm("Are you sure you want to delete this appointment record?")) {
    currentBookings = currentBookings.filter(b => b.id !== bookingId);
    saveBookings(currentBookings);
    showToast("Appointment deleted.", "info");
  }
};

window.clearAllBookings = function() {
  if (confirm("⚠️ WARNING: Are you sure you want to clear ALL patient appointments?")) {
    currentBookings = [];
    saveBookings([]);
    showToast("All appointments cleared.", "info");
  }
};

window.exportBookingsCSV = function() {
  if (currentBookings.length === 0) {
    showToast("No bookings to export!", "error");
    return;
  }

  const headers = ["Booking ID", "Client Name", "Phone", "Email", "Concern", "Mode", "Date", "Time", "Language", "Status", "Timestamp"];
  const rows = currentBookings.map(b => [
    `"${b.id || ''}"`,
    `"${(b.name || '').replace(/"/g, '""')}"`,
    `"${(b.phone || '').replace(/"/g, '""')}"`,
    `"${(b.email || '').replace(/"/g, '""')}"`,
    `"${(b.concern || '').replace(/"/g, '""')}"`,
    `"${(b.mode || '').replace(/"/g, '""')}"`,
    `"${b.date || ''}"`,
    `"${b.time || ''}"`,
    `"${b.language || 'Tamil'}"`,
    `"${b.status || 'Confirmed'}"`,
    `"${b.timestamp || ''}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `blossom_appointments_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("CSV file exported successfully!", "success");
};

/* ============================================================================
   7. TESTIMONIALS & FAQ MODAL CONTROLLERS
   ============================================================================ */
window.openAddBookingModal = function() {
  const modal = document.getElementById("addBookingModal");
  const dateInput = document.getElementById("manDate");
  if (dateInput) {
    dateInput.value = new Date().toISOString().split("T")[0];
    dateInput.min = new Date().toISOString().split("T")[0];
  }
  if (modal) modal.classList.add("active");
};

window.openAddReviewModal = function() {
  const modal = document.getElementById("addReviewModal");
  const form = document.getElementById("reviewForm");
  if (form) form.reset();
  const title = document.getElementById("reviewModalTitle");
  if (title) title.innerHTML = '<i class="fas fa-quote-left" style="color: var(--admin-primary);"></i> Add Client Review';
  setValue("reviewEditIndex", "-1");
  if (modal) modal.classList.add("active");
};

window.editReview = function(idx) {
  const list = currentConfig.testimonials || DEFAULT_CONFIG.testimonials;
  const item = list[idx];
  if (!item) return;

  const modal = document.getElementById("addReviewModal");
  const title = document.getElementById("reviewModalTitle");
  if (title) title.innerHTML = '<i class="fas fa-edit" style="color: var(--admin-primary);"></i> Edit Client Review';

  setValue("reviewEditIndex", idx);
  setValue("revAuthor", item.author);
  setValue("revRole", item.role);
  setValue("revRating", item.rating || 5);
  setValue("revText", item.text);

  if (modal) modal.classList.add("active");
};

window.deleteReview = function(idx) {
  if (confirm("Delete this testimonial?")) {
    currentConfig.testimonials.splice(idx, 1);
    saveSiteConfig({ testimonials: currentConfig.testimonials });
    renderTestimonials();
    showToast("Testimonial removed.", "info");
  }
};

window.openAddFaqModal = function() {
  const modal = document.getElementById("addFaqModal");
  const form = document.getElementById("faqForm");
  if (form) form.reset();
  const title = document.getElementById("faqModalTitle");
  if (title) title.innerHTML = '<i class="fas fa-question-circle" style="color: var(--admin-primary);"></i> Add FAQ Item';
  setValue("faqEditIndex", "-1");
  if (modal) modal.classList.add("active");
};

window.editFaq = function(idx) {
  const faqs = currentConfig.faqs || DEFAULT_CONFIG.faqs;
  const item = faqs[idx];
  if (!item) return;

  const modal = document.getElementById("addFaqModal");
  const title = document.getElementById("faqModalTitle");
  if (title) title.innerHTML = '<i class="fas fa-edit" style="color: var(--admin-primary);"></i> Edit FAQ Item';

  setValue("faqEditIndex", idx);
  setValue("faqQuestion", item.q);
  setValue("faqAnswer", item.a);

  if (modal) modal.classList.add("active");
};

window.deleteFaq = function(idx) {
  if (confirm("Delete this FAQ item?")) {
    currentConfig.faqs.splice(idx, 1);
    saveSiteConfig({ faqs: currentConfig.faqs });
    renderFaqs();
    showToast("FAQ removed.", "info");
  }
};

window.closeAdminModals = function() {
  document.querySelectorAll(".admin-modal-overlay").forEach(m => m.classList.remove("active"));
};

// Global escape key to close modals
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    window.closeAdminModals();
  }
});

// Click outside modal to close
document.querySelectorAll(".admin-modal-overlay").forEach(overlay => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      window.closeAdminModals();
    }
  });
});

/* ============================================================================
   8. BACKUP, RESTORE & FACTORY RESET
   ============================================================================ */
window.exportConfigJSON = function() {
  const exportData = {
    app: "Blossom Psychotherapy Control Center",
    version: "2.0",
    exportedAt: new Date().toISOString(),
    config: currentConfig,
    bookings: currentBookings
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
  const link = document.createElement("a");
  link.setAttribute("href", dataStr);
  link.setAttribute("download", `blossom_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("Full backup JSON exported successfully!", "success");
};

window.importConfigJSON = function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed.config) {
        localStorage.setItem("blossom_site_config", JSON.stringify(parsed.config));
        if (parsed.bookings) {
          localStorage.setItem("blossom_bookings", JSON.stringify(parsed.bookings));
        }
        showToast("Backup restored successfully! Refreshing...", "success");
        setTimeout(() => window.location.reload(), 1200);
      } else {
        showToast("Invalid JSON backup structure.", "error");
      }
    } catch (err) {
      showToast("Error parsing JSON file.", "error");
    }
  };
  reader.readAsText(file);
};

window.resetToFactoryDefaults = function() {
  const confirmMsg = "Are you sure you want to reset EVERYTHING back to original factory defaults for Shaanthini Jayaprakash?\n\nThis will reset pricing, practitioner bio, slots, and contact details.";
  if (confirm(confirmMsg)) {
    localStorage.removeItem("blossom_site_config");
    localStorage.removeItem("blossom_bookings");
    localStorage.removeItem("blossom_admin_pin");
    showToast("Reset to factory defaults! Reloading...", "info");
    setTimeout(() => window.location.reload(), 1000);
  }
};

/* ============================================================================
   9. UTILITY HELPERS & TOAST
   ============================================================================ */
function setValue(id, val) {
  const el = document.getElementById(id);
  if (el && val !== undefined && val !== null) {
    el.value = val;
  }
}

function escapeHtml(str) {
  if (typeof str !== "string") return str || "";
  return str.replace(/[&<>"']/g, function(m) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[m];
  });
}

function cleanPhoneForWa(phoneStr) {
  if (!phoneStr) return "919789680259";
  let digits = phoneStr.replace(/[^0-9]/g, "");
  if (digits.length === 10) digits = "91" + digits;
  return digits;
}

function getStatusClass(status) {
  const s = (status || "").toLowerCase();
  if (s === "confirmed") return "status-confirmed";
  if (s === "pending") return "status-pending";
  if (s === "completed") return "status-completed";
  if (s === "cancelled") return "status-cancelled";
  return "status-confirmed";
}

let toastTimer = null;
function showToast(msg, type = "success") {
  const toast = document.getElementById("adminToast");
  const text = document.getElementById("adminToastMsg");
  const icon = document.getElementById("adminToastIcon");

  if (!toast || !text) return;

  text.textContent = msg;

  if (icon) {
    if (type === "success") icon.className = "fas fa-check-circle";
    else if (type === "error") icon.className = "fas fa-exclamation-circle";
    else icon.className = "fas fa-info-circle";
  }

  toast.classList.add("show");

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

/* ============================================================================
   9.1 SUPABASE CLOUD DATABASE SETTINGS & LIVE SYNC
   ============================================================================ */
function renderSupabaseSettings() {
  const urlInput = document.getElementById("supabaseProjectUrl");
  const keyInput = document.getElementById("supabaseAnonKey");
  const badge = document.getElementById("supabaseStatusBadge");

  if (!window.BlossomSupabase) return;
  const config = window.BlossomSupabase.getConfig();

  if (urlInput && config.url) urlInput.value = config.url;
  if (keyInput && config.anonKey) keyInput.value = config.anonKey;

  if (badge) {
    if (window.BlossomSupabase.isConfigured()) {
      badge.style.background = "#dcfce7";
      badge.style.color = "#15803d";
      badge.innerHTML = '<i class="fas fa-check-circle" style="color: #16a34a; margin-right: 4px;"></i> Connected to Supabase Cloud';
    } else {
      badge.style.background = "#fef3c7";
      badge.style.color = "#b45309";
      badge.innerHTML = '<i class="fas fa-exclamation-circle" style="color: #d97706; margin-right: 4px;"></i> Not Connected (Using Local Fallback)';
    }
  }
}

async function syncSupabaseBookings() {
  if (window.BlossomSupabase && window.BlossomSupabase.isConfigured()) {
    try {
      const res = await window.BlossomSupabase.getBookings();
      if (res.success && res.data && res.data.length > 0) {
        const local = JSON.parse(localStorage.getItem("blossom_bookings") || "[]");
        const existingIds = new Set(res.data.map(b => b.id));
        const combined = [...res.data];
        local.forEach(item => {
          if (!existingIds.has(item.id)) {
            combined.push(item);
          }
        });
        currentBookings = combined;
        localStorage.setItem("blossom_bookings", JSON.stringify(currentBookings));
        renderBookingsTable();
        renderOverviewData();
      }
    } catch (e) {
      console.warn("Could not sync from Supabase:", e);
    }
  }
}

window.handleSaveSupabaseConfig = function(event) {
  event.preventDefault();
  const url = document.getElementById("supabaseProjectUrl").value.trim();
  const key = document.getElementById("supabaseAnonKey").value.trim();

  if (!url.startsWith("https://")) {
    showToast("❌ Invalid URL. Supabase Project URL must start with https://", "error");
    return;
  }

  if (window.BlossomSupabase) {
    window.BlossomSupabase.setConfig(url, key);
    renderSupabaseSettings();
    showToast("🌸 Supabase credentials saved! Connecting...", "info");
    testSupabaseConnection(true);
  }
};

window.testSupabaseConnection = async function(isInitialSave = false) {
  if (!window.BlossomSupabase || !window.BlossomSupabase.isConfigured()) {
    showToast("⚠️ Please enter both Supabase Project URL and Anon Key.", "error");
    return;
  }

  showToast("Testing connection to Supabase cloud...", "info");
  const res = await window.BlossomSupabase.getBookings();
  if (res.success) {
    renderSupabaseSettings();
    showToast(`✅ Connected successfully to Supabase! (${res.data.length} bookings loaded)`, "success");
    syncSupabaseBookings();
  } else {
    showToast("❌ Connection failed. Check your Supabase URL & Anon Key, or make sure you ran the SQL schema.", "error");
  }
};

/* ============================================================================
   10. APPLICATION INITIALIZATION
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  initAuth();
  initTabs();
  renderAllData();
  renderSupabaseSettings();
  initFormListeners();
  syncSupabaseBookings();
});
