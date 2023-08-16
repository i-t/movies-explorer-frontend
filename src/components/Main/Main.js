import Header from "../Header/Header.js";
import Promo from "./Promo/Promo.js";
import NavTab from "./NavTab/NavTab.js";
import AboutProject from "./AboutProject/AboutProject.js";
import Techs from "./Techs/Techs.js";
import AboutMe from "./AboutMe/AboutMe.js";
import Portfolio from "./Portfolio/Portfolio.js";
import Footer from "../Footer/Footer.js"

function Main({isLoggedIn}) {
  return (
    <div>
      <Header 
        isLoggedIn={isLoggedIn}
      />
      <main className="main">
        <Promo
          NavTab={NavTab}
        />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
};

export default Main;