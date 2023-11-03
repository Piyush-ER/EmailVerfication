// TabCard.js
import React from 'react';
import { Tab, Tabs, Card, Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import EmailInput from '../components/EmailInput';
import ExcelInput from '../components/ExcelInput';
import backgroundImage from "../images/PPT_Background_2.png";
import BulkFinder from '../components/BulkFinder';
import SingleFinder from '../components/SingleFinder';


function TabCard() {
  return (

    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <Navbar />
      <Container className="d-flex align-items-center min-vh-100">
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow">
              <Card.Header>
                <Tabs defaultActiveKey="tab1" id="uncontrolled-tab-example">
                  <Tab eventKey="tab1" title="Bulk Verifier">
                    <Card.Body>
                      <Card.Title className='mt-4 text-center'>Validate lists of email addresses using our bulk email checker algorithm.</Card.Title>
                      <Card.Text>
                        <ExcelInput />
                      </Card.Text>
                    </Card.Body>
                  </Tab>
                  <Tab eventKey="tab2" title="Bulk Finder">
                    <Card.Body>
                      <Card.Title className='mt-4 text-center'>Enrich a list of prospects with verified email addresses.</Card.Title>
                      <Card.Text>
                        <BulkFinder/>
                      </Card.Text>
                    </Card.Body>
                  </Tab>
                  <Tab eventKey="tab3" title="Single Verifier">
                    <Card.Body>
                      <Card.Title className='mt-4 text-center'>Verify any email address with the most complete email checker.</Card.Title>
                      <Card.Text>
                        <EmailInput/>
                      </Card.Text>
                    </Card.Body>
                  </Tab>
                  <Tab eventKey="tab4" title="Single Finder">
                    <Card.Body>
                      <Card.Title className='mt-4 text-center'>Find the verified email address of any professional.</Card.Title>
                      <Card.Text>
                        <SingleFinder/>
                      </Card.Text>
                    </Card.Body>
                  </Tab>
                </Tabs>
              </Card.Header>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>

  );
}

export default TabCard;
