import {
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  AlertCircle,
  Package2,
  BarChart4,
  FileText,
  Truck,
  UserCircle,
  Settings,
  Home,
  ClipboardList,
  CreditCard,
  Map,
} from "lucide-react";

// Types
export interface NavItem {
  title: string;
  path: string;
  icon: React.ElementType;
  children?: NavItem[];
}

export interface Item {
  id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  price: number;
  stockQuantity: number;
  reorderLevel: number;
  warehouse?: string;
  description: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StockMovement {
  id: string;
  itemId: string;
  itemName: string;
  type: "in" | "out" | "adjustment";
  quantity: number;
  date: Date;
  referenceNumber?: string;
  notes?: string;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "staff";
  avatar?: string;
}

export interface Order {
  id: string;
  customerName: string;
  orderDate: Date;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  paymentStatus: "pending" | "paid" | "failed";
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  user: string;
  timestamp: Date;
}

export interface Customer {
  id: string;
  name: string;
  type: "customer" | "vendor";
  company?: string;
  email: string;
  phone: string;
  address: string;
  status: "active" | "inactive";
  notes?: string;
  taxId?: string;
  paymentTerms?: string;
  billingAddress?: string;
  createdAt: Date;
  updatedAt: Date;
  transactions?: Transaction[];
  attachments?: Attachment[];
}

export interface Transaction {
  id: string;
  customerId: string;
  date: Date;
  type: "invoice" | "payment" | "credit" | "debit";
  reference: string;
  amount: number;
  status: "paid" | "pending" | "failed";
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  dateAdded: Date;
  url: string;
}

export interface InvoiceItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerId: string;
  customerAddress?: string;
  customerCity?: string;
  customerEmail?: string;
  date: Date;
  dueDate: Date;
  items: InvoiceItem[];
  amount: number;
  tax: number;
  discount: number;
  status: "draft" | "pending" | "paid" | "overdue" | "cancelled";
  notes?: string;
}

