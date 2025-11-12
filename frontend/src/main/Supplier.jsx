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
import { ModeToggle } from "@/components/theme-toggler";
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
  Download
} from 'lucide-react';

const Supplier = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications] = useState([
    { id: 1, type: 'new_po', message: 'New Purchase Order PO-2025-001 received', time: '2 hours ago' },
    { id: 2, type: 'payment', message: 'Payment for INV-00123 has been processed', time: '1 day ago' },
    { id: 3, type: 'update', message: 'Company verification documents expiring soon', time: '3 days ago' }
  ]);

  const [purchaseOrders] = useState([
    {
      id: 'PO-2025-001',
      items: 'Office Supplies (100 units)',
      dueDate: '2025-11-15',
      amount: '₱45,000',
      status: 'pending',
      supplier: 'ABC Supplies Inc.'
    },
    {
      id: 'PO-2025-002',
      items: 'IT Equipment (50 units)',
      dueDate: '2025-11-20',
      amount: '₱125,000',
      status: 'accepted',
      supplier: 'TechCorp Solutions'
    },
    {
      id: 'PO-2025-003',
      items: 'Furniture (25 units)',
      dueDate: '2025-11-10',
      amount: '₱75,000',
      status: 'completed',
      supplier: 'Furniture Plus'
    }
  ]);

  const [payments] = useState([
    { invoice: 'INV-00123', po: 'PO-2025-001', amount: '₱45,000', status: 'Paid', date: 'Oct 10, 2025', ref: 'REF998877' },
    { invoice: 'INV-00124', po: 'PO-2025-004', amount: '₱32,000', status: 'Under Review', date: '—', ref: '—' }
  ]);

  const [messages] = useState([
    { id: 1, po: 'PO-2025-001', sender: 'Procurement Team', message: 'Please confirm delivery schedule', time: '1 hour ago', unread: true },
    { id: 2, po: 'PO-2025-002', sender: 'John Doe', message: 'Invoice submitted successfully', time: '2 days ago', unread: false }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const Dashboard = () => (
    <div className="space-y-6">
      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Purchase Orders</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Deliveries</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Payments Awaiting</p>
                <p className="text-2xl font-bold">₱125,000</p>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rating Overview</p>
                <p className="text-2xl font-bold flex items-center gap-1">
                  4.8 <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shortcut Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-16 flex flex-col gap-2">
          <FileText className="h-6 w-6" />
          View All Purchase Orders
        </Button>
        <Button variant="outline" className="h-16 flex flex-col gap-2">
          <Upload className="h-6 w-6" />
          Upload Invoice
        </Button>
        <Button variant="outline" className="h-16 flex flex-col gap-2">
          <Edit className="h-6 w-6" />
          Update Company Info
        </Button>
      </div>
    </div>
  );

  const PurchaseOrders = () => (
    <div className="space-y-6">
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pending
          </TabsTrigger>
          <TabsTrigger value="accepted" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Accepted
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Completed
          </TabsTrigger>
          <TabsTrigger value="declined" className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            Declined
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {purchaseOrders.filter(po => po.status === 'pending').map(po => (
            <Card key={po.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{po.id}</h3>
                    <p className="text-sm text-muted-foreground">{po.items}</p>
                  </div>
                  <Badge className={getStatusColor(po.status)}>{po.status}</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Due Date</p>
                    <p className="text-sm">{po.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Amount</p>
                    <p className="text-sm">{po.amount}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Accept PO</Button>
                  <Button size="sm" variant="outline">Decline PO</Button>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          {purchaseOrders.filter(po => po.status === 'accepted').map(po => (
            <Card key={po.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{po.id}</h3>
                    <p className="text-sm text-muted-foreground">{po.items}</p>
                  </div>
                  <Badge className={getStatusColor(po.status)}>{po.status}</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Due Date</p>
                    <p className="text-sm">{po.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Amount</p>
                    <p className="text-sm">{po.amount}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Upload Delivery Proof</Button>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {purchaseOrders.filter(po => po.status === 'completed').map(po => (
            <Card key={po.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{po.id}</h3>
                    <p className="text-sm text-muted-foreground">{po.items}</p>
                  </div>
                  <Badge className={getStatusColor(po.status)}>{po.status}</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Due Date</p>
                    <p className="text-sm">{po.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Amount</p>
                    <p className="text-sm">{po.amount}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="declined" className="space-y-4">
          <p className="text-center text-muted-foreground py-8">No declined purchase orders</p>
        </TabsContent>
      </Tabs>
    </div>
  );

  const InvoiceDelivery = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Invoice / Delivery Receipt</CardTitle>
          <CardDescription>Submit your invoice or delivery proof for processing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="po-select">Select Purchase Order</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose PO" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PO-2025-001">PO-2025-001 - Office Supplies</SelectItem>
                  <SelectItem value="PO-2025-002">PO-2025-002 - IT Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="file-upload">Upload File</Label>
              <Input id="file-upload" type="file" accept=".pdf,.jpg,.png" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks / Delivery Notes</Label>
            <Textarea id="remarks" placeholder="Add any additional notes..." />
          </div>
          <Button className="w-full">Submit Invoice</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Submission History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO Number</TableHead>
                <TableHead>File Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>PO-2025-001</TableCell>
                <TableCell>invoice_001.pdf</TableCell>
                <TableCell><Badge className="bg-green-100 text-green-800">Approved</Badge></TableCell>
                <TableCell>Oct 5, 2025</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const Messages = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Communication Center
          </CardTitle>
          <CardDescription>Direct messaging with procurement team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map(message => (
              <div key={message.id} className={`p-4 rounded-lg border ${message.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{message.sender}</p>
                    <p className="text-sm text-muted-foreground">PO: {message.po}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{message.time}</span>
                </div>
                <p className="text-sm">{message.message}</p>
                {message.unread && <Badge className="mt-2 bg-blue-100 text-blue-800">New</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Send Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="po-message">Related PO</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select PO" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PO-2025-001">PO-2025-001</SelectItem>
                <SelectItem value="PO-2025-002">PO-2025-002</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Type your message..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="attachment">Attachment (optional)</Label>
            <Input id="attachment" type="file" />
          </div>
          <Button className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const Performance = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold mb-2">4.8</div>
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className={`h-6 w-6 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <p className="text-muted-foreground">Overall Rating</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>On-time Delivery</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
                <span className="text-sm font-medium">95%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Quality Compliance</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <span className="text-sm font-medium">92%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Responsiveness</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
                <span className="text-sm font-medium">88%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feedback History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-medium">Excellent delivery timing</p>
              <p className="text-sm text-muted-foreground">Procurement Team - Oct 8, 2025</p>
              <p className="text-sm mt-1">Consistently meeting deadlines and providing quality products.</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <p className="font-medium">Communication could be improved</p>
              <p className="text-sm text-muted-foreground">Procurement Team - Sep 15, 2025</p>
              <p className="text-sm mt-1">Please provide more detailed delivery updates.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const Payments = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Tracker
          </CardTitle>
          <CardDescription>Monitor your payment processing status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice No</TableHead>
                <TableHead>PO No</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Paid</TableHead>
                <TableHead>Reference No</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{payment.invoice}</TableCell>
                  <TableCell>{payment.po}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                  </TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.ref}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const Profile = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Company Information
          </CardTitle>
          <CardDescription>Manage your business details and documents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="ABC Supplies Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-person">Contact Person</Label>
              <Input id="contact-person" defaultValue="John Smith" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="123 Business St, Manila" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tin">TIN</Label>
              <Input id="tin" defaultValue="123-456-789-000" />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Business Documents</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <p className="font-medium mb-2">Business Permit</p>
                <p className="text-sm text-muted-foreground mb-2">Expires: Dec 31, 2025</p>
                <Button size="sm" variant="outline">Upload New</Button>
              </div>
              <div className="border rounded-lg p-4">
                <p className="font-medium mb-2">DTI/SEC Certificate</p>
                <p className="text-sm text-muted-foreground mb-2">Valid</p>
                <Button size="sm" variant="outline">Upload New</Button>
              </div>
              <div className="border rounded-lg p-4">
                <p className="font-medium mb-2">BIR Certificate</p>
                <p className="text-sm text-muted-foreground mb-2">Valid</p>
                <Button size="sm" variant="outline">Upload New</Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Bank Account Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bank-name">Bank Name</Label>
                <Input id="bank-name" defaultValue="BDO" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-number">Account Number</Label>
                <Input id="account-number" defaultValue="1234567890" />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button>Save Changes</Button>
            <Button variant="outline">Submit for Revalidation</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const Support = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Help Center
          </CardTitle>
          <CardDescription>Get assistance and support</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Frequently Asked Questions</h4>
            <div className="space-y-2">
              <details className="border rounded-lg p-4">
                <summary className="font-medium cursor-pointer">How do I accept a purchase order?</summary>
                <p className="mt-2 text-sm text-muted-foreground">
                  Go to Purchase Orders tab, find the pending PO, and click "Accept PO" button.
                </p>
              </details>
              <details className="border rounded-lg p-4">
                <summary className="font-medium cursor-pointer">How to upload an invoice?</summary>
                <p className="mt-2 text-sm text-muted-foreground">
                  Navigate to Invoices tab, select the PO, upload your file, and submit.
                </p>
              </details>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Contact Support</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <p className="font-medium">Procurement Admin</p>
                <p className="text-sm text-muted-foreground">procurement@company.com</p>
                <p className="text-sm text-muted-foreground">+63 912 345 6789</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="font-medium">Technical Support</p>
                <p className="text-sm text-muted-foreground">support@company.com</p>
                <p className="text-sm text-muted-foreground">+63 987 654 3210</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Submit a Ticket</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ticket-subject">Subject</Label>
                <Input id="ticket-subject" placeholder="Brief description of your issue" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ticket-message">Message</Label>
                <Textarea id="ticket-message" placeholder="Detailed description..." />
              </div>
              <Button>Submit Ticket</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'profile': return <Profile />;
      case 'purchase-orders': return <PurchaseOrders />;
      case 'invoices': return <InvoiceDelivery />;
      case 'messages': return <Messages />;
      case 'performance': return <Performance />;
      case 'payments': return <Payments />;
      case 'support': return <Support />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-black">Supplier Portal</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-2 text-sm font-medium ${activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-black dark:hover:text-gray-800'}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('purchase-orders')}
                className={`px-3 py-2 text-sm font-medium ${activeTab === 'purchase-orders' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-black dark:hover:text-gray-800'}`}
              >
                Purchase Orders
              </button>
              <button
                onClick={() => setActiveTab('invoices')}
                className={`px-3 py-2 text-sm font-medium ${activeTab === 'invoices' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-black dark:hover:text-gray-800'}`}
              >
                Invoices
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`px-3 py-2 text-sm font-medium ${activeTab === 'messages' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-black dark:hover:text-gray-800'}`}
              >
                Messages
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`px-3 py-2 text-sm font-medium ${activeTab === 'payments' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-black dark:hover:text-gray-800'}`}
              >
                Payments
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-3 py-2 text-sm font-medium ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-black dark:hover:text-gray-800'}`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('support')}
                className={`px-3 py-2 text-sm font-medium ${activeTab === 'support' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-black dark:hover:text-gray-800'}`}
              >
                Support
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <ModeToggle />
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>SP</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">Logout</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Supplier;
