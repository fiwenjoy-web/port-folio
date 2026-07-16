export type Lang = "en" | "th";
export type BT = { en: string; th: string };

export interface SiteContent {
  brand: {
    mark: string;
    firstName: string;
    lastName: string;
    logoLabel: BT;
  };
  navigation: {
    links: BT[];
    portfolioLabel: BT;
    hireLabel: BT;
  };
  hero: {
    name: string;
    role: BT;
    tags: string[];
    bio: BT;
    ctaPrimary: BT;
    ctaSecondary: BT;
    navStatus: BT;
    stats: Array<{ value: string; label: BT }>;
    greeting: BT;
    introPrefix: BT;
    displayName: string;
    title: BT;
    testimonial: BT;
    experienceValue: BT;
    experienceLabel: BT;
    portraitAlt: BT;
    portfolioButton: BT;
  };
  marquee: {
    items: BT[];
  };
  skills: {
    sectionLabel: BT;
    heading1: BT;
    heading2: BT;
    focusTitle: BT;
    toolsTitle: BT;
    proficiencyTitle: BT;
    focusItems: BT[];
    tools: string[];
    proficiencyItems: Array<{ label: BT; percentage: number }>;
  };
  philosophy: {
    sectionLabel: BT;
    heading1: BT;
    heading2: BT;
    intro: BT;
    principles: Array<{ title: BT; description: BT }>;
  };
  experience: {
    sectionLabel: BT;
    heading1: BT;
    heading2: BT;
    jobs: Array<{
      company: string;
      role: BT;
      period: string;
      bullets: BT[];
    }>;
    education: Array<{
      school: string;
      degree: BT;
      period: string;
    }>;
    glanceTitle: BT;
    glanceItems: Array<{ label: BT; value: BT }>;
  };
  services: {
    sectionLabel: BT;
    heading1: BT;
    heading2: BT;
    description: BT;
    quoteLabel: BT;
    processTitle: BT;
    workflowHeading: BT;
    items: Array<{
      title: BT;
      desc: BT;
    }>;
    tags: string[][];
    steps: Array<{ step: string; label: BT; desc: BT }>;
  };
  portfolio: {
    sectionLabel: BT;
    heading1: BT;
    heading2: BT;
    subtitle: BT;
    viewProjectLabel: BT;
    imagesLabel: BT;
    closeLabel: BT;
    projects: Array<{
      title: BT;
      category: BT;
      description: BT;
      tags: string[];
      caseStudy: {
        overview: BT;
        goal: BT;
        concept: BT;
        direction: BT[];
        workflow: Array<{ step: string; label: BT; desc: BT }>;
        visualSystem: Array<{ label: BT; desc: BT }>;
        outputs: Array<{ label: BT; desc: BT }>;
        reflection: BT;
      };
    }>;
  };
  testimonials: {
    sectionLabel: BT;
    heading1: BT;
    heading2: BT;
    items: Array<{
      quote: BT;
      name: string;
      role: BT;
      initials: string;
    }>;
  };
  footer: {
    tagline: BT;
    navStatus: BT;
    copyright: BT;
    navigateLabel: BT;
    contactLabel: BT;
    navItems: BT[];
    email: string;
    phone: string;
    location: BT;
    ctaEyebrow: BT;
    ctaHeading1: BT;
    ctaHeading2: BT;
    getInTouchLabel: BT;
    emailLabel: BT;
    phoneLabel: BT;
    locationLabel: BT;
    bottomRole: BT;
  };
}

const CASE_STUDY_WORKFLOW = [
  {
    step: "01",
    label: { en: "Direction", th: "กำหนดทิศทาง" },
    desc: {
      en: "Clarify the objective, audience, platform, and visual references before production.",
      th: "กำหนดเป้าหมาย กลุ่มผู้ชม แพลตฟอร์ม และ reference ภาพก่อนเริ่มผลิตงาน",
    },
  },
  {
    step: "02",
    label: { en: "AI Exploration", th: "สำรวจด้วย AI" },
    desc: {
      en: "Explore visual routes, prompt directions, compositions, and mood variations.",
      th: "ทดลองแนวทางภาพ prompt องค์ประกอบ และ mood หลายรูปแบบ",
    },
  },
  {
    step: "03",
    label: { en: "Visual Production", th: "ผลิตงานภาพ" },
    desc: {
      en: "Build the selected direction through design, mockup, retouching, and layout refinement.",
      th: "พัฒนาทิศทางที่เลือกผ่านงานออกแบบ mockup การรีทัช และการจัด layout",
    },
  },
  {
    step: "04",
    label: { en: "Final Delivery", th: "ส่งมอบงานสุดท้าย" },
    desc: {
      en: "Prepare final visuals and adapt them into formats ready for portfolio or digital use.",
      th: "เตรียมภาพสุดท้ายและปรับเป็น format ที่พร้อมใช้ในพอร์ตหรือแพลตฟอร์มดิจิทัล",
    },
  },
];

const DEFAULT_VISUAL_SYSTEM = [
  {
    label: { en: "Visual Direction", th: "ทิศทางภาพ" },
    desc: { en: "Defines the mood, tone, and design language of the project.", th: "กำหนด mood, tone และภาษาภาพของโปรเจกต์" },
  },
  {
    label: { en: "Color Palette", th: "ชุดสี" },
    desc: { en: "Uses color to make the product or message feel clear and memorable.", th: "ใช้สีเพื่อทำให้สินค้าและสารที่ต้องการสื่อชัดเจนและจดจำง่าย" },
  },
  {
    label: { en: "Layout System", th: "ระบบเลย์เอาต์" },
    desc: { en: "Organizes hierarchy, spacing, and composition for multiple formats.", th: "จัดลำดับข้อมูล ระยะห่าง และองค์ประกอบให้ใช้ได้หลาย format" },
  },
  {
    label: { en: "Final Output", th: "ผลงานสุดท้าย" },
    desc: { en: "Turns the concept into polished visuals ready for presentation.", th: "เปลี่ยนคอนเซปต์ให้เป็นภาพที่พร้อมนำเสนออย่างสมบูรณ์" },
  },
];

