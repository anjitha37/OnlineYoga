import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button, Card, Badge } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { BiLike, BiDislike } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';
import { BsEmojiNeutral } from 'react-icons/bs';
import InstructorNav from './instructornav';
import './instructorNav.css';

const InstructorReviews = () => {
  const [reviews, setReviews] = useState([]);
  const instructorId = localStorage.getItem('instructorId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:9001/api/instructor/reviews/${instructorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(res.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };
    fetchReviews();
  }, [instructorId, token]);

  const handleEmojiReply = async (reviewId, emojiReply) => {
    try {
      await axios.post(
        `http://localhost:9001/api/instructor/reviews/reply/${reviewId}`,
        { reply: emojiReply },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Reply added!");
      // Refresh
      const res = await axios.get(`http://localhost:9001/api/instructor/reviews/${instructorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(res.data);
    } catch (err) {
      console.error("Error sending emoji reply:", err);
      alert("Failed to send reply");
    }
  };

  return (
    <div className="instructor-dashboard-wrapper">
      <InstructorNav />
      <div className="instructor-content">
        <Container style={{ maxWidth: '1100px', padding: '40px 20px' }}>
          <Card className="p-4 shadow-lg rounded-4 border-0 glass-card" style={{
            backgroundColor: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(8px)'
          }}>
            <h3 className="text-center mb-4 text-primary fw-bold">🌟 User Reviews</h3>
            {reviews.length === 0 ? (
              <p className="text-center text-muted">No reviews found.</p>
            ) : (
              <Table bordered responsive className="table-light">
                <thead className="table-dark text-center">
                  <tr>
                    <th>Class</th>
                    <th>Rating</th>
                    <th>Comment & Reply</th>
                    <th>React</th>
                  </tr>
                </thead>
                <tbody className="text-center align-middle">
                  {reviews.map((rev) => (
                    <tr key={rev._id}>
                      <td>{rev.classId?.className || 'Deleted Class'}</td>
                      <td>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <FaStar
                            key={i}
                            color={i <= rev.rating ? '#ffc107' : '#e4e5e9'}
                          />
                        ))}
                      </td>
                      <td className="text-start">
                        <div><strong>Comment:</strong> {rev.comment}</div>
                        {rev.reply && (
                          <div className="mt-1 text-muted">
                            <strong>Reply:</strong>{' '}
                            <Badge bg="success" pill>{rev.reply}</Badge>
                          </div>
                        )}
                      </td>
                      <td>
                        {!rev.reply ? (
                          <div className="d-flex gap-2 justify-content-center flex-wrap">
                            <Button
                              size="sm"
                              variant="outline-success"
                              onClick={() => handleEmojiReply(rev._id, "Like")}
                            >
                              <BiLike /> Like
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => handleEmojiReply(rev._id, "Dislike")}
                            >
                              <BiDislike /> Dislike
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-warning"
                              onClick={() => handleEmojiReply(rev._id, "Neutral")}
                            >
                              <BsEmojiNeutral /> Neutral
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => handleEmojiReply(rev._id, "Love")}
                            >
                              <AiFillHeart color="red" /> Love
                            </Button>
                          </div>
                        ) : (
                          <span className="text-success fw-semibold">Replied</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default InstructorReviews;
