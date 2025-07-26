let gallerySwiper = null;
let recommendationsSwiper = null;
let isInitialized = false; // ← דגל למניעת טעינה כפולה

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

// ✅ טעינה גם כשחוזרים מהיסטוריה (back/forward) - אבל רק אם עדיין לא הותחל
window.addEventListener("pageshow", function (event) {
  if (window.cardData && !isInitialized) {
    console.log("🔁 Page show – מטעין מחדש את ה־DOM");
    const loadEvent = new Event("load");
    window.dispatchEvent(loadEvent);
  }
});

window.addEventListener("load", function () {
  // מניעת טעינה כפולה
  if (isInitialized) {
    console.log("⚠️ כבר הותחל - מדלג על טעינה חוזרת");
    return;
  }

  console.log("✅ window.load");

  const data = window.cardData;
  if (!data) {
    console.error("❌ window.cardData לא קיים!");
    return;
  }

  isInitialized = true; // ← סימון שכבר הותחל

  // 🔍 דיבוג מפורט של נתוני גלריה
  console.log("🔍 DEBUG: בדיקת נתוני גלריה");
  console.log("📦 cardData:", window.cardData);
  console.log("🎛️ imageGallery feature:", window.cardData?.features?.imageGallery);
  console.log("🖼️ imageGallerySrc:", window.cardData?.imageGallerySrc);
  console.log("📁 imageGallerySrc length:", window.cardData?.imageGallerySrc?.length);
  console.log("🎯 galleryContainer element:", document.querySelector('[data-switch="imageGallery"]'));
  console.log("📋 gallerySlidesContainer element:", document.getElementById('imageGallerySlides'));

  // ✅ הסתרת פיצ'רים
  document.querySelectorAll("[data-switch]").forEach(el => {
    const key = el.dataset.switch;
    if (data.features?.[key] !== true) el.remove();
  });

  // ✅ הזרקת כל שדות data-field (רק פעם אחת)
  const replaceAll = () => {
    document.querySelectorAll("[data-field]").forEach(el => {
      const field = el.dataset.field;
      let value = data?.[field];

      // טיפול בברירת מחדל ל-mediaTitle
      if (field === "mediaTitle" && (!value || value.trim() === "")) {
        value = "גלריית תמונות";
      }

      if (value === undefined || value === null) return;

<<<<<<< HEAD
      const tag = el.tagName;
=======
>>>>>>> base
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
  replaceAll(); // רק פעם אחת

<<<<<<< HEAD
  // המלצות
=======
>>>>>>> base
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

<<<<<<< HEAD
    recommendationsSwiper = new Swiper('.recommendations-swiper', {
=======
    new Swiper('.recommendations-swiper', {
>>>>>>> base
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

<<<<<<< HEAD
  // ✅ טעינת ווידאו דינמית
  const videoContainer = document.querySelector('[data-field="videoSrc"]');
  if (videoContainer && window.cardData.videoSrc) {
    const videoElement = document.createElement("video");
    videoElement.setAttribute("controls", "");
    videoElement.setAttribute("playsinline", "");
    videoElement.setAttribute("preload", "metadata");
    videoElement.setAttribute("poster", "/assets/images+videos+logo/video-poster.jpg");
    videoElement.classList.add("video-element");
=======
  // ✅ לוגיקת תנאי הצגה - וידאו או גלריית תמונות
  const mediaContainer = document.querySelector('[data-field="videoSrc"]');
  if (mediaContainer) {
    if (data.features?.video === true && window.cardData.videoSrc) {
      console.log("📹 מציג וידאו");
      createVideoElement(mediaContainer);
    } else if (data.features?.imageGallery === true && Array.isArray(window.cardData.galleryImages)) {
      console.log("🖼️ מציג גלריית תמונות");
      createImageGallery(mediaContainer);
    } else {
      console.log("❌ לא מציג וידאו או גלריה");
      mediaContainer.style.display = 'none';
    }
  }
});

// ✅ יצירת וידאו
function createVideoElement(container) {
  const videoElement = document.createElement("video");
  videoElement.setAttribute("controls", "");
  videoElement.setAttribute("playsinline", "");
  videoElement.setAttribute("preload", "metadata");
  videoElement.setAttribute("poster", "/assets/images+videos+logo/video-poster.jpg");
  videoElement.classList.add("video-element");
>>>>>>> base

    const sourceElement = document.createElement("source");
    sourceElement.src = window.cardData.videoSrc;
    sourceElement.type = "video/mp4";

<<<<<<< HEAD
    videoElement.appendChild(sourceElement);
    videoElement.innerHTML += "הדפדפן שלך אינו תומך בווידאו.";
    videoContainer.innerHTML = "";
    videoContainer.appendChild(videoElement);
  }

  // ✅ ניהול פשוט וברור של וידאו וגלריית תמונות
  const galleryContainer = document.querySelector('[data-switch="imageGallery"]');
  const gallerySlidesContainer = document.getElementById('imageGallerySlides');
  const videoSection = document.querySelector('[data-switch="video"]');

  console.log("🎬 videoSection found:", !!videoSection);
  console.log("🖼️ galleryContainer found:", !!galleryContainer);
  console.log("📋 gallerySlidesContainer found:", !!gallerySlidesContainer);

  // הסתר וידאו (כי features.video = false)
  if (videoSection) {
    videoSection.style.display = "none";
    console.log("🚫 וידאו הוסתר");
  }

  // הצג רק גלריית תמונות (כי features.imageGallery = true)
  if (galleryContainer) {
    console.log("🎯 מעבד גלריית תמונות...");
    console.log("✅ features.imageGallery:", data.features.imageGallery);
    console.log("✅ imageGallerySrc is array:", Array.isArray(window.cardData.imageGallerySrc));
    console.log("✅ imageGallerySrc length > 0:", window.cardData.imageGallerySrc?.length > 0);
    
    if (data.features.imageGallery && Array.isArray(window.cardData.imageGallerySrc) && window.cardData.imageGallerySrc.length > 0) {
      console.log("🚀 יוצר גלריית תמונות...");
      const images = window.cardData.imageGallerySrc;

      // ✅ הסרת בדיקת טעינה מיותרת - Swiper יטען את התמונות
      console.log("📝 יוצר HTML עבור גלריה (ללא בדיקה מוקדמת)...");

      const slidesHTML = images.map((src, index) => `
        <div class="swiper-slide">
          <img
            src="${src}"
            alt="תמונה מספר ${index + 1} בגלריית התמונות"
            style="width:100%; height:auto; border-radius: var(--radius-large);"
            tabindex="0"
            loading="lazy"
          />
        </div>
      `).join('');

      console.log("📝 HTML שנוצר עבור סלייד");
      gallerySlidesContainer.innerHTML = slidesHTML;

      galleryContainer.style.display = 'block';
      console.log("👁️ galleryContainer הוצג");

      if (gallerySwiper !== null) {
        console.log("🗑️ הורס Swiper קיים...");
        gallerySwiper.destroy(true, true);
        gallerySwiper = null;
      }

      console.log("🎠 יוצר Swiper חדש...");
      gallerySwiper = new Swiper('.image-gallery-container', {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: images.length > 1,
        simulateTouch: true,
        allowTouchMove: true,
        preloadImages: false, // ← מונע טעינה מוקדמת
        lazy: true, // ← טעינה lazy
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
            console.log("🎉 Swiper הותחל בהצלחה!");
            console.log("📊 מספר סליידים:", swiper.slides.length);
            const nextBtn = swiper.navigation.nextEl;
            const prevBtn = swiper.navigation.prevEl;
            if (nextBtn) {
              nextBtn.setAttribute('tabindex', '0');
              nextBtn.setAttribute('aria-label', 'הבא');
              console.log("➡️ כפתור הבא הוגדר");
            }
            if (prevBtn) {
              prevBtn.setAttribute('tabindex', '0');
              prevBtn.setAttribute('aria-label', 'הקודם');
              console.log("⬅️ כפתור הקודם הוגדר");
            }
          },
          slideChange(swiper) {
            console.log('🔄 שקף פעיל השתנה ל:', swiper.activeIndex);
          }
        }
      });

      console.log("✅ Swiper נוצר:", !!gallerySwiper);

    } else {
      console.log("❌ תנאים לא מתקיימים לגלריה:");
      console.log("   - features.imageGallery:", data.features.imageGallery);
      console.log("   - is Array:", Array.isArray(window.cardData.imageGallerySrc));
      console.log("   - length > 0:", window.cardData.imageGallerySrc?.length > 0);
      
      // אם אין תמונות או הפיצ'ר לא מופעל - הסתר גלריה
      galleryContainer.style.display = 'none';
      gallerySlidesContainer.innerHTML = '';
      if (gallerySwiper !== null) {
        gallerySwiper.destroy(true, true);
        gallerySwiper = null;
      }
      console.log("🚫 גלריה הוסתרה");
    }
  } else {
    console.error("❌ galleryContainer לא נמצא ב-DOM!");
  }
});
=======
  videoElement.appendChild(sourceElement);
  videoElement.innerHTML += "הדפדפן שלך אינו תומך בווידאו.";
  container.innerHTML = "";
  container.appendChild(videoElement);
}

// ✅ יצירת גלריה סטטית מתוך data.galleryImages
function createImageGallery(container) {
  const gallery = document.getElementById("staticGallery");
  const images = window.cardData?.galleryImages;

  if (!gallery || !Array.isArray(images)) {
    console.warn("⚠️ לא נמצאו תמונות להצגה בגלריה");
    container?.remove(); // מסיר את האלמנט במידה ואין מה להציג
    return;
  }

  gallery.innerHTML = images.map((image, index) => `
    <img src="${image.src}" alt="${image.text || `תמונה ${index + 1}`}" onclick="openFullscreenImageGallery(${index})" />
  `).join("");
}

// ✅ פתיחה בגלריה במסך מלא
window.openFullscreenImageGallery = function(startIndex = 0) {
  const overlay = document.getElementById("fullscreenOverlay");
  const wrapper = overlay?.querySelector(".swiper-wrapper");
  const images = window.cardData?.galleryImages;

  if (!overlay || !wrapper || !Array.isArray(images)) return;

  wrapper.innerHTML = images.map(image => `
    <div class="swiper-slide">
      <div class="elementor-testimonial image-mode" tabindex="0">
        <img src="${image.src}" alt="${image.text || ''}" />
        ${image.text ? `<div class="elementor-testimonial__text">${image.text}</div>` : ""}
      </div>
    </div>
  `).join("");

  overlay.style.display = "flex";

  window.fullscreenSwiper = new Swiper(".fullscreen-swiper", {
    loop: true,
    initialSlide: startIndex,
    slidesPerView: 1,
    spaceBetween: 20,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
};

// ✅ סגירה
window.closeFullscreenImageGallery = function() {
  const overlay = document.getElementById("fullscreenOverlay");
  if (overlay) overlay.style.display = "none";
};
>>>>>>> base
