/**
 * ============================================================================
 * BLOSSOM - MENTAL WELLNESS & ONLINE COUNSELLING PLATFORM
 * Client Configuration & Interactive Application Script
 * ============================================================================
 * 
 * MACHI / BRO: Neenga unga client ku text, phone numbers, pricing, therapists
 * change panna vendiyathu iruntha, keela irukka `SITE_CONFIG` object-la direct-ah 
 * edit pannikalam! Ella details-um inga irukku.
 */

window.SITE_CONFIG = {
  brandName: "Blossom Psychotherapy",
  tagline: "Online Therapy & Mental Wellness",
  supportPhone: "+91 97896 80259",
  whatsappNumber: "919789680259", // Country code + 10-digit number
  supportEmail: "blossomtherapy06@gmail.com",
  instagramId: "blossom._.psychotherapy",
  teleManasHelpline: "14416",
  address: "Tamil Nadu, India",
  
  pricing: {
    singleSession: 999,
    pack3Session: 2550, // Rs. 850 / session
    pack6Session: 4500, // Rs. 750 / session
    coupleSession: 1799
  },

  // Therapists Directory - Sole Certified Practitioner
  therapists: [
    {
      id: "therapist-shaanthini",
      name: "Shaanthini Jayaprakash",
      title: "Certified Psychotherapist",
      experience: "Certified Psychotherapist & Wellness Counselor",
      education: "Certified in Evidence-Based Psychotherapy & Counseling",
      image: "assets/images/shaanthini.jpg",
      rating: "4.98",
      reviewsCount: "500+",
      languages: ["Tamil", "English"],
      specialties: ["Stress & Anxiety", "Depression & Low Mood", "Relationship & Marriage", "Self-Esteem", "Workplace Stress", "Anger Management"],
      fee: 999,
      bio: "Shaanthini Jayaprakash is a certified psychotherapist dedicated to offering empathetic, confidential, and transformative mental healthcare. She works collaboratively with individuals and couples to navigate life challenges, heal emotional wounds, overcome anxiety, and foster sustainable inner strength in a safe space."
    }
  ],

  // Clinical Self-Assessments Questions & Scoring
  assessments: {
    phq9: {
      title: "Depression Screener (PHQ-9)",
      description: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
      questions: [
        "Little interest or pleasure in doing things you normally enjoy?",
        "Feeling down, depressed, hopeless, or empty inside?",
        "Trouble falling or staying asleep, or sleeping too much?",
        "Feeling tired, lethargic, or having very little energy throughout the day?",
        "Poor appetite or overeating excessively?",
        "Feeling bad about yourself — or that you are a failure or have let yourself down?",
        "Trouble concentrating on things, such as reading or watching television?",
        "Moving or speaking so slowly that others have noticed? Or feeling overly restless?"
      ]
    },
    gad7: {
      title: "Anxiety & Panic Screener (GAD-7)",
      description: "Over the last 2 weeks, how often have you experienced the following symptoms?",
      questions: [
        "Feeling nervous, anxious, on edge, or unable to relax?",
        "Not being able to stop or control excessive worrying thoughts?",
        "Worrying excessively about many different situations at once?",
        "Trouble relaxing or unwinding even during your free time?",
        "Being so restless that it's hard to sit still for a while?",
        "Becoming easily annoyed, irritable, or impatient with others?",
        "Feeling afraid as if something awful might happen unexpectedly?"
      ]
    },
    stress: {
      title: "Stress & Burnout Indicator (PSS)",
      description: "In the past month, how frequently have you felt the following ways?",
      questions: [
        "Felt upset because of something that happened unexpectedly?",
        "Felt unable to control the important things in your everyday life?",
        "Felt nervous, overwhelmed, and completely stressed out?",
        "Felt that difficulties were piling up so high that you could not overcome them?"
      ]
    },
    relationship: {
      title: "Relationship Health & Harmony Index",
      description: "Reflect on your current relationship dynamics over the past 3 months:",
      questions: [
        "Do you and your partner struggle to resolve disagreements without shouting or shutting down?",
        "Do you feel emotionally distant, disconnected, or lonely even when you are together?",
        "Is there unresolved resentment, jealousy, or a lack of trust between you both?",
        "Do you hesitate to express your honest feelings or vulnerability due to fear of conflict?"
      ]
    }
  }
};

/* ============================================================================
   Application Controller & DOM Interactions
   ============================================================================ */
function syncFromLocalStorage() {
  try {
    const raw = localStorage.getItem("blossom_site_config");
    if (raw) {
      const conf = JSON.parse(raw);
      if (conf.pricing) window.SITE_CONFIG.pricing = conf.pricing;
      if (conf.whatsappNumber) window.SITE_CONFIG.whatsappNumber = conf.whatsappNumber;
      if (conf.supportPhone) window.SITE_CONFIG.supportPhone = conf.supportPhone;
      if (conf.supportEmail) window.SITE_CONFIG.supportEmail = conf.supportEmail;
      if (conf.instagramId) window.SITE_CONFIG.instagramId = conf.instagramId;
      if (conf.teleManasHelpline) window.SITE_CONFIG.teleManasHelpline = conf.teleManasHelpline;
      if (conf.address) window.SITE_CONFIG.address = conf.address;
      
      if (conf.therapist && window.SITE_CONFIG.therapists && window.SITE_CONFIG.therapists[0]) {
        const t = window.SITE_CONFIG.therapists[0];
        if (conf.therapist.name) t.name = conf.therapist.name;
        if (conf.therapist.title) t.title = conf.therapist.title;
        if (conf.therapist.experience) t.experience = conf.therapist.experience;
        if (conf.therapist.education) t.education = conf.therapist.education;
        if (conf.therapist.bio) t.bio = conf.therapist.bio;
        if (conf.therapist.image) t.image = conf.therapist.image;
        if (conf.therapist.rating) t.rating = conf.therapist.rating;
        if (conf.therapist.reviewsCount) t.reviewsCount = conf.therapist.reviewsCount;
        if (conf.therapist.specialties) t.specialties = conf.therapist.specialties;
        t.fee = (conf.pricing && conf.pricing.singleSession) ? conf.pricing.singleSession : (conf.therapist.fee || 999);
      }
      
      if (conf.slots) {
        window.SITE_CONFIG.slots = conf.slots;
      }
      if (conf.testimonials) {
        window.SITE_CONFIG.testimonials = conf.testimonials;
      }
      if (conf.faqs) {
        window.SITE_CONFIG.faqs = conf.faqs;
      }
    }
  } catch (e) {
    console.error("Could not sync from localStorage:", e);
  }
}

