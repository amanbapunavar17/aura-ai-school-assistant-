/**
 * Centralized Multilingual Localization Catalog
 * Supports 11 Indian and global languages:
 * English (en), Hindi (hi), Marathi (mr), Bengali (bn), Gujarati (gu),
 * Punjabi (pa), Tamil (ta), Telugu (te), Kannada (kn), Malayalam (ml), Urdu (ur)
 */

export interface RoleGreetings {
  student: string;
  parent: string;
  teacher: string;
  principal: string;
}

export interface LanguagePack {
  code: string;
  name: string;
  nativeName: string;
  greetings: RoleGreetings;
  clarificationQuestion: string;
  clarificationPromptLabel: string;
  rahulAttendance: string;
  priyaAttendance: string;
  ownAttendance: string;
  lastMonthAttendance: (studentName: string, className: string, pct: number, attended: number, total: number) => string;
  schoolWideAttendance: (rate: number, present: number, total: number, highest: string, lowest: string, classes: string) => string;
  lowestAttendanceAnomaly: (grade: string, rate: number, section: string, reason: string) => string;
  classTeacherSummary: (className: string, total: number, present: number, pct: number, absentList: string) => string;
  markAbsentSuccess: (studentName: string, className: string, auditId: string) => string;
  securityInjectionBlocked: string;
  rbacDenied: (userName: string, role: string) => string;
  unauthorizedSchoolWide?: string;
  unauthorizedStudentAccess?: string;
  unauthorizedRoleSpoof?: string;
  escalationOffer: (studentName: string, teacherName: string) => string;
  escalationConfirmed: (ticketId: string, teacherName: string, parentName: string) => string;
  escalationCancelled: string;
  genericHelp: (role: string, name: string) => string;
  buttons: {
    rahulOption: { label: string; sublabel: string };
    priyaOption: { label: string; sublabel: string };
  };
}

