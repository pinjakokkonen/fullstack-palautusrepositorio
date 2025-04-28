import { useState } from 'react'

const Statistics = (props) => {
  if (props.good+props.neutral+props.bad === 0) {
    return(
      <tbody>
        <tr>
          <td>No feedback given</td>
        </tr>
      </tbody>
    )
  }
  return(
    <tbody>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={props.good+props.neutral+props.bad} />
      <StatisticLine text="average" value ={(1*props.good+0*props.neutral-1*props.bad)/(props.good+props.neutral+props.bad)} />
      <StatisticLine text="positive" value ={props.good/(props.good+props.neutral+props.bad)*100 + " %"} />
    </tbody>
  )
}

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = (props) => {
  return(
  <button onClick={props.onClick}>
    {props.text}
  </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good+1)}/>
      <Button text="neutral" onClick={() => setNeutral(neutral+1)}/>
      <Button text="bad" onClick={() => setBad(bad+1)}/>
      <h1>statistics</h1>
      <table>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </table>
    </div>
  )
}

export default App
