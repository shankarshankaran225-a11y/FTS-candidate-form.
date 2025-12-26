/* =====================================================
   FLASH TECH SOLUTIONS
   FINAL ALL-IN-ONE JS
   WhatsApp Auto Message
   Candidate + Admin (Different Content)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  
  /* ---------- PASSWORD ---------- */
  const SITE_PASSWORD = "FTS@2026";

  document.getElementById("unlockBtn").onclick = () => {
    const val = document.getElementById("sitePassword").value;
    if (val === SITE_PASSWORD) {
      document.getElementById("passwordBox").style.display = "none";
      document.getElementById("siteContent").classList.remove("hidden");
    } else {
      document.getElementById("passwordError").innerText = "Wrong Password";
    }
  };

  document.getElementById("year").textContent =
  new Date().getFullYear();

  /* ---------- FORM LOGIC ---------- */

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  const form = $("#ftsForm");
  const steps = $$(".form-step");
  const dots = $$(".step");
  const nextBtns = $$(".next");
  const prevBtns = $$(".prev");

  const agreeAll = $("#agreeAll");
  const serviceBoxes = $$(".service");
  const termBoxes = $$(".term");

  let currentStep = 0;
  if (!form || !steps.length) return;

  /* ---------- TERMS ---------- */
  const TERMS_TEXT =
`Accepted – Flash Tech Solutions Terms & Conditions

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

  /* ---------- STEP CONTROL ---------- */
  function showStep(i) {
    steps.forEach((s, idx) => s.classList.toggle("active", idx === i));
    dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
  }
  showStep(currentStep);

  nextBtns.forEach(b => b.onclick = () => {
    if (currentStep < steps.length - 1) showStep(++currentStep);
  });
  prevBtns.forEach(b => b.onclick = () => {
    if (currentStep > 0) showStep(--currentStep);
  });

  /* ---------- MASTER CHECK ---------- */
  agreeAll?.addEventListener("change", () => {
    [...serviceBoxes, ...termBoxes].forEach(c => c.checked = agreeAll.checked);
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
      pf: $('input[name="pf"]:checked')?.value || "",
      pfStart: val("#pfStart"),
      pfEnd: val("#pfEnd"),
      realtimeExperience: val("#realtimeExperience"),
      services: [...serviceBoxes].map(s => s.value).join(", "),
      terms: TERMS_TEXT
    };

    fetch("https://script.google.com/macros/s/AKfycbw_NUpA42_emkdQSgCfKXle-9a1NZO6BmLOjrO-1E0vxqOy7fAhqiSY9AYdBugBmMN4/exec", {
      method: "POST",
      body: JSON.stringify(payload)
    })
    .then(() => {

      form.classList.add("hidden");
      $(".success")?.classList.remove("hidden");

      /* ---------- LINK ---------- */
      const REGISTRATION_FORM_LINK =
        "https://flashtechsolutions.com/registration";

      /* ---------- COMMON DETAILS ---------- */
      const detailsMsg =
        " *CANDIDATE DETAILS*\n\n" +
        " Name: " + payload.name + "\n" +
        " Email: " + payload.email + "\n" +
        " Phone: " + payload.phone + "\n\n" +
        " Role: " + payload.role + "\n" +
        " Designation: " + payload.designation + "\n\n" +
        " Current CTC: " + payload.currentCTC + "\n" +
        " Expected CTC: " + payload.expectedCTC + "\n\n" +
        " Tech: " + payload.techKnowledge + "\n" +
        " Experience: " + payload.experience + "\n\n" +
        " PF: " + payload.pf + "\n" +
        " PF Start: " + payload.pfStart + "\n" +
        " PF End: " + payload.pfEnd + "\n\n" +
        " Real Time Experience:\n" +
        payload.realtimeExperience + "\n\n" +
        " Services:\n" + payload.services + "\n\n" +
        " Terms: TERMS_TEXT\n\n";

      /* ---------- CANDIDATE WHATSAPP (WITH LINK) ---------- */
      if (phoneClean.length === 10) {
        const candidateMsg =
          detailsMsg +
          "🔗 *Registration Form Link*\n" +
          REGISTRATION_FORM_LINK + "\n\n" +
          "— *Flash Tech Solutions*";

        window.open(
          `https://wa.me/91${phoneClean}?text=${encodeURIComponent(candidateMsg)}`,
          "_blank"
        );
      }

      /* ---------------- ADMIN WHATSAPP (NO LINK) ---------------- */
      const ADMIN_NUMBER = "918825940013"; // change admin number

      setTimeout(() => {
        const adminMsg =
          detailsMsg +
          "\n\n— *Flash Tech Solutions (Admin)*";

        window.open(
          `https://wa.me/${ADMIN_NUMBER}?text=${encodeURIComponent(adminMsg)}`,
          "_blank"
        );
      }, 1200);

    })
    .catch(() => {
      alert("Submission failed. Please try again.");
    });

  });

});