import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
export default class ForwardShadingManagerComponent extends Component {
    static attributes: {
        [key: string]: IAttributeDeclaration;
    };
    private static _typeToMacros;
    maxLightCount: {
        point: number;
        directional: number;
        spot: number;
    };
    private _macroRegistry;
    $awake(): void;
    updateLightCount(type: string, count: number): void;
}
