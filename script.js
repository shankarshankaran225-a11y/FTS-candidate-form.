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

  let currentStep = 0;
  if (!form || !steps.length) return;

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


  /* ===== SUBMIT ===== */
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
        body: JSON.stringify(payload)
      }
    )
    .then(() => {

      $("#ftsForm").style.display = "none";
      $("#success").classList.remove("hidden");

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
