// === Updated AdminDashboard.tsx ===
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/Usercontext';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from '@/components/ui/card';
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  Users, Globe, BarChart, Search, PieChart, Calendar, User, Settings, History
} from 'lucide-react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate as useNav } from 'react-router-dom';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [statusCounts, setStatusCounts] = useState({ Active: 0, Completed: 0, Inactive: 0, Submitted: 0 });
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { user } = useUser();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') navigate('/');
  }, [user]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const snapshot = await getDocs(collection(db, 'customers'));
      const data: any[] = [];
      const counts = { Active: 0, Completed: 0, Inactive: 0, Submitted: 0 };

      snapshot.forEach(doc => {
        const customer = { id: doc.id, ...doc.data() };
        data.push(customer);
        if (customer.currentStatus && counts[customer.currentStatus] !== undefined) counts[customer.currentStatus]++;
      });

      setCustomers(data);
      setFiltered(data);
      setStatusCounts(counts);
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    setFiltered(
      customers.filter(c =>
        c.name?.toLowerCase().includes(lower) ||
        c.website?.toLowerCase().includes(lower)
      )
    );
  }, [searchTerm, customers]);

  const handleBroadcast = async () => {
    try {
      await addDoc(collection(db, 'broadcasts'), {
        message: broadcastMessage,
        sentAt: new Date().toISOString(),
        sender: user.email
      });
      setBroadcastMessage('');
      setShowModal(false);
      toast.toast({ title: 'Broadcast sent' });
    } catch (e) {
      toast.toast({ title: 'Error', description: 'Failed to send broadcast', variant: 'destructive' });
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={() => setShowModal(true)}>
          <Settings className="h-4 w-4 mr-2" /> Settings
        </Button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {['Active', 'Completed', 'Inactive', 'Submitted'].map(key => (
          <Card key={key}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{key} Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-2xl font-bold">{statusCounts[key]}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4">
          <div className="flex justify-between items-center">
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <div className="grid grid-cols-12 p-4 text-sm font-medium">
              <div className="col-span-4">Customer</div>
              <div className="col-span-3">Website</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Created By</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            {filtered.map((c) => (
              <div key={c.id} className="grid grid-cols-12 p-4 text-sm border-t">
                <div className="col-span-4">{c.name}</div>
                <div className="col-span-3">{c.website}</div>
                <div className="col-span-2">
                  <Badge>{c.currentStatus}</Badge>
                </div>
                <div className="col-span-2">{c.createdBy || 'N/A'}</div>
                <div className="col-span-1 text-right">
                  <Button size="sm" variant="ghost" onClick={() => navigate(`/customer-detail/${c.id}`)}>View</Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Broadcast Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Broadcast Message</h2>
            <textarea
              rows={5}
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Type your message here..."
            ></textarea>
            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={handleBroadcast}>Send</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
