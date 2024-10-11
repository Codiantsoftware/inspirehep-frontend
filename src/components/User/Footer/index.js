import { Col, Row, Typography, List , Flex} from "antd";
import React from "react";

const { Title, Link } = Typography;
function Footer() {
  return (
    <>
      {/* Footer start */}
      <footer className="footer">
        <div className="container">
          <div className="footer_inner">
            <Row justify="space-around">
              <Col className="footer_column">
                <Title level={2} className="footer_heading">
                   Codiant
                </Title>
                <List>
                  <List.Item>
                    <Link to="#" target="_blank">
                      About 
                    </Link>
                  </List.Item>
                  <List.Item>
                    <Link to="#">Content Policy</Link>
                  </List.Item>
                  <List.Item>
                    <Link to="#">Privacy Notice</Link>
                  </List.Item>
                  <List.Item>
                    <Link to="#">Terms of Use</Link>
                  </List.Item>
                </List>
              </Col>
              <Col className="footer_column">
                <Title level={2} className="footer_heading">
                  Help
                </Title>
                <List>
                  <List.Item>
                    <Link to="#">FAQ</Link>
                  </List.Item>
                  <List.Item>
                    <Link to="#">Help</Link>
                  </List.Item>
                  <List.Item>
                    <Link to="#">Report Metadata Issues</Link>
                  </List.Item>
                </List>
              </Col>
              <Col className="footer_column">
                <Title level={2} className="footer_heading">
                  Tools
                </Title>
                <List>
                  <List.Item>
                    <Link to="#">Bibliography Generator</Link>
                  </List.Item>
                </List>
              </Col>
              <Col className="footer_column">
                <Title level={2} className="footer_heading">
                  Community
                </Title>
                <List>
                  <List.Item>
                    <Link to="#">Blog</Link>
                  </List.Item>
                  <List.Item>
                    <Link to="#">Twitter</Link>
                  </List.Item>
                  <List.Item>
                    <Link to="#">Contact</Link>
                  </List.Item>
                </List>
              </Col>
            </Row>
          </div>
          {/* Copyright */}
          <Flex justify="space-between" className="footer_copyRight">
            <Link to="#">Powered by Codiant</Link>
            <Typography.Text className="footer_copyRight_txt">
              Made with <span>❤️</span> by the Codiant Team
            </Typography.Text>
          </Flex>
        </div>
      </footer>
      {/* Footer end */}
    </>
  );
}

export default Footer;