function updateDynamicDomFromConfig() {
  const p = window.SITE_CONFIG.pricing;
  if (p) {
    const elSingle = document.getElementById("priceDisplaySingle");
    const elPack3 = document.getElementById("priceDisplayPack3");
    const elPack6 = document.getElementById("priceDisplayPack6");
    const elCouple = document.getElementById("priceDisplayCouple");
    if (elSingle) elSingle.textContent = `₹${p.singleSession}`;
    if (elPack3) elPack3.textContent = `₹${p.pack3Session.toLocaleString('en-IN')}`;
    if (elPack6) elPack6.textContent = `₹${p.pack6Session.toLocaleString('en-IN')}`;
    if (elCouple) elCouple.textContent = `₹${p.coupleSession.toLocaleString('en-IN')}`;
  }

  // Footer Contacts
  const fPhone = document.getElementById("footerPhone");
  const fWa = document.getElementById("footerWhatsapp");
  const fEmail = document.getElementById("footerEmail");
  const fInsta = document.getElementById("footerInstagram");

  if (fPhone && window.SITE_CONFIG.supportPhone) fPhone.textContent = window.SITE_CONFIG.supportPhone;
  if (fWa && window.SITE_CONFIG.supportPhone) fWa.textContent = window.SITE_CONFIG.supportPhone;
  if (fEmail && window.SITE_CONFIG.supportEmail) fEmail.textContent = window.SITE_CONFIG.supportEmail;
  if (fInsta && window.SITE_CONFIG.instagramId) {
    fInsta.textContent = `@${window.SITE_CONFIG.instagramId}`;
    fInsta.href = `https://instagram.com/${window.SITE_CONFIG.instagramId}`;
  }

  // Dynamic Testimonials
  const testGrid = document.getElementById("publicTestimonialsGrid");
  if (testGrid && window.SITE_CONFIG.testimonials && window.SITE_CONFIG.testimonials.length > 0) {
    testGrid.innerHTML = window.SITE_CONFIG.testimonials.map(item => `
      <div class="testimonial-card">
        <div class="rating-stars">
          ${'<i class="fas fa-star"></i>'.repeat(item.rating || 5)}
        </div>
        <p class="testimonial-text">"${item.text}"</p>
        <div class="testimonial-author">
          <div class="author-avatar-initial">${item.initial || (item.author ? item.author.charAt(0) : "C")}</div>
          <div class="author-details">
            <h5>${item.author}</h5>
            <p>${item.role}</p>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Dynamic FAQs
  const faqContainer = document.getElementById("publicFaqList");
  if (faqContainer && window.SITE_CONFIG.faqs && window.SITE_CONFIG.faqs.length > 0) {
    faqContainer.innerHTML = window.SITE_CONFIG.faqs.map((f, idx) => `
      <div class="faq-item ${idx === 0 ? 'active' : ''}">
        <button class="faq-question">
          <span>${f.q}</span>
          <i class="fas fa-chevron-down faq-icon"></i>
        </button>
        <div class="faq-answer">
          ${f.a}
        </div>
      </div>
    `).join("");
  }
}

/* --- Scroll Restoration & Reset to Top on Refresh --- */
function initScrollToTopOnRefresh() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const resetToTop = () => {
    if (window.location.hash) {
      try {
        history.replaceState(null, document.title, window.location.pathname + window.location.search);
      } catch (e) {}
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  resetToTop();

  window.addEventListener('pageshow', () => {
    resetToTop();
  });

  window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
  });

  window.addEventListener('load', () => {
    setTimeout(resetToTop, 20);
  });
}

// Immediate execution so early DOM parsing does not trigger restored scroll
initScrollToTopOnRefresh();

document.addEventListener("DOMContentLoaded", () => {
  initScrollToTopOnRefresh();
  syncFromLocalStorage();
  updateDynamicDomFromConfig();
  initNavbar();
  renderTherapists();
  initTherapistFilters();
  initHeroMatcher();
  initPricingToggle();
  initFAQAccordion();
  initWhatsAppWidget();
  initModals();
  initBookingWizard();
  initAssessmentSystem();
});

/* --- Navbar & Mobile Drawer --- */
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const mobileToggle = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const icon = mobileToggle.querySelector("i");
      if (icon) {
        icon.className = navMenu.classList.contains("open") ? "fas fa-times" : "fas fa-bars";
      }
    });

    // Close when clicking nav link on mobile
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        const icon = mobileToggle.querySelector("i");
        if (icon) icon.className = "fas fa-bars";
      });
    });
  }
}

/* --- Render Verified Therapists --- */
function renderTherapists() {
  const grid = document.getElementById("therapistsGrid");
  if (!grid) return;

  const t = window.SITE_CONFIG.therapists[0]; // Shaanthini Jayaprakash
  grid.className = "therapist-spotlight-wrapper";
  grid.innerHTML = `
    <div class="therapist-spotlight-card" data-id="${t.id}">
      <div class="card-watermark-seal" aria-hidden="true">
        <img src="assets/images/logo_watermark.png" alt="" loading="lazy">
      </div>
      <div class="spotlight-thumb">
        <img src="${t.image}" alt="${t.name}" loading="lazy">
        <span class="rci-badge"><i class="fas fa-check-circle"></i> Certified</span>
        <span class="rating-badge"><i class="fas fa-star" style="color: #f59e0b;"></i> ${t.rating} (${t.reviewsCount} Sessions)</span>
      </div>
      <div class="spotlight-info">
        <div class="spotlight-header">
          <h3 class="spotlight-name">${t.name}</h3>
          <p class="spotlight-title"><i class="fas fa-user-md"></i> ${t.title}</p>
        </div>
        <p class="spotlight-bio">${t.bio}</p>
        
        <div class="spotlight-meta-grid">
          <div class="spotlight-meta-item">
            <i class="fas fa-graduation-cap"></i>
            <span>${t.education}</span>
          </div>
          <div class="spotlight-meta-item">
            <i class="fas fa-certificate"></i>
            <span>${t.experience}</span>
          </div>
          <div class="spotlight-meta-item">
            <i class="fas fa-language"></i>
            <span>Speaks: ${t.languages.join(", ")}</span>
          </div>
          <div class="spotlight-meta-item">
            <i class="fas fa-envelope"></i>
            <span>${window.SITE_CONFIG.supportEmail}</span>
          </div>
        </div>

        <div style="margin-bottom: 22px;">
          <strong style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); display: block; margin-bottom: 8px;">Clinical Specializations:</strong>
          <div class="therapist-specialties" style="gap: 8px;">
            ${t.specialties.map(s => `<span class="spec-chip" style="font-size: 0.82rem; padding: 4px 10px;">${s}</span>`).join("")}
          </div>
        </div>

        <div class="spotlight-actions" style="display: flex; flex-direction: column; gap: 14px; align-items: flex-start;">
          <div class="session-confidential-pill" style="display: inline-flex; align-items: center; gap: 8px; font-weight: 600; color: var(--primary-color); font-size: 0.95rem; background: var(--primary-light); padding: 8px 16px; border-radius: var(--radius-full); border: 1px solid rgba(16, 185, 129, 0.25);">
            <i class="fas fa-user-shield"></i> 45-Min 100% Confidential Session
          </div>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <a href="https://instagram.com/${window.SITE_CONFIG.instagramId}" target="_blank" class="btn btn-outline btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
              <i class="fab fa-instagram" style="color: #e1306c;"></i> @${window.SITE_CONFIG.instagramId}
            </a>
            <a href="https://wa.me/${window.SITE_CONFIG.whatsappNumber}?text=Hello%20Shaanthini%2C%20I%20would%20like%20to%20book%20a%20therapy%20session" target="_blank" class="btn btn-teal btn-sm">
              <i class="fab fa-whatsapp"></i> Chat on WhatsApp
            </a>
            <button class="btn btn-primary btn-sm" onclick="openBookingModalForTherapist('${t.id}')">
              <i class="fas fa-calendar-check"></i> Book Session
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* --- Therapist Filtering Logic --- */
function initTherapistFilters() {
  const specSelect = document.getElementById("filterSpecialty");
  const langSelect = document.getElementById("filterLanguage");

  if (specSelect) {
    specSelect.addEventListener("change", () => {
      const spec = specSelect.value;
      const lang = langSelect ? langSelect.value : "all";
      renderTherapists(spec, lang);
    });
  }

  if (langSelect) {
    langSelect.addEventListener("change", () => {
      const lang = langSelect.value;
      const spec = specSelect ? specSelect.value : "all";
      renderTherapists(spec, lang);
    });
  }
}

window.resetTherapistFilters = function() {
  const specSelect = document.getElementById("filterSpecialty");
  const langSelect = document.getElementById("filterLanguage");
  if (specSelect) specSelect.value = "all";
  if (langSelect) langSelect.value = "all";
  renderTherapists("all", "all");
};

/* --- Hero Matcher Widget --- */
function initHeroMatcher() {
  const matcherBtn = document.getElementById("heroMatcherBtn");
  if (!matcherBtn) return;

  matcherBtn.addEventListener("click", () => {
    const concern = document.getElementById("heroConcern").value;
    const mode = document.getElementById("heroMode").value;
    const lang = document.getElementById("heroLanguage").value;

    openBookingWizard({
      concern: concern,
      mode: mode,
      language: lang
    });
  });
}

/* --- Pricing / Care Plans Toggle with Rich Micro-Animations --- */
function initPricingToggle() {
  const toggle = document.getElementById("pricingToggleSwitch");
  const labelInd = document.getElementById("labelIndividual");
  const labelCpl = document.getElementById("labelCouple");
  const knobIcon = document.getElementById("switchKnobIcon");
  const indGrid = document.getElementById("individualPricingGrid");
  const cplGrid = document.getElementById("couplePricingGrid");

  if (!toggle) return;

  function setView(isCouple) {
    if (isCouple) {
      toggle.classList.add("couple-active");
      toggle.setAttribute("aria-checked", "true");
      if (labelInd) labelInd.classList.remove("active");
      if (labelCpl) labelCpl.classList.add("active");
      if (knobIcon) {
        knobIcon.className = "fas fa-heart";
        knobIcon.style.color = "#be185d";
      }
      if (indGrid) indGrid.style.display = "none";
      if (cplGrid) {
        cplGrid.style.display = "grid";
        cplGrid.querySelectorAll(".pricing-card").forEach(c => {
          c.classList.remove("care-card-animate");
          void c.offsetWidth; // Trigger DOM reflow for CSS animation replay
          c.classList.add("care-card-animate");
        });
      }
    } else {
      toggle.classList.remove("couple-active");
      toggle.setAttribute("aria-checked", "false");
      if (labelInd) labelInd.classList.add("active");
      if (labelCpl) labelCpl.classList.remove("active");
      if (knobIcon) {
        knobIcon.className = "fas fa-user";
        knobIcon.style.color = "#0a7062";
      }
      if (indGrid) {
        indGrid.style.display = "grid";
        indGrid.querySelectorAll(".pricing-card").forEach(c => {
          c.classList.remove("care-card-animate");
          void c.offsetWidth; // Trigger DOM reflow for CSS animation replay
          c.classList.add("care-card-animate");
        });
      }
      if (cplGrid) cplGrid.style.display = "none";
    }
  }

  // Toggle switch click
  toggle.addEventListener("click", () => {
    const isCouple = !toggle.classList.contains("couple-active");
    setView(isCouple);
  });

  // Direct tab button clicks
  if (labelInd) {
    labelInd.addEventListener("click", () => setView(false));
  }
  if (labelCpl) {
    labelCpl.addEventListener("click", () => setView(true));
  }
}

/* --- FAQ Accordion --- */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        faqItems.forEach(i => i.classList.remove("active"));
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });
}

