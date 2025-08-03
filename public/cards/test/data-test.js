window.cardData = {
  fullName: "דניאל כהן",
  jobTitle: "יועץ שיווק דיגיטלי",
  pageTitle: "דניאל כהן - ייעוץ שיווקי ודיגיטל",
  phone: "050-555-1212",
  email: "daniel@smartbiz.com",
  phoneDigits: "0505551212",
  vcardLink: "./contact.vcf",

  logoSrc: "/assets/media/logo-ortopok.png",
  profileImage: "/assets/media/profile.jpg",
  videoSrc: "/assets/media/mov_bbb.mp4",
  imageGallerySrc: [
    "/assets/media/gallery-d1.jpg",
    "/assets/media/gallery-d2.jpg",
    "/assets/media/gallery-d3.jpg"
  ],

  facebookLink: "https://facebook.com/daniel.marketing",

  phoneIconSrc: "/assets/contact_icons/green/phone.svg",
  whatsappIconSrc: "/assets/contact_icons/green/whatsapp.svg",
  emailIconSrc: "/assets/contact_icons/green/email.svg",
  smsIconSrc: "/assets/contact_icons/green/sms.svg",
  facebookIconSrc: "/assets/contact_icons/green/facebook.svg",
  recommendationIconSrc: "/assets/contact_icons/green/star.svg",

  shareEmailIconSrc: "/assets/share_icons/blue/email.png",
  shareWhatsappIconSrc: "/assets/share_icons/blue/whatsapp.png",
  shareLinkedinIconSrc: "/assets/share_icons/blue/linkedin.png",
  shareTwitterIconSrc: "/assets/share_icons/blue/twitter.png",
  shareFacebookIconSrc: "/assets/share_icons/blue/facebook.png",
  shareTelegramIconSrc: "/assets/share_icons/blue/telegram.png",

  telegramLink: `https://t.me/share/url?url=${encodeURIComponent("https://example.com")}&text=${encodeURIComponent("דניאל כהן - ייעוץ שיווקי ודיגיטל")}`,

  features: {
    video: true,
    imageGallery: false,
    about: true,
    recommendations: true,
    sendEmail: true,
    sendWhatsapp: false
  },

  shareOptions: {
    email: true,
    whatsapp: true,
    linkedin: true,
    twitter: true,
    facebook: true,
    telegram: true
  },

  galleryImages: [
    { src: "/assets/media/gallery-d1.jpg", text: "קמפיין לדוגמה" },
    { src: "/assets/media/gallery-d2.jpg", text: "תוצאות פרסום" },
    { src: "/assets/media/gallery-d3.jpg", text: "עיצוב פוסט" }
  ],

  aboutParagraphs: `
    <p><strong>נעים להכיר!</strong> אני דניאל כהן, יועץ שיווק עם מעל 8 שנות ניסיון.</p>
    <p>מלווה עסקים בבניית אסטרטגיית שיווק דיגיטלית ממוקדת תוצאות.</p>
    <p>מתמחה בניהול קמפיינים ממומנים בפייסבוק, אינסטגרם, גוגל וטיקטוק.</p>
    <p>החזון שלי: להגדיל את ההכנסות שלך באמצעות פרסום חכם ומדויק.</p>
  `,

  accordionTitle1: "▼ השירותים שלי",
  accordionText1: `
    <p>ניהול קמפיינים ממומנים</p>
    <p>בניית משפכי מכירה</p>
    <p>אסטרטגיה שיווקית מותאמת אישית</p>
  `,
  accordionTitle2: "▼ למה לבחור בי?",
  accordionText2: `
    <p>ניסיון רב בניהול תקציבי פרסום גדולים</p>
    <p>התמקדות בהחזר השקעה (ROI) גבוה</p>
    <p>יחס אישי וליווי צמוד לאורך כל הדרך</p>
  `,

  recommendationsTitle: "המלצות",

recommendations: [
  { 
    name: "נועה", 
    text: "הילה עזרה לי להבין את הילד שלי מחדש. בזכות הכלים שלה הצלחתי ליצור קשר עמוק יותר ולהרגיש ביטחון בדרך." // ~100 תווים
  },
  { 
    name: "רוני", 
    text: "הגישה שלך שינתה לנו את הבית. בזכות השיחות איתך הצלחנו להבין את עצמנו טוב יותר, להתמודד עם קשיים יומיומיים, לחזק את הקשר שלנו כהורים ולהעניק לילדים תחושת ביטחון. התמיכה שלך הייתה מעשית, מחזקת, ואפשרה לנו לצמוח ולהתפתח יחד עם כל המשפחה." // ~300 תווים
  },
  { 
    name: "אנונימי", 
    text: "החוויה הייתה מדהימה. תודה רבה. התהליך שעברתי איתך היה משמעותי הרבה מעבר לציפיות שלי. בכל פגישה הרגשתי שינוי אמיתי – כלים שהשפיעו על חיי היומיום, שיחות שהעמיקו את ההבנה שלי והובילו לתחושת חיבור ושקט פנימי. התמיכה שלך הייתה עקבית, מקצועית, מלאה באכפתיות והובילה לפריצת דרך אמיתית." // ~400 תווים
  }
]

};

console.log("📦 data-client.js (דניאל כהן) loaded OK");
