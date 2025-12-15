const AddContact = (props) => {
    const { addContact, newName, newNumber, handleContactChange, handleNumberChange } = props
    return (
        <>
            <form onSubmit={addContact}>
                <div> name: <input value={newName} onChange={handleContactChange}/> </div>
                <div> number: <input value={newNumber} onChange={handleNumberChange}/></div>
                <div>
                <button
                    type="submit">add
                </button>
                </div>
            </form>
        </>
    )
}

export default AddContact