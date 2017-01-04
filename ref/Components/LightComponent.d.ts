import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
export default class LightComponent extends Component {
    static attributes: {
        [key: string]: IAttributeDeclaration;
    };
    /**
     * The type of light changed last time.
     * @type {string}
     */
    private _lastLightType;
    private _lightTypeComponent;
    $awake(): void;
    /**
     * Called when the light type was changed
     * @param {string} type [description]
     */
    private _onLightTypeChanged(type);
    private _addLightTypeComponent(type);
    private _removeLastTypeComponent();
}
