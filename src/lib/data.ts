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

// User role type
export type UserRole =
  | "admin"
  | "inventory_manager"
  | "sales_staff"
  | "purchasing_agent"
  | "viewer";

// Role permissions mapping
export interface RolePermissions {
  canViewDashboard: boolean;
  canManageItems: boolean;
  canManageInventory: boolean;
  canManageSales: boolean;
  canManagePurchases: boolean;
  canManageCustomers: boolean;
  canManageVendors: boolean;
  canManageInvoices: boolean;
  canManageReports: boolean;
  canManageWarehouses: boolean;
  canManageShipping: boolean;
  canManageSettings: boolean;
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
  status: string;
  sellingPrice: number;
  costPrice: number;
  barcode: string;
  weight: number;
  dimensions: string;
  attributes?: Record<string, string | number>;
  minStockLevel: number;
  reorderPoint: number;
  location?: {
    warehouse: string;
    aisle: string;
    shelf: string;
  };
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

export type WarehouseStatus = "active" | "inactive";

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  manager: string;
  phone: string;
  email: string;
  capacity: number;
  status: WarehouseStatus;
  autoReorder: boolean;
  lowStockAlert: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
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

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierName: string;
  supplierId: string;
  date: Date;
  dueDate: Date;
  items: PurchaseOrderItem[];
  total: number;
  tax?: number;
  notes?: string;
  status: "draft" | "pending" | "approved" | "completed" | "cancelled";
  billCreated?: boolean;
  history?: PurchaseOrderEvent[];
  attachments?: Attachment[];
}

