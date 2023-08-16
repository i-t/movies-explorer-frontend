// import NavTab from "../NavTab/NavTab.js"

function Promo(props) {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб&#8209;разработки.</h1>
      <props.NavTab />
    </section>
  )
}

export default Promo;