/* --- Floating WhatsApp Widget --- */
function initWhatsAppWidget() {
  const btn = document.getElementById("whatsappFloatingBtn");
  const popover = document.getElementById("whatsappPopover");
  const closeBtn = document.getElementById("whatsappCloseBtn");
  const startChatBtn = document.getElementById("startWhatsappChatBtn");

  if (btn && popover) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      popover.classList.toggle("active");
    });
  }

  if (closeBtn && popover) {
    closeBtn.addEventListener("click", () => {
      popover.classList.remove("active");
    });
  }

  if (startChatBtn) {
    startChatBtn.addEventListener("click", () => {
      const phone = window.SITE_CONFIG.whatsappNumber;
      const text = encodeURIComponent("Hello Blossom, I would like to book an online counselling session.");
      window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
    });
  }

  document.addEventListener("click", (e) => {
    if (popover && !popover.contains(e.target) && !btn.contains(e.target)) {
      popover.classList.remove("active");
    }
  });
}

/* --- Modals Helper --- */
function initModals() {
  // Close any modal on backdrop click or close button
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });

    const closeBtn = overlay.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        closeAllModals();
      });
    }
  });

  // Global ESC key listener to close modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllModals();
    }
  });
}

window.closeAllModals = function() {
  document.querySelectorAll(".modal-overlay").forEach(m => {
    m.classList.remove("active");
  });
};