export const TRANSLATION_PACKS: Record<string, LanguagePack> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    greetings: {
      student: 'Hello Aarav Sharma! I am AURA AI, your personal school assistant. You can check your live attendance, view schedules, or ask about classroom updates.',
      parent: 'Hello Sunita Sharma! I am AURA AI. I can assist you with Rahul and Priya’s academic progress, attendance records, or connect you directly with their teachers.',
      teacher: 'Welcome, Vikram Verma! AURA AI faculty portal is ready. You can mark attendance, review Class 10-A summaries, or manage parent callback requests.',
      principal: 'Good day, Dr. Arvind Mehta. AURA AI is active for Oakridge Model Academy administration. You can query school-wide attendance analytics, anomaly alerts, and compliance summaries.',
    },
    clarificationQuestion: "I'd be happy to check for you. Which child's attendance record would you like me to look up?",
    clarificationPromptLabel: 'Please Select a Student:',
    rahulAttendance: 'Rahul Sharma (Class 10-A, Roll 12) currently has 91.25% attendance, with 73 out of 80 classes attended this term. Status: Present Today.',
    priyaAttendance: 'Priya Sharma (Class 7-B, Roll 24) currently has 95.0% attendance, with 76 out of 80 classes attended this term. Status: Present Today.',
    ownAttendance: "Your current attendance is 92.5%. You have attended 74 out of 80 classes this academic term. You are well above the 75% school requirement.",
    lastMonthAttendance: (studentName, className, pct, attended, total) =>
      `Remembering our context for ${studentName} (${className}): During last month, attendance was ${pct}%, with ${attended} out of ${total} classes attended.`,
    schoolWideAttendance: (rate, present, total, highest, lowest, classes) =>
      `School-wide attendance today is currently ${rate}%, with ${present} of ${total} students present across the academy.\n\n• Highest Performing: ${highest}\n• Requiring Attention: ${lowest}\n• Reporting Status: ${classes} class registers synchronized.`,
    lowestAttendanceAnomaly: (grade, rate, section, reason) =>
      `${grade} currently registers the lowest attendance at ${rate}%. The primary cluster is in section ${section} (${reason}). Would you like to view detailed class breakdown or dispatch a circular?`,
    classTeacherSummary: (className, total, present, pct, absentList) =>
      `Class ${className} Attendance Summary for Today:\n• Total Enrolled: ${total} students\n• Present: ${present} (${pct}%)\n• Absent Today: ${absentList}\n• Status: All period registers synchronized.`,
    markAbsentSuccess: (studentName, className, auditId) =>
      `✅ Successfully recorded ${studentName} (${className}) as ABSENT for today. Automated SMS notification queued for parent Sunita Sharma.\n\nSimulated Audit ID: ${auditId}`,
    securityInjectionBlocked: '⚠️ Prototype Security Demonstration: Prompt override or sensitive credential extraction pattern intercepted. Core system instructions, API keys, and internal database schemas remain securely isolated behind the server boundary.',
    rbacDenied: (userName, role) =>
      `❌ Access Denied (Simulated RBAC): Account '${userName}' (${role.toUpperCase()}) lacks write permission [attendance.write]. Attendance modifications are strictly restricted to verified faculty and administrative staff.`,
    escalationOffer: (studentName, teacherName) =>
      `Of course. I understand you would like to connect directly with a staff member. Would you like me to submit a scheduled callback request with ${studentName}'s class teacher, ${teacherName}?`,
    escalationConfirmed: (ticketId, teacherName, parentName) =>
      `✅ Call request ticket #${ticketId} has been registered in the prototype queue. Notification dispatched to ${teacherName} for callback with parent ${parentName}.`,
    escalationCancelled: 'Understood. We will continue chatting here. How else can I assist you?',
    genericHelp: (role, name) =>
      `I am here to assist you as your ${role.toUpperCase()} assistant (${name}). You can query attendance records, review timetable updates, submit inquiries, or request faculty callbacks anytime.`,
    buttons: {
      rahulOption: { label: 'Rahul Sharma', sublabel: 'Class 10-A • Roll No. 12' },
      priyaOption: { label: 'Priya Sharma', sublabel: 'Class 7-B • Roll No. 24' },
    },
  },

  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    greetings: {
      student: 'नमस्ते आरव शर्मा! मैं ऑरा एआई (AURA AI) हूँ, आपका स्कूल सहायक। आप मुझसे अपनी उपस्थिति, समय सारिणी या कक्षा संबंधी जानकारी पूछ सकते हैं।',
      parent: 'नमस्ते श्रीमती सुनीता शर्मा! मैं AURA AI हूँ। मैं राहुल और प्रिया की उपस्थिति, प्रगति रिपोर्ट देखने या शिक्षकों से संपर्क करने में आपकी सहायता कर सकता हूँ।',
      teacher: 'नमस्ते श्री विक्रम वर्मा! AURA AI शिक्षक पोर्टल तैयार है। आप कक्षा 10-A की उपस्थिति दर्ज कर सकते हैं, दैनिक सारांश देख सकते हैं या अभिभावकों के अनुरोध प्रबंधित कर सकते हैं।',
      principal: 'सादर प्रणाम डॉ. मेहता। AURA AI स्कूल प्रशासन के लिए सक्रिय है। आप स्कूल-स्तरीय उपस्थिति विश्लेषण, अनुपस्थिति के रुझान और रिपोर्ट देख सकते हैं।',
    },
    clarificationQuestion: 'मुझे आपकी सहायता करने में खुशी होगी! आपके दो बच्चे नामांकित हैं। आप किस बच्चे की उपस्थिति देखना चाहते हैं?',
    clarificationPromptLabel: 'कृपया एक विद्यार्थी चुनें:',
    rahulAttendance: 'राहुल शर्मा (कक्षा 10-A, रोल नं. 12) की वर्तमान उपस्थिति 91.25% है, जिसमें 80 में से 73 कक्षाएं उपस्थित हैं। आज की स्थिति: उपस्थित।',
    priyaAttendance: 'प्रिया शर्मा (कक्षा 7-B, रोल नं. 24) की वर्तमान उपस्थिति 95.0% है, जिसमें 80 में से 76 कक्षाएं उपस्थित हैं। आज की स्थिति: उपस्थित।',
    ownAttendance: 'आपकी वर्तमान उपस्थिति 92.5% है। आपने कुल 80 में से 74 कक्षाओं में भाग लिया है। आपकी उपस्थिति आवश्यक 75% से अधिक है।',
    lastMonthAttendance: (studentName, className, pct, attended, total) =>
      `संदर्भ (${studentName}, ${className}): पिछले महीने उनकी उपस्थिति ${pct}% थी, जिसमें ${total} में से ${attended} कक्षाएं शामिल थीं।`,
    schoolWideAttendance: (rate, present, total, highest, lowest, classes) =>
      `आज पूरे स्कूल की कुल उपस्थिति ${rate}% है, जिसमें कुल ${total} में से ${present} विद्यार्थी उपस्थित हैं।\n\n• उच्चतम उपस्थिति: ${highest}\n• ध्यान देने योग्य: ${lowest}\n• स्थिति: ${classes} कक्षाओं की रिपोर्ट दर्ज।`,
    lowestAttendanceAnomaly: (grade, rate, section, reason) =>
      `${grade} में वर्तमान में सबसे कम उपस्थिति (${rate}%) दर्ज की गई है। मुख्य कारण सेक्शन ${section} में मौसमी फ्लू (${reason}) है। क्या आप विवरण देखना चाहते हैं?`,
    classTeacherSummary: (className, total, present, pct, absentList) =>
      `कक्षा ${className} उपस्थिति सारांश (आज):\n• कुल विद्यार्थी: ${total}\n• उपस्थित: ${present} (${pct}%)\n• अनुपस्थित: ${absentList}\n• स्थिति: सभी पीरियड रजिस्टर सत्यापित।`,
    markAbsentSuccess: (studentName, className, auditId) =>
      `✅ ${studentName} (${className}) को आज के लिए 'अनुपस्थित' (Absent) दर्ज कर दिया गया है। अभिभावक को एसएमएस अलर्ट भेज दिया गया है।\n\nसिम्युलेटेड ऑडिट आईडी: ${auditId}`,
    securityInjectionBlocked: '⚠️ प्रोटोटाइप सुरक्षा प्रदर्शन: सिस्टम निर्देश या क्रेडेंशियल निष्कर्षण का प्रयास रोका गया। कोर निर्देश और डेटाबेस स्कीमा सर्वर बाउंड्री के पीछे पूरी तरह सुरक्षित हैं।',
    rbacDenied: (userName, role) =>
      `❌ पहुँच अस्वीकृत (RBAC सिमुलेशन): खाता '${userName}' (${role.toUpperCase()}) के पास उपस्थिति संशोधित करने की अनुमति नहीं है। यह कार्य केवल अधिकृत शिक्षकों के लिए है।`,
    escalationOffer: (studentName, teacherName) =>
      `मैं समझ सकता हूँ। क्या आप चाहते हैं कि मैं ${studentName} के कक्षा अध्यापक श्री ${teacherName} के साथ कॉल अनुरोध (Callback Ticket) दर्ज करूँ?`,
    escalationConfirmed: (ticketId, teacherName, parentName) =>
      `✅ कॉल अनुरोध टिकट #${ticketId} दर्ज कर लिया गया है। ${teacherName} को अभिभावक ${parentName} से संपर्क करने हेतु सूचित कर दिया गया है।`,
    escalationCancelled: 'ठीक है। हम यहीं बातचीत जारी रखेंगे। मैं आपकी और क्या मदद कर सकता हूँ?',
    genericHelp: (role, name) =>
      `मैं AURA AI हूँ। आपकी भूमिका (${name} - ${role.toUpperCase()}) के अनुसार, मैं उपस्थिति, कक्षा रिपोर्ट, या स्कूल प्रबंधन से संपर्क में आपकी सहायता कर सकता हूँ।`,
    buttons: {
      rahulOption: { label: 'राहुल शर्मा', sublabel: 'कक्षा 10-A • रोल नं. 12' },
      priyaOption: { label: 'प्रिया शर्मा', sublabel: 'कक्षा 7-B • रोल नं. 24' },
    },
  },

  mr: {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    greetings: {
      student: 'नमस्कार आरव शर्मा! मी AURA AI, आपला शाळा सहाय्यक. आपण आपली उपस्थिती, वेळापत्रक किंवा गृहपाठाबद्दल विचारू शकता.',
      parent: 'नमस्कार सौ. सुनिता शर्मा! मी AURA AI. मी राहुल आणि प्रियाची उपस्थिती, प्रगती अहवाल किंवा शिक्षकांशी संपर्क साधण्यात मदत करू शकतो.',
      teacher: 'स्वागत आहे, विक्रम वर्मा सर! AURA AI शिक्षक पोर्टल तयार आहे. आपण इयत्ता १०-A ची उपस्थिती नोंदवू शकता किंवा अहवाल तपासू शकता.',
      principal: 'नमस्कार डॉ. अरविंद मेहता. AURA AI शाळा प्रशासनासाठी सज्ज आहे. आपण संपूर्ण शाळेची उपस्थिती आणि विश्लेषण पाहू शकता.',
    },
    clarificationQuestion: 'मला तुमची मदत करायला नक्कीच आवडेल! तुमचे दोन मुले नोंदणीकृत आहेत. आपण कोणत्या पाल्याची उपस्थिती तपासू इच्छिता?',
    clarificationPromptLabel: 'कृपया एक विद्यार्थी निवडा:',
    rahulAttendance: 'राहुल शर्मा (इयत्ता १०-A, रोल १२) ची सध्याची उपस्थिती ९१.२५% (91.25%) आहे, ज्यामध्ये ८० पैकी ७३ वर्गांना उपस्थिती आहे. आजची स्थिती: उपस्थित.',
    priyaAttendance: 'प्रिया शर्मा (इयत्ता ७-B, रोल २४) ची सध्याची उपस्थिती ९५.०% (95.0%) आहे, ज्यामध्ये ८० पैकी ७६ वर्गांना उपस्थिती आहे. आजची स्थिती: उपस्थित.',
    ownAttendance: 'आपली सध्याची उपस्थिती ९२.५% (92.5%) आहे. आपण एकूण ८० पैकी ७४ वर्गांना उपस्थित राहिला आहात. आपली उपस्थिती आवश्यकतेपेक्षा उत्तम आहे.',
    lastMonthAttendance: (studentName, className, pct, attended, total) =>
      `${studentName} (${className}) संदर्भानुसार: मागील महिन्यात त्यांची उपस्थिती ${pct}% होती, ज्यामध्ये ${total} पैकी ${attended} वर्गांना उपस्थिती होती.`,
    schoolWideAttendance: (rate, present, total, highest, lowest, classes) =>
      `आज संपूर्ण शाळेची सरासरी उपस्थिती ${rate}% आहे, ज्यामध्ये एकूण ${total} पैकी ${present} विद्यार्थी उपस्थित आहेत.\n\n• सर्वोच्च उपस्थिती: ${highest}\n• लक्ष देण्याची गरज: ${lowest}\n• स्थिती: ${classes} वर्ग नोंदणी समक्रमित.`,
    lowestAttendanceAnomaly: (grade, rate, section, reason) =>
      `${grade} मध्ये सध्या सर्वात कमी उपस्थिती (${rate}%) नोंदवली गेली आहे. मुख्य कारण तुकडी ${section} मधील फ्लू (${reason}) आहे.`,
    classTeacherSummary: (className, total, present, pct, absentList) =>
      `इयत्ता ${className} आजचा उपस्थिती सारांश:\n• एकूण विद्यार्थी: ${total}\n• उपस्थित: ${present} (${pct}%)\n• अनुपस्थित: ${absentList}\n• स्थिती: सर्व नोंदणी अद्ययावत.`,
    markAbsentSuccess: (studentName, className, auditId) =>
      `✅ ${studentName} (${className}) यांना आजसाठी 'अनुपस्थित' (Absent) नोंदवले आहे. पालकांना एसएमएस सूचना पाठवली आहे.\n\nऑडिट आयडी: ${auditId}`,
    securityInjectionBlocked: '⚠️ प्रोटोटाइप सुरक्षा प्रात्यक्षिक: सुरक्षिततेच्या नियमांनुसार अनधिकृत आज्ञा अडवली गेली आहे. अंतर्गत सिस्टम माहिती सुरक्षित आहे.',
    rbacDenied: (userName, role) =>
      `❌ परवानगी नाकारली (RBAC सिमुलेशन): '${userName}' (${role.toUpperCase()}) खात्याला उपस्थिती बदलण्याची परवानगी नाही. ही सुविधा केवळ शिक्षकांसाठी आहे.`,
    escalationOffer: (studentName, teacherName) =>
      `मी समजू शकतो. आपण ${studentName} चे वर्गशिक्षक श्री. ${teacherName} यांच्याशी फोनवर बोलण्यासाठी विनंती नोंदवू इच्छिता का?`,
    escalationConfirmed: (ticketId, teacherName, parentName) =>
      `✅ कॉल विनंती तिकीट #${ticketId} नोंदवले गेले आहे. ${teacherName} यांना पालक ${parentName} यांच्याशी संपर्क साधण्यासाठी सूचित केले आहे.`,
    escalationCancelled: 'समजले. आपण येथे संभाषण सुरू ठेवू शकतो. मी आणखी काय मदत करू?',
    genericHelp: (role, name) =>
      `मी AURA AI आहे. आपल्या भूमिकेनुसार (${name} - ${role.toUpperCase()}), मी उपस्थिती, वर्ग अहवाल आणि शाळा समन्वयामध्ये मदत करू शकतो.`,
    buttons: {
      rahulOption: { label: 'राहुल शर्मा', sublabel: 'इयत्ता १०-A • रोल नं. १२' },
      priyaOption: { label: 'प्रिया शर्मा', sublabel: 'इयत्ता ७-B • रोल नं. २४' },
    },
  },

  bn: {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    greetings: {
      student: 'নমস্কার আরভ শর্মা! আমি AURA AI, আপনার স্কুল সহকারী। আপনি আপনার উপস্থিতি, ক্লাসের সময়সূচী বা পড়াশোনা সম্পর্কে জানতে পারেন।',
      parent: 'নমস্কার শ্রীমতি সুনিতা শর্মা! আমি AURA AI। আমি রাহুল ও প্রিয়ার উপস্থিতি, ফলাফল বা শিক্ষকদের সাথে যোগাযোগের ব্যাপারে সাহায্য করতে পারি।',
      teacher: 'স্বাগতম, বিক্রম বর্মা মহাশয়! AURA AI শিক্ষক পোর্টাল প্রস্তুত। আপনি ক্লাস ১০-A এর উপস্থিতি নথিভুক্ত করতে পারেন।',
      principal: 'নমস্কার ডঃ অরবিন্দ মেহতা। AURA AI স্কুল প্রশাসনের জন্য সক্রিয়। আপনি স্কুলের সামগ্রিক উপস্থিতি ও রিপোর্ট দেখতে পারেন।',
    },
    clarificationQuestion: 'আমি আপনাকে সাহায্য করতে পেরে আনন্দিত হব! আপনার দুটি সন্তান নথিভুক্ত আছে। আপনি কোন সন্তানের উপস্থিতি দেখতে চান?',
    clarificationPromptLabel: 'অনুগ্রহ করে একজন শিক্ষার্থী নির্বাচন করুন:',
    rahulAttendance: 'রাহুল শর্মার (ক্লাস ১০-A, রোল ১২) বর্তমান উপস্থিতি ৯১.২৫% (91.25%), যেখানে ৮০টির মধ্যে ৭৩টি ক্লাসে সে উপস্থিত ছিল। আজকের স্থিতি: উপস্থিত।',
    priyaAttendance: 'প্রিয়া শর্মার (ক্লাস ৭-B, রোল ২৪) বর্তমান উপস্থিতি ৯৫.০% (95.0%), যেখানে ৮০টির মধ্যে ৭৬টি ক্লাসে সে উপস্থিত ছিল। আজকের স্থিতি: উপস্থিত।',
    ownAttendance: 'আপনার বর্তমান উপস্থিতি ৯২.৫% (92.5%)। আপনি মোট ৮০টি ক্লাসের মধ্যে ৭৪টি ক্লাসে উপস্থিত ছিলেন, যা নির্ধারিত ৭৫% এর চেয়ে বেশি।',
    lastMonthAttendance: (studentName, className, pct, attended, total) =>
      `${studentName} (${className}) এর প্রেক্ষাপটে: গত মাসে তার উপস্থিতি ছিল ${pct}%, যেখানে ${total}টি ক্লাসের মধ্যে ${attended}টিতে সে উপস্থিত ছিল।`,
    schoolWideAttendance: (rate, present, total, highest, lowest, classes) =>
      `আজ পুরো স্কুলের সামগ্রিক উপস্থিতি ${rate}%, যেখানে মোট ${total} জনের মধ্যে ${present} জন শিক্ষার্থী উপস্থিত।\n\n• সর্বোচ্চ উপস্থিতি: ${highest}\n• বিশেষ নজর প্রয়োজন: ${lowest}\n• স্থিতি: ${classes}টি ক্লাসের রিপোর্ট জমা হয়েছে।`,
    lowestAttendanceAnomaly: (grade, rate, section, reason) =>
      `${grade}-এ বর্তমানে সর্বনিম্ন উপস্থিতি (${rate}%) রেকর্ড করা হয়েছে। মূল কারণ সেকশন ${section}-এ ভাইরাল ফ্লু (${reason})।`,
    classTeacherSummary: (className, total, present, pct, absentList) =>
      `ক্লাস ${className} আজকের উপস্থিতি সারসংক্ষেপ:\n• মোট শিক্ষার্থী: ${total}\n• উপস্থিত: ${present} (${pct}%)\n• অনুপস্থিত: ${absentList}\n• স্থিতি: রেজিস্টার আপডেট সম্পন্ন।`,
    markAbsentSuccess: (studentName, className, auditId) =>
      `✅ ${studentName} (${className})-কে আজকের জন্য 'অনুপস্থিত' (Absent) হিসেবে চিহ্নিত করা হয়েছে। অভিভাবককে এসএমএস পাঠানো হয়েছে।\n\nঅডিট আইডি: ${auditId}`,
    securityInjectionBlocked: '⚠️ প্রোটোটাইপ সুরক্ষা প্রদর্শন: নিরাপত্তা নীতির কারণে সিস্টেমে অননুমোদিত নির্দেশ বা কী উত্তোলনের চেষ্টা প্রতিহত করা হয়েছে।',
    rbacDenied: (userName, role) =>
      `❌ অ্যাক্সেস অস্বীকৃত (RBAC সিমুলেশন): '${userName}' (${role.toUpperCase()}) অ্যাকাউন্টে উপস্থিতি পরিবর্তনের অনুমতি নেই।`,
    escalationOffer: (studentName, teacherName) =>
      `আমি বুঝতে পারছি। আপনি কি ${studentName}-এর শ্রেণি শিক্ষক শ্রী ${teacherName}-এর সাথে একটি কল রিকোয়েস্ট জমা দিতে চান?`,
    escalationConfirmed: (ticketId, teacherName, parentName) =>
      `✅ কল রিকোয়েস্ট টিকিট #${ticketId} সফলভাবে তৈরি হয়েছে। শিক্ষক ${teacherName}-কে অভিভাবক ${parentName}-এর সাথে কথা বলার বার্তা পাঠানো হয়েছে।`,
    escalationCancelled: 'বুঝেছি। আমরা এখানেই কথা চালিয়ে যেতে পারি। আপনাকে আর কীভাবে সাহায্য করতে পারি?',
    genericHelp: (role, name) =>
      `আমি AURA AI। আপনার ভূমিকা (${name} - ${role.toUpperCase()}) অনুযায়ী উপস্থিতি, ক্লাস রিপোর্ট বা স্কুলে যোগাযোগে সাহায্য করতে পারি।`,
    buttons: {
      rahulOption: { label: 'রাহুল শর্মা', sublabel: 'ক্লাস ১০-A • রোল নং ১২' },
      priyaOption: { label: 'প্রিয়া শর্মা', sublabel: 'ক্লাস ৭-B • রোল নং ২৪' },
    },
  },

  gu: {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    greetings: {
      student: 'નમસ્તે આરવ શર્મા! હું AURA AI છું, તમારો શાળા સહાયક. તમે તમારી હાજરી, સમયપત્રક અથવા અભ્યાસ વિશે પૂછી શકો છો.',
      parent: 'નમસ્તે શ્રીમતી સુનિતા શર્મા! હું AURA AI છું. હું રાહુલ અને પ્રિયાની હાજરી, પ્રગતિ અથવા શિક્ષકો સાથે સંપર્ક કરવામાં મદદ કરી શકું છું.',
      teacher: 'સ્વાગત છે, વિક્રમ વર્મા સાહેબ! AURA AI શિક્ષક પોર્ટલ તૈયાર છે. તમે ધોરણ ૧૦-A ની હાજરી નોંધી શકો છો.',
      principal: 'નમસ્તે ડૉ. અરવિંદ મહેતા. AURA AI શાળા વહીવટ માટે સક્રિય છે. તમે શાળા સ્તરની હાજરી અને વિશ્લેષણ જોઈ શકો છો.',
    },
    clarificationQuestion: 'મને તમને મદદ કરવામાં આનંદ થશે! તમારા બે બાળકો નોંધાયેલા છે. તમે કયા બાળકની હાજરી તપાસવા માંગો છો?',
    clarificationPromptLabel: 'કૃપા કરીને એક વિદ્યાર્થી પસંદ કરો:',
    rahulAttendance: 'રાહુલ શર્મા (ધોરણ ૧૦-A, રોલ નં. ૧૨) ની વર્તમાન હાજરી ૯૧.૨૫% (91.25%) છે, જેમાં ૮૦ માંથી ૭૩ વર્ગોમાં હાજરી છે. આજની સ્થિતિ: હાજર.',
    priyaAttendance: 'પ્રિયા શર્મા (ધોરણ ૭-B, રોલ નં. ૨૪) ની વર્તમાન હાજરી ૯૫.૦% (95.0%) છે, જેમાં ૮૦ માંથી ૭૬ વર્ગોમાં હાજરી છે. આજની સ્થિતિ: હાજર.',
    ownAttendance: 'તમારી વર્તમાન હાજરી ૯૨.૫% (92.5%) છે. તમે કુલ ૮૦ માંથી ૭૪ વર્ગોમાં હાજરી આપી છે, જે જરૂરી ૭૫% કરતાં વધુ છે.',
    lastMonthAttendance: (studentName, className, pct, attended, total) =>
      `${studentName} (${className}) ના સંદર્ભમાં: ગયા મહિને તેમની હાજરી ${pct}% હતી, જેમાં ${total} માંથી ${attended} વર્ગોમાં હાજરી હતી.`,
    schoolWideAttendance: (rate, present, total, highest, lowest, classes) =>
      `આજે સમગ્ર શાળાની સરેરાશ હાજરી ${rate}% છે, જેમાં કુલ ${total} માંથી ${present} વિદ્યાર્થીઓ હાજર છે.\n\n• સૌથી વધુ હાજરી: ${highest}\n• ધ્યાન આપવા યોગ્ય: ${lowest}\n• સ્થિતિ: ${classes} વર્ગોના અહેવાલ મળ્યા.`,
    lowestAttendanceAnomaly: (grade, rate, section, reason) =>
      `${grade} માં હાલમાં સૌથી ઓછી હાજરી (${rate}%) નોંધાઈ છે. મુખ્ય કારણ સેક્શન ${section} માં ફ્લૂ (${reason}) છે.`,
    classTeacherSummary: (className, total, present, pct, absentList) =>
      `ધોરણ ${className} આજનો હાજરી સારાંશ:\n• કુલ વિદ્યાર્થીઓ: ${total}\n• હાજર: ${present} (${pct}%)\n• ગેરહાજર: ${absentList}\n• સ્થિતિ: તમામ રજિસ્ટર અપડેટ છે.`,
    markAbsentSuccess: (studentName, className, auditId) =>
      `✅ ${studentName} (${className}) ને આજે 'ગેરહાજર' (Absent) તરીકે નોંધવામાં આવ્યા છે. વાલીને એસએમએસ મોકલવામાં આવ્યો છે.\n\nઓડિટ આઈડી: ${auditId}`,
    securityInjectionBlocked: '⚠️ પ્રોટોટાઇપ સુરક્ષા પ્રદર્શન: સુરક્ષા નીતિઓ હેઠળ આ વિનંતી રોકવામાં આવી છે. સિસ્ટમ સંવેદનશીલ ડેટા સંપૂર્ણ સુરક્ષિત છે.',
    rbacDenied: (userName, role) =>
      `❌ ઍક્સેસ નકારવામાં આવ્યો (RBAC સિમ્યુલેશન): '${userName}' (${role.toUpperCase()}) ખાતા પાસે હાજરી બદલવાની પરવાનગી નથી.`,
    escalationOffer: (studentName, teacherName) =>
      `હું સમજી શકું છું. શું તમે ${studentName} ના વર્ગ શિક્ષક શ્રી ${teacherName} સાથે કૉલ વિનંતી નોંધવા માંગો છો?`,
    escalationConfirmed: (ticketId, teacherName, parentName) =>
      `✅ કૉલ વિનંતી ટિકિટ #${ticketId} સફળતાપૂર્વક નોંધાઈ છે. શિક્ષક ${teacherName} ને વાલી ${parentName} સાથે વાત કરવા સૂચના મોકલાઈ છે.`,
    escalationCancelled: 'સમજાયું. આપણે અહીં વાતચીત ચાલુ રાખીશું. હું તમારી બીજી શું મદદ કરી શકું?',
    genericHelp: (role, name) =>
      `હું AURA AI છું. તમારી ભૂમિકા (${name} - ${role.toUpperCase()}) મુજબ હું હાજરી અને શાળા માહિતીમાં મદદ કરી શકું છું.`,
    buttons: {
      rahulOption: { label: 'રાહુલ શર્મા', sublabel: 'ધોરણ ૧૦-A • રોલ નં. ૧૨' },
      priyaOption: { label: 'પ્રિયા શર્મા', sublabel: 'ધોરણ ૭-B • રોલ નં. ૨૪' },
    },
  },

  pa: {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    greetings: {
      student: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਆਰਵ ਸ਼ਰਮਾ! ਮੈਂ AURA AI ਹਾਂ, ਤੁਹਾਡਾ ਸਕੂਲ ਸਹਾਇਕ। ਤੁਸੀਂ ਆਪਣੀ ਹਾਜ਼ਰੀ, ਸਮਾਂ-ਸਾਰਣੀ ਜਾਂ ਹੋਮਵਰਕ ਬਾਰੇ ਪੁੱਛ ਸਕਦੇ ਹੋ।',
      parent: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਸ੍ਰੀਮਤੀ ਸੁਨੀਤਾ ਸ਼ਰਮਾ! ਮੈਂ AURA AI ਹਾਂ। ਮੈਂ ਰਾਹੁਲ ਅਤੇ ਪ੍ਰਿਆ ਦੀ ਹਾਜ਼ਰੀ ਜਾਂ ਅਧਿਆਪਕਾਂ ਨਾਲ ਸੰਪਰਕ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ।',
      teacher: 'ਜੀ ਆਇਆਂ ਨੂੰ, ਵਿਕਰਮ ਵਰਮਾ ਜੀ! AURA AI ਅਧਿਆਪਕ ਪੋਰਟਲ ਤਿਆਰ ਹੈ। ਤੁਸੀਂ ਜਮਾਤ 10-A ਦੀ ਹਾਜ਼ਰੀ ਦਰਜ ਕਰ ਸਕਦੇ ਹੋ।',
      principal: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਡਾ. ਅਰਵਿੰਦ ਮਹਿਤਾ। AURA AI ਸਕੂਲ ਪ੍ਰਸ਼ਾਸਨ ਲਈ ਸਰਗਰਮ ਹੈ। ਤੁਸੀਂ ਸਕੂਲ ਪੱਧਰੀ ਹਾਜ਼ਰੀ ਦੇ ਵਿਸ਼ਲੇਸ਼ਣ ਦੇਖ ਸਕਦੇ ਹੋ।',
    },
    clarificationQuestion: 'ਮੈਨੂੰ ਤੁਹਾਡੀ ਮਦਦ ਕਰਨ ਵਿੱਚ ਖੁਸ਼ੀ ਹੋਵੇਗੀ! ਤੁਹਾਡੇ ਦੋ ਬੱਚੇ ਦਾਖਲ ਹਨ। ਤੁਸੀਂ ਕਿਸ ਬੱਚੇ ਦੀ ਹਾਜ਼ਰੀ ਦੇਖਣਾ ਚਾਹੁੰਦੇ ਹੋ?',
    clarificationPromptLabel: 'ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਵਿਦਿਆਰਥੀ ਚੁਣੋ:',
    rahulAttendance: 'ਰਾਹੁਲ ਸ਼ਰਮਾ (ਜਮਾਤ 10-A, ਰੋਲ ਨੰ. 12) ਦੀ ਮੌਜੂਦਾ ਹਾਜ਼ਰੀ 91.25% ਹੈ, ਜਿਸ ਵਿੱਚ 80 ਵਿੱਚੋਂ 73 ਕਲਾਸਾਂ ਵਿੱਚ ਹਾਜ਼ਰੀ ਹੈ। ਅੱਜ ਦੀ ਸਥਿਤੀ: ਹਾਜ਼ਰ।',
    priyaAttendance: 'ਪ੍ਰਿਆ ਸ਼ਰਮਾ (ਜਮਾਤ 7-B, ਰੋਲ ਨੰ. 24) ਦੀ ਮੌਜੂਦਾ ਹਾਜ਼ਰੀ 95.0% ਹੈ, ਜਿਸ ਵਿੱਚ 80 ਵਿੱਚੋਂ 76 ਕਲਾਸਾਂ ਵਿੱਚ ਹਾਜ਼ਰੀ ਹੈ। ਅੱਜ ਦੀ ਸਥਿਤੀ: ਹਾਜ਼ਰ।',
    ownAttendance: 'ਤੁਹਾਡੀ ਮੌਜੂਦਾ ਹਾਜ਼ਰੀ 92.5% ਹੈ। ਤੁਸੀਂ ਕੁੱਲ 80 ਵਿੱਚੋਂ 74 ਕਲਾਸਾਂ ਵਿੱਚ ਹਾਜ਼ਰ ਰਹੇ ਹੋ, ਜੋ ਕਿ ਲੋੜੀਂਦੀ 75% ਤੋਂ ਵੱਧ ਹੈ।',
    lastMonthAttendance: (studentName, className, pct, attended, total) =>
      `${studentName} (${className}) ਦੇ ਸੰਦਰਭ ਵਿੱਚ: ਪਿਛਲੇ ਮਹੀਨੇ ਉਨ੍ਹਾਂ ਦੀ ਹਾਜ਼ਰੀ ${pct}% ਸੀ, ਜਿਸ ਵਿੱਚ ${total} ਵਿੱਚੋਂ ${attended} ਕਲਾਸਾਂ ਸ਼ਾਮਲ ਸਨ।`,
    schoolWideAttendance: (rate, present, total, highest, lowest, classes) =>
      `ਅੱਜ ਪੂਰੇ ਸਕੂਲ ਦੀ ਔਸਤ ਹਾਜ਼ਰੀ ${rate}% ਹੈ, ਜਿਸ ਵਿੱਚ ਕੁੱਲ ${total} ਵਿੱਚੋਂ ${present} ਵਿਦਿਆਰਥੀ ਹਾਜ਼ਰ ਹਨ।\n\n• ਸਭ ਤੋਂ ਵੱਧ ਹਾਜ਼ਰੀ: ${highest}\n• ਧਿਆਨ ਦੇਣ ਯੋਗ: ${lowest}\n• ਸਥਿਤੀ: ${classes} ਜਮਾਤਾਂ ਦੀ ਰਿਪੋਰਟ ਦਰਜ।`,
    lowestAttendanceAnomaly: (grade, rate, section, reason) =>
      `${grade} ਵਿੱਚ ਇਸ ਸਮੇਂ ਸਭ ਤੋਂ ਘੱਟ ਹਾਜ਼ਰੀ (${rate}%) ਦਰਜ ਕੀਤੀ ਗਈ ਹੈ। ਮੁੱਖ ਕਾਰਨ ਸੈਕਸ਼ਨ ${section} ਵਿੱਚ ਫਲੂ (${reason}) ਹੈ।`,
    classTeacherSummary: (className, total, present, pct, absentList) =>
      `ਜਮਾਤ ${className} ਅੱਜ ਦਾ ਹਾਜ਼ਰੀ ਸਾਰ:\n• ਕੁੱਲ ਵਿਦਿਆਰਥੀ: ${total}\n• ਹਾਜ਼ਰ: ${present} (${pct}%)\n• ਗੈਰ-ਹਾਜ਼ਰ: ${absentList}\n• ਸਥਿਤੀ: ਸਾਰੇ ਰਜਿਸਟਰ ਅੱਪਡੇਟ ਹਨ।`,
    markAbsentSuccess: (studentName, className, auditId) =>
      `✅ ${studentName} (${className}) ਨੂੰ ਅੱਜ ਲਈ 'ਗੈਰ-ਹਾਜ਼ਰ' (Absent) ਦਰਜ ਕੀਤਾ ਗਿਆ ਹੈ। ਮਾਪਿਆਂ ਨੂੰ ਐਸਐਮਐਸ ਭੇਜ ਦਿੱਤਾ ਗਿਆ ਹੈ।\n\nਆਡਿਟ ਆਈਡੀ: ${auditId}`,
    securityInjectionBlocked: '⚠️ ਪ੍ਰੋਟੋਟਾਈਪ ਸੁਰੱਖਿਆ ਪ੍ਰਦਰਸ਼ਨ: ਸਿਸਟਮ ਸੁਰੱਖਿਆ ਨਿਯਮਾਂ ਤਹਿਤ ਇਹ ਬੇਨਤੀ ਰੋਕੀ ਗਈ ਹੈ। ਸਿਸਟਮ ਡਾਟਾ ਪੂਰੀ ਤਰ੍ਹਾਂ ਸੁਰੱਖਿਅਤ ਹੈ।',
    rbacDenied: (userName, role) =>
      `❌ ਪਹੁੰਚ ਤੋਂ ਇਨਕਾਰ (RBAC ਸਿਮੂਲੇਸ਼ਨ): ਖਾਤੇ '${userName}' (${role.toUpperCase()}) ਕੋਲ ਹਾਜ਼ਰੀ ਬਦਲਣ ਦੀ ਇਜਾਜ਼ਤ ਨਹੀਂ ਹੈ।`,
    escalationOffer: (studentName, teacherName) =>
      `ਮੈਂ ਸਮਝ ਸਕਦਾ ਹਾਂ। ਕੀ ਤੁਸੀਂ ${studentName} ਦੇ ਜਮਾਤ ਅਧਿਆਪਕ ਸ੍ਰੀ ${teacherName} ਨਾਲ ਕਾਲ ਬੇਨਤੀ ਦਰਜ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?`,
    escalationConfirmed: (ticketId, teacherName, parentName) =>
      `✅ ਕਾਲ ਬੇਨਤੀ ਟਿਕਟ #${ticketId} ਦਰਜ ਕਰ ਲਈ ਗਈ ਹੈ। ਅਧਿਆਪਕ ${teacherName} ਨੂੰ ਮਾਪੇ ${parentName} ਨਾਲ ਗੱਲ ਕਰਨ ਲਈ ਸੂਚਿਤ ਕਰ ਦਿੱਤਾ ਗਿਆ ਹੈ।`,
    escalationCancelled: 'ਸਮਝ ਗਿਆ। ਅਸੀਂ ਇੱਥੇ ਗੱਲਬਾਤ ਜਾਰੀ ਰੱਖਾਂਗੇ। ਮੈਂ ਤੁਹਾਡੀ ਹੋਰ ਕੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?',
    genericHelp: (role, name) =>
      `ਮੈਂ AURA AI ਹਾਂ। ਤੁਹਾਡੀ ਭੂਮਿਕਾ (${name} - ${role.toUpperCase()}) ਮੁਤਾਬਕ ਮੈਂ ਹਾਜ਼ਰੀ ਅਤੇ ਸਕੂਲ ਜਾਣਕਾਰੀ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ।`,
    buttons: {
      rahulOption: { label: 'ਰਾਹੁਲ ਸ਼ਰਮਾ', sublabel: 'ਜਮਾਤ 10-A • ਰੋਲ ਨੰ. 12' },
      priyaOption: { label: 'ਪ੍ਰਿਆ ਸ਼ਰਮਾ', sublabel: 'ਜਮਾਤ 7-B • ਰੋਲ ਨੰ. 24' },
    },
  },

  ml: {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    greetings: {
      student: 'നമസ്കാരം ആരവ് ശർമ്മ! ഞാൻ AURA AI, നിങ്ങളുടെ സ്കൂൾ അസിസ്റ്റന്റ്. ഹാജർനില, ടൈംടേബിൾ അല്ലെങ്കിൽ ക്ലാസ് വിവരങ്ങൾ ചോദിക്കാം.',
      parent: 'നമസ്കാരം സുനിത ശർമ്മ! ഞാൻ AURA AI. രാഹുലിന്റെയും പ്രിയയുടെയും ഹാജർ, പുരോഗതി അല്ലെങ്കിൽ അധ്യാപകരുമായി ബന്ധപ്പെടാൻ ഞാൻ സഹായിക്കാം.',
      teacher: 'സ്വാഗതം, വിക്രം വർമ്മ സാർ! AURA AI അധ്യാപക പോർട്ടൽ തയ്യാറാണ്. ക്ലാസ് 10-A യുടെ ഹാജർ രേഖപ്പെടുത്താം.',
      principal: 'നമസ്കാരം ഡോ. അരവിന്ദ് മേത്ത. AURA AI സ്കൂൾ അഡ്മിനിസ്ട്രേഷനായി സജീവമാണ്. സ്കൂൾ തലത്തിലുള്ള ഹാജർ വിശകലനം കാണാം.',
    },
    clarificationQuestion: 'നിങ്ങളെ സഹായിക്കുന്നതിൽ എനിക്ക് സന്തോഷമുണ്ട്! നിങ്ങളുടെ രണ്ട് കുട്ടികൾ രജിസ്റ്റർ ചെയ്തിട്ടുണ്ട്. ഏത് കുട്ടിയുടെ ഹാജർ വിവരങ്ങളാണ് പരിശോധിക്കേണ്ടത്?',
    clarificationPromptLabel: 'ദയവായി ഒരു വിദ്യാർത്ഥിയെ തിരഞ്ഞെടുക്കുക:',
    rahulAttendance: 'രാഹുൽ ശർമ്മയ്ക്ക് (ക്ലാസ് 10-A, റോൾ 12) നിലവിൽ 91.25% ഹാജരുണ്ട്, ഈ ടേമിൽ 80 ക്ലാസുകളിൽ 73 എണ്ണത്തിൽ പങ്കെടുത്തു. ഇന്നത്തെ നില: ഹാജർ.',
    priyaAttendance: 'പ്രിയ ശർമ്മയ്ക്ക് (ക്ലാസ് 7-B, റോൾ 24) നിലവിൽ 95.0% ഹാജരുണ്ട്, ഈ ടേമിൽ 80 ക്ലാസുകളിൽ 76 എണ്ണത്തിൽ പങ്കെടുത്തു. ഇന്നത്തെ നില: ഹാജർ.',
    ownAttendance: 'നിങ്ങളുടെ നിലവിലെ ഹാജർ 92.5% ആണ്. 80 ക്ലാസുകളിൽ 74 എണ്ണത്തിലും നിങ്ങൾ പങ്കെടുത്തു. ഇത് ആവശ്യമായ 75 ശതമാനത്തേക്കാൾ കൂടുതലാണ്.',
    lastMonthAttendance: (studentName, className, pct, attended, total) =>
      `${studentName} (${className}) സംബന്ധിച്ച്: കഴിഞ്ഞ മാസത്തിൽ ഹാജർ ${pct}% ആയിരുന്നു, ${total} ക്ലാസുകളിൽ ${attended} എണ്ണത്തിൽ പങ്കെടുത്തു.`,
    schoolWideAttendance: (rate, present, total, highest, lowest, classes) =>
      `ഇന്ന് സ്കൂളിലെ ആകെ ഹാജർ നില ${rate}% ആണ്. ആകെ ${total} വിദ്യാർത്ഥികളിൽ ${present} പേർ ഇന്ന് ഹാജരുണ്ട്.\n\n• ഏറ്റവും ഉയർന്ന ഹാജർ: ${highest}\n• ശ്രദ്ധിക്കേണ്ടത്: ${lowest}\n• നില: ${classes} ക്ലാസുകൾ സമന്വയിപ്പിച്ചു.`,
    lowestAttendanceAnomaly: (grade, rate, section, reason) =>
      `${grade}-ലാണ് നിലവിൽ ഏറ്റവും കുറഞ്ഞ ഹാജർ (${rate}%) രേഖപ്പെടുത്തിയിട്ടുള്ളത്. പ്രധാന കാരണം സെക്ഷൻ ${section}-ലെ പനി ബാധയാണ് (${reason}).`,
    classTeacherSummary: (className, total, present, pct, absentList) =>
      `ക്ലാസ് ${className} ഇന്നത്തെ ഹാജർ വിവരങ്ങൾ:\n• ആകെ കുട്ടികൾ: ${total}\n• ഹാജരായവർ: ${present} (${pct}%)\n• ഹാജരാകാത്തവർ: ${absentList}\n• നില: രജിസ്റ്റർ അപ്ഡേറ്റാണ്.`,
    markAbsentSuccess: (studentName, className, auditId) =>
      `✅ ${studentName} (${className}) നെ ഇന്ന് 'അഭാവം' (Absent) ആയി രേഖപ്പെടുത്തി. രക്ഷിതാവിന് എസ്എംഎസ് അയച്ചു.\n\nഓഡിറ്റ് ഐഡി: ${auditId}`,
    securityInjectionBlocked: '⚠️ പ്രോട്ടോടൈപ്പ് സുരക്ഷാ പ്രദർശനം: സുരക്ഷാ നയങ്ങൾ പാലിച്ച് ഈ അഭ്യർത്ഥന തടഞ്ഞു. സിസ്റ്റം വിവരങ്ങൾ പൂർണ്ണ സുരക്ഷിതമാണ്.',
    rbacDenied: (userName, role) =>
      `❌ അനുമതി നിരസിച്ചു (RBAC സിമുലേഷൻ): '${userName}' (${role.toUpperCase()}) അക്കൗണ്ടിന് ഹാജർ മാറ്റാൻ അനുമതിയില്ല.`,
    escalationOffer: (studentName, teacherName) =>
      `എനിക്ക് മനസ്സിലായി. ${studentName}-ന്റെ ക്ലാസ് ടീച്ചർ ശ്രീ ${teacherName}-മായി സംസാരിക്കാൻ ഒരു കോൾ അഭ്യർത്ഥന സമർപ്പിക്കണമെന്നുണ്ടോ?`,
    escalationConfirmed: (ticketId, teacherName, parentName) =>
      `✅ കോൾ അഭ്യർത്ഥന ടിക്കറ്റ് #${ticketId} രജിസ്റ്റർ ചെയ്തു. രക്ഷിതാവ് ${parentName}-മായി ബന്ധപ്പെടാൻ ടീച്ചർ ${teacherName}-ന് സന്ദേശം നൽകി.`,
    escalationCancelled: 'ശരി, നമ്മൾക്ക് ഇവിടെ സംസാരിക്കാം. മറ്റെങ്ങനെയാണ് ഞാൻ സഹായിക്കേണ്ടത്?',
    genericHelp: (role, name) =>
      `ഞാൻ AURA AI ആണ്. നിങ്ങളുടെ റോൾ (${name} - ${role.toUpperCase()}) അടിസ്ഥാനമാക്കി ഹാജർ വിവരങ്ങളിലും സ്കൂൾ കാര്യങ്ങളിലും സഹായിക്കാൻ എനിക്ക് കഴിയും.`,
    buttons: {
      rahulOption: { label: 'രാഹുൽ ശർമ്മ', sublabel: 'ക്ലാസ് 10-A • റോൾ നമ്പർ 12' },
      priyaOption: { label: 'പ്രിയ ശർമ്മ', sublabel: 'ക്ലാസ് 7-B • റോൾ നമ്പർ 24' },
    },
  },

  ur: {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    greetings: {
      student: 'آداب آرو شرما! میں AURA AI ہوں، آپ کا اسکول اسسٹنٹ۔ آپ اپنی حاضری، ٹائم ٹیبل یا ہوم ورک کے بارے میں معلوم کر سکتے ہیں۔',
      parent: 'آداب محترمہ سنیتا شرما! میں AURA AI ہوں۔ میں راہل اور پریا کی حاضری یا اساتذہ سے رابطے میں آپ کی مدد کر سکتا ہوں۔',
      teacher: 'خوش آمدید، وکرم ورما صاحب! AURA AI ٹیچر پورٹل تیار ہے۔ آپ کلاس 10-A کی حاضری درج کر سکتے ہیں۔',
      principal: 'آداب ڈاکٹر اروند مہتا۔ AURA AI اسکول انتظامیہ کے لیے فعال ہے۔ آپ اسکول کی حاضری اور رپورٹس دیکھ سکتے ہیں۔',
    },
    clarificationQuestion: 'مجھے آپ کی مدد کرنے میں خوشی ہوگی! آپ کے دو بچے درج ہیں۔ آپ کس بچے کی حاضری معلوم کرنا چاہتے ہیں؟',
    clarificationPromptLabel: 'براہ کرم ایک طالب علم منتخب کریں:',
    rahulAttendance: 'راہل شرما (کلاس 10-A، رول نمبر 12) کی موجودہ حاضری 91.25 فیصد ہے، جس میں 80 میں سے 73 کلاسز میں حاضری رہی ہے۔ آج کی حالت: حاضر۔',
    priyaAttendance: 'پریا شرما (کلاس 7-B، رول نمبر 24) کی موجودہ حاضری 95.0 فیصد ہے، جس میں 80 میں سے 76 کلاسز میں حاضری رہی ہے۔ آج کی حالت: حاضر۔',
    ownAttendance: 'آپ کی موجودہ حاضری 92.5 فیصد ہے۔ آپ نے 80 میں سے 74 کلاسز لی ہیں، جو لازمی 75 فیصد سے زائد ہے۔',
    lastMonthAttendance: (studentName, className, pct, attended, total) =>
      `${studentName} (${className}) کے حوالے سے: پچھلے مہینے ان کی حاضری ${pct}% تھی، جس میں ${total} میں سے ${attended} کلاسز میں حاضری تھی۔`,
    schoolWideAttendance: (rate, present, total, highest, lowest, classes) =>
      `آج اسکول بھر کی اوسط حاضری ${rate}% ہے، جہاں کل ${total} میں سے ${present} طلباء حاضر ہیں۔\n\n• بہترین حاضری: ${highest}\n• توجہ طلب: ${lowest}\n• کیفیت: ${classes} کلاسز کی رپورٹ درج۔`,
    lowestAttendanceAnomaly: (grade, rate, section, reason) =>
      `${grade} میں فی الوقت سب سے کم حاضری (${rate}%) درج کی گئی ہے۔ اہم وجہ سیکشن ${section} میں فلو (${reason}) ہے۔`,
    classTeacherSummary: (className, total, present, pct, absentList) =>
      `کلاس ${className} کی آج کی حاضری کا خلاصہ:\n• کل طلباء: ${total}\n• حاضر: ${present} (${pct}%)\n• غیر حاضر: ${absentList}\n• کیفیت: تمام رجسٹر ہم آہنگ ہیں۔`,
    markAbsentSuccess: (studentName, className, auditId) =>
      `✅ ${studentName} (${className}) کو آج 'غیر حاضر' (Absent) درج کر دیا گیا ہے۔ والدین کو ایس ایم ایس بھیج دیا گیا ہے۔\n\nآڈٹ آئی ڈی: ${auditId}`,
    securityInjectionBlocked: '⚠️ پروٹو ٹائپ سیکیورٹی نمائش: سیکیورٹی اصولوں کے تحت یہ درخواست مسترد کر دی گئی ہے۔ سسٹم ڈیٹا مکمل محفوظ ہے۔',
    rbacDenied: (userName, role) =>
      `❌ رسائی مسترد (RBAC سمولیشن): اکاؤنٹ '${userName}' (${role.toUpperCase()}) کے پاس حاضری تبدیل کرنے کا اختیار نہیں ہے۔`,
    escalationOffer: (studentName, teacherName) =>
      `میں سمجھ سکتا ہوں۔ کیا آپ چاہتے ہیں کہ میں ${studentName} کے کلاس ٹیچر مسٹر ${teacherName} کے ساتھ رابطہ کی درخواست درج کروں؟`,
    escalationConfirmed: (ticketId, teacherName, parentName) =>
      `✅ رابطہ کی درخواست #${ticketId} درج کر لی گئی ہے۔ استاد ${teacherName} کو والدین ${parentName} سے بات کرنے کی اطلاع بھیج دی گئی ہے۔`,
    escalationCancelled: 'سمجھ گیا۔ ہم یہاں گفتگو جاری رکھیں گے۔ میں آپ کی مزید کیا مدد کر سکتا ہوں؟',
    genericHelp: (role, name) =>
      `میں AURA AI ہوں۔ آپ کے کردار (${name} - ${role.toUpperCase()}) کے مطابق میں حاضری اور اسکول معلومات میں مدد فراہم کر سکتا ہوں۔`,
    buttons: {
      rahulOption: { label: 'راہل شرما', sublabel: 'کلاس 10-A • رول نمبر 12' },
      priyaOption: { label: 'پریا شرما', sublabel: 'کلاس 7-B • رول نمبر 24' },
    },
  },

  ta: {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    greetings: {
      student: 'வணக்கம் ஆரவ் சர்மா! நான் AURA AI, உங்கள் பள்ளி உதவியாளர். உங்கள் வருகைப்பதிவு, கால அட்டவணை அல்லது பாடங்கள் பற்றி கேட்கலாம்.',
      parent: 'வணக்கம் திருமதி சுனிதா சர்மா! நான் AURA AI. ராகுல் மற்றும் பிரியாவின் வருகை, முன்னேற்றம் அல்லது ஆசிரியர்களை தொடர்பு கொள்ள உதவ முடியும்.',
      teacher: 'வணக்கம் விக்ரம் வர்மா ஐயா! AURA AI ஆசிரியர் தளம் தயார். வகுப்பு 10-A வருகையை பதிவு செய்யலாம்.',
      principal: 'வணக்கம் டாக்டர் அரவிந்த் மேத்தா. AURA AI பள்ளி நிர்வாகத்திற்கு தயாராக உள்ளது. பள்ளி அளவிலான வருகை பகுப்பாய்வை பார்க்கலாம்.',
    },
    clarificationQuestion: 'உங்களுக்கு உதவுவதில் மகிழ்ச்சி! உங்கள் இரண்டு குழந்தைகள் பதிவு செய்யப்பட்டுள்ளனர். எந்த குழந்தையின் வருகைப் பதிவை பார்க்க விரும்புகிறீர்கள்?',
    clarificationPromptLabel: 'தயவுசெய்து ஒரு மாணவரைத் தேர்ந்தெடுக்கவும்:',
    rahulAttendance: 'ராகுல் சர்மாவின் (வகுப்பு 10-A, எண் 12) தற்போதைய வருகைப் பதிவு 91.25% ஆகும், 80 வகுப்புகளில் 73 வகுப்புகளில் கலந்து கொண்டுள்ளார். இன்றைய நிலை: வருகை.',
    priyaAttendance: 'பிரியா சர்மாவின் (வகுப்பு 7-B, எண் 24) தற்போதைய வருகைப் பதிவு 95.0% ஆகும், 80 வகுப்புகளில் 76 வகுப்புகளில் கலந்து கொண்டுள்ளார். இன்றைய நிலை: வருகை.',
    ownAttendance: 'உங்கள் தற்போதைய வருகைப்பதிவு 92.5% ஆகும். நீங்கள் 80 வகுப்புகளில் 74 வகுப்புகளில் கலந்துகொண்டுள்ளீர்கள்.',
    lastMonthAttendance: (studentName, className, pct, attended, total) =>
      `${studentName} (${className}) சார்பாக: கடந்த மாதத்தில் அவர்களின் வருகைப் பதிவு ${pct}% ஆகும் (${total} வகுப்புகளில் ${attended} வகுப்புகள்).`,
    schoolWideAttendance: (rate, present, total, highest, lowest, classes) =>
      `இன்று பள்ளி அளவிலான மொத்த வருகைப் பதிவு ${rate}% ஆகும், ${total} மாணவர்களில் ${present} பேர் வருகை தந்துள்ளனர்.\n\n• அதிகபட்ச வருகை: ${highest}\n• கவனிக்க வேண்டியது: ${lowest}\n• நிலை: ${classes} வகுப்புகள் பதிவு செய்யப்பட்டுள்ளன.`,
    lowestAttendanceAnomaly: (grade, rate, section, reason) =>
      `${grade}-ல் தற்போது குறைந்த வருகைப்பதிவு (${rate}%) பதிவாகியுள்ளது. முக்கிய காரணம் பிரிவு ${section}-ல் காய்ச்சல் பாதிப்பு (${reason}).`,
    classTeacherSummary: (className, total, present, pct, absentList) =>
      `வகுப்பு ${className} இன்றைய வருகை சுருக்கம்:\n• மொத்த மாணவர்கள்: ${total}\n• வருகை: ${present} (${pct}%)\n• வராதவர்கள்: ${absentList}\n• நிலை: பதிவேடுகள் புதுப்பிக்கப்பட்டுள்ளன.`,
    markAbsentSuccess: (studentName, className, auditId) =>
      `✅ ${studentName} (${className}) இன்று 'வராதவர்' (Absent) என பதிவு செய்யப்பட்டார். பெற்றோருக்கு எஸ்எம்எஸ் அனுப்பப்பட்டுள்ளது.\n\nதணிக்கை ஐடி: ${auditId}`,
    securityInjectionBlocked: '⚠️ முன்மாதிரி பாதுகாப்பு மாதிரி: பாதுகாப்பு விதிகளின்படி இந்த கோரிக்கை தடுக்கப்பட்டுள்ளது. கணினி தரவு பாதுகாப்பானது.',
    rbacDenied: (userName, role) =>
      `❌ அணுகல் மறுக்கப்பட்டது (RBAC மாதிரி): '${userName}' (${role.toUpperCase()}) கணக்கிற்கு வருகை மாற்ற அனுமதி இல்லை.`,
    escalationOffer: (studentName, teacherName) =>
      `நான் புரிந்து கொள்கிறேன். ${studentName}-ன் வகுப்பு ஆசிரியர் திரு ${teacherName}-உடன் தொலைபேசி அழைப்பு கோரிக்கையை சமர்ப்பிக்க விரும்புகிறீர்களா?`,
    escalationConfirmed: (ticketId, teacherName, parentName) =>
      `✅ அழைப்பு கோரிக்கை எண் #${ticketId} பதிவு செய்யப்பட்டது. ஆசிரியர் ${teacherName}-க்கு பெற்றோர் ${parentName}-உடன் பேச அறிவிப்பு அனுப்பப்பட்டுள்ளது.`,
    escalationCancelled: 'சரி, நாம் இங்கேயே உரையாடலைத் தொடரலாம். வேறு எப்படி உதவ வேண்டும்?',
    genericHelp: (role, name) =>
      `நான் AURA AI. உங்கள் பங்கு (${name} - ${role.toUpperCase()}) அடிப்படையில் வருகைப் பதிவு மற்றும் பள்ளி தகவல்களில் உதவ முடியும்.`,
    buttons: {
      rahulOption: { label: 'ராகுல் சர்மா', sublabel: 'வகுப்பு 10-A • எண் 12' },
      priyaOption: { label: 'பிரியா சர்மா', sublabel: 'வகுப்பு 7-B • எண் 24' },
    },
  },

  te: {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    greetings: {
      student: 'నమస్కారం ఆరవ్ శర్మ! నేను AURA AI, మీ పాఠశాల సహాయకుడిని. మీ హాజరు, టైమ్‌టేబుల్ లేదా పాఠాల గురించి అడగవచ్చు.',
      parent: 'నమస్కారం సునీతా శర్మ గారు! నేను AURA AI. రాహుల్ మరియు ప్రియాల హాజరు, పురోగతి లేదా ఉపాధ్యాయులతో మాట్లాడటానికి సహాయపడగలను.',
      teacher: 'స్వాగతం విక్రమ్ వర్మ గారు! AURA AI ఉపాధ్యాయ పోర్టల్ సిద్ధంగా ఉంది. మీరు క్లాస్ 10-A హాజరును నమోదు చేయవచ్చు.',
      principal: 'నమస్కారం డాక్టర్ అరవింద్ మెహతా గారు. AURA AI పాఠశాల పరిపాలన కోసం సిద్ధంగా ఉంది. పాఠశాల హాజరు విశ్లేషణను చూడవచ్చు.',
    },
    clarificationQuestion: 'మీకు సహాయం చేయడానికి సంతోషంగా ఉంది! మీ ఇద్దరు పిల్లలు నమోదై ఉన్నారు. మీరు ఏ పిల్లల హాజరును చూడాలనుకుంటున్నారు?',
    clarificationPromptLabel: 'దయచేసి ఒక విద్యార్థిని ఎంచుకోండి:',
    rahulAttendance: 'రాహుల్ శర్మ (క్లాస్ 10-A, రోల్ నం. 12) ప్రస్తుత హాజరు 91.25%, ఈ టర్మ్‌లో 80 తరగతులలో 73 తరగతులకు హాజరయ్యారు. నేటి స్థితి: హాజరు.',
    priyaAttendance: 'ప్రియా శర్మ (క్లాస్ 7-B, రోల్ నం. 24) ప్రస్తుత హాజరు 95.0%, ఈ టర్మ్‌లో 80 తరగతులలో 76 తరగతులకు హాజరయ్యారు. నేటి స్థితి: హాజరు.',
    ownAttendance: 'మీ ప్రస్తుత హాజరు 92.5%. మీరు మొత్తం 80 తరగతులలో 74 తరగతులకు హాజరయ్యారు, ఇది అవసరమైన 75% కంటే ఎక్కువ.',
    lastMonthAttendance: (studentName, className, pct, attended, total) =>
      `${studentName} (${className}) సందర్భం: గత నెలలో వారి హాజరు ${pct}% (${total} తరగతులలో ${attended} తరగతులు).`,
    schoolWideAttendance: (rate, present, total, highest, lowest, classes) =>
      `ఈ రోజు మొత్తం పాఠశాల హాజరు ${rate}%, ${total} విద్యార్థులలో ${present} మంది హాజరయ్యారు.\n\n• అత్యధిక హాజరు: ${highest}\n• శ్రద్ధ వహించాల్సినది: ${lowest}\n• స్థితి: ${classes} తరగతులు సమకాలీకరించబడ్డాయి.`,
    lowestAttendanceAnomaly: (grade, rate, section, reason) =>
      `${grade} లో ప్రస్తుతం అతి తక్కువ హాజరు (${rate}%) నమోదైంది. ప్రధాన కారణం సెక్షన్ ${section} లో ఫ్లూ (${reason}).`,
    classTeacherSummary: (className, total, present, pct, absentList) =>
      `క్లాస్ ${className} నేటి హాజరు సారాంశం:\n• మొత్తం విద్యార్థులు: ${total}\n• హాజరైనవారు: ${present} (${pct}%)\n• రానివారు: ${absentList}\n• స్థితి: రిజిస్టర్లు నవీకరించబడ్డాయి.`,
    markAbsentSuccess: (studentName, className, auditId) =>
      `✅ ${studentName} (${className}) ఈ రోజు 'రాలేదు' (Absent) అని నమోదు చేయబడింది. తల్లిదండ్రులకు ఎస్ఎంఎస్ పంపబడింది.\n\nఆడిట్ ఐడి: ${auditId}`,
    securityInjectionBlocked: '⚠️ ప్రోటోటైప్ సెక్యూరిటీ ప్రదర్శన: భద్రతా నిబంధనల ప్రకారం ఈ అభ్యర్థన నిరోధించబడింది. సిస్టమ్ సమాచారం సురక్షితంగా ఉంది.',
    rbacDenied: (userName, role) =>
      `❌ యాక్సెస్ నిరాకరించబడింది (RBAC అనుకరణ): '${userName}' (${role.toUpperCase()}) ఖాతాకు హాజరును సవరించే అనుమతి లేదు.`,
    escalationOffer: (studentName, teacherName) =>
      `నేను అర్థం చేసుకున్నాను. మీరు ${studentName} తరగతి ఉపాధ్యాయుడు శ్రీ ${teacherName} తో కాల్ అభ్యర్థనను సమర్పించాలనుకుంటున్నారా?`,
    escalationConfirmed: (ticketId, teacherName, parentName) =>
      `✅ కాల్ అభ్యర్థన టికెట్ #${ticketId} నమోదైంది. తల్లిదండ్రులు ${parentName} తో మాట్లాడటానికి ఉపాధ్యాయుడు ${teacherName} కి సమాచారం పంపబడింది.`,
    escalationCancelled: 'అర్థమైంది. మనం ఇక్కడే సంభాషణను కొనసాగిద్దాం. నేను ఇంకేవిధంగా సహాయపడగలను?',
    genericHelp: (role, name) =>
      `నేను AURA AI. మీ పాత్ర (${name} - ${role.toUpperCase()}) ఆధారంగా హాజరు మరియు పాఠశాల సమాచారంలో నేను మీకు సహాయపడగలను.`,
    buttons: {
      rahulOption: { label: 'రాహుల్ శర్మ', sublabel: 'క్లాస్ 10-A • రోల్ నం. 12' },
      priyaOption: { label: 'ప్రియా శర్మ', sublabel: 'క్లాస్ 7-B • రోల్ నం. 24' },
    },
  },

  kn: {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    greetings: {
      student: 'ನಮಸ್ಕಾರ ಆರವ್ ಶರ್ಮಾ! ನಾನು AURA AI, ನಿಮ್ಮ ಶಾಲಾ ಸಹಾಯಕ. ನಿಮ್ಮ ಹಾಜರಾತಿ, ವೇಳಾಪಟ್ಟಿ ಅಥವಾ ತರಗತಿ ಮಾಹಿತಿ ಕೇಳಬಹುದು.',
      parent: 'ನಮಸ್ಕಾರ ಶ್ರೀಮತಿ ಸುನೀತಾ ಶರ್ಮಾ! ನಾನು AURA AI. ರಾಹುಲ್ ಮತ್ತು ಪ್ರಿಯಾ ಅವರ ಹಾಜರಾತಿ, ಪ್ರಗತಿ ಅಥವಾ ಶಿಕ್ಷಕರನ್ನು ಸಂಪರ್ಕಿಸಲು ನಾನು ಸಹಾಯ ಮಾಡಬಲ್ಲೆ.',
      teacher: 'ಸ್ವಾಗತ ವಿಕ್ರಮ್ ವರ್ಮಾ ಸರ್! AURA AI ಶಿಕ್ಷಕರ ಪೋರ್ಟಲ್ ಸಿದ್ಧವಾಗಿದೆ. ನೀವು ತರಗತಿ 10-A ಹಾಜರಾತಿಯನ್ನು ದಾಖಲಿಸಬಹುದು.',
      principal: 'ನಮಸ್ಕಾರ ಡಾ. ಅರವಿಂದ ಮೆಹ್ತಾ. AURA AI ಶಾಲಾ ಆಡಳಿತಕ್ಕಾಗಿ ಸಕ್ರಿಯವಾಗಿದೆ. ಶಾಲೆಯ ಹಾಜರಾತಿ ವಿಶ್ಲೇಷಣೆ ನೋಡಬಹುದು.',
    },
    clarificationQuestion: 'ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ನನಗೆ ಸಂತೋಷವಾಗುತ್ತದೆ! ನಿಮ್ಮ ಇಬ್ಬರು ಮಕ್ಕಳು ದಾಖಲಾಗಿದ್ದಾರೆ. ನೀವು ಯಾವ ಮಗುವಿನ ಹಾಜರಾತಿಯನ್ನು ಪರಿಶೀಲಿಸಲು ಬಯಸುತ್ತೀರಿ?',
    clarificationPromptLabel: 'ದಯವಿಟ್ಟು ಒಬ್ಬ ವಿದ್ಯಾರ್ಥಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:',
    rahulAttendance: 'ರಾಹುಲ್ ಶರ್ಮಾ (ತರಗತಿ 10-A, ರೋಲ್ ನಂ. 12) ಅವರ ಪ್ರಸ್ತುತ ಹಾಜರಾತಿ 91.25% ಆಗಿದೆ, 80 ತರಗತಿಗಳಲ್ಲಿ 73 ತರಗತಿಗಳಿಗೆ ಹಾಜರಾಗಿದ್ದಾರೆ. ಇಂದಿನ ಸ್ಥಿತಿ: ಹಾಜರಿದ್ದಾರೆ.',
    priyaAttendance: 'ಪ್ರಿಯಾ ಶರ್ಮಾ (ತರಗತಿ 7-B, ರೋಲ್ ನಂ. 24) ಅವರ ಪ್ರಸ್ತುತ ಹಾಜರಾತಿ 95.0% ಆಗಿದೆ, 80 ತರಗತಿಗಳಲ್ಲಿ 76 ತರಗತಿಗಳಿಗೆ ಹಾಜರಾಗಿದ್ದಾರೆ. ಇಂದಿನ ಸ್ಥಿತಿ: ಹಾಜರಿದ್ದಾರೆ.',
    ownAttendance: 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಹಾಜರಾತಿ 92.5% ಆಗಿದೆ. ನೀವು ಒಟ್ಟು 80 ತರಗತಿಗಳಲ್ಲಿ 74 ತರಗತಿಗಳಿಗೆ ಹಾಜರಾಗಿದ್ದೀರಿ, ಇದು ಅಗತ್ಯವಿರುವ 75% ಗಿಂತ ಹೆಚ್ಚಾಗಿದೆ.',
    lastMonthAttendance: (studentName, className, pct, attended, total) =>
      `${studentName} (${className}) ಅವರ ವಿವರ: ಕಳೆದ ತಿಂಗಳಲ್ಲಿ ಅವರ ಹಾಜರಾತಿ ${pct}% ಇತ್ತು (${total} ರಲ್ಲಿ ${attended} ತರಗತಿಗಳು).`,
    schoolWideAttendance: (rate, present, total, highest, lowest, classes) =>
      `ಇಂದು ಶಾಲೆಯ ಒಟ್ಟಾರೆ ಹಾಜರಾತಿ ${rate}% ಆಗಿದೆ, ${total} ವಿದ್ಯಾರ್ಥಿಗಳಲ್ಲಿ ${present} ವಿದ್ಯಾರ್ಥಿಗಳು ಹಾಜರಿದ್ದಾರೆ.\n\n• ಗರಿಷ್ಠ ಹಾಜರಾತಿ: ${highest}\n• ಗಮನಿಸಬೇಕಾದದ್ದು: ${lowest}\n• ಸ್ಥಿತಿ: ${classes} ತರಗತಿಗಳು ನವೀಕರಿಸಲಾಗಿದೆ.`,
    lowestAttendanceAnomaly: (grade, rate, section, reason) =>
      `${grade} ನಲ್ಲಿ ಪ್ರಸ್ತುತ ಕಡಿಮೆ ಹಾಜರಾತಿ (${rate}%) ದಾಖಲಾಗಿದೆ. ಪ್ರಮುಖ ಕಾರಣ ವಿಭಾಗ ${section} ನಲ್ಲಿ ಜ್ವರ (${reason}).`,
    classTeacherSummary: (className, total, present, pct, absentList) =>
      `ತರಗತಿ ${className} ಇಂದಿನ ಹಾಜರಾತಿ ಸಾರಾಂಶ:\n• ಒಟ್ಟು ವಿದ್ಯಾರ್ಥಿಗಳು: ${total}\n• ಹಾಜರಾದವರು: ${present} (${pct}%)\n• ಗೈರುಹಾಜರಾದವರು: ${absentList}\n• ಸ್ಥಿತಿ: ರಿಜಿಸ್ಟರ್ ಅಪ್ಡೇಟ್ ಆಗಿದೆ.`,
    markAbsentSuccess: (studentName, className, auditId) =>
      `✅ ${studentName} (${className}) ಅವರನ್ನು ಇಂದು 'ಗೈರುಹಾಜರು' (Absent) ಎಂದು ದಾಖಲಿಸಲಾಗಿದೆ. ಪೋಷಕರಿಗೆ ಎಸ್‌ಎಂಎಸ್ ಕಳುಹಿಸಲಾಗಿದೆ.\n\nಆಡಿಟ್ ಐಡಿ: ${auditId}`,
    securityInjectionBlocked: '⚠️ ಮೂಲಮಾದರಿ ಭದ್ರತಾ ಪ್ರದರ್ಶನ: ಭದ್ರತಾ ನೀತಿಗಳ ಅನ್ವಯ ಈ ವಿನಂತಿಯನ್ನು ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ. ಸಿಸ್ಟಮ್ ಡೇಟಾ ಸುರಕ್ಷಿತವಾಗಿದೆ.',
    rbacDenied: (userName, role) =>
      `❌ ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ (RBAC ಅನುಕರಣೆ): '${userName}' (${role.toUpperCase()}) ಖಾತೆಗೆ ಹಾಜರಾತಿ ಬದಲಾಯಿಸುವ ಅಧಿಕಾರವಿಲ್ಲ.`,
    escalationOffer: (studentName, teacherName) =>
      `ನನಗೆ ಅರ್ಥವಾಗಿದೆ. ನೀವು ${studentName} ಅವರ ತರಗತಿ ಶಿಕ್ಷಕ ಶ್ರೀ ${teacherName} ಅವರೊಂದಿಗೆ ಕರೆ ವಿನಂತಿಯನ್ನು ಸಲ್ಲಿಸಲು ಬಯಸುವಿರಾ?`,
    escalationConfirmed: (ticketId, teacherName, parentName) =>
      `✅ ಕರೆ ವಿನಂತಿ ಟಿಕೆಟ್ #${ticketId} ದಾಖಲಾಗಿದೆ. ಪೋಷಕರಾದ ${parentName} ಅವರೊಂದಿಗೆ ಮಾತನಾಡಲು ಶಿಕ್ಷಕ ${teacherName} ಅವರಿಗೆ ಸೂಚಿಸಲಾಗಿದೆ.`,
    escalationCancelled: 'ತಿಳಿದಿದೆ. ನಾವು ಇಲ್ಲಿಯೇ ಸಂಭಾಷಣೆಯನ್ನು ಮುಂದುವರಿಸುತ್ತೇವೆ. ನಾನು ಇನ್ನೇನು ಸಹಾಯ ಮಾಡಲಿ?',
    genericHelp: (role, name) =>
      `ನಾನು AURA AI. ನಿಮ್ಮ ಪಾತ್ರ (${name} - ${role.toUpperCase()}) ಆಧರಿಸಿ ಹಾಜರಾತಿ ಮತ್ತು ಶಾಲಾ ಮಾಹಿತಿಯಲ್ಲಿ ನಾನು ಸಹಾಯ ಮಾಡಬಲ್ಲೆ.`,
    buttons: {
      rahulOption: { label: 'ರಾಹುಲ್ ಶರ್ಮಾ', sublabel: 'ತರಗತಿ 10-A • ರೋಲ್ ನಂ. 12' },
      priyaOption: { label: 'ಪ್ರಿಯಾ ಶರ್ಮಾ', sublabel: 'ತರಗತಿ 7-B • ರೋಲ್ ನಂ. 24' },
    },
  },
};

