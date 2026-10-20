/**
 * ============================================================================
 * BLOSSOM PSYCHOTHERAPY - SUPABASE CLIENT INTEGRATION
 * Cloud Database Connector for Bookings, Corporate Leads & Assessments
 * Client Email: blossomtherapy06@gmail.com
 * ============================================================================
 */

(function () {
  // Default configuration (can also be overridden in localStorage or Admin Settings)
  const DEFAULT_SUPABASE_CONFIG = {
    url: "https://xikvbcedqyfqjsbyoyvw.supabase.co", // Blossom Psychotherapy Project URL
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhpa3ZiY2VkcXlmcWpzYnlveXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0MDQwMjgsImV4cCI6MjEwNzk4MDAyOH0.7eC2rsisdHspmDkAU6-HyWq-e712bQnhOa69h1b_W2U"
  };

  function getSupabaseConfig() {
    try {
      const stored = localStorage.getItem("blossom_supabase_config");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.url && parsed.anonKey) return parsed;
      }
    } catch (e) {
      console.warn("Could not read blossom_supabase_config from localStorage:", e);
    }
    return DEFAULT_SUPABASE_CONFIG;
  }

  function setSupabaseConfig(url, anonKey) {
    const config = { url: url.trim(), anonKey: anonKey.trim() };
    localStorage.setItem("blossom_supabase_config", JSON.stringify(config));
    initClient();
    return true;
  }

  let supabaseClient = null;

  function initClient() {
    const config = getSupabaseConfig();
    if (config.url && config.anonKey && window.supabase && window.supabase.createClient) {
      try {
        supabaseClient = window.supabase.createClient(config.url, config.anonKey);
        console.log("🌸 Blossom Supabase Cloud Database connected successfully!");
      } catch (err) {
        console.error("Failed to initialize Supabase client:", err);
        supabaseClient = null;
      }
    } else {
      supabaseClient = null;
    }
    return supabaseClient;
  }

  // Check connection status
  function isConfigured() {
    return supabaseClient !== null;
  }

  /**
   * Save a therapy booking to Supabase
   * @param {Object} bookingData 
   */
  async function saveBooking(bookingData) {
    if (!supabaseClient) {
      console.warn("Supabase not configured. Using local fallback.");
      return { success: false, fallback: true };
    }

    try {
      const payload = {
        booking_code: bookingData.id || ("BK-" + Math.floor(100000 + Math.random() * 900000)),
        client_name: bookingData.name,
        phone: bookingData.phone,
        email: bookingData.email || null,
        concern: bookingData.concern,
        language: bookingData.language || "Tamil",
        session_mode: bookingData.mode || "Video Call",
        booking_date: bookingData.date,
        slot_time: bookingData.time,
        status: bookingData.status || "Confirmed",
        notes: bookingData.notes || null
      };

      const { data, error } = await supabaseClient
        .from("bookings")
        .insert([payload])
        .select();

      if (error) {
        console.error("Supabase insert booking error:", error);
        return { success: false, error };
      }

      console.log("✅ Booking successfully saved to Supabase cloud:", data);
      return { success: true, data };
    } catch (err) {
      console.error("Unexpected error saving booking to Supabase:", err);
      return { success: false, error: err };
    }
  }

  /**
   * Fetch all bookings for Admin Dashboard
   */
  async function getBookings() {
    if (!supabaseClient) {
      return { success: false, fallback: true, data: [] };
    }

    try {
      const { data, error } = await supabaseClient
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase fetch bookings error:", error);
        return { success: false, error, data: [] };
      }

      // Map Supabase snake_case to app camelCase
      const mapped = data.map(b => ({
        id: b.booking_code || b.id,
        dbId: b.id,
        name: b.client_name,
        phone: b.phone,
        email: b.email,
        concern: b.concern,
        mode: b.session_mode,
        date: b.booking_date,
        time: b.slot_time,
        language: b.language,
        status: b.status,
        timestamp: b.created_at
      }));

      return { success: true, data: mapped };
    } catch (err) {
      console.error("Unexpected error fetching bookings from Supabase:", err);
      return { success: false, error: err, data: [] };
    }
  }

  /**
   * Update booking status in Supabase (Confirmed, Completed, Rescheduled, Cancelled)
   */
  async function updateBookingStatus(bookingCodeOrId, newStatus) {
    if (!supabaseClient) return { success: false, fallback: true };

    try {
      const { data, error } = await supabaseClient
        .from("bookings")
        .update({ status: newStatus })
        .or(`booking_code.eq.${bookingCodeOrId},id.eq.${bookingCodeOrId}`)
        .select();

      if (error) {
        console.error("Supabase update booking status error:", error);
        return { success: false, error };
      }

      return { success: true, data };
    } catch (err) {
      console.error("Unexpected error updating booking status:", err);
      return { success: false, error: err };
    }
  }

  /**
   * Save a corporate wellness lead
   */
  async function saveCorporateLead(leadData) {
    if (!supabaseClient) return { success: false, fallback: true };

    try {
      const payload = {
        company_name: leadData.companyName,
        contact_person: leadData.name,
        phone: leadData.phone,
        email: leadData.email,
        employee_count: leadData.teamSize || null,
        notes: leadData.notes || null,
        status: "New"
      };

      const { data, error } = await supabaseClient
        .from("corporate_leads")
        .insert([payload])
        .select();

      if (error) {
        console.error("Supabase insert corporate lead error:", error);
        return { success: false, error };
      }

      return { success: true, data };
    } catch (err) {
      console.error("Unexpected error saving corporate lead:", err);
      return { success: false, error: err };
    }
  }

  /**
   * Save self-assessment result (PHQ-9 / GAD-7)
   */
  async function saveAssessment(assessmentData) {
    if (!supabaseClient) return { success: false, fallback: true };

    try {
      const payload = {
        test_type: assessmentData.type,
        client_name: assessmentData.name || "Anonymous",
        phone: assessmentData.phone || null,
        score: assessmentData.score,
        severity: assessmentData.severity,
        recommendation: assessmentData.recommendation || null
      };

      const { data, error } = await supabaseClient
        .from("assessments")
        .insert([payload])
        .select();

      if (error) {
        console.error("Supabase insert assessment error:", error);
        return { success: false, error };
      }

      return { success: true, data };
    } catch (err) {
      console.error("Unexpected error saving assessment:", err);
      return { success: false, error: err };
    }
  }

  // Initialize on script load
  window.addEventListener("DOMContentLoaded", initClient);

  // Global Export
  window.BlossomSupabase = {
    init: initClient,
    getConfig: getSupabaseConfig,
    setConfig: setSupabaseConfig,
    isConfigured: isConfigured,
    saveBooking: saveBooking,
    getBookings: getBookings,
    updateBookingStatus: updateBookingStatus,
    saveCorporateLead: saveCorporateLead,
    saveAssessment: saveAssessment
  };
})();
