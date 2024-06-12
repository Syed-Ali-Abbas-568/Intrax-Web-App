import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import CustomDrawer from '../components/Drawer';
import FeedbackIcon from '@mui/icons-material/Feedback';
import DeleteIcon from '@mui/icons-material/Delete';
import { getFeedbacks, deleteFeedback } from '../services/FeedbackRequests';
import { ListGroup, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Rating from '@mui/material/Rating';
import '../components/Navbar.css';
import Box from '@mui/material/Box';

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const feedbackList = await getFeedbacks();
      setFeedbacks(feedbackList);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const handleDelete = async (feedbackId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this feedback?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });

    if (result.isConfirmed) {
      try {
        await deleteFeedback(feedbackId);
        setFeedbacks(feedbacks.filter(feedback => feedback._id !== feedbackId));
        Swal.fire('Deleted!', 'Your feedback has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting feedback:', error);
        Swal.fire('Error!', 'There was an error deleting the feedback.', 'error');
      }
    }
  };

  return (
    <div>
      <Navbar className="custom-bg">
        <CustomDrawer />
        <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FeedbackIcon style={{ color: '#BB1E10', width: '50px', height: '50px' }} />
          <span style={{ fontSize: '20px', color: 'white' }}>Feedbacks</span>
        </Container>
      </Navbar>
      <Container style={{ marginTop: '20px' }}>
        <h2>Feedback List</h2>
        <ListGroup>
          {feedbacks.map((feedback, index) => (
            <ListGroup.Item
              key={feedback._id}
              className="d-flex justify-content-between align-items-center"
              style={{ backgroundColor: index % 2 === 0 ? 'white' : '#e9ecef' }}
            >
              <Box sx={{ flex: 1 }}>
                <strong>{feedback.name}</strong> (<a href={`mailto:${feedback.email}`}>{feedback.email}</a>)
                <div>{feedback.feedback}</div>
                <Rating value={feedback.rating} readOnly precision={0.5} />
              </Box>
              <Button variant="danger" onClick={() => handleDelete(feedback._id)}>
                <DeleteIcon />
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
}