// Mock Data
export const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    title: "Item Management",
    path: "/items",
    icon: Package,
  },
  {
    title: "Inventory Control",
    path: "/inventory",
    icon: Package2,
  },
  {
    title: "Sales Management",
    path: "/sales",
    icon: ShoppingCart,
  },
  {
    title: "Purchase Management",
    path: "/purchases",
    icon: ClipboardList,
  },
  {
    title: "Invoicing & Payments",
    path: "/invoices",
    icon: FileText,
  },
  {
    title: "Shipping & Fulfillment",
    path: "/shipping",
    icon: Truck,
  },
  {
    title: "CRM",
    path: "/customers",
    icon: UserCircle,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: BarChart4,
  },
  {
    title: "Multi-Warehouse",
    path: "/warehouses",
    icon: Map,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export const mockItems: Item[] = [
  {
    id: "1",
    name: "Wireless Mouse",
    sku: "WM-001",
    category: "Electronics",
    brand: "TechGear",
    price: 24.99,
    stockQuantity: 45,
    reorderLevel: 10,
    warehouse: "Main Warehouse",
    description:
      "Ergonomic wireless mouse with precision tracking and long battery life.",
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-05-15"),
  },
  {
    id: "2",
    name: "Mechanical Keyboard",
    sku: "KB-002",
    category: "Electronics",
    brand: "TechGear",
    price: 89.99,
    stockQuantity: 28,
    reorderLevel: 5,
    warehouse: "Main Warehouse",
    description:
      "Premium mechanical keyboard with customizable RGB lighting and tactile keys.",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-05-18"),
  },
  {
    id: "3",
    name: "27-inch Monitor",
    sku: "MON-003",
    category: "Electronics",
    brand: "ViewClear",
    price: 199.99,
    stockQuantity: 12,
    reorderLevel: 3,
    warehouse: "West Coast Facility",
    description:
      "Ultra-wide 27-inch monitor with 4K resolution and adjustable stand.",
    createdAt: new Date("2023-02-05"),
    updatedAt: new Date("2023-05-10"),
  },
  {
    id: "4",
    name: "USB-C Cable",
    sku: "CBL-004",
    category: "Accessories",
    brand: "ConnectPro",
    price: 12.99,
    stockQuantity: 78,
    reorderLevel: 15,
    warehouse: "Main Warehouse",
    description:
      "High-speed USB-C charging and data transfer cable with braided nylon cover.",
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-04-28"),
  },
  {
    id: "5",
    name: "Wireless Headphones",
    sku: "HP-005",
    category: "Audio",
    brand: "SoundWave",
    price: 149.99,
    stockQuantity: 8,
    reorderLevel: 10,
    warehouse: "Midwest Distribution Center",
    description:
      "Noise-canceling wireless headphones with 30-hour battery life.",
    createdAt: new Date("2023-02-18"),
    updatedAt: new Date("2023-05-05"),
  },
  {
    id: "6",
    name: "Laptop Stand",
    sku: "STD-006",
    category: "Accessories",
    brand: "ErgoPro",
    price: 34.95,
    stockQuantity: 32,
    reorderLevel: 8,
    warehouse: "Main Warehouse",
    description:
      "Adjustable aluminum laptop stand for improved ergonomics and cooling.",
    createdAt: new Date("2023-03-01"),
    updatedAt: new Date("2023-05-12"),
  },
  {
    id: "7",
    name: "External SSD 1TB",
    sku: "SSD-007",
    category: "Storage",
    brand: "DataFast",
    price: 129.99,
    stockQuantity: 4,
    reorderLevel: 5,
    warehouse: "West Coast Facility",
    description:
      "Compact 1TB external SSD with USB 3.2 interface for ultra-fast transfers.",
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date("2023-05-01"),
  },
  {
    id: "8",
    name: "Wireless Charger",
    sku: "CHG-008",
    category: "Accessories",
    brand: "PowerUp",
    price: 29.95,
    stockQuantity: 22,
    reorderLevel: 10,
    warehouse: "Main Warehouse",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices.",
    createdAt: new Date("2023-03-22"),
    updatedAt: new Date("2023-04-30"),
  },
];

export const mockStockMovements: StockMovement[] = [
  {
    id: "1",
    itemId: "1",
    itemName: "Wireless Mouse",
    type: "in",
    quantity: 20,
    date: new Date("2023-05-01"),
    referenceNumber: "PO-2023-001",
    notes: "Regular purchase order",
  },
  {
    id: "2",
    itemId: "2",
    itemName: "Mechanical Keyboard",
    type: "in",
    quantity: 10,
    date: new Date("2023-05-02"),
    referenceNumber: "PO-2023-002",
    notes: "Regular purchase order",
  },
  {
    id: "3",
    itemId: "1",
    itemName: "Wireless Mouse",
    type: "out",
    quantity: 5,
    date: new Date("2023-05-03"),
    referenceNumber: "SO-2023-001",
    notes: "Online order",
  },
  {
    id: "4",
    itemId: "3",
    itemName: "27-inch Monitor",
    type: "in",
    quantity: 8,
    date: new Date("2023-05-04"),
    referenceNumber: "PO-2023-003",
    notes: "Regular purchase order",
  },
  {
    id: "5",
    itemId: "5",
    itemName: "Wireless Headphones",
    type: "out",
    quantity: 3,
    date: new Date("2023-05-05"),
    referenceNumber: "SO-2023-002",
    notes: "Store purchase",
  },
  {
    id: "6",
    itemId: "7",
    itemName: "External SSD 1TB",
    type: "adjustment",
    quantity: -1,
    date: new Date("2023-05-06"),
    notes: "Damaged item",
  },
  {
    id: "7",
    itemId: "4",
    itemName: "USB-C Cable",
    type: "out",
    quantity: 10,
    date: new Date("2023-05-07"),
    referenceNumber: "SO-2023-003",
    notes: "Bulk order",
  },
  {
    id: "8",
    itemId: "2",
    itemName: "Mechanical Keyboard",
    type: "out",
    quantity: 2,
    date: new Date("2023-05-08"),
    referenceNumber: "SO-2023-004",
    notes: "Online order",
  },
];

export const mockWarehouses: Warehouse[] = [
  {
    id: "1",
    name: "Main Warehouse",
    location: "New York, NY",
  },
  {
    id: "2",
    name: "West Coast Facility",
    location: "Los Angeles, CA",
  },
  {
    id: "3",
    name: "Midwest Distribution Center",
    location: "Chicago, IL",
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    role: "admin",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "manager",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "staff",
  },
];

export const mockOrders: Order[] = [
  {
    id: "ORD-2023-001",
    customerName: "Tech Solutions Inc.",
    orderDate: new Date("2023-05-01"),
    status: "delivered",
    total: 495.95,
    paymentStatus: "paid",
  },
  {
    id: "ORD-2023-002",
    customerName: "Office Supplies Co.",
    orderDate: new Date("2023-05-03"),
    status: "shipped",
    total: 149.98,
    paymentStatus: "paid",
  },
  {
    id: "ORD-2023-003",
    customerName: "Home Electronics",
    orderDate: new Date("2023-05-06"),
    status: "processing",
    total: 1299.97,
    paymentStatus: "pending",
  },
  {
    id: "ORD-2023-004",
    customerName: "Digital Creators",
    orderDate: new Date("2023-05-07"),
    status: "pending",
    total: 599.98,
    paymentStatus: "pending",
  },
];

export const mockActivities: Activity[] = [
  {
    id: "1",
    type: "stock_in",
    description: "Stock received for Wireless Mouse (20 units)",
    user: "John Smith",
    timestamp: new Date("2023-05-10T09:15:00"),
  },
  {
    id: "2",
    type: "order",
    description: "New order #ORD-2023-004 from Digital Creators",
    user: "Sarah Johnson",
    timestamp: new Date("2023-05-10T10:30:00"),
  },
  {
    id: "3",
    type: "shipment",
    description: "Order #ORD-2023-002 shipped via FedEx",
    user: "Michael Brown",
    timestamp: new Date("2023-05-10T11:45:00"),
  },
  {
    id: "4",
    type: "adjustment",
    description: "Inventory adjustment for External SSD 1TB (-1 unit)",
    user: "John Smith",
    timestamp: new Date("2023-05-10T13:20:00"),
  },
  {
    id: "5",
    type: "payment",
    description: "Payment received for order #ORD-2023-002",
    user: "Sarah Johnson",
    timestamp: new Date("2023-05-10T14:10:00"),
  },
  {
    id: "6",
    type: "item",
    description: "New item added: Bluetooth Speaker (SKU: SPK-009)",
    user: "John Smith",
    timestamp: new Date("2023-05-10T15:30:00"),
  },
];

export const mockCustomers: Customer[] = [
  {
    id: "c1",
    name: "Tech Solutions Inc.",
    type: "customer",
    company: "Tech Solutions Inc.",
    email: "contact@techsolutions.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Avenue, San Francisco, CA 94107",
    status: "active",
    notes: "Key enterprise customer with multiple locations",
    taxId: "TS-12345",
    paymentTerms: "Net 30",
    createdAt: new Date("2022-01-15"),
    updatedAt: new Date("2023-06-20"),
    transactions: [
      {
        id: "t1",
        customerId: "c1",
        date: new Date("2023-04-15"),
        type: "invoice",
        reference: "INV-2023-001",
        amount: 2499.99,
        status: "paid",
      },
      {
        id: "t2",
        customerId: "c1",
        date: new Date("2023-05-20"),
        type: "invoice",
        reference: "INV-2023-008",
        amount: 1299.5,
        status: "pending",
      },
    ],
    attachments: [
      {
        id: "a1",
        name: "Contract_2023.pdf",
        type: "PDF Document",
        size: 2456789,
        dateAdded: new Date("2023-01-20"),
        url: "#",
      },
      {
        id: "a2",
        name: "Requirements_Spec.docx",
        type: "Word Document",
        size: 1234567,
        dateAdded: new Date("2023-02-15"),
        url: "#",
      },
    ],
  },
  {
    id: "c2",
    name: "Office Supplies Co.",
    type: "customer",
    company: "Office Supplies Co.",
    email: "orders@officesupplies.com",
    phone: "+1 (555) 987-6543",
    address: "456 Commerce Drive, Chicago, IL 60652",
    status: "active",
    paymentTerms: "Net 15",
    createdAt: new Date("2022-03-10"),
    updatedAt: new Date("2023-05-05"),
    transactions: [
      {
        id: "t3",
        customerId: "c2",
        date: new Date("2023-05-01"),
        type: "invoice",
        reference: "INV-2023-010",
        amount: 549.99,
        status: "paid",
      },
    ],
  },
  {
    id: "c3",
    name: "Global Electronics",
    type: "customer",
    company: "Global Electronics Ltd.",
    email: "sales@globalelectronics.com",
    phone: "+1 (555) 321-7890",
    address: "789 Tech Park, Austin, TX 78703",
    status: "inactive",
    notes: "Account inactive since 2023-03-15",
    createdAt: new Date("2021-11-05"),
    updatedAt: new Date("2023-03-15"),
  },
  {
    id: "v1",
    name: "Component Supply Co.",
    type: "vendor",
    company: "Component Supply Co.",
    email: "orders@componentsupply.com",
    phone: "+1 (555) 456-7890",
    address: "123 Manufacturer Way, Detroit, MI 48201",
    status: "active",
    taxId: "CS-67890",
    paymentTerms: "Net 45",
    createdAt: new Date("2021-09-20"),
    updatedAt: new Date("2023-04-10"),
    transactions: [
      {
        id: "t4",
        customerId: "v1",
        date: new Date("2023-04-05"),
        type: "payment",
        reference: "PO-2023-045",
        amount: 12500.0,
        status: "paid",
      },
    ],
  },
  {
    id: "v2",
    name: "Tech Hardware Inc.",
    type: "vendor",
    company: "Tech Hardware Inc.",
    email: "purchases@techhardware.com",
    phone: "+1 (555) 765-4321",
    address: "456 Industrial Blvd, Phoenix, AZ 85034",
    status: "active",
    taxId: "TH-54321",
    paymentTerms: "Net 30",
    createdAt: new Date("2022-02-18"),
    updatedAt: new Date("2023-01-25"),
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: "inv1",
    invoiceNumber: "INV-2023-001",
    customerName: "Tech Solutions Inc.",
    customerId: "c1",
    customerEmail: "contact@techsolutions.com",
    date: new Date("2023-04-15"),
    dueDate: new Date("2023-05-15"),
    items: [
      {
        id: "item1",
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse",
        quantity: 10,
        price: 24.99,
      },
      {
        id: "item2",
        name: "Mechanical Keyboard",
        description: "Premium mechanical keyboard",
        quantity: 5,
        price: 89.99,
      },
      {
        id: "item3",
        name: "27-inch Monitor",
        description: "Ultra-wide 27-inch monitor",
        quantity: 3,
        price: 199.99,
      },
    ],
    amount: 1249.65,
    tax: 99.97,
    discount: 50.0,
    status: "paid",
    notes: "Thank you for your business!",
  },
  {
    id: "inv2",
    invoiceNumber: "INV-2023-008",
    customerName: "Tech Solutions Inc.",
    customerId: "c1",
    date: new Date("2023-05-20"),
    dueDate: new Date("2023-06-20"),
    items: [
      {
        id: "item4",
        name: "USB-C Cable",
        description: "High-speed USB-C charging cable",
        quantity: 20,
        price: 12.99,
      },
      {
        id: "item5",
        name: "Wireless Headphones",
        description: "Noise-canceling wireless headphones",
        quantity: 5,
        price: 149.99,
      },
    ],
    amount: 1009.9,
    tax: 80.8,
    discount: 0.0,
    status: "pending",
    notes: "Bulk order for new office setup",
  },
  {
    id: "inv3",
    invoiceNumber: "INV-2023-010",
    customerName: "Office Supplies Co.",
    customerId: "c2",
    date: new Date("2023-05-01"),
    dueDate: new Date("2023-05-16"),
    items: [
      {
        id: "item6",
        name: "Laptop Stand",
        description: "Adjustable aluminum laptop stand",
        quantity: 10,
        price: 34.95,
      },
      {
        id: "item7",
        name: "Wireless Charger",
        description: "Fast wireless charging pad",
        quantity: 5,
        price: 29.95,
      },
    ],
    amount: 499.25,
    tax: 39.94,
    discount: 25.0,
    status: "paid",
  },
  {
    id: "inv4",
    invoiceNumber: "INV-2023-012",
    customerName: "Global Electronics",
    customerId: "c3",
    date: new Date("2023-03-10"),
    dueDate: new Date("2023-04-10"),
    items: [
      {
        id: "item8",
        name: "External SSD 1TB",
        description: "Compact 1TB external SSD",
        quantity: 2,
        price: 129.99,
      },
    ],
    amount: 272.98,
    tax: 21.84,
    discount: 0.0,
    status: "overdue",
  },
  {
    id: "inv5",
    invoiceNumber: "INV-2023-015",
    customerName: "Tech Solutions Inc.",
    customerId: "c1",
    date: new Date("2023-06-05"),
    dueDate: new Date("2023-07-05"),
    items: [
      {
        id: "item9",
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse",
        quantity: 15,
        price: 24.99,
      },
    ],
    amount: 389.85,
    tax: 31.19,
    discount: 15.0,
    status: "draft",
  },
];

export const generateMonthlySalesData = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months.map((month) => ({
    name: month,
    sales: Math.floor(Math.random() * 5000) + 2000,
    purchases: Math.floor(Math.random() * 3000) + 1000,
  }));
};

export const salesData = generateMonthlySalesData();

export const generateInventoryValueData = () => {
  const categories = ["Electronics", "Accessories", "Audio", "Storage"];
  return categories.map((category) => ({
    name: category,
    value: Math.floor(Math.random() * 10000) + 5000,
  }));
};

export const inventoryValueData = generateInventoryValueData();

export const getLowStockItems = () => {
  return mockItems.filter((item) => item.stockQuantity <= item.reorderLevel);
};
