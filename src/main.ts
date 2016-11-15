// Please do not change the name of variable on the line below.
import GrimoireInterface from "grimoirejs";
import GLExtRequestor from "grimoirejs-fundamental/ref/Resource/GLExtRequestor";
import MaterialFactory from "grimoirejs-fundamental/ref/Material/MaterialFactory";
import LightVariableRegister from "./Util/LightVariableRegister";

// IMPORTS would be replaced for importing components.
export default () => {
  GrimoireInterface.register(async () => {
    // REGISTER would be replaced to actual codes to register components.
    //<%=REGISTER%>

    // You can edit code here.
    const g = GrimoireInterface;
    g.nodeDeclarations.get("goml").defaultComponents.push(g.ns("http://grimoire.gl/ns/default")("ForwardShadingManager"));
    g.componentDeclarations.get("MaterialContainer").attributes["material"].defaultValue = "new(phong)";
    g.registerNode("light", ["Transform", "Light"]);
    LightVariableRegister.registerAll();
    GLExtRequestor.request("OES_texture_float", true);
  });
}
