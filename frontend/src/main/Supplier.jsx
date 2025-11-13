import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Bell,
  FileText,
  Upload,
  MessageSquare,
  Star,
  CreditCard,
  HelpCircle,
  User,
  ShoppingCart,
  TrendingUp,
  Package,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Plus,
  Send,
  Download,
  LogOut,
  Home,
  Briefcase,
  BarChart3,
  Settings,
  Filter
} from 'lucide-react';

const Supplier = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [vendorName] = useState('ABC Travel Services');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Mock data
  const [offers] = useState([
    {
      id: 1,
      title: 'Baguio City Tour Package',
      category: 'Tours',
      price: 2500,
      slots: 20,
      status: 'active',
      datePosted: '2025-11-01',
      bookings: 5
    },
    {
      id: 2,
      title: 'Palawan Island Hopping',
      category: 'Adventure',
      price: 3500,
      slots: 15,
      status: 'pending',
      datePosted: '2025-11-05',
      bookings: 0
    },
    {
      id: 3,
      title: 'Cebu City Cultural Tour',
      category: 'Cultural',
      price: 1800,
      slots: 25,
      status: 'active',
      datePosted: '2025-10-28',
      bookings: 12
    }
  ]);

  const [transactions] = useState([
    {
      date: '2025-11-10',
      offer: 'Baguio City Tour Package',
      buyer: 'John Doe',
      total: 2500,
      platformFee: 75,
      netPayout: 2425,
      paymentMethod: 'GCash',
      status: 'completed'
    },
    {
      date: '2025-11-08',
      offer: 'Cebu City Cultural Tour',
      buyer: 'Jane Smith',
      total: 1800,
      platformFee: 54,
      netPayout: 1746,
      paymentMethod: 'Bank Transfer',
      status: 'completed'
    }
  ]);

  const [notifications] = useState([
    { id: 1, type: 'approved', message: 'Your "Baguio City Tour Package" offer has been approved', time: '2 hours ago' },
    { id: 2, type: 'booking', message: 'New booking for "Cebu City Cultural Tour"', time: '1 day ago' },
    { id: 3, type: 'payment', message: 'Payment received for booking #12345', time: '2 days ago' },
    { id: 4, type: 'reminder', message: 'Business permit expires in 30 days', time: '3 days ago' }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLogout = () => {
    // Handle logout logic here
    setShowLogoutDialog(false);
    // Redirect to login page
  };

  const Dashboard = () => (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {vendorName}!</h1>
        <p className="text-blue-100">Here's what's happening with your offers today.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Offers</p>
                <p className="text-2xl font-bold">{offers.filter(o => o.status === 'active').length}</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Offers</p>
                <p className="text-2xl font-bold">{offers.filter(o => o.status === 'pending').length}</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Successful Sales</p>
                <p className="text-2xl font-bold">₱{transactions.reduce((sum, t) => sum + t.netPayout, 0).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Net after 3% platform fee</p>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Notifications</p>
                <p className="text-2xl font-bold">{notifications.filter(n => n.time.includes('hour')).length}</p>
              </div>
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-16 flex flex-col gap-2" onClick={() => setActivePage('create-offer')}>
          <Plus className="h-6 w-6" />
          Create New Offer
        </Button>
        <Button variant="outline" className="h-16 flex flex-col gap-2" onClick={() => setActivePage('offers')}>
          <Briefcase className="h-6 w-6" />
          View My Offers
        </Button>
        <Button variant="outline" className="h-16 flex flex-col gap-2" onClick={() => setActivePage('transactions')}>
          <BarChart3 className="h-6 w-6" />
          View Transactions
        </Button>
      </div>
    </div>
  );

  const MyOffers = () => {
    const [filter, setFilter] = useState('all');

    const filteredOffers = offers.filter(offer => {
      if (filter === 'all') return true;
      return offer.status === filter;
    });

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">My Offers</h2>
          <Button onClick={() => setActivePage('create-offer')}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Offer
          </Button>
        </div>

        {/* Filters */}
        <Tabs value={filter} onValueChange={setFilter} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Offers Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Offer Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Slots</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Posted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOffers.map(offer => (
                  <TableRow key={offer.id}>
                    <TableCell className="font-medium">{offer.title}</TableCell>
                    <TableCell>{offer.category}</TableCell>
                    <TableCell>₱{offer.price}</TableCell>
                    <TableCell>{offer.slots}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(offer.status)}>{offer.status}</Badge>
                    </TableCell>
                    <TableCell>{offer.datePosted}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          Close
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };

  const CreateOffer = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Create New Offer</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Offer Details</CardTitle>
          <CardDescription>Fill in the details for your new travel offer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="e.g., Baguio City Tour Package" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tours">Tours</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="relaxation">Relaxation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (₱)</Label>
              <Input id="price" type="number" placeholder="2500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slots">Available Slots</Label>
              <Input id="slots" type="number" placeholder="20" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="validity">Validity Period</Label>
              <Input id="validity" type="date" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Describe your offer in detail..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachments">Attachments</Label>
            <Input id="attachments" type="file" multiple accept="image/*,.pdf" />
            <p className="text-sm text-muted-foreground">Upload images, brochures, or documents</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea id="remarks" placeholder="Additional notes or terms..." />
          </div>

          <div className="flex gap-4">
            <Button>Preview Offer</Button>
            <Button>Submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const Notifications = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Notifications & Messages</h2>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map(notification => (
              <Alert key={notification.id}>
                <AlertDescription className="flex justify-between items-center">
                  <span>{notification.message}</span>
                  <span className="text-sm text-muted-foreground">{notification.time}</span>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Messages from Admin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">Admin Support</p>
                  <p className="text-sm text-muted-foreground">Re: Offer Approval</p>
                </div>
                <span className="text-sm text-muted-foreground">1 hour ago</span>
              </div>
              <p className="text-sm">Your offer has been reviewed and approved. You can now start accepting bookings.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const Transactions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sales & Transactions</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter by Date
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Offer</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Platform Fee (3%)</TableHead>
                <TableHead>Vendor Net Payout</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="font-medium">{transaction.offer}</TableCell>
                  <TableCell>{transaction.buyer}</TableCell>
                  <TableCell>₱{transaction.total}</TableCell>
                  <TableCell>₱{transaction.platformFee}</TableCell>
                  <TableCell className="font-medium">₱{transaction.netPayout}</TableCell>
                  <TableCell>{transaction.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">₱{transactions.reduce((sum, t) => sum + t.total, 0)}</p>
              <p className="text-sm text-muted-foreground">Total Sales</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">₱{transactions.reduce((sum, t) => sum + t.platformFee, 0)}</p>
              <p className="text-sm text-muted-foreground">Platform Fees</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">₱{transactions.reduce((sum, t) => sum + t.netPayout, 0)}</p>
              <p className="text-sm text-muted-foreground">Net Payout</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const Profile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profile Settings</h2>

      {/* Company Info */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Update your business details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="ABC Travel Services" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input id="contact" defaultValue="+63 912 345 6789" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="contact@abctravel.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" defaultValue="https://abctravel.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" defaultValue="123 Rizal Avenue, Makati City, Philippines" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Company Description</Label>
            <Textarea id="description" placeholder="Describe your business..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Business Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="travel-agency">Travel Agency</SelectItem>
                <SelectItem value="tour-operator">Tour Operator</SelectItem>
                <SelectItem value="accommodation">Accommodation</SelectItem>
                <SelectItem value="transportation">Transportation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Business Documents</CardTitle>
          <CardDescription>Upload and manage your verification documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <p className="font-medium mb-2">Business Permit</p>
              <p className="text-sm text-muted-foreground mb-2">Expires: Dec 31, 2025</p>
              <Badge className="bg-green-100 text-green-800 mb-2">Verified</Badge>
              <Button size="sm" variant="outline">Upload New</Button>
            </div>
            <div className="border rounded-lg p-4">
              <p className="font-medium mb-2">BIR Certificate</p>
              <p className="text-sm text-muted-foreground mb-2">Valid</p>
              <Badge className="bg-green-100 text-green-800 mb-2">Verified</Badge>
              <Button size="sm" variant="outline">Upload New</Button>
            </div>
            <div className="border rounded-lg p-4">
              <p className="font-medium mb-2">Valid ID</p>
              <p className="text-sm text-muted-foreground mb-2">Valid</p>
              <Badge className="bg-green-100 text-green-800 mb-2">Verified</Badge>
              <Button size="sm" variant="outline">Upload New</Button>
            </div>
            <div className="border rounded-lg p-4">
              <p className="font-medium mb-2">DTI/SEC Registration</p>
              <p className="text-sm text-muted-foreground mb-2">Valid</p>
              <Badge className="bg-green-100 text-green-800 mb-2">Verified</Badge>
              <Button size="sm" variant="outline">Upload New</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
          <CardDescription>Manage your payout settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="payment-method">Payment Method</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="gcash">GCash</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="account-name">Account Name</Label>
              <Input id="account-name" defaultValue="ABC Travel Services Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-number">Account Number / Mobile</Label>
              <Input id="account-number" defaultValue="1234567890" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bank-name">Bank Name</Label>
              <Input id="bank-name" defaultValue="Banco de Oro" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Input id="branch" defaultValue="Makati Branch" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payout-frequency">Payout Frequency</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="proof">Upload Proof of Account</Label>
            <Input id="proof" type="file" accept="image/*,.pdf" />
            <p className="text-sm text-muted-foreground">Upload bank statement or account verification</p>
          </div>

          <div className="flex gap-2">
            <Button>Save Changes</Button>
            <Button variant="outline">Change Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const TermsAgreement = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Terms & Agreement</h2>

      <Card>
        <CardHeader>
          <CardTitle>Vendor Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold">1. Platform Fee</h3>
            <p>A 3% platform fee will be deducted from each successful booking/transaction. This fee covers platform maintenance, payment processing, and customer support services.</p>

            <h3 className="text-lg font-semibold">2. Payment Terms</h3>
            <p>Vendors will receive payouts according to their selected payout frequency (weekly, bi-weekly, or monthly). Payments are processed within 3-5 business days after the service completion date.</p>

            <h3 className="text-lg font-semibold">3. Vendor Responsibilities</h3>
            <ul className="list-disc list-inside ml-4">
              <li>Provide accurate and complete information about services</li>
              <li>Maintain all necessary licenses and permits</li>
              <li>Deliver services as advertised</li>
              <li>Respond to customer inquiries within 24 hours</li>
              <li>Maintain professional conduct with customers</li>
            </ul>

            <h3 className="text-lg font-semibold">4. Compliance Requirements</h3>
            <p>All vendors must maintain valid business registration, appropriate licenses, and comply with local tourism regulations. Regular document verification may be required.</p>

            <h3 className="text-lg font-semibold">5. Cancellation Policy</h3>
            <p>Vendors must clearly communicate their cancellation and refund policies. The platform reserves the right to intervene in disputes between vendors and customers.</p>

            <h3 className="text-lg font-semibold">6. Content Guidelines</h3>
            <p>All offers, descriptions, and images must be accurate and not misleading. The platform reserves the right to remove content that violates these guidelines.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const HelpSupport = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Help & Support</h2>

      <Card>
        <CardHeader>
          <CardTitle>FAQ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <details className="border rounded-lg p-4">
            <summary className="font-medium cursor-pointer">How do I create a new offer?</summary>
            <p className="mt-2 text-sm text-muted-foreground">
              Click on "Create New Offer" from the dashboard or navigation menu. Fill in all required fields including title, category, price, and description.
            </p>
          </details>
          <details className="border rounded-lg p-4">
            <summary className="font-medium cursor-pointer">When do I receive payments?</summary>
            <p className="mt-2 text-sm text-muted-foreground">
              Payments are processed according to your selected payout frequency. You'll receive payouts within 3-5 business days after service completion.
            </p>
          </details>
          <details className="border rounded-lg p-4">
            <summary className="font-medium cursor-pointer">How do I update my profile information?</summary>
            <p className="mt-2 text-sm text-muted-foreground">
              Go to Profile settings to update your company information, documents, and payment details.
            </p>
          </details>
          <details className="border rounded-lg p-4">
            <summary className="font-medium cursor-pointer">What documents do I need to verify my account?</summary>
            <p className="mt-2 text-sm text-muted-foreground">
              You need to upload your business permit, BIR certificate, valid ID, and DTI/SEC registration for account verification.
            </p>
          </details>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <p className="font-medium">Email Support</p>
              <p className="text-sm text-muted-foreground">support@travelandtours.com</p>
              <p className="text-sm text-muted-foreground">Response time: 24 hours</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="font-medium">Phone Support</p>
              <p className="text-sm text-muted-foreground">+63 2 123 4567</p>
              <p className="text-sm text-muted-foreground">Mon-Fri, 9AM-6PM</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Submit a Support Ticket</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief description of your issue" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Detailed description..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="attachment">Attachment (optional)</Label>
                <Input id="attachment" type="file" />
              </div>
              <Button>Submit Ticket</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'offers': return <MyOffers />;
      case 'create-offer': return <CreateOffer />;
      case 'notifications': return <Notifications />;
      case 'transactions': return <Transactions />;
      case 'profile': return <Profile />;
      case 'terms': return <TermsAgreement />;
      case 'help': return <HelpSupport />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">TravelAndTours Vendor Portal</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActivePage('dashboard')}
                className={`px-3 py-2 text-sm font-medium ${activePage === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActivePage('offers')}
                className={`px-3 py-2 text-sm font-medium ${activePage === 'offers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                My Offers
              </button>
              <button
                onClick={() => setActivePage('transactions')}
                className={`px-3 py-2 text-sm font-medium ${activePage === 'transactions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Transactions
              </button>
              <button
                onClick={() => setActivePage('notifications')}
                className={`px-3 py-2 text-sm font-medium ${activePage === 'notifications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Messages
              </button>
              <button
                onClick={() => setActivePage('profile')}
                className={`px-3 py-2 text-sm font-medium ${activePage === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Profile
              </button>
              <button
                onClick={() => setActivePage('help')}
                className={`px-3 py-2 text-sm font-medium ${activePage === 'help' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Help
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>{vendorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" onClick={() => setShowLogoutDialog(true)}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout? You will need to login again to access your account.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Supplier;