const DEFAULT_OUTPUTS = [
  {
    label: { en: "Cover / Hero Image", th: "ภาพเปิดโปรเจกต์" },
    desc: { en: "A strong overview image that introduces the project mood.", th: "ภาพรวมที่เปิด mood ของโปรเจกต์ให้ชัดเจน" },
  },
  {
    label: { en: "Concept / Mood Direction", th: "คอนเซปต์และ mood" },
    desc: { en: "Visual direction, references, or AI exploration used to shape the work.", th: "ทิศทางภาพ reference หรือการทดลอง AI ที่ใช้กำหนดงาน" },
  },
  {
    label: { en: "Main Poster / Key Visual", th: "โปสเตอร์หลัก / Key Visual" },
    desc: { en: "The main visual designed to communicate the campaign or product story.", th: "ภาพหลักที่ใช้สื่อสารแคมเปญหรือเรื่องราวของสินค้า" },
  },
  {
    label: { en: "Digital Adaptation", th: "การปรับใช้บนดิจิทัล" },
    desc: { en: "Adapted layouts for social, e-commerce, or presentation use.", th: "เลย์เอาต์ที่ปรับใช้กับ social, e-commerce หรือการนำเสนอ" },
  },
];

function createCaseStudy(input: {
  overview: BT;
  goal: BT;
  concept: BT;
  direction: BT[];
  reflection: BT;
  visualSystem?: Array<{ label: BT; desc: BT }>;
  outputs?: Array<{ label: BT; desc: BT }>;
}) {
  return {
    overview: input.overview,
    goal: input.goal,
    concept: input.concept,
    direction: input.direction,
    workflow: CASE_STUDY_WORKFLOW,
    visualSystem: input.visualSystem ?? DEFAULT_VISUAL_SYSTEM,
    outputs: input.outputs ?? DEFAULT_OUTPUTS,
    reflection: input.reflection,
  };
}

