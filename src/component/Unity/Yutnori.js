import { Unity, useUnityContext } from "react-unity-webgl";
import FooterView from "../section/FooterView";
import HeaderView from "../section/HeaderView";
import { Container } from "react-bootstrap";

export default function Yutnori() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/WebGL.loader.js",
    dataUrl: "Build/WebGL.data",
    frameworkUrl: "Build/WebGL.framework.js",
    codeUrl: "/Build/WebGL.wasm",
  });

  return (
    <Container>
      <HeaderView />
      <div style={{ width: "100%", paddingBottom: "56.25%", position: "relative" }}>
        <Unity unityProvider={unityProvider} style={{ position: "absolute", width: "100%", height: "100%" }} />
      </div>
      <FooterView />
    </Container>
  );
}