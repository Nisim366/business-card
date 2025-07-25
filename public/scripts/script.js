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

window.addEventListener("load", function () {
  console.log("✅ window.load");

  const data = window.cardData;
  if (!data) return;

  // ✅ הסתרת פיצ'רים
  document.querySelectorAll("[data-switch]").forEach(el => {
    const key = el.dataset.switch;
    if (data.features?.[key] !== true) el.remove();
  });

  // ✅ הזרקת כל שדות data-field
const replaceAll = () => {
  document.querySelectorAll("[data-field]").forEach(el => {
    const field = el.dataset.field;
    let value = data?.[field];

    // טיפול בברירת מחדל ל-mediaTitle
    if (field === "mediaTitle" && (!value || value.trim() === "")) {
      value = "גלריית תמונות";
    }

    if (value === undefined || value === null) return;

    const tag = el.tagName;
    if (tag === "IMG") el.src = value;
    else if (tag === "A") {
      switch (field) {
        case "phone": el.href = `tel:${value}`; break;
        case "email": el.href = `mailto:${value}`; break;
        case "whatsapp": el.href = `https://wa.me/972${data.phoneDigits}`; break;
        case "sms": el.href = `sms:${data.phone}`; break;
        case "addContact": el.href = data.vcardLink || "#"; break;
        case "facebookLink": el.href = value; break;
        default: el.href = value;
      }
    } else {
      el.innerHTML = value;
    }
  });
};



  document.title = data.pageTitle || "כרטיס ביקור דיגיטלי";
  document.body.dataset.whatsapp = data.phone;
  document.body.dataset.email = data.email;
  replaceAll();

const swiperEl = document.querySelector('.recommendations-swiper');
const recWrapper = document.getElementById('recommendationSlides');
const recData = (data.recommendations || []).filter(rec => rec?.name && rec?.text);

if (!swiperEl || recData.length === 0) {
  swiperEl?.remove();
} else {
  recWrapper.innerHTML = recData.map(rec => `
    <div class="swiper-slide">
      <div class="elementor-testimonial">
        <div class="testimonial-top">
          <span class="elementor-testimonial__name">${rec.name}</span>
        </div>
        <div class="testimonial-middle">
          <div class="elementor-testimonial__content">
            <span class="elementor-testimonial__text">${rec.text}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  new Swiper('.recommendations-swiper', {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: recData.length > 2,
    threshold: 10,
    touchRatio: 1.2,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
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
  // ✅ טעינת ווידאו דינמית
// ✅ טעינת ווידאו דינמית עם poster
const videoContainer = document.querySelector('[data-field="videoSrc"]');
if (videoContainer && window.cardData.videoSrc) {
  const videoElement = document.createElement("video");
  videoElement.setAttribute("controls", "");
  videoElement.setAttribute("playsinline", "");
  videoElement.setAttribute("preload", "metadata");
  videoElement.setAttribute("poster", "/assets/images+videos+logo/video-poster.jpg");
  videoElement.classList.add("video-element");

  const sourceElement = document.createElement("source");
  sourceElement.src = window.cardData.videoSrc;
  sourceElement.type = "video/mp4";

  videoElement.appendChild(sourceElement);
  videoElement.innerHTML += "הדפדפן שלך אינו תומך בווידאו.";
  videoContainer.innerHTML = "";
  videoContainer.appendChild(videoElement);
}

const galleryContainer = document.querySelector('[data-switch="imageGallery"]');
const gallerySlidesContainer = document.getElementById('imageGallerySlides');
const features = window.cardData?.features || {};
const videoSection = document.querySelector('[data-switch="video"]');
// ניהול הצגה והסתרה של וידאו וגלריית תמונות בהתאם לפיצ׳רים
if (features.video && videoSection) {
  videoSection.style.display = "block";
} else if (videoSection) {
  videoSection.style.display = "none";
}

if (galleryContainer) {
  if (features.imageGallery && Array.isArray(window.cardData.imageGallerySrc)) {
    // אם הגלריה מופעלת - הסתר את הוידאו
    if (videoSection) videoSection.style.display = "none";

    const images = window.cardData.imageGallerySrc;

    gallerySlidesContainer.innerHTML = images.map((src, index) => `
      <div class="swiper-slide">
        <img 
          src="${src}" 
          alt="תמונה מספר ${index + 1} בגלריית התמונות" 
          style="width:100%; height:auto; border-radius: var(--radius-large);" 
          tabindex="0"
        />
      </div>
    `).join('');

    galleryContainer.style.display = 'block';

    new Swiper('.image-gallery-container', {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: images.length > 1,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      on: {
        init(swiper) {
          const nextBtn = swiper.navigation.nextEl;
          const prevBtn = swiper.navigation.prevEl;
          if (nextBtn) {
            nextBtn.setAttribute('tabindex', '0');
            nextBtn.setAttribute('aria-label', 'הבא');
          }
          if (prevBtn) {
            prevBtn.setAttribute('tabindex', '0');
            prevBtn.setAttribute('aria-label', 'הקודם');
          }
        }
      }
    });

  } else {
    galleryContainer.style.display = 'none';
    gallerySlidesContainer.innerHTML = '';
  }
}

});
