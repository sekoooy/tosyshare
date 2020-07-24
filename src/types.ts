export interface Connection {
  id: string;
  code: number;
  connectors: Connector[];
}

export interface Connector {
  id: string;
  connection?: Connection;
}

export interface Connected {
  connectionId: string;
  connectorId: string;
  code: number;
}

export interface Message {
  id: string;
  type: 'STRING' | 'FILE';
  value: string;
  connection: Connection;
  connector: Connector;
}
