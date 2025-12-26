/* =====================================================
   FLASH TECH SOLUTIONS
   FINAL STRUCTURED JS
   Password + Multi-Step + Submit
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     HELPERS
  ===================================================== */
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  /* =====================================================
     PASSWORD SCREEN
  ===================================================== */
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
      passwordError.textContent = "Wrong Password";
    }
  });

  /* FOOTER YEAR */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =====================================================
     FORM CHECK
  ===================================================== */
  const form = $("#ftsForm");
  if (!form) return; // very important safety

  /* =====================================================
     STEP / DOT ELEMENTS
  ===================================================== */
  const steps = $$(".form-step");
  const dots = $$(".step");
  const nextBtns = $$(".next");
  const prevBtns = $$(".prev");

  let currentStep = 0;

  const showStep = (index) => {
    steps.forEach((step, i) => {
      step.classList.toggle("active", i === index);
      step.style.display = i === index ? "block" : "none";
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  };

  showStep(currentStep);

  /* NEXT BUTTON */
  nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  /* PREVIOUS BUTTON */
  prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  /* =====================================================
     TERMS & CHECKBOX LOGIC
  ===================================================== */
  const agreeAll = $("#agreeAll");
  const serviceBoxes = $$(".service");
  const termBoxes = $$(".term");

  const TERMS_TEXT = `Accepted – Flash Tech Solutions Terms

3 Month CTC – 12 LPA (₹3,00,000)
Take-home ₹30,000
Document charges ₹30,000 (if HR asks)
Cheque returned within 30 days`;

  agreeAll?.addEventListener("change", () => {
    [...serviceBoxes, ...termBoxes].forEach(c => {
      c.checked = agreeAll.checked;
    });
  });

  /* =====================================================
     FORM SUBMIT
  ===================================================== */
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

    const payload = {
      name: val("#name"),
      email: val("#email"),
      phone: phoneClean,
      role: val("#role"),
      designation: val("#designation"),
      experience: val("#experience"),
      services: [...serviceBoxes].map(s => s.value).join(", "),
      terms: TERMS_TEXT
    };

    fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    .then(() => {
      form.style.display = "none";
      $("#success")?.classList.remove("hidden");

      const ADMIN_NUMBER = "918825940013";

      const msg =
        "*CANDIDATE DETAILS*\n\n" +
        "Name: " + payload.name + "\n" +
        "Phone: " + payload.phone + "\n" +
        "Experience: " + payload.experience;

      window.open(
        `https://wa.me/${ADMIN_NUMBER}?text=${encodeURIComponent(msg)}`,
        "_blank"
      );
    })
    .catch(() => alert("Submission failed"));
  });

});
