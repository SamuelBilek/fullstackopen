const Header = (props) => {
  return (
    <div>
      <h1>{props.course_name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        {props.part_name} {props.exercises_count}
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of excersices {props.exercises_count}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course_name={course} />
      <Content part_name={part1} exercises_count={exercises1} />
      <Content part_name={part2} exercises_count={exercises2} />
      <Content part_name={part3} exercises_count={exercises3} />
      <Total exercises_count={exercises1 + exercises2 + exercises3} />
    </>
  )
}

export default App