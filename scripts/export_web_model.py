import argparse
import sys
from pathlib import Path

import bpy


EXCLUDED_OBJECTS = {"bg", "Circle.001"}
WEB_BACKGROUND = (1.0, 0.9387, 0.8069, 1.0)


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", required=True)
    parser.add_argument("--poster", required=True)
    parser.add_argument("--frame", type=int, default=150)
    parser.add_argument("--max-texture", type=int, default=1024)
    parser.add_argument("--decimate", type=float, default=0.38)
    return parser.parse_args(sys.argv[sys.argv.index("--") + 1 :])


def render_poster(path: Path, frame: int):
    scene = bpy.context.scene
    scene.frame_set(frame)
    for obj in scene.objects:
        if obj.name in EXCLUDED_OBJECTS:
            obj.hide_render = True

    scene.world.color = WEB_BACKGROUND[:3]
    if scene.world.use_nodes:
        background = scene.world.node_tree.nodes.get("Background")
        if background:
            background.inputs["Color"].default_value = WEB_BACKGROUND

    scene.render.engine = "BLENDER_EEVEE"
    scene.render.resolution_x = 900
    scene.render.resolution_y = 900
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "WEBP"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.image_settings.quality = 82
    scene.render.film_transparent = True
    scene.render.filepath = str(path)
    bpy.ops.render.render(write_still=True)


def resize_textures(max_size: int):
    for image in bpy.data.images:
        width, height = image.size
        if width <= 0 or height <= 0 or max(width, height) <= max_size:
            continue
        scale = max_size / max(width, height)
        image.scale(max(1, round(width * scale)), max(1, round(height * scale)))


def flatten_meshes(decimate_ratio: float):
    scene = bpy.context.scene
    scene.frame_set(scene.frame_current)

    meshes = [
        obj
        for obj in scene.objects
        if obj.type == "MESH" and not obj.hide_render and obj.name not in EXCLUDED_OBJECTS
    ]
    for obj in bpy.context.selected_objects:
        obj.select_set(False)

    for obj in meshes:
        obj.hide_set(False)
        obj.select_set(True)
        obj.animation_data_clear()

    bpy.context.view_layer.objects.active = meshes[0]
    bpy.ops.object.convert(target="MESH")

    default_material = bpy.data.materials.get("Web Default") or bpy.data.materials.new("Web Default")
    default_material.diffuse_color = (0.72, 0.82, 1.0, 1.0)
    for obj in meshes:
        if not obj.data.materials:
            obj.data.materials.append(default_material)

    textured = [
        obj
        for obj in meshes
        if any(
            material
            and material.use_nodes
            and any(node.bl_idname == "ShaderNodeTexImage" for node in material.node_tree.nodes)
            for material in obj.data.materials
        )
    ]
    mergeable = [obj for obj in meshes if obj not in textured]

    for obj in meshes:
        obj.select_set(obj in mergeable)
    bpy.context.view_layer.objects.active = mergeable[0]
    bpy.ops.object.join()
    model = bpy.context.object
    model.name = "DSTK_Web_Showcase"
    model.data.name = "DSTK_Web_Showcase_Mesh"

    if 0 < decimate_ratio < 1:
        modifier = model.modifiers.new(name="Web Decimate", type="DECIMATE")
        modifier.ratio = decimate_ratio
        modifier.use_collapse_triangulate = True
        bpy.context.view_layer.objects.active = model
        bpy.ops.object.modifier_apply(modifier=modifier.name)

    keep = {model, *textured}
    for obj in list(bpy.data.objects):
        if obj not in keep:
            bpy.data.objects.remove(obj, do_unlink=True)

    return [model, *textured]


def export_glb(path: Path):
    bpy.ops.export_scene.gltf(
        filepath=str(path),
        export_format="GLB",
        use_selection=False,
        export_animations=False,
        export_cameras=False,
        export_lights=False,
        export_materials="EXPORT",
        export_image_format="WEBP",
        export_image_quality=76,
        export_apply=True,
        export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=7,
        export_draco_position_quantization=14,
        export_draco_normal_quantization=10,
        export_draco_texcoord_quantization=12,
    )


def main():
    args = parse_args()
    output = Path(args.output).resolve()
    poster = Path(args.poster).resolve()
    output.parent.mkdir(parents=True, exist_ok=True)
    poster.parent.mkdir(parents=True, exist_ok=True)

    render_poster(poster, args.frame)
    resize_textures(args.max_texture)
    models = flatten_meshes(args.decimate)
    export_glb(output)

    print(
        "CODEX_WEB_EXPORT",
        {
            "output": str(output),
            "bytes": output.stat().st_size,
            "objects": len(models),
            "vertices": sum(len(model.data.vertices) for model in models),
            "polygons": sum(len(model.data.polygons) for model in models),
            "materials": len({material.name for model in models for material in model.data.materials if material}),
        },
    )


if __name__ == "__main__":
    main()
