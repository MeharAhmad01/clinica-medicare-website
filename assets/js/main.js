/* =====================================================
   CLINICA MEDICARE®
   2-MINUTE HAIR ASSESSMENT
   COMPLETE UPDATED FRONTEND LOGIC
===================================================== */


/* =====================================================
   SUPABASE
===================================================== */

const SUPABASE_URL =
    "https://stejywpaxavvmjkzndwh.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_KxxqH7WDzoB6aI4MuBcUpA_XAWnVr0K";

const SCALP_BUCKET =
    "patient-scalp-photos";


const WHATSAPP_NUMBER =
    "917049271066";

let supabaseClient = null;


/* =====================================================
   STATE
===================================================== */

const state = {
    language: "en",

    gender: null,

    hairFallDuration: null,

    selectedStage: null,

    questionIndex: 0,

    answers: [],

    recentAnswers: [],

    scalpPhoto: null,

    uploadedPhotoPath: null,

    lastSubmissionId: null,

    isSaving: false
};


/* =====================================================
   TRANSLATIONS
===================================================== */

const translations = {

    en: {

        startTest:
            "START 2-MINUTE HAIR TEST",

        viewPlan:
            "VIEW 7-DAY PLAN",

        benefit1Title:
            "Quick",

        benefit1Text:
            "2-minute test",

        benefit2Title:
            "Personalised",

        benefit2Text:
            "guidance",

        benefit3Title:
            "Hair care &",

        benefit3Text:
            "diet plan",

        genderQuestion:
            "Which assessment would you like to take?",

        men:
            "Men",

        menDescription:
            "Male-pattern hair loss assessment",

        women:
            "Women",

        womenDescription:
            "Female-pattern hair thinning assessment",

        durationQuestion:
            "How long have you been experiencing increased hair fall?",

        durationHelper:
            "This helps us show you the most relevant questions for your current concern.",

        less30Title:
            "Less than 30 days",

        less30Description:
            "Recent or sudden increase in hair fall",

        more30Title:
            "More than 30 days",

        more30Description:
            "Ongoing hair fall or gradual thinning",

        stageQuestion:
            "Which stage most closely matches your current hair loss?",

        photoQuestion:
            "Upload a clear photo of your scalp.",

        photoDescription:
            "Good lighting and a clear view of the hair pattern work best.",

        choosePhoto:
            "Choose Photo",

     
photoOptional:
    "Please upload a clear scalp photo to continue.",

        continue:
            "Continue →",

        nextQuestion:
            "Next →",

        back:
            "Back",

        leadTitle:
            "Your hair assessment is ready.",

        leadDescription:
            "Enter your details to view your personalized hair assessment and get the right next step from Clinica Medicare.",

        fullNameLabel:
            "Full Name",

        fullNamePlaceholder:
            "Enter your full name",

        whatsappLabel:
            "WhatsApp Number",

        ageLabel:
            "Age Group",

        cityLabel:
            "City",

        cityPlaceholder:
            "Enter your city",

        consent:
            "I agree to be contacted by Clinica Medicare regarding my hair assessment and consultation.",

        viewAssessment:
            "View My Hair Assessment →",

        assessment:
            "YOUR ASSESSMENT",

        disclaimer:
            "This online assessment is for guidance and does not replace a clinical diagnosis.",

        invalidPhone:
            "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.",

        validPhone:
            "Valid mobile number",

        selectAnswer:
            "Please select an answer.",

        invalidPhoto:
            "Please select a valid image file.",

        photoTooLarge:
            "Please choose an image under 10MB.",

        selectStage:
            "Please select a stage first.",

        saving:
            "Preparing your assessment...",

        saveError:
            "We couldn't save your assessment right now. Please try again.",

        nameRequired:
            "Please enter your full name.",

        ageRequired:
            "Please select your age group.",

        cityRequired:
            "Please enter your city.",

        consentRequired:
            "Please accept the contact consent.",

        earlyResultTitle:
            "Early Stage / Less Than 30 Days",

        earlyResultText:
            "Your hair-fall concern appears to be in an early stage. There is no need to panic. Start with the recommended 3–4 week Hair Care & Diet Plan and follow it consistently for 30 days.",

        possibleFactors:
            "Possible contributing factors",

        downloadPlanLabel:
            "DOWNLOAD YOUR 30-DAY HAIR CARE PLAN",

        planTitle:
            "Get your personalised Hair Care & Diet Plan (FREE)",

        downloadPlan:
            "DOWNLOAD 30-DAY PLAN",

        consultationEyebrow:
            "WANT TO CONSULT OUR DOCTOR?",

        consultationTitle:
            "Consultation Fee: ₹150/- only",

        consultationText:
            "You don't have to wait 30 days. If you are concerned about your hair fall or want to understand your condition better, you can consult our doctor anytime.",

        bookConsultation:
            "BOOK ₹150 CONSULTATION",

        restart:
            "Take the assessment again",

        recentDiet:
            "Diet / eating pattern",

        recentStress:
            "Stress / sleep changes",

        recentIllness:
            "Recent illness / fever / infection",

        recentEnvironment:
            "Water / weather / environmental change",

        recentScalp:
            "Scalp-related concerns",

        noFactor:
            "No major contributing factor identified"
    },


    hi: {

        startTest:
            "2 मिनट का हेयर टेस्ट शुरू करें",

        viewPlan:
            "7-दिन का प्लान देखें",

        benefit1Title:
            "त्वरित",

        benefit1Text:
            "2 मिनट का टेस्ट",

        benefit2Title:
            "व्यक्तिगत",

        benefit2Text:
            "मार्गदर्शन",

        benefit3Title:
            "हेयर केयर व",

        benefit3Text:
            "डाइट प्लान",

        genderQuestion:
            "आप कौन-सा मूल्यांकन लेना चाहते हैं?",

        men:
            "पुरुष",

        menDescription:
            "पुरुष पैटर्न हेयर लॉस मूल्यांकन",

        women:
            "महिला",

        womenDescription:
            "महिला पैटर्न हेयर थिनिंग मूल्यांकन",

        durationQuestion:
            "आपके बालों का झड़ना बढ़े हुए कितने समय से हो रहा है?",

        durationHelper:
            "इससे हमें आपकी वर्तमान समस्या के अनुसार सही सवाल दिखाने में मदद मिलती है।",

        less30Title:
            "30 दिनों से कम",

        less30Description:
            "हाल ही में या अचानक बढ़ा हुआ बाल झड़ना",

        more30Title:
            "30 दिनों से अधिक",

        more30Description:
            "लगातार बाल झड़ना या धीरे-धीरे बाल पतले होना",

        stageQuestion:
            "कौन-सा स्टेज आपके वर्तमान बाल झड़ने से सबसे अधिक मेल खाता है?",

        photoQuestion:
            "अपने स्कैल्प की एक साफ तस्वीर अपलोड करें।",

       
        photoDescription:
            "अच्छी रोशनी और बालों के पैटर्न का साफ दृश्य सबसे बेहतर रहेगा।",

        choosePhoto:
            "तस्वीर चुनें",

        photoOptional:
            "आगे बढ़ने के लिए कृपया अपने स्कैल्प की साफ तस्वीर अपलोड करें।",

        continue:
            "आगे बढ़ें →",

        nextQuestion:
            "आगे बढ़ें →",


        back:
            "वापस",

        leadTitle:
            "आपका हेयर असेसमेंट तैयार है।",

        leadDescription:
            "अपना व्यक्तिगत हेयर असेसमेंट देखने और Clinica Medicare से सही अगला कदम जानने के लिए अपनी जानकारी भरें।",

        fullNameLabel:
            "पूरा नाम",

        fullNamePlaceholder:
            "अपना पूरा नाम लिखें",

        whatsappLabel:
            "WhatsApp नंबर",

        ageLabel:
            "आयु वर्ग",

        cityLabel:
            "शहर",

        cityPlaceholder:
            "अपने शहर का नाम लिखें",

        consent:
            "मैं सहमत हूँ कि Clinica Medicare मेरे हेयर असेसमेंट और परामर्श के संबंध में मुझसे संपर्क कर सकता है।",

        viewAssessment:
            "मेरा हेयर असेसमेंट देखें →",

        assessment:
            "आपका मूल्यांकन",

        disclaimer:
            "यह ऑनलाइन मूल्यांकन केवल मार्गदर्शन के लिए है और चिकित्सकीय निदान का विकल्प नहीं है।",

        invalidPhone:
            "कृपया 6, 7, 8 या 9 से शुरू होने वाला सही 10 अंकों का भारतीय मोबाइल नंबर दर्ज करें।",

        validPhone:
            "मोबाइल नंबर सही है",

        selectAnswer:
            "कृपया एक उत्तर चुनें।",

        invalidPhoto:
            "कृपया सही इमेज फाइल चुनें।",

        photoTooLarge:
            "कृपया 10MB से कम की तस्वीर चुनें।",

        selectStage:
            "कृपया पहले एक स्टेज चुनें।",

        saving:
            "आपका असेसमेंट तैयार किया जा रहा है...",

        saveError:
            "अभी आपका असेसमेंट सेव नहीं हो पाया। कृपया दोबारा कोशिश करें।",

        nameRequired:
            "कृपया अपना पूरा नाम दर्ज करें।",

        ageRequired:
            "कृपया अपना आयु वर्ग चुनें।",

        cityRequired:
            "कृपया अपना शहर दर्ज करें।",

        consentRequired:
            "कृपया संपर्क की सहमति स्वीकार करें।",

        earlyResultTitle:
            "प्रारंभिक स्टेज / 30 दिनों से कम",

        earlyResultText:
            "आपकी बाल झड़ने की समस्या शुरुआती चरण में दिखाई देती है। घबराने की आवश्यकता नहीं है। सुझाए गए 3–4 सप्ताह के Hair Care & Diet Plan को लगातार 30 दिनों तक अपनाएं।",

        possibleFactors:
            "संभावित योगदान देने वाले कारक",

        downloadPlanLabel:
            "अपना 30-दिन का हेयर केयर प्लान डाउनलोड करें",

        planTitle:
            "अपना व्यक्तिगत Hair Care & Diet Plan प्राप्त करें",

        downloadPlan:
            "30-दिन का प्लान डाउनलोड करें",

        consultationEyebrow:
            "क्या आप हमारे डॉक्टर से सलाह लेना चाहते हैं?",

        consultationTitle:
            "कंसल्टेशन फीस: केवल ₹150/-",

        consultationText:
            "आपको 30 दिन इंतजार करने की जरूरत नहीं है। यदि आप अपने बाल झड़ने को लेकर चिंतित हैं या अपनी स्थिति बेहतर समझना चाहते हैं, तो आप कभी भी डॉक्टर से सलाह ले सकते हैं।",

        bookConsultation:
            "₹150 कंसल्टेशन बुक करें",

        restart:
            "असेसमेंट दोबारा लें",

        recentDiet:
            "खान-पान में बदलाव",

        recentStress:
            "तनाव / नींद में बदलाव",

        recentIllness:
            "हाल की बीमारी / बुखार / संक्रमण",

        recentEnvironment:
            "पानी / मौसम / वातावरण में बदलाव",

        recentScalp:
            "स्कैल्प से जुड़ी समस्या",

        noFactor:
            "कोई प्रमुख योगदान कारक स्पष्ट नहीं"
    }

};