export interface PurchaseOrderItem {
  itemId: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

export interface PurchaseOrderEvent {
  type: "status_change" | "comment" | "update";
  timestamp: Date;
  user: string;
  description: string;
}

export interface Bill {
  id: string;
  billNumber: string;
  supplierName: string;
  supplierId: string;
  date: Date;
  dueDate: Date;
  poReference?: string;
  amount: number;
  tax: number;
  status: "pending" | "paid" | "overdue" | "cancelled";
  paymentDate?: Date;
}

export interface PurchaseReturn {
  id: string;
  returnNumber: string;
  supplierName: string;
  supplierId: string;
  date: Date;
  relatedPO?: string;
  status: "pending" | "approved" | "completed";
  amount: number;
  items: PurchaseReturnItem[];
  notes?: string;
  attachments?: Attachment[];
}

export interface PurchaseReturnItem {
  itemId: string;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  reason?: string;
}

export type SalesOrderStatus =
  | "draft"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface SalesOrders {
  id: string;
  orderNumber: string;
  customerName: string;
  date: string; // Format: YYYY-MM-DD
  dueDate: string; // Format: YYYY-MM-DD
  status: SalesOrderStatus;
  total: number;
  invoiceCreated: boolean;
}

export interface OrderItem {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  location: string;
}

export interface OrderData {
  orderNumber: string;
  customerName: string;
  customerAddress: string;
  orderDate: string; // or Date, depending on how you handle dates
  items: OrderItem[];
}
export type TemplateCategory =
  | "onboarding"
  | "sales"
  | "billing"
  | "reminder"
  | "order";

export interface BaseTemplate {
  id: number;
  name: string;
  content: string;
  category: TemplateCategory;
  usage: number;
  lastModified: string; // Format: YYYY-MM-DD
}

export interface EmailTemplate extends BaseTemplate {
  subject: string;
}

export interface SMSTemplate extends BaseTemplate {
  // No additional fields for SMS, but we keep it separate in case of future expansion
}

export type CustomerActivityType =
  | "email"
  | "call"
  | "meeting"
  | "proposal"
  | "payment";

export type CustomerActivityStatus = "completed" | "scheduled" | "pending";

export interface CustomerActivity {
  id: number;
  type: CustomerActivityType;
  title: string;
  description: string;
  customer: string;
  timestamp: Date;
  user: string;
  status: CustomerActivityStatus;
}

export type ShipmentStatus = "pending" | "in_transit" | "delivered";

export interface Shipment {
  id: string;
  trackingNumber: string;
  orderNumber: string;
  customerName: string;
  carrier: string;
  service: string;
  status: ShipmentStatus;
  origin: string;
  destination: string;
  estimatedDelivery: string; // Consider using Date type if you'll parse this
  shippedDate: string | null; // Or Date | null if you're using actual Date objects
  weight: string;
  dimensions: string;
}
// Role permissions configuration
export const rolePermissions: Record<UserRole, RolePermissions> = {
  admin: {
    canViewDashboard: true,
    canManageItems: true,
    canManageInventory: true,
    canManageSales: true,
    canManagePurchases: true,
    canManageCustomers: true,
    canManageVendors: true,
    canManageInvoices: true,
    canManageReports: true,
    canManageWarehouses: true,
    canManageShipping: true,
    canManageSettings: true,
  },
  inventory_manager: {
    canViewDashboard: true,
    canManageItems: true,
    canManageInventory: true,
    canManageSales: false,
    canManagePurchases: false,
    canManageCustomers: false,
    canManageVendors: false,
    canManageInvoices: false,
    canManageReports: true,
    canManageWarehouses: true,
    canManageShipping: true,
    canManageSettings: false,
  },
  sales_staff: {
    canViewDashboard: true,
    canManageItems: true,
    canManageInventory: false,
    canManageSales: true,
    canManagePurchases: false,
    canManageCustomers: true,
    canManageVendors: false,
    canManageInvoices: true,
    canManageReports: false,
    canManageWarehouses: false,
    canManageShipping: false,
    canManageSettings: false,
  },
  purchasing_agent: {
    canViewDashboard: true,
    canManageItems: true,
    canManageInventory: false,
    canManageSales: false,
    canManagePurchases: true,
    canManageCustomers: false,
    canManageVendors: true,
    canManageInvoices: false,
    canManageReports: false,
    canManageWarehouses: false,
    canManageShipping: false,
    canManageSettings: false,
  },
  viewer: {
    canViewDashboard: true,
    canManageItems: false,
    canManageInventory: false,
    canManageSales: false,
    canManagePurchases: false,
    canManageCustomers: false,
    canManageVendors: false,
    canManageInvoices: false,
    canManageReports: true,
    canManageWarehouses: false,
    canManageShipping: false,
    canManageSettings: false,
  },
};

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
    status: "In Stock",
    sellingPrice: 24.99,
    costPrice: 18.75,
    barcode: "TG-WM-001-24",
    weight: 0.25,
    dimensions: "10cm x 6cm x 3cm",
    attributes: {
      Color: "Black",
      Connection: "Wireless",
      "Battery Life": "12 months",
    },
    minStockLevel: 5,
    reorderPoint: 15,
    location: {
      warehouse: "Main Warehouse",
      aisle: "A1",
      shelf: "S3",
    },
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
    status: "In Stock",
    sellingPrice: 89.99,
    costPrice: 65.5,
    barcode: "TG-KB-002-89",
    weight: 1.2,
    dimensions: "44cm x 14cm x 4cm",
    attributes: {
      Color: "Black",
      "Switch Type": "Cherry MX Brown",
      Backlight: "RGB",
    },
    minStockLevel: 3,
    reorderPoint: 8,
    location: {
      warehouse: "Main Warehouse",
      aisle: "A2",
      shelf: "S1",
    },
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
    status: "In Stock",
    sellingPrice: 199.99,
    costPrice: 149.99,
    barcode: "VC-MON-003-199",
    weight: 5.8,
    dimensions: "61cm x 37cm x 21cm",
    attributes: {
      Resolution: "3840x2160",
      "Panel Type": "IPS",
      "Refresh Rate": "60Hz",
    },
    minStockLevel: 2,
    reorderPoint: 5,
    location: {
      warehouse: "West Coast Facility",
      aisle: "B3",
      shelf: "S2",
    },
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
    status: "In Stock",
    sellingPrice: 12.99,
    costPrice: 7.5,
    barcode: "CP-CBL-004-12",
    weight: 0.1,
    dimensions: "1m x 1cm x 1cm",
    attributes: {
      Length: "1m",
      Color: "Black",
      "Data Speed": "10Gbps",
    },
    minStockLevel: 10,
    reorderPoint: 25,
    location: {
      warehouse: "Main Warehouse",
      aisle: "C1",
      shelf: "S4",
    },
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
    status: "Low Stock",
    sellingPrice: 149.99,
    costPrice: 110.0,
    barcode: "SW-HP-005-149",
    weight: 0.35,
    dimensions: "19cm x 17cm x 8cm",
    attributes: {
      Color: "Black",
      "Battery Life": "30 hours",
      "Noise Cancellation": "Active",
    },
    minStockLevel: 5,
    reorderPoint: 12,
    location: {
      warehouse: "Midwest Distribution Center",
      aisle: "A4",
      shelf: "S2",
    },
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
    status: "In Stock",
    sellingPrice: 34.95,
    costPrice: 22.0,
    barcode: "EP-STD-006-34",
    weight: 0.9,
    dimensions: "25cm x 21cm x 3cm (folded)",
    attributes: {
      Material: "Aluminum",
      Color: "Silver",
      "Adjustable Heights": "6",
    },
    minStockLevel: 5,
    reorderPoint: 15,
    location: {
      warehouse: "Main Warehouse",
      aisle: "D2",
      shelf: "S1",
    },
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
    status: "Low Stock",
    sellingPrice: 129.99,
    costPrice: 95.0,
    barcode: "DF-SSD-007-129",
    weight: 0.15,
    dimensions: "10cm x 5cm x 1cm",
    attributes: {
      Capacity: "1TB",
      Interface: "USB 3.2",
      "Read Speed": "550MB/s",
    },
    minStockLevel: 3,
    reorderPoint: 8,
    location: {
      warehouse: "West Coast Facility",
      aisle: "C3",
      shelf: "S4",
    },
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
    status: "In Stock",
    sellingPrice: 29.95,
    costPrice: 18.5,
    barcode: "PU-CHG-008-29",
    weight: 0.2,
    dimensions: "10cm x 10cm x 1.5cm",
    attributes: {
      Color: "White",
      Output: "15W",
      "Compatible With": "All Qi devices",
    },
    minStockLevel: 7,
    reorderPoint: 15,
    location: {
      warehouse: "Main Warehouse",
      aisle: "B2",
      shelf: "S3",
    },
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
    manager: "John Smith",
    phone: "+1 (555) 123-4567",
    email: "warehouse.ny@company.com",
    capacity: 10000,
    status: "active",
    autoReorder: true,
    lowStockAlert: true,
  },
  {
    id: "2",
    name: "West Coast Facility",
    location: "Los Angeles, CA",
    manager: "Sarah Johnson",
    phone: "+1 (555) 987-6543",
    email: "warehouse.la@company.com",
    capacity: 8500,
    status: "active",
    autoReorder: false,
    lowStockAlert: true,
  },
  {
    id: "3",
    name: "Midwest Distribution Center",
    location: "Chicago, IL",
    manager: "Mike Wilson",
    phone: "+1 (555) 456-7890",
    email: "warehouse.chi@company.com",
    capacity: 12000,
    status: "inactive",
    autoReorder: true,
    lowStockAlert: false,
  },
];
export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: 1,
    name: "Welcome Email",
    subject: "Welcome to Our Service!",
    content:
      "Dear {{customer_name}},\n\nWelcome to our platform! We're excited to have you on board...",
    category: "onboarding",
    usage: 45,
    lastModified: "2024-01-15",
  },
  {
    id: 2,
    name: "Follow-up Proposal",
    subject: "Following up on your proposal",
    content:
      "Hi {{customer_name}},\n\nI wanted to follow up on the proposal we sent...",
    category: "sales",
    usage: 23,
    lastModified: "2024-01-10",
  },
  {
    id: 3,
    name: "Payment Reminder",
    subject: "Payment Due Reminder",
    content:
      "Dear {{customer_name}},\n\nThis is a friendly reminder that your payment...",
    category: "billing",
    usage: 67,
    lastModified: "2024-01-12",
  },
];