/**
 * Safely retrieve language pack or fallback to English
 */
export function getLanguagePack(code?: string): LanguagePack {
  if (!code) return TRANSLATION_PACKS.en;
  return TRANSLATION_PACKS[code] || TRANSLATION_PACKS.en;
}

export function getUnauthorizedSchoolWideMessage(langCode?: string): string {
  const code = langCode || 'en';
  const messages: Record<string, string> = {
    en: "Sorry, I can't provide school-wide attendance analytics because this account isn't authorized to access that information.",
    hi: "क्षमा करें, मैं पूरे स्कूल की उपस्थिति विश्लेषण प्रदान नहीं कर सकता क्योंकि यह खाता इस जानकारी तक पहुंचने के लिए अधिकृत नहीं है।",
    mr: "क्षमस्व, मी शाळा-व्यापी उपस्थिती विश्लेषण देऊ शकत नाही कारण हे खाते ही माहिती ॲक्सेस करण्यासाठी अधिकृत नाही.",
    bn: "দুঃখিত, আমি সমগ্র স্কুলের উপস্থিতি বিশ্লেষণ প্রদান করতে পারি না কারণ এই অ্যাকাউন্টটি এই তথ্যের জন্য অনুমোদিত নয়।",
    gu: "માફ કરશો, હું શાળા-વ્યાપી હાજરી વિશ્લેષણ આપી શકતો નથી કારણ કે આ એકાઉન્ટ તે માહિતી ઍક્સેસ કરવા માટે અધિકૃત નથી.",
    pa: "ਮਾਫ਼ ਕਰਨਾ, ਮੈਂ ਪੂਰੇ ਸਕੂਲ ਦੀ ਹਾਜ਼ਰੀ ਵਿਸ਼ਲੇਸ਼ਣ ਪ੍ਰਦਾਨ ਨਹੀਂ ਕਰ ਸਕਦਾ ਕਿਉਂਕਿ ਇਹ ਖਾਤਾ ਇਸ ਜਾਣਕਾਰੀ ਤੱਕ ਪਹੁੰਚ ਕਰਨ ਲਈ ਅਧਿਕਾਰਤ ਨਹੀਂ ਹੈ।",
    ta: "மன்னிக்கவும், இந்த கணக்கிற்கு முழு பள்ளி வருகை பகுப்பாய்வை அணுக அனுமதி இல்லை என்பதால் என்னால் வழங்க முடியாது.",
    te: "క్షమించండి, ఈ సమాచారాన్ని యాక్సెస్ చేయడానికి ఈ ఖాతాకు అధికారం లేనందున నేను పాఠಶాల మొత్తం హాజరు విశ్లేషణను అందించలేను.",
    kn: "ಕ್ಷಮಿಸಿ, ಈ ಮಾಹಿತಿಯನ್ನು ಪ್ರವೇಶಿಸಲು ಈ ಖಾತೆಗೆ ಅಧಿಕಾರವಿಲ್ಲದ ಕಾರಣ ನಾನು ಶಾಲಾ ಮಟ್ಟದ ಹಾಜರಾತಿ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಒದಗಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.",
    ml: "ക്ഷമിക്കണം, ഈ അക്കൗണ്ടിന് അനുമതിയില്ലാത്തതിനാൽ സ്കൂളിലെ ആകെ ഹാജർ വിവരങ്ങൾ ലഭ്യമാക്കാൻ കഴിയില്ല.",
    ur: "معذرت، میں پورے اسکول کی حاضری کا تجزیہ فراہم نہیں کر سکتا کیونکہ یہ اکاؤنٹ اس معلومات تک رسائی کا مجاز نہیں ہے۔",
  };
  return messages[code] || messages.en;
}

