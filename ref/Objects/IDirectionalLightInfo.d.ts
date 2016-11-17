import ILightInfo from "./ILightInfo";
interface IDirectionalLightInfo extends ILightInfo {
    directions: number[];
    colors: number[];
}
export default IDirectionalLightInfo;