export const DEFAULT_CONTENT: SiteContent = {
  brand: {
    mark: "WH",
    firstName: "WEERAPONG",
    lastName: "HAMATHULIN",
    logoLabel: { en: "WH logo", th: "โลโก้ WH" },
  },
  navigation: {
    links: [
      { en: "About", th: "เกี่ยวกับ" },
      { en: "Capabilities", th: "ความสามารถ" },
      { en: "Resume", th: "ประวัติ" },
      { en: "Contact", th: "ติดต่อ" },
    ],
    portfolioLabel: { en: "Portfolio", th: "ผลงาน" },
    hireLabel: { en: "Contact me", th: "ติดต่อผม" },
  },
  hero: {
    name: "WEERAPONG HAMATHULIN",
    role: {
      en: "CREATIVE DESIGNER / AI VISUAL PRODUCTION",
      th: "นักออกแบบครีเอทีฟ / การผลิตภาพด้วย AI",
    },
    tags: ["AI", "VISUAL", "MOTION", "3D"],
    bio: {
      en: "Creative designer specializing in AI-assisted visual production, commercial content, and modern digital media workflows.",
      th: "นักออกแบบที่เชี่ยวชาญด้านการผลิตภาพด้วย AI การสร้างเนื้อหาเชิงพาณิชย์ และขั้นตอนการทำงานสื่อดิจิทัลสมัยใหม่",
    },
    ctaPrimary: {
      en: "SEEKING FULL-TIME POSITION",
      th: "กำลังมองหางานประจำ",
    },
    ctaSecondary: {
      en: "VIEW WORK",
      th: "ดูผลงาน",
    },
    navStatus: {
      en: "SEEKING FULL-TIME POSITION",
      th: "กำลังมองหางานประจำ",
    },
    stats: [
      { value: "3+", label: { en: "Years Experience", th: "ปีประสบการณ์" } },
      { value: "5", label: { en: "Creative Disciplines", th: "ทักษะครีเอทีฟหลัก" } },
      { value: "AI", label: { en: "Visual Production", th: "การผลิตภาพ" } },
      { value: "5", label: { en: "Core Skills", th: "ทักษะหลัก" } },
    ],
    greeting: { en: "Hello!", th: "สวัสดี!" },
    introPrefix: { en: "I'm", th: "ผมคือ" },
    displayName: "Fuse",
    title: { en: "Creative Designer", th: "นักออกแบบครีเอทีฟ" },
    testimonial: {
      en: "I combine commercial design thinking, AI-assisted exploration, and production craft to build clear, polished visual systems.",
      th: "ผมผสานแนวคิดเชิงพาณิชย์ การสำรวจด้วย AI และทักษะการผลิต เพื่อสร้างระบบภาพที่ชัดเจนและพร้อมใช้งาน",
    },
    experienceValue: { en: "3 Years", th: "3 ปี" },
    experienceLabel: { en: "Experience", th: "ประสบการณ์" },
    portraitAlt: { en: "Fuse, creative designer", th: "ฟิวส์ นักออกแบบครีเอทีฟ" },
    portfolioButton: { en: "Portfolio", th: "ผลงาน" },
  },
  marquee: {
    items: [
      { en: "AI VISUAL PRODUCTION", th: "การผลิตภาพด้วย AI" },
      { en: "3D RENDERING", th: "การเรนเดอร์ 3D" },
      { en: "MOTION DESIGN", th: "งานโมชั่น" },
      { en: "BRAND IDENTITY", th: "อัตลักษณ์แบรนด์" },
      { en: "E-COMMERCE", th: "อีคอมเมิร์ซ" },
      { en: "CAMPAIGN DESIGN", th: "ออกแบบแคมเปญ" },
      { en: "UI / UX", th: "UI / UX" },
      { en: "CREATIVE DIRECTION", th: "ทิศทางสร้างสรรค์" },
      { en: "PRODUCT VISUALS", th: "ภาพสินค้า" },
    ],
  },
  skills: {
    sectionLabel: { en: "EXPERTISE", th: "ความเชี่ยวชาญ" },
    heading1: { en: "SKILLS &", th: "ทักษะ &" },
    heading2: { en: "TOOLS", th: "เครื่องมือ" },
    focusTitle: { en: "CREATIVE FOCUS", th: "จุดโฟกัสงานสร้างสรรค์" },
    toolsTitle: { en: "TOOLS & SOFTWARE", th: "เครื่องมือและซอฟต์แวร์" },
    proficiencyTitle: { en: "PROFICIENCY", th: "ระดับความชำนาญ" },
    focusItems: [
      { en: "AI-Assisted Visual Production", th: "การผลิตภาพด้วยความช่วยเหลือของ AI" },
      { en: "Commercial Product Visuals", th: "ภาพสินค้าเชิงพาณิชย์" },
      { en: "3D Mockup & Render Concepts", th: "แนวคิดโมเดล 3D และการเรนเดอร์" },
      { en: "E-commerce Campaign Design", th: "การออกแบบแคมเปญอีคอมเมิร์ซ" },
      { en: "Creative Workflow Systems", th: "ระบบขั้นตอนงานสร้างสรรค์" },
    ],
    tools: ["Photoshop", "Illustrator", "Premiere", "After FX", "Adobe XD", "Blender", "VS Code", "Figma"],
    proficiencyItems: [
      { label: { en: "Visual Design", th: "การออกแบบภาพ" }, percentage: 95 },
      { label: { en: "AI Production", th: "การผลิตด้วย AI" }, percentage: 90 },
      { label: { en: "3D Rendering", th: "การเรนเดอร์ 3D" }, percentage: 78 },
      { label: { en: "Motion Design", th: "การออกแบบโมชั่น" }, percentage: 82 },
    ],
  },
  philosophy: {
    sectionLabel: { en: "PHILOSOPHY", th: "แนวคิด" },
    heading1: { en: "How I", th: "หลักการ" },
    heading2: { en: "approach work", th: "การทำงาน" },
    intro: {
      en: "A blend of commercial instinct and technical craft. I treat every project as a partnership — obsessing over the details that turn good visuals into results.",
      th: "การผสมผสานระหว่างสัญชาตญาณเชิงพาณิชย์และงานฝีมือเชิงเทคนิค ฉันมองทุกโปรเจกต์เป็นความร่วมมือ และใส่ใจในรายละเอียดที่เปลี่ยนภาพที่ดีให้กลายเป็นผลลัพธ์",
    },
    principles: [
      {
        title: { en: "Concept First", th: "แนวคิดมาก่อน" },
        description: { en: "Every visual starts with a strong idea. Aesthetics follow strategy, never the other way around.", th: "ทุกภาพเริ่มจากไอเดียที่แข็งแรง ความสวยงามตามหลังกลยุทธ์เสมอ" },
      },
      {
        title: { en: "AI-Accelerated", th: "เร่งด้วย AI" },
        description: { en: "Blending human craft with AI workflows to deliver faster without sacrificing quality.", th: "ผสานฝีมือมนุษย์กับขั้นตอน AI เพื่อส่งงานเร็วขึ้นโดยไม่ลดคุณภาพ" },
      },
      {
        title: { en: "Detail Obsessed", th: "ใส่ใจรายละเอียด" },
        description: { en: "From lighting to pixel-level finishing — the small things make commercial work shine.", th: "ตั้งแต่การจัดแสงจนถึงการเก็บงานระดับพิกเซล รายละเอียดเล็กๆ ทำให้งานโดดเด่น" },
      },
      {
        title: { en: "Results Driven", th: "มุ่งผลลัพธ์" },
        description: { en: "Design that performs. Visuals built to convert, engage, and elevate the brand.", th: "ดีไซน์ที่ได้ผลจริง ภาพที่สร้างมาเพื่อเปลี่ยนยอดขาย สร้างการมีส่วนร่วม และยกระดับแบรนด์" },
      },
    ],
  },
  experience: {
    sectionLabel: { en: "BACKGROUND", th: "ประวัติการทำงาน" },
    heading1: { en: "EXPERIENCE &", th: "ประสบการณ์ &" },
    heading2: { en: "EDUCATION", th: "การศึกษา" },
    jobs: [
      {
        company: "Dr. Hygiene Medical Products",
        role: { en: "Graphic Designer & Content Creator", th: "นักออกแบบกราฟิกและผู้สร้างเนื้อหา" },
        period: "2025 – Present",
        bullets: [
          {
            en: "Designed commercial visuals for medical and hygiene products across social media and e-commerce platforms",
            th: "ออกแบบภาพเชิงพาณิชย์สำหรับผลิตภัณฑ์ทางการแพทย์บนโซเชียลมีเดียและแพลตฟอร์มอีคอมเมิร์ซ",
          },
          {
            en: "Created promotional content for Shopee, Lazada, and TikTok Shop campaigns",
            th: "สร้างเนื้อหาโปรโมชั่นสำหรับแคมเปญ Shopee, Lazada และ TikTok Shop",
          },
          {
            en: "Produced AI-assisted product advertising and marketing visuals",
            th: "ผลิตภาพโฆษณาสินค้าและการตลาดด้วยความช่วยเหลือของ AI",
          },
          {
            en: "Developed trend-based TikTok content and short-form video concepts",
            th: "พัฒนาเนื้อหา TikTok ตามเทรนด์และคอนเซปต์วิดีโอรูปแบบสั้น",
          },
          {
            en: "Designed Facebook covers, product banners, and campaign graphics",
            th: "ออกแบบปกเฟซบุ๊ก แบนเนอร์สินค้า และกราฟิกแคมเปญ",
          },
          {
            en: "Worked on visual direction combining commercial design, AI workflows, and modern product presentation",
            th: "ทำงานด้านทิศทางภาพโดยผสมผสานการออกแบบเชิงพาณิชย์ ขั้นตอน AI และการนำเสนอผลิตภัณฑ์สมัยใหม่",
          },
        ],
      },
      {
        company: "Pinnacle Asset Management",
        role: { en: "Marketing Officer & Sales Administrator", th: "เจ้าหน้าที่การตลาดและผู้ดูแลฝ่ายขาย" },
        period: "2023 – 2025",
        bullets: [
          {
            en: "Supported marketing operations and corporate media production",
            th: "สนับสนุนการดำเนินงานการตลาดและการผลิตสื่อองค์กร",
          },
          {
            en: "Assisted in creating promotional materials and company presentations",
            th: "ช่วยสร้างสื่อโปรโมชั่นและการนำเสนอของบริษัท",
          },
          {
            en: "Coordinated website content updates and digital media organization",
            th: "ประสานงานการอัปเดตเนื้อหาเว็บไซต์และการจัดระเบียบสื่อดิจิทัล",
          },
          {
            en: "Managed Excel-based databases and asset tracking systems",
            th: "จัดการฐานข้อมูล Excel และระบบติดตามทรัพย์สิน",
          },
          {
            en: "Organized sales documents and digital file management workflows",
            th: "จัดระเบียบเอกสารการขายและขั้นตอนการจัดการไฟล์ดิจิทัล",
          },
        ],
      },
    ],
    education: [
      {
        school: "Maejo University",
        degree: {
          en: "Bachelor of Business Administration, Management",
          th: "บริหารธุรกิจบัณฑิต สาขาการจัดการ",
        },
        period: "2019 – 2023",
      },
    ],
    glanceTitle: { en: "AT A GLANCE", th: "ข้อมูลสรุป" },
    glanceItems: [
      { label: { en: "Location", th: "ที่ตั้ง" }, value: { en: "Chiangmai, Thailand", th: "เชียงใหม่ ประเทศไทย" } },
      { label: { en: "Focus", th: "ความเชี่ยวชาญ" }, value: { en: "AI Visual & 3D", th: "ภาพ AI และ 3D" } },
      { label: { en: "Status", th: "สถานะ" }, value: { en: "Seeking Full-Time", th: "กำลังหางานประจำ" } },
      { label: { en: "Languages", th: "ภาษา" }, value: { en: "TH / EN", th: "ไทย / อังกฤษ" } },
    ],
  },
  services: {
    sectionLabel: { en: "WHAT I CAN DO", th: "สิ่งที่ผมทำได้" },
    heading1: { en: "CREATIVE", th: "ความสามารถด้าน" },
    heading2: { en: "CAPABILITIES", th: "ครีเอทีฟ" },
    description: {
      en: "A focused set of creative skills combining visual design, AI-assisted production, product presentation, and digital media workflows.",
      th: "ชุดทักษะด้านครีเอทีฟที่ผสมผสานงานออกแบบภาพ การผลิตงานด้วย AI การนำเสนอสินค้า และเวิร์กโฟลว์สื่อดิจิทัล",
    },
    quoteLabel: { en: "VIEW PORTFOLIO", th: "ดูผลงาน" },
    processTitle: { en: "CREATIVE WORKFLOW", th: "เวิร์กโฟลว์ครีเอทีฟ" },
    workflowHeading: { en: "How I build visuals", th: "วิธีที่ผมสร้างงานภาพ" },
    items: [
      {
        title: { en: "AI-Assisted Visual Production", th: "ผลิตงานภาพด้วย AI" },
        desc: {
          en: "Using AI workflows to explore visual concepts, generate creative directions, support product imagery, and speed up production while keeping a polished commercial finish.",
          th: "ใช้เวิร์กโฟลว์ AI เพื่อสำรวจคอนเซปต์ภาพ สร้างแนวทางครีเอทีฟ สนับสนุนงานภาพสินค้า และช่วยให้ผลิตงานได้เร็วขึ้นโดยยังคงคุณภาพเชิงพาณิชย์",
        },
      },
      {
        title: { en: "3D Product Mockup & Render", th: "ม็อกอัพและเรนเดอร์สินค้า 3D" },
        desc: {
          en: "Creating product mockups, 3D render concepts, cosmetic-style visuals, and presentation-ready product scenes for advertising and portfolio work.",
          th: "สร้างม็อกอัพสินค้า คอนเซปต์เรนเดอร์ 3D ภาพสไตล์คอสเมติก และซีนสินค้าสำหรับงานโฆษณาและพอร์ตโฟลิโอ",
        },
      },
      {
        title: { en: "E-commerce Campaign Design", th: "ออกแบบแคมเปญอีคอมเมิร์ซ" },
        desc: {
          en: "Creating visuals for Shopee, Lazada, TikTok Shop, social media campaigns, and short-form content designed for online product communication.",
          th: "สร้างสื่อภาพสำหรับ Shopee, Lazada, TikTok Shop แคมเปญโซเชียลมีเดีย และคอนเทนต์วิดีโอสั้นสำหรับการสื่อสารสินค้าออนไลน์",
        },
      },
      {
        title: { en: "UI / Web Visual Design", th: "ออกแบบภาพสำหรับ UI และเว็บไซต์" },
        desc: {
          en: "Designing landing pages, web layouts, interface concepts, dashboard visuals, and digital presentation systems with a clean modern visual style.",
          th: "ออกแบบ Landing Page เลย์เอาต์เว็บไซต์ คอนเซปต์อินเทอร์เฟซ ภาพแดชบอร์ด และระบบการนำเสนอดิจิทัลในสไตล์ที่สะอาดและทันสมัย",
        },
      },
      {
        title: { en: "Commercial Visual Design", th: "ออกแบบภาพเชิงพาณิชย์" },
        desc: {
          en: "Designing promotional graphics, campaign key visuals, banners, social media content, and product-focused advertising materials for digital platforms.",
          th: "ออกแบบกราฟิกโปรโมชัน ภาพหลักแคมเปญ แบนเนอร์ คอนเทนต์โซเชียลมีเดีย และสื่อโฆษณาสินค้าที่เหมาะกับแพลตฟอร์มดิจิทัล",
        },
      },
      {
        title: { en: "Creative Workflow Systems", th: "ระบบเวิร์กโฟลว์งานครีเอทีฟ" },
        desc: {
          en: "Organizing creative processes, design assets, AI workflows, file structures, and production systems to make visual work faster and more consistent.",
          th: "จัดระบบกระบวนการทำงานครีเอทีฟ ไฟล์ออกแบบ เวิร์กโฟลว์ AI โครงสร้างไฟล์ และระบบการผลิตงาน เพื่อให้งานภาพทำได้เร็วขึ้นและสม่ำเสมอมากขึ้น",
        },
      },
    ],
    tags: [
      ["AI Workflow", "Prompting", "Visual Exploration"],
      ["Blender", "Product Render", "Mockup"],
      ["Shopee", "Lazada", "TikTok Shop"],
      ["Figma", "UI Design", "Web Layout"],
      ["Poster Design", "Social Media", "Campaign Visuals"],
      ["Workflow", "Asset System", "Production"],
    ],
    steps: [
      { step: "01", label: { en: "Direction", th: "กำหนดทิศทาง" }, desc: { en: "Clarify the goal, audience, references, and visual direction.", th: "วางเป้าหมาย กลุ่มผู้ชม reference และทิศทางภาพให้ชัดเจน" } },
      { step: "02", label: { en: "AI Exploration", th: "สำรวจด้วย AI" }, desc: { en: "Explore concepts, styles, compositions, and production options.", th: "ทดลองคอนเซปต์ สไตล์ องค์ประกอบภาพ และทางเลือกในการผลิตงาน" } },
      { step: "03", label: { en: "Visual Production", th: "ผลิตงานภาพ" }, desc: { en: "Build, refine, retouch, render, and prepare the final visual system.", th: "สร้างงาน ปรับรายละเอียด รีทัช เรนเดอร์ และจัดระบบภาพสุดท้าย" } },
      { step: "04", label: { en: "Final Delivery", th: "ส่งมอบงานสุดท้าย" }, desc: { en: "Export clean assets and presentation-ready files for real use.", th: "ส่งออกไฟล์ที่สะอาด พร้อมนำเสนอและพร้อมใช้งานจริง" } },
    ],
  },
  portfolio: {
    sectionLabel: { en: "PORTFOLIO", th: "ผลงาน" },
    heading1: { en: "WORK &", th: "งาน &" },
    heading2: { en: "DESIGN", th: "การออกแบบ" },
    subtitle: { en: "A selection of recent commercial and creative projects.", th: "คัดสรรโปรเจกต์เชิงพาณิชย์และสร้างสรรค์ล่าสุด" },
    viewProjectLabel: { en: "VIEW FULL PROJECT", th: "ดูโปรเจกต์ทั้งหมด" },
    imagesLabel: { en: "IMAGES IN THIS PROJECT", th: "รูปในโปรเจกต์นี้" },
    closeLabel: { en: "Close project", th: "ปิดโปรเจกต์" },
    projects: [
      {
        title: { en: "COMMERCIAL POSTER", th: "โปสเตอร์เชิงพาณิชย์" },
        category: { en: "Graphic Design", th: "การออกแบบกราฟิก" },
        description: {
          en: "Bold commercial poster designs crafted for brands across print and digital media. Combining strong typography, vibrant color grading, and AI-enhanced retouching.",
          th: "การออกแบบโปสเตอร์เชิงพาณิชย์ที่โดดเด่นสำหรับแบรนด์ต่างๆ ทั้งสื่อสิ่งพิมพ์และดิจิทัล ผสมผสานตัวอักษรที่แข็งแกร่ง การปรับสีที่สดใส และการรีทัชด้วย AI",
        },
        tags: ["Photoshop", "Illustrator", "Print Design"],
        caseStudy: createCaseStudy({
          overview: {
            en: "A commercial poster design project focused on turning simple product or brand assets into polished visuals for print and digital communication.",
            th: "โปรเจกต์ออกแบบโปสเตอร์เชิงพาณิชย์ที่โฟกัสการเปลี่ยน asset สินค้าหรือแบรนด์ให้กลายเป็นภาพที่พร้อมใช้ทั้งสื่อสิ่งพิมพ์และดิจิทัล",
          },
          goal: {
            en: "Create a strong first impression, communicate the offer clearly, and make the visual feel campaign-ready.",
            th: "สร้างความประทับใจแรกที่ชัด สื่อสารข้อเสนอให้เข้าใจง่าย และทำให้ภาพดูพร้อมใช้ในแคมเปญจริง",
          },
          concept: {
            en: "From raw assets to a finished key visual, this project explores hierarchy, typography, retouching, and color grading as a complete commercial design workflow.",
            th: "จาก asset ดิบสู่ key visual ที่สมบูรณ์ โปรเจกต์นี้ทดลองการจัดลำดับข้อมูล ตัวอักษร การรีทัช และการปรับสีในเวิร์กโฟลว์งานออกแบบเชิงพาณิชย์",
          },
          direction: [
            { en: "Bold typography", th: "ตัวอักษรชัดและแข็งแรง" },
            { en: "High-contrast composition", th: "องค์ประกอบภาพ contrast สูง" },
            { en: "Commercial campaign mood", th: "mood แบบงานแคมเปญเชิงพาณิชย์" },
          ],
          reflection: {
            en: "This project highlights commercial composition, typography control, color direction, and the ability to make static visuals feel campaign-ready.",
            th: "โปรเจกต์นี้โชว์ทักษะการจัดองค์ประกอบเชิงพาณิชย์ การควบคุมตัวอักษร ทิศทางสี และการทำให้ภาพนิ่งดูพร้อมใช้ในแคมเปญ",
          },
        }),
      },
      {
        title: { en: "3D PRODUCT VISUALIZATION", th: "การสร้างภาพสินค้า 3D" },
        category: { en: "3D Render", th: "การเรนเดอร์ 3D" },
        description: {
          en: "Hyper-realistic 3D product renders and mockups created for e-commerce and commercial advertising. Blender-based workflow with custom lighting setups.",
          th: "การเรนเดอร์สินค้า 3D และโมเดลที่สมจริงสูงสำหรับอีคอมเมิร์ซและโฆษณาเชิงพาณิชย์ ขั้นตอนบน Blender พร้อมการตั้งค่าแสงที่กำหนดเอง",
        },
        tags: ["Blender", "3D Render", "Product Vis"],
        caseStudy: createCaseStudy({
          overview: {
            en: "A 3D product visualization project exploring how mockups, lighting, and render composition can create premium product presentation.",
            th: "โปรเจกต์สร้างภาพสินค้า 3D ที่ทดลองการใช้ mockup แสง และองค์ประกอบ render เพื่อทำให้สินค้าดูพรีเมียมและพร้อมนำเสนอ",
          },
          goal: {
            en: "Present the product with stronger depth, cleaner material detail, and a more advertising-ready scene.",
            th: "นำเสนอสินค้าให้มีมิติ รายละเอียดวัสดุชัดขึ้น และมีฉากที่พร้อมใช้ในงานโฆษณามากขึ้น",
          },
          concept: {
            en: "The project connects product modeling, lighting design, material polish, and final layout into one 3D presentation workflow.",
            th: "โปรเจกต์นี้เชื่อมการขึ้นโมเดลสินค้า การจัดแสง การปรับวัสดุ และ layout สุดท้ายให้เป็นเวิร์กโฟลว์การนำเสนอสินค้า 3D",
          },
          direction: [
            { en: "Premium product lighting", th: "แสงสินค้าแบบพรีเมียม" },
            { en: "Clean mockup presentation", th: "การนำเสนอ mockup ที่สะอาด" },
            { en: "Depth and material detail", th: "มิติและรายละเอียดวัสดุ" },
          ],
          visualSystem: [
            ...DEFAULT_VISUAL_SYSTEM,
            {
              label: { en: "Product Mockup", th: "ม็อกอัพสินค้า" },
              desc: { en: "Frames the product as a presentation-ready commercial object.", th: "จัดสินค้าให้เป็นวัตถุเชิงพาณิชย์ที่พร้อมนำเสนอ" },
            },
          ],
          reflection: {
            en: "This project demonstrates 3D composition, lighting judgment, mockup presentation, and product-focused visual storytelling.",
            th: "โปรเจกต์นี้โชว์ทักษะการจัดองค์ประกอบ 3D การตัดสินใจเรื่องแสง การนำเสนอ mockup และการเล่าเรื่องภาพแบบโฟกัสสินค้า",
          },
        }),
      },
      {
        title: { en: "AI PRODUCT 3D VISUALS", th: "ภาพสินค้า 3D ด้วย AI" },
        category: { en: "AI Production", th: "การผลิตด้วย AI" },
        description: {
          en: "AI-assisted visual production pipeline merging generative imagery with 3D renders for cutting-edge product advertising and campaign content.",
          th: "ไปป์ไลน์การผลิตภาพด้วย AI ที่ผสานภาพ Generative กับการเรนเดอร์ 3D สำหรับโฆษณาสินค้าและเนื้อหาแคมเปญที่ล้ำสมัย",
        },
        tags: ["AI Generation", "Midjourney", "Photoshop"],
        caseStudy: createCaseStudy({
          overview: {
            en: "An AI product visual system exploring how AI, 3D mockups, and commercial design can create product-focused advertising visuals for digital platforms.",
            th: "โปรเจกต์ทดลองระบบภาพสินค้าที่ใช้ AI, 3D Mockup และงานออกแบบเชิงพาณิชย์ เพื่อสร้างภาพโฆษณาสินค้าที่พร้อมใช้บนแพลตฟอร์มดิจิทัล",
          },
          goal: {
            en: "Build a repeatable visual workflow that can move from idea exploration to polished product advertising outputs.",
            th: "สร้างเวิร์กโฟลว์ภาพที่ทำซ้ำได้ ตั้งแต่การสำรวจไอเดียไปจนถึงภาพโฆษณาสินค้าที่สมบูรณ์",
          },
          concept: {
            en: "From simple product assets to polished commercial visuals, this project explores a workflow that connects idea generation, AI-assisted direction, 3D presentation, and final advertising design.",
            th: "จาก asset สินค้าง่าย ๆ สู่ภาพเชิงพาณิชย์ที่สมบูรณ์ โปรเจกต์นี้ทดลองเวิร์กโฟลว์ที่เชื่อมการคิดไอเดีย การกำหนดทิศทางด้วย AI การนำเสนอแบบ 3D และงานออกแบบโฆษณาสุดท้าย",
          },
          direction: [
            { en: "AI-assisted visual direction", th: "ทิศทางภาพที่ใช้ AI ช่วย" },
            { en: "Product-focused composition", th: "องค์ประกอบที่โฟกัสสินค้า" },
            { en: "Polished advertising finish", th: "งานจบแบบโฆษณาที่ดูเนี้ยบ" },
          ],
          visualSystem: [
            ...DEFAULT_VISUAL_SYSTEM,
            {
              label: { en: "AI Prompt Exploration", th: "การทดลอง prompt AI" },
              desc: { en: "Uses prompts to explore mood, composition, and campaign directions before final design.", th: "ใช้ prompt เพื่อทดลอง mood องค์ประกอบ และทิศทางแคมเปญก่อนออกแบบจริง" },
            },
            {
              label: { en: "Social / E-commerce Adaptation", th: "การปรับใช้กับ Social / E-commerce" },
              desc: { en: "Adapts the same visual idea into formats suitable for digital platforms.", th: "ปรับไอเดียภาพเดียวกันให้เหมาะกับ format บนแพลตฟอร์มดิจิทัล" },
            },
          ],
          outputs: [
            ...DEFAULT_OUTPUTS,
            {
              label: { en: "AI Visual Concept", th: "คอนเซปต์ภาพจาก AI" },
              desc: { en: "Exploration images used to test visual mood and creative direction.", th: "ภาพทดลองที่ใช้ทดสอบ mood และทิศทางครีเอทีฟ" },
            },
          ],
          reflection: {
            en: "This project shows AI workflow thinking, product visual direction, 3D-assisted presentation, and final commercial design execution.",
            th: "โปรเจกต์นี้โชว์การคิดเวิร์กโฟลว์ AI การกำหนดทิศทางภาพสินค้า การนำเสนอที่ใช้ 3D ช่วย และการจบงานออกแบบเชิงพาณิชย์",
          },
        }),
      },
      {
        title: { en: "E-COMMERCE CAMPAIGNS", th: "แคมเปญอีคอมเมิร์ซ" },
        category: { en: "Campaign Design", th: "การออกแบบแคมเปญ" },
        description: {
          en: "End-to-end campaign design for Shopee, Lazada, and TikTok Shop. Includes banner sets, product covers, and short-form video content adapted for each platform.",
          th: "การออกแบบแคมเปญแบบครบวงจรสำหรับ Shopee, Lazada และ TikTok Shop รวมถึงชุดแบนเนอร์ ปกสินค้า และเนื้อหาวิดีโอสั้นที่ปรับให้เหมาะกับแต่ละแพลตฟอร์ม",
        },
        tags: ["Shopee", "Lazada", "TikTok"],
        caseStudy: createCaseStudy({
          overview: {
            en: "An e-commerce campaign design project built to make product visuals work across marketplace, social media, and short-form commerce touchpoints.",
            th: "โปรเจกต์ออกแบบแคมเปญอีคอมเมิร์ซที่ทำให้ภาพสินค้าใช้งานได้หลายจุด ทั้ง marketplace, social media และ short-form commerce",
          },
          goal: {
            en: "Make the product clearer, more clickable, and easier to adapt across Shopee, Lazada, TikTok Shop, and social formats.",
            th: "ทำให้สินค้าชัดขึ้น น่าคลิกขึ้น และปรับใช้ได้ง่ายกับ Shopee, Lazada, TikTok Shop และ format โซเชียล",
          },
          concept: {
            en: "The campaign treats one product story as a flexible visual system, then adapts it into banners, covers, social posts, and marketplace-ready graphics.",
            th: "แคมเปญนี้มองเรื่องราวของสินค้าเป็นระบบภาพที่ยืดหยุ่น แล้วปรับใช้เป็นแบนเนอร์ ปกสินค้า โพสต์โซเชียล และกราฟิกสำหรับ marketplace",
          },
          direction: [
            { en: "Clear product hierarchy", th: "ลำดับข้อมูลสินค้าอ่านง่าย" },
            { en: "Marketplace-ready layout", th: "layout พร้อมใช้บน marketplace" },
            { en: "Fast digital communication", th: "สื่อสารเร็วสำหรับแพลตฟอร์มดิจิทัล" },
          ],
          outputs: [
            { label: { en: "Main Poster", th: "โปสเตอร์หลัก" }, desc: { en: "Primary campaign visual for the product story.", th: "ภาพหลักของแคมเปญสำหรับเล่าเรื่องสินค้า" } },
            { label: { en: "Product Banner", th: "แบนเนอร์สินค้า" }, desc: { en: "Horizontal format for marketplace or website placement.", th: "format แนวนอนสำหรับ marketplace หรือเว็บไซต์" } },
            { label: { en: "Shopee / Lazada Visual", th: "ภาพ Shopee / Lazada" }, desc: { en: "Marketplace adaptation focused on clarity and click-through.", th: "ภาพที่ปรับใช้กับ marketplace โดยเน้นความชัดและน่าคลิก" } },
            { label: { en: "TikTok Shop Cover", th: "ปก TikTok Shop" }, desc: { en: "Vertical or cover-style format for short-form commerce.", th: "format แนวตั้งหรือปกสำหรับ short-form commerce" } },
            { label: { en: "Story Size", th: "ขนาด Story" }, desc: { en: "Adapted layout for mobile-first viewing.", th: "layout ที่ปรับเพื่อการดูบนมือถือเป็นหลัก" } },
          ],
          reflection: {
            en: "This project highlights campaign adaptation, marketplace design, product communication, and the ability to keep one visual system consistent across platforms.",
            th: "โปรเจกต์นี้โชว์การปรับงานแคมเปญ งานออกแบบ marketplace การสื่อสารสินค้า และการรักษาระบบภาพเดียวกันให้สม่ำเสมอข้ามแพลตฟอร์ม",
          },
        }),
      },
      {
        title: { en: "AI-ASSISTED WEB SYSTEM", th: "ระบบเว็บด้วยความช่วยเหลือ AI" },
        category: { en: "Web & UI Design", th: "เว็บและ UI Design" },
        description: {
          en: "Modern web UI design and AI-assisted front-end development. From wireframes to polished interfaces, built with design systems and workflow automation in mind.",
          th: "การออกแบบ Web UI สมัยใหม่และการพัฒนา Front-end ด้วย AI ตั้งแต่ Wireframe จนถึงอินเทอร์เฟซที่สมบูรณ์ สร้างด้วย Design System และระบบอัตโนมัติ",
        },
        tags: ["UI Design", "Figma", "Web Dev"],
        caseStudy: createCaseStudy({
          overview: {
            en: "A web and UI visual design project exploring how layout, design systems, and AI-assisted front-end workflows can turn ideas into polished digital interfaces.",
            th: "โปรเจกต์ออกแบบภาพสำหรับเว็บและ UI ที่ทดลองการใช้ layout, design system และเวิร์กโฟลว์ front-end ที่มี AI ช่วย เพื่อเปลี่ยนไอเดียให้เป็น interface ที่สมบูรณ์",
          },
          goal: {
            en: "Create a clean, responsive, and presentation-ready interface that communicates clearly and feels modern.",
            th: "สร้าง interface ที่สะอาด responsive พร้อมนำเสนอ สื่อสารชัด และให้ความรู้สึกทันสมัย",
          },
          concept: {
            en: "This project connects visual design, component thinking, responsive layout, and implementation workflow into a practical web system.",
            th: "โปรเจกต์นี้เชื่อมงานออกแบบภาพ การคิดเป็น component, responsive layout และเวิร์กโฟลว์การพัฒนาให้เป็นระบบเว็บที่ใช้งานได้จริง",
          },
          direction: [
            { en: "Clean interface hierarchy", th: "ลำดับข้อมูล UI ที่สะอาด" },
            { en: "Responsive web layout", th: "เลย์เอาต์เว็บแบบ responsive" },
            { en: "Design-to-build workflow", th: "เวิร์กโฟลว์จาก design สู่การสร้างจริง" },
          ],
          visualSystem: [
            ...DEFAULT_VISUAL_SYSTEM,
            {
              label: { en: "Typography", th: "ตัวอักษร" },
              desc: { en: "Uses type scale and hierarchy to make interface content easier to scan.", th: "ใช้ขนาดและลำดับตัวอักษรเพื่อให้เนื้อหาใน interface อ่านง่าย" },
            },
          ],
          reflection: {
            en: "This project demonstrates UI layout thinking, web visual design, responsive composition, and AI-assisted implementation workflow.",
            th: "โปรเจกต์นี้โชว์การคิด layout UI งานภาพสำหรับเว็บ องค์ประกอบแบบ responsive และเวิร์กโฟลว์พัฒนาที่ใช้ AI ช่วย",
          },
        }),
      },
    ],
  },
  testimonials: {
    sectionLabel: { en: "PROFESSIONAL PROFILE", th: "โปรไฟล์การทำงาน" },
    heading1: { en: "How I bring", th: "จุดแข็งใน" },
    heading2: { en: "value", th: "การทำงาน" },
    items: [
      {
        quote: { en: "Connects commercial design judgment with AI-assisted exploration to turn broad ideas into focused visual directions.", th: "เชื่อมการตัดสินใจด้านงานออกแบบเชิงพาณิชย์กับการสำรวจด้วย AI เพื่อเปลี่ยนไอเดียกว้าง ๆ ให้เป็นทิศทางภาพที่ชัดเจน" },
        name: "Visual Direction",
        role: { en: "Project strength", th: "จุดแข็งของการทำงาน" },
        initials: "VD",
      },
      {
        quote: { en: "Builds repeatable workflows across design, mockup, 3D, and file organization so production stays fast and consistent.", th: "สร้างเวิร์กโฟลว์ที่ทำซ้ำได้ทั้งงานออกแบบ ม็อกอัพ 3D และการจัดไฟล์ เพื่อให้งานผลิตรวดเร็วและสม่ำเสมอ" },
        name: "Production Workflow",
        role: { en: "Project strength", th: "จุดแข็งของการทำงาน" },
        initials: "PW",
      },
      {
        quote: { en: "Adapts one visual system into campaign, social, e-commerce, presentation, and short-form formats without losing consistency.", th: "ปรับระบบภาพเดียวให้ใช้ได้กับแคมเปญ โซเชียล อีคอมเมิร์ซ งานนำเสนอ และวิดีโอสั้น โดยยังคงความสม่ำเสมอ" },
        name: "Platform Adaptation",
        role: { en: "Project strength", th: "จุดแข็งของการทำงาน" },
        initials: "PA",
      },
    ],
  },
  footer: {
    tagline: {
      en: "Creative designer specializing in AI-assisted visual production and modern digital media.",
      th: "นักออกแบบที่เชี่ยวชาญด้านการผลิตภาพด้วย AI และสื่อดิจิทัลสมัยใหม่",
    },
    navStatus: {
      en: "SEEKING FULL-TIME POSITION",
      th: "กำลังมองหางานประจำ",
    },
    copyright: {
      en: "© 2026 Weerapong Hamathulin. All rights reserved.",
      th: "© 2569 วีรพงษ์ หมาตุลิน. สงวนลิขสิทธิ์",
    },
    navigateLabel: { en: "NAVIGATE", th: "เมนู" },
    contactLabel: { en: "CONTACT", th: "ติดต่อ" },
    navItems: [
      { en: "About", th: "เกี่ยวกับ" },
      { en: "Skills & Tools", th: "ทักษะและเครื่องมือ" },
      { en: "Experience", th: "ประสบการณ์" },
      { en: "Work & Design", th: "งานและการออกแบบ" },
      { en: "Contact", th: "ติดต่อ" },
    ],
    email: "Fusenra@gmail.com",
    phone: "083-480-9368",
    location: { en: "Chiangmai, Thailand", th: "เชียงใหม่ ประเทศไทย" },
    ctaEyebrow: { en: "OPEN TO FULL-TIME OPPORTUNITIES", th: "เปิดรับโอกาสงานประจำ" },
    ctaHeading1: { en: "Let's build", th: "มาสร้างงานภาพ" },
    ctaHeading2: { en: "meaningful visuals", th: "ที่มีความหมายด้วยกัน" },
    getInTouchLabel: { en: "GET IN TOUCH", th: "ติดต่อฉัน" },
    emailLabel: { en: "EMAIL", th: "อีเมล" },
    phoneLabel: { en: "PHONE", th: "โทรศัพท์" },
    locationLabel: { en: "LOCATION", th: "ที่ตั้ง" },
    bottomRole: { en: "CREATIVE DESIGNER / AI VISUAL PRODUCTION", th: "นักออกแบบครีเอทีฟ / การผลิตภาพด้วย AI" },
  },
};

