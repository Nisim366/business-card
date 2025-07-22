const isLive = location.hostname.includes("clix-marketing.co.il");
console.log("📡 isLive:", isLive);

// ✅ תיקון: הגדרה והרצה מיידית של injectAssets
(function injectAssets() {
  const isLive = location.hostname.includes("clix-marketing.co.il");

  const assets = [
    { type: 'link', attr: 'href', path: '/styles/style.css' },
    { type: 'script', attr: 'src', path: '/data-client.js' }
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

document.addEventListener("DOMContentLoaded", function () {
  console.log("🟢 DOMContentLoaded");

  if (!window.cardData) {
    console.error("❌ window.cardData לא הוגדר. ייתכן ש־/data-client.js לא נטען בזמן.");
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

  // ✅ שאר הקוד – ללא שינוי
  // המשך רגיל של sendToWhatsapp, אקורדיון, replaceAll, והזרקת נתונים...

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

  // ממשיך רגיל עם ה־replaceAll וכל ההזרקות...
});

// ✅ טעינה גם כשחוזרים מהיסטוריה (back/forward)
window.addEventListener("pageshow", function () {
  if (window.cardData) {
    console.log("🔁 Page show – מטעין מחדש את ה־DOM");
    const event = new Event("DOMContentLoaded");
    document.dispatchEvent(event);
  }
});