/* --- Booking Wizard --- */
let bookingState = {
  concern: "Stress & Anxiety",
  mode: "video",
  language: "Tamil",
  therapistId: "therapist-shaanthini",
  date: "",
  time: "04:30 PM",
  name: "",
  email: "",
  phone: ""
};

window.openBookingWizard = function(prefill = {}) {
  closeAllModals();
  const modal = document.getElementById("bookingModal");
  if (!modal) return;

  if (prefill.concern) bookingState.concern = prefill.concern;
  if (prefill.mode) bookingState.mode = prefill.mode;
  if (prefill.language) bookingState.language = prefill.language;
  if (prefill.therapistId) bookingState.therapistId = prefill.therapistId;

  // Set today's date + 1 day by default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedDate = tomorrow.toISOString().split("T")[0];
  bookingState.date = formattedDate;

  // Populate form fields
  const concernSelect = document.getElementById("bookConcern");
  if (concernSelect && prefill.concern) {
    concernSelect.value = prefill.concern;
  }

  const langSelect = document.getElementById("bookLanguage");
  if (langSelect && bookingState.language) {
    langSelect.value = bookingState.language;
  }

  const dateInput = document.getElementById("bookDate");
  if (dateInput) {
    dateInput.value = formattedDate;
    dateInput.min = new Date().toISOString().split("T")[0];
  }

  // Populate therapist selector
  const therapistSelect = document.getElementById("bookTherapist");
  if (therapistSelect) {
    therapistSelect.innerHTML = window.SITE_CONFIG.therapists.map(t => `
      <option value="${t.id}" ${t.id === bookingState.therapistId ? "selected" : ""}>
        ${t.name} (${t.experience})
      </option>
    `).join("");
  }

  // Set mode chips
  document.querySelectorAll(".mode-card").forEach(card => {
    const m = card.getAttribute("data-mode");
    card.classList.toggle("selected", m === bookingState.mode);
  });

  // Dynamically populate time slots from SITE_CONFIG
  const slotsContainer = document.getElementById("modalSlotsGrid");
  if (slotsContainer) {
    const slots = (window.SITE_CONFIG.slots && window.SITE_CONFIG.slots.length > 0)
      ? window.SITE_CONFIG.slots
      : ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:30 PM", "08:00 PM"];
    
    if (!slots.includes(bookingState.time)) {
      bookingState.time = slots[0];
    }
    slotsContainer.innerHTML = slots.map(s => `
      <div class="slot-chip ${s === bookingState.time ? 'selected' : ''}" data-slot="${s}">${s}</div>
    `).join("");

    slotsContainer.querySelectorAll(".slot-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        slotsContainer.querySelectorAll(".slot-chip").forEach(c => c.classList.remove("selected"));
        chip.classList.add("selected");
        bookingState.time = chip.getAttribute("data-slot");
      });
    });
  }

  if (typeof window.updatePhoneDisplayFn === "function") {
    window.updatePhoneDisplayFn();
  }

  modal.classList.add("active");
};

window.openBookingModalForTherapist = function(therapistId) {
  openBookingWizard({ therapistId: therapistId });
};

