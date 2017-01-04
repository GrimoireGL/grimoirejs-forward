import SceneLightManager from "./SceneLightManager";
import ILightInfo from "../Objects/ILightInfo";
import LightsInfoDesc from "../Objects/LightsInfoDesc";
import Component from "grimoirejs/ref/Node/Component";
export default class LightTypeComponentBase extends Component {
    lightType: string;
    protected __sceneLightManager: SceneLightManager;
    protected __lightDesc: LightsInfoDesc;
    protected __lightIndex: number;
    $mount(): void;
    $unmount(): void;
    protected __ensureIndex<T extends ILightInfo>(lightParameters: T): number;
}
