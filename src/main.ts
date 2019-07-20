import Vector2 from "grimoirejs-math/ref/Vector2";
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
import AmbientLightTypeComponent from "./Components/AmbientLightTypeComponent";
import TransformComponent from "grimoirejs-fundamental/ref/Components/TransformComponent";
export default () => {
    GrimoireInterface.register(async () => {
        SceneComponent.onSceneDescriptionCreation((s: LightInfoSceneDesc) => {
            s.lights = {
                directional: {
                    indicies: [] as string[],
                    directions: new VectorArrayContainer(3, 0),
                    colors: new VectorArrayContainer(3, 0),
                    params: new VectorArrayContainer(4, 0)
                },
                point: {
                    indicies: [] as string[],
                    positions: new VectorArrayContainer(3, 0),
                    colors: new VectorArrayContainer(3, 0),
                    params: new VectorArrayContainer(2, 0)
                },
                spot: {
                    indicies: [] as string[],
                    positions: new VectorArrayContainer(3, 0),
                    directions: new VectorArrayContainer(3, 0),
                    colors: new VectorArrayContainer(3, 0),
                    params: new VectorArrayContainer(4, 0)
                },
                ambient: {
                    color: [0, 0, 0]
                },
                shadowMap: {
                    shadowMapCountPerEdge: new Vector2(0, 0),
                    shadowMap: null,
                    lightMatrices: null,
                    pixelSize: 0,
                    count: 0
                }
            };
        });
        const g = GrimoireInterface;
        g.registerComponent(ForwardShadingManager);
        g.registerComponent(LightComponent);
        g.registerComponent(DirectionalLightTypeComponent);
        g.registerComponent(PointLightTypeComponent);
        g.registerComponent(SpotLightTypeComponent);
        g.registerComponent(SceneLightManager);
        g.registerComponent(ShadowMapCameraComponent);
        g.registerComponent(RenderShadowMapComponent);
        g.registerComponent(AmbientLightTypeComponent);
        g.overrideDeclaration("scene", [SceneLightManager]);
        g.overrideDeclaration("render-scene", [RenderShadowMapComponent]);
        g.overrideDeclaration("goml", [ForwardShadingManager]);
        g.overrideDeclaration("mesh", [], { material: "new(basic-shading)" })
        g.registerNode("light", [TransformComponent, LightComponent]);
        LightVariableRegister.registerAll();
        GLExtRequestor.request("OES_texture_float");
    });
};