/* =====================================================
   MALE STAGES
===================================================== */

const maleStages = [

    {
        stage: 1,
        image: "assets/male_baldness_stage_1.png",

        en: {
            title: "Minimal Hair Loss",
            description:
                "Hair is mostly full with little to no thinning.",
            meaning:
                "Your selected pattern shows little to no visible thinning, with overall hair density appearing relatively well maintained.",
            recommendation:
                "Maintain a consistent hair-care routine and keep an eye on any changes in hair fall, hairline or density."
        },

        hi: {
            title: "न्यूनतम बाल झड़ना",
            description:
                "बाल लगभग पूरी तरह घने हैं और बहुत कम या कोई स्पष्ट पतलापन नहीं दिखता।",
            meaning:
                "आपके चुने गए पैटर्न में बालों का घनत्व काफी हद तक बना हुआ दिखाई देता है और स्पष्ट पतलापन बहुत कम है।",
            recommendation:
                "नियमित हेयर-केयर रूटीन बनाए रखें और बाल झड़ने, हेयरलाइन या घनत्व में किसी भी बदलाव पर ध्यान दें।"
        }
    },

    {
        stage: 2,
        image: "assets/male_baldness_stage_2.png",

        en: {
            title: "Early Hairline Recession",
            description:
                "Slight thinning at the front or mild hairline recession.",
            meaning:
                "Your selected pattern shows slight thinning around the front or mild hairline recession.",
            recommendation:
                "Because you have noticed a visible change, an early professional evaluation may help you understand your individual hair and scalp condition."
        },

        hi: {
            title: "शुरुआती हेयरलाइन रीसैशन",
            description:
                "सामने की ओर हल्का पतलापन या हल्का हेयरलाइन पीछे जाना।",
            meaning:
                "आपके चुने गए पैटर्न में सामने की ओर हल्का पतलापन या हेयरलाइन में हल्का बदलाव दिखाई देता है।",
            recommendation:
                "क्योंकि आपको दिखाई देने वाला बदलाव महसूस हुआ है, इसलिए शुरुआती विशेषज्ञ मूल्यांकन आपकी स्थिति को बेहतर समझने में मदद कर सकता है।"
        }
    },

    {
        stage: 3,
        image: "assets/male_baldness_stage_3.png",

        en: {
            title: "Noticeable Recession",
            description:
                "Clearly visible hairline recession and mild thinning on top.",
            meaning:
                "Your selected pattern shows clearly visible hairline recession along with some thinning on the top.",
            recommendation:
                "Because visible changes are present, discussing your hair and scalp concerns with a doctor is recommended."
        },

        hi: {
            title: "स्पष्ट हेयरलाइन रीसैशन",
            description:
                "हेयरलाइन में स्पष्ट बदलाव और ऊपर की ओर हल्का पतलापन।",
            meaning:
                "आपके चुने गए पैटर्न में हेयरलाइन का स्पष्ट पीछे जाना और ऊपर की ओर कुछ पतलापन दिखाई देता है।",
            recommendation:
                "क्योंकि स्पष्ट बदलाव दिखाई दे रहे हैं, इसलिए डॉक्टर से अपने बाल और स्कैल्प संबंधी चिंता पर चर्चा करना उचित रहेगा।"
        }
    },

    {
        stage: 4,
        image: "assets/male_baldness_stage_4.png",

        en: {
            title: "Advanced Recession & Crown Thinning",
            description:
                "Hairline has receded further and thinning at the crown is visible.",
            meaning:
                "Your selected pattern shows further hairline recession along with visible thinning around the crown.",
            recommendation:
                "A professional evaluation is recommended to understand the pattern of hair loss and determine the appropriate next steps."
        },

        hi: {
            title: "अधिक हेयरलाइन रीसैशन और क्राउन थिनिंग",
            description:
                "हेयरलाइन और पीछे गई है और क्राउन पर पतलापन दिखाई देता है।",
            meaning:
                "आपके चुने गए पैटर्न में हेयरलाइन में अधिक बदलाव और क्राउन के आसपास स्पष्ट पतलापन दिखाई देता है।",
            recommendation:
                "बाल झड़ने के पैटर्न को बेहतर समझने के लिए विशेषज्ञ मूल्यांकन उचित अगला कदम हो सकता है।"
        }
    },

    {
        stage: 5,
        image: "assets/male_baldness_stage_5.png",

        en: {
            title: "Significant Hair Loss",
            description:
                "Noticeable thinning on the top and crown with reduced density.",
            meaning:
                "Your selected pattern shows noticeable thinning across the top and crown, with reduced hair density.",
            recommendation:
                "As visible thinning is more pronounced, consulting a doctor can help assess your individual hair and scalp concerns."
        },

        hi: {
            title: "महत्वपूर्ण बाल झड़ना",
            description:
                "ऊपर और क्राउन पर स्पष्ट पतलापन और कम घनत्व।",
            meaning:
                "आपके चुने गए पैटर्न में ऊपर और क्राउन पर स्पष्ट पतलापन तथा कम बाल घनत्व दिखाई देता है।",
            recommendation:
                "क्योंकि पतलापन अधिक स्पष्ट है, इसलिए डॉक्टर से व्यक्तिगत बाल और स्कैल्प मूल्यांकन करवाना उपयोगी हो सकता है।"
        }
    },

    {
        stage: 6,
        image: "assets/male_baldness_stage_6.png",

        en: {
            title: "Extensive Hair Loss",
            description:
                "Severe thinning on top with limited hair remaining.",
            meaning:
                "Your selected pattern shows extensive thinning on the top with limited hair remaining in the affected area.",
            recommendation:
                "We recommend a professional consultation to assess your current hair and scalp condition and understand appropriate options."
        },

        hi: {
            title: "व्यापक बाल झड़ना",
            description:
                "ऊपर की ओर अधिक पतलापन और सीमित बाल शेष रहना।",
            meaning:
                "आपके चुने गए पैटर्न में ऊपर की ओर व्यापक पतलापन और प्रभावित हिस्से में सीमित बाल दिखाई देते हैं।",
            recommendation:
                "वर्तमान बाल और स्कैल्प की स्थिति को समझने के लिए विशेषज्ञ से परामर्श लेना उचित रहेगा।"
        }
    },

    {
        stage: 7,
        image: "assets/male_baldness_stage_7.png",

        en: {
            title: "Advanced Hair Loss",
            description:
                "Most of the top is bald with hair remaining mainly on the sides.",
            meaning:
                "Your selected pattern shows advanced hair loss, with most of the top appearing bald and hair remaining mainly around the sides.",
            recommendation:
                "A professional consultation is strongly recommended so your current condition can be assessed individually and appropriate next steps can be discussed."
        },

        hi: {
            title: "अधिक उन्नत बाल झड़ना",
            description:
                "ऊपर का अधिकांश हिस्सा बाल रहित दिखाई देता है और मुख्यतः किनारों पर बाल रहते हैं।",
            meaning:
                "आपके चुने गए पैटर्न में ऊपर का अधिकांश हिस्सा बाल रहित दिखाई देता है और मुख्यतः किनारों पर बाल दिखाई देते हैं।",
            recommendation:
                "वर्तमान स्थिति का व्यक्तिगत मूल्यांकन करने और उचित अगले कदम समझने के लिए विशेषज्ञ से परामर्श की सलाह दी जाती है।"
        }
    }

];


/* =====================================================
   FEMALE STAGES
===================================================== */

const femaleStages = [

    {
        stage: 1,
        image: "assets/female_hair_fall_stage_1.png",

        en: {
            title: "Mild Thinning",
            description:
                "Hair density is largely maintained, with little to no noticeable widening of the central hair part.",
            meaning:
                "Your selected pattern shows relatively maintained hair density with little visible widening of the central part.",
            recommendation:
                "Maintain a consistent hair-care routine and monitor any changes in density or hair fall."
        },

        hi: {
            title: "हल्का बाल पतलापन",
            description:
                "बालों का घनत्व काफी हद तक बना रहता है और बीच की मांग में बहुत कम या कोई स्पष्ट चौड़ापन नहीं दिखाई देता।",
            meaning:
                "आपके चुने गए पैटर्न में बालों का घनत्व काफी हद तक बना हुआ दिखाई देता है।",
            recommendation:
                "नियमित हेयर-केयर रूटीन बनाए रखें और घनत्व या बाल झड़ने में होने वाले बदलावों पर ध्यान दें।"
        }
    },

    {
        stage: 2,
        image: "assets/female_hair_fall_stage_2.png",

        en: {
            title: "Moderate Thinning",
            description:
                "The central hair part becomes noticeably wider, with reduced hair density and increased scalp visibility.",
            meaning:
                "Your selected pattern shows a more noticeable widening of the central part with some reduction in density.",
            recommendation:
                "An early professional evaluation can help you better understand your hair and scalp condition."
        },

        hi: {
            title: "मध्यम बाल पतलापन",
            description:
                "बीच की मांग स्पष्ट रूप से चौड़ी दिखाई देने लगती है और बालों का घनत्व कम होता है।",
            meaning:
                "आपके चुने गए पैटर्न में बीच की मांग अधिक स्पष्ट रूप से चौड़ी दिखाई देती है।",
            recommendation:
                "विशेषज्ञ मूल्यांकन आपकी वर्तमान बाल और स्कैल्प स्थिति को बेहतर समझने में मदद कर सकता है।"
        }
    },

    {
        stage: 3,
        image: "assets/female_hair_fall_stage_3.png",

        en: {
            title: "Advanced Thinning",
            description:
                "Thinning becomes more extensive across the crown and top of the scalp, with increased scalp visibility.",
            meaning:
                "Your selected pattern shows more extensive thinning across the top and crown.",
            recommendation:
                "A professional consultation is recommended to understand your individual hair and scalp concerns."
        },

        hi: {
            title: "अधिक बाल पतलापन",
            description:
                "सिर के ऊपरी और क्राउन हिस्से में बालों का पतलापन अधिक फैल जाता है।",
            meaning:
                "आपके चुने गए पैटर्न में ऊपर और क्राउन पर अधिक व्यापक पतलापन दिखाई देता है।",
            recommendation:
                "आपकी व्यक्तिगत स्थिति को समझने के लिए विशेषज्ञ से परामर्श लेना उचित रहेगा।"
        }
    },

    {
        stage: 4,
        image: "assets/female_hair_fall_stage_4.png",

        en: {
            title: "Advanced Diffuse Thinning",
            description:
                "Hair density is significantly reduced across the top and crown, with substantial scalp visibility.",
            meaning:
                "Your selected pattern shows significant reduction in hair density across the top and crown.",
            recommendation:
                "A professional consultation is strongly recommended for an individual assessment of your hair and scalp condition."
        },

        hi: {
            title: "अधिक व्यापक बाल पतलापन",
            description:
                "ऊपर और क्राउन पर बालों का घनत्व काफी कम हो जाता है और स्कैल्प अधिक दिखाई देता है।",
            meaning:
                "आपके चुने गए पैटर्न में ऊपर और क्राउन पर बालों का घनत्व काफी कम दिखाई देता है।",
            recommendation:
                "व्यक्तिगत बाल और स्कैल्प मूल्यांकन के लिए विशेषज्ञ से परामर्श लेना उचित रहेगा।"
        }
    }

];

