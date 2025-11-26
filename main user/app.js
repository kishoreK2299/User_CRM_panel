// Global Data
const appData = {
  leads: [
    {
      id: 1,
      name: "John Smith",
      company: "Tech Solutions Inc",
      email: "john@techsolutions.com",
      phone: "+1-555-0123",
      owner: "Sarah Johnson",
      source: "Website",
      stage: "New Leads",
      type: "show",
      jobTitle: "CTO",
      showName: "Tech Expo 2025",
      showDate: "2025-11-15",
      attendeeCount: 500,
      country: "United States"
    },
    {
      id: 2,
      name: "Emily Davis",
      company: "Global Enterprises",
      email: "emily@globalent.com",
      phone: "+1-555-0124",
      owner: "Mike Wilson",
      source: "LinkedIn",
      stage: "Contacted",
      type: "industry",
      jobTitle: "Marketing Director",
      country: "Canada"
    },
    {
      id: 3,
      name: "Robert Chen",
      company: "Innovation Labs",
      email: "robert@innovlabs.com",
      phone: "+1-555-0125",
      owner: "Sarah Johnson",
      source: "Referral",
      stage: "Qualified",
      type: "show",
      jobTitle: "VP Engineering",
      showName: "Innovation Summit",
      showDate: "2025-12-01",
      attendeeCount: 300,
      country: "United States"
    },
    {
      id: 4,
      name: "Lisa Anderson",
      company: "Digital Marketing Pro",
      email: "lisa@digipro.com",
      phone: "+1-555-0126",
      owner: "Mike Wilson",
      source: "Email",
      stage: "Proposal Sent",
      type: "industry",
      jobTitle: "CEO",
      country: "United Kingdom"
    },
    {
      id: 5,
      name: "David Kim",
      company: "StartupXYZ",
      email: "david@startupxyz.com",
      phone: "+1-555-0127",
      owner: "Sarah Johnson",
      source: "Website",
      stage: "Closed Won",
      type: "show",
      jobTitle: "Founder",
      showName: "Startup Showcase",
      showDate: "2025-10-20",
      attendeeCount: 150,
      country: "Australia"
    },
    // Additional sample leads
    {
      id: 6,
      name: "Maria Garcia",
      company: "Healthcare Plus",
      email: "maria@healthcareplus.com",
      phone: "+1-555-0128",
      owner: "Sarah Johnson",
      source: "LinkedIn",
      stage: "New Leads",
      type: "industry",
      jobTitle: "Operations Manager",
      country: "Germany"
    },
    {
      id: 7,
      name: "James Wilson",
      company: "Finance Corp",
      email: "james@financecorp.com",
      phone: "+1-555-0129",
      owner: "Mike Wilson",
      source: "Referral",
      stage: "Contacted",
      type: "show",
      jobTitle: "CFO",
      showName: "Finance Forum",
      showDate: "2025-11-30",
      attendeeCount: 400,
      country: "France"
    },
    {
      id: 8,
      name: "Anna Thompson",
      company: "Retail Solutions",
      email: "anna@retailsol.com",
      phone: "+1-555-0130",
      owner: "Sarah Johnson",
      source: "Website",
      stage: "Qualified",
      type: "industry",
      jobTitle: "Sales Director",
      country: "India"
    }
  ],
  kpiData: {
    totalLeads: { value: 1240, trend: "+12%" },
    positiveResponses: { value: 324, trend: "+8%" },
    conversionRate: { value: "26.1%", trend: "+3.2%" },
    myTasks: { value: 15, overdue: 3 },
    totalActive: { value: 89, trend: "+5%" },
    newShow: { value: 23, trend: "+15%" },
    newIndustry: { value: 18, trend: "+7%" },
    unqualified: { value: 45, trend: "-2%" }
  },
  funnelData: [
    { stage: "New Leads", count: 450, percentage: 100, color: "#E3F2FD" },
    { stage: "Contacted", count: 320, percentage: 71, color: "#BBDEFB" },
    { stage: "Qualified", count: 180, percentage: 56, color: "#90CAF9" },
    { stage: "Proposal Sent", count: 95, percentage: 53, color: "#64B5F6" },
    { stage: "Closed Won", count: 42, percentage: 44, color: "#43A047" },
    { stage: "Closed Lost", count: 53, percentage: 56, color: "#E53935" }
  ],
  announcements: [
    {
      id: 1,
      title: "Q4 Sales Training Session",
      summary: "Join us for advanced sales techniques training next week. Learn new methodologies and best practices.",
      date: "2025-10-15",
      status: "unread"
    },
    {
      id: 2,
      title: "New CRM Features Released",
      summary: "Enhanced reporting and automation features now available. Check out the new dashboard widgets and improved lead scoring.",
      date: "2025-10-08",
      status: "read"
    },
    {
      id: 3,
      title: "Team Meeting Tomorrow",
      summary: "Weekly sales team sync at 10 AM. We'll review pipeline progress and discuss upcoming initiatives.",
      date: "2025-10-09",
      status: "unread"
    }
  ],
  user: {
    name: "Alex Thompson",
    role: "Sales Manager",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    email: "alex@globentix.com",
    phone: "+1-555-0100"
  },
  sources: ["Website", "LinkedIn", "Email", "Referral", "Cold Call", "Partner"],
  countries: ["United States", "Canada", "United Kingdom", "Germany", "France", "India", "Australia", "Japan"],
  stages: ["New Leads", "Contacted", "Qualified", "Proposal Sent", "Closed Won", "Closed Lost"]
};

