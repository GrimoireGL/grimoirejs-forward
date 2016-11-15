import MaterialFactory from "grimoirejs-fundamental/ref/Material/MaterialFactory";
import LightInfoSceneDesc from "../Objects/LightInfoSceneDesc";
import UniformProxy from "grimoirejs-fundamental/ref/Resource/UniformProxy";
import ImportResolver from "grimoirejs-fundamental/ref/Material/ImportResolver";
import EnvUniformValueResolver from "grimoirejs-fundamental/ref/Material/EnvUniformValueResolver";
import ShadingChunk from "raw!../Shaders/ShadingChunk.sort";
import Basic from "raw!../Shaders/Basic.sort";

export default class LightVariableRegister {
  public static registerAll(): void {
    this._registerLightVariable("_dLightDir", (n, p, i) => p.uniformVector3Array(n, i.lights.diretctional.directions));
    this._registerLightVariable("_dLightColor", (n, p, i) => p.uniformVector3Array(n, i.lights.diretctional.colors));
    this._registerLightVariable("_pLightPosition", (n, p, i) => p.uniformVector3Array(n, i.lights.point.positions));
    this._registerLightVariable("_pLightColor", (n, p, i) => p.uniformVector3Array(n, i.lights.point.colors));
    this._registerLightVariable("_pLightParam", (n, p, i) => p.uniformVector2Array(n, i.lights.point.params));
    this._registerLightVariable("_sLightPosition", (n, p, i) => p.uniformVector3Array(n, i.lights.spot.positions));
    this._registerLightVariable("_sLightColor", (n, p, i) => p.uniformVector3Array(n, i.lights.spot.colors));
    this._registerLightVariable("_sLightDir", (n, p, i) => p.uniformVector3Array(n, i.lights.spot.directions));
    this._registerLightVariable("_sLightParam", (n, p, i) => p.uniformVector3Array(n, i.lights.spot.params));
    ImportResolver.staticImports["forward-shading"] = ShadingChunk;
    MaterialFactory.addSORTMaterial("phong", Basic);
  }

  private static _registerLightVariable(valName: string, register: (name: string, proxy: UniformProxy, info: LightInfoSceneDesc) => void): void {
    EnvUniformValueResolver.addResolver(valName, (valInfo) => (proxy, args) => register(valName, proxy, args.sceneDescription as LightInfoSceneDesc));
  }
}