export const mockSMSTemplates: SMSTemplate[] = [
  {
    id: 4,
    name: "Appointment Reminder",
    content:
      "Hi {{customer_name}}, this is a reminder for your appointment tomorrow at {{time}}.",
    category: "reminder",
    usage: 89,
    lastModified: "2024-01-14",
  },
  {
    id: 5,
    name: "Order Confirmation",
    content:
      "Your order #{{order_number}} has been confirmed. Delivery expected in 2-3 days.",
    category: "order",
    usage: 156,
    lastModified: "2024-01-13",
  },
];

export const mockCustomerActivities: CustomerActivity[] = [
  {
    id: 1,
    type: "email",
    title: "Email sent to John Doe",
    description: "Follow-up email regarding proposal",
    customer: "John Doe",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    user: "Sarah Wilson",
    status: "completed",
  },
  {
    id: 2,
    type: "call",
    title: "Phone call with Tech Solutions Inc.",
    description: "Discussed implementation timeline",
    customer: "Tech Solutions Inc.",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    user: "Mike Johnson",
    status: "completed",
  },
  {
    id: 3,
    type: "meeting",
    title: "Client meeting scheduled",
    description: "Product demo with potential customer",
    customer: "ABC Corporation",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    user: "Sarah Wilson",
    status: "scheduled",
  },
  {
    id: 4,
    type: "proposal",
    title: "Proposal sent",
    description: "Custom solution proposal delivered",
    customer: "Innovation Labs",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    user: "Alex Chen",
    status: "pending",
  },
  {
    id: 5,
    type: "payment",
    title: "Payment received",
    description: "Invoice #INV-2023-045 paid",
    customer: "GlobalTech Ltd.",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    user: "System",
    status: "completed",
  },
];