function initBookingWizard() {
  // Mode selection clicks
  document.querySelectorAll(".mode-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".mode-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      bookingState.mode = card.getAttribute("data-mode");
    });
  });

  // Slot selection clicks
  document.querySelectorAll(".slot-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".slot-chip").forEach(c => c.classList.remove("selected"));
      chip.classList.add("selected");
      bookingState.time = chip.getAttribute("data-slot");
    });
  });

  // Helper to flash input warnings and visual feedback
  function flashInputWarning(element, hintEl, message, isError = true) {
    if (hintEl) {
      hintEl.className = isError ? "validation-hint error" : "validation-hint success";
      hintEl.innerHTML = (isError ? '<i class="fas fa-exclamation-circle"></i> ' : '<i class="fas fa-check-circle"></i> ') + message;
    }
    if (element) {
      element.classList.remove("shake-input", "input-error");
      void element.offsetWidth; // Trigger reflow for animation restart
      if (isError) {
        element.classList.add("shake-input", "input-error");
      }
    }
  }

  // 1. REAL-TIME NAME VALIDATION: Alphabets and spaces ONLY, max 30 characters
  const nameInput = document.getElementById("bookName");
  const nameHint = document.getElementById("nameValidationMsg");
  const nameCounter = document.getElementById("nameCounter");

  if (nameInput) {
    // Block invalid keystrokes immediately
    nameInput.addEventListener("keydown", function(e) {
      const allowedKeys = ["Backspace", "Tab", "Enter", "Delete", "Escape", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
      if (allowedKeys.includes(e.key)) return;
      if ((e.ctrlKey || e.metaKey) && ["a", "c", "v", "x", "z", "A", "C", "V", "X", "Z"].includes(e.key)) return;

      // Disallow numbers and special characters
      if (!/^[a-zA-Z\s]$/.test(e.key)) {
        e.preventDefault();
        flashInputWarning(this, nameHint, "Only alphabets allowed! Numbers & symbols are blocked.", true);
        return;
      }

      // Disallow leading space or multiple consecutive spaces
      if (e.key === " " && (this.value.length === 0 || this.value.endsWith(" "))) {
        e.preventDefault();
        return;
      }

      // Check max length of 30 characters
      if (this.value.length >= 30 && this.selectionStart === this.selectionEnd) {
        e.preventDefault();
        flashInputWarning(this, nameHint, "Maximum 30 letters reached!", true);
      }
    });

    // Sanitize on input (handles mobile, autocorrect, drag & drop)
    nameInput.addEventListener("input", function() {
      let cleaned = this.value.replace(/[^a-zA-Z\s]/g, "");
      cleaned = cleaned.replace(/^\s+/, "").replace(/\s{2,}/g, " ");
      if (cleaned.length > 30) {
        cleaned = cleaned.slice(0, 30);
      }
      if (this.value !== cleaned) {
        this.value = cleaned;
        flashInputWarning(this, nameHint, "Numbers & symbols removed! Only alphabets allowed.", true);
      } else {
        if (cleaned.length >= 2) {
          nameHint.className = "validation-hint success";
          nameHint.innerHTML = '<i class="fas fa-check-circle"></i> Valid name format';
          this.classList.remove("input-error");
        } else {
          nameHint.className = "validation-hint";
          nameHint.innerHTML = '<i class="fas fa-info-circle"></i> Only alphabets allowed (max 30 letters)';
          this.classList.remove("input-error");
        }
      }
      if (nameCounter) nameCounter.textContent = `${this.value.length}/30`;
    });

    // Sanitize on paste
    nameInput.addEventListener("paste", function(e) {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData("text") || "";
      let cleaned = text.replace(/[^a-zA-Z\s]/g, "").replace(/^\s+/, "").replace(/\s{2,}/g, " ");
      const start = this.selectionStart;
      const end = this.selectionEnd;
      let combined = (this.value.slice(0, start) + cleaned + this.value.slice(end)).slice(0, 30);
      this.value = combined;
      if (nameCounter) nameCounter.textContent = `${this.value.length}/30`;
      this.dispatchEvent(new Event("input"));
    });
  }

  // 2. REAL-TIME PHONE & COUNTRY CODE VALIDATION: Digits ONLY
  const phoneInput = document.getElementById("bookPhone");
  const countrySelect = document.getElementById("bookCountryCode");
  const customCountryInput = document.getElementById("customCountryCode");
  const phoneHint = document.getElementById("phoneValidationMsg");
  const phoneCounter = document.getElementById("phoneCounter");
  const phoneGroup = document.getElementById("phoneInputGroup");

  function getRequiredDigits() {
    if (!countrySelect) return 10;
    const selected = countrySelect.options[countrySelect.selectedIndex];
    return parseInt(selected.getAttribute("data-digits") || "10", 10);
  }

  function updatePhoneDisplay() {
    if (!countrySelect || !phoneInput) return;
    const code = countrySelect.value;
    const requiredDigits = getRequiredDigits();

    if (code === "other") {
      if (customCountryInput) {
        customCountryInput.style.display = "block";
        if (!customCountryInput.value) customCountryInput.value = "+";
      }
      phoneInput.placeholder = "Enter phone number";
      phoneInput.maxLength = 15;
      if (phoneCounter) phoneCounter.textContent = `${phoneInput.value.length}/15`;
      if (phoneHint) {
        phoneHint.className = "validation-hint";
        phoneHint.innerHTML = '<i class="fas fa-globe"></i> Enter custom code & 7 to 15 digits';
      }
    } else {
      if (customCountryInput) customCountryInput.style.display = "none";
      phoneInput.placeholder = `${requiredDigits}-digit number`;
      phoneInput.maxLength = requiredDigits;
      if (phoneInput.value.length > requiredDigits) {
        phoneInput.value = phoneInput.value.slice(0, requiredDigits);
      }
      if (phoneCounter) phoneCounter.textContent = `${phoneInput.value.length}/${requiredDigits}`;
      if (code === "+91") {
        if (phoneInput.value.length === 10) {
          phoneHint.className = "validation-hint success";
          phoneHint.innerHTML = '<i class="fas fa-check-circle"></i> Valid 10-digit Indian number';
        } else {
          phoneHint.className = "validation-hint";
          phoneHint.innerHTML = `<i class="fas fa-info-circle"></i> India (+91) requires exactly 10 digits (${phoneInput.value.length}/10)`;
        }
      } else {
        phoneHint.className = "validation-hint";
        phoneHint.innerHTML = `<i class="fas fa-info-circle"></i> Requires ${requiredDigits} digits for ${code}`;
      }
    }
  }

  window.updatePhoneDisplayFn = updatePhoneDisplay;
  updatePhoneDisplay();

  if (countrySelect) {
    countrySelect.addEventListener("change", updatePhoneDisplay);
  }

  if (customCountryInput) {
    customCountryInput.addEventListener("keydown", function(e) {
      const allowedKeys = ["Backspace", "Tab", "Enter", "Delete", "ArrowLeft", "ArrowRight"];
      if (allowedKeys.includes(e.key)) return;
      if (e.key === "+" && this.value.length === 0) return;
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    });
    customCountryInput.addEventListener("input", function() {
      let val = this.value;
      if (!val.startsWith("+")) {
        val = "+" + val.replace(/[^0-9]/g, "");
      } else {
        val = "+" + val.slice(1).replace(/[^0-9]/g, "");
      }
      if (val.length > 5) val = val.slice(0, 5);
      this.value = val;
    });
  }

  if (phoneInput) {
    // Block non-digit keystrokes immediately
    phoneInput.addEventListener("keydown", function(e) {
      const allowedKeys = ["Backspace", "Tab", "Enter", "Delete", "Escape", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
      if (allowedKeys.includes(e.key)) return;
      if ((e.ctrlKey || e.metaKey) && ["a", "c", "v", "x", "z", "A", "C", "V", "X", "Z"].includes(e.key)) return;

      // Disallow non-numeric characters (letters like 'k', symbols, etc.)
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        flashInputWarning(phoneGroup || this, phoneHint, "Only numbers allowed! Letters and symbols are blocked.", true);
        return;
      }

      // Check max length
      const maxDigits = parseInt(this.maxLength || "10", 10);
      if (this.value.length >= maxDigits && this.selectionStart === this.selectionEnd) {
        e.preventDefault();
        flashInputWarning(phoneGroup || this, phoneHint, `Maximum ${maxDigits} digits reached!`, true);
      }
    });

    // Sanitize on input (handles mobile, paste, autofill)
    phoneInput.addEventListener("input", function() {
      const maxDigits = parseInt(this.maxLength || "10", 10);
      let cleaned = this.value.replace(/[^0-9]/g, "");
      if (cleaned.length > maxDigits) {
        cleaned = cleaned.slice(0, maxDigits);
      }
      if (this.value !== cleaned) {
        this.value = cleaned;
        flashInputWarning(phoneGroup || this, phoneHint, "Letters removed! Only digits allowed.", true);
      } else {
        const countryCode = countrySelect ? countrySelect.value : "+91";
        if (countryCode === "+91") {
          if (cleaned.length === 10) {
            phoneHint.className = "validation-hint success";
            phoneHint.innerHTML = '<i class="fas fa-check-circle"></i> Valid 10-digit Indian number';
            if (phoneGroup) phoneGroup.classList.remove("input-error");
          } else {
            phoneHint.className = "validation-hint";
            phoneHint.innerHTML = `<i class="fas fa-info-circle"></i> India (+91) requires 10 digits (${cleaned.length}/10 entered)`;
            if (phoneGroup) phoneGroup.classList.remove("input-error");
          }
        } else if (countryCode === "other") {
          if (cleaned.length >= 7) {
            phoneHint.className = "validation-hint success";
            phoneHint.innerHTML = '<i class="fas fa-check-circle"></i> Valid phone number length';
            if (phoneGroup) phoneGroup.classList.remove("input-error");
          } else {
            phoneHint.className = "validation-hint";
            phoneHint.innerHTML = `<i class="fas fa-info-circle"></i> Enter 7 to 15 digits (${cleaned.length} entered)`;
            if (phoneGroup) phoneGroup.classList.remove("input-error");
          }
        } else {
          if (cleaned.length === maxDigits) {
            phoneHint.className = "validation-hint success";
            phoneHint.innerHTML = `<i class="fas fa-check-circle"></i> Valid ${maxDigits}-digit number`;
            if (phoneGroup) phoneGroup.classList.remove("input-error");
          } else {
            phoneHint.className = "validation-hint";
            phoneHint.innerHTML = `<i class="fas fa-info-circle"></i> Requires ${maxDigits} digits (${cleaned.length}/${maxDigits} entered)`;
            if (phoneGroup) phoneGroup.classList.remove("input-error");
          }
        }
      }
      if (phoneCounter) phoneCounter.textContent = `${this.value.length}/${maxDigits}`;
    });

    // Sanitize on paste
    phoneInput.addEventListener("paste", function(e) {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData("text") || "";
      const maxDigits = parseInt(this.maxLength || "10", 10);
      let cleaned = text.replace(/[^0-9]/g, "");
      const start = this.selectionStart;
      const end = this.selectionEnd;
      let combined = (this.value.slice(0, start) + cleaned + this.value.slice(end)).slice(0, maxDigits);
      this.value = combined;
      if (phoneCounter) phoneCounter.textContent = `${this.value.length}/${maxDigits}`;
      this.dispatchEvent(new Event("input"));
    });
  }

  // 3. BOOKING FORM SUBMISSION
  const form = document.getElementById("bookingForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameEl = document.getElementById("bookName");
      const phoneEl = document.getElementById("bookPhone");
      const rawName = nameEl ? nameEl.value.trim() : "";
      const rawPhone = phoneEl ? phoneEl.value.trim() : "";
      const countryCode = countrySelect ? countrySelect.value : "+91";
      const email = document.getElementById("bookEmail") ? document.getElementById("bookEmail").value.trim() || "Not provided" : "Not provided";
      const concern = document.getElementById("bookConcern") ? document.getElementById("bookConcern").value : "General Wellness";
      const selectedLanguage = document.getElementById("bookLanguage") ? document.getElementById("bookLanguage").value : (bookingState.language || "Tamil");
      const date = document.getElementById("bookDate") ? document.getElementById("bookDate").value : "";
      const modeText = bookingState.mode === "video" ? "Video Call" : (bookingState.mode === "audio" ? "Audio Call" : "Private Chat");
      const timeSlot = bookingState.time || "10:00 AM";

      // 1. Strict Name Validation: Only alphabets and spaces, 2 to 30 characters
      if (!rawName || !/^[a-zA-Z\s]{2,30}$/.test(rawName)) {
        flashInputWarning(nameEl, nameHint, "❌ Name must contain only alphabets (2 to 30 letters).", true);
        showToast("❌ Name should only contain alphabets (max 30 characters). Numbers & symbols are not allowed.", "error");
        if (nameEl) nameEl.focus();
        return;
      }

      // 2. Strict Phone Validation: Only numeric digits
      if (!rawPhone || !/^[0-9]+$/.test(rawPhone)) {
        flashInputWarning(phoneGroup, phoneHint, "❌ Phone number must contain only numbers (no letters or symbols).", true);
        showToast("❌ Phone number must contain only numbers.", "error");
        if (phoneEl) phoneEl.focus();
        return;
      }

      // 3. Indian Phone Length Validation (Exactly 10 digits)
      if (countryCode === "+91" && rawPhone.length !== 10) {
        flashInputWarning(phoneGroup, phoneHint, `❌ Indian mobile number must be exactly 10 digits (${rawPhone.length} entered).`, true);
        showToast(`❌ Indian phone number must be exactly 10 digits (you entered ${rawPhone.length} digits).`, "error");
        if (phoneEl) phoneEl.focus();
        return;
      }

      // 4. Other Country Validation & Phone Number construction
      let fullPhoneNumber = "";
      if (countryCode === "other") {
        const customCode = customCountryInput ? customCountryInput.value.trim() : "";
        if (!customCode || customCode === "+" || !/^\+[0-9]{1,4}$/.test(customCode)) {
          showToast("❌ Please enter a valid country code (e.g. +81, +44).", "error");
          if (customCountryInput) customCountryInput.focus();
          return;
        }
        if (rawPhone.length < 7 || rawPhone.length > 15) {
          showToast("❌ Phone number must be between 7 and 15 digits.", "error");
          if (phoneEl) phoneEl.focus();
          return;
        }
        fullPhoneNumber = `${customCode} ${rawPhone}`;
      } else {
        const reqDigits = getRequiredDigits();
        if (rawPhone.length !== reqDigits && (rawPhone.length < 7 || rawPhone.length > 15)) {
          showToast(`❌ Please enter a valid phone number for ${countryCode} (requires ${reqDigits} digits).`, "error");
          if (phoneEl) phoneEl.focus();
          return;
        }
        fullPhoneNumber = `${countryCode} ${rawPhone}`;
      }

      // Format professional WhatsApp message for Shaanthini
      const waMessage = 
`🌿 *NEW SESSION BOOKING - Blossom Psychotherapy*
---------------------------------------
👤 *Client Name:* ${rawName}
📱 *Phone Number:* ${fullPhoneNumber}
✉️ *Email:* ${email}
🎯 *Primary Concern:* ${concern}
🗣️ *Session Language:* ${selectedLanguage}
💻 *Session Mode:* ${modeText}
📅 *Requested Date:* ${date}
⏰ *Time Slot:* ${timeSlot}
---------------------------------------
*Hi Shaanthini, I have booked a therapy session with you via your website. Please confirm my slot!*`;

      const encodedMsg = encodeURIComponent(waMessage);
      const waUrl = `https://api.whatsapp.com/send?phone=${window.SITE_CONFIG.whatsappNumber}&text=${encodedMsg}`;

      // Email fallback
      const emailSubject = encodeURIComponent(`New Therapy Booking Request: ${rawName} (${date})`);
      const emailBody = encodeURIComponent(`Hello Shaanthini,\n\nI have requested an online therapy session with you:\n\nClient Name: ${rawName}\nPhone: ${fullPhoneNumber}\nEmail: ${email}\nConcern: ${concern}\nPreferred Language: ${selectedLanguage}\nMode: ${modeText}\nPreferred Date: ${date}\nPreferred Slot: ${timeSlot}\n\nPlease confirm my appointment.\n\nThank you,\n${rawName}`);
      const mailtoUrl = `mailto:${window.SITE_CONFIG.supportEmail}?subject=${emailSubject}&body=${emailBody}`;

      // Populate summary box in success modal
      const summaryBox = document.getElementById("bookingSummaryBox");
      if (summaryBox) {
        summaryBox.innerHTML = `
          <div><strong>👤 Client Name:</strong> ${rawName}</div>
          <div><strong>📱 Phone / WhatsApp:</strong> ${fullPhoneNumber}</div>
          <div><strong>✉️ Email:</strong> ${email}</div>
          <div><strong>🎯 Concern:</strong> ${concern}</div>
          <div><strong>🗣️ Session Language:</strong> ${selectedLanguage}</div>
          <div><strong>💻 Mode:</strong> ${modeText}</div>
          <div><strong>📅 Date & Slot:</strong> ${date} at ${timeSlot}</div>
        `;
      }

      const waBtn = document.getElementById("whatsappDispatchBtn");
      if (waBtn) waBtn.href = waUrl;

      const emailBtn = document.getElementById("emailDispatchBtn");
      if (emailBtn) emailBtn.href = mailtoUrl;

      // Automatically store in Admin Bookings Manager
      try {
        const newBooking = {
          id: "BK-" + Math.floor(100000 + Math.random() * 900000),
          name: rawName,
          phone: fullPhoneNumber,
          email: email,
          concern: concern,
          mode: modeText,
          date: date,
          time: timeSlot,
          language: selectedLanguage,
          status: "Confirmed",
          timestamp: new Date().toISOString()
        };
        const existingBookings = JSON.parse(localStorage.getItem("blossom_bookings") || "[]");
        existingBookings.unshift(newBooking);
        localStorage.setItem("blossom_bookings", JSON.stringify(existingBookings));

        // Save to Supabase Cloud Database (if configured)
        if (window.BlossomSupabase) {
          window.BlossomSupabase.saveBooking(newBooking).then(res => {
            if (res && res.success) {
              console.log("🌸 Booking synced live to Supabase Cloud Database:", res.data);
            }
          }).catch(e => console.warn("Supabase booking sync error:", e));
        }
      } catch (err) {
        console.error("Error saving booking:", err);
      }

      closeAllModals();

      // Open Success Modal
      const successModal = document.getElementById("bookingSuccessModal");
      if (successModal) {
        successModal.classList.add("active");
      }

      showToast(`🎉 Opening WhatsApp with Shaanthini (+91 97896 80259)...`);

      // Synchronous open to bypass popup blockers
      const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = waUrl;
      } else {
        const win = window.open(waUrl, "_blank");
        if (!win || win.closed || typeof win.closed === "undefined") {
          window.location.href = waUrl;
        }
      }
    });
  }
}

