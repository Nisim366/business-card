window.cardData = {
fullName: "הילה סבן | מטפלת רגשית ומדריכת הורים",

  get pageTitle() {
    return `${this.fullName} - ${this.jobTitle}`;
  },
  phone: "052-939-5776",
  email: "nisimelec77@gmail.com",
  phoneDigits: "0529395776",
  vcardLink: "./contact.vcf",
  wazeLink: "https://waze.com/ul/hsv8ybptzp",
  wazeLabel: "Waze",

  logoSrc: "/assets/media/logo-ortopok.png",
  profileImage: "/assets/media/profile.jpg",
  videoSrc: "/assets/media/mov_bbb.mp4",
 facebookLink: "https://www.facebook.com/share/1HjZkESvSX/?mibextid=wwXIfr",

  phoneIconSrc: "/assets/contact_icons/green/phone.svg",
  whatsappIconSrc: "/assets/contact_icons/green/whatsapp.svg",
  emailIconSrc: "/assets/contact_icons/green/email.svg",
  smsIconSrc: "/assets/contact_icons/green/sms.svg",
  facebookIconSrc: "/assets/contact_icons/green/facebook.svg",
  recommendationIconSrc: "/assets/contact_icons/green/star.svg",
  wazeIconSrc: "/assets/icons/waves.svg",


  shareEmailIconSrc: "/assets/share_icons/blue/email.png",
  shareWhatsappIconSrc: "/assets/share_icons/blue/whatsapp.png",
  shareLinkedinIconSrc: "/assets/share_icons/blue/linkedin.png",
  shareTwitterIconSrc: "/assets/share_icons/blue/twitter.png",
  shareFacebookIconSrc: "/assets/share_icons/blue/facebook.png",
  shareTelegramIconSrc: "/assets/share_icons/blue/Telegram.png",

  // 📌 לינק דינמי ל-Telegram (כותרת + תיאור מתוך הנתונים)
  telegramLink: `https://t.me/share/url?url=${encodeURIComponent("https://example.com")}&text=${encodeURIComponent("הילה לוי - מטפלת רגשית והדרכת הורים")}`,

features: {
  video: true,
  about: true,
  recommendations: true,


  sendEmail: true,
  sendWhatsapp: false,
  facebookLink: false,
  waze: true,
  phone: true
},
    shareOptions: {
    email: true,
    whatsapp: true,
    linkedin: false,
    twitter: true,
    facebook: true,
    telegram: true
  },



  aboutParagraphs: `
<p><strong class="quote-symbol">''</strong></p>
<p data-field="aboutLine1"><strong>נעים מאוד, אני הילה סבן מאור עקיבא</strong></p>
<p data-field="aboutEmptyLine">&nbsp;</p>


  <p>במהלך השנים צברתי ידע וכלים מעשיים בתחומי הייעוץ, התמיכה וההדרכה, תוך דגש על שילוב בין מקצועיות גבוהה לגישה אנושית ונגישה.</p>
  <p>אני מאמין בשיתוף פעולה מלא עם הלקוח, שמירה על שקיפות ובניית תהליך ברור עם מטרות מוגדרות ותוצאות מדידות.</p>
  <p><strong>החזון שלי</strong> הוא להעניק לכל אדם כלים מעשיים לשיפור איכות חייו, חיזוק הביטחון העצמי והרחבת היכולות האישיות.</p>

  <p class="align-right">• ליווי אישי וצמיחה אישית</p>
  <p class="align-right">• פיתוח מיומנויות והתמודדות עם אתגרים</p>
  <p class="align-right">• בניית תוכניות מותאמות אישית לצרכי הלקוח</p>
  <p class="align-right">• מתן ייעוץ וכלים לשיפור הרגלים והתנהלות יומיומית</p>
`
,

  accordionTitle1: "▼ הגישה שלי בטיפול הרגשי",
  accordionText1: `
    <p>אני משלבת כלים מעולמות ה־CBT לצד הקשבה פעילה ורגישה.</p>
    <p>הטיפול מותאם אישית לכל אחד, מתוך אמונה ביכולת של כל אדם לחולל שינוי אמיתי כשהוא מקבל ליווי בגובה העיניים.</p>
  `,
  accordionTitle2: "▼ למי השירות מתאים?",
  accordionText2: `
    <p>הטיפול שלי מיועד להורים, ילדים, מתבגרים, נשים וגברים המתמודדים עם אתגר רגשי, לחץ נפשי או תקיעות רגשית.</p>
    <p>גם מי שמעוניין בהתפתחות אישית, חיזוק תקשורת זוגית או שיפור הורות ימצא מקום מכיל, מדויק ומקדם.</p>
  `,

  scrollToContactText: "השאר פרטים ואחזור אליך",
  recommendationsMainTitle: "לקוחות ממליצים : ",
  videoMainTitle: " לסרטון תדמית",
  contactFormTitle: "השאירו פרטים<br>ואחזור אליכם בהקדם :",
  shareCardTitle: "שיתוף כרטיס הביקור",




    recommendations: [
  { 
    name: "נועה", 
    title: " - אם לילד עם צרכים מיוחדים", // כותרת ממליץ
    text: "הילה עזרה לי להבין את הילד שלי מחדש. בזכות הכלים שלה הצלחתי ליצור קשר עמוק יותר ולהרגיש ביטחון בדרך." 
  },
  { 
    name: "רוני", 
    title: "- אב וכותב תוכן", 
    text: "הגישה שלך שינתה לנו את הבית. בזכות השיחות איתך הצלחנו להבין את עצמנו טוב יותר, להתמודד עם קשיים יומיומיים, לחזק את הקשר שלנו כהורים ולהעניק לילדים תחושת ביטחון. התמיכה שלך הייתה מעשית, מחזקת, ואפשרה לנו לצמוח ולהתפתח יחד עם כל המשפחה." 
  },
  { 
    name: "אנונימי", 
    title: "- לקוח מרוצה", 
    text: "החוויה הייתה מדהימה. תודה רבה. התהליך שעברתי איתך היה משמעותי הרבה מעבר לציפיות שלי. בכל פגישה הרגשתי שינוי אמיתי – כלים שהשפיעו על חיי היומיום, שיחות שהעמיקו את ההבנה שלי והובילו לתחושת חיבור ושקט פנימי. התמיכה שלך הייתה עקבית, מקצועית, מלאה באכפתיות והובילה לפריצת דרך אמיתית." 
  }
]



};

console.log("📦 data-client.js loaded OK");
