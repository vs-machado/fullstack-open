// @ts-nocheck
import Header from "./Header"

const Parts = ({ parts }) => {
  return (
    <>
      { parts.map( part =>
          <p key={part.id}>{part.name} {part.exercises} </p>
      ) }
    </>
  )
} 

const Content = ({parts}) => {
  return (
    <div>
      <Parts parts={parts} />
    </div>
  )
}

const Total = ({parts}) => {
  const totalExercises = parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  )
  return <p><strong>total of {totalExercises} exercises</strong></p>
}

const Course = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
        <div key={course.name}>
          <Header course={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        </div>
      )}
    </>
  )
}

export default Course;