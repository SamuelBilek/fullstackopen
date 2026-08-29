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
  const part1 = {
    name: 'Fundamentals of React',
    exercises_count: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises_count: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises_count: 14
  }

  return (
    <>
      <Header course_name={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total exercises_count={part1.exercises_count + part2.exercises_count + part3.exercises_count} />
    </>
  )
}

export default App