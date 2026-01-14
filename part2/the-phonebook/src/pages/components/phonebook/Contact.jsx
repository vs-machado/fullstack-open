const Contact = (props) => {
    const { name, number, onDeleteContact } = props
    return (
        <>
            <div>{name} {number} <button onClick={onDeleteContact}>delete</button></div>
        </>
    )
}

export default Contact