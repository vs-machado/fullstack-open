import { useDispatch, useSelector } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  return (
    <div>
      <label htmlFor="filter">filter</label>
      <input
        id="filter"
        type="text"
        value={filter}
        onChange={(e) => dispatch(filterChange(e.target.value))}/>
      <br/>
      <br/>
    </div>
  )
}

export default Filter