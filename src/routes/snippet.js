import express from 'express';
const router = express.Router();

// Serve the snippet JS by ID
router.get('/:snippetId.js', async (req, res) => {
  const { snippetId } = req.params;

  // Validate snippetId from DB
  const tenant = await db.Tenants.findOne({ where: { snippetId } });
  if (!tenant) return res.status(404).send('Invalid snippet ID');

  res.setHeader('Content-Type', 'application/javascript');

  const js = `
    (function(){
      function sendBookingData(data) {
        fetch('https://api.framtt.com/api/bookings/from-snippet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            snippetId: "${snippetId}",
            ...data
          })
        });
      }

      window.submitFramttBooking = function(data) {
        sendBookingData(data);
      };
    })();
  `;

  res.send(js);
});

export default router;
