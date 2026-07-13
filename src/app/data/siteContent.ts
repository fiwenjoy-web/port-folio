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
    quoteLabel: BT;
    processTitle: BT;
    items: Array<{
      title: BT;
      desc: BT;
      price: string;
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
      { en: "Service", th: "บริการ" },
      { en: "Resume", th: "ประวัติ" },
      { en: "Contact", th: "ติดต่อ" },
    ],
    portfolioLabel: { en: "Portfolio", th: "ผลงาน" },
    hireLabel: { en: "Hire me", th: "จ้างงาน" },
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
      { value: "50+", label: { en: "Projects Delivered", th: "โปรเจกต์ที่ส่งมอบ" } },
      { value: "AI", label: { en: "Visual Production", th: "การผลิตภาพ" } },
      { value: "5", label: { en: "Core Skills", th: "ทักษะหลัก" } },
    ],
    greeting: { en: "Hello!", th: "สวัสดี!" },
    introPrefix: { en: "I'm", th: "ผมคือ" },
    displayName: "Fuse",
    title: { en: "Product Designer", th: "นักออกแบบผลิตภัณฑ์" },
    testimonial: {
      en: "Exceptional product design ensures our website's success. Highly Recommended",
      th: "งานออกแบบผลิตภัณฑ์ที่ยอดเยี่ยมช่วยให้เว็บไซต์ของเราประสบความสำเร็จ ขอแนะนำอย่างยิ่ง",
    },
    experienceValue: { en: "3 Years", th: "3 ปี" },
    experienceLabel: { en: "Experience", th: "ประสบการณ์" },
    portraitAlt: { en: "Fuse, product designer", th: "ฟิวส์ นักออกแบบผลิตภัณฑ์" },
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
    sectionLabel: { en: "WHAT I OFFER", th: "สิ่งที่ฉันนำเสนอ" },
    heading1: { en: "SERVICES &", th: "บริการ &" },
    heading2: { en: "PRICING", th: "ราคา" },
    quoteLabel: { en: "REQUEST A QUOTE", th: "ขอใบเสนอราคา" },
    processTitle: { en: "HOW WE WORK", th: "ขั้นตอนการทำงาน" },
    items: [
      {
        title: { en: "AI Visual Production", th: "การผลิตภาพด้วย AI" },
        desc: {
          en: "Generative AI-enhanced product visuals, campaign artwork, and brand imagery — produced fast with a polished commercial finish.",
          th: "ภาพสินค้าที่ปรับปรุงด้วย AI เชิงสร้างสรรค์ งานศิลป์แคมเปญ และภาพแบรนด์ — ผลิตได้รวดเร็วด้วยความสำเร็จเชิงพาณิชย์",
        },
        price: "From ฿3,500",
      },
      {
        title: { en: "3D Product Rendering", th: "การเรนเดอร์สินค้า 3D" },
        desc: {
          en: "Photorealistic 3D renders and mockup concepts for packaging, product advertising, and e-commerce listing imagery.",
          th: "การเรนเดอร์ 3D และแนวคิดโมเดลที่สมจริงสำหรับบรรจุภัณฑ์ โฆษณาสินค้า และภาพรายการอีคอมเมิร์ซ",
        },
        price: "From ฿4,500",
      },
      {
        title: { en: "E-Commerce Campaigns", th: "แคมเปญอีคอมเมิร์ซ" },
        desc: {
          en: "Full-suite campaign design for Shopee, Lazada, and TikTok Shop — banners, covers, product shots, and short-form video.",
          th: "การออกแบบแคมเปญครบชุดสำหรับ Shopee, Lazada และ TikTok Shop — แบนเนอร์ ปก ภาพสินค้า และวิดีโอสั้น",
        },
        price: "From ฿2,800",
      },
      {
        title: { en: "Web & UI Design", th: "ออกแบบเว็บและ UI" },
        desc: {
          en: "AI-assisted web system design and front-end implementation. From wireframe to pixel-perfect responsive interface.",
          th: "การออกแบบระบบเว็บและการพัฒนา Front-end ด้วย AI ตั้งแต่ Wireframe จนถึงอินเทอร์เฟซ Responsive ที่สมบูรณ์",
        },
        price: "From ฿6,000",
      },
    ],
    tags: [
      ["Midjourney", "Stable Diffusion", "Photoshop AI"],
      ["Blender", "3D Modeling", "Lighting"],
      ["Shopee", "Lazada", "TikTok Shop"],
      ["Figma", "React", "AI Workflow"],
    ],
    steps: [
      { step: "01", label: { en: "Brief", th: "รับบรีฟ" }, desc: { en: "Share your project goals and references", th: "แชร์เป้าหมายโปรเจกต์และอ้างอิง" } },
      { step: "02", label: { en: "Concept", th: "คอนเซปต์" }, desc: { en: "Initial concepts and direction approval", th: "แนวคิดเริ่มต้นและการอนุมัติทิศทาง" } },
      { step: "03", label: { en: "Produce", th: "ผลิต" }, desc: { en: "Full production with revision rounds", th: "การผลิตเต็มรูปแบบพร้อมรอบแก้ไข" } },
      { step: "04", label: { en: "Deliver", th: "ส่งมอบ" }, desc: { en: "Final files in all required formats", th: "ไฟล์สุดท้ายในทุกรูปแบบที่ต้องการ" } },
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
      },
      {
        title: { en: "3D PRODUCT VISUALIZATION", th: "การสร้างภาพสินค้า 3D" },
        category: { en: "3D Render", th: "การเรนเดอร์ 3D" },
        description: {
          en: "Hyper-realistic 3D product renders and mockups created for e-commerce and commercial advertising. Blender-based workflow with custom lighting setups.",
          th: "การเรนเดอร์สินค้า 3D และโมเดลที่สมจริงสูงสำหรับอีคอมเมิร์ซและโฆษณาเชิงพาณิชย์ ขั้นตอนบน Blender พร้อมการตั้งค่าแสงที่กำหนดเอง",
        },
        tags: ["Blender", "3D Render", "Product Vis"],
      },
      {
        title: { en: "AI PRODUCT 3D VISUALS", th: "ภาพสินค้า 3D ด้วย AI" },
        category: { en: "AI Production", th: "การผลิตด้วย AI" },
        description: {
          en: "AI-assisted visual production pipeline merging generative imagery with 3D renders for cutting-edge product advertising and campaign content.",
          th: "ไปป์ไลน์การผลิตภาพด้วย AI ที่ผสานภาพ Generative กับการเรนเดอร์ 3D สำหรับโฆษณาสินค้าและเนื้อหาแคมเปญที่ล้ำสมัย",
        },
        tags: ["AI Generation", "Midjourney", "Photoshop"],
      },
      {
        title: { en: "E-COMMERCE CAMPAIGNS", th: "แคมเปญอีคอมเมิร์ซ" },
        category: { en: "Campaign Design", th: "การออกแบบแคมเปญ" },
        description: {
          en: "End-to-end campaign design for Shopee, Lazada, and TikTok Shop. Includes banner sets, product covers, and short-form video content adapted for each platform.",
          th: "การออกแบบแคมเปญแบบครบวงจรสำหรับ Shopee, Lazada และ TikTok Shop รวมถึงชุดแบนเนอร์ ปกสินค้า และเนื้อหาวิดีโอสั้นที่ปรับให้เหมาะกับแต่ละแพลตฟอร์ม",
        },
        tags: ["Shopee", "Lazada", "TikTok"],
      },
      {
        title: { en: "AI-ASSISTED WEB SYSTEM", th: "ระบบเว็บด้วยความช่วยเหลือ AI" },
        category: { en: "Web & UI Design", th: "เว็บและ UI Design" },
        description: {
          en: "Modern web UI design and AI-assisted front-end development. From wireframes to polished interfaces, built with design systems and workflow automation in mind.",
          th: "การออกแบบ Web UI สมัยใหม่และการพัฒนา Front-end ด้วย AI ตั้งแต่ Wireframe จนถึงอินเทอร์เฟซที่สมบูรณ์ สร้างด้วย Design System และระบบอัตโนมัติ",
        },
        tags: ["UI Design", "Figma", "Web Dev"],
      },
    ],
  },
  testimonials: {
    sectionLabel: { en: "TESTIMONIALS", th: "คำรับรอง" },
    heading1: { en: "Trusted by", th: "ได้รับความไว้วางใจจาก" },
    heading2: { en: "clients", th: "ลูกค้า" },
    items: [
      {
        quote: { en: "The AI-assisted product visuals elevated our entire e-commerce presence. Fast turnaround, polished commercial finish — exactly what our brand needed.", th: "ภาพสินค้าที่ผลิตด้วย AI ยกระดับภาพลักษณ์อีคอมเมิร์ซของเราทั้งหมด งานเร็วและเนี้ยบ ตรงกับที่แบรนด์เราต้องการเป๊ะ" },
        name: "Napat S.",
        role: { en: "Brand Manager, Dr. Hygiene", th: "ผู้จัดการแบรนด์, Dr. Hygiene" },
        initials: "NS",
      },
      {
        quote: { en: "Exceptional 3D renders that looked better than photography. The lighting and detail work made our packaging launch a standout success.", th: "งานเรนเดอร์ 3D ยอดเยี่ยม ดูดีกว่าถ่ายจริง การจัดแสงและรายละเอียดทำให้การเปิดตัวบรรจุภัณฑ์ของเราโดดเด่นมาก" },
        name: "Ploy T.",
        role: { en: "Marketing Lead, Pinnacle", th: "หัวหน้าการตลาด, Pinnacle" },
        initials: "PT",
      },
      {
        quote: { en: "A rare designer who understands both commercial strategy and cutting-edge AI workflows. Every campaign delivered measurable results.", th: "นักออกแบบหายากที่เข้าใจทั้งกลยุทธ์เชิงพาณิชย์และขั้นตอน AI ล้ำสมัย ทุกแคมเปญให้ผลลัพธ์ที่วัดได้จริง" },
        name: "Kridsada M.",
        role: { en: "Founder, TH Commerce", th: "ผู้ก่อตั้ง, TH Commerce" },
        initials: "KM",
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
    ctaEyebrow: { en: "LET'S WORK TOGETHER", th: "มาร่วมงานกัน" },
    ctaHeading1: { en: "Have a project", th: "มีโปรเจกต์" },
    ctaHeading2: { en: "in mind?", th: "ในใจหรือยัง?" },
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
    return mergeWithDefaults(DEFAULT_CONTENT, JSON.parse(raw)) as SiteContent;
  } catch {
    return DEFAULT_CONTENT;
  }
}

function mergeWithDefaults(defaultValue: unknown, storedValue: unknown): unknown {
  if (Array.isArray(defaultValue)) {
    if (!Array.isArray(storedValue)) return structuredClone(defaultValue);
    return defaultValue.map((item, index) => mergeWithDefaults(item, storedValue[index]));
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
