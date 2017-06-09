import LightTypeComponentBase from "./LightTypeComponentBase";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import ISceneUpdateArgument from "grimoirejs-fundamental/ref/SceneRenderer/ISceneUpdateArgument";
export default class SpotLightTypeComponent extends LightTypeComponentBase {
    static attributes: {
        [key: string]: IAttributeDeclaration;
    };
    private _color;
    private _transform;
    private _innerCone;
    private _outerCone;
    private _decay;
    private _intensity;
    private _shadowCamera;
    $awake(): void;
    $update(args: ISceneUpdateArgument): void;
    private _useShadowChanged(v);
}
