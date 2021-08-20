import {
  MutationResult,
  QueryHookOptions,
  QueryResult,
  SubscriptionHookOptions,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/react-hooks"
import { gql } from "graphql-tag"

const query = {
  getChat: gql`
    query getMessages($conversationId: String) {
      messages(where: { conversationId: $conversationId }) {
        id
        text
        file
        status
        createdAt
        createdBy {
          id
        }
      }
    }
  `,
  sendChat: gql`
    mutation sendMessage($text: Text, $file: Upload, $recipientId: String, $conversationId: String) {
      createMessage(input: { text: $text, file: $file, recipientId: $recipientId, conversationId: $conversationId }) {
        id
        text
        file
        recipient {
          id
          firstName
        }
        conversation {
          id
          people {
            id
            firstName
          }
        }
      }
    }
  `,
  subcriptionChat: gql`
    subscription MessageAdded($conversationId: String) {
      messageAdded(where: { conversationId: $conversationId }) {
        id
        text
        file
        status
        createdAt
        createdBy {
          id
        }
      }
    }
  `,
}

type ChatQueryResult = QueryResult<
  {
    messages: Message[]
  },
  Record<string, User>
>

function ChatsQuery(options: QueryHookOptions): ChatQueryResult {
  const chats = useQuery<{ messages: Message[] }>(query.getChat, options)
  return chats
}

function ChatMutation() {
  const [sendChat] = useMutation<{ createMessage: Message }>(query.sendChat)
  return { sendChat }
}

function ChatSubcription(options: SubscriptionHookOptions) {
  const chatSub = useSubscription<{ messageAdded: Message }>(query.subcriptionChat, options)
  return chatSub
}

export { ChatMutation, ChatsQuery, ChatSubcription }
