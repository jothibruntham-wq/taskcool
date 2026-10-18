import Page from '../components/Page'

const steps = [
  { t: 'Chill', d: 'Keep the can in the fridge for at least two hours so the dessert stays firm.' },
  { t: 'Pop the lid', d: 'Pull the tab and peel back the lid. The spoon is tucked inside.' },
  { t: 'Spoon it', d: 'Eat straight from the can. There is no plate to wash afterwards.' },
]

const values = [
  { t: 'Real ingredients', d: 'Cream cheese, ripe mango and dark cocoa, not flavor powders.' },
  { t: 'Set in the can', d: 'Each dessert sets layer by layer in its own can, so it arrives exactly as made.' },
  { t: 'Small batches', d: 'We make a few hundred cans at a time and ship them chilled.' },
]

export default function About() {
  return (
    <Page>
      <h1 className="page-title">Dessert, in a can</h1>
      <p className="page-lead">
        Velvetspoon started with one question: why should a good dessert need a plate? We set restaurant-style
        recipes inside a can, so you can take them anywhere and eat them with a spoon.
      </p>

      <div className="grid">
        {values.map((v) => (
          <section key={v.t} className="card glass">
            <h2>{v.t}</h2>
            <p>{v.d}</p>
          </section>
        ))}
      </div>

      <h2 className="section-title">How to enjoy a can</h2>
      <ol className="steps">
        {steps.map((s, i) => (
          <li key={s.t} className="step glass">
            <span className="step-n">{i + 1}</span>
            <div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </Page>
  )
}
