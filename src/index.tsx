import ReactDOM from "react-dom";
import { ThemeProvider } from "sha-el-design/lib/components/Theme/Theme";
import App from "./App";

ReactDOM.render(
  <ThemeProvider theme="DARK">
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
