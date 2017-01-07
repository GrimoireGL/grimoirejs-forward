import SceneLightManager from "./SceneLightManager";
import IRenderRendererMessage from "grimoirejs-fundamental/ref/Messages/IRenderRendererMessage";
import CameraComponent from "grimoirejs-fundamental/ref/Components/CameraComponent";
import IAttributeDeclaration from "grimoirejs/ref/Node/IAttributeDeclaration";
import Component from "grimoirejs/ref/Node/Component";
import RenderScene from "grimoirejs-fundamental/ref/Components/RenderSceneComponent";

export default class RenderShadowMapComponent extends Component {
    public static attributes: { [key: string]: IAttributeDeclaration } = {

    };

    private _renderSceneComponent: RenderScene;

    private _gl:WebGLRenderingContext;

    public $mount(): void {
        this._renderSceneComponent = this.node.getComponent(RenderScene);
        if (!this._renderSceneComponent) {
            throw new Error(`There was no RenderScene component found on the node attached RenderShadowMapComponent`);
        }
        this._gl = this.companion.get("gl");
    }

    public $render(args: IRenderRendererMessage): void {
        const sceneCamera = args.camera ? args.camera : this._renderSceneComponent.camera;
        const slm = sceneCamera.containedScene.node.getComponent(SceneLightManager);
        slm.shadowMapCameras.forEach(v => {
            this._gl.viewport(0,0,512,512);
            this._gl.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER,null);
            v.fbo.bind();
            this._gl.clear(WebGLRenderingContext.DEPTH_BUFFER_BIT|WebGLRenderingContext.COLOR_BUFFER_BIT);
            v.updateContainedScene(args.loopIndex);
            v.renderScene({
                camera: v,
                buffers:null,
                layer: "default",
                viewport: args.viewport,
                loopIndex: args.loopIndex,
                technique: "depth"
            });
        });
    }
}
