import SceneLightInfoContainer from "../Objects/SceneLightInfoContainer";
import UniformProxy from "grimoirejs-fundamental/lib/Resource/UniformProxy";
import EnvUniformValueResolver from "grimoirejs-fundamental/lib/Material/EnvUniformValueResolver";
export default class LightVariableRegister {
  public static registerAll(): void {
    this._registerLightVariable("_dLightDir", (n, p, i) => p.uniformVector3Array(n, i.lights.diretctional.directions));
    this._registerLightVariable("_dLightColor", (n, p, i) => p.uniformVector3Array(n, i.lights.diretctional.colors));
  }

  private static _registerLightVariable(valName: string, register: (name: string, proxy: UniformProxy, info: SceneLightInfoContainer) => void): void {
    EnvUniformValueResolver.addResolver(valName, (valInfo) => (proxy, args) => register(valName, proxy, args.sceneDescription as SceneLightInfoContainer));
  }
}
