import Matrix from "grimoirejs-math/ref/Matrix";
import Vector3 from "grimoirejs-math/ref/Vector3";
import Texture2D from "grimoirejs-fundamental/ref/Resource/Texture2D";
import SceneLightManager from "./SceneLightManager";
import CameraComponent from "grimoirejs-fundamental/ref/Components/CameraComponent";
import Framebuffer from "grimoirejs-fundamental/ref/Resource/FrameBuffer";
import AABB from "grimoirejs-math/ref/AABB";
export default class ShadowMapCameraComponent extends CameraComponent {

    public shadowMapIndex: number;

    private _sceneAABBCache: AABB = new AABB();

    private _vectorCache: Vector3 = new Vector3(0, 0, 0);

    public $awake(): void {
        this.Near = 0.01;
        this.Far = 50.0;
        this.OrthographicMode = true;
        this.OrthoSize = 30;
        this.AutoAspect = false;
        this.Aspect = 1.0;
    }

    public $mount(): void {
        super.$mount();
        const sm = this.containedScene.node.getComponent(SceneLightManager);
        sm.addShadowMapCamera(this);
    }

    public updateCamera(sceneCamera: CameraComponent): void {
        this._sceneAABBCache.clear();
        const ipv = Matrix.inverse(sceneCamera.ProjectionViewMatrix);
        for (let ix = 0; ix < 2; ix++) {
            for (let iy = 0; iy < 2; iy++) {
                for (let iz = 0; iz < 2; iz++) {
                    this._vectorCache.rawElements[0] = ix == 0 ? -1 : 1;
                    this._vectorCache.rawElements[1] = iy == 0 ? -1 : 1;
                    this._vectorCache.rawElements[2] = iz == 0 ? -1 : 1;
                    this._sceneAABBCache.expand(Matrix.transformPoint(ipv,this._vectorCache));
                }
            }
        }
        const diagonal = this._sceneAABBCache.pointLBF.subtractWith(this._sceneAABBCache.Center).magnitude;
        //this.transform.localPosition = this._sceneAABBCache.Center.addWith(this.transform.forward.negateThis().multiplyWith(diagonal));
    }

    public $unmount(): void {
        const sm = this.containedScene.node.getComponent(SceneLightManager);
        sm.removeShadowMapCamera(this);
    }
}
