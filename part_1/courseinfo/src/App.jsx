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
      <p>{props.part_name} {props.exercises_count}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part_name={props.part1.name} exercises_count={props.part1.exercises_count} />
      <Part part_name={props.part2.name} exercises_count={props.part2.exercises_count} />
      <Part part_name={props.part3.name} exercises_count={props.part3.exercises_count} />
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
      <Content part1={{ name: part1, exercises_count: exercises1 }} part2={{ name: part2, exercises_count: exercises2 }} part3={{ name: part3, exercises_count: exercises3 }} />
      <Total exercises_count={exercises1 + exercises2 + exercises3} />
    </>
  )
}

export default App