let currentEditingLead = null;
let funnelChart = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeTables();
  initializeSettings();
  initializeAnnouncements();
  initializeFunnelChart();
  updateNotificationBadges();
});

// Navigation Management
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-item a[data-section]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.dataset.section;
      
      // Handle dropdown toggle
      if (this.classList.contains('has-dropdown')) {
        const navItem = this.closest('.nav-item');
        navItem.classList.toggle('active');
        return;
      }
      
      navigateToSection(section);
    });
  });

  // User menu toggle
  const userMenuBtn = document.querySelector('.user-menu-btn');
  const userMenuDropdown = document.querySelector('.user-menu-dropdown');
  
  if (userMenuBtn && userMenuDropdown) {
    userMenuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      userMenuDropdown.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
      userMenuDropdown.classList.add('hidden');
    });
  }
}

function navigateToSection(sectionName) {
  // Update active navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  const activeNavItem = document.querySelector(`[data-section="${sectionName}"]`)?.closest('.nav-item');
  if (activeNavItem) {
    activeNavItem.classList.add('active');
  }

  // Show/hide content sections
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });

  const targetSection = document.getElementById(`${sectionName}-section`);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // Update page title
  const titles = {
    'dashboard': 'Sales Dashboard',
    'leads': 'All Leads',
    'show-leads': 'Show Leads',
    'industry-leads': 'Industry Leads',
    'tasks': 'Tasks',
    'funnel': 'Funnel / Reports',
    'settings': 'Settings',
    'announcements': 'Announcements',
    'help': 'Help / Support'
  };

  document.getElementById('page-title').textContent = titles[sectionName] || 'Dashboard';

  // Load section-specific content
  if (sectionName === 'leads') {
    populateLeadsTable('all');
  } else if (sectionName === 'show-leads') {
    populateLeadsTable('show');
  } else if (sectionName === 'industry-leads') {
    populateLeadsTable('industry');
  }
}

// Table Management
function initializeTables() {
  populateLeadsTable('all');
}

