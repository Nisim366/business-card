if (
  location.hostname !== 'yourdomain.onrender.com' &&
  location.hostname !== '127.0.0.1' &&
  location.hostname !== 'localhost'
) {
  alert("גישה חסומה");
  throw new Error("Unauthorized access");
}


document.addEventListener("DOMContentLoaded", function () {
  // ✅ הסתרת פיצ'רים לפי features (video, about וכו')
  const switches = document.querySelectorAll("[data-switch]");
  switches.forEach(el => {
    const key = el.dataset.switch;
    const isEnabled = window.cardData?.features?.[key];
    if (isEnabled !== true) el.remove();
  });

  // ✅ הגדרת Swiper
  if (document.querySelector('.mySwiper')) {
    new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    });
  }

  // ✅ טופס שליחה לוואטסאפ
  window.sendToWhatsapp = function(event) {
    event.preventDefault();

    const name = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phoneNumber').value.trim();
    const msg = document.getElementById('message').value.trim();

    const fullMsg = `שם: ${name}%0Aטלפון: ${phone}%0Aהודעה: ${msg}`;

    const whatsappNumber = document.body.dataset.whatsapp || "0532407762";
    const url = `https://wa.me/972${whatsappNumber.slice(1)}?text=${fullMsg}`;
    window.open(url, '_blank');
  };

  // ✅ אקורדיון Elementor
  document.querySelectorAll('.elementor-tab-title').forEach((toggle) => {
    toggle.addEventListener('click', function () {
      const isActive = this.classList.contains('elementor-active');
      const tabContentId = this.getAttribute('aria-controls');
      const tabContent = document.getElementById(tabContentId);

      document.querySelectorAll('.elementor-tab-title').forEach(el => {
        el.classList.remove('elementor-active');
        el.setAttribute('aria-expanded', 'false');
        el.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.elementor-tab-content').forEach(el => el.setAttribute('hidden', true));

      if (!isActive) {
        this.classList.add('elementor-active');
        this.setAttribute('aria-expanded', 'true');
        this.setAttribute('aria-selected', 'true');
        tabContent.removeAttribute('hidden');
      }
    });
  });

  // ✅ שיתוף
  document.querySelectorAll('.share-buttons a').forEach(button => {
    button.addEventListener('click', function () {
      const type = this.dataset.type;
      const pageUrl = encodeURIComponent(window.location.href);
      const pageTitle = encodeURIComponent(document.title);
      let shareUrl = "#";
      switch (type) {
        case "whatsapp":
          shareUrl = `https://wa.me/?text=${pageTitle}%0A${pageUrl}`; break;
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`; break;
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`; break;
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`; break;
        case "email":
          shareUrl = `mailto:?subject=${pageTitle}&body=${pageUrl}`; break;
      }
      window.open(shareUrl, '_blank');
    });
  });

  // ✅ הזרקת נתונים
  // ✅ הזרקת נתונים
const data = window.cardData;
const replaceAll = (selector, value) => {
  document.querySelectorAll(selector).forEach(el => {
    const tag = el.tagName;
    const isAnchor = tag === "A";
    const field = el.dataset.field;

    if (tag === "IMG") {
      if (value) el.src = value;
    }
    else if (isAnchor && field === "phone") {
      if (value) el.href = `tel:${value}`;
      else el.removeAttribute("href");
    }
    else if (isAnchor && field === "email") {
      if (value) el.href = `mailto:${value}`;
      else el.removeAttribute("href");
    }
    else if (isAnchor && field === "whatsapp") {
      if (data.phoneDigits) el.href = `https://wa.me/972${data.phoneDigits}`;
      else el.removeAttribute("href");
    }
    else if (isAnchor && field === "sms") {
      if (data.phone) el.href = `sms:${data.phone}`;
      else el.removeAttribute("href");
    }
    else if (isAnchor && field === "addContact") {
      if (data.vcardLink) el.href = data.vcardLink;
      else el.removeAttribute("href");
    }
    else if (isAnchor && field === "facebookLink") {
      if (value) el.href = value;
      else el.removeAttribute("href");
    }
    else if (!el.querySelector('img')) {
      el.innerHTML = value;
    }
  });
};


  if (data) {
    document.title = data.pageTitle || "כרטיס ביקור דיגיטלי";
    document.body.dataset.whatsapp = data.phone;
    document.body.dataset.email = data.email;

    replaceAll('[data-field="fullName"]', data.fullName);
    replaceAll('[data-field="jobTitle"]', data.jobTitle);
    replaceAll('[data-field="email"]', data.email);
    replaceAll('[data-field="phone"]', data.phone);
    replaceAll('[data-field="logoSrc"]', data.logoSrc);
    replaceAll('[data-field="profileImage"]', data.profileImage);
    replaceAll('[data-field="facebookLink"]', data.facebookLink);
    replaceAll('[data-field="videoSrc"]', `<video controls><source src="${data.videoSrc}" type="video/mp4">הדפדפן לא תומך בניגון וידאו.</video>`);
    replaceAll('[data-field="aboutParagraphs"]', data.aboutParagraphs);
    replaceAll('[data-field="parentingSection"]', data.parentingSection);
    replaceAll('[data-field="approachText"]', data.approachText);
    replaceAll('[data-field="targetAudienceText"]', data.targetAudienceText);
    replaceAll('[data-field="accordionTitle1"]', data.accordionTitle1);
    replaceAll('[data-field="accordionText1"]', data.accordionText1);
    replaceAll('[data-field="accordionTitle2"]', data.accordionTitle2);
    replaceAll('[data-field="accordionText2"]', data.accordionText2);
    replaceAll('[data-field="addContact"]', data.vcardLink || "#");

    const recWrapper = document.querySelector('.swiper-wrapper');
    if (recWrapper && data.recommendations?.length) {
      recWrapper.innerHTML = data.recommendations.map(rec => `
  <div class="swiper-slide">
    <div class="elementor-testimonial">
      <div class="testimonial-top">
        <span class="elementor-testimonial__name">${rec.name}</span>
      </div>
      <div class="testimonial-middle">
        <div class="elementor-testimonial__text">${rec.text}</div>
      </div>
    </div>
  </div>
`).join('');
      setTimeout(() => {
        const realSlides = document.querySelectorAll('.swiper-slide');
        if (realSlides.length > 1) {
          new Swiper('.swiper', {
            slidesPerView: 1,
            loop: true,
            spaceBetween: 20,
            autoplay: { delay: 8000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true }
          });
        }
      }, 0);
    }
  }
});
