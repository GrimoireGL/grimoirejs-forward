import LightInfoSceneDesc from "../Objects/LightInfoSceneDesc";
import LightTypeComponentBase from "./LightTypeComponentBase";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
export default class DirectionalLightTypeComponent extends LightTypeComponentBase {
    static attributes: {
        [key: string]: IAttributeDeclaration;
    };
    private _color;
    private _transform;
    $awake(): void;
    $update(sceneDesc: LightInfoSceneDesc): void;
}
