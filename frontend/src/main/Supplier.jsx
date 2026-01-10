import React, { useState, useEffect } from 'react';
import axios from 'axios';

// API configuration - connecting to qrlog1 backend
const API_BASE = 'http://localhost/qrlog1/backend/public/api'; // Adjust this URL as needed

const Supplier = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Dashboard data
  const [dashboardData, setDashboardData] = useState({
    activeOffers: 0,
    pendingOffers: 0,
    totalSales: 0,
    newNotifications: 0
  });

  // Vendor profile data
  const [profileData, setProfileData] = useState({
    company_name: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    company_description: '',
    business_category: '',
    vendor_type: '',
    services_offered: '',
    location: '',
    capacity: ''
  });

  // Documents
  const [documents, setDocuments] = useState([]);

  // Pricing/Services
  const [services, setServices] = useState([]);

  // Notifications
  const [notifications, setNotifications] = useState([]);

  // Bookings/Requests
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadVendorData();
  }, []);

  const loadVendorData = async () => {
    try {
      setLoading(true);

      // Load vendor profile
      const profileResponse = await axios.get(`${API_BASE}/vendor/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('vendor_token')}` }
      });
      setVendor(profileResponse.data.vendor);
      setProfileData(profileResponse.data.vendor);
      setDocuments(profileResponse.data.documents || []);

      // Load dashboard data
      const dashboardResponse = await axios.get(`${API_BASE}/vendor/dashboard`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('vendor_token')}` }
      });
      setDashboardData(dashboardResponse.data);

      // Load notifications
      const notificationsResponse = await axios.get(`${API_BASE}/vendor/notifications`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('vendor_token')}` }
      });
      setNotifications(notificationsResponse.data);

      setError('');
    } catch (err) {
      setError('Failed to load vendor data: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const getStatusIndicator = () => {
    if (!vendor) return { color: 'gray', text: 'Loading...' };

    switch (vendor.status) {
      case 'approved':
        return { color: 'green', text: '🟢 Approved' };
      case 'pending':
        return { color: 'yellow', text: '🟡 Pending' };
      case 'rejected':
      case 'suspended':
        return { color: 'red', text: '🔴 Rejected/Inactive' };
      default:
        return { color: 'gray', text: '⚪ Unknown' };
    }
  };

  const VendorDashboard = () => {
    const statusIndicator = getStatusIndicator();

    return (
      <div className="space-y-6">
        {/* Status Indicator */}
        <div className={`p-4 rounded-lg border-2 ${
          statusIndicator.color === 'green' ? 'border-green-500 bg-green-50' :
          statusIndicator.color === 'yellow' ? 'border-yellow-500 bg-yellow-50' :
          statusIndicator.color === 'red' ? 'border-red-500 bg-red-50' :
          'border-gray-500 bg-gray-50'
        }`}>
          <h3 className="text-lg font-bold">Profile Status: {statusIndicator.text}</h3>
          <p className="text-sm mt-1">
            {vendor?.status === 'approved' ? 'Your account is active and you can accept bookings.' :
             vendor?.status === 'pending' ? 'Your application is under review.' :
             'Please check your notifications for status updates.'}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Offers</p>
                <p className="text-2xl font-bold">{dashboardData.active_offers || 0}</p>
              </div>
              <div className="text-2xl">📦</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Offers</p>
                <p className="text-2xl font-bold">{dashboardData.pending_offers || 0}</p>
              </div>
              <div className="text-2xl">⏳</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold">₱{(dashboardData.total_sales || 0).toLocaleString()}</p>
              </div>
              <div className="text-2xl">💰</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Notifications</p>
                <p className="text-2xl font-bold">{dashboardData.new_notifications || 0}</p>
              </div>
              <div className="text-2xl">🔔</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveSection('profile')}
            className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">👤</div>
              <div className="font-medium">Update Profile</div>
            </div>
          </button>

          <button
            onClick={() => setActiveSection('documents')}
            className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">📄</div>
              <div className="font-medium">Upload Documents</div>
            </div>
          </button>

          <button
            onClick={() => setActiveSection('pricing')}
            className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">💰</div>
              <div className="font-medium">Manage Pricing</div>
            </div>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {notifications.slice(0, 5).map(notification => (
              <div key={notification.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{notification.message}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(notification.created_at).toLocaleDateString()}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const VendorProfile = () => {
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState(profileData);

    const handleSave = async () => {
      try {
        await axios.put(`${API_BASE}/vendor/profile`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('vendor_token')}` }
        });
        setProfileData(formData);
        setVendor({ ...vendor, ...formData });
        setEditing(false);
        alert('Profile updated successfully! Changes are pending admin approval.');
      } catch (err) {
        alert('Failed to update profile: ' + (err.response?.data?.message || err.message));
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Vendor Profile</h2>
          <button
            onClick={() => setEditing(!editing)}
            className={`px-4 py-2 rounded ${editing ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              {editing ? (
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="px-3 py-2 bg-gray-50 rounded">{profileData.company_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <p className="px-3 py-2 bg-gray-50 rounded">{profileData.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              {editing ? (
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="px-3 py-2 bg-gray-50 rounded">{profileData.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              {editing ? (
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="px-3 py-2 bg-gray-50 rounded">{profileData.website || 'Not provided'}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Address</label>
            {editing ? (
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded h-20"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded">{profileData.address}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Company Description</label>
            {editing ? (
              <textarea
                value={formData.company_description}
                onChange={(e) => setFormData({...formData, company_description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded h-24"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded">{profileData.company_description || 'Not provided'}</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Services & Capacity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Services Offered</label>
              {editing ? (
                <textarea
                  value={formData.services_offered}
                  onChange={(e) => setFormData({...formData, services_offered: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded h-20"
                  placeholder="Describe the services you offer..."
                />
              ) : (
                <p className="px-3 py-2 bg-gray-50 rounded">{profileData.services_offered || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location/Coverage Area</label>
              {editing ? (
                <textarea
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded h-20"
                  placeholder="Areas you serve..."
                />
              ) : (
                <p className="px-3 py-2 bg-gray-50 rounded">{profileData.location || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Capacity</label>
              {editing ? (
                <input
                  type="text"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="Maximum capacity per booking..."
                />
              ) : (
                <p className="px-3 py-2 bg-gray-50 rounded">{profileData.capacity || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>

        {editing && (
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  };

  const DocumentUpload = () => {
    const [uploading, setUploading] = useState(false);

    const handleFileUpload = async (documentType, file) => {
      if (!file) return;

      const formData = new FormData();
      formData.append('document_type', documentType);
      formData.append('file', file);

      try {
        setUploading(true);
        await axios.post(`${API_BASE}/vendor/documents`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('vendor_token')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Document uploaded successfully! It will be reviewed by our team.');
        loadVendorData(); // Refresh documents
      } catch (err) {
        alert('Failed to upload document: ' + (err.response?.data?.message || err.message));
      } finally {
        setUploading(false);
      }
    };

    const getDocumentStatus = (type) => {
      const doc = documents.find(d => d.document_type === type);
      if (!doc) return { status: 'missing', color: 'red' };
      return {
        status: doc.status === 'approved' ? 'approved' : doc.status === 'pending' ? 'pending' : 'rejected',
        color: doc.status === 'approved' ? 'green' : doc.status === 'pending' ? 'yellow' : 'red'
      };
    };

    const requiredDocuments = [
      { type: 'business_permit', label: 'Business Permit' },
      { type: 'tax_certificate', label: 'Tax Certificate' },
      { type: 'insurance', label: 'Insurance Certificate' },
      { type: 'valid_id', label: 'Valid ID' },
      { type: 'company_registration', label: 'Company Registration' }
    ];

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Document Upload</h2>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Required Documents</h3>
          <div className="space-y-4">
            {requiredDocuments.map(doc => {
              const status = getDocumentStatus(doc.type);
              return (
                <div key={doc.type} className="flex items-center justify-between p-4 border rounded">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      status.color === 'green' ? 'bg-green-500' :
                      status.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="font-medium">{doc.label}</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      status.status === 'approved' ? 'bg-green-100 text-green-800' :
                      status.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      status.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {status.status === 'missing' ? 'Not Uploaded' : status.status.charAt(0).toUpperCase() + status.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(doc.type, e.target.files[0])}
                      disabled={uploading}
                      className="hidden"
                      id={`file-${doc.type}`}
                    />
                    <label
                      htmlFor={`file-${doc.type}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 disabled:opacity-50"
                    >
                      {uploading ? 'Uploading...' : 'Upload'}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Compliance Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded">
              <div className="text-2xl font-bold text-gray-600">
                {documents.filter(d => d.status === 'approved').length}
              </div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded">
              <div className="text-2xl font-bold text-yellow-600">
                {documents.filter(d => d.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded">
              <div className="text-2xl font-bold text-red-600">
                {documents.filter(d => d.status === 'rejected').length}
              </div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PricingServices = () => {
    const [newService, setNewService] = useState({
      title: '',
      description: '',
      price: '',
      category: '',
      capacity: '',
      availability_dates: ''
    });

    const handleSubmitService = async () => {
      try {
        await axios.post(`${API_BASE}/vendor/offers`, newService, {
          headers: { Authorization: `Bearer ${localStorage.getItem('vendor_token')}` }
        });
        alert('Service submitted successfully! It will be reviewed by our team.');
        setNewService({
          title: '',
          description: '',
          price: '',
          category: '',
          capacity: '',
          availability_dates: ''
        });
        loadVendorData();
      } catch (err) {
        alert('Failed to submit service: ' + (err.response?.data?.message || err.message));
      }
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Pricing & Services</h2>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Submit New Service/Offer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Service Title</label>
              <input
                type="text"
                value={newService.title}
                onChange={(e) => setNewService({...newService, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="e.g., Bohol Island Tour Package"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={newService.category}
                onChange={(e) => setNewService({...newService, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="">Select category</option>
                <option value="Hotel">Hotel</option>
                <option value="Transport">Transport</option>
                <option value="Equipment">Equipment</option>
                <option value="Food">Food</option>
                <option value="Activity">Activity</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price (₱)</label>
              <input
                type="number"
                value={newService.price}
                onChange={(e) => setNewService({...newService, price: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="2500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Capacity</label>
              <input
                type="text"
                value={newService.capacity}
                onChange={(e) => setNewService({...newService, capacity: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Max 20 persons"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={newService.description}
              onChange={(e) => setNewService({...newService, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded h-24"
              placeholder="Detailed description of your service..."
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Availability Dates</label>
            <input
              type="text"
              value={newService.availability_dates}
              onChange={(e) => setNewService({...newService, availability_dates: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="e.g., Available every weekend, or specific dates"
            />
          </div>

          <div className="mt-4">
            <button
              onClick={handleSubmitService}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Submit for Approval
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">My Services</h3>
          <div className="space-y-3">
            {services.map(service => (
              <div key={service.id} className="p-4 border rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{service.title}</h4>
                    <p className="text-sm text-gray-600">{service.description}</p>
                    <p className="text-sm font-medium">₱{service.price} - {service.category}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    service.status === 'approved' ? 'bg-green-100 text-green-800' :
                    service.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {service.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const BookingRequests = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Booking Requests</h2>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          {bookings.length === 0 ? (
            <p className="text-gray-600">No booking requests at this time.</p>
          ) : (
            <div className="space-y-3">
              {bookings.map(booking => (
                <div key={booking.id} className="p-4 border rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{booking.service_title}</h4>
                      <p className="text-sm text-gray-600">Customer: {booking.customer_name}</p>
                      <p className="text-sm">Date: {booking.date} | Guests: {booking.guests}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                        Confirm
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const Notifications = () => {
    const markAsRead = async (id) => {
      try {
        await axios.put(`${API_BASE}/vendor/notifications/${id}/read`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('vendor_token')}` }
        });
        loadVendorData();
      } catch (err) {
        console.error('Failed to mark notification as read:', err);
      }
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Notifications</h2>

        <div className="space-y-3">
          {notifications.map(notification => (
            <div key={notification.id} className={`p-4 border rounded ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium">{notification.message}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(notification.created_at).toLocaleDateString()} {new Date(notification.created_at).toLocaleTimeString()}
                  </p>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <VendorDashboard />;
      case 'profile':
        return <VendorProfile />;
      case 'documents':
        return <DocumentUpload />;
      case 'pricing':
        return <PricingServices />;
      case 'bookings':
        return <BookingRequests />;
      case 'notifications':
        return <Notifications />;
      default:
        return <VendorDashboard />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading vendor portal...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={loadVendorData}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const statusIndicator = getStatusIndicator();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900">Vendor Portal</h1>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusIndicator.color === 'green' ? 'bg-green-100 text-green-800' :
                statusIndicator.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                statusIndicator.color === 'red' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {statusIndicator.text}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Welcome, {vendor?.company_name}</span>
              <button
                onClick={() => {
                  localStorage.removeItem('vendor_token');
                  window.location.href = '/login';
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'profile', label: 'Profile', icon: '👤' },
              { id: 'documents', label: 'Documents', icon: '📄' },
              { id: 'pricing', label: 'Pricing', icon: '💰' },
              { id: 'bookings', label: 'Bookings', icon: '📅' },
              { id: 'notifications', label: 'Notifications', icon: '🔔' }
            ].map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeSection === section.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Supplier;
