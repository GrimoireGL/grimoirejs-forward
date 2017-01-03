import DirectionalLightTypeComponent from "./Components/DirectionalLightTypeComponent";
import LightsInfoDesc from "./Objects/LightsInfoDesc";
import LightComponent from "./Components/LightComponent";
import PointLightTypeComponent from "./Components/PointLightTypeComponent";
import SpotLightTypeComponent from "./Components/SpotLightTypeComponent";
import ForwardShadingManager from "./Components/ForwardShadingManagerComponent";
// Please do not change the name of variable on the line below.
import GrimoireInterface from "grimoirejs";
import GLExtRequestor from "grimoirejs-fundamental/ref/Resource/GLExtRequestor";
import MaterialFactory from "grimoirejs-fundamental/ref/Material/MaterialFactory";
import LightVariableRegister from "./Util/LightVariableRegister";
import SceneComponent from "grimoirejs-fundamental/ref/Components/SceneComponent";
export default () => {
  GrimoireInterface.register(async () => {
    SceneComponent.onSceneDescriptionCreation((s)=>{
      s["lights"] = {
        directional: {
          indicies: [] as string[],
          directions: new Array(15) as number[],
          colors: new Array(15) as number[]
        },
        point: {
          indicies: [] as string[],
          positions: new Array(15) as number[],
          colors: new Array(15) as number[],
          params: new Array(10) as number[]
        },
        spot: {
          indicies: [] as string[],
          positions: new Array(15) as number[],
          directions: new Array(15) as number[],
          colors: new Array(15) as number[],
          params: new Array(15) as number[]
        }
      } as LightsInfoDesc;;
    })
    GrimoireInterface.registerComponent("ForwardShadingManager",ForwardShadingManager);
    GrimoireInterface.registerComponent("Light",LightComponent);
    GrimoireInterface.registerComponent("DirectionalLightType",DirectionalLightTypeComponent);
    GrimoireInterface.registerComponent("PointLightType",PointLightTypeComponent);
    GrimoireInterface.registerComponent("SpotLightType",SpotLightTypeComponent);
    const g = GrimoireInterface;
    g.nodeDeclarations.get("goml").defaultComponents.push(g.ns("http://grimoire.gl/ns/default")("ForwardShadingManager"));
    g.componentDeclarations.get("MaterialContainer").attributes["material"].default = "new(phong)";
    g.registerNode("light", ["Transform", "Light"]);
    LightVariableRegister.registerAll();
    GLExtRequestor.request("OES_texture_float", true);
  });
}