/* =====================================================
   HAIR ASSESSMENT QUESTIONS — MEN (7 QUESTIONS)
===================================================== */

const menQuestions = [
    // Q1 — Duration of Hair Fall
    {
        en: {
            question: "Since how long have you been experiencing hair fall?",
            options: [
                "1–3 months",
                "3–6 months",
                "6–12 months",
                "More than 1 year"
            ]
        },
        hi: {
            question: "आपको बाल झड़ने की समस्या कितने समय से है?",
            options: [
                "1–3 महीने",
                "3–6 महीने",
                "6–12 महीने",
                "1 साल से अधिक"
            ]
        }
    },

    // Q2 — When Hair Fall Occurs
    {
        en: {
            question: "When do you notice your hair fall the most?",
            options: [
                "During shower or hair washing",
                "While combing or brushing",
                "On my pillow, bed, or clothes",
                "Throughout the day, in multiple situations"
            ]
        },
        hi: {
            question: "आपको बाल सबसे अधिक कब झड़ते हुए दिखाई देते हैं?",
            options: [
                "नहाते या बाल धोते समय",
                "कंघी या ब्रश करते समय",
                "तकिए, बिस्तर या कपड़ों पर",
                "दिनभर, कई अलग-अलग स्थितियों में"
            ]
        }
    },

    // Q3 — Hair Thickness and Density
    {
        en: {
            question: "Have you noticed any changes in your hair thickness or density?",
            options: [
                "No visible change, only increased hair fall",
                "Hair looks thinner overall",
                "Hairline is receding or forehead looks broader",
                "Crown/top of the head is becoming visible, or bald patches have appeared"
            ]
        },
        hi: {
            question: "क्या आपने बालों की मोटाई या घनत्व में कोई बदलाव देखा है?",
            options: [
                "कोई स्पष्ट बदलाव नहीं, केवल बाल अधिक झड़ रहे हैं",
                "कुल मिलाकर बाल पतले दिखाई देते हैं",
                "हेयरलाइन पीछे जा रही है या माथा चौड़ा दिख रहा है",
                "सिर का ऊपरी हिस्सा दिखाई देने लगा है या गंजे पैच बन गए हैं"
            ]
        }
    },

    // Q4 — Family History
    {
        en: {
            question: "Is there a family history of hair loss?",
            options: [
                "No known family history",
                "Father's or mother's side has hair loss",
                "Both sides of the family have hair loss",
                "Not sure"
            ]
        },
        hi: {
            question: "क्या आपके परिवार में बाल झड़ने का इतिहास है?",
            options: [
                "परिवार में ऐसा कोई ज्ञात इतिहास नहीं",
                "पिता या माता की ओर के परिवार में बाल झड़ने की समस्या है",
                "परिवार की दोनों ओर बाल झड़ने की समस्या है",
                "पता नहीं"
            ]
        }
    },

    // Q5 — Previous Treatment
    {
        en: {
            question: "Have you taken any treatment for hair fall?",
            options: [
                "Medical treatment (medicines, prescribed lotions, or supplements)",
                "Cosmetic treatment (salon therapies or hair treatments)",
                "Both medical and cosmetic treatments",
                "No treatment so far"
            ]
        },
        hi: {
            question: "क्या आपने बाल झड़ने के लिए कोई उपचार लिया है?",
            options: [
                "चिकित्सकीय उपचार (दवाइयाँ, डॉक्टर द्वारा बताई गई लोशन या सप्लीमेंट्स)",
                "कॉस्मेटिक उपचार (सैलून थेरेपी या हेयर ट्रीटमेंट)",
                "चिकित्सकीय और कॉस्मेटिक दोनों उपचार",
                "अभी तक कोई उपचार नहीं लिया"
            ]
        }
    },

    // Q6 — Scalp Problems
    {
        en: {
            question: "Do you experience any scalp problems?",
            options: [
                "Dandruff or white flakes",
                "Itching, redness, or irritation",
                "Oily scalp or excessive sweating",
                "No noticeable scalp problems"
            ]
        },
        hi: {
            question: "क्या आपको सिर की त्वचा (स्कैल्प) से जुड़ी कोई समस्या है?",
            options: [
                "डैंड्रफ या सफेद पपड़ी",
                "खुजली, लालिमा या जलन",
                "तैलीय स्कैल्प या अत्यधिक पसीना",
                "स्कैल्प से जुड़ी कोई स्पष्ट समस्या नहीं"
            ]
        }
    },

    // Q7 — Main Hair Concern
    {
        en: {
            question: "What is your main hair concern right now?",
            options: [
                "Excessive hair shedding",
                "Receding hairline",
                "Thinning at the crown or reduced hair volume",
                "Bald patches or sudden, uneven hair loss"
            ]
        },
        hi: {
            question: "इस समय बालों से जुड़ी आपकी मुख्य चिंता क्या है?",
            options: [
                "बहुत अधिक बाल झड़ना",
                "हेयरलाइन का पीछे जाना",
                "क्राउन पर बाल पतले होना या बालों का घनत्व कम होना",
                "गंजे पैच या अचानक असमान रूप से बाल झड़ना"
            ]
        }
    }
];


/* =====================================================
   HAIR ASSESSMENT QUESTIONS — WOMEN (7 QUESTIONS)
===================================================== */

const womenQuestions = [
    // Q1 — Duration of Hair Fall
    {
        en: {
            question: "Since how long have you been experiencing hair fall?",
            options: [
                "1–3 months",
                "3–6 months",
                "6–12 months",
                "More than 1 year"
            ]
        },
        hi: {
            question: "आपको बाल झड़ने की समस्या कितने समय से है?",
            options: [
                "1–3 महीने",
                "3–6 महीने",
                "6–12 महीने",
                "1 साल से अधिक"
            ]
        }
    },

    // Q2 — When Hair Fall Occurs
    {
        en: {
            question: "When do you notice your hair fall the most?",
            options: [
                "During shower or hair washing",
                "While combing or brushing",
                "On my pillow, bed, or clothes",
                "Throughout the day, in multiple situations"
            ]
        },
        hi: {
            question: "आपको बाल सबसे अधिक कब झड़ते हुए दिखाई देते हैं?",
            options: [
                "नहाते या बाल धोते समय",
                "कंघी या ब्रश करते समय",
                "तकिए, बिस्तर या कपड़ों पर",
                "दिनभर, कई अलग-अलग स्थितियों में"
            ]
        }
    },

    // Q3 — Hair Thickness and Density
    {
        en: {
            question: "Have you noticed any changes in your hair thickness or density?",
            options: [
                "No visible change, only increased hair fall",
                "Hair looks thinner overall",
                "Hair parting is widening",
                "Crown/top of the head is becoming visible, or bald patches have appeared"
            ]
        },
        hi: {
            question: "क्या आपने बालों की मोटाई या घनत्व में कोई बदलाव देखा है?",
            options: [
                "कोई स्पष्ट बदलाव नहीं, केवल बाल अधिक झड़ रहे हैं",
                "कुल मिलाकर बाल पतले दिखाई देते हैं",
                "बालों की बीच की मांग चौड़ी हो रही है",
                "सिर का ऊपरी हिस्सा दिखाई देने लगा है या गंजे पैच बन गए हैं"
            ]
        }
    },

    // Q4 — Health Events or Possible Triggers (Women)
    {
        en: {
            question: "Did your hair fall start or increase after an illness or major health event?",
            options: [
                "Fever or illness, such as typhoid, malaria, dengue, or COVID-19",
                "Surgery, hospitalisation, or another major health event",
                "Major stress, rapid weight loss, or childbirth (if applicable)",
                "No known trigger / not sure"
            ]
        },
        hi: {
            question: "क्या किसी बीमारी या बड़ी स्वास्थ्य संबंधी घटना के बाद आपके बाल झड़ना शुरू हुए या बढ़ गए?",
            options: [
                "बुखार या बीमारी, जैसे टाइफाइड, मलेरिया, डेंगू या COVID-19",
                "सर्जरी, अस्पताल में भर्ती होना या कोई अन्य बड़ी स्वास्थ्य संबंधी घटना",
                "अधिक तनाव, तेजी से वजन कम होना या प्रसव (यदि लागू हो)",
                "कोई ज्ञात कारण नहीं / निश्चित नहीं"
            ]
        }
    },

    // Q5 — Hormonal and Menstrual Changes (Women Only)
    {
        en: {
            question: "Have you noticed any hormonal or menstrual changes along with your hair fall?",
            options: [
                "Irregular periods or other menstrual changes",
                "Acne or other skin changes",
                "Recent hormonal changes, such as after pregnancy",
                "None of these / not applicable"
            ]
        },
        hi: {
            question: "बाल झड़ने के साथ क्या आपने हार्मोन या मासिक धर्म से जुड़े बदलाव महसूस किए हैं?",
            options: [
                "अनियमित पीरियड्स या मासिक धर्म में अन्य बदलाव",
                "मुंहासे या त्वचा में अन्य बदलाव",
                "हाल ही में हार्मोनल बदलाव, जैसे गर्भावस्था के बाद",
                "इनमें से कोई नहीं / लागू नहीं"
            ]
        }
    },

    // Q6 — Previous Treatment
    {
        en: {
            question: "Have you taken any treatment for hair fall?",
            options: [
                "Medical treatment (medicines, prescribed lotions, or supplements)",
                "Cosmetic treatment (salon therapies or hair treatments)",
                "Both medical and cosmetic treatments",
                "No treatment so far"
            ]
        },
        hi: {
            question: "क्या आपने बाल झड़ने के लिए कोई उपचार लिया है?",
            options: [
                "चिकित्सकीय उपचार (दवाइयाँ, डॉक्टर द्वारा बताई गई लोशन या सप्लीमेंट्स)",
                "कॉस्मेटिक उपचार (सैलून थेरेपी या हेयर ट्रीटमेंट)",
                "चिकित्सकीय और कॉस्मेटिक दोनों उपचार",
                "अभी तक कोई उपचार नहीं लिया"
            ]
        }
    },

    // Q7 — Main Hair Concern (Women Only)
    {
        en: {
            question: "What is your main hair concern right now?",
            options: [
                "Excessive hair shedding",
                "Widening hair parting",
                "Overall thinning or reduced hair volume",
                "Bald patches or sudden, uneven hair loss"
            ]
        },
        hi: {
            question: "इस समय बालों से जुड़ी आपकी मुख्य चिंता क्या है?",
            options: [
                "बहुत अधिक बाल झड़ना",
                "बालों की बीच की मांग का चौड़ा होना",
                "पूरे सिर में बाल पतले होना या बालों का घनत्व कम होना",
                "गंजे पैच या अचानक असमान रूप से बाल झड़ना"
            ]
        }
    }
];






























