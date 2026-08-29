const Header = (props) => {
  return (
    <div>
      <h1>{props.course_name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part.name} {props.part.exercises_count}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of excersices {props.parts[0].exercises_count + props.parts[1].exercises_count + props.parts[2].exercises_count}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises_count: 10
    },
    {
      name: 'Using props to pass data',
      exercises_count: 7
    },
    {
      name: 'State of a component',
      exercises_count: 14
    }
  ]

  return (
    <>
      <Header course_name={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}

export default App