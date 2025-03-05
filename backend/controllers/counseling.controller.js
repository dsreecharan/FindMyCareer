const CounselingRequest = require('../models/counseling.model');
const User = require('../models/user.model');
const nodemailer = require('nodemailer');

// Create counseling request
exports.createRequest = async (req, res) => {
  try {
    const {
      parentName,
      parentEmail,
      parentPhone,
      preferredContactMethod,
      preferredTime,
      concerns,
    } = req.body;

    const counselingRequest = new CounselingRequest({
      student: req.user.userId,
      parentName,
      parentEmail,
      parentPhone,
      preferredContactMethod,
      preferredTime,
      concerns,
    });

    await counselingRequest.save();

    // Send email notification to admin
    await sendAdminNotification(counselingRequest);

    res.status(201).json({
      success: true,
      counselingRequest,
    });
  } catch (error) {
    console.error('Create counseling request error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating counseling request',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Get student's counseling requests
exports.getStudentRequests = async (req, res) => {
  try {
    const requests = await CounselingRequest.find({ student: req.user.userId })
      .sort({ createdAt: -1 })
      .populate('assignedCounselor', 'name email');

    res.json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error('Get student requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching counseling requests',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Get counselor's assigned requests
exports.getCounselorRequests = async (req, res) => {
  try {
    const requests = await CounselingRequest.find({
      assignedCounselor: req.user.userId,
      status: { $ne: 'Completed' },
    })
      .sort({ createdAt: -1 })
      .populate('student', 'name email grade');

    res.json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error('Get counselor requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching counseling requests',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Update request status
exports.updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status, scheduledDate } = req.body;

    const request = await CounselingRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Counseling request not found',
      });
    }

    // Update status and schedule date if provided
    await request.updateStatus(status, req.user.userId);
    if (scheduledDate) {
      request.scheduledDate = scheduledDate;
      await request.save();
    }

    // Send email notification to parent
    await sendParentNotification(request);

    res.json({
      success: true,
      request,
    });
  } catch (error) {
    console.error('Update request status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating request status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Add note to request
exports.addNote = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { note } = req.body;

    const request = await CounselingRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Counseling request not found',
      });
    }

    await request.addNote(note, req.user.userId);

    res.json({
      success: true,
      request,
    });
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding note',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Submit feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { rating, comment } = req.body;

    const request = await CounselingRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Counseling request not found',
      });
    }

    await request.submitFeedback(rating, comment);

    res.json({
      success: true,
      request,
    });
  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Helper function to send email notification to admin
const sendAdminNotification = async (request) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Counseling Request',
    html: `
      <h2>New Counseling Request</h2>
      <p><strong>Student:</strong> ${request.student.name}</p>
      <p><strong>Parent:</strong> ${request.parentName}</p>
      <p><strong>Contact:</strong> ${request.parentEmail} / ${request.parentPhone}</p>
      <p><strong>Preferred Time:</strong> ${request.preferredTime}</p>
      <p><strong>Concerns:</strong> ${request.concerns}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Helper function to send email notification to parent
const sendParentNotification = async (request) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  let subject = '';
  let message = '';

  switch (request.status) {
    case 'Scheduled':
      subject = 'Counseling Session Scheduled';
      message = `
        <h2>Your Counseling Session Has Been Scheduled</h2>
        <p>Dear ${request.parentName},</p>
        <p>Your counseling session has been scheduled for ${request.scheduledDate.toLocaleString()}.</p>
        <p>Our counselor will contact you shortly to confirm the details.</p>
      `;
      break;
    case 'Completed':
      subject = 'Counseling Session Completed';
      message = `
        <h2>Counseling Session Completed</h2>
        <p>Dear ${request.parentName},</p>
        <p>Your counseling session has been completed. We hope it was helpful.</p>
        <p>Please take a moment to provide your feedback.</p>
      `;
      break;
    case 'Cancelled':
      subject = 'Counseling Session Cancelled';
      message = `
        <h2>Counseling Session Cancelled</h2>
        <p>Dear ${request.parentName},</p>
        <p>Your counseling session has been cancelled.</p>
        <p>Please contact us if you would like to reschedule.</p>
      `;
      break;
  }

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: request.parentEmail,
    subject,
    html: message,
  };

  await transporter.sendMail(mailOptions);
}; 