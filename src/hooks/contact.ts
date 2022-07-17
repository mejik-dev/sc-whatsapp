import { QueryHookOptions, QueryResult, useQuery } from "@apollo/react-hooks"
import { gql } from "graphql-tag"
const query = {
  getContact: gql`
    query getContacts($userId: String) {
      contacts(where: { userId: $userId, users: { id_not: $userId } }) {
        id
        users(limit: 500, orderBy: createdAt_DESC) {
          id
          firstName
          avatar
          phoneNumber
          bio
        }
      }
    }
  `,
}

type ContactsQueryResult = QueryResult<
  {
    contacts: [Contact]
  },
  Record<string, Contact>
>

function ContactQuery(options: QueryHookOptions): ContactsQueryResult {
  const get = useQuery<{ contacts: [Contact] }>(query.getContact, options)
  return get
}

export { ContactQuery }
