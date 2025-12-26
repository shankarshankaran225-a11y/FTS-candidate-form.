/* =====================================================
   FLASH TECH SOLUTIONS – FINAL JS (EMOJI VERSION)
   Password + Multi-Step + Full Payload + WhatsApp
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= HELPERS ================= */
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  /* ================= PASSWORD ================= */
  const SITE_PASSWORD = "FTS@2026";

  const unlockBtn = $("#unlockBtn");
  const sitePassword = $("#sitePassword");
  const passwordBox = $("#passwordBox");
  const siteContent = $("#siteContent");
  const passwordError = $("#passwordError");

  unlockBtn?.addEventListener("click", () => {
    if (sitePassword.value === SITE_PASSWORD) {
      passwordBox.style.display = "none";
      siteContent.classList.remove("hidden");
      passwordError.textContent = "";
    } else {
      passwordError.textContent = "❌ Wrong Password";
    }
  });

  /* FOOTER YEAR */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ================= FORM CHECK ================= */
  const form = $("#ftsForm");
  if (!form) return;

  /* ================= STEPS ================= */
  const steps = $$(".form-step");
  const dots = $$(".step");
  const nextBtns = $$(".next");
  const prevBtns = $$(".prev");

  let currentStep = 0;

  const showStep = (index) => {
    steps.forEach((step, i) => {
      step.style.display = i === index ? "block" : "none";
      step.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  };

  showStep(currentStep);

  nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  /* ================= TERMS ================= */
  const agreeAll = $("#agreeAll");
  const serviceBoxes = $$(".service");
  const termBoxes = $$(".term");

  const TERMS_TEXT = `Accepted – Flash Tech Solutions Terms

💰 3 Month CTC – 12 LPA (₹3,00,000)
💵 Take-home ₹30,000
📄 Document Charges ₹30,000 (if HR asks)
⏱ Document Generation – 3 Hours
📝 Cheque before interview (Security)
🔁 Returned within 30 days after de-registration & PF proof`;

  agreeAll?.addEventListener("change", () => {
    [...serviceBoxes, ...termBoxes].forEach(c => {
      c.checked = agreeAll.checked;
    });
  });

  /* ================= SUBMIT ================= */
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (![...serviceBoxes].every(c => c.checked)) {
      alert("Please select all services");
      return;
    }
    if (!agreeAll.checked) {
      alert("Please accept Terms & Conditions");
      return;
    }

    const val = (id) => ($(id)?.value || "").trim();
    const phoneClean = val("#phone").replace(/\D/g, "");

    /* ================= PAYLOAD ================= */
    const payload = {
      name: val("#name"),
      email: val("#email"),
      phone: phoneClean,
      role: val("#role"),
      designation: val("#designation"),
      currentCTC: val("#currentCTC"),
      expectedCTC: val("#expectedCTC"),
      techKnowledge: val("#techKnowledge"),
      experience: val("#experience"),
      noticePeriod: val("#noticeperiod"),
      pf: $('input[name="pf"]:checked')?.value || "",
      pfStart: val("#pfStart"),
      pfEnd: val("#pfEnd"),
      realtimeExperience: val("#realtimeExperience"),
      referredBy: val("#referredBy"),
      issue: val("#issue"),
      services: [...serviceBoxes].map(s => s.value).join(", "),
      terms: TERMS_TEXT
    };

    /* ================= ADMIN WHATSAPP (FULL) ================= */
    const adminMsg =
      "📋 *CANDIDATE FULL DETAILS*\n\n" +

      "👤 *Basic Details*\n" +
      "🧑 Name: " + payload.name + "\n" +
      "📧 Email: " + payload.email + "\n" +
      "📞 Phone: " + payload.phone + "\n" +
      "🎯 Role: " + payload.role + "\n" +
      "💼 Designation: " + payload.designation + "\n\n" +

      "💰 *CTC Details*\n" +
      "📌 Current CTC: " + payload.currentCTC + "\n" +
      "📈 Expected CTC: " + payload.expectedCTC + "\n\n" +

      "🧠 *Professional Details*\n" +
      "💻 Technology: " + payload.techKnowledge + "\n" +
      "🕒 Experience: " + payload.experience + "\n" +
      "⏳ Notice Period: " + payload.noticePeriod + "\n\n" +

      "🏦 *PF Details*\n" +
      "✔ PF Available: " + payload.pf + "\n" +
      "📅 PF Start: " + payload.pfStart + "\n" +
      "📅 PF End: " + payload.pfEnd + "\n\n" +

      "📌 *Additional Info*\n" +
      "🔁 Realtime Experience: " + payload.realtimeExperience + "\n" +
      "🤝 Referred By: " + payload.referredBy + "\n" +
      "⚠ Issue: " + payload.issue + "\n\n" +

      "🛠 *Services Selected*\n" +
      payload.services + "\n\n" +

      "📜 *Terms Accepted*\n" +
      payload.terms;

    /* ================= CANDIDATE WHATSAPP ================= */
    const candidateMsg =
      "🎉 *Registration Successful – Flash Tech Solutions*\n\n" +
      "👋 Hi " + payload.name + ",\n\n" +

      "✅ Your details have been successfully submitted.\n\n" +

      "📌 *Summary*\n" +
      "💻 Technology: " + payload.techKnowledge + "\n" +
      "🕒 Experience: " + payload.experience + "\n" +
      "💼 Role: " + payload.role + "\n\n" +

      "🛠 *Services Selected*\n" +
      payload.services + "\n\n" +

      "📞 Our team will contact you shortly.\n\n" +
      "🚀 *Flash Tech Solutions*\n" +
      "Empowering Your IT Journey";

    /* ================= GOOGLE SHEET ================= */
    fetch(
      "https://script.google.com/macros/s/AKfycby0u_NhccgKebLPVovcnaaKjvR8av4ihisM7U8pFQABpqQ84rfUcKfAhRcSZl8ImezV/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    )
    .then(() => {
      form.style.display = "none";
      $("#success")?.classList.remove("hidden");

      const ADMIN_NUMBER = "918825940013";

      /* Admin */
      window.open(
        `https://wa.me/${ADMIN_NUMBER}?text=${encodeURIComponent(adminMsg)}`,
        "_blank"
      );

      /* Candidate (after delay) */
      if (phoneClean.length === 10) {
        setTimeout(() => {
          window.open(
            `https://wa.me/91${phoneClean}?text=${encodeURIComponent(candidateMsg)}`,
            "_blank"
          );
        }, 4000);
      }
    })
    .catch(() => alert("❌ Submission failed. Try again"));
  });

});



