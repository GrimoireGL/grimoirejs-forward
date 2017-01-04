import SceneLightManager from "./SceneLightManager";
import ILightInfo from "../Objects/ILightInfo";
import Component from "grimoirejs/ref/Node/Component";
export default class LightTypeComponentBase extends Component {
    protected __sceneLightManager: SceneLightManager;
    $mount(): void;
    protected __ensureIndex<T extends ILightInfo>(lightParameters: T): number;
}
