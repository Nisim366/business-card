document.addEventListener("DOMContentLoaded", function () {
  // ✅ Swiper קלאסי
  if (document.querySelector('.swiper')) {
    new Swiper('.swiper', {
      slidesPerView: 1,
      loop: true,
      spaceBetween: 20,
      autoplay: {
        delay: 8000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    });
  }

  // ✅ תמיכה באקורדיון בסגנון Elementor
  const tabToggles = document.querySelectorAll('.elementor-tab-title');
  tabToggles.forEach((toggle) => {
    toggle.addEventListener('click', function () {
      const isActive = this.classList.contains('elementor-active');
      const tabContentId = this.getAttribute('aria-controls');
      const tabContent = document.getElementById(tabContentId);

      document.querySelectorAll('.elementor-tab-title').forEach((el) => {
        el.classList.remove('elementor-active');
        el.setAttribute('aria-expanded', 'false');
        el.setAttribute('aria-selected', 'false');
      });

      document.querySelectorAll('.elementor-tab-content').forEach((el) => {
        el.setAttribute('hidden', true);
      });

      if (!isActive) {
        this.classList.add('elementor-active');
        this.setAttribute('aria-expanded', 'true');
        this.setAttribute('aria-selected', 'true');
        tabContent.removeAttribute('hidden');
      }
    });
  });

  // ✅ שיתוף דינמי של קישור העמוד
  const shareButtons = document.querySelectorAll('.share-buttons a');
  shareButtons.forEach(button => {
    button.addEventListener('click', function () {
      const type = this.dataset.type;
      const pageUrl = encodeURIComponent(window.location.href);
      const pageTitle = encodeURIComponent(document.title);
      let shareUrl = "#";
      switch (type) {
        case "whatsapp": shareUrl = `https://wa.me/?text=${pageTitle}%0A${pageUrl}`; break;
        case "facebook": shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`; break;
        case "linkedin": shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`; break;
        case "twitter": shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`; break;
        case "email": shareUrl = `mailto:?subject=${pageTitle}&body=${pageUrl}`; break;
      }
      window.open(shareUrl, '_blank');
    });
  });

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

  // ✅ טעינת כרטיס דיגיטלי
  if (window.cardData && typeof window.renderCard === "function") {
    window.renderCard();
  }
});

// ✅ פונקציה גלובלית לטעינת תוכן הכרטיס
window.renderCard = function () {
  const data = window.cardData;
  if (!data) return;

  const replaceAll = (selector, value) => {
    document.querySelectorAll(selector).forEach(el => {
      const isAnchor = el.tagName === "A";
      const field = el.dataset.field;
      if (el.tagName === "IMG") {
        el.src = value;
      } else if (isAnchor && el.href.includes("tel:")) {
        el.href = `tel:${value}`;
      } else if (isAnchor && el.href.includes("mailto:")) {
        el.href = `mailto:${value}`;
      } else if (isAnchor && el.href.includes("wa.me")) {
        el.href = `https://wa.me/972${data.phoneDigits}`;
      } else if (isAnchor && field === "whatsapp") {
        el.href = `https://wa.me/972${data.phoneDigits}`;
      } else if (isAnchor && field === "sms") {
        el.href = `sms:${data.phone}`;
      } else if (isAnchor && field === "addContact") {
        el.href = data.vcardLink || "#";
      } else if (isAnchor && field === "facebookLink") {
        el.href = value;
      } else if (!isAnchor) {
        el.innerHTML = value;
      }
    });
  };

  document.title = data.pageTitle || document.title;
  document.body.dataset.whatsapp = data.phone;
  document.body.dataset.email = data.email;

  replaceAll('[data-field="fullName"]', data.fullName);
  replaceAll('[data-field="jobTitle"]', data.jobTitle);
  replaceAll('[data-field="email"]', data.email);
  replaceAll('[data-field="phone"]', data.phone);
  replaceAll('[data-field="logoSrc"]', data.logoSrc);
  replaceAll('[data-field="profileImage"]', data.profileImage);
  replaceAll('[data-field="facebookLink"]', data.facebookLink);
  replaceAll('[data-field="youtubeLink"]', `<iframe src="${data.youtubeLink}" frameborder="0" allowfullscreen></iframe>`);
  replaceAll('[data-field="aboutParagraphs"]', data.aboutParagraphs);
  replaceAll('[data-field="parentingSection"]', data.parentingSection);
  replaceAll('[data-field="approachText"]', data.approachText);
  replaceAll('[data-field="targetAudienceText"]', data.targetAudienceText);
  replaceAll('[data-field="reviewName1"]', data.recommendations?.[0]?.name || '');
  replaceAll('[data-field="reviewText1"]', data.recommendations?.[0]?.text || '');
  replaceAll('[data-field="reviewName2"]', data.recommendations?.[1]?.name || '');
  replaceAll('[data-field="reviewText2"]', data.recommendations?.[1]?.text || '');
  replaceAll('[data-field="reviewName3"]', data.recommendations?.[2]?.name || '');
  replaceAll('[data-field="reviewText3"]', data.recommendations?.[2]?.text || '');
};