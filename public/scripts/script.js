let gallerySwiper = null;
let recommendationsSwiper = null;
let isInitialized = false; // ← דגל למניעת טעינה כפולה

// ✅ זיהוי סביבת הפקה או רנדר
const isLive = location.hostname.includes("clix-marketing.co.il") || location.hostname.includes("render.com");
console.log("📡 isLive:", isLive);

document.addEventListener("DOMContentLoaded", function () {
  // הבטחת מצב נגישות כבוי בטעינה ראשונית
  document.body.classList.remove("accessibility-mode");
  document.body.style.filter = "";
  document.body.style.fontSize = "";

  const loader = document.querySelector(".loader-overlay");

  const removeLoader = () => {
    if (loader) {
      loader.classList.add("fade-out");
      setTimeout(() => loader.remove(), 400);
    }
  };

  window.addEventListener("load", () => {
    console.log("✅ כל המשאבים נטענו - מסיר לואודר");
    removeLoader();
  });
});


// ✅ initCard – ירוץ רק כשה־cardData מוכן
function initCard() {
  if (!window.cardData) {
    console.error("❌ cardData לא הוגדר. ודא שנטען data-client.js לפני script.js");
    return;
  }

  console.log("📦 cardData loaded:", window.cardData);

  const event = new Event("load");
  window.dispatchEvent(event);
}

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader-overlay");
  if (!loader) return;
  loader.classList.add("fade-out");
  setTimeout(() => loader.remove(), 400);
});

// ✅ יצירת vCard דינמית
function generateVCard() {
  if (!window.cardData) return;
  const { fullName, phoneDigits, email } = window.cardData;
  const vcardContent = `
BEGIN:VCARD
VERSION:3.0
FN:${fullName}
TEL;TYPE=CELL:+972${phoneDigits}
EMAIL:${email}
END:VCARD
`.trim();

  const blob = new Blob([vcardContent], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);

  const vcardLink = document.getElementById("vcardDownload");
  if (vcardLink) {
    vcardLink.href = url;
    vcardLink.download = "contact.vcf";
  }
}
window.addEventListener("load", generateVCard);

// ✅ טעינה גם כשחוזרים מהיסטוריה
window.addEventListener("pageshow", function () {
  if (window.cardData && !isInitialized) {
    console.log("🔁 Page show – מטעין מחדש את ה־DOM");
    const loadEvent = new Event("load");
    window.dispatchEvent(loadEvent);
  }
});

window.addEventListener("load", function () {
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

  isInitialized = true;

  document.querySelectorAll("[data-switch]").forEach(el => {
    const key = el.dataset.switch;
    if (data.features?.[key] !== true) el.remove();
  });

  const replaceAll = () => {
    document.querySelectorAll("[data-field]").forEach(el => {
      const field = el.dataset.field;
      let value = data?.[field];
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

    recommendationsSwiper = new Swiper('.recommendations-swiper', {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      threshold: 10,
      touchRatio: 1.2,
      allowSlidePrev: true,
      allowSlideNext: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoHeight: false,
      direction: 'horizontal',
      speed: 700
    });
  }

  if (recommendationsSwiper) {
    document.querySelectorAll(".elementor-testimonial").forEach(testimonial => {
      const textEl = testimonial.querySelector(".elementor-testimonial__text");
      if (!textEl) return;
      const fullText = textEl.innerText.trim();
      if (fullText.length > 300) {
        const readMore = document.createElement("span");
        readMore.className = "read-more";
        readMore.textContent = "עוד";
        readMore.addEventListener("click", () => {
          testimonial.classList.toggle("expanded");
          readMore.textContent = testimonial.classList.contains("expanded") ? "סגור" : "עוד";
          recommendationsSwiper.updateAutoHeight(300);
        });
        testimonial.appendChild(readMore);
      }
    });
  }
    if (recommendationsSwiper) {
    // תמיכה במעבר בין המלצות עם מקלדת
    const prevBtn = document.querySelector('.swiper-button-prev');
    const nextBtn = document.querySelector('.swiper-button-next');

    if (prevBtn) {
      prevBtn.setAttribute('tabindex', '0');
      prevBtn.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ' || event.code === 'Space') {
          event.preventDefault();
          recommendationsSwiper.slidePrev();
        }
      });
    }

    if (nextBtn) {
      nextBtn.setAttribute('tabindex', '0');
      nextBtn.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ' || event.code === 'Space') {
          event.preventDefault();
          recommendationsSwiper.slideNext();
        }
      });
    }
  }


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

  window.sendToEmail = function(event) {
    event.preventDefault();
    if (!data.features?.sendEmail) return;
    const name = document.getElementById('fullName')?.value.trim();
    const phone = document.getElementById('phoneNumber')?.value.trim();
    const msg = document.getElementById('message')?.value.trim();
    const subject = encodeURIComponent(`פניה מכרטיס ביקור - ${name}`);
    const body = encodeURIComponent(`שם: ${name}\nטלפון: ${phone}\nהודעה: ${msg}`);
    const emailAddress = data.email || "info@example.com";
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };

  if (!data.features?.sendEmail) {
    const emailButton = document.querySelector('[data-action="sendEmail"]');
    if (emailButton) emailButton.style.display = 'none';
  }

  if (!data.features?.sendWhatsapp) {
    const whatsappButton = document.querySelector('[data-action="sendWhatsapp"]');
    if (whatsappButton) whatsappButton.style.display = 'none';
  }
  const videoContainer = document.querySelector('[data-field="videoSrc"]');