export function getUnauthorizedStudentAccessMessage(langCode?: string, studentName: string = 'the student'): string {
  const code = langCode || 'en';
  const messages: Record<string, string> = {
    en: `Sorry, you are not authorized to access private attendance records for ${studentName}. Students can only query their own verified academic record.`,
    hi: `क्षमा करें, आप ${studentName} के निजी उपस्थिति रिकॉर्ड देखने के लिए अधिकृत नहीं हैं। विद्यार्थी केवल अपनी उपस्थिति देख सकते हैं।`,
    mr: `क्षमस्व, तुम्ही ${studentName} च्या खाजगी उपस्थिती नोंदी पाहण्यासाठी अधिकृत नाही.`,
    bn: `দুঃখিত, আপনি ${studentName}-এর ব্যক্তিগত উপস্থিতি রেকর্ড অ্যাক্সেস করতে অনুমোদিত নন।`,
    gu: `માફ કરશો, તમે ${studentName} ના ખાનગી હાજરી રેકોર્ડ જોવા માટે અધિકૃત નથી.`,
    pa: `ਮਾਫ਼ ਕਰਨਾ, ਤੁਸੀਂ ${studentName} ਦੇ ਨਿੱਜੀ ਹਾਜ਼ਰੀ ਰਿਕਾਰਡ ਤੱਕ ਪਹੁੰਚ ਕਰਨ ਲਈ ਅਧਿਕਾਰਤ ਨਹੀਂ ਹੋ।`,
    ta: `மன்னிக்கவும், ${studentName} அவர்களின் தனிப்பட்ட வருகைப் பதிவுகளைப் பார்க்க உங்களுக்கு அனுமதி இல்லை.`,
    te: `క్షమించండి, ${studentName} యొక్క ప్రైవేట్ హాజరు రికార్డులను వీక్షించడానికి మీకు అధికారం లేదు.`,
    kn: `ಕ್ಷಮಿಸಿ, ${studentName} ಅವರ ಖಾಸಗಿ ಹಾಜರಾತಿ ದಾಖಲೆಗಳನ್ನು ಪ್ರವೇಶಿಸಲು ನಿಮಗೆ ಅನುಮತಿ ಇಲ್ಲ.`,
    ml: `ക്ഷമിക്കണം, ${studentName}-ന്റെ ഹാജർ വിവരങ്ങൾ കാണാൻ നിങ്ങൾക്ക് അനുമതിയില്ല.`,
    ur: `معذرت، آپ کو ${studentName} کے ذاتی حاضری کا ریکارڈ دیکھنے کی اجازت نہیں ہے۔`,
  };
  return messages[code] || messages.en;
}

