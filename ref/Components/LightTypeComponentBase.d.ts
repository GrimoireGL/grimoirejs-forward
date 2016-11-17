import ILightInfo from "../Objects/ILightInfo";
import LightsInfoDesc from "../Objects/LightsInfoDesc";
import LightInfoSceneDesc from "../Objects/LightInfoSceneDesc";
import Component from "grimoirejs/ref/Node/Component";
export default class LightTypeComponentBase extends Component {
    protected __ensureLightTypeContainer(sceneDesc: LightInfoSceneDesc): LightInfoSceneDesc;
    protected __ensureIndex<T extends ILightInfo>(lightParameters: T): number;
    protected __generateDefaultLightTypeContainer(): LightsInfoDesc;
}
