// ✅ זיהוי סביבת הפקה או רנדר
const isLive = location.hostname.includes("clix-marketing.co.il") || location.hostname.includes("render.com");
console.log("📡 isLive:", isLive);

// ✅ הגדרה והרצה מיידית של injectAssets
(function injectAssets() {
  const assets = [
    { type: 'link', attr: 'href', path: '/styles/style.css' },
  ];

  assets.forEach(asset => {
    const tag = document.createElement(asset.type);
    tag[asset.attr] = asset.path;
    if (asset.type === 'link') tag.rel = 'stylesheet';
    if (asset.type === 'script') tag.defer = true;
    document.head.appendChild(tag);
    console.log(`✅ Injected asset: ${asset.path}`);
  });
})();

// ✅ טעינה בטוחה לאחר שהכל נטען (כולל הסקריפטים)
window.addEventListener("load", function () {
  console.log("✅ window.load");

  if (!window.cardData) {
    console.error("❌ window.cardData לא הוגדר. ייתכן ש־/data/data-client.js לא נטען בזמן.");
    return;
  }

  console.log("📦 cardData loaded:", window.cardData);

  // ✅ הסתרת פיצ'רים לפי features (video, about וכו')
  const switches = document.querySelectorAll("[data-switch]");
  switches.forEach(el => {
    const key = el.dataset.switch;
    const isEnabled = window.cardData?.features?.[key];
    console.log(`🔁 Feature "${key}":`, isEnabled);
    if (isEnabled !== true) el.remove();
  });

  // ✅ הגדרת Swiper
  if (document.querySelector('.mySwiper')) {
    console.log("📱 Swiper מופעל על .mySwiper");
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
  } else {
    console.log("ℹ️ .mySwiper לא נמצא – Swiper לא הופעל.");
  }

  // ✅ לוג לבדיקה של כל הזרקה
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
        if (window.cardData.phoneDigits) el.href = `https://wa.me/972${window.cardData.phoneDigits}`;
        else el.removeAttribute("href");
      }
      else if (isAnchor && field === "sms") {
        if (window.cardData.phone) el.href = `sms:${window.cardData.phone}`;
        else el.removeAttribute("href");
      }
      else if (isAnchor && field === "addContact") {
        if (window.cardData.vcardLink) el.href = window.cardData.vcardLink;
        else el.removeAttribute("href");
      }
      else if (isAnchor && field === "facebookLink") {
        if (value) el.href = value;
        else el.removeAttribute("href");
      }
      else if (!el.querySelector('img')) {
        el.innerHTML = value;
      }

      console.log(`🔄 Injected [${selector}]:`, value);
    });
  };

  // ✅ הזרקת נתונים בפועל
  const data = window.cardData;
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
  replaceAll('[data-field="youtubeLink"]', `<iframe src="${data.youtubeLink}" frameborder="0" allowfullscreen></iframe>`);
  replaceAll('[data-field="aboutParagraphs"]', data.aboutParagraphs);
  replaceAll('[data-field="accordionTitle1"]', data.accordionTitle1);
  replaceAll('[data-field="accordionText1"]', data.accordionText1);
  replaceAll('[data-field="accordionTitle2"]', data.accordionTitle2);
  replaceAll('[data-field="accordionText2"]', data.accordionText2);
  replaceAll('[data-field="addContact"]', data.vcardLink || "#");

  // ✅ המלצות – טעינת swiper דינמית
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
      const slides = document.querySelectorAll('.swiper-slide');
      if (slides.length > 1) {
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

  // ✅ טופס WhatsApp
  window.sendToWhatsapp = function(event) {
    event.preventDefault();
    const name = document.getElementById('fullName')?.value.trim();
    const phone = document.getElementById('phoneNumber')?.value.trim();
    const msg = document.getElementById('message')?.value.trim();
    const fullMsg = `שם: ${name}%0Aטלפון: ${phone}%0Aהודעה: ${msg}`;
    const number = data.phoneDigits || "0000000000";
    const url = `https://wa.me/972${number}?text=${fullMsg}`;
    window.open(url, '_blank');
  };

  // ✅ אקורדיון
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

  // ✅ כפתורי שיתוף
  document.querySelectorAll('.share-buttons a').forEach(button => {
    button.addEventListener('click', function () {
      const type = this.dataset.type;
      const url = encodeURIComponent(location.href);
      const title = encodeURIComponent(document.title);
      let shareUrl = "#";

      switch (type) {
        case "whatsapp": shareUrl = `https://wa.me/?text=${title}%0A${url}`; break;
        case "facebook": shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break;
        case "linkedin": shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`; break;
        case "twitter": shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`; break;
        case "email": shareUrl = `mailto:?subject=${title}&body=${url}`; break;
      }

      window.open(shareUrl, '_blank');
    });
  });
});

// ✅ טעינה גם כשחוזרים מהיסטוריה (back/forward)
window.addEventListener("pageshow", function () {
  if (window.cardData) {
    console.log("🔁 Page show – מטעין מחדש את ה־DOM");
    const event = new Event("load");
    window.dispatchEvent(event);
  }
});