if (videoContainer) {
  // הפעלה בנגיעה/לחיצה עם עכבר
  videoContainer.addEventListener('click', function () {
    const video = videoContainer.querySelector('video');
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  });

  // הפעלה עם מקלדת (Enter/Space)
  videoContainer.setAttribute('tabindex', '0');
  videoContainer.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ' || event.code === 'Space') {
      event.preventDefault();
      const video = videoContainer.querySelector('video');
      if (video) {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }
    }
  });
}

document.querySelectorAll('.elementor-tab-title').forEach((toggle) => {
  // שמירה על ההתנהגות הקיימת עם עכבר
  toggle.addEventListener('click', function () {
    handleAccordionToggle(this);
  });

  // הוספת תמיכה ב־Enter ו־Space
  toggle.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ' || event.code === 'Space') {
      event.preventDefault(); // מונע גלילה
      handleAccordionToggle(this);
    }
  });
});

function handleAccordionToggle(element) {
  const isActive = element.classList.contains('elementor-active');
  const tabContentId = element.getAttribute('aria-controls');
  const tabContent = document.getElementById(tabContentId);

  document.querySelectorAll('.elementor-tab-title').forEach(el => {
    el.classList.remove('elementor-active');
    el.setAttribute('aria-expanded', 'false');
    el.setAttribute('aria-selected', 'false');
  });
  document.querySelectorAll('.elementor-tab-content').forEach(el => el.setAttribute('hidden', true));

  if (!isActive) {
    element.classList.add('elementor-active');
    element.setAttribute('aria-expanded', 'true');
    element.setAttribute('aria-selected', 'true');
    tabContent.removeAttribute('hidden');
  }
}


  document.querySelectorAll('.share-buttons a').forEach(button => {
    const type = button.dataset.type;
    const shareOptions = window.cardData?.shareOptions || {};
    if (shareOptions[type] === false) {
      button.style.display = 'none';
      return;
    }
    button.addEventListener('click', function () {
      const url = encodeURIComponent(location.href);
      const title = encodeURIComponent(document.title);
      let shareUrl = "#";
      switch (type) {
        case "whatsapp":
          shareUrl = `https://wa.me/?text=${title}%0A${url}`;
          break;
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
          break;
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
          break;
        case "email":
          shareUrl = `mailto:?subject=${title}&body=${url}`;
          break;
        case "telegram":
          shareUrl = window.cardData?.telegramLink || `https://t.me/share/url?url=${url}&text=${title}`;
          break;
      }
      window.open(shareUrl, '_blank');
    });
  });

  const mediaContainer = document.querySelector('[data-field="videoSrc"]');
  if (mediaContainer) {
    if (data.features?.video === true && window.cardData.videoSrc) {
      createVideoElement(mediaContainer);
    } else if (data.features?.imageGallery === true && Array.isArray(window.cardData.galleryImages)) {
      createImageGallery(mediaContainer);
    } else {
      mediaContainer.style.display = 'none';
    }
  }
});

function createVideoElement(container) {
  const videoElement = document.createElement("video");
  videoElement.setAttribute("controls", "");
  videoElement.setAttribute("playsinline", "");
  videoElement.setAttribute("preload", "metadata");
  videoElement.classList.add("video-element");

  const sourceElement = document.createElement("source");
  sourceElement.src = window.cardData.videoSrc;
  sourceElement.type = "video/mp4";

  videoElement.appendChild(sourceElement);
  container.innerHTML = "";
  container.appendChild(videoElement);
}

function createImageGallery(container) {
  const gallery = document.getElementById("staticGallery");
  const images = window.cardData?.galleryImages;
  if (!gallery || !Array.isArray(images)) {
    container?.remove();
    return;
  }
  gallery.innerHTML = images.map((image, index) => `
    <img src="${image.src}" alt="${image.text || `תמונה ${index + 1}`}" onclick="openFullscreenImageGallery(${index})" />
  `).join("");
}

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
// ✅ פקד נגישות – הפעלה/כיבוי מצב נגישות
const accessibilityBtn = document.getElementById("accessibilityToggle");
if (accessibilityBtn) {
  accessibilityBtn.addEventListener("click", function () {
    document.body.classList.toggle("accessibility-mode");

    if (document.body.classList.contains("accessibility-mode")) {
      document.body.style.filter = "contrast(1.2)";
      document.body.style.fontSize = "110%";
    } else {
      document.body.style.filter = "";
      document.body.style.fontSize = "";
    }
  });
}


window.closeFullscreenImageGallery = function() {
  const overlay = document.getElementById("fullscreenOverlay");
  if (overlay) overlay.style.display = "none";
};
