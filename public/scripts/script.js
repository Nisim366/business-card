// ✅ זיהוי סביבת הפקה או רנדר
const isLive = location.hostname.includes("clix-marketing.co.il") || location.hostname.includes("render.com");
console.log("📡 isLive:", isLive);

// ✅ הגדרה והרצה מיידית של injectAssets עם התחייבות שהסקריפטים ייטענו לפני המשך
(function injectAssets() {
  const assets = [
    { type: 'link', attr: 'href', path: '/styles/style.css' },
    { type: 'script', attr: 'src', path: '/data/data-client.js' }
  ];

  let pendingScripts = assets.filter(a => a.type === 'script').length;

  assets.forEach(asset => {
    const tag = document.createElement(asset.type);
    tag[asset.attr] = asset.path;

    if (asset.type === 'link') tag.rel = 'stylesheet';

    if (asset.type === 'script') {
      tag.onload = () => {
        console.log(`📥 Loaded script: ${asset.path}`);
        pendingScripts--;
        if (pendingScripts === 0) {
          console.log("📦 כל הסקריפטים נטענו – מריץ initCard()");
          initCard();
        }
      };
      tag.onerror = () => {
        console.error(`❌ Failed to load ${asset.path}`);
        pendingScripts--;
      };
    }

    document.head.appendChild(tag);
    console.log(`✅ Injected asset: ${asset.path}`);
  });
})();

// ✅ initCard – ירוץ רק כשה־cardData מוכן
function initCard() {
  if (!window.cardData) {
    console.error("❌ cardData לא הוגדר. בדוק את /data/data-client.js");
    return;
  }

  console.log("📦 cardData loaded:", window.cardData);

  // מדמה window.load לאחר שהכל מוכן
  const event = new Event("load");
  window.dispatchEvent(event);
}

// ✅ טעינה גם כשחוזרים מהיסטוריה (back/forward)
window.addEventListener("pageshow", function () {
  if (window.cardData) {
    console.log("🔁 Page show – מטעין מחדש את ה־DOM");
    const event = new Event("load");
    window.dispatchEvent(event);
  }
});

// ✅ כל הלוגיקה שלך תישאר כאן (מריצה רק כשנשלח event של load)
window.addEventListener("load", function () {
  console.log("✅ window.load");

  const data = window.cardData;
  if (!data) {
    console.error("❌ window.cardData לא מוגדר.");
    return;
  }

  // ✅ הסתרת פיצ'רים
  const switches = document.querySelectorAll("[data-switch]");
  switches.forEach(el => {
    const key = el.dataset.switch;
    const isEnabled = data.features?.[key];
    console.log(`🔁 Feature "${key}":`, isEnabled);
    if (isEnabled !== true) el.remove();
  });

  // ✅ לוגיקת replaceAll
const replaceAll = () => {
  const data = window.cardData;
  document.querySelectorAll("[data-field]").forEach(el => {
    const field = el.dataset.field;
    const value = data?.[field];
    const tag = el.tagName;

    if (!value) return;

    if (tag === "IMG") {
      el.src = value;
    }
    else if (tag === "A") {
      switch (field) {
        case "phone":
          el.href = `tel:${value}`; break;
        case "email":
          el.href = `mailto:${value}`; break;
        case "whatsapp":
          el.href = `https://wa.me/972${data.phoneDigits}`; break;
        case "sms":
          el.href = `sms:${data.phone}`; break;
        case "addContact":
          el.href = data.vcardLink || "#"; break;
        case "facebookLink":
          el.href = value; break;
        default:
          el.href = value;
      }
    }
    else {
      el.innerHTML = value;
    }

    console.log(`🔄 Injected [${field}] =>`, value);
  });
};

  // ✅ הזרקות נתונים
  // ✅ הזרקות נתונים
  document.title = data.pageTitle || "כרטיס ביקור דיגיטלי";
  document.body.dataset.whatsapp = data.phone;
  document.body.dataset.email = data.email;

  // ✅ קריאה אחת לפונקציה הגנרית שמזריקה הכל
  replaceAll();

  // ✅ המלצות
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
