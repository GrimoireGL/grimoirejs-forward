import Component from "grimoirejs/ref/Node/Component";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
export default class ForwardShadingManagerComponent extends Component {
    static attributes: {
        [key: string]: IAttributeDeclaration;
    };
    $awake(): void;
}
