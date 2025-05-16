const Header = ({course}) => {
  return(
    <div>
      <h2>{course.name}</h2>
    </div>
  )
}

const Part = ({parts}) => {
  return(
    <div>
      <p key={parts.id}>{parts.name} {parts.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  const parts = props.course.parts
  return(
    <div>
      {parts.map(parts => <Part key={parts.id} parts={parts}/>)}
    </div>
  )
}

const Total = ({course}) => {
  const parts = course.parts
  const exercise = parts.map(parts => parts.exercises)
  const total = exercise.reduce( (s, p) => {return s+p})

  return(
    <div>
      <b>total of {total} exercises</b>
    </div>
  )
}

const Course = ({course}) => {
  return(
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course
