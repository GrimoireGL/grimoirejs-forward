import MaterialFactory from "grimoirejs-fundamental/ref/Material/MaterialFactory";
import LightInfoSceneDesc from "../Objects/LightInfoSceneDesc";
import UniformProxy from "grimoirejs-fundamental/ref/Resource/UniformProxy";
import ImportResolver from "grimoirejs-fundamental/ref/Sort/ImportResolver";
import UniformResolverRegistry from "grimoirejs-fundamental/ref/Material/UniformResolverRegistry";
import ShadingChunk from "raw-loader!../Shaders/ShadingChunk.sort";
import Vector3 from "grimoirejs-math/ref/Vector3";
import MeshRenderer from "grimoirejs-fundamental/ref/Components/MeshRendererComponent";
import TextureCube from "grimoirejs-fundamental/ref/Resource/TextureCube";
import SceneComponent from "grimoirejs-fundamental/ref/Components/SceneComponent";

export default class LightVariableRegister {
    public static registerAll(): void {
        ImportResolver.staticImports["forward-shading"] = ShadingChunk;
        this._registerLightVariable("DIRECTIONAL_LIGHT_DIRECTIONS", (n, p, i) => p.uniformVector3Array(n, i.lights.directional.directions.elements));
        this._registerLightVariable("DIRECTIONAL_LIGHT_COLORS", (n, p, i) => p.uniformVector3Array(n, i.lights.directional.colors.elements));
        this._registerLightVariable("DIRECTIONAL_LIGHT_PARAMS", (n, p, i) => p.uniformVector4Array(n, i.lights.directional.params.elements));
        this._registerLightVariable("AMBIENT_LIGHT_COLOR", (n, p, i) => p.uniformVector3(n, new Vector3(i.lights.ambient.color)));
        this._registerLightVariable("POINT_LIGHT_POSITIONS", (n, p, i) => p.uniformVector3Array(n, i.lights.point.positions.elements));
        this._registerLightVariable("POINT_LIGHT_COLORS", (n, p, i) => p.uniformVector3Array(n, i.lights.point.colors.elements));
        this._registerLightVariable("POINT_LIGHT_PARAMS", (n, p, i) => p.uniformVector2Array(n, i.lights.point.params.elements));
        this._registerLightVariable("SPOT_LIGHT_POSITIONS", (n, p, i) => p.uniformVector3Array(n, i.lights.spot.positions.elements));
        this._registerLightVariable("SPOT_LIGHT_COLORS", (n, p, i) => p.uniformVector3Array(n, i.lights.spot.colors.elements));
        this._registerLightVariable("SPOT_LIGHT_DIRECTIONS", (n, p, i) => p.uniformVector3Array(n, i.lights.spot.directions.elements));
        this._registerLightVariable("SPOT_LIGHT_PARAMS", (n, p, i) => p.uniformVector4Array(n, i.lights.spot.params.elements));
        this._registerLightVariable("SHADOW_MATRICES", (n, p, i) => p.uniformTexture2D(n, i.lights.shadowMap.lightMatrices));
        this._registerLightVariable("SHADOW_MATRICES_COUNT", (n, p, i) => p.uniformFloat(n, i.lights.shadowMap.count));
        this._registerLightVariable("SHADOW_MAP_TEXTURE", (n, p, i) => p.uniformTexture2D(n, i.lights.shadowMap.shadowMap));
        this._registerLightVariable("SHADOW_MAP_ELEMENT_COUNT", (n, p, i) => p.uniformVector2(n, i.lights.shadowMap.shadowMapCountPerEdge));
        this._registerLightVariable("SHADOW_MAP_PIXEL_SIZE", (n, p, i) => p.uniformFloat(n, i.lights.shadowMap.pixelSize));
        UniformResolverRegistry.add("ENVIRONMENT_MAP", (valInfo) => (proxy, args) => {
            const scene = args.transform.node.getComponentInAncestor(SceneComponent);
            const map = scene.hierarchicalDescription.getProperty("skybox") as TextureCube;
            proxy.uniformTextureCube(valInfo.name, map);
        });
        UniformResolverRegistry.add("ENVIRONMENT_MAP_MAX_LOD", (valInfo) => (proxy, args) => {
            const scene = args.transform.node.getComponentInAncestor(SceneComponent);
            const map = scene.hierarchicalDescription.getProperty("skybox") as TextureCube;
            if (map) {
                proxy.uniformFloat(valInfo.name, Math.log2(map.width));
            } else {
                proxy.uniformFloat(valInfo.name, 0);
            }
        });
    }

    private static _registerLightVariable(semantic: string, register: (name: string, proxy: UniformProxy, info: LightInfoSceneDesc) => void): void {
        UniformResolverRegistry.add(semantic, (valInfo) => (proxy, args) => {
            register(valInfo.name, proxy, args.sceneDescription as LightInfoSceneDesc);
        });
    }
}
