const invitationCard = document.querySelector("#invitation-card");
const invitationToggle = document.querySelector("#invitation-toggle");
const invitationStage = document.querySelector(".scroll-stage__sticky");
const revealItems = document.querySelectorAll(".reveal");

function syncInvitationState(isOpen) {
  if (!invitationCard || !invitationToggle || !invitationStage) return;

  invitationCard.classList.toggle("is-open", isOpen);
  invitationStage.classList.toggle("is-open", isOpen);
  invitationCard.setAttribute("aria-expanded", String(isOpen));
  invitationCard.setAttribute(
    "aria-label",
    isOpen ? "Close invitation card" : "Open invitation card"
  );
  invitationToggle.textContent = isOpen ? "Close Invitation" : "Open Invitation";
}

function toggleInvitation() {
  if (!invitationCard) return;

  const isOpen = invitationCard.classList.contains("is-open");
  syncInvitationState(!isOpen);
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  for (const item of revealItems) {
    revealObserver.observe(item);
  }
} else {
  // Fallback for older mobile browsers so sections still render.
  for (const item of revealItems) {
    item.classList.add("is-visible");
  }
}

if (invitationCard) {
  invitationCard.addEventListener("click", toggleInvitation);
  invitationCard.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleInvitation();
    }
  });
}

if (invitationToggle) {
  invitationToggle.addEventListener("click", toggleInvitation);
}

function updateCountdown() {
  const daysEl = document.querySelector("#days");
  const hoursEl = document.querySelector("#hours");
  const minutesEl = document.querySelector("#minutes");
  const secondsEl = document.querySelector("#seconds");
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const now = new Date();
  // Target: 7 May, 11:00 PM IST (UTC+5:30) => 17:30 UTC.
  let targetYear = now.getUTCFullYear();
  let targetDate = new Date(Date.UTC(targetYear, 4, 7, 17, 30, 0));
  while (targetDate <= now) {
    targetYear += 1;
    targetDate = new Date(Date.UTC(targetYear, 4, 7, 17, 30, 0));
  }
  const diffMs = targetDate - now;

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  function twoDigit(value) {
    const text = String(value);
    return text.length < 2 ? `0${text}` : text;
  }

  daysEl.textContent = String(days);
  hoursEl.textContent = twoDigit(hours);
  minutesEl.textContent = twoDigit(minutes);
  secondsEl.textContent = twoDigit(seconds);
}

let countdownIntervalId = null;

function startCountdown() {
  const daysEl = document.querySelector("#days");
  const hoursEl = document.querySelector("#hours");
  const minutesEl = document.querySelector("#minutes");
  const secondsEl = document.querySelector("#seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return false;

  updateCountdown();
  if (countdownIntervalId !== null) {
    clearInterval(countdownIntervalId);
  }
  countdownIntervalId = window.setInterval(updateCountdown, 1000);
  return true;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startCountdown);
} else {
  startCountdown();
}

// Extra fallback for mobile browsers with delayed rendering/caching.
window.addEventListener("load", () => {
  if (!startCountdown()) {
    let attempts = 0;
    const retryId = window.setInterval(() => {
      attempts += 1;
      if (startCountdown() || attempts >= 20) {
        clearInterval(retryId);
      }
    }, 500);
  }
});

syncInvitationState(false);