/* --- Assessment Screener System --- */
let activeQuizKey = "phq9";
let currentQuestionIndex = 0;
let userQuizAnswers = [];

window.openAssessmentModal = function(quizKey = "phq9") {
  closeAllModals();
  const modal = document.getElementById("assessmentModal");
  if (!modal) return;

  activeQuizKey = quizKey;
  currentQuestionIndex = 0;
  userQuizAnswers = [];

  const quiz = window.SITE_CONFIG.assessments[quizKey];
  document.getElementById("assessmentModalTitle").textContent = quiz.title;
  document.getElementById("quizIntroDesc").textContent = quiz.description;

  document.getElementById("quizQuestionArea").style.display = "block";
  document.getElementById("quizResultArea").style.display = "none";

  renderAssessmentQuestion();
  modal.classList.add("active");
};

function renderAssessmentQuestion() {
  const quiz = window.SITE_CONFIG.assessments[activeQuizKey];
  const total = quiz.questions.length;
  const current = currentQuestionIndex + 1;

  // Update progress bar
  const pct = Math.round((current / total) * 100);
  document.getElementById("quizProgressFill").style.width = `${pct}%`;
  document.getElementById("quizProgressLabel").textContent = `Question ${current} of ${total}`;

  // Update question text
  document.getElementById("quizQuestionText").textContent = quiz.questions[currentQuestionIndex];
}

