import SceneLightManager from "./SceneLightManager";
import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
export default class ForwardShadingManagerComponent extends Component {
    static attributes: {
        [key: string]: IAttributeDeclaration;
    };
    private static _typeToMacros;
    private _sceneLightManagers;
    private _macroRegistry;
    $awake(): void;
    addSceneLightManager(s: SceneLightManager): void;
    removeSceneLightManager(s: SceneLightManager): void;
    updateLightCount(): void;
}
