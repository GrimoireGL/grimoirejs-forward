import ILightInfo from "./ILightInfo";
import VectorArrayContainer from "../Util/VectorArrayContainer";

interface IDirectionalLightInfo extends ILightInfo {
  directions: VectorArrayContainer;
  colors: VectorArrayContainer;
}

export default IDirectionalLightInfo;