/* =====================================================
   RECENT HAIR FALL — LESS THAN 30 DAYS
===================================================== */

/* =====================================================
   RECENT HAIR FALL — LESS THAN 30 DAYS
===================================================== */

const recentHairFallQuestions = [
    {
        key: "illness",
        en: {
            question: "Are you currently suffering from any medical conditions or health problems?",
            options: [
                "Malaria",
                "Typhoid",
                "Jaundice",
                "Chickenpox",
                "Nothing",
                "Other"
            ]
        },
        hi: {
            question: "क्या आप वर्तमान में किसी बीमारी या स्वास्थ्य समस्या से पीड़ित हैं?",
            options: [
                "मलेरिया",
                "टाइफाइड",
                "पीलिया",
                "चिकनपॉक्स",
                "कोई बीमारी नहीं",
                "अन्य"
            ]
        }
    },
    {
        key: "environment",
        en: {
            question: "In the last 30 days, have you experienced any of these?",
            options: [
                "Change of water",
                "Change of weather/environment",
                "Weight-loss dieting / reduced food intake",
                "Poor or irregular diet",
                "None of these"
            ]
        },
        hi: {
            question: "पिछले 30 दिनों में क्या आपने इनमें से कोई बदलाव अनुभव किया है?",
            options: [
                "पानी में बदलाव",
                "मौसम या वातावरण में बदलाव",
                "वजन घटाने वाली डाइट / कम खाना",
                "खराब या अनियमित खान-पान",
                "इनमें से कोई नहीं"
            ]
        }
    },
    {
        key: "cosmetic",
        en: {
            question: "Have you undergone any cosmetic hair treatment?",
            options: [
                "Hair straightening",
                "Hair spa",
                "Hair colour",
                "Hair product",
                "Nothing"
            ]
        },
        hi: {
            question: "क्या आपने बालों के लिए कोई कॉस्मेटिक ट्रीटमेंट करवाया है?",
            options: [
                "हेयर स्ट्रेटनिंग",
                "हेयर स्पा",
                "हेयर कलर",
                "हेयर प्रोडक्ट",
                "कुछ भी नहीं"
            ]
        }
    },
    {
        key: "severity",
        en: {
            question: "How severe is your hair fall?",
            options: [
                "Slightly more than usual",
                "Noticeable while combing or washing",
                "Heavy hair shedding throughout the day",
                "Visible thinning or bald patches"
            ]
        },
        hi: {
            question: "आपके बाल कितनी गंभीरता से झड़ रहे हैं?",
            options: [
                "सामान्य से थोड़ा अधिक",
                "कंघी करते या बाल धोते समय स्पष्ट रूप से झड़ना",
                "पूरे दिन बहुत अधिक बाल झड़ना",
                "बाल पतले होना या गंजे पैच दिखाई देना"
            ]
        }
    }
];



/* =====================================================
   HELPERS
===================================================== */

function $(id) {
    return document.getElementById(id);
}


function translate(key) {
    return (
        translations[state.language]?.[key] ??
        translations.en?.[key] ??
        key
    );
}


function getLocalized(data) {
    return (
        data?.[state.language] ??
        data?.en ??
        {}
    );
}


function getCurrentStages() {
    return state.gender === "women"
        ? femaleStages
        : maleStages;
}


function getCurrentQuestions() {

    if (
        state.hairFallDuration ===
        "less30"
    ) {
        return recentHairFallQuestions;
    }

    return state.gender === "women"
        ? womenQuestions
        : menQuestions;
}


function normalizeDuration(value) {

    if (
        value === "less30" ||
        value === "less-30" ||
        value === "less_than_30_days"
    ) {
        return "less30";
    }

    if (
        value === "more30" ||
        value === "more-30" ||
        value === "more_than_30_days"
    ) {
        return "more30";
    }

    return null;
}


function showToast(message) {

    const toast = $("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(
        showToast.timer
    );

    showToast.timer =
        setTimeout(
            () => {
                toast.classList.remove("show");
            },
            2800
        );
}


/* =====================================================
   MODAL
===================================================== */

function openHairTestModal() {

    const modal =
        $("hairTestModal");

    resetAssessmentState();

    if (!modal) {
        showStep(0);
        return;
    }

    modal.classList.add(
        "active"
    );

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

    showStep(0);

}
function closeHairTestModal() {
    const modal = $("hairTestModal");

    if (!modal) return;

    // Move focus outside the modal before hiding it
    const closeButton = document.activeElement;

    if (modal.contains(closeButton)) {
        closeButton.blur();
    }

    modal.classList.remove("active");

    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");
}


/* =====================================================
   STATIC BUTTON LABELS
===================================================== */

function updateStaticButtonLabels() {

    const next =
        $("questionNextBtn") ||
        $("nextQuestionBtn") ||
        document.querySelector(
            "[data-question-next]"
        );

    if (next) {
        next.textContent =
            translate("nextQuestion");
    }


    const back =
        $("questionBackBtn") ||
        document.querySelector(
            "[data-question-back]"
        );

    if (back) {
        back.textContent =
            translate("back");
    }


    const stageNext =
        $("stageContinueBtn") ||
        $("stageNextBtn") ||
        document.querySelector(
            "[data-stage-next]"
        );

    if (stageNext) {
    stageNext.style.display = "none";
    stageNext.disabled = true;
    stageNext.setAttribute("aria-hidden", "true");
}


    const photoNext =
        $("photoContinue") ||
        $("photoNextBtn") ||
        document.querySelector(
            "[data-photo-next]"
        );

    if (photoNext) {
        photoNext.textContent =
            translate("continue");
    }
if (photoNext) {
    photoNext.style.display = "none";
}
}


/* =====================================================
   AGE
===================================================== */


/* =====================================================
   SUPABASE INITIALIZE
===================================================== */

function initializeSupabase() {

    if (supabaseClient) {
        return true;
    }


    if (
        !window.supabase ||
        !window.supabase.createClient
    ) {

        console.error(
            "Supabase library was not loaded."
        );

        return false;
    }


    supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY
        );


    return true;
}


/* =====================================================
   FLOW
===================================================== */

function getFlowSteps() {

    if (
        state.hairFallDuration ===
        "less30"
    ) {

        return [
            0,
            1,
            4,
            5,
            6
        ];

    }


    if (
        state.hairFallDuration ===
        "more30"
    ) {

        return [
            0,
            1,
            2,
            3,
            4,
            5,
            6
        ];

    }


    return [
        0,
        1,
        2,
        3,
        4,
        5,
        6
    ];

}


/* =====================================================
   PROGRESS
===================================================== */

function updateProgress(stepNumber) {

    const flow =
        getFlowSteps();

    const index =
        flow.indexOf(
            stepNumber
        );

    const total =
        flow.length;

    const current =
        index >= 0
            ? index + 1
            : 1;

    const percent =
        Math.round(
            (current / total) *
            100
        );


    if ($("progressLabel")) {

        $("progressLabel")
            .textContent =
            state.language === "hi"
                ? `चरण ${current} / ${total}`
                : `STEP ${current} OF ${total}`;

    }


    if ($("progressPercent")) {

        $("progressPercent")
            .textContent =
            `${percent}%`;

    }


    if ($("progressBar")) {

        $("progressBar")
            .style.width =
            `${percent}%`;

    }

}


/* =====================================================
   SHOW STEP
===================================================== */

