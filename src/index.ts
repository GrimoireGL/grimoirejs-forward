// Please do not change the name of variable on the line below.
import GrimoireInterface from "grimoirejs";
import GLExtRequestor from "grimoirejs-fundamental/lib/Resource/GLExtRequestor";
import MaterialFactory from "grimoirejs-fundamental/lib/Material/MaterialFactory";
import LambertShader from "./Shaders/Lambert.sort";
import LightVariableRegister from "./Util/LightVariableRegister";

import {Vector3, Color3} from "grimoirejs-math";
// IMPORTS would be replaced for importing components.
//<%=IMPORTS%>

GrimoireInterface.register(async () => {
  // REGISTER would be replaced to actual codes to register components.
  //<%=REGISTER%>

  // You can edit code here.
  const g = GrimoireInterface;
  g.nodeDeclarations.get("goml").defaultComponents.push(g.ns("http://grimoire.gl/ns/default")("ForwardShadingManager"));
  g.registerNode("light", ["Transform", "Light"]);
  LightVariableRegister.registerAll();
  GLExtRequestor.request("OES_texture_float", true);
});
