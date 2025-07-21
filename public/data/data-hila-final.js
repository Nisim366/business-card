window.cardData = {
  fullName: "הילה לוי",
  jobTitle: "מטפלת רגשית ומדריכת הורים",
  phone: "0521234567",
  email: "hila@example.com",
  phoneDigits: "0521234567",
  logoSrc: "/assets/logo-ortopok.png",
  profileImage: "/assets/profile.jpg",
  facebookLink: "https://facebook.com/hila.page",
  youtubeLink: "https://www.youtube.com/embed/ysz5S6PUM-U",
  aboutParagraphs: "<p><strong>הילה לוי</strong> מומחית בליווי רגשי והדרכת הורים בגישה מותאמת אישית.</p>",
  parentingSection: "<p>העצמה רגשית וכלים לתקשורת אפקטיבית.</p>",
  approachText: "<p>הכלה, הקשבה וכלים פרקטיים.</p>",
  targetAudienceText: "<p>הורים, ילדים, מתבגרים עם אתגרים רגשיים.</p>",
  vcardLink: "#",
  recommendations: [
    { name: "נועה", text: "הילה עזרה לי להבין את הילד שלי מחדש." },
    { name: "רוני", text: "הגישה שלך שינתה לנו את הבית." }
  ]
};

window.renderCard = function () {
  const data = window.cardData;

  const replaceAll = (selector, value) => {
    document.querySelectorAll(selector).forEach(el => {
      if (el.tagName === "IMG") {
        el.src = value;
      

    const swiper = new Swiper(".swiper", {
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    });
    } else if (el.tagName === "A" && el.href.includes("tel:")) {
        el.href = `tel:${value}`;
      } else if (el.tagName === "A" && el.href.includes("mailto:")) {
        el.href = `mailto:${value}`;
      } else if (el.tagName === "A" && el.href.includes("wa.me")) {
        el.href = `https://wa.me/972${data.phoneDigits}`;
      } else if (el.tagName === "A" && el.dataset.field === "whatsapp") {
        el.href = `https://wa.me/972${data.phoneDigits}`;
      } else if (el.tagName === "A" && el.dataset.field === "sms") {
        el.href = `sms:${data.phone}`;
      } else if (el.tagName === "A" && el.dataset.field === "addContact") {
        el.href = data.vcardLink || "#";
      } else {
        el.innerHTML = value;
      }
    });
  };

  if (data) {
    document.title = data.pageTitle || `כרטיס ביקור דיגיטלי - ${data.fullName}`;
    if (data.phone) document.body.dataset.whatsapp = data.phone;
    if (data.email) document.body.dataset.email = data.email;

    replaceAll('[data-field="fullName"]', data.fullName);
    replaceAll('[data-field="jobTitle"]', data.jobTitle);
    replaceAll('[data-field="email"]', data.email);
    replaceAll('[data-field="phone"]', data.phone);
    replaceAll('[data-field="logoSrc"]', data.logoSrc);
    replaceAll('[data-field="profileImage"]', data.profileImage);
    replaceAll('[data-field="facebookLink"]', data.facebookLink);
    replaceAll('[data-field="whatsapp"]', data.phone);
    replaceAll('[data-field="sms"]', data.phone);
    replaceAll('[data-field="addContact"]', data.vcardLink);
    replaceAll('[data-field="aboutParagraphs"]', data.aboutParagraphs);
    replaceAll('[data-field="parentingSection"]', data.parentingSection);
    replaceAll('[data-field="approachText"]', data.approachText);
    replaceAll('[data-field="targetAudienceText"]', data.targetAudienceText);

    const ytContainer = document.querySelector('[data-field="youtubeLink"]');
    if (ytContainer && data.youtubeLink) {
      ytContainer.innerHTML = `<iframe src="${data.youtubeLink}" frameborder="0" allowfullscreen></iframe>`;
    }

    const recWrapper = document.querySelector('.swiper-wrapper');
    if (recWrapper && data.recommendations?.length) {
      recWrapper.innerHTML = data.recommendations.map(rec => `
        <div class="swiper-slide">
          <p class="client-name">${rec.name}</p>
          <p class="client-text">${rec.text}</p>
        </div>
      `).join('');
    }
  }
};


window.addEventListener("DOMContentLoaded", function () {
  if (window.renderCard) renderCard();
});