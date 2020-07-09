import React from 'react';
import { Subscription } from 'rxjs';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { generateCode, Connector } from '../utils/code-genarator';
import enterCode from '../utils/enter-code';
import listenConnection from '../utils/listen-connection';
import InputBox from './InputBox';
import QR from './QR';
import QRReader from './QRReader';

export interface Connected {
  connectionId: string;
  connectorId: string;
}

type InitState = {
  generatedCode: number;
  enteredCode?: number;
  connector: Connector;
  readQR: boolean;
  buttonDisabled: boolean;
};
type InitProps = {
  onConnected?: (data: Connected) => void;
};

class Init extends React.Component<InitProps, InitState> {
  private listenConnectionSub: Subscription = null;

  constructor(props: InitProps) {
    super(props);
    this.state = {
      connector: null,
      enteredCode: null,
      generatedCode: null,
      readQR: false,
      buttonDisabled: true,
    };
  }

  async componentDidMount() {
    const { code, connector, connection } = await generateCode();
    this.setState({
      generatedCode: code,
      connector,
    });

    this.listenConnectionSub = listenConnection(connection.id).subscribe(() => {
      this.unsubscribeListenConnection();
      this.onConnected();
    });
  }

  onConnected = () => {
    const { connector } = this.state;
    const data = {
      connectionId: connector.connection.id,
      connectorId: connector.id,
    };
    const { onConnected } = this.props;
    onConnected(data);
  };

  enterCode = async () => {
    const { enteredCode, connector } = this.state;
    if (!enteredCode || enteredCode.toString().length !== 6) {
      return;
    }
    const updatedConnector = await enterCode(enteredCode, connector);
    if (updatedConnector) {
      this.setState({ connector: updatedConnector });

      this.unsubscribeListenConnection();
      this.onConnected();
    }
  };

  codeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const code = parseInt(e.target.value, 10);
    if (!Number.isNaN(code)) {
      if (val.length <= 6) {
        this.setState({ enteredCode: code, buttonDisabled: val.length !== 6 });
      }
    }
  };

  unsubscribeListenConnection = () => {
    if (this.listenConnectionSub && !this.listenConnectionSub.closed) {
      this.listenConnectionSub.unsubscribe();
    }
  };

  onQRCodeReadClick = () => {
    this.setState({ readQR: true });
  };

  onQRRead = (code: number) => {
    this.setState({ enteredCode: code });
    this.enterCode();
  };

  public render() {
    const { generatedCode, readQR, buttonDisabled, enteredCode } = this.state;
    return (
      <>
        {!readQR && (
          <>
            <Row className="justify-content-center">
              <Col className="text-center align-self-center" md={8}>
                <QR
                  text={generatedCode ? generatedCode.toString() : 'tosycorp'}
                />
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col className="text-right align-self-center" md={4}>
                <h4>or use</h4>
              </Col>
              <Col className="text-left align-self-center" md={4}>
                {generatedCode ? (
                  <h4>{generatedCode.toString()}</h4>
                ) : (
                  <Spinner animation="border" />
                )}
              </Col>
            </Row>
          </>
        )}
        <Row className="justify-content-center mt-3">
          <Col
            className="justify-content-center text-center align-self-center"
            style={{ display: 'flex' }}
            md={4}
          >
            {readQR ? (
              <QRReader onRead={this.onQRRead} />
            ) : (
              <Button
                className="btn-block"
                variant="outline-primary"
                size="lg"
                onClick={this.onQRCodeReadClick}
              >
                Scan QR Code
              </Button>
            )}
          </Col>
        </Row>
        <Row className="justify-content-center mt-2">
          <Col md={4}>
            <InputBox
              changeHandler={this.codeChange}
              clickHandler={this.enterCode}
              buttonText="JOIN"
              inputType="number"
              buttonDisabled={buttonDisabled}
              inputValue={enteredCode && enteredCode.toString()}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default Init;
