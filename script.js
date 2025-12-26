/* =====================================================
   FLASH TECH SOLUTIONS
   FINAL ALL-IN-ONE JS
   Password + Multi-Step Form + WhatsApp Submit
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- PASSWORD ---------- */
  const SITE_PASSWORD = "FTS@2026";

  const unlockBtn = document.getElementById("unlockBtn");
  const sitePassword = document.getElementById("sitePassword");
  const passwordBox = document.getElementById("passwordBox");
  const siteContent = document.getElementById("siteContent");
  const passwordError = document.getElementById("passwordError");

  unlockBtn?.addEventListener("click", () => {
    if (sitePassword.value === SITE_PASSWORD) {
      passwordBox.style.display = "none";
      siteContent.classList.remove("hidden");
      passwordError.textContent = "";
    } else {
      passwordError.textContent = "Wrong Password";
    }
  });

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- HELPERS ---------- */
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  /* ---------- FORM ELEMENTS ---------- */
  const form = $("#ftsForm");
  if (!form) return;

  const steps = $$(".form-step");
  const dots = $$(".step");
  const nextBtns = $$(".next");
  const prevBtns = $$(".prev");

  const agreeAll = $("#agreeAll");
  const serviceBoxes = $$(".service");
  const termBoxes = $$(".term");

  /* ---------- STEP LOGIC ---------- */
  let currentStep = 0;

  const showStep = (index) => {
    steps.forEach((step, i) => {
      step.style.display = i === index ? "block" : "none";
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

  /* ---------- TERMS ---------- */
  const TERMS_TEXT = `Accepted – Flash Tech Solutions Terms & Conditions

Example 1:
3 Month CTC – 12 LPA (₹3,00,000)
Take-home ₹30,000
Remaining amount paid to FTS

Document Charges:
₹30,000 (only when HR asks)
Document generation time – 3 Hours

Example 2:
1 Cheque before first interview
Security purpose
Returned within 30 days after de-registration & PF proof`;

  agreeAll?.addEventListener("change", () => {
    [...serviceBoxes, ...termBoxes].forEach(c => {
      c.checked = agreeAll.checked;
    });
  });

  /* ---------- SUBMIT ---------- */
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (![...serviceBoxes].every(c => c.checked)) {
      alert("Please select ALL services");
      return;
    }

    if (!agreeAll.checked) {
      alert("Please accept all Terms & Conditions");
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

    fetch(
      "https://script.google.com/macros/s/AKfycbzsWd3q8RRrqI1p9rcPexpq1JjsrgYfzmYte-zgvHQJsLlHrMHr3cUsIgdrQLyxr7NI/exec",
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
      const REG_LINK = "https://flashtechsolutions.com/registration";

      const msg =
        "*CANDIDATE DETAILS*\n\n" +
        "Name: " + payload.name + "\n" +
        "Phone: " + payload.phone + "\n" +
        "Experience: " + payload.experience + "\n";

      window.open(
        `https://wa.me/${ADMIN_NUMBER}?text=${encodeURIComponent(msg)}`,
        "_blank"
      );

      if (phoneClean.length === 10) {
        setTimeout(() => {
          window.open(
            `https://wa.me/91${phoneClean}?text=${encodeURIComponent(msg + "\n" + REG_LINK)}`,
            "_blank"
          );
        }, 4000);
      }
    })
    .catch(() => alert("Submission failed. Please try again."));
  });

});
