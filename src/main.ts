import RenderShadowMapComponent from "./Components/RenderShadowMapComponent";
import ShadowMapCameraComponent from "./Components/ShadowMapCameraComponent";
import LightInfoSceneDesc from "./Objects/LightInfoSceneDesc";
import VectorArrayContainer from "./Util/VectorArrayContainer";
import SceneLightManager from "./Components/SceneLightManager";
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
    SceneComponent.onSceneDescriptionCreation((s:LightInfoSceneDesc)=>{
      s.lights = {
        directional: {
          indicies: [] as string[],
          directions: new VectorArrayContainer(3,0),
          colors: new VectorArrayContainer(3,0),
          params: new VectorArrayContainer(4,0)
        },
        point: {
          indicies: [] as string[],
          positions: new VectorArrayContainer(3,0),
          colors: new VectorArrayContainer(3,0),
          params: new VectorArrayContainer(2,0)
        },
        spot: {
          indicies: [] as string[],
          positions: new VectorArrayContainer(3,0),
          directions: new VectorArrayContainer(3,0),
          colors: new VectorArrayContainer(3,0),
          params: new VectorArrayContainer(3,0)
        },
        shadowMap:{
          size:0,
          xCount:0,
          shadowMap:null
        }
      };
    });
    const g = GrimoireInterface;
    g.registerComponent("ForwardShadingManager",ForwardShadingManager);
    g.registerComponent("Light",LightComponent);
    g.registerComponent("DirectionalLightType",DirectionalLightTypeComponent);
    g.registerComponent("PointLightType",PointLightTypeComponent);
    g.registerComponent("SpotLightType",SpotLightTypeComponent);
    g.registerComponent("SceneLightManager",SceneLightManager);
    g.registerComponent("ShadowMapCamera",ShadowMapCameraComponent);
    g.registerComponent("RenderShadowMap",RenderShadowMapComponent);
    g.overrideDeclaration("scene",["SceneLightManager"]);
    g.overrideDeclaration("render-scene",["RenderShadowMap"]);
    g.nodeDeclarations.get("goml").defaultComponents.push(g.ns("http://grimoire.gl/ns/default")("ForwardShadingManager"));
    g.componentDeclarations.get("MaterialContainer").attributes["material"].default = "new(basic)";
    g.registerNode("light", ["Transform", "Light"]);
    LightVariableRegister.registerAll();
    GLExtRequestor.request("OES_texture_float", true);
  });
}
