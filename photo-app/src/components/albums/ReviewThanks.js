import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Container } from 'react-bootstrap'

const ReviewThanks = () => {
    return (
        <Container>
			<Row>
				<Col>
					<Card bg="light" text="dark">
						<Card.Body className="text-center">
							<Card.Title>Thank you!</Card.Title>
                                <Card.Text>
                                        <br/> 
                                        Your review has now been sent <br/>
                                        <Link to="/register">Sign Up?</Link>
                                </Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
    )
}

export default ReviewThanks