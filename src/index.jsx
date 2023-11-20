import { createRoot } from "react-dom/client";
import { Container } from "react-bootstrap";

import { MainView } from "./components/main-view/main-view";

import "./index.scss";

const MyFlixApplication = () => {
  return (
    <Container fluid className="px-3" style={{
      backgroundColor: "#161616",
    paddingBottom : "140px"}}>
      <MainView />
    </Container>
  );
};

// finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// tells react to render your app in the root dom element
root.render(<MyFlixApplication />);
