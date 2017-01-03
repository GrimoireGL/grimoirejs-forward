import ILightInfo from "../Objects/ILightInfo";
import Component from "grimoirejs/ref/Node/Component";
export default class LightTypeComponentBase extends Component {
    protected __ensureIndex<T extends ILightInfo>(lightParameters: T): number;
}
