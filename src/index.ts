import ComponentsDirectionalLightTypeComponent from "./Components/DirectionalLightTypeComponent";
import ComponentsForwardShadingManagerComponent from "./Components/ForwardShadingManagerComponent";
import ComponentsLightComponent from "./Components/LightComponent";
import ComponentsLightTypeComponentBase from "./Components/LightTypeComponentBase";
import ComponentsPointLightTypeComponent from "./Components/PointLightTypeComponent";
import ComponentsRenderShadowMapComponent from "./Components/RenderShadowMapComponent";
import ComponentsSceneLightManager from "./Components/SceneLightManager";
import ComponentsShadowMapCameraComponent from "./Components/ShadowMapCameraComponent";
import ComponentsSpotLightShadowMapCameraComponent from "./Components/SpotLightShadowMapCameraComponent";
import ComponentsSpotLightTypeComponent from "./Components/SpotLightTypeComponent";
import UtilLightVariableRegister from "./Util/LightVariableRegister";
import UtilVectorArrayContainer from "./Util/VectorArrayContainer";

export const __VERSION__ = "0.0.0-development";
export const __NAME__ = "grimoirejs-forward-shading";

import __MAIN__ from "./main";

let __EXPOSE__ = {
  "Components": {
    "DirectionalLightTypeComponent": ComponentsDirectionalLightTypeComponent,
    "ForwardShadingManagerComponent": ComponentsForwardShadingManagerComponent,
    "LightComponent": ComponentsLightComponent,
    "LightTypeComponentBase": ComponentsLightTypeComponentBase,
    "PointLightTypeComponent": ComponentsPointLightTypeComponent,
    "RenderShadowMapComponent": ComponentsRenderShadowMapComponent,
    "SceneLightManager": ComponentsSceneLightManager,
    "ShadowMapCameraComponent": ComponentsShadowMapCameraComponent,
    "SpotLightShadowMapCameraComponent": ComponentsSpotLightShadowMapCameraComponent,
    "SpotLightTypeComponent": ComponentsSpotLightTypeComponent
  },
  "Util": {
    "LightVariableRegister": UtilLightVariableRegister,
    "VectorArrayContainer": UtilVectorArrayContainer
  }
};

import gr from "grimoirejs";
gr.notifyRegisteringPlugin(__NAME__);
let __BASE__ = __MAIN__();

Object.assign(__EXPOSE__, {
  __VERSION__: __VERSION__,
  __NAME__: __NAME__
});
Object.assign(__BASE__ || {}, __EXPOSE__);

(window as any)["GrimoireJS"].lib.forward_shading = __EXPOSE__;

export default __BASE__;
