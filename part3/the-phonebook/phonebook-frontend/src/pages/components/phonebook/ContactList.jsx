import Contact from './Contact'

const ContactList = (props) => {
    return (
        <>
            { props.contactsToShow.map ( person => 
                <Contact key={person.id} name={person.name} number={person.number} onDeleteContact={() => props.onDeleteContact(person.id)} />
            ) }
        </>
    )
}

export default ContactList