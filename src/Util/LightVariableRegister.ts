import MaterialFactory from "grimoirejs-fundamental/ref/Material/MaterialFactory";
import LightInfoSceneDesc from "../Objects/LightInfoSceneDesc";
import UniformProxy from "grimoirejs-fundamental/ref/Resource/UniformProxy";
import ImportResolver from "grimoirejs-fundamental/ref/Sort/ImportResolver";
import UniformResolverRegistry from "grimoirejs-fundamental/ref/Material/UniformResolverRegistry";
import ShadingChunk from "raw!../Shaders/ShadingChunk.sort";
import Basic from "raw!../Shaders/Basic.sort";

export default class LightVariableRegister {
  public static registerAll(): void {
    ImportResolver.staticImports["forward-shading"] = ShadingChunk;
    MaterialFactory.addSORTMaterial("phong", Basic);
    this._registerLightVariable("DIRECTIONAL_LIGHT_DIRECTIONS", (n, p, i) => p.uniformVector3Array(n, i.lights.directional.directions.elements));
    this._registerLightVariable("DIRECTIONAL_LIGHT_COLORS", (n, p, i) => p.uniformVector3Array(n, i.lights.directional.colors.elements));
    this._registerLightVariable("POINT_LIGHT_POSITIONS", (n, p, i) => p.uniformVector3Array(n, i.lights.point.positions.elements));
    this._registerLightVariable("POINT_LIGHT_COLORS", (n, p, i) => p.uniformVector3Array(n, i.lights.point.colors.elements));
    this._registerLightVariable("POINT_LIGHT_PARAMS", (n, p, i) => p.uniformVector2Array(n, i.lights.point.params.elements));
    this._registerLightVariable("SPOT_LIGHT_POSITIONS", (n, p, i) => p.uniformVector3Array(n, i.lights.spot.positions.elements));
    this._registerLightVariable("SPOT_LIGHT_COLORS", (n, p, i) => p.uniformVector3Array(n, i.lights.spot.colors.elements));
    this._registerLightVariable("SPOT_LIGHT_DIRECTIONS", (n, p, i) => p.uniformVector3Array(n, i.lights.spot.directions.elements));
    this._registerLightVariable("SPOT_LIGHT_PARAMS", (n, p, i) => p.uniformVector3Array(n, i.lights.spot.params.elements));
  }

  private static _registerLightVariable(semantic: string, register: (name: string, proxy: UniformProxy, info: LightInfoSceneDesc) => void): void {
    UniformResolverRegistry.add(semantic, (valInfo) => (proxy, args) => {
      register(valInfo.name, proxy, args.sceneDescription as LightInfoSceneDesc);
    });
  }
}