export const mockShipments: Shipment[] = [
  {
    id: "ship1",
    trackingNumber: "TRK123456789",
    orderNumber: "SO-2023-001",
    customerName: "Tech Solutions Inc.",
    carrier: "FedEx",
    service: "Express",
    status: "in_transit",
    origin: "Warehouse A",
    destination: "New York, NY",
    estimatedDelivery: "2023-06-20",
    shippedDate: "2023-06-18",
    weight: "2.5 lbs",
    dimensions: "12x8x6 in",
  },
  {
    id: "ship2",
    trackingNumber: "TRK987654321",
    orderNumber: "SO-2023-002",
    customerName: "Office Supplies Co.",
    carrier: "UPS",
    service: "Ground",
    status: "delivered",
    origin: "Warehouse B",
    destination: "Los Angeles, CA",
    estimatedDelivery: "2023-06-19",
    shippedDate: "2023-06-17",
    weight: "1.8 lbs",
    dimensions: "10x6x4 in",
  },
  {
    id: "ship3",
    trackingNumber: "TRK456789123",
    orderNumber: "SO-2023-003",
    customerName: "Global Electronics",
    carrier: "DHL",
    service: "International Express",
    status: "pending",
    origin: "Warehouse A",
    destination: "London, UK",
    estimatedDelivery: "2023-06-22",
    shippedDate: null,
    weight: "3.2 lbs",
    dimensions: "14x10x8 in",
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
    role: "inventory_manager",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "sales_staff",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "purchasing_agent",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert@example.com",
    role: "viewer",
  },
];
export const mockSalesOrders: SalesOrders[] = [
  {
    id: "so1",
    orderNumber: "SO-2023-001",
    customerName: "Tech Solutions Inc.",
    date: "2023-06-15",
    dueDate: "2023-06-22",
    status: "confirmed",
    total: 1249.99,
    invoiceCreated: false,
  },
  {
    id: "so2",
    orderNumber: "SO-2023-002",
    customerName: "Office Supplies Co.",
    date: "2023-06-16",
    dueDate: "2023-06-23",
    status: "shipped",
    total: 599.5,
    invoiceCreated: true,
  },
  {
    id: "so3",
    orderNumber: "SO-2023-003",
    customerName: "Global Electronics",
    date: "2023-06-17",
    dueDate: "2023-06-24",
    status: "draft",
    total: 899.75,
    invoiceCreated: false,
  },
];

