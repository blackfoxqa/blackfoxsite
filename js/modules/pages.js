/**
 * Pages Module - Handles rendering for Services, Projects, and Quote Form
 */

import { servicesData, projectsData, processSteps, whyChooseUs } from './data.js';
import { sendQuoteRequestEmail } from './email.js';

export function initializeServices() {
  const servicesContainer = document.getElementById('services-grid');
  if (!servicesContainer) return;

  servicesContainer.innerHTML = servicesData.map(service => `
    <div class="service-card animate__animated animate__fadeInUp">
      <div class="service-icon">${service.icon}</div>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      <div class="service-features">
        ${service.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

export function initializeProjects() {
  const projectsContainer = document.getElementById('projects-grid');
  if (!projectsContainer) return;

  projectsContainer.innerHTML = projectsData.map((project, index) => `
    <div class="project-card animate__animated animate__fadeInUp" style="animation-delay: ${index * 0.1}s">
      <div class="project-header">
        <h3>${project.title}</h3>
        <span class="project-status">${project.status}</span>
      </div>
      <p class="project-description">${project.description}</p>
      <div class="project-meta">
        <div class="meta-item">
          <strong>📍 Location:</strong> ${project.location}
        </div>
        <div class="meta-item">
          <strong>📅 Year:</strong> ${project.year}
        </div>
      </div>
    </div>
  `).join('');
}

export function initializeQuoteForm() {
  const quoteForm = document.getElementById('quote-form');
  if (!quoteForm) return;

  quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      fullName: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      company: document.getElementById('company').value,
      serviceType: document.getElementById('serviceType').value,
      budget: document.getElementById('budget').value,
      location: document.getElementById('location').value,
      timeline: document.getElementById('timeline').value,
      description: document.getElementById('description').value
    };

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone || !formData.serviceType) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    // Send email
    const result = await sendQuoteRequestEmail(formData);
    
    if (result.success) {
      showToast(result.message, 'success');
      quoteForm.reset();
    } else {
      showToast(result.message, 'error');
    }
  });
}

function showToast(message, type = 'info') {
  // Use Toastify if available, otherwise use alert
  if (typeof Toastify !== 'undefined') {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3',
      close: true
    }).showToast();
  } else {
    alert(message);
  }
}

// Render Why Choose Us section
export function renderWhyChooseUs() {
  const container = document.getElementById('why-choose-us');
  if (!container) return;

  container.innerHTML = whyChooseUs.map((item, index) => `
    <div class="why-item animate__animated animate__fadeInUp" style="animation-delay: ${index * 0.1}s">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </div>
  `).join('');
}

// Render Process Steps
export function renderProcessSteps() {
  const container = document.getElementById('process-steps');
  if (!container) return;

  container.innerHTML = processSteps.map((step, index) => `
    <div class="process-step animate__animated animate__fadeInUp" style="animation-delay: ${index * 0.1}s">
      <div class="step-number">${step.step}</div>
      <h3>${step.title}</h3>
      <p>${step.description}</p>
    </div>
  `).join('');
}

// Sections removed from home page - process steps and why choose us initialization disabled
