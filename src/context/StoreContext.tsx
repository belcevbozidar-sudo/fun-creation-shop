import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';
import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedOption?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  shippingDetails: {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    paymentMethod: string;
    notes?: string;
  };
  date: string;
  status: 'pending' | 'completed';
}

export interface CustomRequest {
  id: string;
  type: 'pod' | '3dprint';
  fullName: string;
  email: string;
  phone: string;
  description: string;
  material?: string; // 3d print specific
  color?: string;    // 3d print specific
  quantity: number;
  fileLink?: string;  // 3d model link or mock uploaded file name
  date: string;
  status: 'pending' | 'reviewed';
}

interface StoreContextType {
  currentPage: 'home' | 'category' | 'product' | 'custom' | 'checkout';
  activeCategoryId: string | null;
  activeProductId: string | null;
  cart: CartItem[];
  orders: Order[];
  customRequests: CustomRequest[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  
  // Navigation
  navigateTo: (page: 'home' | 'category' | 'product' | 'custom' | 'checkout', categoryId?: string | null, productId?: string | null) => void;
  
  // Cart Actions
  addToCart: (product: Product, quantity: number, size?: string, option?: string) => void;
  removeFromCart: (productId: string, size?: string, option?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, size?: string, option?: string) => void;
  clearCart: () => void;
  toggleCart: (isOpen?: boolean) => void;
  
  // Order Actions
  placeOrder: (shippingDetails: Order['shippingDetails']) => Order;
  placeCustomRequest: (request: Omit<CustomRequest, 'id' | 'date' | 'status'>) => CustomRequest;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentPage, setCurrentPage] = useState<StoreContextType['currentPage']>('home');
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('anarchy_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Orders and Requests (Local Database simulation)
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('anarchy_orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [customRequests, setCustomRequests] = useState<CustomRequest[]>(() => {
    const saved = localStorage.getItem('anarchy_custom_requests');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist cart
  useEffect(() => {
    localStorage.setItem('anarchy_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist orders
  useEffect(() => {
    localStorage.setItem('anarchy_orders', JSON.stringify(orders));
  }, [orders]);

  // Persist custom requests
  useEffect(() => {
    localStorage.setItem('anarchy_custom_requests', JSON.stringify(customRequests));
  }, [customRequests]);

  // Handle browser back button (hash navigation simulation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash || hash === '#home') {
        setCurrentPage('home');
        setActiveCategoryId(null);
        setActiveProductId(null);
      } else if (hash.startsWith('#category/')) {
        const catId = hash.replace('#category/', '');
        setCurrentPage('category');
        setActiveCategoryId(catId);
        setActiveProductId(null);
      } else if (hash.startsWith('#product/')) {
        const prodId = hash.replace('#product/', '');
        setCurrentPage('product');
        setActiveProductId(prodId);
        // Find category of product
        const prod = products.find(p => p.id === prodId);
        if (prod) setActiveCategoryId(prod.category);
      } else if (hash === '#custom') {
        setCurrentPage('custom');
        setActiveCategoryId(null);
        setActiveProductId(null);
      } else if (hash === '#checkout') {
        setCurrentPage('checkout');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (
    page: StoreContextType['currentPage'],
    categoryId: string | null = null,
    productId: string | null = null
  ) => {
    setCurrentPage(page);
    setActiveCategoryId(categoryId);
    setActiveProductId(productId);
    
    // Update hash
    if (page === 'home') window.location.hash = 'home';
    else if (page === 'category' && categoryId) window.location.hash = `category/${categoryId}`;
    else if (page === 'product' && productId) window.location.hash = `product/${productId}`;
    else if (page === 'custom') window.location.hash = 'custom';
    else if (page === 'checkout') window.location.hash = 'checkout';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart actions
  const addToCart = (product: Product, quantity: number, size?: string, option?: string) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && 
                item.selectedSize === size && 
                item.selectedOption === option
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedSize: size, selectedOption: option }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size?: string, option?: string) => {
    setCart(prev => prev.filter(
      item => !(item.product.id === productId && 
                item.selectedSize === size && 
                item.selectedOption === option)
    ));
  };

  const updateCartQuantity = (productId: string, quantity: number, size?: string, option?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, option);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && 
          item.selectedSize === size && 
          item.selectedOption === option) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);
  
  const toggleCart = (isOpen?: boolean) => {
    setIsCartOpen(prev => isOpen !== undefined ? isOpen : !prev);
  };

  // Order actions
  const placeOrder = (shippingDetails: Order['shippingDetails']): Order => {
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const newOrder: Order = {
      id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: [...cart],
      total,
      shippingDetails,
      date: new Date().toLocaleString('bg-BG'),
      status: 'pending'
    };
    
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const placeCustomRequest = (request: Omit<CustomRequest, 'id' | 'date' | 'status'>): CustomRequest => {
    const newRequest: CustomRequest = {
      ...request,
      id: 'REQ-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toLocaleString('bg-BG'),
      status: 'pending'
    };
    
    setCustomRequests(prev => [newRequest, ...prev]);
    return newRequest;
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <StoreContext.Provider value={{
      currentPage,
      activeCategoryId,
      activeProductId,
      cart,
      orders,
      customRequests,
      cartCount,
      cartTotal,
      isCartOpen,
      navigateTo,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleCart,
      placeOrder,
      placeCustomRequest
    }}>
      {children}
    </StoreContext.Provider>
  );
};
