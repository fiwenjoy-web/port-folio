# Profile Photo Replacement

Both themes can use a new photo, but their pipelines are different.

## Master Photo

Prepare `profile-master.jpg`:

- High resolution, ideally 2000 px or taller
- Even lighting and natural skin tone
- Full torso visible with space around shoulders
- Sharp face and hair edges
- Simple or removable background

## Dark Theme

Prepare `profile-dark-cutout.png`:

- Transparent background
- Portrait orientation
- Keep the full torso and shoulders
- Recommended size: about 1600 x 2000 px

Current website asset:
`src/assets/portrait.webp`

This image can be replaced directly and converted to WEBP.

## Colorful Theme

Prepare `profile-colorful-card.jpg`:

- Portrait crop matching the photo card
- Recommended size: at least 1600 x 2000 px
- Keep the face centered with room above the head

The Colorful portrait is embedded inside the 3D model texture. Replace it in:
`C:\Users\Atcharapond\Desktop\dstk.blend`

Then export both:

- `public/models/dstk-showcase.glb`
- `public/models/dstk-poster.webp`

The GLB is the interactive version. The WEBP poster is shown while 3D loads or when WebGL is unavailable.
