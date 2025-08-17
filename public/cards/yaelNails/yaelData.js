window.cardData = {
fullName: "יעל חן",
role: "אומנות הציפורניים סטודיו ואקדמיה",

// שדה ייעודי לכותרת האתר
pageTitle: " יעל חן | כרטיס ביקור",

  phone: "054-8787-702",
  email: "yaelartgallery@gmail.com",
  phoneDigits: "548787702",
  vcardLink: "./contact.vcf",
  company: "Cardly",
  cardUrl: "https://www.clix-marketing.co.il/cards/yaelNails/yael.html#",
  vcard: { filename: "contact.vcf" },
  wazeLink: "https://waze.com/ul/hsv8wxcjtf",
  instagramLink: "https://www.instagram.com/yael_artgallery?igsh=MTJuNzh4NTQ5aDV4YQ%3D%3D&utm_source=qr",

  logoSrc: "/assets/media/test/logo-ortopok.png",
  profileImage: "/assets/media/test/profile.jpg",
  videoSrc: "/assets/media/test/mov_bbb.mp4",
 facebookLink: "https://www.facebook.com/share/178LGRDcLN/?mibextid=wwXIfr",

 
features: {
  

    secondaryField: {
      key: "city",
      label: "עיר",              // כאן אתה קובע איזה טקסט יוצג (label + בהודעה)
      type: "text",
      placeholder: "הכנס עיר",
      inputMode: "text",
      required: true
    },
  video: true,
  about: true,
  recommendations: true,

  contactWhatsApp: true, 
  facebookLink: true,
  waze: true,
  phone: true,
  instagram: true,
  mail : true,

  sendEmail: false,
  sendWhatsApp: true,
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
<p data-field="aboutLine1"><strong>שמי יעל חן רז</strong></p>
<p data-field="aboutLine2"><strong>מייסדת האקדמיה ללימודי ציפורניים</strong></p>

<p>התחלתי את הדרך מבולבלת וחסרת ביטחון, ומתוך החוויה האישית שלי נולדה האקדמיה – מקום שבו כל אחת יכולה לגדול, להתמקצע וליהנות מהמקצוע שלה בכל יום מחדש.</p>
<p>האקדמיה פועלת מתוך ההבנה שאין שתי תלמידות זהות. לכן יצרתי תוכנית לימודים מותאמת אישית – לפי הרמה, הקצב והצרכים שלך.</p>

<p class="align-right">• קורס מתחילות – כניסה לעולם הציפורניים מהצעד הראשון, בליווי אישי עד ביטחון מלא בעבודה</p>
<p class="align-right">• השתלמויות מקצועיות – ריענון ידע, טכניקות חדשות, הרחבת סל השירותים ברמה בינלאומית</p>
<p class="align-right">• ליווי צמוד ומסלול אישי – מותאם אישית לרמה ולקצב שלך</p>
`
,

accordionTitle1: "▼ למה פתחתי את האקדמיה?",
accordionText1: `
  <p>רציתי לאפשר למקצועיות בתחום ליהנות מהמקצוע שלהן באמת – שכל יום יהיה מיוחד, צבעוני ומלא ביטחון, ידע והנאה.</p>
`,

accordionTitle2: "▼ לאן אני שואפת?",
accordionText2: `
  <p>המטרה שלי היא ליצור מקום שבו כל תלמידה תרגיש ביטחון מלא בעבודתה מול הלקוחות.</p>
  <p>דרך הליווי הצמוד וההכשרה המקצועית – כל אחת יכולה לפרוץ גבולות, להתמקצע ולהגשים את החלום שלה בעולם הציפורניים.</p>
`,


scrollToContactText: "השאירי פרטים ונחזור אלייך",
recommendationsMainTitle: "מה הבוגרות מספרות",
videoMainTitle: "קצת עלי",
contactFormTitle: "השאירי פרטים<br>ואחזור אלייך בהקדם",
shareCardTitle: "שיתוף הכרטיס",

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
Object.freeze(window.cardData);


console.log("📦 data-client.js loaded OK");