function showStep(stepNumber) {

    document
        .querySelectorAll(
            ".test-step"
        )
        .forEach(step => {

            step.classList.toggle(
                "active",
                Number(
                    step.dataset.step
                ) ===
                Number(stepNumber)
            );

        });


    updateProgress(
        stepNumber
    );


    const modalBody =
        document.querySelector(
            ".hair-test-modal-body"
        );


    if (modalBody) {

        modalBody.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    if (
        stepNumber === 4
    ) {

        renderQuestion();

    }


    if (
        stepNumber === 6
    ) {

        renderResult();

    }

}


/* =====================================================
   GENDER
===================================================== */

function selectGender(
    gender
) {

    state.gender =
        gender;

    state.hairFallDuration =
        null;

    state.selectedStage =
        null;

    state.questionIndex =
        0;

    state.answers =
        [];

    state.recentAnswers =
        [];


    document
        .querySelectorAll(
            ".gender-card"
        )
        .forEach(card => {

            const active =
                card.dataset.gender ===
                gender;

            card.classList.toggle(
                "selected",
                active
            );

            card.setAttribute(
                "aria-pressed",
                active
                    ? "true"
                    : "false"
            );

        });


    showStep(1);

}


/* =====================================================
   DURATION
===================================================== */

function selectDuration(
    rawDuration
) {

    const duration =
        normalizeDuration(
            rawDuration
        );

    if (!duration) return;


    state.hairFallDuration =
        duration;

    state.selectedStage =
        null;

    state.questionIndex =
        0;

    state.answers =
        [];

    state.recentAnswers =
        [];


    document
        .querySelectorAll(
            ".duration-card"
        )
        .forEach(card => {

            const cardDuration =
                normalizeDuration(
                    card.dataset.duration
                );

            const active =
                cardDuration ===
                duration;

            card.classList.toggle(
                "selected",
                active
            );

            card.setAttribute(
                "aria-pressed",
                active
                    ? "true"
                    : "false"
            );

        });


    if (
        duration ===
        "less30"
    ) {

        renderQuestion();

        showStep(4);

        return;

    }


    renderStages();

    showStep(2);

}


/* =====================================================
   STAGES
===================================================== */

function renderStages() {

    const grid =
        $("stageGrid");

    if (!grid) return;


    grid.innerHTML = "";


    getCurrentStages()
        .forEach(stage => {

            const localized =
                getLocalized(
                    stage
                );


            const card =
                document.createElement(
                    "button"
                );


            card.type =
                "button";

            card.className =
                "stage-card";

            card.dataset.stage =
                String(
                    stage.stage
                );


            const selected =
                Number(
                    state.selectedStage
                ) ===
                Number(
                    stage.stage
                );


if (selected) {

    card.classList.add(
        "selected"
    );

    // Automatically move to photo upload
    setTimeout(() => {
        showStep(3);
    }, 200);

}

card.setAttribute(
    "aria-pressed",
    selected
        ? "true"
        : "false"
);




            card.innerHTML = `

                <div class="stage-image-wrap">

                    <img
                        class="stage-image"
                        src="${stage.image}"
                        alt="Stage ${stage.stage}"
                        loading="lazy"
                    >

                    <span class="stage-selected-check">
                        ✓
                    </span>

                </div>

                <div class="stage-card-body">

                    <span class="stage-label">
                        Stage ${stage.stage}
                    </span>

                    <h3>
                        ${localized.title}
                    </h3>

                    <p>
                        ${localized.description}
                    </p>

                </div>

            `;


            card.addEventListener(
                "click",
                () => {

                    state.selectedStage =
                        stage.stage;


                    grid
                        .querySelectorAll(
                            ".stage-card"
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "selected"
                            );

                            item.setAttribute(
                                "aria-pressed",
                                "false"
                            );

                        });


                    card.classList.add(
                        "selected"
                    );


                    card.setAttribute(
                        "aria-pressed",
                        "true"
                    );

if (state.hairFallDuration === "more30") {
    setTimeout(() => {
        showStep(3);
    }, 200);
}

                }
            );


            grid.appendChild(
                card
            );

        });

}


/* =====================================================
   STAGE NEXT
===================================================== */

function bindStageNext() {

    const button =
        $("stageContinueBtn") ||
        $("stageNextBtn") ||
        document.querySelector(
            "[data-stage-next]"
        );


    if (!button) return;


    button.addEventListener(
        "click",
        event => {

            event.preventDefault();


            if (
                !state.selectedStage
            ) {

                showToast(
                    translate(
                        "selectStage"
                    )
                );

                return;

            }


            showStep(3);

        }
    );

}


/* =====================================================
   PHOTO
   OPTIONAL
===================================================== */

function resetPhotoUI() {

    const input =
        $("scalpPhoto");

    const preview =
        $("photoPreview");

    const wrap =
        $("photoPreviewWrap");

    const label =
        document.querySelector(
            ".photo-upload-label"
        );


    state.scalpPhoto =
        null;


    if (input) {
        input.value = "";
    }


    if (preview) {

        if (
            preview.dataset.objectUrl
        ) {

            URL.revokeObjectURL(
                preview.dataset.objectUrl
            );

            delete preview.dataset.objectUrl;

        }

        preview.removeAttribute(
            "src"
        );

    }


    if (wrap) {
        wrap.hidden = true;
    }


    if (label) {
        label.style.display = "";
    }

}
function bindPhoto() {
    const photoInput = $("scalpPhoto");

    // Scalp photo upload and validation
    photoInput?.addEventListener("change", event => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        // Only allow image files
        if (!file.type.startsWith("image/")) {
            event.target.value = "";
            state.scalpPhoto = null;
            showToast(translate("invalidPhoto"));
            return;
        }

        // Maximum file size: 10 MB
        if (file.size > 10 * 1024 * 1024) {
            event.target.value = "";
            state.scalpPhoto = null;
            showToast(translate("photoTooLarge"));
            return;
        }

        // Save selected photo
        state.scalpPhoto = file;

        // Display photo preview
        const preview = $("photoPreview");
        const wrap = $("photoPreviewWrap");
        const label = document.querySelector(".photo-upload-label");

        if (preview && wrap) {
            if (preview.dataset.objectUrl) {
                URL.revokeObjectURL(preview.dataset.objectUrl);
            }

            const objectUrl = URL.createObjectURL(file);

            preview.src = objectUrl;
            preview.dataset.objectUrl = objectUrl;
            wrap.hidden = false;

            if (label) {
                label.style.display = "none";
            }
        }

        // Reset questions before starting
        state.questionIndex = 0;
        state.answers = [];

        if (Array.isArray(state.recentAnswers)) {
            state.recentAnswers = [];
        }

        // Automatically open Question 1 after photo upload
        renderQuestion();

        setTimeout(() => {
            showStep(4);
        }, 250);
    });

    // Change photo button
    $("changePhotoBtn")?.addEventListener("click", event => {
        event.preventDefault();

        resetPhotoUI();
    });

    // Photo Continue button, if present
    const photoNext =
        $("photoContinue") ||
        $("photoNextBtn") ||
        document.querySelector("[data-photo-next]");

    photoNext?.addEventListener("click", event => {
        event.preventDefault();

        // Photo is compulsory
        if (!state.scalpPhoto) {
            showToast("Please upload your scalp photo first.");
            return;
        }

        // Continue only if a valid photo exists
        state.questionIndex = 0;
        state.answers = [];

        if (Array.isArray(state.recentAnswers)) {
            state.recentAnswers = [];
        }

        renderQuestion();
        showStep(4);
    });
}





/* =====================================================
   QUESTIONS
===================================================== */

function renderQuestion() {

    const questions =
        getCurrentQuestions();


    const current =
        questions[
            state.questionIndex
        ];


    if (!current) return;


    const localized =
        getLocalized(
            current
        );


    if ($("questionText")) {

        $("questionText")
            .textContent =
            localized.question;

    }


    if ($("questionCounter")) {

        $("questionCounter")
            .textContent =
            state.language === "hi"
                ? `सवाल ${state.questionIndex + 1} / ${questions.length}`
                : `QUESTION ${state.questionIndex + 1} OF ${questions.length}`;

    }


    const answerGrid =
        $("answerGrid");


    if (!answerGrid) return;


    answerGrid.innerHTML =
        "";


    localized.options
        .forEach(
            (
                option,
                index
            ) => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";

                button.className =
                    "answer-btn";

                button.textContent =
                    option;


                const previousAnswer =
                    state.answers[
                        state.questionIndex
                    ];


                const selected =
                    previousAnswer &&
                    previousAnswer.index ===
                    index;


                if (selected) {

                    button.classList.add(
                        "selected"
                    );

                }


                button.setAttribute(
                    "aria-pressed",
                    selected
                        ? "true"
                        : "false"
                );


                button.addEventListener(
                    "click",
                    () => {

                        state.answers[
                            state.questionIndex
                        ] = {

                            index,

                            value:
                                option,

                            question:
                                localized.question,

                            key:
                                current.key ||
                                null

                        };


                        answerGrid
                            .querySelectorAll(
                                ".answer-btn"
                            )
                            .forEach(
                                item => {

                                    item.classList.remove(
                                        "selected"
                                    );

                                    item.setAttribute(
                                        "aria-pressed",
                                        "false"
                                    );

                                }
                            );


                        button.classList.add(
                            "selected"
                        );


                        button.setAttribute(
                            "aria-pressed",
                            "true"
                        );

setTimeout(() => {
    moveToNextQuestion();
}, 180);
                    }
                );


                answerGrid.appendChild(
                    button
                );

            }
        );


    updateQuestionButtons();

}


/* =====================================================
   QUESTION BUTTONS
===================================================== */

function updateQuestionButtons() {

    const questions =
        getCurrentQuestions();


    const answer =
        state.answers[
            state.questionIndex
        ];


    const next =
        $("questionNextBtn") ||
        $("nextQuestionBtn") ||
        document.querySelector(
            "[data-question-next]"
        );


    if (next) {

        next.textContent =
            state.questionIndex ===
            questions.length - 1

                ? translate(
                    "continue"
                )

                : translate(
                    "nextQuestion"
                );


        next.disabled =
            !answer;


        next.setAttribute(
            "aria-disabled",
            answer
                ? "false"
                : "true"
        );

    }


    const back =
        $("questionBackBtn") ||
        document.querySelector(
            "[data-question-back]"
        );


    if (back) {

        back.textContent =
            translate(
                "back"
            );

    }

}


/* =====================================================
   NEXT QUESTION
===================================================== */

function moveToNextQuestion() {

    const questions =
        getCurrentQuestions();


    if (
        !state.answers[
            state.questionIndex
        ]
    ) {

        showToast(
            translate(
                "selectAnswer"
            )
        );

        return;

    }


    if (
        state.questionIndex <
        questions.length - 1
    ) {

        state.questionIndex++;

        renderQuestion();

        return;

    }


    state.questionIndex =
        0;

    showStep(5);

}


/* =====================================================
   BACK QUESTION
===================================================== */

function moveToPreviousQuestion() {

    if (
        state.questionIndex >
        0
    ) {

        state.questionIndex--;

        renderQuestion();

        return;

    }


    if (
        state.hairFallDuration ===
        "less30"
    ) {

        showStep(1);

        return;

    }


    showStep(3);

}


/* =====================================================
   QUESTION NAVIGATION
===================================================== */

function bindQuestionNavigation() {

    const next =
        $("questionNextBtn") ||
        $("nextQuestionBtn") ||
        document.querySelector(
            "[data-question-next]"
        );


    next?.addEventListener(
        "click",
        event => {

            event.preventDefault();

            moveToNextQuestion();

        }
    );


    const back =
        $("questionBackBtn") ||
        document.querySelector(
            "[data-question-back]"
        );


    back?.addEventListener(
        "click",
        event => {

            event.preventDefault();

            moveToPreviousQuestion();

        }
    );

}


/* =====================================================
   BACK BUTTONS
===================================================== */

