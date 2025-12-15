const ContactList = (props) => {
    return (
        <>
            { props.contactsToShow.map ( person => 
                <p key={person.name}>{person.name} {person.number}</p>
            ) }
        </>
    )
}

export default ContactList