export const mockOrderData: OrderData[] = [
  {
    orderNumber: "SO-2023-001",
    customerName: "Tech Solutions Inc.",
    customerAddress: "123 Business Ave\nNew York, NY 10001",
    orderDate: "2023-06-15",
    items: [
      {
        id: 1,
        name: "Wireless Mouse",
        sku: "WM001",
        quantity: 2,
        location: "A1-B2",
      },
      {
        id: 2,
        name: "USB Cable",
        sku: "UC003",
        quantity: 5,
        location: "A2-C1",
      },
      { id: 3, name: "Keyboard", sku: "KB007", quantity: 1, location: "B1-A3" },
    ],
  },
  {
    orderNumber: "SO-2023-002",
    customerName: "Office Supplies Co.",
    customerAddress: "456 Office Blvd\nLos Angeles, CA 90001",
    orderDate: "2023-06-16",
    items: [
      { id: 4, name: "Stapler", sku: "STP010", quantity: 3, location: "C2-D1" },
      {
        id: 5,
        name: "Printer Paper",
        sku: "PP100",
        quantity: 10,
        location: "C3-E1",
      },
    ],
  },
  {
    orderNumber: "SO-2023-003",
    customerName: "Global Electronics",
    customerAddress: "789 Tech Park\nSan Francisco, CA 94105",
    orderDate: "2023-06-17",
    items: [
      {
        id: 6,
        name: "HDMI Cable",
        sku: "HDMI004",
        quantity: 4,
        location: "D1-E2",
      },
      {
        id: 7,
        name: "Monitor Stand",
        sku: "MS055",
        quantity: 2,
        location: "D2-F3",
      },
      { id: 8, name: "USB Hub", sku: "USBH22", quantity: 1, location: "D4-F1" },
    ],
  },
  {
    orderNumber: "SO-2023-004",
    customerName: "Smart Home Inc.",
    customerAddress: "321 Innovation Dr\nAustin, TX 73301",
    orderDate: "2023-06-18",
    items: [
      {
        id: 9,
        name: "Smart Plug",
        sku: "SP001",
        quantity: 5,
        location: "E1-G2",
      },
      {
        id: 10,
        name: "Wi-Fi Router",
        sku: "WR1200",
        quantity: 1,
        location: "E3-H1",
      },
    ],
  },
  {
    orderNumber: "SO-2023-005",
    customerName: "GreenTech Solutions",
    customerAddress: "654 Eco St\nPortland, OR 97201",
    orderDate: "2023-06-19",
    items: [
      {
        id: 11,
        name: "Solar Panel Charger",
        sku: "SPC150",
        quantity: 3,
        location: "F1-J2",
      },
      {
        id: 12,
        name: "LED Light Bulb",
        sku: "LED25W",
        quantity: 6,
        location: "F2-K3",
      },
    ],
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

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: "po1",
    poNumber: "PO-2023-001",
    supplierName: "Component Supply Co.",
    supplierId: "v1",
    date: new Date("2023-05-01"),
    dueDate: new Date("2023-05-31"),
    items: [
      {
        itemId: "1",
        name: "Wireless Mouse",
        description:
          "Ergonomic wireless mouse with precision tracking and long battery life.",
        quantity: 20,
        price: 22.5,
      },
      {
        itemId: "2",
        name: "Mechanical Keyboard",
        description:
          "Premium mechanical keyboard with customizable RGB lighting and tactile keys.",
        quantity: 10,
        price: 75.0,
      },
    ],
    total: 1200.0,
    tax: 72.0,
    status: "completed",
    billCreated: true,
    history: [
      {
        type: "status_change",
        timestamp: new Date("2023-05-01T09:00:00"),
        user: "John Smith",
        description: "Purchase order created",
      },
      {
        type: "status_change",
        timestamp: new Date("2023-05-01T14:30:00"),
        user: "Sarah Johnson",
        description: "Status changed from draft to approved",
      },
      {
        type: "comment",
        timestamp: new Date("2023-05-15T10:15:00"),
        user: "John Smith",
        description: "Supplier confirmed shipment",
      },
      {
        type: "status_change",
        timestamp: new Date("2023-05-31T11:00:00"),
        user: "Sarah Johnson",
        description: "Status changed from approved to completed",
      },
    ],
    attachments: [
      {
        id: "att1",
        name: "PO-001-Confirmation.pdf",
        type: "PDF Document",
        size: 1234567,
        dateAdded: new Date("2023-05-01"),
        url: "#",
      },
      {
        id: "att2",
        name: "Supplier_Invoice.pdf",
        type: "PDF Document",
        size: 987654,
        dateAdded: new Date("2023-05-31"),
        url: "#",
      },
    ],
  },
  {
    id: "po2",
    poNumber: "PO-2023-002",
    supplierName: "Tech Hardware Inc.",
    supplierId: "v2",
    date: new Date("2023-05-15"),
    dueDate: new Date("2023-06-15"),
    items: [
      {
        itemId: "3",
        name: "27-inch Monitor",
        description:
          "Ultra-wide 27-inch monitor with 4K resolution and adjustable stand.",
        quantity: 5,
        price: 189.99,
      },
      {
        itemId: "7",
        name: "External SSD 1TB",
        description:
          "Compact 1TB external SSD with USB 3.2 interface for ultra-fast transfers.",
        quantity: 8,
        price: 119.99,
      },
    ],
    total: 1909.87,
    tax: 114.59,
    status: "approved",
    history: [
      {
        type: "status_change",
        timestamp: new Date("2023-05-15T13:20:00"),
        user: "John Smith",
        description: "Purchase order created",
      },
      {
        type: "status_change",
        timestamp: new Date("2023-05-16T09:45:00"),
        user: "Sarah Johnson",
        description: "Status changed from draft to approved",
      },
    ],
  },
  {
    id: "po3",
    poNumber: "PO-2023-003",
    supplierName: "Component Supply Co.",
    supplierId: "v1",
    date: new Date("2023-06-01"),
    dueDate: new Date("2023-07-01"),
    items: [
      {
        itemId: "4",
        name: "USB-C Cable",
        description:
          "High-speed USB-C charging and data transfer cable with braided nylon cover.",
        quantity: 50,
        price: 9.99,
      },
      {
        itemId: "8",
        name: "Wireless Charger",
        description:
          "Fast wireless charging pad compatible with all Qi-enabled devices.",
        quantity: 15,
        price: 24.99,
      },
    ],
    total: 874.35,
    tax: 52.46,
    status: "pending",
    history: [
      {
        type: "status_change",
        timestamp: new Date("2023-06-01T10:00:00"),
        user: "Sarah Johnson",
        description: "Purchase order created",
      },
    ],
  },
  {
    id: "po4",
    poNumber: "PO-2023-004",
    supplierName: "Tech Hardware Inc.",
    supplierId: "v2",
    date: new Date("2023-06-10"),
    dueDate: new Date("2023-07-10"),
    items: [
      {
        itemId: "5",
        name: "Wireless Headphones",
        description:
          "Noise-canceling wireless headphones with 30-hour battery life.",
        quantity: 10,
        price: 129.99,
      },
    ],
    total: 1429.89,
    tax: 85.79,
    status: "draft",
    notes: "Need to confirm available stock with supplier before approving.",
  },
];

