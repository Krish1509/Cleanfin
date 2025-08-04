import Home from "./Frontend/pages/Home";
import Nav from "./Frontend/Components/Navigation/Navbar";
import Footer from "./Frontend/Components/Footer/Footer";
import ScrollToTop from "./Frontend/Components/Landing/Utils/ScrollToTop";
import "./App.css";

function App() {

  return (
    <>
      <Nav />
      <Home />
      <Footer />
      <ScrollToTop />
    </>
  );
}
export default App;
