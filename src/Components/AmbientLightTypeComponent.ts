import ShadowMapCameraComponent from "./ShadowMapCameraComponent";
import LightInfoSceneDesc from "../Objects/LightInfoSceneDesc";
import LightTypeComponentBase from "./LightTypeComponentBase";
import IAttributeDeclaration from "grimoirejs/ref/Interface/IAttributeDeclaration";
import TransformComponent from "grimoirejs-fundamental/ref/Components/TransformComponent";
import ISceneUpdateArgument from "grimoirejs-fundamental/ref/SceneRenderer/ISceneUpdateArgument";
import Vector3 from "grimoirejs-math/ref/Vector3";
import Color3 from "grimoirejs-math/ref/Color3";
export default class AmbientLightTypeComponent extends LightTypeComponentBase {
    public static componentName = "AmbientLight";
    public static attributes: { [key: string]: IAttributeDeclaration } = {
        color: {
            converter: "Color3",
            default: "white"
        },
        intensity: {
            converter: "Number",
            default: 0.1
        }
    };

    public color: Color3;

    public intensity: number;

    private _transform: TransformComponent;

    public $awake(): void {
        this.__bindAttributes();
        this.lightType = "ambient";
    }

    public $update(args: ISceneUpdateArgument): void {
        const sceneDesc = args.sceneDescription as LightInfoSceneDesc;
        // TODO: How will we treat if there were 2 or more ambient lights?
        sceneDesc.lights.ambient.color = [this.color.R * this.intensity, this.color.G * this.intensity, this.color.B * this.intensity];
    }
}
