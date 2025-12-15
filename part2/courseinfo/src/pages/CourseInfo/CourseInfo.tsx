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

const Total = ({parts}) => <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course;