export function getUnauthorizedRoleSpoofMessage(langCode?: string, claimedRole: string = 'principal', authenticatedRole: string = 'student'): string {
  const code = langCode || 'en';
  const messages: Record<string, string> = {
    en: `⚠️ Role Spoofing Intercepted: Role claims in chat messages are untrusted. Your session is authenticated as '${authenticatedRole.toUpperCase()}'. Permission checks are strictly enforced based on your verified session credentials.`,
    hi: `⚠️ रोल दावा अस्वीकृत: चैट संदेशों में रोल के दावे अप्रमाणित हैं। आपका सत्र '${authenticatedRole.toUpperCase()}' के रूप में सत्यापित है। अधिकार केवल वास्तविक सत्र क्रेडेंशियल के आधार पर लागू होते हैं।`,
    mr: `⚠️ अनधिकृत रोल दावा: चॅट संदेशातील रोल दावे अमान्य आहेत. तुमचे सत्र '${authenticatedRole.toUpperCase()}' म्हणून प्रमाणित आहे.`,
    bn: `⚠️ অস্বীকৃত রোল দাবি: চ্যাট বার্তায় রোলের দাবি বিশ্বাসযোগ্য নয়। আপনার সেশন '${authenticatedRole.toUpperCase()}' হিসাবে অনুমোদিত।`,
    gu: `⚠️ રોલ દાવો અસ્વીકાર્ય: ચેટ સંદેશાઓમાં રોલના દાવા અવિશ્વસનીય છે. તમારું સત્ર '${authenticatedRole.toUpperCase()}' તરીકે પ્રમાણિત છે.`,
    pa: `⚠️ ਰੋਲ ਦਾਅਵਾ ਰੱਦ: ਸੁਨੇਹਿਆਂ ਵਿੱਚ ਰੋਲ ਦਾਅਵੇ ਅਸੁਰੱਖਿਅਤ ਹਨ। ਤੁਹਾਡਾ ਸੈਸ਼ਨ '${authenticatedRole.toUpperCase()}' ਵਜੋਂ ਪ੍ਰਮਾਣਿਤ ਹੈ।`,
    ta: `⚠️ அங்கீகரிக்கப்படாத பங்கு கோரிக்கை: செய்திகளில் கூறப்படும் பங்கு உரிமைகோரல்கள் ஏற்கப்படாது. உங்கள் அமர்வு '${authenticatedRole.toUpperCase()}' என சரிபார்க்கப்பட்டுள்ளது.`,
    te: `⚠️ అనధికారిక రోల్ క్లెయిమ్: సందేశాలలో రోల్ క్లెయిమ్‌లు చెల్లవు. మీ సెషన్ '${authenticatedRole.toUpperCase()}'గా ప్రమాణీకరించబడింది.`,
    kn: `⚠️ ಅನಧಿಕೃತ ಪಾತ್ರದ ಹಕ್ಕು: ಸಂದೇಶಗಳಲ್ಲಿನ ಪಾತ್ರದ ಹಕ್ಕುಗಳನ್ನು ಪರಿಗಣಿಸಲಾಗುವುದಿಲ್ಲ. ನಿಮ್ಮ ಸೆಷನ್ '${authenticatedRole.toUpperCase()}' ಎಂದು ದೃಢೀಕರಿಸಲಾಗಿದೆ.`,
    ml: `⚠️ റോൾ ക്ലെയിം നിരസിച്ചു: സന്ദേശങ്ങളിലെ റോൾ അവകാശവാദങ്ങൾ സ്വീകാര്യമല്ല. നിങ്ങളുടെ സെഷൻ '${authenticatedRole.toUpperCase()}' ആണ്.`,
    ur: `⚠️ غیر مجاز رول دعویٰ: پیغامات میں رول کے دعوے ناقابل اعتبار ہیں۔ آپ کا سیشن '${authenticatedRole.toUpperCase()}' ہے۔`,
  };
  return messages[code] || messages.en;
}