function bindBackButtons() {

    document
        .querySelectorAll(
            "[data-back-step]"
        )
        .forEach(
            button => {

                if (
                    button ===
                    $("questionBackBtn")
                ) {
                    return;
                }


                if (
                    button ===
                    $("leadBackBtn")
                ) {
                    return;
                }


                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();


                        const target =
                            Number(
                                button.dataset.backStep
                            );


                        if (
                            Number.isFinite(
                                target
                            )
                        ) {

                            showStep(
                                target
                            );

                        }

                    }
                );

            }
        );

}


/* =====================================================
   PHONE VALIDATION
===================================================== */

function sanitizePhone(
    value
) {

    return String(
        value || ""
    )
        .replace(
            /\D/g,
            ""
        )
        .slice(
            0,
            10
        );

}


function isValidIndianMobile(
    number
) {

    return /^[6-9]\d{9}$/
        .test(
            number
        );

}


function updatePhoneValidation() {

    const input =
        $("whatsappNumber");

    const field =
        document.querySelector(
            ".phone-field"
        );

    const message =
        $("phoneMessage");


    if (
        !input ||
        !field ||
        !message
    ) {

        return false;

    }


    const value =
        sanitizePhone(
            input.value
        );


    input.value =
        value;


    field.classList.remove(
        "valid",
        "invalid"
    );


    message.classList.remove(
        "valid",
        "invalid"
    );


    if (!value) {

        message.textContent =
            "";

        return false;

    }


    if (
        isValidIndianMobile(
            value
        )
    ) {

        field.classList.add(
            "valid"
        );

        message.classList.add(
            "valid"
        );

        message.textContent =
            `✓ ${translate(
                "validPhone"
            )}`;

        return true;

    }


    field.classList.add(
        "invalid"
    );

    message.classList.add(
        "invalid"
    );

    message.textContent =
        translate(
            "invalidPhone"
        );


    return false;

}


/* =====================================================
   LEAD FORM VALIDATION
===================================================== */


function validateLeadForm() {

    const name =
        $("fullName")
            ?.value
            .trim() ||
        "";

    const phone =
        sanitizePhone(
            $("whatsappNumber")
                ?.value ||
            ""
        );

    const age =
        $("ageGroup")
            ?.value ||
        "";

    const city =
        $("city")
            ?.value
            .trim() ||
        "";

    const consent =
        Boolean(
            $("consent")
                ?.checked
        );

    if (!name) {
        return translate("nameRequired");
    }

    if (!isValidIndianMobile(phone)) {
        return translate("invalidPhone");
    }

    if (!age) {
        return translate("ageRequired");
    }

    const ageNumber = Number(age);

    if (
        !Number.isInteger(ageNumber) ||
        ageNumber < 1 ||
        ageNumber > 100
    ) {
        return state.language === "hi"
            ? "कृपया 1 से 100 के बीच सही उम्र दर्ज करें।"
            : "Please enter a valid age between 1 and 100.";
    }

    if (!city) {
        return translate("cityRequired");
    }

    if (!consent) {
        return translate("consentRequired");
    }

    return "";
}

/* =====================================================
   LEAD BACK
===================================================== */

function bindLeadBack() {

    $("leadBackBtn")
        ?.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const questions =
                    getCurrentQuestions();


                state.questionIndex =
                    Math.max(
                        0,
                        questions.length - 1
                    );


                renderQuestion();

                showStep(4);

            }
        );

}

/* =====================================================
   OPTIMIZE SCALP PHOTO BEFORE UPLOAD
===================================================== */

async function compressScalpPhoto(file) {
    if (!file || !file.type.startsWith("image/")) {
        throw new Error("Please select a valid image.");
    }

    // Keep small images unchanged.
    if (file.size <= 500 * 1024) {
        return file;
    }

    const imageURL = URL.createObjectURL(file);

    try {
        const image = new Image();
        image.src = imageURL;

        await new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = () => reject(
                new Error("Could not read the selected photo.")
            );
        });

        const maxDimension = 1600;
        const scale = Math.min(
            1,
            maxDimension / Math.max(image.naturalWidth, image.naturalHeight)
        );

        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.naturalWidth * scale);
        canvas.height = Math.round(image.naturalHeight * scale);

        const context = canvas.getContext("2d");

        if (!context) {
            throw new Error("Photo optimization is unavailable.");
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const blob = await new Promise((resolve, reject) => {
            canvas.toBlob(
                result => result
                    ? resolve(result)
                    : reject(new Error("Photo compression failed.")),
                "image/jpeg",
                0.82
            );
        });

        // Use compressed image only when it is actually smaller.
        if (blob.size >= file.size) {
            return file;
        }

        const originalName = file.name.replace(/\.[^.]+$/, "");

        return new File(
            [blob],
            `${originalName}.jpg`,
            {
                type: "image/jpeg",
                lastModified: Date.now()
            }
        );
    } finally {
        URL.revokeObjectURL(imageURL);
    }
}


/* =====================================================
   SCALP PHOTO UPLOAD
===================================================== */

async function uploadScalpPhoto() {

    if (
        state.hairFallDuration !==
        "more30"
    ) {

        return null;

    }


    if (
        !state.scalpPhoto
    ) {

        return null;

    }


    if (!supabaseClient) {

        throw new Error(
            "Supabase is not initialized."
        );

    }


   const file = await compressScalpPhoto(state.scalpPhoto);

    const safeName =
        file.name
            .toLowerCase()
            .replace(
                /[^a-z0-9.\-_]/g,
                "-"
            );


    const randomId =
        window.crypto?.randomUUID
            ? window.crypto.randomUUID()
            : `${Date.now()}-${Math.random()
                .toString(36)
                .slice(2)}`;


    const filePath =
        `${Date.now()}-${randomId}-${safeName}`;


    const result =
        await supabaseClient
            .storage
            .from(
                SCALP_BUCKET
            )
            .upload(
                filePath,
                file,
                {
                    cacheControl:
                        "3600",

                    upsert:
                        false,

                    contentType:
                        file.type
                }
            );


    if (
        result.error
    ) {

        throw result.error;

    }


    state.uploadedPhotoPath =
        result.data?.path ||
        filePath;


    return (
        state.uploadedPhotoPath
    );

}


/* =====================================================
   RESULT DATA
===================================================== */

function getStageResult() {

    return (
        getCurrentStages()
            .find(
                stage =>
                    Number(
                        stage.stage
                    ) ===
                    Number(
                        state.selectedStage
                    )
            ) ||
        null
    );

}


/* =====================================================
   RECENT FACTORS
===================================================== */

function getRecentFactors() {

    const labels = [];

    const answers =
        state.answers ||
        [];


    answers.forEach(
        (
            answer,
            index
        ) => {

            const question =
                recentHairFallQuestions[
                    index
                ];


            if (
                !question ||
                !answer
            ) {

                return;

            }


            const value =
                String(
                    answer.value ||
                    ""
                )
                    .toLowerCase();


            if (
                question.key ===
                    "diet" &&

                !value.includes(
                    "no major"
                ) &&

                !value.includes(
                    "कोई बड़ा"
                )
            ) {

                labels.push(
                    translate(
                        "recentDiet"
                    )
                );

            }


            if (
                question.key ===
                    "stress" &&

                !value.includes(
                    "neither"
                ) &&

                !value.includes(
                    "कोई नहीं"
                )
            ) {

                labels.push(
                    translate(
                        "recentStress"
                    )
                );

            }


            if (
                question.key ===
                    "illness" &&

                !value.includes(
                    "no"
                ) &&

                !value.includes(
                    "नहीं"
                )
            ) {

                labels.push(
                    translate(
                        "recentIllness"
                    )
                );

            }


            if (
                question.key ===
                    "environment" &&

                !value.includes(
                    "no major"
                ) &&

                !value.includes(
                    "कोई बड़ा"
                )
            ) {

                labels.push(
                    translate(
                        "recentEnvironment"
                    )
                );

            }


            if (
                question.key ===
                    "scalp" &&

                !value.includes(
                    "none"
                ) &&

                !value.includes(
                    "इनमें से कोई नहीं"
                )
            ) {

                labels.push(
                    translate(
                        "recentScalp"
                    )
                );

            }

        }
    );


    return [
        ...new Set(
            labels
        )
    ];

}


/* =====================================================
   SCORE
===================================================== */

function calculateAssessmentScore() {

    const answers =
        state.answers ||
        [];


    if (!answers.length) {
        return null;
    }


    if (
        state.hairFallDuration ===
        "more30"
    ) {

        const max =
            3;


        const total =
            answers.reduce(
                (
                    sum,
                    answer
                ) => {

                    return (
                        sum +
                        Math.min(
                            Number(
                                answer.index
                            ) || 0,
                            max
                        )
                    );

                },
                0
            );


        return Math.round(
            (
                total /
                (
                    answers.length *
                    max
                )
            ) *
            100
        );

    }


    const score =
        answers.reduce(
            (
                sum,
                answer,
                index
            ) => {

                const question =
                    recentHairFallQuestions[
                        index
                    ];


                const max =
                    Math.max(
                        (
                            question
                                ?.en
                                ?.options
                                ?.length ||
                            1
                        ) - 1,
                        1
                    );


                return (
                    sum +
                    (
                        (
                            Number(
                                answer.index
                            ) || 0
                        ) /
                        max
                    ) *
                    100
                );

            },
            0
        ) /
        answers.length;


    return Math.round(
        score
    );

}


/* =====================================================
   RESULT RENDER
===================================================== */

function renderFactors() {

    const list =
        $("factorList");

    if (!list) return;


    list.innerHTML =
        "";


    const factors =
        getRecentFactors();


    if (!factors.length) {

        const chip =
            document.createElement(
                "span"
            );

        chip.className =
            "factor-chip";

        chip.textContent =
            translate(
                "noFactor"
            );

        list.appendChild(
            chip
        );

        return;

    }


    factors.forEach(
        factor => {

            const chip =
                document.createElement(
                    "span"
                );

            chip.className =
                "factor-chip";

            chip.textContent =
                factor;

            list.appendChild(
                chip
            );

        }
    );

}


/* =====================================================
   WHATSAPP
===================================================== */

