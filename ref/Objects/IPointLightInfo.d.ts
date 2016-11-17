import ILightInfo from "./ILightInfo";
interface IPointLightInfo extends ILightInfo {
    colors: number[];
    positions: number[];
    /**
     * (Distance,Decay)
     * @type {number[]}
     */
    params: number[];
}
export default IPointLightInfo;
