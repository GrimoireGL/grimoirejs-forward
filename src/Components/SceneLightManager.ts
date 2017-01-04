import LightInfoSceneDesc from "../Objects/LightInfoSceneDesc";
import SceneComponent from "grimoirejs-fundamental/ref/Components/SceneComponent";
import LightInfoDesc from "../Objects/LightsInfoDesc";
import LightTypeComponentBase from "./LightTypeComponentBase";
import ForwardShadingManager from "./ForwardShadingManagerComponent";
import Component from "grimoirejs/ref/Node/Component";
export default class SceneLightManager extends Component {
    public lights: {
        point: LightTypeComponentBase[],
        directional: LightTypeComponentBase[],
        spot: LightTypeComponentBase[]
    } = {
        point: [],
        directional: [],
        spot: []
    };

    private _shadingManager: ForwardShadingManager;

    private _lightSceneDesc: LightInfoDesc;

    public $mount(): void {
        this._shadingManager = this.node.getComponentInAncesotor(ForwardShadingManager);
        const scene = this.node.getComponent(SceneComponent);
        this._lightSceneDesc = (scene.sceneDescription as LightInfoSceneDesc).lights;
        this._shadingManager.addSceneLightManager(this);
    }

    public $unmount():void{
      this._shadingManager.removeSceneLightManager(this);
    }

    public addLight(light: LightTypeComponentBase): void {
        switch (light.lightType) {
            case "point":
                this.lights.point.push(light);
                this._lightSceneDesc.point.colors.incrementLength();
                this._lightSceneDesc.point.positions.incrementLength();
                this._lightSceneDesc.point.params.incrementLength();
                break;
            case "directional":
                this.lights.directional.push(light);
                this._lightSceneDesc.directional.colors.incrementLength();
                this._lightSceneDesc.directional.directions.incrementLength();
                break;
            case "spot":
                this.lights.spot.push(light);
                this._lightSceneDesc.spot.colors.incrementLength();
                this._lightSceneDesc.spot.directions.incrementLength();
                this._lightSceneDesc.spot.positions.incrementLength();
                this._lightSceneDesc.spot.params.incrementLength();
                break;
        }
        this._shadingManager.updateLightCount();
    }

    public removeLight(light: LightTypeComponentBase): void {
        switch(light.lightType){
          case "point":
            const i1 = this.lights.point.indexOf(light);
            this.lights.point.splice(i1, 1);
            this._lightSceneDesc.point.colors.decrementLength();
            this._lightSceneDesc.point.positions.decrementLength();
            this._lightSceneDesc.point.params.decrementLength();
          break;
          case "directional":
            const i2 = this.lights.directional.indexOf(light);
            this.lights.directional.splice(i2, 1);
            this._lightSceneDesc.directional.colors.decrementLength();
            this._lightSceneDesc.directional.directions.decrementLength();
          break;
          case "spot":
            const i3 = this.lights.spot.indexOf(light);
            this.lights.spot.splice(i3, 1);
            this._lightSceneDesc.spot.colors.decrementLength();
            this._lightSceneDesc.spot.directions.decrementLength();
            this._lightSceneDesc.spot.positions.decrementLength();
            this._lightSceneDesc.spot.params.decrementLength();
          break;
        }
        this._shadingManager.updateLightCount();
    }
}