function populateLeadsTable(type) {
  let tableBody;
  let filteredLeads = appData.leads;

  if (type === 'show') {
    tableBody = document.getElementById('show-leads-table-body');
    filteredLeads = appData.leads.filter(lead => lead.type === 'show');
  } else if (type === 'industry') {
    tableBody = document.getElementById('industry-leads-table-body');
    filteredLeads = appData.leads.filter(lead => lead.type === 'industry');
  } else {
    tableBody = document.getElementById('leads-table-body');
  }

  if (!tableBody) return;

  tableBody.innerHTML = filteredLeads.map(lead => `
    <tr>
      <td><input type="checkbox" value="${lead.id}"></td>
      <td><strong>${lead.name}</strong></td>
      <td>${lead.company}</td>
      <td>${lead.email}</td>
      <td>${lead.phone}</td>
      <td>${lead.owner}</td>
      <td><span class="status status--info">${lead.source}</span></td>
      <td><span class="status ${getStageClass(lead.stage)}">${lead.stage}</span></td>
      <td>
        <div class="action-buttons">
          <button class="action-btn view" onclick="viewLead(${lead.id})" title="View">👁️</button>
          <button class="action-btn edit" onclick="editLead(${lead.id})" title="Edit">✏️</button>
          <button class="action-btn delete" onclick="deleteLead(${lead.id})" title="Delete">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function getStageClass(stage) {
  const stageClasses = {
    'New Leads': 'status--info',
    'Contacted': 'status--warning',
    'Qualified': 'status--success',
    'Proposal Sent': 'status--warning',
    'Closed Won': 'status--success',
    'Closed Lost': 'status--error'
  };
  return stageClasses[stage] || 'status--info';
}

// Lead Management
function openLeadModal(leadId = null) {
  const modal = document.getElementById('lead-modal');
  const form = document.getElementById('lead-form');
  const title = document.getElementById('lead-modal-title');
  
  currentEditingLead = leadId;
  
  if (leadId) {
    const lead = appData.leads.find(l => l.id === leadId);
    if (lead) {
      title.textContent = 'Edit Lead';
      populateForm(form, lead);
    }
  } else {
    title.textContent = 'Add New Lead';
    form.reset();
  }
  
  modal.classList.remove('hidden');
}

function openShowLeadModal() {
  openLeadModal();
}

function openIndustryLeadModal() {
  openLeadModal();
}

function populateForm(form, data) {
  Object.keys(data).forEach(key => {
    const field = form.querySelector(`[name="${key}"]`);
    if (field) {
      field.value = data[key] || '';
    }
  });
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add('hidden');
  currentEditingLead = null;
}

function saveLead() {
  const form = document.getElementById('lead-form');
  const formData = new FormData(form);
  const leadData = Object.fromEntries(formData.entries());
  
  // Basic validation
  if (!leadData.email || !leadData.name) {
    showToast('Please fill in all required fields', 'error');
    return;
  }

  if (currentEditingLead) {
    // Update existing lead
    const leadIndex = appData.leads.findIndex(l => l.id === currentEditingLead);
    if (leadIndex !== -1) {
      appData.leads[leadIndex] = { ...appData.leads[leadIndex], ...leadData };
      showToast('Lead updated successfully!', 'success');
    }
  } else {
    // Add new lead
    const newLead = {
      id: Math.max(...appData.leads.map(l => l.id)) + 1,
      stage: 'New Leads',
      owner: 'Alex Thompson',
      type: 'show', // Default type
      ...leadData
    };
    appData.leads.push(newLead);
    showToast('Lead added successfully!', 'success');
  }

  closeModal('lead-modal');
  populateLeadsTable('all');
  updateKPICards();
}

function saveAndNew() {
  saveLead();
  setTimeout(() => {
    openLeadModal();
  }, 500);
}

function viewLead(leadId) {
  const lead = appData.leads.find(l => l.id === leadId);
  if (lead) {
    alert(`Lead Details:\n\nName: ${lead.name}\nCompany: ${lead.company}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nStage: ${lead.stage}`);
  }
}

function editLead(leadId) {
  openLeadModal(leadId);
}

function deleteLead(leadId) {
  if (confirm('Are you sure you want to delete this lead?')) {
    const leadIndex = appData.leads.findIndex(l => l.id === leadId);
    if (leadIndex !== -1) {
      appData.leads.splice(leadIndex, 1);
      populateLeadsTable('all');
      showToast('Lead deleted successfully!', 'success');
      updateKPICards();
    }
  }
}

// Chart Management
function initializeFunnelChart() {
  const ctx = document.getElementById('funnel-chart');
  if (!ctx) return;

  const data = appData.funnelData;
  
  funnelChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.map(stage => `${stage.stage} (${stage.count})`),
      datasets: [{
        data: data.map(stage => stage.count),
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#43A047', '#E53935'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: 12,
              family: 'Poppins'
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const stage = data[context.dataIndex];
              return `${stage.stage}: ${stage.count} leads (${stage.percentage}%)`;
            }
          }
        }
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          const stage = data[index];
          showStageDetails(stage);
        }
      }
    }
  });
}

function showStageDetails(stage) {
  const filteredLeads = appData.leads.filter(lead => lead.stage === stage.stage);
  alert(`${stage.stage} Details:\n\nTotal Leads: ${stage.count}\nConversion Rate: ${stage.percentage}%\n\nLeads in this stage:\n${filteredLeads.map(lead => `• ${lead.name} (${lead.company})`).join('\n')}`);
}

// Settings Management
function initializeSettings() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.dataset.tab;
      
      // Update active tab button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Show corresponding tab content
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      const targetContent = document.getElementById(`${tabId}-tab`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

// Announcements Management
function initializeAnnouncements() {
  renderAnnouncements();
}

function renderAnnouncements() {
  const container = document.getElementById('announcements-list');
  if (!container) return;

  container.innerHTML = appData.announcements.map(announcement => `
    <div class="announcement-item ${announcement.status}" onclick="readAnnouncement(${announcement.id})">
      <div class="announcement-header">
        <h3 class="announcement-title">${announcement.title}</h3>
        <span class="announcement-date">${formatDate(announcement.date)}</span>
      </div>
      <p class="announcement-summary">${announcement.summary}</p>
    </div>
  `).join('');
}

function readAnnouncement(announcementId) {
  const announcement = appData.announcements.find(a => a.id === announcementId);
  if (announcement && announcement.status === 'unread') {
    announcement.status = 'read';
    renderAnnouncements();
    updateNotificationBadges();
  }
}

function markAllRead() {
  appData.announcements.forEach(announcement => {
    announcement.status = 'read';
  });
  renderAnnouncements();
  updateNotificationBadges();
  showToast('All announcements marked as read', 'success');
}

function toggleAnnouncements() {
  navigateToSection('announcements');
}

// Utility Functions
function updateNotificationBadges() {
  const unreadCount = appData.announcements.filter(a => a.status === 'unread').length;
  
  const badges = document.querySelectorAll('.notification-badge');
  badges.forEach(badge => {
    if (unreadCount > 0) {
      badge.textContent = unreadCount;
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  });
}

function updateKPICards() {
  // Update lead count based on current data
  appData.kpiData.totalLeads.value = appData.leads.length;
  
  // Update other metrics (simplified calculation)
  const qualifiedLeads = appData.leads.filter(l => ['Qualified', 'Proposal Sent', 'Closed Won'].includes(l.stage));
  appData.kpiData.positiveResponses.value = qualifiedLeads.length;
  
  const closedWon = appData.leads.filter(l => l.stage === 'Closed Won');
  const conversionRate = appData.leads.length > 0 ? ((closedWon.length / appData.leads.length) * 100).toFixed(1) : 0;
  appData.kpiData.conversionRate.value = `${conversionRate}%`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const messageElement = document.getElementById('toast-message');
  
  messageElement.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

function hideToast() {
  document.getElementById('toast').classList.add('hidden');
}

// Export Functions
function exportData() {
  const data = {
    leads: appData.leads,
    kpis: appData.kpiData,
    exportDate: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'crm-dashboard-export.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showToast('Data exported successfully!', 'success');
}

function exportLeads() {
  const csv = convertToCSV(appData.leads);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'leads-export.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showToast('Leads exported successfully!', 'success');
}

function exportFunnelData() {
  const csv = convertToCSV(appData.funnelData);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'funnel-data-export.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showToast('Funnel data exported successfully!', 'success');
}

function convertToCSV(data) {
  if (!data || data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value;
      }).join(',')
    )
  ].join('\n');
  
  return csv;
}

// Filter Functions
function applyFilters() {
  const sourceFilter = document.getElementById('source-filter').value;
  const dateRange = document.getElementById('date-range').value;
  
  // Simple filtering implementation
  let filteredLeads = appData.leads;
  
  if (sourceFilter) {
    filteredLeads = filteredLeads.filter(lead => lead.source === sourceFilter);
  }
  
  // For demo purposes, we'll just show a toast
  showToast(`Filters applied: ${sourceFilter || 'All Sources'}, ${dateRange}`, 'success');
}

// Event Listeners for filters
document.addEventListener('DOMContentLoaded', function() {
  const sourceFilter = document.getElementById('source-filter');
  const dateRange = document.getElementById('date-range');
  
  if (sourceFilter) {
    sourceFilter.addEventListener('change', applyFilters);
  }
  
  if (dateRange) {
    dateRange.addEventListener('change', applyFilters);
  }
  
  // Select all checkbox functionality
  const selectAllCheckbox = document.getElementById('select-all');
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function() {
      const checkboxes = document.querySelectorAll('.leads-table tbody input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
      });
    });
  }
});

// Logout function
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    showToast('Logging out...', 'success');
    setTimeout(() => {
      // In a real application, this would redirect to login page
      alert('You have been logged out successfully!');
    }, 1000);
  }
}

// Initialize search functionality
function initializeSearch() {
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search leads...';
  searchInput.className = 'form-control';
  searchInput.style.width = '200px';
  
  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    filterLeadsBySearch(query);
  });
}

function filterLeadsBySearch(query) {
  const filteredLeads = appData.leads.filter(lead => 
    lead.name.toLowerCase().includes(query) ||
    lead.company.toLowerCase().includes(query) ||
    lead.email.toLowerCase().includes(query) ||
    lead.stage.toLowerCase().includes(query)
  );
  
  // Update tables with filtered results
  updateTableWithFilteredLeads(filteredLeads);
}

function updateTableWithFilteredLeads(leads) {
  const tableBody = document.getElementById('leads-table-body');
  if (!tableBody) return;

  tableBody.innerHTML = leads.map(lead => `
    <tr>
      <td><input type="checkbox" value="${lead.id}"></td>
      <td><strong>${lead.name}</strong></td>
      <td>${lead.company}</td>
      <td>${lead.email}</td>
      <td>${lead.phone}</td>
      <td>${lead.owner}</td>
      <td><span class="status status--info">${lead.source}</span></td>
      <td><span class="status ${getStageClass(lead.stage)}">${lead.stage}</span></td>
      <td>
        <div class="action-buttons">
          <button class="action-btn view" onclick="viewLead(${lead.id})" title="View">👁️</button>
          <button class="action-btn edit" onclick="editLead(${lead.id})" title="Edit">✏️</button>
          <button class="action-btn delete" onclick="deleteLead(${lead.id})" title="Delete">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Mobile menu toggle
function toggleMobileMenu() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('open');
}