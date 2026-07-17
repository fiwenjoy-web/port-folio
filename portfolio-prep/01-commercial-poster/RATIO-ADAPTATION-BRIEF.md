# Ratio Adaptation Brief

Use this brief when adapting one layered campaign artwork into multiple social and
portfolio formats. The result must be a real layout adaptation, not a stretched or
automatically cropped copy of the source artwork.

## Source files

- Layered PSD with editable text, Smart Objects, logos, people, and product assets
- Reference JPG or PNG showing the approved original composition
- Brand fonts and linked assets when they are not embedded in the PSD

## Required formats

1. `4:5` - portrait feed and portfolio cover (`1080x1350` recommended)
2. `1:1` - square social post (`1080x1080` recommended)
3. `16:9` - website or campaign banner (`1920x1080` recommended)

Keep the highest useful source resolution while working. Export the final delivery at
the recommended dimensions only when a platform-ready version is needed.

## Layout requirements

- Preserve the approved headline, Thai copy, dates, prices, logos, person, and products.
- Recompose each ratio individually; do not scale the entire poster as one flat image.
- Keep the headline, main promotion, product group, and CTA readable at a 360 px preview.
- Enlarge important content and remove unnecessary empty space.
- Keep logos and CTA elements inside a safe area of at least 3% from every edge.
- Prevent labels, floating cards, product cutouts, and coupon decorations from overlapping text.
- Keep decorative icons attached to the section they belong to after repositioning groups.
- Preserve the original visual hierarchy and pixel-art campaign style.

## AI usage rules

- AI may be used to extend or reconstruct background-only areas.
- Do not use AI to recreate campaign copy, dates, prices, logos, people, or product packaging.
- Do not introduce invented products, distorted text, duplicated people, or fake brand marks.
- Keep an `AI-Assisted Background Extension` layer in every PSD that uses AI.
- Always disclose AI assistance in the project description.

Disclosure text:

> AI was used only to extend the campaign background. The campaign copy, promotion
> details, logos, person, and product assets come from the original layered artwork.

Thai disclosure:

> ใช้ AI ช่วยเฉพาะการขยายฉากหลังของแคมเปญ ส่วนข้อความ โปรโมชั่น โลโก้ บุคคล
> และภาพสินค้ามาจากไฟล์งานต้นฉบับแบบแยกเลเยอร์

## Deliverables

- One editable layered PSD for each ratio
- One optimized WebP for each ratio at quality 88-92
- Clear filenames containing the ratio and `ai-assisted` when AI was used
- A visual check of every WebP after export

Filename pattern:

```text
01-project-name-4x5-ai-assisted.psd
01-project-name-4x5-ai-assisted.webp
02-project-name-1x1-ai-assisted.psd
02-project-name-1x1-ai-assisted.webp
03-project-name-16x9-ai-assisted.psd
03-project-name-16x9-ai-assisted.webp
```

## Prompt for the next project

```text
ใช้ไฟล์ PSD ที่แนบมา ปรับงานเป็น 4:5, 1:1 และ 16:9 ตามไฟล์
RATIO-ADAPTATION-BRIEF.md ให้จัดองค์ประกอบใหม่แยกตามแต่ละอัตราส่วน
รักษาข้อความ โลโก้ บุคคล และสินค้าจากไฟล์ต้นฉบับ ใช้ AI ได้เฉพาะขยายฉากหลัง
ส่งออกเป็น PSD แยกเลเยอร์และ WebP พร้อมตรวจภาพจริงทุกขนาดก่อนส่งงาน
```
