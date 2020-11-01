import { createMessage } from '../graphql/mutations';
import { Message, Connected, MessageType } from '../types';
import gqlOperationCreate from './gql-api.create';

const saveMessage = async (
  value: string,
  connected: Connected,
  type: MessageType
): Promise<Message> => {
  const createMessageWrapper = async (input: {
    type: string;
    value: string;
    messageConnectionId: string;
    messageConnectorId: string;
  }) => {
    return (await gqlOperationCreate(createMessage, input)) as {
      data: { createMessage: Message };
    };
  };

  return (
    await createMessageWrapper({
      type,
      value,
      messageConnectionId: connected.connectionId,
      messageConnectorId: connected.connectorId,
    })
  ).data.createMessage;
};

export default saveMessage;