function getWhatsAppUrl() {

    const name =
        $("fullName")
            ?.value
            .trim() ||
        "Patient";


    const city =
        $("city")
            ?.value
            .trim() ||
        "";


    const gender =
        state.gender ===
        "women"
            ? "Women"
            : "Men";


    const duration =
        state.hairFallDuration ===
        "less30"
            ? "Less than 30 days"
            : "More than 30 days";


    const result =
        getStageResult();


    let stageLine =
        "Selected Stage: Not applicable for less than 30 days";


    if (
        state.hairFallDuration ===
        "more30" &&
        result
    ) {

        stageLine =
            `Selected Stage: Stage ${result.stage} — ${getLocalized(result).title}`;

    }


    const message = [

        "Hello Clinica Medicare,",

        "",

        "I have completed the 2-Minute Hair Assessment.",

        "",

        `Name: ${name}`,

        `Gender: ${gender}`,

        `Hair Fall Duration: ${duration}`,

        stageLine,

        `City: ${city}`,

        "",

        "I would like to know more about the ₹150 consultation."

    ].join("\n");


    return (
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    );

}


function updateWhatsAppLink() {

    const url =
        getWhatsAppUrl();


    const button =
        $("consultationBtn");


    if (button) {

        button.dataset.whatsappUrl =
            url;


        if (
            button.tagName ===
            "A"
        ) {

            button.href =
                url;

            button.target =
                "_blank";

            button.rel =
                "noopener noreferrer";

        }

    }


    return url;

}


/* =====================================================
   PATIENT SUMMARY — FINAL RESULT
===================================================== */

function renderPatientSummary() {
    const setText = (id, value) => {
        const element = $(id);

        if (element) {
            element.textContent =
                value ||
                (state.language === "hi"
                    ? "जानकारी उपलब्ध नहीं"
                    : "Not provided");
        }
    };

    const isHindi = state.language === "hi";
    const recent = state.hairFallDuration === "less30";
    const stageResult = getStageResult();

    const name = $("fullName")?.value?.trim() || "";

    const age =
        $("ageGroup")?.selectedOptions?.[0]?.textContent?.trim() ||
        $("ageGroup")?.value ||
        "";

    const gender =
        state.gender === "men"
            ? (isHindi ? "पुरुष" : "Male")
            : state.gender === "women"
                ? (isHindi ? "महिला" : "Female")
                : "";

    const duration = recent
        ? (isHindi ? "30 दिनों से कम" : "Less than 30 days")
        : state.hairFallDuration === "more30"
            ? (isHindi ? "30 दिनों से अधिक" : "More than 30 days")
            : "";

    const stage = !recent && stageResult
        ? `${isHindi ? "चरण" : "Stage"} ${stageResult.stage} — ${getLocalized(stageResult).title}`
        : (isHindi ? "लागू नहीं" : "Not applicable");

    const recentFactors = recent ? getRecentFactors() : [];

    const selectedAnswers = (state.answers || [])
        .filter(Boolean)
        .map(answer => answer.value)
        .filter(Boolean);

    let mainConcern = "";

    if (recent) {
        mainConcern = recentFactors.length
            ? recentFactors.join(", ")
            : (isHindi
                ? "हाल में बढ़ा हुआ बाल झड़ना"
                : "Recent increase in hair fall");
    } else if (state.gender === "women" && selectedAnswers.length) {
        mainConcern = selectedAnswers[selectedAnswers.length - 1];
    } else if (selectedAnswers.length) {
        mainConcern = selectedAnswers[0];

        if (stageResult) {
            mainConcern += `; ${getLocalized(stageResult).title}`;
        }
    } else if (stageResult) {
        mainConcern = getLocalized(stageResult).title;
    }

    let diagnosis = "";

    if (recent) {
        diagnosis = isHindi
            ? "प्रारंभिक आकलन: हाल में बढ़ा हुआ बाल झड़ना। संभावित कारणों का मूल्यांकन आवश्यक है। यह पुष्टि किया हुआ चिकित्सकीय निदान नहीं है।"
            : "Preliminary assessment: Recent increase in hair fall. Possible contributing factors need evaluation.It is Provisional diagnosis.";
    } else if (stageResult) {
        diagnosis = isHindi
            ? `प्रारंभिक आकलन: चुना गया पैटर्न ${getLocalized(stageResult).title} से मिलता-जुलता है। पुष्टि के लिए डॉक्टर से मूल्यांकन करवाएं।`
            : `Preliminary assessment: The selected pattern resembles ${getLocalized(stageResult).title}. Consult a doctor for proper evaluation and confirmation.`;
    } else {
        diagnosis = isHindi
            ? "दिए गए उत्तरों के आधार पर प्रारंभिक निष्कर्ष उपलब्ध होगा। पुष्टि के लिए डॉक्टर का मूल्यांकन आवश्यक है।"
            : "A preliminary finding will be based on your answers. A doctor's evaluation is required for confirmation.";
    }

    setText("summaryName", name);
    setText("summaryAge", age);
    setText("summaryGender", gender);
    setText("summaryDuration", duration);
    setText("summaryStage", stage);
    setText("summaryConcern", mainConcern);
    setText("summaryDiagnosis", diagnosis);
}


/* =====================================================
   RESULT RENDERING
===================================================== */


function renderResult() {
    const isHindi = state.language === "hi";
    const recent = state.hairFallDuration === "less30";

    const stageVisual = $("resultStageVisual");
    const recentContent = $("recentResultContent");
    const stageContent = $("stageResultContent");

    const resultImage = $("resultImage");
    const resultStage = $("resultStage");
    const resultTitle = $("resultTitle");
    const resultType = $("resultType");

    // Shared consultation card: visible in BOTH result flows
    const consultationCard = $("consultationCard");
    const consultationButton = $("consultationBtn");

    if (consultationCard) {
        consultationCard.style.display = "";
    }

    if (consultationButton) {
        consultationButton.dataset.consultationFee = "150";
    }

    renderPatientSummary();

    /* LESS THAN 30 DAYS */

    if (recent) {
        if (stageVisual) {
            stageVisual.style.display = "none";
        }

        if (stageContent) {
            stageContent.style.display = "none";
        }

        if (recentContent) {
            recentContent.hidden = false;
        }

        if (resultTitle) {
            resultTitle.textContent = isHindi
                ? "हाल के बाल झड़ने का मूल्यांकन"
                : "Recent Hair Fall Assessment";
        }

        if (resultType) {
            resultType.textContent = isHindi
                ? "30 दिनों से कम"
                : "Less than 30 days";
        }

        renderFactors();
        updateWhatsAppLink();
        return;
    }

    /* MORE THAN 30 DAYS */

    if (recentContent) {
        recentContent.hidden = true;
    }

    if (stageVisual) {
        stageVisual.style.display = "";
    }

    if (stageContent) {
        stageContent.style.display = "";
    }

    const result = getStageResult();

    if (!result) {
        if (resultTitle) {
            resultTitle.textContent = isHindi
                ? "आपका हेयर असेसमेंट"
                : "Your Hair Assessment";
        }

        updateWhatsAppLink();
        return;
    }

    const localized = getLocalized(result);

if (resultImage) {
    if (state.scalpPhoto) {
        resultImage.src = URL.createObjectURL(state.scalpPhoto);
        resultImage.alt = "Your uploaded scalp photo";
        resultImage.style.objectFit = "contain";
    } else {
        resultImage.removeAttribute("src");
        resultImage.alt = "";
    }
}


    if (resultStage) {
        resultStage.textContent = isHindi
            ? `चरण ${result.stage}`
            : `Stage ${result.stage}`;
    }

    if (resultTitle) {
        resultTitle.textContent = localized.title;
    }

    if (resultType) {
        resultType.textContent = state.gender === "women"
            ? (
                isHindi
                    ? "महिलाओं में हेयर थिनिंग पैटर्न"
                    : "Female Pattern Hair Thinning"
            )
            : (
                isHindi
                    ? "पुरुषों में हेयर लॉस पैटर्न"
                    : "Male Pattern Hair Loss"
            );
    }

    const summaryText = $("resultSummaryText");

    if (summaryText) {
        summaryText.textContent =
            localized.meaning ||
            localized.description ||
            "";
    }

    const meaningText = $("resultMeaningText");

    if (meaningText) {
        meaningText.textContent = isHindi
            ? "यह ऑनलाइन आकलन आपके चुने गए स्टेज और उत्तरों पर आधारित प्रारंभिक जानकारी देता है। यह चिकित्सकीय निदान नहीं है।"
            : "This online assessment provides an initial indication based on your selected stage and answers. It is a provisional assessment, not a clinical diagnosis.";
    }

    const recommendationText = $("resultRecommendationText");

    if (recommendationText) {
        recommendationText.textContent =
            localized.recommendation || "";
    }

    updateWhatsAppLink();
}


/* =====================================================
   SAVE ASSESSMENT
   ONE INSERT ONLY
===================================================== */

async function saveAssessment() {

    if (!supabaseClient) {
        throw new Error("Supabase is not initialized.");
    }

    let uploadedPhoto = null;

    /*
       PHOTO IS REQUIRED FOR MORE-THAN-30-DAYS FLOW.
       If upload fails, assessment will not be saved.
    */

    if (state.hairFallDuration === "more30") {

        if (!state.scalpPhoto) {
            console.error("Required scalp photo is missing.");
            return false;
        }

        try {
            uploadedPhoto = await uploadScalpPhoto();

            if (!uploadedPhoto) {
                throw new Error(
                    "Photo upload returned no file path."
                );
            }

            state.uploadedPhotoPath = uploadedPhoto;

        } catch (photoError) {
            console.error(
                "Scalp photo upload failed:",
                photoError
            );

            uploadedPhoto = null;
            state.uploadedPhotoPath = null;

            return false;
        }
    }

    const fullName =
        $("fullName")?.value.trim() || "";

    const phone =
        sanitizePhone(
            $("whatsappNumber")?.value || ""
        );

    const age =
        $("ageGroup")?.value || "";

    const city =
        $("city")?.value.trim() || "";

    const recent =
        state.hairFallDuration === "less30";

    const stageResult =
        getStageResult();

    const flowType =
        recent
            ? "less_than_30_days"
            : "more_than_30_days";

    const assessmentResult =
        recent
            ? (
                state.language === "hi"
                    ? "प्रारंभिक स्टेज / 30 दिनों से कम"
                    : "Early Stage / Less Than 30 Days"
            )
            : (
                stageResult
                    ? `Stage ${stageResult.stage} — ${getLocalized(stageResult).title}`
                    : "Stage assessment"
            );

    const recentFactors =
        recent ? getRecentFactors() : [];

    const answersPayload = {
        language: state.language,
        gender: state.gender,
        hair_fall_duration: flowType,
        selected_stage: recent
            ? null
            : state.selectedStage,
        recent_factors: recentFactors,
        answers: state.answers
    };

    const payload = {
        full_name: fullName,
        whatsapp_number: phone,
        age_group: age,
        city: city,
        gender: state.gender,

        selected_stage:
            recent || !state.selectedStage
                ? null
                : `Stage ${state.selectedStage}`,

        answers: answersPayload,
        scalp_photo: uploadedPhoto,
        consent: true,

        main_concern:
            recent
                ? (
                    recentFactors.length
                        ? recentFactors.join(", ")
                        : "Recent hair fall"
                )
                : (
                    stageResult
                        ? getLocalized(stageResult).title
                        : "Hair thinning / hair loss"
                ),

        flow_type: flowType,
        hair_fall_duration: flowType,
        assessment_result: assessmentResult,
        pdf_downloaded: false,
        consultation_requested: false
    };

    const { error } = await supabaseClient
        .from("hair_assessment")
        .insert(payload);

    if (error) {
        throw error;
    }

    state.lastSubmissionId = null;

    return true;
}