function initAssessmentSystem() {
  const optionButtons = document.querySelectorAll(".quiz-option-btn");
  optionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const score = parseInt(btn.getAttribute("data-score"), 10);
      userQuizAnswers.push(score);

      const quiz = window.SITE_CONFIG.assessments[activeQuizKey];
      if (currentQuestionIndex < quiz.questions.length - 1) {
        currentQuestionIndex++;
        renderAssessmentQuestion();
      } else {
        showAssessmentResults();
      }
    });
  });
}

function showAssessmentResults() {
  document.getElementById("quizQuestionArea").style.display = "none";
  const resultArea = document.getElementById("quizResultArea");
  resultArea.style.display = "block";

  const totalScore = userQuizAnswers.reduce((a, b) => a + b, 0);
  const maxPossible = userQuizAnswers.length * 3;
  const scorePercent = (totalScore / maxPossible) * 100;

  document.getElementById("quizScoreDisplay").textContent = totalScore;

  let severityText = "Minimal / Normal Range";
  let severityClass = "severity-minimal";
  let feedbackText = "Your answers indicate minimal symptoms. You are maintaining healthy psychological resilience. Regular self-care and mindfulness can help maintain this balance.";

  if (scorePercent > 20 && scorePercent <= 45) {
    severityText = "Mild Distress / Symptoms";
    severityClass = "severity-mild";
    feedbackText = "You are experiencing mild emotional strain or worry. Speaking with a therapist can provide you with proactive tools to prevent symptoms from intensifying.";
  } else if (scorePercent > 45 && scorePercent <= 70) {
    severityText = "Moderate Symptoms";
    severityClass = "severity-moderate";
    feedbackText = "Your responses suggest moderate emotional or psychological distress impacting your daily functioning. We strongly recommend scheduling a consultation with a psychologist.";
  } else if (scorePercent > 70) {
    severityText = "Significant / Severe Distress";
    severityClass = "severity-severe";
    feedbackText = "You are carrying a heavy emotional burden. Professional therapy offers structured guidance, relief, and coping mechanisms to help you heal safely.";
  }

  const badge = document.getElementById("quizSeverityBadge");
  badge.textContent = severityText;
  badge.className = `result-badge ${severityClass}`;
  document.getElementById("quizFeedbackText").textContent = feedbackText;
}

