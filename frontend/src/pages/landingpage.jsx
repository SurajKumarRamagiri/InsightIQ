import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";

export default function LandingPage() {
  return (
    <div className="bg-dark text-light min-vh-100 d-flex flex-column">
      <header className="p-4 border-bottom border-secondary d-flex justify-content-between align-items-center">
        <h1>InsightIQ</h1>
        <Button variant="light">Get Started</Button>
      </header>

      <Container className="text-center my-auto py-5">
        <h2 className="display-4 fw-bold mb-4">
          Learn Smarter with AI-Powered Insights
        </h2>
        <p className="lead mb-4">
          Upload study material, chat with your documents, and grow your knowledge intelligently with quizzes, flashcards, and concept maps.
        </p>
        <Button size="lg" variant="primary">Try InsightIQ Now</Button>
      </Container>

      <section className="bg-secondary py-5 text-center">
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <h4>📄 Chat with PDFs</h4>
              <p>Ask questions and extract key insights from any uploaded document.</p>
            </Col>
            <Col md={4}>
              <h4>🤖 AI Tutor</h4>
              <p>Get interactive explanations, flashcards, and quizzes from AI.</p>
            </Col>
            <Col md={4}>
              <h4>📚 Learning Portfolio</h4>
              <p>Track learned topics and revisit them via your personalized dashboard.</p>
            </Col>
          </Row>
        </Container>
      </section>

      <footer className="p-3 text-center text-muted bg-dark border-top border-secondary mt-auto">
        © {new Date().getFullYear()} InsightIQ. All rights reserved.
      </footer>
    </div>
  );
}
