import LightTypeComponentBase from "./LightTypeComponentBase";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import ISceneUpdateArgument from "grimoirejs-fundamental/ref/SceneRenderer/ISceneUpdateArgument";
export default class DirectionalLightTypeComponent extends LightTypeComponentBase {
    static attributes: {
        [key: string]: IAttributeDeclaration;
    };
    private _color;
    private _intensity;
    private _transform;
    private _shadowCamera;
    $awake(): void;
    $update(args: ISceneUpdateArgument): void;
    private _useShadowChanged(v);
}