/* --- Corporate Inquiry Modal --- */
window.openCorporateModal = function() {
  closeAllModals();
  const modal = document.getElementById("corporateModal");
  if (modal) modal.classList.add("active");
};

const corpForm = document.getElementById("corporateForm");
if (corpForm) {
  corpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const companyName = document.getElementById("corpCompanyName") ? document.getElementById("corpCompanyName").value.trim() : "";
    const name = document.getElementById("corpName") ? document.getElementById("corpName").value.trim() : "";
    const email = document.getElementById("corpWorkEmail") ? document.getElementById("corpWorkEmail").value.trim() : "";
    const teamSize = document.getElementById("corpTeamSize") ? document.getElementById("corpTeamSize").value : "";
    const phone = document.getElementById("corpPhone") ? document.getElementById("corpPhone").value.trim() : "";
    const notes = document.getElementById("corpNeeds") ? document.getElementById("corpNeeds").value.trim() : "";

    if (window.BlossomSupabase) {
      window.BlossomSupabase.saveCorporateLead({
        companyName,
        name,
        email,
        teamSize,
        phone,
        notes
      }).then(res => {
        if (res && res.success) {
          console.log("🌸 Corporate lead synced live to Supabase:", res.data);
        }
      }).catch(err => console.warn("Supabase lead sync error:", err));
    }

    closeAllModals();
    showToast("🤝 Corporate Wellness proposal request received! Our wellness director will contact your HR team within 24 hours.");
  });
}

/* --- Toast Notification Helper --- */
function showToast(message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <i class="${type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle'}" style="color: ${type === 'error' ? '#ef4444' : '#10b981'};"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}
