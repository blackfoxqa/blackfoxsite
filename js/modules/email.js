/**
 * Email Service Module - Handles email sending via Resend API (Free Tier)
 * Get free API key: https://resend.com/
 */

const RESEND_API_KEY = 'YOUR_RESEND_API_KEY_HERE'; // Replace with actual key from https://resend.com/
const COMPANY_EMAIL = 'info@blackfox.qa';
const COMPANY_NAME = 'Black Fox Trading & Contracting';

export async function sendQuoteRequestEmail(formData) {
  try {
    // Show loading state
    const submitBtn = document.querySelector('[data-action="submit-quote"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Validate API key
    if (RESEND_API_KEY === 'YOUR_RESEND_API_KEY_HERE') {
      throw new Error('Resend API key not configured. Please add your API key to the email service module.');
    }

    // Prepare email content
    const emailContent = prepareEmailContent(formData);

    // Send email via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: `${COMPANY_NAME} <onboarding@resend.dev>`,
        to: COMPANY_EMAIL,
        replyTo: formData.email,
        subject: `New Quote Request from ${formData.fullName}`,
        html: emailContent.htmlToCompany,
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    const data = await response.json();

    // Send confirmation email to user
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: `${COMPANY_NAME} <onboarding@resend.dev>`,
        to: formData.email,
        subject: `Quote Request Received - ${COMPANY_NAME}`,
        html: emailContent.htmlToUser,
      })
    });

    // Reset form and show success
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    
    return {
      success: true,
      message: 'Quote request sent successfully! We will contact you soon.',
      id: data.id
    };

  } catch (error) {
    const submitBtn = document.querySelector('[data-action="submit-quote"]');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Quote Request';
    
    console.error('Email error:', error);
    return {
      success: false,
      message: error.message || 'Failed to send quote request. Please try again.'
    };
  }
}

function prepareEmailContent(formData) {
  const htmlToCompany = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #ffd700; border-bottom: 2px solid #ffd700; padding-bottom: 10px;">New Quote Request</h2>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Client Information:</strong></p>
        <p><strong>Name:</strong> ${escapeHtml(formData.fullName)}</p>
        <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
        <p><strong>Phone:</strong> ${escapeHtml(formData.phone)}</p>
        <p><strong>Company:</strong> ${formData.company ? escapeHtml(formData.company) : 'N/A'}</p>
      </div>

      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Project Details:</strong></p>
        <p><strong>Service Type:</strong> ${escapeHtml(formData.serviceType)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(formData.budget)}</p>
        <p><strong>Location:</strong> ${escapeHtml(formData.location)}</p>
        <p><strong>Timeline:</strong> ${escapeHtml(formData.timeline)}</p>
      </div>

      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Project Description:</strong></p>
        <p>${escapeHtml(formData.description).replace(/\n/g, '<br>')}</p>
      </div>

      <div style="background: #1a1a1a; color: #ffd700; padding: 15px; border-radius: 8px; text-align: center; margin-top: 30px;">
        <p>⏰ <strong>Automated Quote Request - ${new Date().toLocaleString()}</strong></p>
      </div>
    </div>
  `;

  const htmlToUser = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #ffd700;">Thank You, ${escapeHtml(formData.fullName)}!</h2>
      
      <p>We have successfully received your quote request for <strong>${escapeHtml(formData.serviceType)}</strong>.</p>

      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>What's Next?</strong></p>
        <ul>
          <li>Our team will review your request within 24 hours</li>
          <li>We will contact you at <strong>${formData.phone}</strong> or <strong>${formData.email}</strong></li>
          <li>We'll provide a detailed quote tailored to your project needs</li>
          <li>No obligation - completely free consultation</li>
        </ul>
      </div>

      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Our Contact Details:</strong></p>
        <p><strong>Email:</strong> info@blackfox.qa</p>
        <p><strong>Phone:</strong> +974 3131 8151</p>
        <p><strong>Address:</strong> 720 Al Wakra, Doha, Qatar</p>
      </div>

      <p style="text-align: center; color: #666; font-size: 12px; margin-top: 30px;">
        Black Fox Trading & Contracting - Bridging Vision With Reality
      </p>
    </div>
  `;

  return { htmlToCompany, htmlToUser };
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
