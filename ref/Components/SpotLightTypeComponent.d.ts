import LightInfoSceneDesc from "../Objects/LightInfoSceneDesc";
import LightTypeComponentBase from "./LightTypeComponentBase";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
export default class SpotLightTypeComponent extends LightTypeComponentBase {
    static attributes: {
        [key: string]: IAttributeDeclaration;
    };
    private _color;
    private _transform;
    private _innerCone;
    private _outerCone;
    private _decay;
    $awake(): void;
    $update(sceneDesc: LightInfoSceneDesc): void;
}
