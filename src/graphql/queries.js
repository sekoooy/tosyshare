/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getConnection = /* GraphQL */ `
  query GetConnection($id: ID!) {
    getConnection(id: $id) {
      id
      code
      connectors {
        items {
          id
          identityId
          connection {
            id
            code
            createdAt
            updatedAt
          }
          connectorConnectionId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listConnections = /* GraphQL */ `
  query ListConnections(
    $filter: ModelConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConnections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        code
        connectors {
          items {
            id
            identityId
            connectorConnectionId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getConnector = /* GraphQL */ `
  query GetConnector($id: ID!) {
    getConnector(id: $id) {
      id
      identityId
      connection {
        id
        code
        connectors {
          items {
            id
            identityId
            connectorConnectionId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      connectorConnectionId
      createdAt
      updatedAt
    }
  }
`;
export const listConnectors = /* GraphQL */ `
  query ListConnectors(
    $filter: ModelConnectorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConnectors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        identityId
        connection {
          id
          code
          connectors {
            nextToken
          }
          createdAt
          updatedAt
        }
        connectorConnectionId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      type
      value
      connection {
        id
        code
        connectors {
          items {
            id
            identityId
            connectorConnectionId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      connector {
        id
        identityId
        connection {
          id
          code
          connectors {
            nextToken
          }
          createdAt
          updatedAt
        }
        connectorConnectionId
        createdAt
        updatedAt
      }
      messageConnectionId
      createdAt
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        value
        connection {
          id
          code
          connectors {
            nextToken
          }
          createdAt
          updatedAt
        }
        connector {
          id
          identityId
          connection {
            id
            code
            createdAt
            updatedAt
          }
          connectorConnectionId
          createdAt
          updatedAt
        }
        messageConnectionId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getConnectionsByCode = /* GraphQL */ `
  query GetConnectionsByCode(
    $code: Int
    $sortDirection: ModelSortDirection
    $filter: ModelConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    GetConnectionsByCode(
      code: $code
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        code
        connectors {
          items {
            id
            identityId
            connectorConnectionId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