export const mockBills: Bill[] = [
  {
    id: "bill1",
    billNumber: "BILL-2023-001",
    supplierName: "Component Supply Co.",
    supplierId: "v1",
    date: new Date("2023-05-31"),
    dueDate: new Date("2023-06-30"),
    poReference: "PO-2023-001",
    amount: 1200.0,
    tax: 72.0,
    status: "paid",
    paymentDate: new Date("2023-06-25"),
  },
  {
    id: "bill2",
    billNumber: "BILL-2023-002",
    supplierName: "Tech Hardware Inc.",
    supplierId: "v2",
    date: new Date("2023-04-15"),
    dueDate: new Date("2023-05-15"),
    amount: 850.0,
    tax: 51.0,
    status: "paid",
    paymentDate: new Date("2023-05-10"),
  },
  {
    id: "bill3",
    billNumber: "BILL-2023-003",
    supplierName: "Component Supply Co.",
    supplierId: "v1",
    date: new Date("2023-06-05"),
    dueDate: new Date("2023-07-05"),
    amount: 456.75,
    tax: 27.41,
    status: "pending",
  },
];

export const mockReturns: PurchaseReturn[] = [
  {
    id: "ret1",
    returnNumber: "RET-2023-001",
    supplierName: "Component Supply Co.",
    supplierId: "v1",
    date: new Date("2023-05-10"),
    relatedPO: "PO-2023-001",
    status: "completed",
    amount: 112.5,
    items: [
      {
        itemId: "1",
        name: "Wireless Mouse",
        quantity: 5,
        price: 22.5,
        reason: "Defective tracking",
      },
    ],
    notes: "5 units were defective, supplier has agreed to full refund.",
    attachments: [
      {
        id: "att1",
        name: "Return_Authorization.pdf",
        type: "PDF Document",
        size: 234567,
        dateAdded: new Date("2023-05-08"),
        url: "#",
      },
    ],
  },
  {
    id: "ret2",
    returnNumber: "RET-2023-002",
    supplierName: "Tech Hardware Inc.",
    supplierId: "v2",
    date: new Date("2023-06-05"),
    status: "pending",
    amount: 189.99,
    items: [
      {
        itemId: "3",
        name: "27-inch Monitor",
        quantity: 1,
        price: 189.99,
        reason: "Dead pixels",
      },
    ],
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