const CONTENT_STORAGE_KEY = "wh_site_content";

export function loadStoredContent(): SiteContent {
  try {
    const raw = localStorage.getItem(CONTENT_STORAGE_KEY);
    if (!raw) return DEFAULT_CONTENT;
    const merged = mergeWithDefaults(DEFAULT_CONTENT, JSON.parse(raw)) as SiteContent;
    const upgraded = upgradeLegacyServicesContent(merged);
    if (upgraded !== merged) saveStoredContent(upgraded);
    return upgraded;
  } catch {
    return DEFAULT_CONTENT;
  }
}

export function mergeContentWithDefaults(value: unknown): SiteContent {
  return upgradeLegacyServicesContent(mergeWithDefaults(DEFAULT_CONTENT, value) as SiteContent);
}

function upgradeLegacyServicesContent(content: SiteContent): SiteContent {
  const hasLegacyServices =
    content.services.sectionLabel.en === "WHAT I OFFER" ||
    content.services.heading1.en === "SERVICES &" ||
    content.services.heading2.en === "PRICING" ||
    content.services.quoteLabel.en === "REQUEST A QUOTE" ||
    content.services.processTitle.en === "HOW WE WORK" ||
    content.services.items.some((item) => (
      item.title.en === "AI Visual Production" ||
      item.title.en === "3D Product Rendering" ||
      item.title.en === "E-Commerce Campaigns" ||
      item.title.en === "Web & UI Design"
    ));

  const hasLegacyNavigation = content.navigation.links[1]?.en === "Service";
  const hasLegacyPositioning =
    content.navigation.hireLabel.en === "Hire me" ||
    content.hero.stats.some((stat) => stat.value === "50+") ||
    content.hero.title.en === "Product Designer" ||
    content.testimonials.sectionLabel.en === "TESTIMONIALS" ||
    content.footer.ctaEyebrow.en === "LET'S WORK TOGETHER";

  if (!hasLegacyServices && !hasLegacyNavigation && !hasLegacyPositioning) return content;

  const next = structuredClone(content);
  if (hasLegacyNavigation) next.navigation.links[1] = structuredClone(DEFAULT_CONTENT.navigation.links[1]);
  if (hasLegacyServices) next.services = structuredClone(DEFAULT_CONTENT.services);
  if (hasLegacyPositioning) {
    next.navigation.hireLabel = structuredClone(DEFAULT_CONTENT.navigation.hireLabel);
    next.hero.stats = structuredClone(DEFAULT_CONTENT.hero.stats);
    next.hero.title = structuredClone(DEFAULT_CONTENT.hero.title);
    next.hero.testimonial = structuredClone(DEFAULT_CONTENT.hero.testimonial);
    next.hero.portraitAlt = structuredClone(DEFAULT_CONTENT.hero.portraitAlt);
    next.testimonials = structuredClone(DEFAULT_CONTENT.testimonials);
    next.footer.ctaEyebrow = structuredClone(DEFAULT_CONTENT.footer.ctaEyebrow);
    next.footer.ctaHeading1 = structuredClone(DEFAULT_CONTENT.footer.ctaHeading1);
    next.footer.ctaHeading2 = structuredClone(DEFAULT_CONTENT.footer.ctaHeading2);
  }
  return next;
}

function mergeWithDefaults(defaultValue: unknown, storedValue: unknown): unknown {
  if (Array.isArray(defaultValue)) {
    if (!Array.isArray(storedValue)) return structuredClone(defaultValue);
    if (storedValue.length === 0) return [];

    const fallbackItem = defaultValue.at(-1);
    return storedValue.map((item, index) => {
      const template = defaultValue[index] ?? fallbackItem;
      return template === undefined ? structuredClone(item) : mergeWithDefaults(template, item);
    });
  }

  if (defaultValue && typeof defaultValue === "object") {
    const storedObject = storedValue && typeof storedValue === "object" ? storedValue as Record<string, unknown> : {};
    return Object.fromEntries(
      Object.entries(defaultValue).map(([key, value]) => [key, mergeWithDefaults(value, storedObject[key])]),
    );
  }

  return typeof storedValue === typeof defaultValue ? storedValue : defaultValue;
}

export function saveStoredContent(content: SiteContent) {
  localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
}