/* =====================================================
   LEAD SUBMIT
===================================================== */

async function handleLeadSubmit(
    event
) {

    event.preventDefault();


    if (
        state.isSaving
    ) {

        return;

    }


    const error =
        validateLeadForm();


    if (error) {

        if ($("formError")) {

            $("formError")
                .textContent =
                error;

        }

        return;

    }


    if ($("formError")) {

        $("formError")
            .textContent =
            "";

    }


    if (
        !initializeSupabase()
    ) {

        if ($("formError")) {

            $("formError")
                .textContent =
                "Supabase could not be initialized.";

        }

        return;

    }


    state.isSaving =
        true;


    const button =
        $("submitLeadBtn");


    const originalText =
        button?.innerHTML ||
        "";


    if (button) {

        button.disabled =
            true;

        button.innerHTML =
            `<span>${translate(
                "saving"
            )}</span>`;

    }

    try {
        const saved = await saveAssessment();

        if (saved !== true) {
            if ($("formError")) {
                $("formError").textContent =
                    translate("saveError");
            }
            return;
        }

        renderResult();
        showStep(6);

    } catch (error) {
        console.error(
            "Assessment save error:",
            error
        );

        if ($("formError")) {
            $("formError").textContent =
                translate("saveError");
        }

    } finally {
        state.isSaving = false;

        if (button) {
            button.disabled = false;
            button.innerHTML = originalText;
        }
    }
}
/* =====================================================
   PDF DOWNLOAD
===================================================== */

const HAIR_PLAN_URL =
    "https://stejywpaxavvmjkzndwh.supabase.co/storage/v1/object/public/hair-care-plans/CLINICA%20MEDICARE%20%20DIET%20%26%20HAIR%20PLAN.pdf";


async function downloadHairPlan() {

    const filename =
        "Clinica Medicare Premium Hair Care and Diet Plan.pdf";

    try {

        const response = await fetch(
            HAIR_PLAN_URL,
            {
                mode: "cors",
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error(
                `PDF download failed: ${response.status}`
            );
        }

        const blob = await response.blob();

        const blobUrl = URL.createObjectURL(blob);

        const anchor = document.createElement("a");

        anchor.href = blobUrl;
        anchor.download = filename;
        anchor.rel = "noopener";

        document.body.appendChild(anchor);

        anchor.click();

        anchor.remove();

        setTimeout(() => {
            URL.revokeObjectURL(blobUrl);
        }, 5000);

    } catch (error) {

        console.warn(
            "Named PDF download fallback:",
            error
        );

        window.open(
            HAIR_PLAN_URL,
            "_blank",
            "noopener,noreferrer"
        );

    }

}



/* =====================================================
   CONSULTATION
===================================================== */

function bindConsultation() {

    $("consultationBtn")
        ?.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const url =
                    getWhatsAppUrl();


                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

}


/* =====================================================
   PLAN BUTTON
===================================================== */

function bindPlanDownload() {

    $("downloadPlanBtn")
        ?.addEventListener(
            "click",
            async event => {

                event.preventDefault();

                await downloadHairPlan();

            }
        );

}


/* =====================================================
   MODAL BINDING
===================================================== */

function bindModal() {
    const startButton = $("startHairTest");

    if (startButton) {
        startButton.addEventListener("click", event => {
            event.preventDefault();

            resetAssessmentState();
            openHairTestModal();
            showStep(0);
        });
    }

    const viewPlanButton = $("viewPlanBtn");

    if (viewPlanButton) {
        viewPlanButton.addEventListener("click", event => {
            event.preventDefault();

            resetAssessmentState();
            openHairTestModal();
            showStep(0);
        });
    }

    ["closeHairTestModal", "closeHairTest"].forEach(id => {
        $(id)?.addEventListener("click", event => {
            event.preventDefault();
            closeHairTestModal();
        });
    });

    document.querySelectorAll("[data-modal-close]").forEach(element => {
        element.addEventListener("click", event => {
            event.preventDefault();
            closeHairTestModal();
        });
    });

    document.addEventListener("keydown", event => {
        if (
            event.key === "Escape" &&
            $("hairTestModal")?.classList.contains("active")
        ) {
            closeHairTestModal();
        }
    });
}

/* =====================================================
   HERO VIDEO
===================================================== */

function bindHeroVideo() {

    const heroVideo =
        $("heroVideo");


    const playButton =
        $("videoPlayIndicator");


    const playIcon =
        $("videoPlayIcon");


    playButton?.addEventListener(
        "click",
        () => {

            if (!heroVideo) {
                return;
            }


            if (
                heroVideo.paused
            ) {

                heroVideo
                    .play()
                    .catch(
                        () => {}
                    );

            } else {

                heroVideo.pause();

            }

        }
    );


    heroVideo?.addEventListener(
        "play",
        () => {

            if (playIcon) {

                playIcon.textContent =
                    "Ⅱ";

            }

        }
    );


    heroVideo?.addEventListener(
        "pause",
        () => {

            if (playIcon) {

                playIcon.textContent =
                    "▶";

            }

        }
    );

}


/* =====================================================
   RESTART
===================================================== */

function bindRestart() {

    $("restartTestBtn")
        ?.addEventListener(
            "click",
            event => {

                event.preventDefault();

                resetAssessmentState();

                showStep(0);

            }
        );

}


/* =====================================================
   RESET
===================================================== */

function resetAssessmentState() {

    state.gender =
        null;

    state.hairFallDuration =
        null;

    state.selectedStage =
        null;

    state.questionIndex =
        0;

    state.answers =
        [];

    state.recentAnswers =
        [];

    state.scalpPhoto =
        null;

    state.uploadedPhotoPath =
        null;

    state.lastSubmissionId =
        null;

    state.isSaving =
        false;


    document
        .querySelectorAll(
            ".gender-card, .duration-card, .stage-card"
        )
        .forEach(
            card => {

                card.classList.remove(
                    "selected"
                );

                card.setAttribute(
                    "aria-pressed",
                    "false"
                );

            }
        );


    resetPhotoUI();


    const leadForm =
        $("leadForm");


    if (leadForm) {

        leadForm.reset();

    }


    if ($("formError")) {

        $("formError")
            .textContent =
            "";

    }


    updatePhoneValidation();


    if ($("resultStageVisual")) {

        $("resultStageVisual")
            .style.display =
            "";

    }


    if ($("stageResultContent")) {

        $("stageResultContent")
            .style.display =
            "";

    }


    if ($("recentResultContent")) {

        $("recentResultContent")
            .hidden =
            true;

    }

    renderStages();

    renderQuestion();

    updateStaticButtonLabels();

}


/* =====================================================
   LANGUAGE BUTTONS
===================================================== */

function bindLanguage() {

    document
        .querySelectorAll(
            ".language-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const language =
                            button.dataset.language;


                        if (
                            !language ||
                            !translations[
                                language
                            ] ||
                            language ===
                            state.language
                        ) {

                            return;

                        }


                        state.language =
                            language;


                        applyLanguage();

                    }
                );

            }
        );

}


/* =====================================================
   GENDER BIND
===================================================== */

function bindGender() {

    document
        .querySelectorAll(
            ".gender-card"
        )
        .forEach(
            card => {

                card.addEventListener(
                    "click",
                    () => {

                        selectGender(
                            card.dataset.gender
                        );

                    }
                );

            }
        );

}


/* =====================================================
   DURATION BIND
===================================================== */

function bindDuration() {

    document
        .querySelectorAll(
            ".duration-card"
        )
        .forEach(
            card => {

                card.addEventListener(
                    "click",
                    () => {

                        selectDuration(
                            card.dataset.duration
                        );

                    }
                );

            }
        );

}


/* =====================================================
   INITIALIZE
===================================================== */

function initHairAssessment() {

    initializeSupabase();


    bindModal();

    bindGender();

    bindDuration();

    bindStageNext();

    bindPhoto();

    bindQuestionNavigation();

    bindBackButtons();

    bindLeadBack();

    bindPlanDownload();

    bindConsultation();

    bindHeroVideo();

    bindRestart();

    bindLanguage();


    $("leadForm")
        ?.addEventListener(
            "submit",
            handleLeadSubmit
        );


    $("whatsappNumber")
        ?.addEventListener(
            "input",
            updatePhoneValidation
        );


    applyLanguage();

    resetAssessmentState();

    showStep(0);

}


/* =====================================================
   DOM READY
===================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initHairAssessment,
        {
            once: true
        }
    );

} else {

    initHairAssessment();

}/**
* Template Name: Clinic
* Template URL: https://bootstrapmade.com/clinic-bootstrap-template/
* Updated: Jul 23 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

})();
/* Show the selected scalp photo in Patient Summary */
document.addEventListener("DOMContentLoaded", function () {
    const scalpPhotoInput = document.getElementById("scalpPhoto");
    const summaryPhoto = document.getElementById("summaryPatientPhoto");
    const summaryPhotoWrap = document.getElementById("summaryPhotoWrap");

    if (!scalpPhotoInput || !summaryPhoto || !summaryPhotoWrap) {
        return;
    }

    let summaryPhotoURL = null;

    scalpPhotoInput.addEventListener("change", function () {
        const file = this.files && this.files[0];

        if (summaryPhotoURL) {
            URL.revokeObjectURL(summaryPhotoURL);
            summaryPhotoURL = null;
        }

        if (!file) {
            summaryPhoto.removeAttribute("src");
            summaryPhotoWrap.hidden = true;
            return;
        }

        if (!file.type.startsWith("image/")) {
            summaryPhoto.removeAttribute("src");
            summaryPhotoWrap.hidden = true;
            alert("Please select a valid image.");
            return;
        }

        summaryPhotoURL = URL.createObjectURL(file);
        summaryPhoto.src = summaryPhotoURL;
        summaryPhotoWrap.hidden = false;
    });
});
